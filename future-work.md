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

### 2.2 Publication Tracking — Use YAML Data File
Replace hand-coded HTML with `_data/publications.yml`:
```yaml
- title: "ChromFound: Towards A Universal Foundation Model..."
  authors: "Yifeng Jiao, Yuchen Liu, Yu Zhang, Xin Guo, ..."
  venue: "NeurIPS 2025"
  url: "https://arxiv.org/abs/2505.12638"
  corresponding: true
  section: "AI4Biomedicine at SAIS"
```
Then render with a Liquid template for automatic, consistent formatting. Adding a new paper becomes a one-line YAML entry.

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

## Priority 3: Blog Strategy (ongoing effort)

### 3.1 Write More Consistently
Current: 3 posts over 10 years (2016, 2023, 2026).

Suggested content sources (low effort — content already exists in knowledge base):
- **Monthly Research Highlights** — Curated from daily paper digests
- **Research Notes** — Shorter posts: conference takeaways, paper reviews, tool recommendations
- **Research Idea Spotlights** — Adapted from novelty-ideas reports

### 3.2 Add New Categories
Current: `tech`, `cuisine`
Suggested additions: `research`, `tutorial`, `life`

---

## Priority 4: Technical Debt (low urgency)

### 4.1 Compress Large Images
- `matterhorn.jpg` is 1.6MB — compress to ~200KB
- `le_pirate.png` is 1.9MB — compress significantly
- Other large images in `img/timeline/`

### 4.2 Remove `_site/` from Git — Use GitHub Actions to Build

**Problem:** GitHub Pages' built-in Jekyll builder doesn't support all plugins/configurations, so `_site/` is committed directly. This bloats the repo (~21MB of generated files) and creates messy diffs on every content change.

**Solution:** Use a GitHub Actions workflow to build Jekyll and deploy to GitHub Pages. This replaces both the manual `_site/` commit and the outdated Travis CI config (Ruby 2.5).

**Step-by-step:**

1. **Create `.github/workflows/jekyll.yml`:**
```yaml
name: Deploy Jekyll to GitHub Pages

on:
  push:
    branches: ["master"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Ruby
        uses: ruby/setup-ruby@v1
        with:
          ruby-version: '3.3'
          bundler-cache: true

      - name: Setup Pages
        uses: actions/configure-pages@v5

      - name: Build with Jekyll
        run: |
          gem install jekyll jekyll-paginate jemoji
          JEKYLL_ENV=production jekyll build
        env:
          JEKYLL_ENV: production

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

2. **In GitHub repo settings:**
   - Go to Settings → Pages
   - Under "Build and deployment", change Source from "Deploy from a branch" to **"GitHub Actions"**

3. **Add `_site/` to `.gitignore`:**
```
_site/
```

4. **Remove `_site/` from git tracking:**
```bash
git rm -r --cached _site/
```

5. **Optionally delete `.travis.yml`** — no longer needed.

**Why this works:** GitHub Actions runs a full Ruby/Jekyll build in CI with the exact gems you need (`jekyll-paginate`, `jemoji`), then deploys the output directly to GitHub Pages. You never need to commit `_site/` again.

**Fallback:** If GitHub Actions has issues, an alternative is to use a `Gemfile` with `github-pages` gem, which bundles all GitHub Pages-compatible plugins. But the Actions approach is more flexible and supports any plugin.

### 4.3 Set Up Google Analytics
Currently empty in `_config.yml`. Set up if you want to track visitor metrics.

### 4.4 Framework Upgrade (long-term)
- Bootstrap 3.3.5 → 5.x
- jQuery 1.11.3 → remove or update
- Font Awesome 4.4.0 → 6.x
- Consider migrating to a modern academic theme (e.g., Hugo Academic / al-folio for Jekyll) which has built-in publication management, BibTeX import, and responsive design

---

*Generated: 2026-04-05*
