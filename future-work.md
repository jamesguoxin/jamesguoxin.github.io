# Future Work — Website Improvement Plan

## Recommended Roadmap (updated 2026-06-16)

The academic light refresh is now live. The next improvements should help a first-time visitor answer four questions quickly:

1. Who is Xin / James Guo?
2. What are his current research areas?
3. What are his strongest representative works?
4. How can someone recruit or collaborate with him?

### Next 1: Homepage Positioning and Conversion — ✅ COMPLETED

- Added a stable, non-animated identity line to the Matterhorn hero:
  - `Principal Research Scientist at SAIS`
  - `AI for Life Sciences · Multimodal Foundation Models`
- Kept the typed animation as secondary personality rather than the only
  research description.
- Added three direct hero actions: `Publications`, `Google Scholar`, and
  `Contact`.
- Added a short collaboration statement to Contact covering AI for life
  sciences, multimodal foundation models, and agentic AI for scientific
  discovery.

Completed with a stable identity line, research focus, direct Publications /
Google Scholar / Contact actions, and a collaboration statement.

### Next 2: Homepage Information Architecture — IMPLEMENTED LOCALLY (2026-06-16)

- Homepage order is now `About Me`, `Research Highlights`, `Selected
  Publications`, `Recent News`, `Experience`, and `Contact`.
- Recent News shows the latest four entries from `_data/news.yml`.
- Selected Publications shows six papers in this order: FLAG, HorusEye, RNA
  Design, Sprint or Delve, ChromFound, and SkySense.
- Complete Publications and News archives are generated as standalone pages
  and ready for deployment.
- Patents, academic service, interviews, competitions, and awards are on the
  generated standalone Academic & Professional Activities page rather than
  the homepage.
- The primary navigation contains homepage anchors only. Complete
  Publications and News pages are reached through `View all publications` and
  `More news`.
- Academic & Professional Activities is reached from the Experience section
  rather than a global footer link.
- Timeline was renamed to `Experience` and kept concise.

### Next 3: Resource Metadata and Research Navigation

- Add compact resource links where available: `Paper`, `Code`, and `Project`.
- Add `code` and `project` fields to publication data when useful.
- Consider future research navigation enhancements, such as topic filters or
  richer topic landing paths, only when the metadata supports them.

The representative homepage selection and complete Publications page are
already implemented. This item remains open only for resource metadata and
navigation enhancements not included in Next 2.

### Next 4: Content Editing and Credibility Details

- Professionally edit the About Me copy for concision and consistent terminology:
  - `Life Sciences`
  - `multi-omics`
  - `vision foundation models`
  - `large corporations and innovative startups`
- Replace broad claims such as `benefit the whole world` with a concrete research mission.
- Update numerical claims such as `15+ papers` when the displayed record has grown beyond them.
- Keep Awards chronological, preferably newest first, without artificial `1, 2, 3` ranking.
- Clarify project names for international visitors while retaining Chinese branding where useful.

### Next 5: Performance, Measurement, and Maintenance

- Add a downloadable CV when a publishable PDF is available (low priority).
- Add privacy-conscious analytics only if visitor metrics will influence decisions.
- Keep GitHub Actions workflow maintenance current.
- Resolve Sass `@import` deprecation warnings as part of a future styling/toolchain update.

### Deferred: Dark Mode and Framework Upgrade

- Dark mode remains a valid visual enhancement, but it is lower value than improving homepage hierarchy and conversion.
- Cusdis should only be added if comments are genuinely useful; otherwise disable Disqus and keep the site simpler.
- Bootstrap 5 / no-jQuery migration remains long-term technical work and should not block content improvements.

---

## Priority 1: Quick Wins (config changes only) — ✅ COMPLETED (2026-04-13)

### 1.1 Header Dynamic Text — ✅ Done
Configured lines are `Running Up That Hill` and
`Decoding Life with Foundation Models`.

### 1.2 Site Description — ✅ Done
Current description: *"Principal Research Scientist at SAIS — AI for Life
Sciences, Multimodal Foundation Models, and Scientific Agentic AI."*

### 1.3 Social Links — ✅ Done
- **Added:** Google Scholar, ORCID (with Academicons CDN for proper icons)
- **Removed:** Facebook, Twitter/X
- **Kept:** LinkedIn, GitHub
- Template updated to support custom `icon` field in social entries.

### 1.4 Disable Irrelevant Features — ✅ Done
- `tumblr-share: False`
- `pinterest-share: False`
- `vkontakte-share: False`
- Still TODO: Consider disabling Disqus comments if not actively used

---

## Priority 2: Content & Structure (moderate effort)

### 2.1 Split About Page into Dedicated Sections — IMPLEMENTED LOCALLY (2026-06-16)
The homepage now uses concise About, Research Highlights, Selected
Publications, Recent News, Experience, and Contact sections. Complete
Publications, News, and Activities content is generated as standalone pages
and ready for deployment.

### 2.2 Publication Tracking — Use YAML Data File — ✅ COMPLETED (2026-05-29)
Publications now live in `_data/publications.yml` (grouped by `section`, each
paper has `title`/`url`/`authors`/`venue` and an optional
`me_mark: equal|corr`). Shared Liquid includes render the selected homepage
list and complete Publications page, auto-highlight "Xin Guo", and append the
`*`/✉ marks. Adding a paper requires YAML changes rather than HTML editing.

Data model:
```yaml
- section: "AI4Biomedicine at SAIS"
  papers:
    - title: "ChromFound: Towards A Universal Foundation Model..."
      url: "https://arxiv.org/abs/2505.12638"
      authors: "Yifeng Jiao, Yuchen Liu, Yu Zhang, Xin Guo, ..."
      venue: "NeurIPS 2025"
      me_mark: "corr"   # "corr" → ✉, "equal" → *, omit for none; url optional
```

### 2.3 About Page — Add Photo and Key Metrics — ✅ COMPLETED (2026-06-07)
- Professional headshot is embedded in the About section.
- Key metrics are displayed in a responsive metric grid.

### 2.4 Timeline / Experience — IMPLEMENTED LOCALLY (2026-06-16)
The homepage section is named `Experience`, retains the four major career and
education entries, and stays concise rather than duplicating publications,
awards, and projects shown elsewhere.

### 2.5 Add Missing Pages
- **Talks/Presentations** — Conference talks, invited lectures
- **Teaching/Mentoring** — TA at EPFL, student supervision at SAIS
- **Open Source / Code** — SkySense, POA, and other repos with links and descriptions

---

## Priority 3: Blog Strategy — ✅ COMPLETED (2026-05-29)

Closed as sufficient for now. Three substantial posts (Lausanne restaurants 2016, ChatGPT/GPT-4 2023, Foundation Models Meet Biology 2026) cover the AI-for-Life-Science positioning well; the two recent tech posts are 1,500–2,000 words each. More posts are welcome over time but not a blocker.

### 3.1 Write More Consistently — Done (deemed sufficient)
3 posts; recent ones are on-message and substantial. Future posts optional, not required.

### 3.2 Add New Categories — Dropped
`tech` already covers research content; no new categories needed. Regenerated `tags/` pages so all tags on recent posts resolve (fixed previously-missing tag pages).

---

## Priority 4: Technical Debt (low urgency)

### 4.1 Remove `_site/` from Git — Use GitHub Actions to Build — ✅ COMPLETED (2026-05-30, verified live)
- Added `.github/workflows/jekyll.yml`: builds with Bundler (`bundle exec jekyll build`) and deploys via GitHub Pages on push to `master`.
- Added `Gemfile` / `Gemfile.lock` pinning jekyll, jekyll-paginate, jemoji, jekyll-spaceship, webrick.
- Gitignored `_site/` and untracked it (87 files); generated output is no longer committed.
- Repo setting changed: Settings → Pages → Source → "GitHub Actions".
- First deploy succeeded and the live site was confirmed updated.

**Gotchas hit (for future reference):**
- Pushing workflow files needs a PAT with `workflow` scope (or push via SSH).
- Bundler 4 wrote a `CHECKSUMS` section with empty entries (Tsinghua mirror serves no checksums), which fails CI's frozen `bundle install`. Fix: removed the `CHECKSUMS` section. When regenerating the lockfile locally, verify with `BUNDLE_FROZEN=true bundle check` before pushing.
- Legacy CI configuration was removed after GitHub Actions became the sole deploy path.

### 4.2 Set Up Google Analytics
Currently empty in `_config.yml`. Set up if you want to track visitor metrics.

### 4.3 Framework Upgrade (long-term)
- Bootstrap 3.3.5 → 5.x
- jQuery 1.11.3 → remove or update
- Font Awesome 4.4.0 → 6.x
- Consider migrating to a modern academic theme (e.g., Hugo Academic / al-folio for Jekyll) which has built-in publication management, BibTeX import, and responsive design
- NB: the upstream theme (le4ker fork) has already done most of this — see Priority 5. Route B there ≈ this upgrade.

---

## Priority 5: Adopt Upstream Theme Updates (le4ker fork)

Context: the upstream theme [le4ker/personal-jekyll-theme](https://github.com/le4ker/personal-jekyll-theme) (v10.4.1, Mar 2026) has diverged substantially from our fork — it rewrote to **Bootstrap 5 (no jQuery)**, **Font Awesome 7**, and a **CSS-variable + `[data-theme]` styling system**. Our `grayscale.scss` still uses Bootstrap 3 + SASS `darken()`/hardcoded colors. Reviewed 2026-05-30; decided to cherry-pick rather than wholesale-merge.

**Already adopted (2026-05-30):**
- ✅ Mermaid diagrams via `jekyll-spaceship` (build-time SVG; see Plugins / CLAUDE.md).
- ✅ GitHub Actions deploy (= §4.2).

### 5.1 Dark mode with theme toggle — ⬜ TODO (highest-value visual upgrade)
System-following + manual toggle button, preference saved in `localStorage`. This is the main reason the upstream "looks nice".
**Decision: Route A (incremental).** Keep Bootstrap 3 and current structure; convert `grayscale.scss` to CSS variables and hand-write light/dark palettes coordinated with the Matterhorn backdrop. Large styling job — do as its own focused session.
- (Route B = adopt upstream's Bootstrap 5 + new styles and port our customizations back. Rejected for now: highest risk, ≈ a full front-end re-integration. Equivalent to §4.4.)
- Upstream reference clone notes: dark mode bootstraps via an inline `<head>` script reading `localStorage.theme` and setting `data-theme`; toggle logic lives in `js.html`; styles key off `[data-theme="dark"]`.

### 5.2 Cusdis comments — ⬜ TODO (depends on 5.1)
Upstream replaced Disqus with **Cusdis** (open-source, privacy-friendly, no tracking). Its include syncs the comment widget's light/dark theme to the page `data-theme`, so it should land **together with 5.1**. We currently have `disqus-shortname: jamesguoxin` configured but rarely used — alternatively just disable comments entirely (this also closes the §1.4 leftover TODO).

### 5.3 Skipped from upstream (intentionally)
- License change to Apache 2.0, Conventional Commits, git hooks — maintainer tooling, not relevant to us.
- Single-quote `site.quote` header (we keep typed.js multi-line animation).

---

## Current status snapshot (2026-06-16)

- **Implemented locally:** homepage information architecture, representative
  publication curation, generated Publications / News / Activities pages, and
  the Experience rename.
- **Previously completed:** homepage positioning, P1 quick wins, P2.2
  publication data, P2.3 photo + metrics, P3 blog, P4.1 Actions workflow, P5
  Mermaid, and the academic light visual refresh.
- **Recommended next:** continue adding Code / Project resource metadata where
  available, then consider research navigation improvements supported by that
  metadata.
- **Open but lower priority:** P2.5 optional pages, P4.2 analytics, P4.3
  framework upgrade, P5.1 dark mode, and P5.2 Cusdis or disabling comments.
- **Workflow note:** edit → `scripts/preview` (local check) → commit → `git push` → Actions auto-deploys (~1–2 min). Do NOT commit `_site/`. Workflow-file pushes need a PAT with `workflow` scope.

---

*Generated: 2026-04-05 · last updated: 2026-06-16*
