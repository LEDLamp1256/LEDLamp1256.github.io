---
name: Dylan Lee — Computer Engineering Portfolio
description: A dark, restrained engineering spec sheet for a single-page portfolio.
colors:
  background: "#0d1117"
  foreground: "#e2e8f0"
  surface-raised: "#131a24"
  signal: "#5eead4"
  hairline: "rgba(148, 163, 184, 0.16)"
  text-muted: "#90a1b9"
  status-archived: "#fcd34d"
typography:
  display:
    fontFamily: "Geist, sans-serif"
    fontSize: "3.75rem"
    fontWeight: 600
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Geist, sans-serif"
    fontSize: "1rem"
    lineHeight: 1.625
  label:
    fontFamily: "Geist Mono, monospace"
    fontSize: "0.75rem"
    letterSpacing: "0.25em"
  code:
    fontFamily: "Geist Mono, monospace"
    fontSize: "0.75rem"
rounded:
  chip: "2px"
  control: "6px"
  panel: "8px"
  card: "12px"
spacing:
  gutter-mobile: "24px"
  gutter-desktop: "40px"
  column: "56rem"
components:
  button-primary:
    backgroundColor: "{colors.signal}"
    textColor: "{colors.background}"
    rounded: "{rounded.control}"
    padding: "12px 20px"
  chip:
    textColor: "{colors.foreground}"
    rounded: "{rounded.chip}"
    padding: "2px 8px"
---

# Design System: Dylan Lee — Computer Engineering Portfolio

## Overview

The site reads like a datasheet for a part: a nameplate, hairline-divided spec rows, and project "figures" that show how each system works. It is dark, quiet, and information-first. Decoration is limited to what carries information: a teal signal color, hairlines, and monospace labels.

## Colors

### Primary

- **Signal teal `#5eead4`**: the only accent. Primary action, section rule marks, active figure labels, hover and focus states, the availability dot. Never used for large fills beyond the primary button.

### Neutral

- **Background `#0d1117`** for every section; **surface-raised `#131a24`** only for the resume nameplate.
- **Hairline `rgba(148,163,184,0.16)`** for dividers, chips, and media frames.
- Body text is slate-200/300; secondary text and labels are slate-400 (`#90a1b9`), which keeps small text above 4.5:1 on the background. Slate-500 is not used for text.

### Named Rules

- **Amber means archived.** Amber appears only on the "Archived" status marker.
- **Dark only.** The site sets `color-scheme: dark`; there is no light theme.

## Typography

- **Geist** for headings and prose; **Geist Mono** for code, technology identifiers, dates, and spec labels. Mono is not used for prose (course names, captions, and descriptions stay in Geist).
- Hierarchy: name (60px desktop / 36px mobile, semibold) → card titles (18px semibold) → entry titles (16px medium) → body (14–18px) → labels (12px mono, uppercase, wide tracking).
- Nothing below 12px. Prose measure stays at or under ~68ch.

## Layout

- One centered column, `max-w-4xl` (56rem), shared by the nav, Hero, Resume, and Projects so every left edge aligns. Gutters are 24px on mobile and 40px from `md`.
- Order: Hero → Resume/Skills → Projects. The Hero is content-height, not full-viewport, so the resume begins within the first screen on desktop.
- Resume rows use a 140px label column from `md`, stacked below it.
- Projects are one column below 1024px and two columns from `lg`, keeping architecture diagrams roughly 390–640px wide.

## Elevation & Depth

Flat. Depth comes from hairlines and a single raised surface (the nameplate). No shadows, glows, or glass, except the sticky header's light backdrop blur, which keeps content legible under it.

## Shapes

Small radii that grow with container size: chips 2px, controls 6px, panels and media frames 6–8px, cards 12px.

## Components

### Buttons

Primary: solid signal teal with dark text. Secondary: hairline border, slate text, brightening on hover. The resume download is a tinted teal outline.

### Chips

One chip shape (2px radius, hairline border, faint fill, 12px) for skills, coursework, and tech stacks. Technology chips are mono; coursework is sans.

### Cards / Containers

Project cards are the only repeated container. Active cards have a faint fill and gain a teal border on hover; archived cards drop the fill and use a quieter border. Nothing is nested inside a card except the media frame.

### Navigation

Sticky 56px header with the name and four anchor links. "About" is hidden below 360px because the name link already returns to the top. Anchor targets are offset by `scroll-padding-top`.

### Engineering Edge (signature component)

Each project ends with a figure: a mono label (Architecture Diagram, Visual, Code Snippet), the artifact in a hairline frame, and a caption describing the data path. Diagrams have a "Full size" link to the original image. Code snippets are scrollable and keyboard-focusable.

## Do's and Don'ts

### Do:

- Show how things work: diagrams, code, and data-path captions.
- Keep one accent color and one column.
- Give every interactive element a visible teal focus ring and a target of at least 24px.
- Respect `prefers-reduced-motion`; motion is limited to color transitions and the availability pulse.

### Don't:

- Add gradients, glows, particles, glass, or decorative backgrounds.
- Add metrics, testimonials, or claims that are not in the resume or project data.
- Introduce a second accent color, or use slate-500 for text.
- Nest cards, or use mono for prose.
