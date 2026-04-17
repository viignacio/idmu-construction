# Design: Project Showcase (Monolithic Scale)

## 1. Overview
The "Monolithic Scale" section is a high-impact project showcase module. It utilizes a 12-column masonry-style grid where each cell is a "composable block" that references a Project document. It features complex, configurable hover interactions that reflect IDMU's industrial-minimalist aesthetic.

## 2. Sanity Schema Design

### 2.1 `projectShowcase` (Block Module)
- `_type`: 'projectShowcase'
- `heading`: string
- `subheading`: text
- `cta`: object { label: string, link: string }
- `projects`: array of `projectItem`

### 2.2 `projectItem` (Item Object)
- `project`: reference to 'project'
- `size`: string enum ['landscape', 'portrait']
    - `landscape`: Span 8/12 columns on desktop.
    - `portrait`: Span 4/12 columns on desktop.
- `hoverEffect`: string enum ['cardPeek', 'showText', 'zoomOut', 'zoomIn']
- `cardColor`: string enum ['navy', 'yellow', 'white']
- `position`: string enum ['topLeft', 'topRight', 'bottomLeft', 'bottomRight']
    - Ignored if `hoverEffect` is 'showText'.
- `isOffset`: boolean
    - If true, adds a standard offset (e.g., 3rem) from the edge.

## 3. Component Architecture

### 3.1 `ProjectShowcase.tsx`
The container module that renders the section wrapper and the masonry grid.
- **Grid Strategy**: 12-column CSS Grid.
- **Layout**: Renders `ProjectCard` for each item in the `projects` array.

### 3.2 `ProjectCard.tsx`
The primary logic component. It receives the resolved project data and the configuration overrides.

#### Content Modes
- **Mode A: Monolithic Card**: Renders an opaque box (card) with the project details.
    - Used for: `cardPeek`, `zoomOut`, `zoomIn`.
    - Styles: `cardColor` determines BG; `position` and `isOffset` determine placement.
- **Mode B: Immersive Overlay**: Renders a full-bleed semi-transparent canvas.
    - Used for: `showText`.
    - Styles: Content is always centered; backdrop is tinted by `cardColor`.

#### Dynamic Data Fallback
- **Standard Detail**: If `sector` and `year` exist, show "Sector / Year" above the Title in a smaller font.
- **Impact Title**: If metadata is missing, show only the Title with "Forge Industrial" styling (Large, Black/Bold weight).

## 4. Interaction Design (Panda CSS)

### 4.1 Recipes
We will use a Panda CSS `recipe` to handle the variants:
- **`projectCard`**: Handles the container aspect ratio and image zoom.
- **`projectContent`**: Handles the transition logic (opacity, translate) based on the `hoverEffect`.

### 4.2 Animations
- **cardPeek**: On hover, the background image scale shifts to 1.0 (from 1.05) and the content card translates from `translateY(1rem)` to `translateY(0)`.
- **showText**: On hover, the image scales and the centered text overlay fades in (`opacity: 1`).
- **zoomIn/Out**: Standard scale transformations on the image.

## 5. Implementation Targets
- **Sanity**: Add `projectShowcase` to the block list and define `projectItem`.
- **Frontend**: Create `components/modules/ProjectShowcase.tsx` and `components/modules/ProjectCard.tsx`.
- **Styling**: Define Panda CSS recipes in `panda.config.ts` or local component scope.
