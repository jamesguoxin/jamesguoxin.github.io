# jamesguoxin.github.io

Source code for Xin / James Guo's academic website:
[https://jamesguoxin.github.io/](https://jamesguoxin.github.io/).

The site presents research interests, publications, professional experience,
patents, academic service, awards, news, and selected blog posts. It is
maintained as a static Jekyll site and deployed to GitHub Pages through GitHub
Actions.

## Technology

- Jekyll 4.4 and Liquid templates
- SCSS with the repository's existing Bootstrap 3-based theme
- Bundler with dependencies pinned in `Gemfile.lock`
- GitHub Actions for production builds and GitHub Pages deployment
- Jekyll Spaceship for build-time Mermaid rendering

## Repository Guide

The files most commonly updated are:

| Path | Purpose |
| --- | --- |
| `_config.yml` | Site metadata, hero content, navigation, social profiles, timeline data, and global settings |
| `about.html` | Recent news, biography, metrics, and research focus |
| `_data/publications.yml` | Publication titles, links, authors, venues, and contribution markers |
| `_includes/publications.html` | Publication rendering template |
| `activities.html` | Patents, academic service, interviews, competitions, and awards |
| `_posts/` | Blog posts |
| `img/` | Profile, hero, timeline, and blog images |
| `css/grayscale.scss` | Main site styling |
| `css/timeline.scss` | Timeline-specific styling |
| `_includes/` | Shared page sections and templates |
| `future-work.md` | Prioritized maintenance and improvement roadmap |

Generated output is written to `_site/`. It is intentionally ignored by Git
and must not be committed.

## Local Development

### Prerequisites

- Ruby
- Bundler

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

The build may print Sass `@import` deprecation warnings. They are known
toolchain warnings and do not currently prevent a successful build.

## Updating Content

### Recent News and Biography

Edit `about.html`. Keep news entries in reverse chronological order and follow
the existing `YYYY.MM.DD` date format.

### Publications

Edit `_data/publications.yml`. Each entry supports:

```yaml
- title: "Paper title"
  url: "https://example.com/paper"
  authors: "Author One, Xin Guo, Author Three"
  venue: "Conference or Journal, Year"
  me_mark: "corr"
```

`me_mark` is optional:

- `equal` adds the equal-contribution marker
- `corr` adds the corresponding-author marker
- omit it when neither marker applies

The publication template automatically highlights `Xin Guo`.

### Patents, Service, Competitions, and Awards

Edit `activities.html`. Numbered sections use
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
git diff --check
```

The homepage check validates the fixed academic positioning, primary profile
links, and collaboration statement in the generated HTML.

## Deployment

Pushes to `master` trigger `.github/workflows/jekyll.yml`. The workflow:

1. Checks out the repository
2. Installs Ruby 3.3 and the locked Bundler dependencies
3. Builds the site with `JEKYLL_ENV=production`
4. Uploads `_site/` as a GitHub Pages artifact
5. Deploys the artifact to GitHub Pages

Deployment status is available on the repository's **Actions** page. The live
site normally updates within a few minutes of a successful workflow run.

## Maintenance Notes

- Do not commit `_site/`, `.bundle/`, or `vendor/`.
- Keep `Gemfile.lock` compatible with GitHub Actions. Verify dependency changes
  with `bundle check` before pushing.
- Use `_config.dev.yml` only for local overrides.
- `.travis.yml` is retained from the older deployment setup but GitHub Actions
  is the active deployment path.
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
