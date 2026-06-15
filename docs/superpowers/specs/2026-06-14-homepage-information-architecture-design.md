# Homepage Information Architecture Design

## Goal

Shorten the academic website homepage and make its primary narrative easier to
scan:

1. Who Xin / James Guo is
2. What he currently researches
3. Which recent and representative works support that positioning
4. What he has done recently
5. How to collaborate with or recruit him

The redesign retains the current light visual system and Matterhorn hero. It
changes content hierarchy and page responsibilities rather than replacing the
theme.

## Audience and Priorities

The primary audiences are academic collaborators, research leaders,
recruiters, and researchers looking for publications. The homepage should
prioritize current work in AI for Life Sciences and Scientific Agentic AI.

Older work remains available in the complete publication record. SkySense
remains on the homepage because it is a high-impact representative publication
and the author's most-cited paper.

## Homepage Structure

The homepage sections appear in this order:

1. Hero
2. About
3. Research Highlights
4. Selected Publications
5. Recent News
6. Experience
7. Contact

### Hero

Keep the Matterhorn background, name, stable academic role, research
positioning, and existing primary actions. The positioning should cover:

- Principal Research Scientist at SAIS
- AI for Life Sciences
- Multimodal Foundation Models
- Scientific Agentic AI

The hero remains a concise identity and conversion area rather than a content
summary.

### About

Reduce the biography to two focused paragraphs:

- Current role and research at SAIS
- Previous Ant/Alibaba work, international experience, and education

Keep one professional photograph and the existing high-level metrics. Avoid
repeating detailed career history that appears in Experience.

### Research Highlights

Present two current research pillars:

- **AI for Life Sciences:** multi-omics foundation models, biological
  representation learning, RNA design, spatial biology, and clinically
  relevant AI.
- **Scientific Agentic AI:** reasoning and agentic systems that plan, use
  scientific tools, and support reliable discovery workflows.

The descriptions should be concise and understandable to both specialists and
research-oriented recruiters. Multimodal foundation models remain part of the
site-wide positioning and can appear within both pillars where relevant.

### Selected Publications

Show six publications:

- Five recent works relevant to the current research direction
- SkySense as a high-impact representative work

The default ordering is reverse chronological, with SkySense presented as a
clearly labeled representative work rather than inserted by date. Each entry
shows the title, venue, year, authorship marker when applicable, and a compact
topic label.

The section ends with a link to the complete Publications page.

The initial selection is:

1. FLAG, ICML 2026
2. HorusEye, Nature Computational Science 2026
3. Structure-based RNA Design, AAAI 2026
4. Sprint or Delve, IJCAI 2026
5. ChromFound, NeurIPS 2025
6. SkySense, CVPR 2024

### Recent News

Show the latest four news entries in reverse chronological order. End the
section with a link to the complete News page. Older entries must remain
available and must not be deleted during migration.

### Experience

Rename Timeline to Experience and retain four concise career and education
entries:

- SAIS
- Ant & Alibaba Group
- EPFL
- Zhejiang University

Entries should communicate role, organization, and period without repeating
the About biography or listing publications and awards.

### Contact

Keep Contact and copyright centered. Retain direct profile/contact links and a
short collaboration statement covering AI for Life Sciences, multimodal
foundation models, and Scientific Agentic AI.

## Standalone Pages

### Publications

Create `/publications/` as the complete publication record. Reuse
`_data/publications.yml` and organize papers by research direction. All current
publications must remain accessible.

### News

Create `/news/` as the complete news archive. Display all entries in reverse
chronological order.

### Activities

Create `/activities/` with the visible title `Academic & Professional
Activities` for the complete patents, academic service, honors and awards,
interviews, and competitions content. Preserve the current records and
numbered-list formatting; omit the old contact-for-CV prompt.

Activities is not a primary navigation item. It remains discoverable through
an auxiliary link in Experience rather than a global footer link.

## Navigation

The primary navigation contains four items:

`About · Research · Experience · Contact`

All primary navigation items scroll to homepage sections. Complete
Publications and News pages are reached through `View all publications` and
`More news` in their respective homepage sections.

On standalone pages:

- Homepage section links return to the corresponding homepage anchors.
- The site title returns to the homepage.

Mobile navigation must preserve the same destinations without clipping or
overflow.

## Content Data

### Publications

Continue using `_data/publications.yml` as the single publication source.
Extend entries with optional metadata:

- `selected: true` marks homepage publications.
- `topic` provides the compact display label.
- `representative: true` distinguishes SkySense from the recent-work list.

Existing fields and rendering behavior remain compatible. Homepage and
standalone publication views must not maintain duplicate paper records.

### News

Move news entries from `about.html` into `_data/news.yml`. Each entry contains:

- `date` in `YYYY.MM.DD` display format
- Markdown- or HTML-compatible content

Both the homepage preview and News page render from this file. The homepage
limits output to four entries; the News page renders all entries.

### Research Highlights

Keep the two research pillars in `_data/research.yml`. The homepage Research
include renders both entries from this single source.

## Rendering and File Structure

Retain Jekyll, Liquid, the existing includes, and the current styling system.
The implementation should separate homepage section rendering from standalone
page layouts so a page is not accidentally included twice by
`site.pages_list`.

The rendering responsibilities are:

- Homepage includes render compact About, Research, Publications, News,
  Experience, and Contact sections.
- Standalone page layouts render complete Publications, News, and Activities.
- Shared publication and news item includes avoid duplicated markup where that
  improves consistency.

Exact filenames may follow the repository's established conventions, provided
the public URLs and page responsibilities in this design remain unchanged.

## Visual Direction

Preserve:

- Light mode
- Matterhorn hero image
- Current typography and restrained academic tone
- Square/compact imagery where already established
- Centered Contact and copyright

Improve:

- Section spacing and heading hierarchy
- Publication and news density
- Text line lengths and mobile wrapping
- Clear links from homepage summaries to complete pages

This project does not include dark mode, Bootstrap migration, a new theme, a CV
download, analytics, or broad visual rebranding.

## Migration and Compatibility

- Preserve every existing publication, news item, patent, service entry, award,
  competition, and external link.
- Existing homepage anchor links should either remain valid or receive an
  intentional replacement.
- Do not commit generated `_site/` output.
- Keep GitHub Actions deployment behavior unchanged.
- Update `future-work.md` when implementation is complete.

## Verification

The implementation is complete when:

- The homepage follows the approved section order and is materially shorter.
- The homepage shows exactly four recent news entries.
- The homepage shows the approved five recent publications plus SkySense.
- `/publications/`, `/news/`, and `/activities/` render all corresponding
  historical content.
- Primary navigation works from both the homepage and standalone pages.
- Contact and copyright remain centered.
- Desktop and mobile layouts do not clip, overflow, or produce visibly sparse
  one- or two-word lines where normal wrapping can avoid them.
- The production Jekyll build succeeds.
- Existing homepage positioning checks pass or are deliberately updated to
  match the approved structure.
- New checks cover homepage item limits, standalone page availability, and
  preservation of full data records.
