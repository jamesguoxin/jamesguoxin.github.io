# README Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the legacy one-line README with an accurate maintainer guide for the academic website.

**Architecture:** Keep README content close to the repository's existing files and commands. Document content ownership, local development, verification, deployment, and project history without changing runtime behavior.

**Tech Stack:** Markdown, Jekyll 4.4, Bundler, GitHub Actions, GitHub Pages.

---

### Task 1: Replace the README

**Files:**
- Modify: `README.md`

- [x] Write the project overview and live URL.
- [x] Document the Jekyll/Bundler/GitHub Actions stack.
- [x] Add a concise repository map.
- [x] Document local setup, production build, and preview.
- [x] Document common content update locations.
- [x] Document verification and deployment.
- [x] Add maintenance notes, project history, attribution, and license.

### Task 2: Verify Documentation Accuracy

**Files:**
- Verify: `README.md`

- [x] Confirm every referenced repository path exists.
- [x] Confirm documented executable scripts exist.
- [x] Run `JEKYLL_ENV=production bundle exec jekyll build --baseurl ""`.
- [x] Run `bundle exec ruby scripts/check-homepage-positioning`.
- [x] Run `git diff --check`.

### Task 3: Commit

**Files:**
- Commit: `README.md`
- Commit: `docs/superpowers/plans/2026-06-13-readme-refresh.md`

- [x] Commit the verified README update.
