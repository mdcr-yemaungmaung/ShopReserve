---
name: shop-reserve
description: EzBookNow ShopReserve development rules - architectural standards, UI/UX quality, and design system compliance for vanilla JS PWA. Use when working on ShopReserve code, creating screens, modifying UI, or implementing features.
---

# ShopReserve Development Skill

## 1. Core Principles

### Golden Rule
**One project = one design language.**

1. ShopReserve uses AGENTS.md as the binding architectural contract
2. All screens must be visually indistinguishable in style from sibling screens
3. AGENTS.md and existing screens are the single source of truth
4. They override general habits, preferences, and patterns you "usually" use

### Design Contract Enforcement
- **Primary**: `AGENTS.md` - Architectural standards, i18n, design system, responsive rules
- **Secondary**: `shop/DESIGN.md` - Specific design tokens (colors, typography, spacing, radii)
- If planning changes don't match existing screens, change YOUR plan, not their style

---

## 2. Mandatory Workflow

Execute Steps 1–3 BEFORE writing any code. Summarize each step's findings in your plan.

### Step 1 — Load the design contract
- Read `AGENTS.md` fully. Extract binding tokens: architectural rules, i18n requirements, design system classes, responsive layout rules, component hierarchy
- Read `shop/DESIGN.md` for specific design tokens: colors, typography scale, corner radii, spacing rhythm
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

## 3. Architectural Standards

### Vanilla JS Architecture
- **No Frontend Frameworks**: Strictly prohibited from introducing React, Vue, Angular, Svelte, or similar build-heavy frameworks
- **ES6 Modules**: Application built entirely on native ES6 modules and vanilla JavaScript
- **Screen-Object Pattern**: Every screen module exports a singleton object with standard lifecycle hooks:
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

### i18n Enforcement
- **Supported Locales**: English (`en`), Myanmar (`mm`), and Japanese (`ja`)
- **Zero Hardcoded Display Text**: NEVER output user-facing strings directly inside JS template literals
- ALL labels, placeholders, tooltips, validation messages, toasts, and modal contents MUST be fetched via `I18n.t('key_name')`
- **Mandatory 3-Language Keys**: When adding any new feature, add corresponding translation keys for all three languages inside `/shared/js/i18n.js`

### State Management
- **Centralized Store Pattern**: State mutations must flow through centralized stores or event emitters
- **Network & Offline Resilience**: Support offline tolerance and network simulation gracefully
- **Decoupled Business Logic**: Keep calculations in pure utility functions rather than buried in DOM click listeners

---

## 4. Design System

### CSS Tokens Only (Zero Hardcoded Colors)
- **Strict Prohibition**: Hardcoded hex (`#...`), `rgb(...)`, `rgba(...)`, or `hsl(...`) color literals in CSS rules, inline `style="..."` attributes, or JavaScript template literals are **strictly forbidden**
- **Single Source of Truth**: `shop/DESIGN.md` defines all color tokens
- **Mandatory CSS Design Tokens**: All colors MUST resolve to CSS custom properties from `shop/css/design-system.css`:
  - **Primary**: `var(--color-primary)` (#0F4C5C)
  - **Secondary**: `var(--color-secondary)` (#D8902F)
  - **Tertiary**: `var(--color-tertiary)` (#623013)
  - **Error**: `var(--color-error)` (#BA1A1A)
  - **Background**: `var(--color-bg)` (#F8FAFC)
  - **Surface**: `var(--color-surface)` (#FFFFFF)
  - **Outline**: `var(--color-outline)` (#6B7280)
  - **Outline Variant**: `var(--color-outline-variant)` (#D1D5DB)

### Component Reuse Protocol
- **Reuse First**: Before building any UI piece, inspect `shop/js/screens/`, `shared/js/components.js`, and sibling screens
- Reuse existing CSS classes and component functions verbatim before writing anything new
- **Creating New CSS Classes**: Requires proof: show grep result demonstrating no equivalent exists, and justify why composition of existing classes fails

### Duplicate Prevention
Before building any component pattern, search the entire `shop/` folder for an existing implementation. If found, extend/reuse it. Two visually identical components implemented twice is a defect.

### Responsive Layout Rules

#### Mobile (< 768px)
- **Borderless Flowing Sections**: No outer card boxes, heavy card outlines, or drop shadows
- **Subtle Hairline Dividers**: `1px solid var(--color-outline-variant)` with generous vertical padding (20px–24px)
- **Full-Width Tap Targets**: Form inputs, segmented pickers, choice chips expand across viewport (min 44px height)
- **NO Floating / Sticky Overlay Buttons**: Primary CTA buttons stay in-flow at bottom of section

#### Desktop & Tablet (≥ 768px)
- **Segmented Cards**: `.stitch-card` with subtle borders, gentle border-radii (12px–16px), soft ambient shadows
- **Sticky Summaries**: Pin desktop sticky summaries or action sidebars for rapid glanceability

---

## 5. UI/UX Quality Standards

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

### Modal / Dialog / Sheet Quality
1. **Sizing**: max-width 480px desktop, full-width on mobile (with gutters)
2. **Content hierarchy**: title → description → actions, with clear spacing
3. **Button layout**: actions right-aligned or full-width on mobile
4. **Backdrop**: `background: rgba(15, 23, 42, 0.45); backdrop-filter: blur(4px);`
5. **Triple-Exit Safety**: Close via ✕ button, backdrop click, or Escape key
6. **Mobile Adaptive Sheets**: Bottom-sheet drawers with top rounded corners (`border-radius: 16px 16px 0 0`)

### Defensive Layout
- **Overflow**: text with `overflow: hidden; text-overflow: ellipsis` or `-webkit-line-clamp`
- **Flex/Grid resilience**: use `min-width: 0` on flex children
- **No fixed pixel heights** on containers with dynamic content
- **Safe defaults**: assume names can be long, descriptions can be missing, images can fail to load

### Spacing & Alignment
Reference `shop/DESIGN.md` for the complete spacing scale. Key rules:
- Base scale: 4/8/12/16/24/32/48/64px
- Responsive gutters: Mobile 16px, Tablet 24px, Desktop 32px
- Section gaps: Mobile 20px, Tablet 28px, Desktop 36px
- **Outer ≥ Inner Padding**: Parent padding must always equal or exceed internal child gap
- Vertical rhythm between sections: consistent across screens
- Horizontal alignment: left edges of content blocks must align

---

## 6. Component Standards

### Button Hierarchy
- **Primary Action (`.stitch-btn-primary`)**: Deep Teal background (`var(--color-primary)`), white text. **One primary action per viewport/screen**
- **Secondary Action (`.stitch-btn-secondary`)**: Neutral background with hairline border (`var(--color-outline-variant)`), dark text
- **Destructive Action (`.stitch-btn-danger`)**: Soft crimson surface with bold crimson label (`#DC2626`). Always invoke confirmation dialog
- **Padding Ratio Math**: Horizontal padding = 2× vertical padding (e.g., `padding: 10px 20px`), min touch target 44px
- Reference `shop/DESIGN.md` for responsive padding values (Mobile: 12px 24px, Tablet: 10px 20px, Desktop: 9px 18px)

### Status Badges & Semantic Colors
Use standardized `.stitch-badge--{status}` class family:
- **Confirmed / Active**: Forest Green (`color: #16A34A; background: #DCFCE7`)
- **Pending / In-Review**: Amber/Ochre (`color: #D97706; background: #FEF3C7`)
- **Cancelled / Rejected**: Rose Red (`color: #DC2626; background: #FEE2E2`)
- **Seated / Arrived**: Deep Teal (`color: #0F4C5C; background: #E0F2F1`)
- **Completed / Finished**: Slate Gray (`color: #475569; background: #F1F5F9`)

### Iconography
- **System Standard**: Google **Material Symbols Outlined** (`<span class="material-symbols-outlined">icon_name</span>`)
- **Icon Sizing Grid**:
  - Inline / Badges / Chips: `18px`
  - Buttons / Inputs / Table cells: `20px`
  - Card Headers / Nav Items / Hero icons: `24px`
- **Emoji Boundaries**: Reserve emojis strictly for national flag language indicators (🇲🇲, 🇯🇵, 🇬🇧)

### Empty States & Loading Patterns
- **Zero Blank Voids**: Empty lists must never render a raw blank area
- **Standard Empty Component**: `.stitch-empty-state` with muted icon, localized heading, explanatory subtext, optional CTA button

---

## 7. Typography & Myanmar Safety

### Font Families (from DESIGN.md)
- **Headlines**: Outfit (primary)
- **Body Text**: Inter (primary)
- **Myanmar Text**: Padauk, Noto Sans Myanmar, Pyidaungsu (required)
- **Monospace**: JetBrains Mono, Fira Code (for code/numbers)

### Diacritic Preservation
- Myanmar unicode scripts require generous vertical metrics
- Set line-height to minimum `1.55` for body text, form labels, and table cells
- Never use font sizes below `12px` in any script

### Single-Line Badges & Buttons
- Text inside buttons, chips, tabs, pills, status badges must sit on single line (`white-space: nowrap`)
- Never wrap, hyphenate, or truncate awkwardly across languages
- Sizing must adapt dynamically to label lengths across EN, MM, JA

### Cross-Device Typography Matrix
Reference `shop/DESIGN.md` for the complete responsive typography matrix. Key rules:
- **Page Title (H1)**: Mobile 22px, Tablet 26px, Desktop 30px
- **Body Text**: Mobile 15px, Tablet/Desktop 16px, line-height **1.55** minimum
- **Caption**: 13px across all devices
- **Status Badges**: 12px, line-height 1.20

---

## 8. Consistency Enforcement

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

## 9. PWA & Responsiveness

### Multi-Device Support
Every change MUST work seamlessly across **Mobile (375px)**, **Tablet (768px)**, and **Desktop (1440px)** without layout breakage.

### PWA Safe Area Compliance
- Headers must include `padding-top: max(0px, env(safe-area-inset-top, 0px))`
- Content never clipped by native device notches, dynamic islands, or mobile OS status bars

### Touch Readiness
- Touch targets minimum 44×44px with comfortable tap spacing
- Sticky/floating action bars must never obscure underlying content

### Zero Horizontal Overflow
- No unintended horizontal scrolling (`overflow-x: hidden` safety where needed)
- Desktop fixes must never alter mobile behavior (and vice versa)
- Scope breakpoint adjustments cleanly in media queries. Never delete existing responsive rules

### Active Branch Name Display
- Show current branch as clean, static status badge
- Truncation constraints:
  - Mobile (< 768px): `max-width: 140px`
  - Desktop (> 1024px): `max-width: 220px`
  - CSS: `white-space: nowrap; overflow: hidden; text-overflow: ellipsis; min-width: 0;`
- Always provide full name in `title="..."` attribute for desktop hover tooltips

---

## 10. Completion Protocol

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
Consistency audit:  <checklist table from Section 8>
UI/UX quality:      <Section 5 standards verified>
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
