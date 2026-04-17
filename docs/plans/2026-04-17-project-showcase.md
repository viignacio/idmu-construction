# Project Showcase (Monolithic Scale) Implementation Plan

> **For Antigravity:** REQUIRED WORKFLOW: Use `.agent/workflows/execute-plan.md` to execute this plan in single-flow mode.

**Goal:** Build a modular, high-impact Project Showcase (Monolithic Scale) block with configurable masonry layout and rich hover interactions.

**Architecture:** A composable Sanity-backed module using a 12-column CSS Grid. Each cell uses a Panda CSS recipe to handle complex hover states (Card Peek, Show Text, Zoom) and dynamic UI fallbacks.

**Tech Stack:** Next.js 15, Sanity CMS, Panda CSS, TypeScript.

---

### Task 1: Update Sanity Schema

**Files:**
- Modify: `src/sanity/schema/pages.ts`

**Step 1: Add projectShowcase module and supporting objects**
Add the `projectShowcase` object to the `modules` array in `src/sanity/schema/pages.ts`, including the `projectItem` object definition.

**Step 2: Commit**
```bash
git add src/sanity/schema/pages.ts
git commit -m "schema: add projectShowcase module to page builder"
```

### Task 2: Update GROQ Query

**Files:**
- Modify: `src/sanity/lib/queries.ts`

**Step 1: Resolve project references in PAGE_QUERY**
Update the `PAGE_QUERY` to include logic for `_type == "projectShowcase"`, resolving the `project` reference to fetch `title`, `sector`, `year`, and the image URL.

**Step 2: Commit**
```bash
git add src/sanity/lib/queries.ts
git commit -m "gql: resolve project references in Page query"
```

### Task 3: Create ProjectCard Component

**Files:**
- Create: `src/components/modules/ProjectCard.tsx`

**Step 1: Implement the logic for "Standard" vs "Impact" styling**
Create the component and handle the UI logic for showing Sector/Year or the Impact Title styling.

**Step 2: Implement "Immersive Overlay" for 'showText' effect**
Add the full-bleed overlay logic specifically for the `showText` hover style.

**Step 3: Commit**
```bash
git add src/components/modules/ProjectCard.tsx
git commit -m "feat: implement ProjectCard with dynamic data modes"
```

### Task 4: Create ProjectShowcase Module Component

**Files:**
- Create: `src/components/modules/ProjectShowcase.tsx`
- Modify: `src/components/modules/ModuleRenderer.tsx`

**Step 1: Implement the 12-column masonry grid**
Create `ProjectShowcase.tsx` and map over the `projects` items, passing them to `ProjectCard`.

**Step 2: Register module in ModuleRenderer**

**Step 3: Commit**
```bash
git add src/components/modules/ProjectShowcase.tsx src/components/modules/ModuleRenderer.tsx
git commit -m "feat: add ProjectShowcase module and render logic"
```

### Task 5: Implement Panda CSS Recipes for Hover Interactions

**Files:**
- Modify: `src/components/modules/ProjectCard.tsx`

**Step 1: Define the card and content recipes**
Implement the `cardPeek`, `zoom`, and `positioning` logic using Panda components or `css`.

**Step 2: Run verification**
Ensure animations work across `landscape` (span 8) and `portrait` (span 4) cells.

**Step 3: Commit**
```bash
git add src/components/modules/ProjectCard.tsx
git commit -m "style: add refined hover animations and recipes"
```
