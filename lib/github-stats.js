// Live GitHub figures for the home page: total commits and number of projects
// across both accounts (DearJohnLuke + RobustCode-Incorporated).
//
// How it stays cheap and live:
// - the repo list of each account is fetched at most every LIST_TTL seconds;
// - the commit count of a repo is cached under a key containing its `pushed_at`,
//   so it is fetched again only when that repo has received a push.
//
// Counted: commits on the default branch of every repo the account owns
// (forks excluded, private repos included when the account's own token is set).
//
// Env (server only — never import this file from a client component):
//   GITHUB_TOKEN_DEARJOHNLUKE  token of DearJohnLuke   (sees its private repos)
//   GITHUB_TOKEN_ROBUSTCODE    token of RobustCode-Incorporated
//   GITHUB_TOKEN               fallback for both (public repos of the other account only)


export const ACCOUNTS = [
  { login: "DearJohnLuke", tokenEnv: "GITHUB_TOKEN_DEARJOHNLUKE" },
  { login: "RobustCode-Incorporated", tokenEnv: "GITHUB_TOKEN_ROBUSTCODE" },
];

const LIST_TTL = 30; // seconds
const API = "https://api.github.com";

// Upstream code copied into our accounts, not our work.
const EXCLUDED = new Set(["VoiceStudio", "gods-eye-view"]);

function headers(token) {
  const h = { Accept: "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28" };
  if (token) h.Authorization = `Bearer ${token}`;
  return h;
}

async function gh(url, token, next) {
  const res = await fetch(url, { headers: headers(token), next });
  return res;
}

async function listRepos(login, token, ownToken) {
  const repos = [];
  for (let page = 1; page <= 10; page++) {
    // With the account's own token, /user/repos also returns its private repos.
    const url = ownToken
      ? `${API}/user/repos?affiliation=owner&per_page=100&page=${page}`
      : `${API}/users/${login}/repos?type=owner&per_page=100&page=${page}`;
    const res = await gh(url, token, { revalidate: LIST_TTL, tags: ["github-stats"] });
    if (!res.ok) throw new Error(`GitHub ${res.status} listing ${login}`);
    const batch = await res.json();
    repos.push(...batch);
    if (batch.length < 100) break;
  }
  return repos.filter(
    (r) => r.owner?.login === login && !r.fork && !EXCLUDED.has(r.name)
  );
}

async function commitCount(repo, token) {
  // pushed_at in the URL = new cache entry only after a push.
  const url = `${API}/repos/${repo.full_name}/commits?per_page=1&sha=${encodeURIComponent(
    repo.default_branch
  )}&_pushed=${encodeURIComponent(repo.pushed_at || "")}`;
  const res = await gh(url, token, { revalidate: false });
  if (res.status === 409) return 0; // empty repository
  if (!res.ok) throw new Error(`GitHub ${res.status} on ${repo.full_name}`);
  const last = /[?&]page=(\d+)>;\s*rel="last"/.exec(res.headers.get("link") || "");
  if (last) return Number(last[1]);
  const body = await res.json();
  return body.length;
}

// Run at most `limit` requests at once (GitHub dislikes bursts).
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
  const counts = await mapLimit(repos, 8, (r) => commitCount(r, token).catch(() => 0));
  return {
    login,
    projects: repos.length,
    commits: counts.reduce((a, b) => a + b, 0),
    includesPrivate: Boolean(own),
  };
}

export async function getGithubStats() {
  const accounts = await Promise.all(ACCOUNTS.map(accountStats));
  return {
    commits: accounts.reduce((a, x) => a + x.commits, 0),
    projects: accounts.reduce((a, x) => a + x.projects, 0),
    accounts,
    updatedAt: new Date().toISOString(),
  };
}
