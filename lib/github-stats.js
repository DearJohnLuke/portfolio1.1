// Live GitHub figures for the home page, summed over both accounts
// (DearJohnLuke + RobustCode-Incorporated):
//   - commits      commits on the default branch of every owned, non-fork repo
//   - projects     number of owned, non-fork repos
//   - technologies distinct technologies used by the repos that are in production
//
// "In production" = the repo has GitHub deployments, a homepage URL, or a deploy
// config (vercel.json, render.yaml, netlify.toml, fly.toml, Procfile, eas.json).
// Technologies come from the code itself: GitHub languages + dependency manifests
// (package.json, requirements.txt, pyproject.toml, pubspec.yaml, pom.xml, build.gradle,
// Dockerfile, GitHub Actions workflows).
//
// How it stays cheap and live:
// - each account's repo list is fetched at most every LIST_TTL seconds;
// - everything computed for one repo is cached under its `pushed_at`, so a repo is
//   re-read only after it receives a push.
//
// Env (server only — never import this file from a client component):
//   GITHUB_TOKEN_DEARJOHNLUKE  token of DearJohnLuke   (sees its private repos)
//   GITHUB_TOKEN_ROBUSTCODE    token of RobustCode-Incorporated
//   GITHUB_TOKEN               fallback for both (public repos only)

import { unstable_cache } from "next/cache";

export const ACCOUNTS = [
  { login: "DearJohnLuke", tokenEnv: "GITHUB_TOKEN_DEARJOHNLUKE" },
  { login: "RobustCode-Incorporated", tokenEnv: "GITHUB_TOKEN_ROBUSTCODE" },
];

const LIST_TTL = 30; // seconds
const API = "https://api.github.com";
const FACTS_VERSION = "v1"; // bump to recompute every repo after changing the rules below

// Upstream code copied into our accounts, not our work.
const EXCLUDED = new Set(["VoiceStudio", "gods-eye-view"]);

// ---- technology rules -------------------------------------------------------

// GitHub language → technology (others, e.g. Makefile, are ignored).
const LANGUAGES = {
  TypeScript: "TypeScript", JavaScript: "JavaScript", Python: "Python", Dart: "Dart",
  Swift: "Swift", Java: "Java", Kotlin: "Kotlin", PHP: "PHP", Go: "Go", Ruby: "Ruby",
  "C#": "C#", Rust: "Rust", HTML: "HTML", CSS: "CSS", SCSS: "Sass", Vue: "Vue",
  Shell: "Shell", PLpgSQL: "PostgreSQL", Dockerfile: "Docker",
};

// npm package (exact name or prefix ending with "/") → technology.
const NPM = {
  next: "Next.js", react: "React", vue: "Vue", nuxt: "Nuxt", svelte: "Svelte",
  "@angular/core": "Angular", fastify: "Fastify", hono: "Hono", express: "Express",
  "@nestjs/core": "NestJS", "@trpc/server": "tRPC", "drizzle-orm": "Drizzle ORM",
  prisma: "Prisma", "@prisma/client": "Prisma", pg: "PostgreSQL", postgres: "PostgreSQL",
  "@neondatabase/serverless": "Neon", mongoose: "MongoDB", mongodb: "MongoDB",
  redis: "Redis", ioredis: "Redis", stripe: "Stripe", "@stripe/stripe-js": "Stripe",
  "@anthropic-ai/sdk": "Claude API", openai: "OpenAI API", tailwindcss: "Tailwind CSS",
  vitest: "Vitest", jest: "Jest", "@playwright/test": "Playwright", playwright: "Playwright",
  expo: "Expo", "react-native": "React Native", zod: "Zod", gsap: "GSAP", three: "three.js",
  "framer-motion": "Framer Motion", resend: "Resend", twilio: "Twilio",
  "socket.io": "Socket.IO", "@vercel/blob": "Vercel Blob", vite: "Vite", turbo: "Turborepo",
  electron: "Electron", puppeteer: "Puppeteer", firebase: "Firebase",
  "@supabase/supabase-js": "Supabase", "@aws-sdk/": "AWS", "@google-cloud/": "Google Cloud",
  nodemailer: "Nodemailer", jsonwebtoken: "JWT", jose: "JWT", "next-intl": "next-intl",
  "vue-i18n": "vue-i18n", i18next: "i18next", pinia: "Pinia", "fluent-ffmpeg": "FFmpeg",
  "ffmpeg-static": "FFmpeg", "@ffmpeg/ffmpeg": "FFmpeg", lenis: "Lenis",
  "chart.js": "Chart.js", recharts: "Recharts", "@sentry/": "Sentry",
};

// Python package (lower-case) → technology.
const PYPI = {
  fastapi: "FastAPI", flask: "Flask", django: "Django", pillow: "Pillow", openai: "OpenAI API",
  anthropic: "Claude API", "openai-whisper": "Whisper", "faster-whisper": "Whisper",
  pandas: "pandas", numpy: "NumPy", "scikit-learn": "scikit-learn", sqlalchemy: "SQLAlchemy",
  psycopg: "PostgreSQL", "psycopg2": "PostgreSQL", "psycopg2-binary": "PostgreSQL",
  torch: "PyTorch", playwright: "Playwright", moviepy: "MoviePy", streamlit: "Streamlit",
  selenium: "Selenium", celery: "Celery", pydantic: "Pydantic",
};

const DEPLOY_FILES = ["vercel.json", "render.yaml", "netlify.toml", "fly.toml", "Procfile", "eas.json"];
const SKIP_DIR = /(^|\/)(node_modules|\.next|dist|build|vendor|\.venv|venv|out|coverage)\//;
const MAX_MANIFESTS = 10;

// ---- GitHub helpers ---------------------------------------------------------

function headers(token, accept = "application/vnd.github+json") {
  const h = { Accept: accept, "X-GitHub-Api-Version": "2022-11-28" };
  if (token) h.Authorization = `Bearer ${token}`;
  return h;
}

const noStore = (url, token, accept) =>
  fetch(url, { headers: headers(token, accept), cache: "no-store" });

async function listRepos(login, token, ownToken) {
  const repos = [];
  for (let page = 1; page <= 10; page++) {
    // With the account's own token, /user/repos also returns its private repos.
    const url = ownToken
      ? `${API}/user/repos?affiliation=owner&per_page=100&page=${page}`
      : `${API}/users/${login}/repos?type=owner&per_page=100&page=${page}`;
    const res = await fetch(url, {
      headers: headers(token),
      next: { revalidate: LIST_TTL, tags: ["github-stats"] },
    });
    if (!res.ok) throw new Error(`GitHub ${res.status} listing ${login}`);
    const batch = await res.json();
    repos.push(...batch);
    if (batch.length < 100) break;
  }
  return repos.filter((r) => r.owner?.login === login && !r.fork && !EXCLUDED.has(r.name));
}

async function commitCount(repo, token) {
  const url = `${API}/repos/${repo.full_name}/commits?per_page=1&sha=${encodeURIComponent(repo.default_branch)}`;
  const res = await noStore(url, token);
  if (res.status === 409) return 0; // empty repository
  if (!res.ok) throw new Error(`GitHub ${res.status} on ${repo.full_name}`);
  const last = /[?&]page=(\d+)>;\s*rel="last"/.exec(res.headers.get("link") || "");
  if (last) return Number(last[1]);
  return (await res.json()).length;
}

async function rawFile(repo, path, token) {
  const url = `${API}/repos/${repo.full_name}/contents/${path
    .split("/")
    .map(encodeURIComponent)
    .join("/")}?ref=${encodeURIComponent(repo.default_branch)}`;
  const res = await noStore(url, token, "application/vnd.github.raw+json");
  return res.ok ? res.text() : "";
}

function npmTech(pkgText, out) {
  let pkg;
  try {
    pkg = JSON.parse(pkgText);
  } catch {
    return;
  }
  const deps = Object.keys({ ...pkg.dependencies, ...pkg.devDependencies });
  for (const d of deps) {
    if (NPM[d]) out.add(NPM[d]);
    for (const k in NPM) if (k.endsWith("/") && d.startsWith(k)) out.add(NPM[k]);
  }
}

function pyTech(text, out) {
  for (const m of text.toLowerCase().matchAll(/^[\s"']*([a-z0-9_.\-]+)/gm)) {
    const name = m[1].replace(/_/g, "-");
    if (PYPI[name]) out.add(PYPI[name]);
  }
}

// Everything we need from one repo, computed once per push.
async function computeFacts(repo, token) {
  const tech = new Set();
  let inProduction = Boolean(repo.homepage && repo.homepage.trim());

  const [commits, langsRes, treeRes, depRes] = await Promise.all([
    commitCount(repo, token).catch(() => 0),
    noStore(`${API}/repos/${repo.full_name}/languages`, token),
    noStore(
      `${API}/repos/${repo.full_name}/git/trees/${encodeURIComponent(repo.default_branch)}?recursive=1`,
      token
    ),
    noStore(`${API}/repos/${repo.full_name}/deployments?per_page=1`, token),
  ]);

  if (depRes.ok && (await depRes.json()).length > 0) inProduction = true;

  if (langsRes.ok) {
    const langs = await langsRes.json();
    const total = Object.values(langs).reduce((a, b) => a + b, 0) || 1;
    for (const [lang, bytes] of Object.entries(langs)) {
      // ignore traces (< 2 % of the code)
      if (LANGUAGES[lang] && bytes / total >= 0.02) tech.add(LANGUAGES[lang]);
    }
  }

  const paths = treeRes.ok
    ? ((await treeRes.json()).tree || []).filter((t) => t.type === "blob").map((t) => t.path)
    : [];
  const clean = paths.filter((p) => !SKIP_DIR.test(p));
  const base = (p) => p.split("/").pop();

  if (clean.some((p) => DEPLOY_FILES.includes(base(p)))) inProduction = true;
  if (clean.some((p) => /^(Dockerfile|docker-compose\.ya?ml|compose\.ya?ml)$/.test(base(p)))) tech.add("Docker");
  if (clean.some((p) => p.startsWith(".github/workflows/"))) tech.add("GitHub Actions");
  if (clean.some((p) => base(p) === "pubspec.yaml")) tech.add("Flutter");
  if (clean.some((p) => base(p) === "vercel.json")) tech.add("Vercel");
  if (clean.some((p) => base(p) === "render.yaml")) tech.add("Render");
  if (clean.some((p) => /\.xcodeproj\//.test(p) || base(p) === "Package.swift")) tech.add("Swift");

  const manifests = clean
    .filter((p) =>
      /^(package\.json|requirements[\w.-]*\.txt|pyproject\.toml|pom\.xml|build\.gradle(\.kts)?)$/.test(base(p))
    )
    .sort((a, b) => a.split("/").length - b.split("/").length)
    .slice(0, MAX_MANIFESTS);

  await Promise.all(
    manifests.map(async (p) => {
      const text = await rawFile(repo, p, token).catch(() => "");
      const name = base(p);
      if (name === "package.json") npmTech(text, tech);
      else if (name === "pom.xml" || name.startsWith("build.gradle")) {
        if (/spring-boot/.test(text)) tech.add("Spring Boot");
      } else pyTech(text, tech);
    })
  );

  return { commits, inProduction, tech: [...tech].sort() };
}

// Cached per repo + push: a new push changes pushed_at, hence the key.
function repoFacts(repo, token) {
  return unstable_cache(
    () => computeFacts(repo, token),
    ["gh-facts", FACTS_VERSION, repo.full_name, repo.pushed_at || ""],
    { revalidate: false }
  )();
}

// Run at most `limit` repos at once (GitHub dislikes bursts).
async function mapLimit(items, limit, fn) {
  const out = new Array(items.length);
  let i = 0;
  const worker = async () => {
    while (i < items.length) {
      const k = i++;
      out[k] = await fn(items[k]);
    }
  };
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return out;
}

async function accountStats({ login, tokenEnv }) {
  const own = process.env[tokenEnv];
  const token = own || process.env.GITHUB_TOKEN;
  const repos = await listRepos(login, token, Boolean(own));
  const facts = await mapLimit(repos, 6, (r) =>
    repoFacts(r, token).catch(() => ({ commits: 0, inProduction: false, tech: [] }))
  );
  return {
    login,
    projects: repos.length,
    commits: facts.reduce((a, f) => a + f.commits, 0),
    inProduction: facts.filter((f) => f.inProduction).length,
    tech: [...new Set(facts.filter((f) => f.inProduction).flatMap((f) => f.tech))],
    includesPrivate: Boolean(own),
  };
}

export async function getGithubStats() {
  const accounts = await Promise.all(ACCOUNTS.map(accountStats));
  const technologies = [...new Set(accounts.flatMap((a) => a.tech))].sort();
  return {
    commits: accounts.reduce((a, x) => a + x.commits, 0),
    projects: accounts.reduce((a, x) => a + x.projects, 0),
    projectsInProduction: accounts.reduce((a, x) => a + x.inProduction, 0),
    technologies: technologies.length,
    technologyList: technologies,
    accounts: accounts.map(({ tech, ...a }) => ({ ...a, technologies: tech.length })),
    updatedAt: new Date().toISOString(),
  };
}
