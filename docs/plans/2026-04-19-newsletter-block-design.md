# Design Document: Newsletter Subscription Block

## 1. Objective
Create a standalone, responsive Newsletter Subscription module that adheres to the "Monolith" industrial-minimalist design system. This module will be part of the Sanity Page Builder and utilize shared infrastructure for consistent background coloring and section layout.

## 2. Technical Architecture

### 2.1 Theme Utility (`src/lib/theme.ts`)
Extract and centralize the color mapping logic from `CtaBlock.tsx`.
- Maps Sanity color strings to Panda CSS semantic tokens.
- Calculates contrast (dark/light) to automatically determine text and CTA colors.

### 2.2 Section Container (`src/components/common/SectionContainer.tsx`)
A shared layout component for all Page Builder modules.
- Handles standard vertical padding: `paddingY: { base: "6rem", md: "8rem" }`.
- Applies the background color and sets the base text color.
- Provides a restricted-width inner container for centered content.

### 2.3 Newsletter Module (`src/components/modules/Newsletter.tsx`)
The feature component.
- Implements the subscription form with a bottom-border-only input.
- Uses `SectionContainer` for layout.
- Responsive handling: Row layout on desktop, stacked on mobile.

## 3. Visual Specifications
- **Heading**: `Space Grotesk`, Bold, `5rem`/`80px` on desktop.
- **Input Field**: 0px radius, 2px bottom border (`outline-variant`), transitions to `tertiary` (Yellow) on focus.
- **CTA Button**: Uses the `CtaButton` component with dynamic theme switching based on section background.

## 4. CMS Integration (Schema)
The module will require a new schema definition in Sanity:
- `title`: string
- `subheading`: text
- `placeholder`: string
- `buttonText`: string
- `backgroundColor`: string (reference to color set)

## 5. Success Criteria
- [ ] No page-level horizontal scroll issues.
- [ ] Correct contrast for text/buttons on all background variants.
- [ ] 0px border radius maintained across all elements.
- [ ] Standard site-wide section padding.
