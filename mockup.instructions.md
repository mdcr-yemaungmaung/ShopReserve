---
applyTo: "docs/06_mockup/**"
description: EzBookNow モックアップ画面 (docs/06_mockup/) UI/UX 実装・修正規約
---

# EzBookNow Mockup — Variant UI/UX Instructions (Mandatory)

These instructions apply to EVERY agent working on ANY file under `docs/06_mockup/`.
They exist to prevent screen-to-screen design drift inside a single mock variant:
KPI cards changing shape between screens, buttons being restyled ad hoc, icons
coming from different families, layouts shifting, and desktop fixes silently
breaking mobile screens that already worked.

---

## 0. Golden Rule

**One variant = one design language.**

1. Never mix styles across variants (`user` and `reserve` may use completely
   different palettes — e.g. Kinetic Glass vs Fresh Market — and that is correct).
2. Inside ONE variant, every screen must be visually indistinguishable in style
   from its sibling screens: same KPI card anatomy, same button classes, same
   icon family, same page skeleton.
3. The variant's own `DESIGN.md` and its already-built screens are the single
   source of truth. They override your general habits, preferences, and any
   pattern you "usually" use. If your planned change does not match what the
   variant's existing screens do, change YOUR plan, not their style.

### Variant inventory (as of 2026-08)

| Contract status | Variants |
|---|---|
| Has `DESIGN.md` | `admin`, `admin-modern`, `admin-saasadmin/admin`, `reserve`, `shop`, `shop/shop`, `shop-reserve/shop`, `user-redesign`, `user-v2`, `user-yoyaku`, root `DESIGN.md` |
| Missing `DESIGN.md` | `user`, `user-concept`, `user-deluxe`, `user-experience`, `user-nextgen`, `user-premier`, `user-table-booking` |

Re-scan this yourself at task start; do not trust this table blindly.

---

## 1. Mandatory Workflow (every UI task, no exceptions)

Execute Steps 1–4 in order BEFORE writing any code. Summarize each step's
findings in your plan message.

### Step 1 — Identify the variant

Name explicitly which variant folder under `docs/06_mockup/` you are editing
(e.g. `user-yoyaku`). All later steps apply to THAT variant only.

### Step 2 — Load the design contract

- **If `<variant>/DESIGN.md` exists:** read it fully. Extract and quote in your
  plan the binding tokens: color palette, typography scale, corner radii,
  spacing rhythm, elevation/shadow rules, component rules (buttons, chips,
  cards), and icon family. These values are constraints, not suggestions.
- **If `<variant>/DESIGN.md` is missing:** STOP feature work and auto-generate
  it first:
  1. Read the variant's `css/*.css` custom-property definitions and 2–3
     representative screens (`index.html`, `js/screens/*.js`) covering a
     dashboard/list/detail type screen if present.
  2. Derive the de-facto system actually in use: colors, fonts, radius,
     spacing, component anatomy, icons.
  3. Write `<variant>/DESIGN.md` using the same YAML frontmatter format as
     `docs/06_mockup/user-yoyaku/DESIGN.md` (frontmatter `name:` + `colors:` +
     `typography:`, followed by concise component rules).
  4. Show it to the user for confirmation before continuing.
  5. NEVER invent styles that cannot be derived from the variant's existing
     screens. The generated file records reality; it does not redesign it.

### Step 3 — Pattern inventory (replicate, don't reinvent)

Read sibling screens of the SAME variant that already contain the component
types you are about to touch, then list in your plan the exact patterns to
replicate:

| Component type | What to extract from siblings |
|---|---|
| KPI / stat cards | exact wrapper class + inner markup order (icon, label, value, trend) + modifier classes |
| Buttons | exact class names + sizes + icon placement |
| Status badges / chips | exact class names + state-to-color mapping |
| Tables / lists | container class, header/cell markup, empty-row handling |
| Modals / drawers | backdrop + shell + header/body/footer structure |
| Forms | label/input/select classes, required marker, helper text |
| Dropdowns & Selects | custom popover wrapper, trigger anatomy, options list, active checkmark, keyboard/dismissal |
| Page skeleton | header → filter bar → content → pagination ORDER and spacing |
| Icons | which icon set the variant uses (e.g. Material Symbols) and naming style |

Reuse these verbatim. Copy markup structures; do not paraphrase them.

### Step 4 — Impact analysis BEFORE editing

For every file, CSS class, CSS variable, and shared asset you intend to touch:

1. Grep the whole `docs/06_mockup/<variant>/` folder for its usages.
2. Classify blast radius:
   - Single screen (class used only there),
   - Multi-screen (used by several screens of this variant),
   - Cross-variant (`docs/06_mockup/shared/**` or files copied into other
     variant folders — affects ALL variants using them).
3. State the expected consequences on BOTH desktop AND mobile before editing:
   "changing `.x` affects screens A, B, C; on mobile the rule Y in media query Z
   also applies."
4. If blast radius > your task scope, scope the change (new modifier class or
   inline-scoped override) instead of mutating the shared definition — unless
   the user explicitly asked for a global change.

---

## 2. Implementation Rules

### Tokens only & Dynamic Theme Reactivity (Zero Hardcoded Colors)

- **Strict Prohibition of Hardcoded Color Literals**: Hardcoded hex (`#...`), `rgb(...)`, `rgba(...)`, or `hsl(...)` color literals in CSS rules, inline `style="..."` attributes, or JavaScript template literals are **strictly forbidden**.
- **Mandatory CSS Design Tokens**: All colors, background gradients, text ink, borders, box-shadow glows, and status indicators MUST resolve to the variant's CSS custom properties / `DESIGN.md` tokens (e.g. `var(--primary)`, `var(--grad-primary)`, `var(--on-primary)`, `var(--surface)`, `var(--outline)`, `var(--primary-glow)`).
- **Theme & Accent Color Reactivity**: Every component (floating menus, buttons, cards, badges, tabs, sheets) MUST automatically and dynamically respond when switching between Light Mode, Dark Mode (`[data-theme='dark']`), and UI Lab Accent Color Presets (e.g. `[data-accent='fresh | terracotta | basil | honey | ocean | berry | cocoa']`).
- Never introduce foreign palettes (Tailwind defaults, random blues/greens) into a variant. Map any needed new color to the nearest existing token; if no reasonable mapping exists, ask the user.

### Component Reuse & Modularization Protocol

- **Reuse First**: Before building any UI piece, inspect `js/components.js`, `js/ui.js`, `js/icons.js`, and sibling screens. Reuse existing CSS classes and component functions (`Components.*`, `icon(...)`, `openSheet(...)`, `toast(...)`) verbatim before writing anything new.
- **Component Separation & Modularity**: If a mock variant has monolithic or un-separated component code embedded directly inside screen files, extract and modularize them into structured reusable functions under `js/components.js` or `js/components/` rather than duplicating HTML/CSS across screens.
- **Creating New CSS Classes**: Requires proof: show the grep result demonstrating no equivalent exists, and justify why composition of existing classes fails.

### Duplicate prevention

Before building any component pattern, search the entire variant folder for an existing implementation of the same thing (same purpose OR similar markup). If found, extend/reuse it. Two visually identical components implemented twice inside one variant is a defect.

### Strict Fidelity to DESIGN.md & Consistent Building Blocks

- The variant's `DESIGN.md` is the binding contract. All typography scales, corner radii (`var(--r-...)`), elevation shadows, and spacing rhythms MUST match `DESIGN.md` 100%.
- **Buttons:** only the button classes/patterns already used by the variant. No inline-styled one-off buttons.
- **Icons:** only the icon family the variant already loads (e.g., vector SVGs / Lucide via `icon(...)`). Match its naming conventions exactly. Raw emoji-as-icon is strictly forbidden.
- **Forms, tables, modals:** copy structure and classes from sibling screens.
- **Layout placement:** page header, KPI row, filter bar, main content, and pagination must appear in the same order with the same spacing pattern as the variant's established screens.

### Boy Scout Rule (Clean As You Touch)

Whenever opening, inspecting, refactoring, or modifying ANY file under `docs/06_mockup/`:
1. **Detect & Fix Inconsistencies**: If any legacy hardcoded colors, broken theme token bindings, or ad-hoc non-token styles are noticed anywhere in the touched file or component, **fix them immediately** by migrating them to the variant's design tokens.
2. **Standard Enforcement for New Code**: All newly written, edited, or refactored code must strictly follow the token-only, component-reuse, and responsive guidelines without exception.

### Screen Jump & DevTools Multi-Path Synchronization Protocol

Whenever modifying, styling, debugging, or enhancing DevTools components (notably `screen-jump.js`, floating menu styles, variant theme definitions, search/filter controls, or `screen-catalog.js`):

1. **Single Source of Truth (SSOT)**:
   - Primary `screen-jump.js`: `docs/06_mockup/shared/devtools/screen-jump.js`
   - Primary `screen-catalog.js`: `docs/06_mockup/shared/devtools/screen-catalog.js`
2. **Mandatory Synchronization Across All Replicas**:
   Any change made to `screen-jump.js` or `screen-catalog.js` (or any of their variant replicas) **MUST** immediately be mirrored to all replica paths across the repository without exception:

| Canonical Source (SSOT) | Target Mirror Replicas |
|---|---|
| `docs/06_mockup/shared/devtools/screen-jump.js` | • `docs/06_mockup/admin-saasadmin/shared/devtools/screen-jump.js`<br>• `docs/06_mockup/shop/shared/devtools/screen-jump.js` |
| `docs/06_mockup/shared/devtools/screen-catalog.js` | • `docs/06_mockup/shop/shared/devtools/screen-catalog.js` |

3. **Sync Automation Helper**:
   - Run `node docs/06_mockup/scripts/sync-devtools.js` to automatically mirror canonical files to all replicas.
   - Run `node docs/06_mockup/scripts/sync-devtools.js --check` to verify that all replicas are 100% in sync.
4. **Zero Drift Rule**:
   Never leave replica copies in an outdated state. If editing inside a variant subfolder (e.g. `admin-saasadmin`), update the canonical source and sync all replicas.

### System states

Use the loading / empty / error / success patterns ALREADY established by the variant's sibling screens (skeletons, empty-state blocks, toast/badge styles). If the variant has none yet, build ONE canonical pattern per state, place it in the variant's shared stylesheet, and reuse it everywhere afterwards.

---

## 3. UI/UX Quality Standards (Mandatory Mindset)

**Default quality bar:** Every mockup task must produce output that is polished,
elegant, visually balanced, and production-grade. Treat every component as if a
senior UI/UX designer is reviewing it. This standard applies silently and
automatically — no prompt keywords required.

### 3.1 Content-Aware Sizing

- **Content drives container** — never the reverse. No fixed-height wrappers
  with scattered content inside. Let natural content flow + defined padding
  determine dimensions.
- Images/media must be proportional to the card they occupy (no tiny thumbnails
  in oversized containers, no stretched images).
- If a component looks empty at realistic data, the markup is wrong.

### 3.2 Card Layout Quality

Every card (restaurant, booking, confirmation, pass) must satisfy:

1. **Balanced content distribution** — no clumping in center; fill the card
   edge-to-edge with proper padding.
2. **Clear visual hierarchy** — title > key details > metadata > actions,
   enforced via font size/weight jumps from `DESIGN.md` typography scale.
3. **Action visibility** — primary actions use primary button styling; never a
   bare text link for the main card action.
4. **Efficient space** — zero excessive whitespace; compact but breathable.
5. **Consistent anatomy** — all cards of the same type across all screens use
   identical markup structure, classes, and spacing.

### 3.3 Modal / Dialog / Sheet Quality

1. **Sizing**: max-width 480px desktop, full-width on mobile (with gutters).
   Height determined by content, never fixed.
2. **Content hierarchy**: title (headline-sm+) → description (body-md) →
   actions, with clear spacing between each zone.
3. **Button layout**: actions right-aligned or full-width on mobile; destructive
   action uses error token; cancel is always secondary/ghost.
4. **Backdrop**: proper scrim overlay using `var(--scrim)` token.
5. **Animation**: sheet slides up with `--ease-spring`; dialog fades + scales.
6. **Border-radius**: use `var(--r-sheet)` / `var(--r-lg)` per `DESIGN.md`.

### 3.4 Defensive Layout

- **Overflow**: text that can vary in length gets `overflow: hidden;
  text-overflow: ellipsis` or `-webkit-line-clamp`. No clipping without
  truncation.
- **Flex/Grid resilience**: use `min-width: 0` on flex children; avoid
  `width: 100%` inside flex rows without `flex-shrink`.
- **No fixed pixel heights** on containers with dynamic content — use
  `min-height` or let content flow.
- **Safe defaults**: assume names can be long, descriptions can be missing,
  images can fail to load. Build for the worst case first.

### 3.5 Cross-Screen Consistency Enforcement

When modifying any screen, **grep the variant folder** and verify that every
component type you touched (cards, buttons, inputs, containers, chips) uses the
**same border-radius, shadow, spacing, and typography tokens** as the identical
component on all sibling screens. If a sibling uses `var(--r-md)` on cards but
your new screen uses a raw `8px`, your code is wrong.

### 3.6 Spacing & Alignment

- All spacing must use `DESIGN.md` scale values (4/8/12/16/20/24/32/40/48/64px).
  No arbitrary pixel values.
- Vertical rhythm between sections: consistent across screens (check siblings).
- Horizontal alignment: left edges of content blocks must align within a page.
- Padding inside components: consistent top/right/bottom/left — check against
  the same component on sibling screens.

### 3.7 Dropdown, Custom Select & Popover Quality Standards

1. **Strict Prohibition of Raw Browser Default `<select>` Menus**:
   - Do **NOT** use unstyled native OS `<select>` dropdowns for primary UI flows, navigation popovers, filter menus, sorting bars, or modal forms.
   - Raw `<select>` elements render inconsistently across operating systems and fail dark mode / accent theme token reactivity.
2. **Unified Custom Dropdown Anatomy**:
   - **Trigger Button**: Includes clear label, contextual vector SVG icon (`icon(...)`), chevron indicator with rotation on open (`transform: rotate(180deg)`), and active focus/hover states using design tokens (`var(--surface)`, `var(--outline)`, `var(--primary)`).
   - **Floating Menu Popover**: Styled card with elevation shadow (`var(--e3)`), corner radius (`var(--r-xl)` or `var(--r-lg)`), spring transition, and max-height scroll protection (`max-height: 280px; overflow-y: auto`).
   - **Option Items**: Rich item layout supporting label, subtext/badge, hover highlight (`var(--primary-subtle)`), and visual checkmark indicator for the currently selected item.
3. **Accessibility & Dismissal Protocol**:
   - Outside clicks and Escape key presses MUST cleanly close all open custom dropdowns and restore `aria-expanded="false"`.
   - Hidden `<input type="hidden">` or programmatic synchronization MUST be maintained so form submissions and event listeners receive accurate values.
4. **Theme & Accent Reactivity**:
   - Dropdown triggers, floating popovers, option active states, and checkmark icons MUST dynamically respond to Light Mode, Dark Mode (`[data-theme='dark']`), and UI Lab Accent Color Presets (`[data-accent]`).
5. **Modal & Container Dropdown Clipping Prevention Protocol**:
   - Modal dialogs, card shells, and form panels housing custom dropdowns or popovers MUST use `overflow: visible; position: relative;` rather than `overflow: hidden;` on their outer shells.
   - Discrete border-radii MUST be applied directly to child header (`border-radius: var(--r-2xl) var(--r-2xl) 0 0;`) and footer (`border-radius: 0 0 var(--r-2xl) var(--r-2xl);`) elements to ensure rounded corners remain intact while allowing floating dropdown menus (`z-index: 1500;`) to float freely over borders without clipping.

---

## 4. Intra-Variant Consistency Self-Audit (before declaring done)

Diff the changed screen against 2–3 sibling screens of the same variant,
component by component:

```
[ ] KPI card markup/classes/tokens identical to sibling screens
[ ] Buttons: same classes, sizes, states as siblings
[ ] Icons: same family, consistent naming, consistent sizing
[ ] Page header/layout placement matches variant skeleton
[ ] Table/modal/form patterns match siblings
[ ] All colors/radii/shadows resolve to variant tokens (no foreign literals)
[ ] Status/success colors within the variant palette
[ ] Loading/empty/error states follow variant convention
[ ] Screen Jump / DevTools synchronized across all mirror paths (if touched)
[ ] Visual balance: no excessive empty space, content well-distributed
[ ] Card proportions: media size appropriate, actions visible and styled
[ ] Modal/dialog: proper sizing, button layout, backdrop, radius
[ ] Typography hierarchy: ≥2 scale steps between adjacent levels
[ ] Spacing: all gaps use DESIGN.md scale values, consistent with siblings
[ ] Overflow: long text truncated gracefully, no clipping without ellipsis
```

Any mismatch: fix the code so it matches the siblings (not vice versa), then
re-audit. Post the completed checklist as a table in chat.

---

## 5. PWA & Multi-Device Responsiveness (Strict & Concise)

1. **All-Device Support (375 / 768 / 1440)**:
   Every change or addition in ANY mock variant MUST work seamlessly across **Mobile (375px)**, **Tablet (768px)**, and **Desktop (1440px)** without layout breakage.
2. **Proactive Cross-Device Confirmation (Desktop / Tablet Adaptations)**:
   If the user requests changes for a single device/viewport (e.g., "fix this for mobile"), you **MUST NOT** silently ignore or break Desktop/Tablet. Proactively ask the user via `ask_question` with recommended options on how Desktop/Tablet should adapt before finalizing.
3. **PWA Standalone & Touch Readiness**:
   - Always accommodate Safe Area insets (`env(safe-area-inset-top/bottom/left/right)`) for mobile notches and bottom home bars.
   - Touch targets must be minimum 44×44px with comfortable tap spacing.
   - Sticky/floating action bars must never obscure underlying content.
4. **Zero Horizontal Overflow & Isolation**:
   - No unintended horizontal scrolling (`overflow-x: hidden` safety where needed).
   - Desktop fixes must never alter mobile behavior (and vice versa); scope breakpoint adjustments cleanly in media queries. Never delete existing responsive rules.

---

## 6. Regression Verification & Instant Cache Refresh

1. **Automatic Bundle Rebuild (`build-bundle.mjs`)**:
   - If the variant contains `build-bundle.mjs` (e.g., `reserve`, `user-redesign`), you **MUST** run `node build-bundle.mjs` immediately after modifying any JS files.
   - `index.html` loads `js/app.bundle.js` for standalone `file:///` support; failing to run `build-bundle.mjs` will cause the browser to serve stale code on refresh.
2. **Instant Cache Busting**:
   - In `index.html` and `sw.js`, bump the version query string (e.g., `?v=20` → `?v=21`, `reserve-v20` → `reserve-v21`) so that refreshing `index.html` in the browser immediately loads fresh assets without ServiceWorker or HTTP cache lag.
3. **Serve & Reload**:
   - Serve locally: `node docs/06_mockup/serve.js` (or open `file:///.../index.html` directly).
   - Reload every screen listed in the impact analysis, not just the edited one.
4. **Confirm**: Zero console errors/warnings, navigation works, i18n toggle intact, theme switching intact, no layout shift between viewports.

---

## 7. Completion Report (chat, fixed template)

Post this after EVERY UI task:

```text
Variant:            <name>
Files changed:      <list>
Patterns reused:    <pattern -> source screen/class>
CSS created:        <new classes + why no existing class qualified>
Impact checked:     <screens/files from Step 4>
Viewports verified: 375 / 768 / 1440
Consistency audit:  <checklist table from Section 4>
UI/UX quality:      <Section 3 standards verified>
Risks/notes:        <anything deferred or flagged>
```

No separate audit file is written to disk; the chat report is the record.

---

## 8. Definition of Done

A UI task is DONE only when ALL boxes are ticked:

- [ ] Design contract loaded (or generated + confirmed) for the variant
- [ ] Sibling-screen patterns inventoried and replicated
- [ ] Impact analysis performed and honored
- [ ] Token-only styling (no foreign hardcoded values)
- [ ] Reuse-first satisfied (new CSS justified by grep evidence)
- [ ] No duplicated components introduced
- [ ] UI/UX quality standards met (§3: sizing, cards, modals, layout, spacing)
- [ ] Intra-variant consistency audit passed (§4 checklist)
- [ ] DevTools / Screen Jump synchronized across all replica paths (if touched, verified with sync-devtools.js)
- [ ] PWA & Multi-device verified across 375 / 768 / 1440 (with zero desktop/mobile regression)
- [ ] Regression verification passed (related screens reload clean)
- [ ] Completion report posted

If any box cannot be ticked, the task is incomplete: say so explicitly and
state what is missing.

