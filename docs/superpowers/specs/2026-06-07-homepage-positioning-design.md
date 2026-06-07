# Homepage Positioning and Conversion Design

## Goal

Make the Matterhorn hero communicate Xin / James Guo's academic identity immediately, while retaining the personal character of the existing rotating text. Improve access to research, academic profiles, and collaboration contact without making the page feel commercial.

## Hero Content

The hero will use this fixed hierarchy:

1. `Xin / James Guo`
2. `Principal Research Scientist at SAIS`
3. Two-line research focus:
   - `AI for Life Sciences · Multimodal Foundation Models`
   - `Agentic AI for Scientific Discovery`

The full institution name remains in About Me. The hero uses `SAIS` to keep the line concise.

## Rotating Text

Typed.js remains enabled and rotates:

- `Running Up That Hill`
- `Decoding Life with Foundation Models`

The rotating line is visually secondary to the fixed identity and research focus. A short divider separates it from the fixed content.

## Hero Actions

Show three restrained actions:

- `Publications`: primary white button linking to `#publications`
- `Google Scholar`: transparent outlined button linking to the configured Scholar profile
- `Contact`: transparent outlined button linking to `#contact`

The controls must remain usable and non-overlapping on mobile. Links receive visible focus styles and descriptive labels where needed.

## Contact

Add this centered collaboration statement above the email and social links:

> I welcome research collaborations in AI for life sciences, multimodal foundation models, and agentic AI for scientific discovery.

The statement should match the existing light academic theme and preserve the centered Contact layout.

## CV Decision

Do not expose a CV download in this iteration. Remove pressure to add a placeholder or disabled control. A downloadable CV remains low-priority future work and will only be added when a publishable PDF is supplied.

## Configuration and Structure

Prefer configurable content over hardcoded institutional and research text where it fits the existing Jekyll structure. Reuse the configured Google Scholar URL rather than duplicating it. Keep the implementation scoped to the header, Contact section, configuration, and associated responsive styles.

## Responsive Behavior

- Desktop: fixed identity and focus centered over the Matterhorn image, with actions on one row.
- Mobile: reduce type size, preserve the two-line research focus, and allow action buttons to wrap cleanly.
- The first viewport must retain enough background image to preserve the current visual identity.

## Verification

- Run the production Jekyll build used by GitHub Actions.
- Verify the three hero links resolve correctly.
- Verify fixed text is present in generated HTML without relying on JavaScript.
- Inspect desktop and mobile layouts for wrapping, contrast, and overlap.
- Confirm Contact and copyright remain centered.
