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

**Local development with Jekyll directly:**
```
gem install jekyll jekyll-paginate jemoji
jekyll serve --baseurl "" --watch
```

**HTML validation (CI uses this):**
```
gem install html-proofer
htmlproofer ./_site --disable-external --empty-alt-ignore
```

## Architecture

- **`_config.yml`** — Central configuration: site metadata, header dynamic text, timeline events, social links, blog settings, and navigation pages. Most site-wide content changes happen here.
- **`_config.dev.yml`** — Dev-only override (just sets `baseurl: ""`).
- **`_layouts/`** — Page templates: `index.html` (home), `blog.html`, `post.html`, `category.html`, `tag.html`, `error.html`.
- **`_includes/`** — Reusable partials composed into layouts (header, footer, navigation, comments via Disqus, share buttons, timeline, etc.).
- **`_posts/`** — Blog posts in Markdown with YAML front matter. Paginated at 6 per page.
- **Top-level pages** — `about.html`, `contact.html`, `timeline.html`, `latest-post.html`, `index.html`. These use `section-type` front matter and `layout: null` (rendered inside the index layout).
- **`_sass/`** + **`css/`** — SASS variables/mixins compiled with Jekyll; `grayscale.scss` is the main stylesheet.
- **`js/`** — Vendored JS: typed.js (header animation), hammer.js (swipe gestures), rrssb (social sharing).
- **`_site/`** — Generated output (in `.gitignore` territory, but currently tracked — avoid modifying directly).

## Content Editing Patterns

- **About/publications page**: Edit `about.html` directly — it contains news, bio, publications list, patents, and awards as inline HTML.
- **Timeline entries**: Edit the `events` list in `_config.yml`.
- **Header animated text**: Edit the `lines` list in `_config.yml`.
- **Blog posts**: Add Markdown files to `_posts/` with format `YYYY-MM-DD-slug.md`.
- **Navigation pages**: Controlled by `pages_list` in `_config.yml`.

## Plugins

- `jekyll-paginate` — Blog pagination
- `jemoji` — GitHub-style emoji support in content

## External Dependencies

- **Academicons** — CDN-loaded icon font for academic social icons (Google Scholar, ORCID). Added in `_includes/head.html`.
- Social buttons template (`_includes/social-buttons.html`) supports an optional `icon` field in `_config.yml` social entries, falling back to Font Awesome `fa fa-{{ title }}` when not specified.

## Deployment

Currently using manual deployment: build locally with `jekyll build`, commit `_site/`, and push. GitHub Pages serves the committed `_site/` directly — no CI/CD auto-build is configured. See `future-work.md` §4.2 for the GitHub Actions migration plan.
