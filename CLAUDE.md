# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Personal academic website for Xin (James) Guo, built with Jekyll using the [Personal Jekyll Theme](https://github.com/PanosSakkos/personal-jekyll-theme). Hosted on GitHub Pages at jamesguoxin.github.io.

## Development Commands

**Local development with Docker (preferred):**
```
docker-compose up
```
Serves at http://localhost:4000 with live reload. Uses `_config.yml` + `_config.dev.yml` (dev overrides baseurl to empty string).

**Local development with Bundler (matches CI):**
```
bundle install
bundle exec jekyll serve --baseurl "" --watch
```
Dependencies are pinned in `Gemfile` / `Gemfile.lock` (jekyll, jekyll-paginate, jemoji, jekyll-spaceship, webrick). In China, redirect the source to a mirror once: `bundle config set mirror.https://rubygems.org https://mirrors.tuna.tsinghua.edu.cn/rubygems/`.

**Site verification (mirrors the GitHub Actions build path):**
```
bundle exec jekyll build --config _config.yml,_config.dev.yml
scripts/check-site-architecture
```

**Mermaid diagrams:** `jekyll-spaceship` renders diagrams at build time via mermaid.ink. Mark a block with ` ```mermaid! ` (trailing `!`) or `@startmermaid … @endmermaid`. `mode: pre-fetch` (in `_config.yml`) inlines the SVG into the HTML, so it needs network access to mermaid.ink during the build.

**Helper scripts (`scripts/`):**
- `scripts/serve` — `jekyll serve --watch` with dev config (no Analytics).
- `scripts/serve-production` — serve with `JEKYLL_ENV=production`.
- `scripts/newpost <title>` — scaffold a `_posts/YYYY-MM-DD-<title>.md` stub.
- `scripts/generate-categories` / `scripts/generate-tags` — regenerate the `categories/` and `tags/` listing pages from post front matter (run after adding posts with new categories/tags).
- `scripts/integrate-personal` — pull upstream theme updates (read the linked wiki first).
- `scripts/check-site-architecture` — verify generated homepage/archive structure after a local build.

## Architecture

- **`_config.yml`** — Central configuration: site metadata, header dynamic text, experience entries, social links, blog settings, homepage composition, and navigation.
- **`_config.dev.yml`** — Dev-only override (just sets `baseurl: ""`).
- **`_layouts/`** — Page templates: `index.html` (home), `page.html` (standalone pages), `blog.html`, `post.html`, `category.html`, `tag.html`, and `error.html`.
- **`_includes/`** — Reusable partials composed into layouts (header, footer, navigation, share buttons, experience, publication/news lists, etc.).
- **`_posts/`** — Blog posts in Markdown with YAML front matter. Paginated at 6 per page.
- **Top-level homepage sections** — `about.html`, `research.html`, `publications.html`, `news-section.html`, `experience.html`, and `contact.html`. These use `section-type` front matter and `layout: null` (rendered inside the index layout).
- **Standalone pages** — `publications-index.html`, `news.html`, and `activities.html` use the `page` layout for complete Publications, News, and Activities content.
- **`_sass/`** + **`css/`** — SASS variables/mixins compiled with Jekyll; `grayscale.scss` is the main stylesheet.
- **`js/`** — Vendored JS: typed.js (header animation), hammer.js (swipe gestures), rrssb (social sharing).
- **`_site/`** — Generated, ignored, and untracked output. Never edit or commit it.

## Content Editing Patterns

- **About**: Edit `about.html` for the homepage biography and metrics.
- **News**: Edit `_data/news.yml`; it feeds the homepage and complete News page.
- **Publications**: Edit `_data/publications.yml`; it feeds the homepage selection and complete Publications page.
- **Research**: Edit `_data/research.yml` for the homepage research pillars.
- **Activities**: Edit standalone `activities.html` for patents, academic service, interviews, competitions, and awards.
- **Experience**: Edit the `experience` list in `_config.yml`; `experience.html` and `_includes/experience.html` render it on the homepage.
- **Header animated text**: Edit the `lines` list in `_config.yml`.
- **Blog posts**: Add Markdown files to `_posts/` with format `YYYY-MM-DD-slug.md`. Front matter requires `layout: post`, `section-type: post`, `title`, `category`, and `tags`. After introducing a new `category`/`tag`, run `scripts/generate-categories` / `scripts/generate-tags` so the corresponding listing pages exist.
- **Homepage and navigation**: `homepage_sections` in `_config.yml` controls
  homepage composition, while `navigation` controls primary nav destinations.
  The primary nav contains homepage anchors only. Complete Publications and
  News pages are reached from links in their homepage sections.

## Plugins

- `jekyll-paginate` — Blog pagination
- `jemoji` — GitHub-style emoji support in content
- `jekyll-spaceship` — Mermaid diagram rendering (mermaid-processor only; see Development Commands)

## External Dependencies

- **Academicons** — CDN-loaded icon font for academic social icons (Google Scholar, ORCID). Added in `_includes/head.html`.
- Social buttons template (`_includes/social-buttons.html`) supports an optional `icon` field in `_config.yml` social entries, falling back to Font Awesome 7 solid or brand icon classes when not specified.

## Deployment

GitHub Actions builds and deploys on every push to `master` (`.github/workflows/jekyll.yml`): it runs `bundle exec jekyll build` and publishes via GitHub Pages. `_site/` is **no longer committed** (it's in `.gitignore`) — do not commit generated output. Repo setting: Settings → Pages → Source must be "GitHub Actions".

For local preview, build/serve with `bundle exec jekyll …`; the output in `_site/` is git-ignored.
