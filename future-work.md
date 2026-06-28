# Future Work - Website Improvement Plan

Last updated: 2026-06-28

The site should continue to work primarily as an academic and research profile:
fast to understand, easy to verify, and simple to contact. The current
positioning is:

- AI for Life Sciences
- Multimodal Scientific Foundation Models
- Scientific Agentic AI
- Automated Labs for Closed-Loop Discovery

## Active Priorities

### 1. Blog / Review Content Strategy

Raise blog quality and cadence as a high-priority content track. The website
should remain the canonical long-form archive, with selected posts synchronized
to the WeChat personal public account.

Recommended review-style topics:

- AI for Life Sciences Foundation Models: A Practical Research Map
- Multimodal Scientific Foundation Models: From Omics to Spatial Biology
- Scientific Agentic AI: Why Tool-Using Models Matter for Discovery
- Automated Labs and Closed-Loop Discovery: What AI Researchers Should Know

Future implementation candidates:

- Add per-post canonical or cross-post metadata for WeChat versions.
- Add review-specific tags or a lightweight review collection.
- Improve the Blog index once there are enough review-style posts.
- Add article structured data after the publishing pattern stabilizes.

### 2. Publication Resource Metadata

#### Publication Metadata Audit

Continue adding official `Paper`, `Code`, and `Project` links only when they
are confirmed. Use this metadata to support future research navigation only
after the links are sufficiently complete.

Confirmed official code links are currently listed for:

- FLAG
- ChromFound
- SOLD
- HorusEye
- SkySense
- POA
- S2DC
- PUIR
- SCRIPT

No official code currently listed for:

- Efficient Network Automatic Relevance Determination
- Minimal Semantic Sufficiency Meets Unsupervised Domain Generalization
- Sprint or Delve
- Simultaneously Short- and Long-Term Temporal Modeling
- PECEL
- The Innovation remote sensing foundation model paper
- RSE zero-shot urban land-use mapping
- Automatic Car Damage Assessment System
- Feature Correlation Distillation
- ICASSP 2015 NMF source separation

### 3. Research Navigation

Consider topic filters or richer research landing paths after publication
metadata is complete enough to support them cleanly.

Potential scope:

- Filter Publications by research area.
- Add compact topic pages for the four homepage research directions.
- Link representative papers, code, and blog reviews under each direction.

This should wait until the metadata and content are strong enough to avoid
empty or uneven sections.

### 4. Optional Pages

Add only if there is enough real content to justify each page:

- Talks / Presentations
- Teaching / Mentoring
- Open Source / Code

These are useful, but they are lower priority than CV and review content.

## Backlog

### Analytics

Google Analytics or another privacy-conscious analytics tool can be added if
visitor metrics will influence decisions. Leave it off if the data will not be
used.

### Dark Mode

Dark mode remains a valid standalone visual enhancement, but it should wait
until content, metadata, and review publishing are stable.

Preferred future route:

- Keep the current Bootstrap 5 baseline.
- Convert theme colors to CSS variables.
- Add a system-following theme with a manual toggle saved in `localStorage`.

### Comments

Comments are disabled. Cusdis can be reconsidered only if comments become
genuinely useful for review-style blog posts. If added, it should land after or
alongside dark-mode theme plumbing so the widget matches the page theme.

## Maintenance Notes

Routine maintenance should stay small and staged:

- Keep GitHub Actions dependencies current.
- Keep Sass module usage current as Dart Sass removes legacy APIs.
- Keep Playwright screenshots updated when intentional visual changes land.
- Do not commit `_site/`; GitHub Actions builds and deploys the site.

Suggested workflow:

```bash
scripts/check-site-architecture
npm run test:visual
JEKYLL_ENV=production bundle exec jekyll build --config _config.yml,_config.dev.yml
git push
```

## Completed

### Homepage Positioning

Completed and deployed.

- Added stable identity line: `Principal Research Scientist at SAIS`.
- Added research focus around AI for life sciences, multimodal scientific
  foundation models, scientific agentic AI, and automated labs.
- Added hero actions for Publications, Google Scholar, and Contact.
- Updated About, Research, and Contact copy to support the AI4Science
  positioning.
- Kept HorusEye out of the core medical-positioning narrative.
- Updated publication metric to `20+`.

### Homepage Information Architecture

Completed and deployed.

- Homepage order is now About, Research Highlights, Selected Publications,
  Recent News, Experience, and Contact.
- Publications, News, and Academic & Professional Activities are generated as
  standalone pages.
- Blog is a distinct navigation item.
- Activities are reached from Experience rather than as a top-level homepage
  section.

### Publication Data Model

Completed.

- Publications live in `_data/publications.yml`.
- Shared Liquid includes render selected homepage publications and the complete
  Publications page.
- The model supports optional `url`, `code`, `project`, `me_mark`, and display
  metadata.

### Technical Foundation

Completed.

- GitHub Actions builds and deploys the site through GitHub Pages.
- `_site/` is no longer committed.
- Bootstrap 3 was replaced with Bootstrap 5.
- First-party jQuery interactions were replaced with vanilla JavaScript.
- Font Awesome was upgraded to a current baseline.
- Legacy typed and rrssb scripts were removed.
- Sass `@import` deprecation warnings were resolved with Sass module `@use`
  syntax.
- GitHub Actions Node.js runtime annotations were resolved by updating Pages
  actions to Node 24-compatible versions.

### SEO And Search

Completed.

- Added crawlable `robots.txt`.
- Added absolute canonical URLs.
- Added page-specific post descriptions.
- Added Open Graph metadata.
- Added Google Search Console verification file.

### Visual QA

Completed.

- Added Playwright visual regression checks for homepage, Blog, one post,
  Publications, and Activities.
- Covered desktop and mobile screenshots.
- Added checks for navbar alignment, Research Highlights alignment, and mobile
  navbar behavior.
- Fixed Bootstrap 5 mobile column width issues by adding explicit `col-12`
  classes where needed.

### CV / Resume Download

Completed.

- Added a compiled English academic CV PDF under `assets/cv/`.
- Added a `CV` action in the hero.
- Added a `Download CV` link in Contact.

### Earlier Quick Wins

Completed.

- Updated site description and social links.
- Added Google Scholar and ORCID.
- Removed irrelevant social/share options.
- Disabled Disqus comments.
- Added professional headshot and key metrics.
- Added Mermaid diagram support through `jekyll-spaceship`.
