# Homepage Information Architecture Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Shorten the homepage around current research and selected work while preserving complete publications, news, and activities on standalone pages.

**Architecture:** Keep Jekyll and the existing Bootstrap 3/Liquid system. Use `_data/publications.yml`, `_data/news.yml`, and `_data/research.yml` as shared content sources; render compact sections through an explicit `homepage_sections` list, and render complete archives through a standalone page layout that is never included in the homepage loop.

**Tech Stack:** Jekyll 4.4, Liquid, YAML, SCSS, Bootstrap 3, Ruby, Nokogiri, GitHub Actions.

---

## File Structure

### New files

- `_data/news.yml`: complete reverse-chronological news archive.
- `_data/research.yml`: the two current research pillars.
- `_includes/news-list.html`: shared news-item renderer with an optional limit.
- `_includes/publication-entry.html`: shared publication title, authors, and venue markup.
- `_includes/publication-list.html`: shared publication renderer supporting full and selected modes.
- `_includes/research.html`: homepage Research Highlights section.
- `_includes/news.html`: homepage Recent News section.
- `research.html`: null-layout source that registers Research on the homepage.
- `news-section.html`: null-layout source that registers News in the homepage composition loop.
- `_layouts/page.html`: standalone page shell using the existing head, navigation, footer, and JavaScript includes.
- `news.html`: complete News page at `/news/`.
- `publications-index.html`: complete Publications page at `/publications/`.
- `experience.html`: renamed null-layout source for the homepage Experience section.
- `scripts/check-site-architecture`: generated-site regression check.

### Modified files

- `_config.yml`: new navigation model and homepage section order.
- `_data/publications.yml`: selected/topic/representative metadata.
- `about.html`: concise biography only; news moves to data.
- `publications.html`: compact homepage publication section.
- `timeline.html`: remove after renaming it to `experience.html`.
- `activities.html`: convert to standalone page.
- `_includes/navigation.html`: support mixed homepage anchors and standalone URLs.
- `_includes/header.html`: Publications action links to `/publications/`.
- `_includes/footer.html`: add Activities link without changing centered copyright.
- `_includes/publications.html`: delegate to shared publication renderer.
- `_includes/timeline.html`: add Activities auxiliary link.
- `css/grayscale.scss`: section hierarchy, research cards, compact news/publication summaries, standalone page spacing.
- `css/timeline.scss`: retain centered image/line geometry while tightening Experience.
- `scripts/check-homepage-positioning`: update expected homepage structure.
- `README.md`: document new content data and page locations.
- `future-work.md`: mark homepage information architecture complete.

## Task 1: Add Failing Architecture Checks

**Files:**
- Create: `scripts/check-site-architecture`
- Modify: `scripts/README.md`

- [ ] **Step 1: Create a generated-site regression check**

Create `scripts/check-site-architecture`:

```ruby
#!/usr/bin/env ruby
# frozen_string_literal: true

require "nokogiri"
require "yaml"

ROOT = File.expand_path("..", __dir__)

def page(path)
  full_path = File.join(ROOT, "_site", path)
  abort("Missing generated page: #{full_path}") unless File.file?(full_path)
  Nokogiri::HTML(File.read(full_path))
end

home = page("index.html")
publications = page("publications/index.html")
news = page("news/index.html")
activities = page("activities/index.html")

expected_home_sections = %w[about research publications news experience contact]
actual_home_sections = home.css("body > section[id]").map { |node| node["id"] }
unless actual_home_sections == expected_home_sections
  abort("Homepage sections expected #{expected_home_sections.inspect}, got #{actual_home_sections.inspect}")
end

abort("Homepage must show 4 news entries") unless home.css("#news .news-item").length == 4
abort("Homepage must show 6 publications") unless home.css("#publications .publication-item").length == 6
abort("SkySense missing from homepage") unless home.at_css("#publications").text.include?("SkySense")

expected_titles = [
  "FLAG: Foundation model representation with Latent diffusion Alignment via Graph for spatial gene expression prediction",
  "HorusEye: a self-supervised foundation model for generalizable X-ray tomography restoration",
  "Structure-based RNA Design by Step-wise Optimization of Latent Diffusion Model",
  "Sprint or Delve: A Distribution-Aware Approach to Efficient Reasoning",
  "ChromFound: Towards A Universal Foundation Model for Single-Cell Chromatin Accessibility Data",
  "SkySense: A Multi-Modal Remote Sensing Foundation Model Towards Universal Interpretation for Earth Observation Imagery"
]
actual_titles = home.css("#publications .publication-title").map { |node| node.text.gsub(/\s+/, " ").strip }
abort("Selected publication order mismatch") unless actual_titles == expected_titles

publication_data = YAML.load_file(File.join(ROOT, "_data", "publications.yml"))
expected_publications = publication_data.sum { |group| group.fetch("papers").length }
unless publications.css(".publication-item").length == expected_publications
  abort("Complete publication count mismatch")
end

news_data = YAML.load_file(File.join(ROOT, "_data", "news.yml"))
abort("Complete news count mismatch") unless news.css(".news-item").length == news_data.length

abort("Activities page lost patents") unless activities.text.include?("EP3201917B1")
abort("Activities page lost awards") unless activities.text.include?("ICML 2026 Silver Reviewer Award")

expected_nav = ["About", "Research", "Publications", "News", "Experience", "Contact"]
actual_nav = home.css(".navbar-main-collapse .nav > li > a").map { |node| node.text.strip }
abort("Primary navigation mismatch") unless actual_nav == expected_nav

puts "Site architecture checks passed"
```

- [ ] **Step 2: Make the check executable**

Run:

```bash
chmod +x scripts/check-site-architecture
```

Expected: `scripts/check-site-architecture` has executable permissions.

- [ ] **Step 3: Document the command**

Add to `scripts/README.md`:

```text
check-site-architecture
  - Verifies homepage section order and item limits, standalone archives,
    preserved activity content, and primary navigation after a Jekyll build.
```

- [ ] **Step 4: Run the check and verify it fails**

Run:

```bash
JEKYLL_ENV=production bundle exec jekyll build --baseurl ""
bundle exec ruby scripts/check-site-architecture
```

Expected: FAIL because `_site/news/index.html` and the new homepage structure do not exist.

- [ ] **Step 5: Commit the failing check**

```bash
git add scripts/check-site-architecture scripts/README.md
git commit -m "Add homepage architecture regression check"
```

## Task 2: Move News into Shared Data

**Files:**
- Create: `_data/news.yml`
- Create: `_includes/news-list.html`
- Create: `_includes/news.html`
- Create: `news-section.html`
- Create: `news.html`
- Create: `_layouts/page.html`
- Modify: `about.html`

- [ ] **Step 1: Create the complete news data file**

Move all seven existing entries from `about.html` into `_data/news.yml`, newest first:

```yaml
- date: "2026.06.13"
  content: 'Honored to receive the <a href="https://icml.cc/">ICML 2026 Silver Reviewer Award</a>. Grateful for the recognition and for the opportunity to contribute to the research community.'
- date: "2026.05.29"
  content: 'Two papers accepted: <a href="https://arxiv.org/abs/2605.18055">FLAG</a>, on foundation-model-aligned latent diffusion for spatial gene expression prediction, at <a href="https://icml.cc/">ICML 2026</a>; and "Sprint or Delve: A Distribution-Aware Approach to Efficient Reasoning" at <a href="https://2026.ijcai.org/">IJCAI 2026</a>. Congrats to all co-authors!'
```

Continue with the existing `2026.03.29`, `2025.12.20`, `2025.08.09`,
`2025.07.06`, and `2025.02.03` entries without changing links or meaning.

- [ ] **Step 2: Add a shared news renderer**

Create `_includes/news-list.html`:

```liquid
{% assign news_limit = include.limit | default: site.data.news.size %}
<div class="news-list">
  {% for item in site.data.news limit: news_limit %}
    <article class="news-item">
      <time datetime="{{ item.date | replace: '.', '-' }}">{{ item.date }}</time>
      <div>{{ item.content }}</div>
    </article>
  {% endfor %}
</div>
```

- [ ] **Step 3: Create the homepage News section**

Create `_includes/news.html`:

```liquid
<section id="news" class="container content-section text-center">
  <div class="row">
    <div class="col-md-10 col-md-offset-1">
      <h2>Recent News</h2>
      {% include news-list.html limit=4 %}
      <p class="section-more"><a href="{{ site.baseurl }}/news/">More news</a></p>
    </div>
  </div>
</section>
```

- [ ] **Step 4: Register News as a homepage section**

Create `news-section.html`:

```yaml
---
layout: null
section-type: news
title: News
---
```

- [ ] **Step 5: Create a reusable standalone layout**

Create `_layouts/page.html`:

```liquid
<!DOCTYPE html>
<html lang="{{ site.lang }}">
  {% include head.html %}
  <body id="page-top">
    {% include navigation.html %}
    <main class="standalone-page">
      <section class="container content-section">
        <div class="row">
          <div class="col-md-10 col-md-offset-1">
            <h1>{{ page.title }}</h1>
            {{ content }}
          </div>
        </div>
      </section>
    </main>
    {% include footer.html %}
    {% include js.html %}
  </body>
</html>
```

- [ ] **Step 6: Create the complete News page**

Create `news.html`:

```liquid
---
layout: page
title: News
permalink: /news/
---
{% include news-list.html %}
```

- [ ] **Step 7: Remove the embedded news block from About**

Delete the `## Recent News` heading and `.news-list` block from `about.html`.
Leave the About Me content in place for Task 4.

- [ ] **Step 8: Build and verify news preservation**

Run:

```bash
JEKYLL_ENV=production bundle exec jekyll build --baseurl ""
ruby -ryaml -e 'd=YAML.load_file("_data/news.yml"); abort unless d.length == 7'
```

Expected: build succeeds and the Ruby command exits `0`.

- [ ] **Step 9: Commit**

```bash
git add _data/news.yml _includes/news-list.html _includes/news.html news-section.html news.html _layouts/page.html about.html
git commit -m "Move news into shared archive data"
```

## Task 3: Add Research Highlights

**Files:**
- Create: `_data/research.yml`
- Create: `_includes/research.html`
- Create: `research.html`

- [ ] **Step 1: Add the two approved research pillars**

Create `_data/research.yml`:

```yaml
- title: "AI for Life Sciences"
  description: "Multi-omics foundation models, biological representation learning, RNA design, spatial biology, and clinically relevant AI."
- title: "Scientific Agentic AI"
  description: "Reasoning and agentic systems that plan, use scientific tools, and support reliable scientific discovery workflows."
```

- [ ] **Step 2: Add the Research section include**

Create `_includes/research.html`:

```liquid
<section id="research" class="container content-section text-center">
  <div class="row">
    <div class="col-md-10 col-md-offset-1">
      <h2>Research Highlights</h2>
      <div class="research-grid">
        {% for item in site.data.research %}
          <article class="research-card">
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
          </article>
        {% endfor %}
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 3: Register a homepage source page**

Create `research.html`:

```yaml
---
layout: null
section-type: research
title: Research
---
```

- [ ] **Step 4: Build and inspect generated research content**

Run:

```bash
JEKYLL_ENV=production bundle exec jekyll build --baseurl ""
rg -n "AI for Life Sciences|Scientific Agentic AI" _site/index.html
```

Expected: both research titles appear in `_site/index.html` after Task 6 registers the section; before that, data and include syntax build without errors.

- [ ] **Step 5: Commit**

```bash
git add _data/research.yml _includes/research.html research.html
git commit -m "Add homepage research highlights"
```

## Task 4: Curate Shared Publications

**Files:**
- Modify: `_data/publications.yml`
- Create: `_includes/publication-entry.html`
- Create: `_includes/publication-list.html`
- Modify: `_includes/publications.html`
- Modify: `publications.html`
- Create: `publications-index.html`

- [ ] **Step 1: Add selection metadata**

Add these fields to the six approved entries:

```yaml
# FLAG
selected: true
topic: "Life Science"
homepage_order: 1

# HorusEye
selected: true
topic: "Life Science"
homepage_order: 2

# Structure-based RNA Design
selected: true
topic: "Life Science"
homepage_order: 3

# Sprint or Delve
selected: true
topic: "Agentic AI"
homepage_order: 4

# ChromFound
selected: true
topic: "Life Science"
homepage_order: 5

# SkySense
selected: true
representative: true
topic: "Key Work"
homepage_order: 6
```

No other publication receives `selected: true`.

- [ ] **Step 2: Create the shared publication entry**

Create `_includes/publication-entry.html`:

```liquid
{% capture mark %}{% if include.pub.me_mark == "corr" %}<span class="emoji">✉</span>{% elsif include.pub.me_mark == "equal" %}*{% endif %}{% endcapture %}
{% capture me %}<em><ins><strong>Xin Guo{{ mark }}</strong></ins></em>{% endcapture %}
<div>
  <h3 class="publication-title">{% if include.pub.url %}<a href="{{ include.pub.url }}">{{ include.pub.title }}</a>{% else %}{{ include.pub.title }}{% endif %}</h3>
  <div class="publication-authors">{{ include.pub.authors | replace: "Xin Guo", me }}</div>
  <div class="publication-venue">{{ include.pub.venue }}</div>
</div>
```

- [ ] **Step 3: Create the shared publication list**

Create `_includes/publication-list.html` with two modes:

```liquid
<div class="publication-list{% if include.selected %} publication-list-selected{% endif %}">
  {% if include.selected %}
    {% for homepage_order in (1..6) %}
      {% for group in site.data.publications %}
      {% for pub in group.papers %}
        {% if pub.selected and pub.homepage_order == homepage_order %}
          <article class="publication-item{% if pub.representative %} publication-representative{% endif %}">
            <span class="publication-topic">{{ pub.topic }}</span>
            {% include publication-entry.html pub=pub %}
          </article>
        {% endif %}
      {% endfor %}
      {% endfor %}
    {% endfor %}
  {% else %}
    {% for group in site.data.publications %}
      <section class="publication-group">
        <h2>{{ group.section }}</h2>
        <ol>
          {% for pub in group.papers %}
            <li class="publication-item">
              {% include publication-entry.html pub=pub %}
            </li>
          {% endfor %}
        </ol>
      </section>
    {% endfor %}
  {% endif %}
</div>
```

- [ ] **Step 4: Render only selected papers on the homepage**

Replace `_includes/publications.html` body with:

```liquid
<section id="publications" class="container content-section text-center">
  <div class="row">
    <div class="col-md-12">
      <h2>Selected Publications</h2>
      <p class="publication-note">* Equal contribution · <span class="emoji">✉</span> Corresponding Author</p>
      {% include publication-list.html selected=true %}
      <p class="section-more"><a href="{{ site.baseurl }}/publications/">View all publications</a></p>
    </div>
  </div>
</section>
```

- [ ] **Step 5: Create the complete Publications page**

Create `publications-index.html`:

```liquid
---
layout: page
title: Publications
permalink: /publications/
---
<p class="publication-note">* Equal contribution · <span class="emoji">✉</span> Corresponding Author</p>
{% include publication-list.html %}
```

Keep `publications.html` as the null-layout homepage source:

```yaml
---
layout: null
section-type: publications
title: Publications
---
```

- [ ] **Step 6: Verify counts and selected metadata**

Run:

```bash
ruby -ryaml -e 'd=YAML.load_file("_data/publications.yml"); p=d.flat_map{|g| g["papers"]}; s=p.select{|x| x["selected"]}; abort unless s.length == 6; abort unless s.map{|x| x["homepage_order"]}.sort == (1..6).to_a; abort unless p.count{|x| x["representative"]} == 1'
JEKYLL_ENV=production bundle exec jekyll build --baseurl ""
```

Expected: Ruby and Jekyll exit `0`.

- [ ] **Step 7: Commit**

```bash
git add _data/publications.yml _includes/publication-entry.html _includes/publication-list.html _includes/publications.html publications.html publications-index.html
git commit -m "Add selected and complete publication views"
```

## Task 5: Convert Activities and Experience

**Files:**
- Modify: `activities.html`
- Create: `experience.html`
- Modify: `timeline.html`
- Modify: `_includes/timeline.html`
- Modify: `_config.yml`

- [ ] **Step 1: Convert Activities to a standalone page**

Change the front matter in `activities.html` to:

```yaml
---
layout: page
title: Activities
permalink: /activities/
---
```

Keep all existing patents, services, interviews, competitions, awards, links,
and the contact-for-CV note unchanged. Remove the leading `## Activities`
heading from the body because `_layouts/page.html` renders the page title.

- [ ] **Step 2: Rename the homepage timeline source**

Rename `timeline.html` to `experience.html` and use:

```yaml
---
layout: null
section-type: experience
title: Experience
---
## Experience
```

- [ ] **Step 3: Tighten the timeline data**

In `_config.yml`, rename `events` to `experience` and split role from
organization:

```yaml
experience:
  - image: "/img/photo.JPG"
    date: "Apr. 2024 - Present"
    role: "Principal Research Scientist"
    organization: "SAIS"
  - image: "/img/timeline/alibaba.png"
    date: "Apr. 2016 - Apr. 2024"
    role: "Senior R&D Engineer"
    organization: "Ant & Alibaba Group"
  - image: "/img/timeline/epfl.jpg"
    date: "Sep. 2012 - Nov. 2015"
    role: "MSc in Communication Systems"
    organization: "EPFL"
  - image: "/img/timeline/zju.png"
    date: "Sep. 2008 - Jun. 2012"
    role: "BEng with Honors"
    organization: "Zhejiang University"
```

- [ ] **Step 4: Update the Experience include**

In `_includes/timeline.html`, change the loop and body:

```liquid
{% for event in site.experience %}
  ...
  <div class="timeline-body">
    <p><strong>{{ event.role }}</strong><br>{{ event.organization }}</p>
  </div>
{% endfor %}
```

After the timeline, add:

```liquid
<p class="section-more"><a href="{{ site.baseurl }}/activities/">Patents, academic service, and honors</a></p>
```

- [ ] **Step 5: Build and verify preserved Activities content**

Run:

```bash
JEKYLL_ENV=production bundle exec jekyll build --baseurl ""
rg -n "EP3201917B1|ICML 2026 Silver Reviewer Award" _site/activities/index.html
```

Expected: both preserved content markers appear.

- [ ] **Step 6: Commit**

```bash
git add activities.html experience.html timeline.html _includes/timeline.html _config.yml
git commit -m "Move activities off homepage and simplify experience"
```

Use `git add -A` if the rename is represented as delete/add.

## Task 6: Rebuild Navigation and Homepage Order

**Files:**
- Modify: `_config.yml`
- Modify: `_includes/navigation.html`
- Modify: `_includes/header.html`
- Modify: `_includes/footer.html`
- Modify: `_layouts/index.html`

- [ ] **Step 1: Replace `pages_list` with explicit section and navigation data**

In `_config.yml`, set:

```yaml
homepage_sections:
  - about
  - research
  - publications
  - news
  - experience
  - contact

navigation:
  - title: "About"
    type: "section"
    target: "about"
  - title: "Research"
    type: "section"
    target: "research"
  - title: "Publications"
    type: "page"
    url: "/publications/"
  - title: "News"
    type: "page"
    url: "/news/"
  - title: "Experience"
    type: "section"
    target: "experience"
  - title: "Contact"
    type: "section"
    target: "contact"
```

- [ ] **Step 2: Update homepage composition**

In `_layouts/index.html`, replace `site.pages_list` with:

```liquid
{% for section_type in site.homepage_sections %}
  {% for section_page in site.pages %}
    {% if section_page.section-type == section_type %}
      {% include {{ section_page.path }} %}
    {% endif %}
  {% endfor %}
{% endfor %}
```

- [ ] **Step 3: Update mixed navigation behavior**

Replace the navigation link loop in `_includes/navigation.html`:

```liquid
{% for item in site.navigation %}
  <li>
    {% if item.type == "section" %}
      {% if page.section-type == "index" %}
        <a class="page-scroll" href="#{{ item.target }}">{{ item.title }}</a>
      {% else %}
        <a href="{{ site.baseurl }}/#{{ item.target }}">{{ item.title }}</a>
      {% endif %}
    {% else %}
      <a href="{{ site.baseurl }}{{ item.url }}">{{ item.title }}</a>
    {% endif %}
  </li>
{% endfor %}
```

- [ ] **Step 4: Update hero destinations**

In `_includes/header.html`:

```liquid
<a class="hero-action hero-action-primary" href="{{ site.baseurl }}/publications/">Publications</a>
...
<a href="#about" class="page-scroll intro-scroll" aria-label="Scroll to About">
```

- [ ] **Step 5: Add a persistent Activities footer link**

In `_includes/footer.html`, before copyright:

```liquid
<p class="footer-links"><a href="{{ site.baseurl }}/activities/">Activities</a></p>
```

Keep the existing `.container.text-center` and copyright markup unchanged.

- [ ] **Step 6: Build and run the architecture check**

Run:

```bash
JEKYLL_ENV=production bundle exec jekyll build --baseurl ""
bundle exec ruby scripts/check-site-architecture
```

Expected: section order, archive pages, counts, and navigation pass. Visual
polish remains for Task 8.

- [ ] **Step 7: Commit**

```bash
git add _config.yml _layouts/index.html _includes/navigation.html _includes/header.html _includes/footer.html
git commit -m "Add mixed homepage and archive navigation"
```

## Task 7: Tighten About and Update Positioning Checks

**Files:**
- Modify: `about.html`
- Modify: `_config.yml`
- Modify: `scripts/check-homepage-positioning`

- [ ] **Step 1: Replace About with two focused paragraphs**

Use copy with these required facts:

```html
## About Me

<div class="profile-summary">
  <img src="{{ site.baseurl }}{{ site.me-img }}" alt="Xin Guo">
  <div>
    <p>I am a Principal Research Scientist at the Shanghai Academy of Artificial Intelligence for Science (SAIS). My current research focuses on AI for life sciences, including multi-omics and multimodal foundation models, biological representation learning, and AI systems for scientific discovery.</p>

    <p>Previously, I spent eight years at Ant and Alibaba Group working on applied AI, computer vision, multimodal perception, and foundation models. I hold an MSc in Communication Systems from EPFL and a BEng with honors from Zhejiang University, and I have also worked with Sony and Tractable in Europe.</p>
  </div>
</div>
```

Keep the metric grid. Remove the old `research-focus` block because Research
Highlights now owns that content.

- [ ] **Step 2: Align site metadata terminology**

In `_config.yml`, update:

```yaml
description: "Principal Research Scientist at SAIS — AI for Life Sciences, Multimodal Foundation Models, and Scientific Agentic AI."
hero:
  focus-secondary: "Scientific Agentic AI"
collaboration-statement: "I welcome research collaborations in AI for life sciences, multimodal foundation models, and scientific agentic AI."
```

- [ ] **Step 3: Update the positioning regression check**

In `scripts/check-homepage-positioning`, replace:

```ruby
"Agentic AI for Scientific Discovery"
```

with:

```ruby
"Scientific Agentic AI"
```

Update the collaboration statement expectation to the exact new config text.
Change the Publications hero-link expectation from `#publications` to
`/publications/`.

- [ ] **Step 4: Run positioning and architecture checks**

Run:

```bash
JEKYLL_ENV=production bundle exec jekyll build --baseurl ""
bundle exec ruby scripts/check-homepage-positioning
bundle exec ruby scripts/check-site-architecture
```

Expected: both scripts print their respective `passed` messages.

- [ ] **Step 5: Commit**

```bash
git add about.html _config.yml scripts/check-homepage-positioning
git commit -m "Focus homepage biography on current research"
```

## Task 8: Style the New Information Hierarchy

**Files:**
- Modify: `css/grayscale.scss`
- Modify: `css/timeline.scss`

- [ ] **Step 1: Add shared summary and standalone-page styles**

Add scoped styles to `css/grayscale.scss`:

```scss
.standalone-page {
  padding-top: 72px;
}

.standalone-page .content-section {
  text-align: left;
}

.section-more {
  margin: 28px 0 0;
  text-align: center;
}

.research-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
  margin-top: 28px;
  text-align: left;
}

.research-card {
  padding: 22px;
  border-left: 3px solid $secondary-color;
  background: #f3f7f8;
}

.research-card h3 {
  margin: 0 0 10px;
}

.news-item {
  display: grid;
  grid-template-columns: 110px minmax(0, 1fr);
  gap: 18px;
  padding: 13px 0;
  border-bottom: 1px solid #dde4e7;
  text-align: left;
}

.news-item time {
  color: $primary;
  font-weight: 700;
}

.publication-list-selected .publication-item {
  display: grid;
  grid-template-columns: 105px minmax(0, 1fr);
  gap: 16px;
}

.publication-topic {
  align-self: start;
  padding: 4px 8px;
  border-radius: 3px;
  background: #edf3f5;
  color: #35586a;
  font-size: 13px;
  font-weight: 700;
  text-align: center;
}

.footer-links {
  text-align: center;
}

@media (max-width: 767px) {
  .research-grid {
    grid-template-columns: 1fr;
  }

  .news-item,
  .publication-list-selected .publication-item {
    grid-template-columns: 1fr;
    gap: 6px;
  }
}
```

Do not introduce gradients, oversized radii, or a new color system.

- [ ] **Step 2: Tighten Experience without changing center alignment**

In `css/timeline.scss`, keep `.timeline:before { left: 50%; }` and every desktop
`.timeline-image` rule at `left: 50%` with a negative half-width margin. Make
these exact density changes:

```scss
@media(min-width:768px) {
  .timeline>li {
    margin-bottom: 72px;
  }
}

.timeline .timeline-body>p,
.timeline .timeline-body>ul {
  line-height: 1.45;
}
```

Do not change the square image dimensions or the center-line positioning.

- [ ] **Step 3: Build and check compiled CSS**

Run:

```bash
JEKYLL_ENV=production bundle exec jekyll build --baseurl ""
rg -n "research-grid|publication-list-selected|standalone-page" _site/css/grayscale.css
```

Expected: all three selectors appear in compiled CSS.

- [ ] **Step 4: Start local preview**

Run:

```bash
scripts/preview
```

Expected: preview is available at `http://127.0.0.1:4000/`.

- [ ] **Step 5: Verify desktop and mobile visually**

Inspect:

- `http://127.0.0.1:4000/`
- `http://127.0.0.1:4000/publications/`
- `http://127.0.0.1:4000/news/`
- `http://127.0.0.1:4000/activities/`

At desktop width `1440x900` and mobile width `390x844`, confirm:

- Matterhorn hero remains visible and readable.
- Homepage order matches the approved design.
- No publication title, author list, news item, navigation item, or timeline
  panel clips or overflows.
- Research cards stack on mobile.
- Experience images remain centered on the timeline line.
- Contact and copyright remain centered.
- Standalone pages have clear top spacing below the fixed navigation.

- [ ] **Step 6: Commit**

```bash
git add css/grayscale.scss css/timeline.scss
git commit -m "Style concise homepage and archive pages"
```

## Task 9: Update Maintenance Documentation

**Files:**
- Modify: `README.md`
- Modify: `future-work.md`

- [ ] **Step 1: Update the repository guide**

In `README.md`, document:

```markdown
| `_data/news.yml` | Complete news archive shared by the homepage and News page |
| `_data/research.yml` | Current homepage research pillars |
| `publications-index.html` | Complete Publications page |
| `news.html` | Complete News page |
| `activities.html` | Complete patents, service, awards, and competitions page |
```

Update the content-editing sections so news is edited in `_data/news.yml`, not
`about.html`. Add `bundle exec ruby scripts/check-site-architecture` to
Verification.

- [ ] **Step 2: Close the roadmap item**

In `future-work.md`:

- Mark `Next 2: Homepage Information Architecture` complete with date
  `2026-06-14`.
- Record the six selected papers and standalone Publications, News, and
  Activities pages.
- Leave CV download as low priority.
- Keep `Next 3` open only for future resource metadata such as Code and Project
  links, not for the now-completed standalone publication page.

- [ ] **Step 3: Check documentation formatting**

Run:

```bash
git diff --check
```

Expected: no output and exit `0`.

- [ ] **Step 4: Commit**

```bash
git add README.md future-work.md
git commit -m "Document homepage archive structure"
```

## Task 10: Final Verification

**Files:**
- Verify all changed files

- [ ] **Step 1: Run the full production verification**

Run:

```bash
JEKYLL_ENV=production bundle exec jekyll build --baseurl ""
bundle exec ruby scripts/check-homepage-positioning
bundle exec ruby scripts/check-site-architecture
git diff --check
```

Expected:

```text
Homepage positioning checks passed
Site architecture checks passed
```

The build and `git diff --check` exit `0`.

- [ ] **Step 2: Verify generated routes and links**

Run:

```bash
test -f _site/index.html
test -f _site/publications/index.html
test -f _site/news/index.html
test -f _site/activities/index.html
rg -n 'href="/(publications|news|activities)/"' _site/index.html _site/publications/index.html _site/news/index.html _site/activities/index.html
```

Expected: all files exist and archive links are present.

- [ ] **Step 3: Review the final diff**

Run:

```bash
git status --short
git diff master...HEAD --stat
git log --oneline --decorate -12
```

Expected: only planned source, test, style, and documentation changes appear.
Generated `_site/` remains ignored.

- [ ] **Step 4: Request code review**

Use `superpowers:requesting-code-review` and address any correctness,
regression, responsive-layout, or missing-test findings before integration.
