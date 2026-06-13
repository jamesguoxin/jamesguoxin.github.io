# README Refresh Design

## Goal

Replace the one-line theme attribution with a practical maintainer guide for the independently maintained academic website at `https://jamesguoxin.github.io/`.

## Audience

The primary audience is the repository maintainer or a collaborator updating site content. The README is not intended to duplicate the public homepage.

## Structure

The README will cover:

1. Project purpose and live URL
2. Current technology and deployment model
3. Repository map for frequently edited content
4. Local prerequisites, dependency installation, build, and preview
5. Procedures for updating news, publications, activities, and blog posts
6. Pre-push verification and GitHub Pages deployment
7. Maintenance notes, including generated output and known Sass warnings
8. Theme attribution and license

## Accuracy Requirements

- Use commands that exist in the repository.
- Treat `scripts/preview` as the recommended local workflow.
- State that pushes to `master` trigger `.github/workflows/jekyll.yml`.
- Do not instruct maintainers to commit `_site/`.
- Point publication edits to `_data/publications.yml`.
- Point news and biography edits to `about.html`.
- Point patents, academic service, competitions, and awards to `activities.html`.
- Mention `scripts/check-homepage-positioning` as an additional generated-HTML check.
- Keep the document in English, without badges or screenshots.

## Scope

Only `README.md` changes as part of implementation. Existing scripts, configuration, and deployment behavior remain unchanged.

## Verification

- Confirm every referenced local path exists.
- Confirm every documented command matches an existing script or current build command.
- Run the production Jekyll build and homepage positioning check.
- Run `git diff --check`.
