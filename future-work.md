# Future Work — Website Improvement Plan

## Priority 1: Quick Wins (config changes only) — ✅ COMPLETED (2026-04-13)

### 1.1 Header Dynamic Text — ✅ Done
Added professional lines: "AI for Life Science", "Foundation Models × Biology" alongside existing Kate Bush lyrics.

### 1.2 Site Description — ✅ Done
Updated to: *"Principal Research Scientist at SAIS — AI for Life Science, Genomic Foundation Models, and Multimodal Perception."*

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

### 2.1 Split About Page into Dedicated Pages
Current `about.html` is 258 lines mixing news, bio, publications, patents, awards, and academic activities.

Suggested new structure:
- **About** — Bio + recent news only
- **Publications** — Dedicated page with all papers
- **Awards & Activities** — Patents, awards, competitions, interviews

Update `pages_list` in `_config.yml` accordingly.

### 2.2 Publication Tracking — Use YAML Data File — ✅ COMPLETED (2026-05-29)
Publications now live in `_data/publications.yml` (grouped by `section`, each paper has `title`/`url`/`authors`/`venue` and an optional `me_mark: equal|corr`). `about.html` renders them via a Liquid loop that auto-bolds "Xin Guo" and appends the `*`/✉ marks. Adding a paper is now a few-line YAML entry — no HTML editing.

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

### 2.3 About Page — Add Photo and Key Metrics
- Add professional headshot at the top of the About section
- Add a one-liner: "15+ papers | 10+ patents | 10+ years in AI"

### 2.4 Timeline — Expand Milestones
Currently 4 entries covering 16 years. Key experiences (Sony, Tractable) are collapsed.
Suggested additions:
- Major publications (SkySense at CVPR 2024, HorusEye in Nature Comp Sci 2026)
- Awards (NeurIPS Top Reviewer, Oriental Talent Program)
- Key projects (Dingsunbao, Yimutian)

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

### 4.1 Compress Large Images
- `matterhorn.jpg` is 1.6MB — compress to ~200KB
- `le_pirate.png` is 1.9MB — compress significantly
- Other large images in `img/timeline/`

### 4.2 Remove `_site/` from Git — Use GitHub Actions to Build — ✅ COMPLETED (2026-05-30, verified live)
- Added `.github/workflows/jekyll.yml`: builds with Bundler (`bundle exec jekyll build`) and deploys via GitHub Pages on push to `master`.
- Added `Gemfile` / `Gemfile.lock` pinning jekyll, jekyll-paginate, jemoji, jekyll-spaceship, webrick.
- Gitignored `_site/` and untracked it (87 files); generated output is no longer committed.
- Repo setting changed: Settings → Pages → Source → "GitHub Actions".
- First deploy succeeded and the live site was confirmed updated.

**Gotchas hit (for future reference):**
- Pushing workflow files needs a PAT with `workflow` scope (or push via SSH).
- Bundler 4 wrote a `CHECKSUMS` section with empty entries (Tsinghua mirror serves no checksums), which fails CI's frozen `bundle install`. Fix: removed the `CHECKSUMS` section. When regenerating the lockfile locally, verify with `BUNDLE_FROZEN=true bundle check` before pushing.
- New workflow `.travis.yml` is now redundant — could be deleted (left in place for now).

### 4.3 Set Up Google Analytics
Currently empty in `_config.yml`. Set up if you want to track visitor metrics.

### 4.4 Framework Upgrade (long-term)
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

## Current status snapshot (2026-05-30)

- **Done:** P1 (quick wins), P2.2 (publications data file), P3 (blog), P4.2 (Actions deploy), P5 Mermaid.
- **Open:** P2.1/2.3/2.4/2.5 (about split, photo+metrics, timeline, new pages), P4.1 (image compression), P4.3 (analytics), P4.4 (framework upgrade), **P5.1 dark mode + P5.2 Cusdis** (the main remaining "style" work).
- **Workflow note:** edit → `scripts/preview` (local check) → commit → `git push` → Actions auto-deploys (~1–2 min). Do NOT commit `_site/`. Workflow-file pushes need a PAT with `workflow` scope.

---

*Generated: 2026-04-05 · last updated: 2026-05-30*
