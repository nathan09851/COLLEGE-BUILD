---
name: Xavier Modernist
colors:
  surface: '#f8f9fa'
  surface-dim: '#d9dadb'
  surface-bright: '#f8f9fa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4f5'
  surface-container: '#edeeef'
  surface-container-high: '#e7e8e9'
  surface-container-highest: '#e1e3e4'
  on-surface: '#191c1d'
  on-surface-variant: '#44474d'
  inverse-surface: '#2e3132'
  inverse-on-surface: '#f0f1f2'
  outline: '#74777e'
  outline-variant: '#c4c6cd'
  surface-tint: '#4d6079'
  primary: '#000c1e'
  on-primary: '#ffffff'
  primary-container: '#0f233a'
  on-primary-container: '#788ba6'
  inverse-primary: '#b5c8e6'
  secondary: '#b7131d'
  on-secondary: '#ffffff'
  secondary-container: '#db3232'
  on-secondary-container: '#fffbff'
  tertiary: '#040f00'
  on-tertiary: '#ffffff'
  tertiary-container: '#102800'
  on-tertiary-container: '#5c992c'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d3e4ff'
  primary-fixed-dim: '#b5c8e6'
  on-primary-fixed: '#071c33'
  on-primary-fixed-variant: '#354861'
  secondary-fixed: '#ffdad6'
  secondary-fixed-dim: '#ffb3ac'
  on-secondary-fixed: '#410003'
  on-secondary-fixed-variant: '#930010'
  tertiary-fixed: '#b2f57c'
  tertiary-fixed-dim: '#97d863'
  on-tertiary-fixed: '#0c2000'
  on-tertiary-fixed-variant: '#265100'
  background: '#f8f9fa'
  on-background: '#191c1d'
  surface-variant: '#e1e3e4'
typography:
  headline-xl:
    fontFamily: Newsreader
    fontSize: 72px
    fontWeight: '600'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Newsreader
    fontSize: 48px
    fontWeight: '500'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Newsreader
    fontSize: 32px
    fontWeight: '500'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Public Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Public Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-caps:
    fontFamily: Public Sans
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1'
    letterSpacing: 0.1em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-page: 64px
  section-gap: 120px
---

## Brand & Style

The design system is built upon the concept of "Academic Excellence through Modernist Clarity." It moves away from the cluttered layouts typical of educational institutions toward a prestigious, editorial aesthetic. The brand personality is intellectual, authoritative, and forward-thinking.

The visual style is **Minimalist and High-Contrast**, utilizing massive typographic scales and expansive whitespace to denote importance and clarity. By stripping away decorative elements, the focus is placed entirely on institutional legacy and academic achievement. The interface should feel like a high-end digital journal—clean, structured, and profoundly organized.

## Colors

The palette is anchored by a deep, authoritative navy (`#0F233A`), representing the college's traditional roots and academic stability. This is contrasted against a stark white background to create a high-end, gallery-like feel.

- **Primary:** Deep Navy is used for typography, navigation bars, and structural borders.
- **Secondary:** Academic Crimson (`#DD3333`) is reserved for high-impact calls to action and critical highlights, used sparingly to maintain its power.
- **Tertiary:** Natural Green (`#6DAB3C`) serves as a secondary accent for growth-related metrics, sustainability initiatives, or success states.
- **Neutral:** A subtle off-white (`#F8F9FA`) is used for surface layering to prevent eye strain while maintaining the high-contrast aesthetic.

## Typography

This design system employs a sophisticated pairing of an intellectual serif and a functional sans-serif to bridge the gap between tradition and modernization.

**Newsreader** is utilized for headlines to evoke a sense of literary tradition and prestigious authority. Its varying optical weights allow for dramatic, large-scale typography that serves as a primary visual element.

**Public Sans** is used for body copy and UI elements. Its neutral, institutional clarity ensures high legibility for dense academic information. All labels should be set in uppercase with increased letter spacing to provide a structural, navigational hierarchy.

## Layout & Spacing

The layout follows a **Fixed Grid** model to maintain a sense of order and institutional discipline. A 12-column grid is used with generous 24px gutters. 

Whitespace is treated as a premium asset. Section gaps are intentionally large (120px+) to allow content to breathe and to separate distinct academic departments or news items. Page margins are wide (64px+) to drive the user's eye toward the center-aligned content, mimicking the layout of a published academic paper or a luxury editorial.

## Elevation & Depth

This design system avoids traditional shadows in favor of **Tonal Layering and Low-Contrast Outlines**. Depth is communicated through the stacking of surfaces and the use of subtle 1px borders in the primary navy color at low opacities (10-15%).

- **Level 0:** Base white background.
- **Level 1:** Off-white (`#F8F9FA`) containers for cards or informational blocks.
- **Level 2:** High-contrast navy backgrounds for primary navigation or footer sections.

Interactive elements do not lift; instead, they utilize high-contrast color shifts or structural changes (e.g., a weight increase or an added underline) to signal state changes.

## Shapes

The shape language is disciplined and professional. **Soft (0.25rem)** corners are applied to most UI components to prevent the interface from feeling overly sharp or aggressive, while maintaining a fundamentally rectangular, grid-aligned structure.

Interactive buttons and form inputs utilize this slight rounding, while larger structural elements like hero sections or image containers may remain perfectly sharp (0px) to reinforce the modernist, architectural feel of the design.

## Components

### Buttons
Primary buttons are solid Navy with White text, using the "Soft" corner radius. Secondary buttons are "Ghost" style—transparent with a 1px Navy border and Navy text. All buttons use the `label-caps` typographic style for a rigorous, formal appearance.

### Cards
Cards are minimalist with no shadows. They use a light-gray (`#F8F9FA`) background and a subtle 1px border. Headlines within cards use the Serif font, while metadata (dates, categories) uses the uppercase Sans-Serif label style.

### Input Fields
Inputs are underlined or outlined with a 1px border. When focused, the border weight increases to 2px in the Primary Navy color. Labels are always positioned above the input field in the `label-caps` style.

### Navigation
The main navigation is high-contrast. It utilizes a sticky header with a white background and Navy text. Active links are indicated by a simple 2px Navy underline, avoiding background highlights or pills.

### Academic Lists
For course catalogs or faculty directories, lists should use a "ruled" style—items separated by a full-width 1px horizontal rule, with generous vertical padding (32px) between rows to maintain the minimalist aesthetic.