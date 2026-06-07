# Homepage Positioning Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a fixed academic identity, research focus, and three restrained actions to the Matterhorn hero, plus a centered collaboration statement in Contact.

**Architecture:** Store fixed hero and collaboration copy in `_config.yml`, render it in the existing header and Contact includes, and extend the existing SCSS with responsive component classes. Validate behavior against generated `_site/index.html` using Ruby and Nokogiri, then run the same production Jekyll build used by GitHub Actions.

**Tech Stack:** Jekyll 4.4, Liquid, SCSS, Bootstrap 3, Typed.js, Ruby, Nokogiri.

---

### Task 1: Add a Failing Generated-HTML Contract

**Files:**
- Create: `scripts/check-homepage-positioning`

- [ ] **Step 1: Create the executable contract script**

The script must parse `_site/index.html` and assert:

```ruby
required_text = [
  "Xin / James Guo",
  "Principal Research Scientist at SAIS",
  "AI for Life Sciences",
  "Multimodal Foundation Models",
  "Agentic AI for Scientific Discovery",
  "I welcome research collaborations in AI for life sciences, multimodal foundation models, and agentic AI for scientific discovery."
]

required_links = {
  "Publications" => "#publications",
  "Google Scholar" => "https://scholar.google.com/citations?user=d2eWV9wAAAAJ",
  "Contact" => "#contact"
}
```

It must also verify that `.hero-actions` contains exactly three links and that `#contact .contact-collaboration` exists.

- [ ] **Step 2: Build the current site**

Run:

```bash
JEKYLL_ENV=production bundle exec jekyll build --baseurl ""
```

Expected: build succeeds.

- [ ] **Step 3: Run the contract and verify RED**

Run:

```bash
bundle exec ruby scripts/check-homepage-positioning
```

Expected: FAIL because the fixed hero content and collaboration statement do not exist yet.

### Task 2: Add Configurable Academic Positioning

**Files:**
- Modify: `_config.yml`

- [ ] **Step 1: Add the fixed hero and collaboration values**

Add:

```yaml
hero:
  name: "Xin / James Guo"
  role: "Principal Research Scientist at SAIS"
  focus-primary: "AI for Life Sciences · Multimodal Foundation Models"
  focus-secondary: "Agentic AI for Scientific Discovery"

collaboration-statement: "I welcome research collaborations in AI for life sciences, multimodal foundation models, and agentic AI for scientific discovery."
```

Keep the two existing Typed.js lines unchanged.

### Task 3: Render the Hero and Contact Content

**Files:**
- Modify: `_includes/header.html`
- Modify: `_includes/contact.html`

- [ ] **Step 1: Replace the empty hero heading with fixed semantic content**

Render:

```liquid
<h1 class="hero-name">{{ site.hero.name }}</h1>
<p class="hero-role">{{ site.hero.role }}</p>
<p class="hero-focus">
  <span>{{ site.hero.focus-primary }}</span>
  <span>{{ site.hero.focus-secondary }}</span>
</p>
```

- [ ] **Step 2: Keep Typed.js secondary and add the action group**

Place a divider before the existing `.intro-text`, then render:

```liquid
<nav class="hero-actions" aria-label="Primary profile links">
  <a class="hero-action hero-action-primary page-scroll" href="#publications">Publications</a>
  {% for item in site.social %}
    {% if item.title == "google-scholar" %}
      <a class="hero-action" href="{{ item.url }}" target="_blank" rel="noopener noreferrer">Google Scholar</a>
    {% endif %}
  {% endfor %}
  <a class="hero-action page-scroll" href="#contact">Contact</a>
</nav>
```

Keep the existing down-arrow link below the actions.

- [ ] **Step 3: Add the Contact collaboration statement**

Before the email block, render:

```liquid
{% if site.collaboration-statement %}
  <p class="contact-collaboration">{{ site.collaboration-statement }}</p>
{% endif %}
```

### Task 4: Add Responsive Hero and Contact Styling

**Files:**
- Modify: `css/grayscale.scss`

- [ ] **Step 1: Replace obsolete empty-heading styling**

Add scoped styles for:

- `.hero-name`
- `.hero-role`
- `.hero-focus`
- `.hero-divider`
- `.hero-actions`
- `.hero-action`
- `.hero-action-primary`
- `.contact-collaboration`

Use the existing white hero palette and blue academic accent. Keep letter spacing at zero. Make the fixed identity visually stronger than `.intro-text`.

- [ ] **Step 2: Add responsive behavior**

At mobile widths:

- Reduce name, role, and focus sizes.
- Stack the two focus spans.
- Allow `.hero-actions` to wrap.
- Keep each action at least 44px high.
- Preserve the Matterhorn image and avoid overlap with the down arrow.

- [ ] **Step 3: Preserve centered Contact and footer behavior**

Ensure `.contact-collaboration`, `#contact p`, and footer text remain centered with `text-align-last: center`.

### Task 5: Verify GREEN and Production Output

**Files:**
- Modify: `scripts/check-homepage-positioning` only if the test itself has a defect.

- [ ] **Step 1: Rebuild production output**

Run:

```bash
JEKYLL_ENV=production bundle exec jekyll build --baseurl ""
```

Expected: exit 0; only the known Sass `@import` deprecation warning may remain.

- [ ] **Step 2: Run the generated-HTML contract**

Run:

```bash
bundle exec ruby scripts/check-homepage-positioning
```

Expected:

```text
Homepage positioning checks passed
```

- [ ] **Step 3: Check source formatting and repository state**

Run:

```bash
git diff --check
git status --short
```

Expected: no whitespace errors; only intended files are modified.

- [ ] **Step 4: Preview and inspect desktop/mobile**

Start:

```bash
bundle exec jekyll serve --host 127.0.0.1 --port 4000 --config _config.yml,_config.dev.yml
```

Inspect desktop and mobile viewport screenshots for:

- readable fixed identity
- natural two-line focus
- no button overlap
- visible Matterhorn subject
- centered Contact and copyright

### Task 6: Commit the Implementation

**Files:**
- Commit `_config.yml`, `_includes/header.html`, `_includes/contact.html`, `css/grayscale.scss`, and `scripts/check-homepage-positioning`.

- [ ] **Step 1: Commit the verified implementation**

```bash
git add _config.yml _includes/header.html _includes/contact.html css/grayscale.scss scripts/check-homepage-positioning
git commit -m "Add academic positioning to homepage hero"
```
