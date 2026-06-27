# jamesguoxin.github.io

Source code for Xin / James Guo's academic website:
[https://jamesguoxin.github.io/](https://jamesguoxin.github.io/).

The site presents research interests, publications, professional experience,
patents, academic service, awards, news, and selected blog posts. It is
maintained as a static Jekyll site. A GitHub Actions workflow is configured to
build and deploy the site after changes are pushed to the deployment branch.

## Technology

- Jekyll 4.4 and Liquid templates
- SCSS with the repository's existing Bootstrap 3-based theme
- Bundler with dependencies pinned in `Gemfile.lock`
- GitHub Actions workflow for production builds and GitHub Pages deployment
- Jekyll Spaceship for build-time Mermaid rendering

## Repository Guide

The files most commonly updated are:

| Path | Purpose |
| --- | --- |
| `_config.yml` | Site metadata, hero content, navigation, social profiles, timeline data, and global settings |
| `about.html` | Homepage biography and metrics |
| `_data/news.yml` | Complete news archive shared by the homepage and News page |
| `_data/research.yml` | Current homepage research pillars |
| `_data/publications.yml` | Complete publication archive plus homepage selection metadata |
| `publications-index.html` | Complete Publications page at `/publications/` |
| `news.html` | Complete News page at `/news/` |
| `activities.html` | Standalone patents, academic service, interviews, competitions, and awards page |
| `_posts/` | Blog posts |
| `img/` | Profile, hero, timeline, and blog images |
| `css/grayscale.scss` | Main site styling |
| `css/timeline.scss` | Timeline-specific styling |
| `_includes/` | Shared page sections and templates |
| `future-work.md` | Prioritized maintenance and improvement roadmap |

Generated output is written to `_site/`. It is intentionally ignored by Git
and must not be committed.

The homepage section order is configured by `homepage_sections` in
`_config.yml`. About and Experience use `about.html` and `experience.html`;
Research Highlights uses `_data/research.yml`; Recent News uses the latest four
entries from `_data/news.yml`; and Selected Publications uses selection
metadata from `_data/publications.yml`.

## Local Development

### Prerequisites

- Ruby 3.3, matching CI. A newer compatible Ruby is also acceptable when
  `bundle check` succeeds with the lockfile.
- Bundler 4.0.11, as recorded in `Gemfile.lock`.

Check the active versions:

```bash
ruby --version
bundle --version
```

Install the locked Bundler version if needed:

```bash
gem install bundler -v 4.0.11
```

Install the pinned dependencies:

```bash
bundle install
```

For development in China, Bundler can be configured to use a RubyGems mirror:

```bash
bundle config set mirror.https://rubygems.org \
  https://mirrors.tuna.tsinghua.edu.cn/rubygems/
```

### Recommended Preview

Run:

```bash
scripts/preview
```

Then open [http://127.0.0.1:4000/](http://127.0.0.1:4000/).

This script checks dependencies and serves the site using
`_config.yml,_config.dev.yml`, with file watching and live reload enabled.

### Production Build

Use the same environment as the GitHub Actions build:

```bash
JEKYLL_ENV=production bundle exec jekyll build --baseurl ""
```

The production build should complete without Sass deprecation warnings.

## Updating Content

### News

Edit `_data/news.yml`. Keep the complete archive in reverse chronological
order and use the `YYYY.MM.DD` date format. The homepage automatically shows
the latest four entries, while `news.html` renders the complete News page.

### Biography

Edit `about.html` for the About biography and homepage metrics. News is not
maintained in this file.

### Publications

Edit `_data/publications.yml`. The homepage selection and complete
`publications-index.html` page share this source. Publications are grouped
under a top-level section, and metadata such as `selected`, `topic`,
`homepage_order`, and `representative` belongs to each paper:

```yaml
- section: "AI4Biomedicine at SAIS"
  papers:
    - title: "Paper title"
      url: "https://example.com/paper"
      authors: "Author One, Xin Guo, Author Three"
      venue: "Conference or Journal, Year"
      me_mark: "corr"
      selected: true
      topic: "Life Science"
      homepage_order: 1
      representative: true
```

Per-paper `me_mark` is optional:

- `equal` adds the equal-contribution marker
- `corr` adds the corresponding-author marker
- omit it when neither marker applies

Per-paper homepage metadata is also optional:

- `selected: true` includes the paper in Selected Publications.
- `topic` supplies its homepage topic label.
- `homepage_order` sets its position in the six-paper homepage list.
- `representative: true` applies the primary representative-work styling.

The shared publication templates automatically highlight `Xin Guo`. Papers
without `selected: true` still appear on the complete Publications page.

### Research Highlights

Edit `_data/research.yml` to maintain the current homepage research pillars.
Each item has a `title` and `description`.

### Patents, Service, Competitions, and Awards

Edit the standalone `activities.html` page. This content is not rendered on the
homepage. Numbered sections use
`<ol class="activity-list">` so indentation and typography remain consistent.

### Blog Posts

Add Markdown files under `_posts/` using Jekyll's
`YYYY-MM-DD-title.md` filename format. Existing helper scripts for posts,
categories, and tags are documented in `scripts/README.md`.

## Verification

Before committing or pushing:

```bash
JEKYLL_ENV=production bundle exec jekyll build --baseurl ""
bundle exec ruby scripts/check-homepage-positioning
bundle exec ruby scripts/check-site-architecture
git diff --check
```

The checks validate homepage positioning, section order, navigation, selected
content counts and order, complete archive rendering, and standalone
activities in the generated HTML.

To test a non-empty base URL, pass the same value to Jekyll and the check
helpers:

```bash
JEKYLL_ENV=production bundle exec jekyll build --baseurl "/preview"
JEKYLL_BASEURL=/preview bundle exec ruby scripts/check-homepage-positioning
JEKYLL_BASEURL=/preview bundle exec ruby scripts/check-site-architecture
```

`JEKYLL_BASEURL` must match the build's `--baseurl` value so internal-link
expectations are evaluated with the same prefix.

## Deployment

The configured `.github/workflows/jekyll.yml` workflow runs on pushes to
`master`. It:

1. Checks out the repository
2. Installs Ruby 3.3 and the locked Bundler dependencies
3. Builds the site with `JEKYLL_ENV=production`
4. Uploads `_site/` as a GitHub Pages artifact
5. Deploys the artifact to GitHub Pages

After a deployment push, status is available on the repository's **Actions**
page. Do not treat local or worktree changes as deployed until that workflow
has completed successfully.

## Maintenance Notes

- Do not commit `_site/`, `.bundle/`, or `vendor/`.
- Keep `Gemfile.lock` compatible with GitHub Actions. Verify dependency changes
  with `bundle check` before pushing.
- Use `_config.dev.yml` only for local overrides.
- GitHub Actions is the active deployment path; legacy CI configuration has
  been removed.
- The current repository is independently maintained and does not sync with an
  upstream repository.

## Project History

This website was originally based on the
[Personal Jekyll Theme](https://github.com/PanosSakkos/personal-jekyll-theme)
by Panos Sakkos. It has since diverged through substantial customization,
including academic content management, a light visual system, responsive
publication and activity layouts, custom verification scripts, and GitHub
Actions deployment.

The repository is now maintained as an independent project without upstream
synchronization.

## License

See [LICENSE](LICENSE) for the repository's license terms. Theme attribution is
retained in the project history above.
