# Design Document: Projects Page Hero Banner (Text Only Variant)

## 1. Overview
Implementing the "Text Only" variant of the Hero module for the IDMU Construction projects page. This variant focuses on architectural typography and modular layout, stripping away background media to highlight structural messaging.

## 2. Design Goals
- Achieve "The Monolith" aesthetic: sharp edges, tight tracking, and industrial color palette.
- Implement dynamic "Highlighted Word" logic to emphasize specific text within the heading.
- Ensure zero regression or interference with existing Hero variants (Full, Compact, Image-Text).
- Adhere to the design reference provided in `docs/projects/code.html` while removing the filter section as requested.

## 3. Architecture & Data Model

### 3.1 Sanity Schema (`src/sanity/schema/pages.ts`)
The `hero` object in the page builder will be updated:

- **New Field:** `highlightedWord` (string).
- **Conditional Visibility:**
  - `highlightedWord`: Visible ONLY when `variant === "text"`.
  - Media fields (`backgroundType`, `backgroundImage`, `backgroundVideo`, `videoPlaceholder`): Hidden when `variant === "text"`.
  - CTA fields (`primaryCTA`, `secondaryCTA`): Hidden when `variant === "text"`.
  - `eyebrow`, `heading`, `subheading`: Remain shared but reused contextually.

### 3.2 Frontend Component (`src/components/modules/Hero.tsx`)
The React component will be updated to handle the `text` variant:

- **Logic:** Use a case-insensitive Regex to split the `heading` string by the `highlightedWord` and wrap matches in a styled `<span>`.
- **Layout:**
  - Semantic `<header>` wrapper.
  - Flex layout (column for mobile, row for desktop) with `items-end` alignment to match reference.
  - Typography using Panda CSS tokens:
    - `eyebrow`: `text-xs`, `font-black`, `tracking-0.3em`, color `tertiary`.
    - `heading`: `text-6xl` (mobile) to `text-8xl` (desktop), `font-headline`, `tracking-tighter`.
    - `highlight`: color `secondary` (Slate) or `on-primary-container`.
    - `subheading`: `text-lg`, `font-body`, `leading-relaxed`, color `on-surface-variant`.

## 4. Testing & Validation
- **Studio Validation:** Verify fields hide/show correctly when toggling variants.
- **Rendering Validation:** Ensure multiple occurrences of the highlighted word (if any) are handled, or just the specified phrase.
- **Regression Testing:** Check the Homepage (which uses the `full` variant) to ensure no visual or functional changes.
