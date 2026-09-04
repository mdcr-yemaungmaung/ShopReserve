# ShopReserve Development Rules (Google AI Studio)

These instructions establish strict architectural, responsive, styling, and localization standards for all AI assistants and contributors working on the **ShopReserve** codebase.

---

## 1. Core Principles

### Golden Rule
**One project = one design language.**

1. ShopReserve uses **AGENTS.md** as the binding architectural contract
2. **shop/DESIGN.md** is the single source of truth for visual design tokens
3. All screens must be visually indistinguishable in style from sibling screens
4. Existing screens are the source of truth—they override general habits and patterns

### Design Contract Hierarchy
- **AGENTS.md**: Architecture, workflows, enforcement rules, component standards
- **DESIGN.md**: Color tokens, typography, spacing, visual specifications
- **Existing Screens**: Implementation patterns to replicate

---

## 2. Architecture

### Vanilla JavaScript
- **No Frontend Frameworks**: Strictly prohibited from introducing React, Vue, Angular, Svelte, or similar build-heavy frameworks
- **ES6 Modules**: Application built entirely on native ES6 modules and vanilla JavaScript
- **No Build Tools**: No webpack, Vite, or transpilation—direct browser ES module loading

### Screen-Object Pattern
Every screen module in `/shop/js/screens/` and `/user/js/` must export a singleton object with standard lifecycle hooks:
- `render()`: Returns an HTML template string
- `afterRender()`: DOM querying, event listener attachment, component hydration, data fetching
- `bindEvents()` / `destroy()`: Dedicated cleanup and listener management

### Namespaced Core Utilities
Always integrate through established singletons:
- `App.renderAdminPage(portal, title, content)` for rendering shop portal screens
- `Router`: Centralized hash-based routing
- `I18n`: Multi-language translation engine
- `Store` / `StoreMock`: State management and storage adapter
- `Components`: Shared reusable UI generators (headers, modals, tables)

### State Management
- **Centralized Store Pattern**: State mutations must flow through centralized stores or event emitters
- **Network & Offline Resilience**: Support offline tolerance and network simulation gracefully
- **Decoupled Business Logic**: Keep calculations in pure utility functions rather than buried in DOM click listeners

---

## 3. Internationalization (i18n)

### Supported Locales
- English (`en`)
- Myanmar (`mm`)
- Japanese (`ja`)

### Zero Hardcoded Display Text
- NEVER output user-facing strings directly inside JS template literals
- ALL labels, placeholders, tooltips, validation messages, toasts, and modal contents MUST be fetched via `I18n.t('key_name')`
- When adding any new feature, add corresponding translation keys for all three languages inside `/shared/js/i18n.js`

### Font Stack Integrity
- Always respect Myanmar unicode font rendering: `Padauk`, `Noto Sans Myanmar`, `Pyidaungsu`
- Ensure font line-heights accommodate non-Latin scripts without vertical clipping
- Reference `DESIGN.md` for font family specifications

---

## 4. Design System Reference

### Color Tokens
Reference `shop/DESIGN.md` for the complete color system. Key tokens:
- **Primary**: `var(--color-primary)` (#0F4C5C)
- **Secondary**: `var(--color-secondary)` (#D8902F)
- **Tertiary**: `var(--color-tertiary)` (#623013)
- **Error**: `var(--color-error)` (#BA1A1A)
- **Background**: `var(--color-bg)` (#F8FAFC)
- **Surface**: `var(--color-surface)` (#FFFFFF)
- **Outline**: `var(--color-outline)` (#6B7280)
- **Outline Variant**: `var(--color-outline-variant)` (#D1D5DB)

### Typography Requirements
- Reference `DESIGN.md` for font families: Outfit (headlines), Inter (body), Padauk/Noto Sans Myanmar (Myanmar)
- **Myanmar Safety**: Never set body text line-height below `1.55`
- Never use font sizes below `12px` in any script
- Single-line badges and buttons: `white-space: nowrap`

### Spacing Rules
- Reference `DESIGN.md` for the spacing scale (4/8/12/16/24/32/48/64px)
- **Outer ≥ Inner Padding**: Parent padding must always equal or exceed internal child gap
- Use responsive gutter values: Mobile 16px, Tablet 24px, Desktop 32px

---

## 5. Component Standards

### Button Hierarchy
- **Primary Action (`.stitch-btn-primary`)**: Deep Teal background (`var(--color-primary)`), white text. **One primary action per viewport/screen**
- **Secondary Action (`.stitch-btn-secondary`)**: Neutral background with hairline border (`var(--color-outline-variant)`), dark text
- **Destructive Action (`.stitch-btn-danger`)**: Soft crimson surface with bold crimson label (`#DC2626`). Always invoke confirmation dialog
- **Padding Ratio Math**: Horizontal padding = 2× vertical padding (e.g., `padding: 10px 20px`), minimum touch target 44px

### Status Badges
Use standardized `.stitch-badge--{status}` class family:
- **Confirmed / Active**: Forest Green (`color: #16A34A; background: #DCFCE7; border: 1px solid #BBF7D0`)
- **Pending / In-Review**: Amber/Ochre (`color: #D97706; background: #FEF3C7; border: 1px solid #FDE68A`)
- **Cancelled / Rejected**: Rose Red (`color: #DC2626; background: #FEE2E2; border: 1px solid #FECACA`)
- **Seated / Arrived**: Deep Teal (`color: #0F4C5C; background: #E0F2F1; border: 1px solid #B2DFDB`)
- **Completed / Finished**: Slate Gray (`color: #475569; background: #F1F5F9; border: 1px solid #E2E8F0`)

### Iconography
- **System Standard**: Google **Material Symbols Outlined** (`<span class="material-symbols-outlined">icon_name</span>`)
- **Icon Sizing Grid**:
  - Inline / Badges / Chips: `18px`
  - Buttons / Inputs / Table cells: `20px`
  - Card Headers / Nav Items / Hero icons: `24px`
- **Emoji Boundaries**: Reserve emojis strictly for national flag language indicators (🇲🇲, 🇯🇵, 🇬🇧)

### Cards
- **Desktop & Tablet (≥ 768px)**: Segmented Cards (`.stitch-card`) with subtle borders, border-radii (12px–16px), soft shadows
- **Mobile (< 768px)**: Borderless flowing sections with hairline dividers (`1px solid var(--color-outline-variant)`)

### Modals & Dialogs
- **Backdrop**: `background: rgba(15, 23, 42, 0.45); backdrop-filter: blur(4px);`
- **Triple-Exit Safety**: Close via ✕ button, backdrop click, or Escape key
- **Mobile Adaptive**: Bottom-sheet drawers with top rounded corners (`border-radius: 16px 16px 0 0`)

### Empty States
- **Zero Blank Voids**: Empty lists must never render a raw blank area
- **Standard Component**: `.stitch-empty-state` with muted icon, localized heading, explanatory subtext, optional CTA button

---

## 6. Responsive Rules

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px – 1023px
- **Desktop**: ≥ 1024px

### Mobile (< 768px)
- **Borderless Flowing Sections**: No outer card boxes, heavy card outlines, or drop shadows
- **Subtle Hairline Dividers**: `1px solid var(--color-outline-variant)` with vertical padding (20px–24px)
- **Full-Width Tap Targets**: Form inputs, segmented pickers, choice chips expand across viewport (min 44px height)
- **NO Floating / Sticky Overlay Buttons**: Primary CTA buttons stay in-flow at bottom of section

### Desktop & Tablet (≥ 768px)
- **Segmented Cards**: `.stitch-card` with subtle borders, gentle border-radii (12px–16px), soft ambient shadows
- **Sticky Summaries**: Pin desktop sticky summaries or action sidebars for rapid glanceability
- **Dense Tables**: POS, Table View, Ledger tables remain compact (38px–40px row height)

### Typography Matrix
Reference `DESIGN.md` for the complete responsive typography matrix. Key rules:
- **Page Title (H1)**: Mobile 22px, Tablet 26px, Desktop 30px
- **Body Text**: Mobile 15px, Tablet/Desktop 16px, line-height **1.55** minimum
- **Caption**: 13px across all devices
- **Status Badges**: 12px, line-height 1.20

### PWA Safe Area Compliance
- Headers must include `padding-top: max(0px, env(safe-area-inset-top, 0px))`
- Content never clipped by native device notches, dynamic islands, or mobile OS status bars
- Touch targets minimum 44×44px

---

## 7. Mandatory Workflow

Execute Steps 1–3 BEFORE writing any code. Summarize each step's findings in your plan.

### Step 1 — Load the design contract
- Read `AGENTS.md` fully. Extract: architectural rules, i18n requirements, component standards
- Read `shop/DESIGN.md` for: color tokens, typography scale, spacing rhythm, border radius
- These values are constraints, not suggestions

### Step 2 — Pattern inventory (replicate, don't reinvent)
Read sibling screens that already contain the component types you are about to touch. List exact patterns to replicate:

| Component type | What to extract from siblings |
|---|---|
| KPI / stat cards | exact wrapper class + inner markup order + modifier classes |
| Buttons | exact class names + sizes + icon placement |
| Status badges / chips | exact class names + state-to-color mapping |
| Tables / lists | container class, header/cell markup, empty-row handling |
| Modals / drawers | backdrop + shell + header/body/footer structure |
| Forms | label/input/select classes, required marker, helper text |
| Page skeleton | header → filter bar → content → pagination ORDER and spacing |
| Icons | Material Symbols Outlined naming style |

Reuse these verbatim. Copy markup structures; do not paraphrase them.

### Step 3 — Impact analysis BEFORE editing
For every file, CSS class, CSS variable, and shared asset you intend to touch:
1. Grep the whole `shop/` folder for its usages
2. Classify blast radius:
   - Single screen (class used only there)
   - Multi-screen (used by several screens)
   - Cross-variant (`shared/` files — affects ALL variants)
3. State expected consequences on BOTH desktop AND mobile
4. If blast radius > task scope, scope the change (new modifier class) instead of mutating shared definition

---

## 8. UI/UX Quality Standards

### Content-Aware Sizing
- **Content drives container** — never the reverse. No fixed-height wrappers
- Images/media must be proportional to the card they occupy
- If a component looks empty at realistic data, the markup is wrong

### Card Layout Quality
Every card must satisfy:
1. **Balanced content distribution** — fill the card edge-to-edge with proper padding
2. **Clear visual hierarchy** — title > key details > metadata > actions
3. **Action visibility** — primary actions use primary button styling
4. **Efficient space** — zero excessive whitespace; compact but breathable
5. **Consistent anatomy** — all cards of the same type use identical markup structure

### Modal / Dialog Quality
1. **Sizing**: max-width 480px desktop, full-width on mobile (with gutters)
2. **Content hierarchy**: title → description → actions, with clear spacing
3. **Button layout**: actions right-aligned or full-width on mobile
4. **Animation**: sheet slides up, dialog fades + scales

### Defensive Layout
- **Overflow**: text with `overflow: hidden; text-overflow: ellipsis` or `-webkit-line-clamp`
- **Flex/Grid resilience**: use `min-width: 0` on flex children
- **No fixed pixel heights** on containers with dynamic content
- **Safe defaults**: assume names can be long, descriptions can be missing, images can fail to load

### Spacing & Alignment
- All spacing must use design system scale values (4/8/12/16/20/24/32/40/48/64px)
- Vertical rhythm between sections: consistent across screens
- Horizontal alignment: left edges of content blocks must align

---

## 9. Consistency Enforcement

### Boy Scout Rule (Clean As You Touch)
Whenever opening, inspecting, refactoring, or modifying ANY file:
1. **Detect & Fix Inconsistencies**: If legacy hardcoded colors, broken theme token bindings, or ad-hoc styles are noticed, fix them immediately
2. **Standard Enforcement**: All newly written code must strictly follow token-only, component-reuse, and responsive guidelines

### Cross-Screen Consistency
When modifying any screen, **grep the shop folder** and verify that every component type you touched uses the **same border-radius, shadow, spacing, and typography tokens** as the identical component on all sibling screens.

### Intra-Variant Self-Audit Checklist
Before declaring done, verify:
- [ ] KPI card markup/classes/tokens identical to sibling screens
- [ ] Buttons: same classes, sizes, states as siblings
- [ ] Icons: same family, consistent naming, consistent sizing
- [ ] Page header/layout placement matches variant skeleton
- [ ] Table/modal/form patterns match siblings
- [ ] All colors/radii/shadows resolve to design tokens (no foreign literals)
- [ ] Status/success colors within the design palette
- [ ] Loading/empty/error states follow variant convention
- [ ] Visual balance: no excessive empty space, content well-distributed
- [ ] Card proportions: media size appropriate, actions visible and styled
- [ ] Modal/dialog: proper sizing, button layout, backdrop, radius
- [ ] Typography hierarchy: ≥2 scale steps between adjacent levels
- [ ] Spacing: all gaps use design system scale values, consistent with siblings
- [ ] Overflow: long text truncated gracefully, no clipping without ellipsis

---

## 10. PWA & Responsiveness

### Multi-Device Support
Every change MUST work seamlessly across **Mobile (375px)**, **Tablet (768px)**, and **Desktop (1440px)** without layout breakage.

### Touch Readiness
- Touch targets minimum 44×44px with comfortable tap spacing
- Sticky/floating action bars must never obscure underlying content

### Zero Horizontal Overflow
- No unintended horizontal scrolling (`overflow-x: hidden` safety where needed)
- Desktop fixes must never alter mobile behavior (and vice versa)
- Scope breakpoint adjustments cleanly in media queries. Never delete existing responsive rules

### Active Branch Name Display
- Show current branch as clean, static status badge (`.admin-header__branch-badge`)
- Truncation constraints:
  - Mobile (< 768px): `max-width: 140px`
  - Desktop (> 1024px): `max-width: 220px`
  - CSS: `white-space: nowrap; overflow: hidden; text-overflow: ellipsis; min-width: 0;`
- Always provide full name in `title="..."` attribute for desktop hover tooltips

---

## 11. Completion Protocol

### Regression Verification
1. Serve locally: `npm run dev` or open `file:///.../index.html`
2. Reload every screen listed in the impact analysis, not just the edited one
3. Confirm: Zero console errors/warnings, navigation works, i18n toggle intact, theme switching intact, no layout shift between viewports

### Completion Report
Post this after EVERY task:

```text
Files changed:      <list>
Patterns reused:    <pattern -> source screen/class>
CSS created:        <new classes + why no existing class qualified>
Impact checked:     <screens/files from Step 3>
Viewports verified: 375 / 768 / 1440
Consistency audit:  <checklist table from Section 9>
UI/UX quality:      <Section 8 standards verified>
Risks/notes:        <anything deferred or flagged>
```

### Definition of Done
A task is DONE only when ALL boxes are ticked:
- [ ] Design contract loaded (AGENTS.md + DESIGN.md)
- [ ] Sibling-screen patterns inventoried and replicated
- [ ] Impact analysis performed and honored
- [ ] Token-only styling (no foreign hardcoded values)
- [ ] Reuse-first satisfied (new CSS justified by grep evidence)
- [ ] No duplicated components introduced
- [ ] UI/UX quality standards met
- [ ] Consistency audit passed
- [ ] PWA & Multi-device verified across 375 / 768 / 1440
- [ ] Regression verification passed
- [ ] Completion report posted

If any box cannot be ticked, the task is incomplete: say so explicitly and state what is missing.

---

## 12. Directory Structure

```
├── /shop/
│   ├── css/
│   │   ├── design-system.css  # Core tokens, reset, typography, responsive card/divider rules
│   │   ├── components.css     # Reusable UI component classes (.stitch-*, buttons, inputs)
│   │   └── layouts.css        # Admin layout, sidebar, grid system
│   ├── js/
│   │   └── screens/           # Modular screen controllers (s01 through s22)
│   ├── DESIGN.md              # Visual design tokens (single source of truth)
│   └── index.html             # Shop portal entry point
├── /user/                     # Customer-facing booking portal
├── /shared/
│   ├── js/
│   │   ├── app.js             # Shell & admin page coordinator (App.renderAdminPage)
│   │   ├── router.js          # Hash routing & navigation
│   │   ├── i18n.js            # EN / MM / JA localization dictionary
│   │   └── store.js           # Core state store
├── AGENTS.md                  # This specification file (architecture + workflow)
└── metadata.json              # Platform capabilities & app manifest
```