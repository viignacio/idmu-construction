# Projects Page Hero Banner Implementation Plan

> **For Antigravity:** REQUIRED WORKFLOW: Use `.agent/workflows/execute-plan.md` to execute this plan in single-flow mode.

**Goal:** Implement the "Text Only" Hero variant with a dynamic highlighted word in the Sanity CMS and React frontend.

**Architecture:** We use Approach 1: Reuse existing `eyebrow`, `heading`, and `subheading` fields in Sanity, adding a `highlightedWord` field. In the frontend, we use Regex to inject a highlight `<span>` into the heading.

**Tech Stack:** Sanity, Next.js, Panda CSS, TypeScript.

---

### Task 1: Update Sanity Schema

**Files:**
- Modify: `src/sanity/schema/pages.ts:28-148`

**Step 1: Add highlightedWord field and update visibility**
Add the `highlightedWord` field to the `hero` object fields array. Add `hidden` logic to hide unused fields when `variant === "text"`.

```typescript
// Add to fields array
{
  name: "highlightedWord",
  type: "string",
  title: "Highlighted Word",
  description: "A word or phrase from the heading to highlight. Case-insensitive.",
  group: "content",
  hidden: ({ parent }) => parent?.variant !== "text",
},
// Update CTAs to hide on text variant
// primaryCTA hidden: ({ parent }) => parent?.variant === "text",
// secondaryCTA hidden: ({ parent }) => parent?.variant === "text",
```

**Step 2: Verify visibility logic for all fields**
Ensure `backgroundType`, `backgroundImage`, `backgroundVideo`, `videoPlaceholder`, and `alignment` are all hidden when `variant === "text"`.

**Step 3: Commit**
```bash
git add src/sanity/schema/pages.ts
git commit -m "feat(cms): add highlightedWord field and visibility logic for hero text variant"
```

### Task 2: Implement "Text Only" Rendering in Hero Component

**Files:**
- Modify: `src/components/modules/Hero.tsx`

**Step 1: Update HeroProps interface**
Add `highlightedWord` to the `HeroProps` interface.

```typescript
interface HeroProps {
  // ...
  highlightedWord?: string;
}
```

**Step 2: Implement text layout rendering**
Add the rendering logic for the `text` variant inside the `Hero` component.

```tsx
if (variant === "text") {
  const getHighlightedHeading = () => {
    if (!heading) return null;
    if (!highlightedWord) return heading;

    const parts = heading.split(new RegExp(`(${highlightedWord})`, "gi"));
    return parts.map((part, i) =>
      part.toLowerCase() === highlightedWord.toLowerCase() ? (
        <span key={i} className={css({ color: "secondary" })}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <header
      className={css({
        paddingX: "2rem",
        marginBottom: "5rem",
        maxWidth: "7xl",
        marginX: "auto",
        paddingTop: "8rem", // pt-32 equivalent
      })}
    >
      <div
        className={css({
          display: "flex",
          flexDirection: { base: "column", md: "row" },
          alignItems: { base: "flex-start", md: "flex-end" },
          justifyContent: "space-between",
          gap: "2rem",
        })}
      >
        <div className={css({ maxWidth: "42rem" })}>
          {eyebrow && (
            <span
              className={css({
                display: "block",
                fontFamily: "body",
                fontSize: "xs",
                fontWeight: "900",
                letterSpacing: "0.2em",
                color: "tertiary",
                textTransform: "uppercase",
                marginBottom: "1rem",
              })}
            >
              {eyebrow}
            </span>
          )}
          {heading && (
            <h1
              className={css({
                fontFamily: "headline",
                fontWeight: "bold",
                fontSize: { base: "4xl", md: "8xl" },
                letterSpacing: "tighter",
                lineHeight: "none",
                marginBottom: "1.5rem",
              })}
            >
              {getHighlightedHeading()}
            </h1>
          )}
          {subheading && (
            <p
              className={css({
                fontFamily: "body",
                fontSize: "lg",
                lineHeight: "relaxed",
                color: "on-surface-variant",
                maxWidth: "32rem",
              })}
            >
              {subheading}
            </p>
          )}
        </div>
      </div>
    </header>
  );
}
```

**Step 3: Commit**
```bash
git add src/components/modules/Hero.tsx
git commit -m "feat(ui): implement text variant for Hero module"
```

### Task 3: Regression Testing

**Step 1: Verify Homepage Hero**
Ensure the Homepage (which uses the `full` variant) still renders correctly with background media.

**Step 2: Commit**
No commit needed if no issues found.
