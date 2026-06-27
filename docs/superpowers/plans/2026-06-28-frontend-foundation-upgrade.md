# Frontend Foundation Upgrade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the site's old frontend foundation with Bootstrap 5, remove first-party jQuery interactions, and move off Font Awesome 4 while preserving the current visual structure.

**Architecture:** Keep the Jekyll layouts and content model intact. Treat this as a compatibility migration: update CDN assets, migrate Bootstrap 3 class names and navbar markup, replace custom jQuery snippets with vanilla JavaScript, and add architecture checks that prevent regressions to Bootstrap 3 / jQuery 1.x / Font Awesome 4.

**Tech Stack:** Jekyll, Liquid, Bootstrap 5.3.x CDN, Font Awesome 7 Free CDN, vanilla JavaScript, existing Ruby/Nokogiri architecture checks.

---

### Task 1: Add Frontend Baseline Regression Checks

**Files:**
- Modify: `scripts/check-site-architecture`

- [ ] **Step 1: Add checks for modern frontend assets and old dependency absence**

Add checks near the other generated HTML architecture checks:

```ruby
generated_pages = Dir.glob(File.join(ROOT, "_site", "**", "*.html"))
generated_html = generated_pages.map { |path| File.read(path) }.join("\n")

abort("Generated pages must load Bootstrap 5 CSS") unless generated_html.include?("bootstrap@5.")
abort("Generated pages must load Bootstrap 5 JS bundle") unless generated_html.include?("bootstrap@5.") && generated_html.include?("bootstrap.bundle")
abort("Generated pages must not load Bootstrap 3 assets") if generated_html.include?("bootstrap/3.")
abort("Generated pages must not load jQuery 1.x") if generated_html.include?("jquery-1.")
abort("Generated pages must not load jquery-easing") if generated_html.include?("jquery.easing")
abort("Generated pages must not load Font Awesome 4") if generated_html.include?("font-awesome/4.")
abort("Generated pages must load a current Font Awesome asset") unless generated_html.include?("fontawesome")
```

- [ ] **Step 2: Add checks for Bootstrap 5 navigation markup**

Add checks against the generated home page:

```ruby
navbar_toggler = home.at_css(".navbar-toggler")
abort("Navbar must use Bootstrap 5 navbar-toggler") unless navbar_toggler
abort("Navbar toggler must use data-bs-toggle") unless navbar_toggler["data-bs-toggle"] == "collapse"
abort("Navbar toggler must target #site-navbar") unless navbar_toggler["data-bs-target"] == "#site-navbar"
abort("Navbar collapse must have #site-navbar") unless home.at_css("#site-navbar.navbar-collapse")
```

- [ ] **Step 3: Run the check and verify it fails before implementation**

Run:

```bash
JEKYLL_ENV=production bundle exec jekyll build --config _config.yml,_config.dev.yml
scripts/check-site-architecture
```

Expected: build succeeds, architecture check fails because pages still load Bootstrap 3 / jQuery 1.x / Font Awesome 4.

### Task 2: Update CDN Assets and Navigation Markup

**Files:**
- Modify: `_includes/head.html`
- Modify: `_includes/navigation.html`

- [ ] **Step 1: Replace Bootstrap and Font Awesome CSS assets**

In `_includes/head.html`, replace the Bootstrap 3 and Font Awesome 4 links with:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css">
```

Keep `academicons`, Google Fonts, `grayscale.css`, `timeline.css`, and `rrssb.css`.

- [ ] **Step 2: Replace Bootstrap 3 navbar markup with Bootstrap 5-compatible markup**

In `_includes/navigation.html`:

```html
<nav class="navbar navbar-expand-md navbar-custom fixed-top{% unless page.section-type == "index" %} navbar-standalone{% endunless %}" role="navigation">
  <div class="container">
    <div class="navbar-header">
      ...
    </div>
    <button type="button" class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#site-navbar" aria-controls="site-navbar" aria-expanded="false" aria-label="Toggle navigation">
      <i class="fa-solid fa-bars"></i>
    </button>
    <div id="site-navbar" class="collapse navbar-collapse justify-content-end navbar-main-collapse">
      <ul class="navbar-nav">
        ...
      </ul>
    </div>
  </div>
</nav>
```

Preserve existing Liquid link logic for section links and page links.

### Task 3: Replace First-Party jQuery with Vanilla JavaScript

**Files:**
- Modify: `_includes/js.html`

- [ ] **Step 1: Remove jQuery, Bootstrap 3 JS, and jquery-easing scripts**

Delete these script tags:

```html
<script src="https://code.jquery.com/jquery-1.11.3.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.3/jquery.easing.min.js"></script>
```

Add Bootstrap 5 bundle:

```html
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>
```

- [ ] **Step 2: Replace navigation scroll/collapse script**

Use vanilla JavaScript:

```html
<script>
document.addEventListener("DOMContentLoaded", function() {
  var navbar = document.querySelector(".navbar.fixed-top");
  var navbarCollapse = document.getElementById("site-navbar");

  function toggleNavCollapse() {
    if (!navbar) return;
    if (window.scrollY > 50) {
      navbar.classList.add("top-nav-collapse");
    } else {
      navbar.classList.remove("top-nav-collapse");
    }
  }

  toggleNavCollapse();
  window.addEventListener("scroll", toggleNavCollapse);

  document.querySelectorAll("a.page-scroll").forEach(function(link) {
    link.addEventListener("click", function(event) {
      var target = document.querySelector(link.getAttribute("href"));
      if (!target) return;
      event.preventDefault();
      window.scrollTo({ top: target.offsetTop - 50, behavior: "smooth" });
      link.blur();
      if (navbarCollapse && navbarCollapse.classList.contains("show")) {
        bootstrap.Collapse.getOrCreateInstance(navbarCollapse).hide();
      }
    });
  });

  document.querySelectorAll("#site-navbar a").forEach(function(link) {
    link.addEventListener("click", function() {
      if (navbarCollapse && navbarCollapse.classList.contains("show")) {
        bootstrap.Collapse.getOrCreateInstance(navbarCollapse).hide();
      }
    });
  });
});
</script>
```

- [ ] **Step 3: Replace swipe instruction jQuery snippets**

Use vanilla JavaScript for blog and post swipe instruction display:

```html
<script>
document.addEventListener("DOMContentLoaded", function() {
  var instruction = document.getElementById("swipe-instruction");
  if (!instruction || localStorage.getItem("blog-swipeshowed")) return;
  instruction.style.display = "block";
  var closeButton = instruction.querySelector(".close-swipe-instruction");
  if (closeButton) {
    closeButton.addEventListener("click", function() {
      instruction.style.display = "none";
    });
  }
  localStorage.setItem("blog-swipeshowed", true);
});
</script>
```

Use `post-swipeshowed` for the post block.

- [ ] **Step 4: Replace typed.js initialization or disable legacy dependency**

Because `js/typed.min.js` is jQuery-based, remove the legacy script include and initialize a small vanilla typed loop for `.intro-text` using the existing `site.lines` values. Preserve the typed hero behavior without loading jQuery.

### Task 4: Migrate Bootstrap Grid and Utility Classes

**Files:**
- Modify: `_layouts/*.html`
- Modify: `_includes/*.html`
- Modify: `css/grayscale.scss`

- [ ] **Step 1: Replace common Bootstrap 3 grid classes**

Use direct class replacements:

```text
col-xs-10 col-xs-offset-1 -> col-10 offset-1
col-xs-4 -> col-4
col-xs-8 -> col-8
col-sm-3 -> col-sm-3
col-sm-9 -> col-sm-9
col-md-2 -> col-md-2
col-md-10 col-md-offset-1 -> col-md-10 offset-md-1
col-md-12 -> col-md-12
navbar-right -> justify-content-end
navbar-fixed-top -> fixed-top
```

- [ ] **Step 2: Update CSS selectors for Bootstrap 5 navbar compatibility**

In `css/grayscale.scss`, update selectors so existing custom styling still applies to:

```scss
.navbar-custom .navbar-toggler { ... }
.navbar-custom .navbar-brand { ... }
.navbar-custom .navbar-nav { ... }
.navbar-custom .navbar-nav .nav-link { ... }
.navbar-custom.fixed-top { ... }
```

Keep existing colors, spacing, collapse behavior, and `top-nav-collapse` / `navbar-standalone` behavior.

- [ ] **Step 3: Update button class compatibility if needed**

Keep `.btn-default` styles, and add `.btn-outline-light` or `.btn-secondary` bridge styles only if generated markup uses them. Do not redesign buttons.

### Task 5: Migrate Icons and Keep Third-Party Widgets Deliberate

**Files:**
- Modify: `_includes/social-buttons.html`
- Modify: `_includes/header.html`
- Modify: `_includes/swipe-instructions.html`
- Modify: `_includes/navigation.html`
- Modify: `_config.yml` if icon class strings need updating

- [ ] **Step 1: Update first-party Font Awesome icon class names**

Replace:

```text
fa fa-bars -> fa-solid fa-bars
fa fa-angle-down -> fa-solid fa-angle-down
fa fa-hand-o-up -> fa-regular fa-hand-point-up
fa fa-key -> fa-solid fa-key
fa fa-github -> fa-brands fa-github
fa fa-linkedin -> fa-brands fa-linkedin
```

- [ ] **Step 2: Preserve Academicons**

Keep Google Scholar and ORCID Academicons classes unchanged:

```text
ai ai-google-scholar
ai ai-orcid
```

- [ ] **Step 3: Decide on rrssb**

If share buttons still require jQuery, either leave post share buttons disabled in this pass or keep the static share markup without loading `js/rrssb.min.js`. Do not reintroduce jQuery 1.x.

### Task 6: Verification, Documentation, and Commit

**Files:**
- Modify: `future-work.md`
- Modify: `scripts/check-site-architecture`

- [ ] **Step 1: Update roadmap status**

Update `future-work.md` to say the frontend foundation upgrade is complete if verification passes.

- [ ] **Step 2: Run full local verification**

Run:

```bash
JEKYLL_ENV=production bundle exec jekyll build --config _config.yml,_config.dev.yml
scripts/check-site-architecture
git diff --check
```

Expected: all commands exit 0.

- [ ] **Step 3: Inspect generated pages for old dependencies**

Run:

```bash
rg -n "bootstrap/3|jquery-1|jquery.easing|font-awesome/4|navbar-toggle|data-toggle|navbar-fixed-top|col-md-offset|col-xs" _site
```

Expected: no matches.

- [ ] **Step 4: Commit and push**

Run:

```bash
git add .
git commit -m "Upgrade frontend foundation"
git push
```

- [ ] **Step 5: Watch deployment**

Run:

```bash
gh run list --branch master --limit 3 --json databaseId,headSha,status,conclusion,displayTitle,url,createdAt
gh run watch <run-id> --exit-status
```

Expected: deploy workflow succeeds.

---

## Self-Review

- Spec coverage: Covers Bootstrap 5 upgrade, first-party jQuery removal, Font Awesome upgrade, visual preservation, and verification.
- Placeholder scan: No placeholder steps; all tasks name exact files and commands.
- Scope check: Does not include dark mode, blog redesign, research filters, or theme replacement.
