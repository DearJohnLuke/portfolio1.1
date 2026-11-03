"""Build the CV (FR 2 pages + EN 2 pages) as HTML, same layout as the Canva CV."""
import html, pathlib

HERE = pathlib.Path(__file__).parent
PHOTO = str((pathlib.Path(__file__).parent / "../public/assets/photo.png").resolve())
SITE = "https://jeanluc-luzemba.vercel.app"

CONTACT = {
    "fr": ["+32 467 613 480", "luzembajean-luc@outlook.com", "Bruxelles, Belgique", SITE.replace("https://", "")],
    "en": ["+32 467 613 480", "luzembajean-luc@outlook.com", "Brussels, Belgium", SITE.replace("https://", "")],
}
ICONS = ["☎", "✉", "⌖", "⊕"]

T = {
 "fr": dict(
  title="AI Engineer | Architecte de systèmes numériques",
  pitch="Je conçois, construis et mets en production des agents LLM, des pipelines GenAI et des plateformes SaaS : spécifiés d'abord, testés, déployés et utilisés par de vrais clients en Belgique et en RD Congo.",
  skills_h="Compétences clés",
  skills=[
   ("IA & GenAI", [
     "Agents LLM (Claude API) : décisions structurées, garde-fous, validation humaine",
     "Pipelines GenAI : transcription (Whisper), sélection par agent, rendu vidéo (FFmpeg), synthèse vocale locale",
     "Contrôle des sorties IA : vérification des chiffres contre les données sources",
     "Workers asynchrones : outbox transactionnelle, GitHub Actions",
   ]),
   ("Backend & données", [
     "Python, TypeScript, Node.js (Fastify, Hono, NestJS), Java / Spring Boot",
     "PostgreSQL : contraintes d'exclusion, rôles à moindre privilège, migrations",
     "Drizzle ORM, Prisma, REST, tRPC, webhooks signés",
     "Paiements : Stripe, FlexPay (mobile money)",
   ]),
   ("Frontend & mobile", [
     "Vue 3, React 19, Next.js 16, Tailwind",
     "Flutter, Expo (React Native), Swift / SwiftUI",
     "Interfaces multilingues FR / NL / EN",
   ]),
  ],
  exp_h="Expérience",
  rc_role="Fondateur & AI Engineer / Architecte de systèmes",
  rc_meta="Robust Code SARL | Nov 2024 – Présent",
  rc=[
   "Conception et mise en production d'agents LLM (Claude API) qui qualifient les leads, planifient l'action suivante et réservent les visites, avec moteur de règles déterministe en repli (ARM)",
   "Pipeline vidéo IA : probe → transcription Whisper → agent « director » → rendu FFmpeg, worker sur GitHub Actions ; spécifié, construit et livré en production en 48 h (Robust Clip)",
   "Moteur de rapports narrés « video as code » (Python, Pillow, FFmpeg, voix clonée avec consentement) ; garde-fou qui bloque toute narration citant un chiffre absent des données sources (JOHN)",
   "Produit SaaS pour salons (Next.js, PostgreSQL) déployé 7 fois à Bruxelles et Kinshasa, 2 clients payants ; double réservation impossible grâce à une contrainte d'exclusion PostgreSQL",
   "Automatisation financière pour PME belges : lecture de factures Peppol BIS 3.0, détection de doublons, workflow d'approbation (NestJS, tRPC, Prisma, Turborepo)",
   "Tests automatisés systématiques : plus de 100 cas par produit (Vitest, Playwright, XCTest), exécutés contre une vraie base PostgreSQL",
   "Infrastructure cloud et CI/CD : Vercel, Render, Neon, Docker, GitHub Actions",
   "Méthode RSDDF : spécification → plan → preuve avant chaque mise en production",
  ],
  data_h="Cloud, DevOps & méthode",
  data=[
   "Déploiement : Vercel (Build Output API), Render, Neon, Cloudflare R2",
   "Conteneurs Docker, pipelines CI/CD GitHub Actions",
   "Sécurité applicative : JWT, rôles DB séparés, secrets hors du code",
   "Spécification avant code (RSDDF), ADR, Agile / Scrum",
   "Analyse des besoins métiers → spécifications techniques",
  ],
  tools_h="Outils",
  tools="Git • GitHub • GitHub Actions • VS Code • Claude Code • Xcode • Postman • Swagger / OpenAPI • Docker • Vercel • Neon • Render • Stripe • Playwright • Jira • Notion • Miro",
  lang_h="Langues", langs="Français, anglais, portugais",
  ref_h="Références",
  ref=[("Donatien Pandikuziku", "Project Manager USAID (FEWS NET)", "Contact sur demande"),
       ("Sebastien De Beauffort", "+32 470 35 74 35")],
  proj_h="Projets récents — preuves",
  proj_note="Vidéos de démo et captures : " + SITE.replace("https://", "") + "/work",
  fews_role="Consultant ICT & transformation numérique",
  fews_meta="FEWS NET (USAID) | Nov 2022 – Oct 2024",
  fews=[
   "Analyse et formalisation des besoins métiers dans un environnement international",
   "Contribution à la conception et à l'amélioration de systèmes d'information",
   "Évaluations en cybersécurité et amélioration des systèmes existants",
   "Suivi de l'exécution des projets ICT, des risques et des délais",
  ],
  edu_h="Éducation & certifications",
  edu=[
   ("Bachelor en administration des affaires (management stratégique)", "Équivalence en cours — 2022"),
   ("CESS scientifique (mathématiques & physique)", "Équivalence obtenue — 2016"),
   ("Harvard University — Introduction to Programming with Python", "Certification"),
   ("Google — Foundations of Cybersecurity", "Certification"),
  ],
  qr=["Portfolio", "Projets & vidéos", "Certificat Python", "Certificat cybersécurité"],
 ),
 "en": dict(
  title="AI Engineer | Digital Systems Architect",
  pitch="I design, build and ship LLM agents, GenAI pipelines and SaaS platforms to production: specified first, tested, deployed and used by real clients in Belgium and DR Congo.",
  skills_h="Core skills",
  skills=[
   ("AI & GenAI", [
     "LLM agents (Claude API): structured decisions, guardrails, human approval",
     "GenAI pipelines: transcription (Whisper), agent-driven selection, video rendering (FFmpeg), local TTS",
     "AI output control: figures checked against the source data",
     "Async workers: transactional outbox, GitHub Actions",
   ]),
   ("Backend & data", [
     "Python, TypeScript, Node.js (Fastify, Hono, NestJS), Java / Spring Boot",
     "PostgreSQL: exclusion constraints, least-privilege roles, migrations",
     "Drizzle ORM, Prisma, REST, tRPC, signed webhooks",
     "Payments: Stripe, FlexPay (mobile money)",
   ]),
   ("Frontend & mobile", [
     "Vue 3, React 19, Next.js 16, Tailwind",
     "Flutter, Expo (React Native), Swift / SwiftUI",
     "Multilingual UIs FR / NL / EN",
   ]),
  ],
  exp_h="Experience",
  rc_role="Founder & AI Engineer / Systems Architect",
  rc_meta="Robust Code SARL | Nov 2024 – Present",
  rc=[
   "Designed and shipped LLM agents (Claude API) that qualify leads, plan the next action and book visits, with a deterministic rules engine as fallback (ARM)",
   "AI video pipeline: probe → Whisper transcription → LLM director agent → FFmpeg render, worker on GitHub Actions; specified, built and shipped to production in 48 hours (Robust Clip)",
   "Video-as-code narrated report engine (Python, Pillow, FFmpeg, consented voice clone) with a guard that blocks any narration quoting a figure not in the source data (JOHN)",
   "Salon SaaS product (Next.js, PostgreSQL) deployed 7 times in Brussels and Kinshasa, 2 paying clients; double booking made impossible by a PostgreSQL exclusion constraint",
   "Financial automation for Belgian SMEs: Peppol BIS 3.0 invoice reading, duplicate detection, approval workflow (NestJS, tRPC, Prisma, Turborepo)",
   "Automated testing on every product: 100+ test cases each (Vitest, Playwright, XCTest), run against a real PostgreSQL database",
   "Cloud infrastructure and CI/CD: Vercel, Render, Neon, Docker, GitHub Actions",
   "RSDDF method: specification → plan → proof before every release",
  ],
  data_h="Cloud, DevOps & method",
  data=[
   "Deployment: Vercel (Build Output API), Render, Neon, Cloudflare R2",
   "Docker containers, GitHub Actions CI/CD pipelines",
   "Application security: JWT, separate DB roles, secrets out of code",
   "Specification before code (RSDDF), ADRs, Agile / Scrum",
   "Business requirements → technical specifications",
  ],
  tools_h="Tools",
  tools="Git • GitHub • GitHub Actions • VS Code • Claude Code • Xcode • Postman • Swagger / OpenAPI • Docker • Vercel • Neon • Render • Stripe • Playwright • Jira • Notion • Miro",
  lang_h="Languages", langs="French, English, Portuguese",
  ref_h="References",
  ref=[("Donatien Pandikuziku", "Project Manager USAID (FEWS NET)", "Contact on demand"),
       ("Sebastien De Beauffort", "+32 470 35 74 35")],
  proj_h="Recent projects — proof",
  proj_note="Demo videos and screenshots: " + SITE.replace("https://", "") + "/work",
  fews_role="ICT & Digital Transformation Consultant",
  fews_meta="FEWS NET (USAID) | Nov 2022 – Oct 2024",
  fews=[
   "Gathered and analysed business requirements in a multinational environment",
   "Contributed to the design and improvement of information systems",
   "Took part in cybersecurity assessments and system improvements",
   "Monitored ICT project execution, risks and delivery timelines",
  ],
  edu_h="Education & certifications",
  edu=[
   ("Bachelor of Business Administration (Strategic Management)", "Equivalency in progress — 2022"),
   ("Secondary education, scientific track (maths & physics)", "Equivalency obtained — 2016"),
   ("Harvard University — Introduction to Programming with Python", "Certification"),
   ("Google — Foundations of Cybersecurity", "Certification"),
  ],
  qr=["Portfolio", "Projects & videos", "Python certificate", "Cybersecurity certificate"],
 ),
}

# (name, stack, proof fr, proof en)
PROJECTS = [
 ("ARM — Agentic Relationship Management", "TypeScript · Fastify · Drizzle · PostgreSQL · Vue 3 · Claude API",
  "Agent de raisonnement sur outbox transactionnelle ; agenda protégé par contrainte EXCLUDE ; 106 tests sur Neon",
  "Reasoning agent on a transactional outbox; agenda guarded by an EXCLUDE constraint; 106 tests on Neon"),
 ("Robust Clip", "TypeScript · Hono · Vue 3 · Whisper · FFmpeg · Stripe · GitHub Actions",
  "En production sur clip.robust-code.com ; validation humaine de chaque clip ; paiements Stripe live",
  "Live at clip.robust-code.com; human approval on every clip; live Stripe payments"),
 ("REM — Salon Edition", "Next.js 16 · React 19 · PostgreSQL · next-intl",
  "7 déploiements, 2 clients payants ; réservation multi-collaborateurs en 4 langues",
  "7 deployments, 2 paying clients; multi-staff booking in 4 languages"),
 ("JOHN & moteur de rapports narrés|JOHN & narrated report engine", "Python · Pillow · FFmpeg · TTS local",
  "Vidéo de 2:29 rendue en ~1,5 min ; garde-fou sur les chiffres ; voix IA signalée",
  "2:29 video rendered in ~1.5 min; number guard; AI voice always labelled"),
 ("Momentum OS", "TypeScript · Hono · Next.js · Expo · Drizzle · Playwright",
  "Web + mobile depuis un monorepo ; 329 cas de test",
  "Web + mobile from one monorepo; 329 test cases"),
 ("REM — Financial Operations Automation", "Bun · NestJS · tRPC · Prisma · PostgreSQL · Docker",
  "Factures Peppol BIS 3.0, détection de doublons ; base multi-tenant ; 110 fichiers de test",
  "Peppol BIS 3.0 invoices, duplicate detection; multi-tenant base; 110 test files"),
 ("Bloomfield Financial", "Fastify · Vue 3 · Flutter · Drizzle · Neon · Stripe",
  "En ligne (pré-lancement) ; rôle DB à moindre privilège ; 116 cas de test",
  "Live (pre-launch); least-privilege DB role; 116 test cases"),
 ("RDP — Delivery Platform", "Java 21 · Spring Boot 3.5 · React 19 · Expo",
  "Flux commande → livraison unifié ; E2E Playwright 16/16 contre le vrai backend",
  "Unified order → delivery flow; Playwright E2E 16/16 against the real backend"),
]

e = html.escape

def contacts(lang):
    return "".join(f'<li><span class="ic">{ICONS[i]}</span>{e(c)}</li>' for i, c in enumerate(CONTACT[lang]))

def bullets(items):
    return "<ul>" + "".join(f"<li>{e(i)}</li>" for i in items) + "</ul>"

def page1(lang):
    t = T[lang]
    groups = "".join(f'<p class="grp">{e(g)}</p>{bullets(items)}' for g, items in t["skills"])
    return f"""
<section class="page">
  <aside>
    <div class="photo"><img src="file://{PHOTO}" alt=""></div>
    <div class="side">
      <ul class="contact">{contacts(lang)}</ul>
      <h2 class="sh">{e(t['skills_h'])}</h2>
      {groups}
    </div>
  </aside>
  <main>
    <h1>Jean-Luc<br>Luzemba</h1>
    <p class="title">{e(t['title'])}</p>
    <p class="pitch">{e(t['pitch'])}</p>
    <h2 class="mh">{e(t['exp_h'])}</h2>
    <div class="tl">
      <h3>{e(t['rc_role'])}</h3>
      <p class="meta">{e(t['rc_meta'])}</p>
      {bullets(t['rc'])}
    </div>
  </main>
</section>"""

def page2(lang):
    t = T[lang]
    qrs = ["qr-portfolio.png", "qr-work.png", "qr-python.png", "qr-cyber.png"]
    qr = "".join(f'<figure><img src="img/{q}"><figcaption>{e(c)}</figcaption></figure>' for q, c in zip(qrs, t["qr"]))
    projs = ""
    for name, stack, pfr, pen in PROJECTS:
        n = name.split("|")[0 if lang == "fr" else -1]
        projs += f'<div class="pj"><p class="pn">{e(n)}</p><p class="ps">{e(stack)}</p><p class="pp">{e(pfr if lang == "fr" else pen)}</p></div>'
    edu = "".join(f'<li><b>{e(a)}</b><br><span>{e(b)}</span></li>' for a, b in t["edu"])
    refs = "".join('<p class="tools ref"><b>' + e(r[0]) + '</b>' + "".join('<br>' + e(x) for x in r[1:]) + '</p>' for r in t["ref"])
    return f"""
<section class="page">
  <aside>
    <div class="side full">
      <h2 class="sh">{e(t['data_h'])}</h2>
      {bullets(t['data'])}
      <h2 class="sh">{e(t['tools_h'])}</h2>
      <p class="tools">{e(t['tools'])}</p>
      <h2 class="sh">{e(t['lang_h'])}</h2>
      <p class="tools">{e(t['langs'])}</p>
      <h2 class="sh">{e(t['ref_h'])}</h2>
      {refs}
    </div>
    <div class="qr">{qr}</div>
  </aside>
  <main>
    <h2 class="mh first">{e(t['proj_h'])}</h2>
    <div class="tl">
      {projs}
      <p class="note">{e(t['proj_note'])}</p>
    </div>
    <div class="tl">
      <h3>{e(t['fews_role'])}</h3>
      <p class="meta">{e(t['fews_meta'])}</p>
      {bullets(t['fews'])}
    </div>
    <h2 class="mh">{e(t['edu_h'])}</h2>
    <ul class="edu">{edu}</ul>
  </main>
</section>"""

CSS = """
@page { size: A4; margin: 0; }
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Montserrat', sans-serif; color: #111; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
.page { width: 210mm; height: 297mm; display: flex; overflow: hidden; page-break-after: always; background: #fff; }
aside { width: 38.5%; background: #000; color: #fff; display: flex; flex-direction: column; }
.photo { background: #e8e8e8; height: 92mm; display: flex; align-items: flex-end; justify-content: center; overflow: hidden; border-bottom: 3mm solid #2a2a2a; }
.photo img { width: 74mm; height: 74mm; object-fit: cover; object-position: top; border-radius: 0 0 50% 50%; }
.side { padding: 5mm 6mm 0 6mm; font-size: 8pt; line-height: 1.42; font-weight: 300; }
.side.full { padding-top: 8mm; flex: 1; }
.ref + .ref { margin-top: 1.6mm; }
.contact { list-style: none; margin-bottom: 3mm; }
.contact li { margin-bottom: 1.6mm; font-size: 7.8pt; }
.contact .ic { display: inline-block; width: 5mm; }
.sh { font-weight: 300; font-size: 15pt; letter-spacing: .06em; text-transform: uppercase; text-align: center; margin: 3mm 0 2mm; line-height: 1.05; }
.grp { text-transform: uppercase; font-size: 7.6pt; margin-top: 1.6mm; letter-spacing: .02em; }
.side ul { padding-left: 4mm; }
.side ul:not(.contact) li { margin-bottom: .6mm; }
.tools { font-size: 8pt; }
.qr { display: flex; justify-content: space-between; background: #fff; color: #111; padding: 3mm 3mm 4mm; }
.qr figure { text-align: center; width: 18mm; }
.qr img { width: 15mm; height: 15mm; image-rendering: pixelated; }
.qr figcaption { font-size: 5.4pt; line-height: 1.2; margin-top: .6mm; }
main { width: 61.5%; padding: 13mm 9mm 0 9mm; font-size: 8.9pt; line-height: 1.5; }
h1 { font-family: 'Bebas Neue', sans-serif; font-weight: 400; font-size: 64pt; line-height: .86; letter-spacing: .01em; margin-top: 3mm; }
.title { font-weight: 300; font-size: 15pt; text-transform: uppercase; line-height: 1.1; margin: 4mm 0 3mm; letter-spacing: .03em; }
.pitch { font-size: 9.4pt; color: #222; }
.mh { font-weight: 300; font-size: 17pt; text-transform: uppercase; margin: 5mm 0 2.5mm; letter-spacing: .03em; }
.mh.first { margin-top: 0; }
.tl { border-left: .3mm solid #111; padding-left: 5mm; margin-left: 1mm; position: relative; margin-bottom: 3mm; }
.tl::before { content: ''; position: absolute; left: -1.4mm; top: .6mm; width: 1.8mm; height: 1.8mm; border: .4mm solid #111; border-radius: 50%; background: #fff; }
.tl h3 { font-size: 9.6pt; font-weight: 700; text-transform: uppercase; letter-spacing: .04em; line-height: 1.2; }
.meta { color: #444; margin: 1mm 0 2mm; }
main ul { padding-left: 4mm; }
main ul li { margin-bottom: 1mm; }
.pj { margin-bottom: 1.8mm; }
.pn { font-weight: 700; font-size: 9pt; }
.ps { font-size: 7.6pt; color: #555; letter-spacing: .01em; }
.pp { font-size: 8.2pt; line-height: 1.38; }
.note { font-size: 7.2pt; font-style: italic; color: #444; }
.edu { list-style: none; padding-left: 0 !important; }
.edu li { margin-bottom: 1.6mm; font-size: 8.4pt; line-height: 1.35; }
.edu span { color: #555; }
"""

doc = f"""<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Montserrat:wght@300;400;700&display=swap" rel="stylesheet">
<style>{CSS}</style></head><body>
{page1('fr')}{page2('fr')}{page1('en')}{page2('en')}
</body></html>"""
(HERE / "cv.html").write_text(doc, encoding="utf-8")
print("ok")
