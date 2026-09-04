# Project Custom Instructions: ShopReserve (EzBookNow)

These instructions establish strict architectural, responsive, styling, and localization standards for all AI assistants and contributors working on the **ShopReserve** codebase.

---

## 1. Modular Vanilla JavaScript Architecture

- **No Frontend Frameworks**: Strictly prohibited from introducing React, Vue, Angular, Svelte, or similar build-heavy frameworks. The application is built entirely on native ES6 modules and vanilla JavaScript.
- **Screen-Object Pattern**: Every screen module in `/shop/js/screens/` and `/user/js/` must export a singleton object with standard lifecycle hooks:
  - `render()`: Returns an HTML template string.
  - `afterRender()`: DOM querying, event listener attachment, component hydration, and data fetching.
  - `bindEvents()` / `destroy()`: Dedicated cleanup and listener management.
- **Namespaced Core Utilities**: Always integrate through established singletons:
  - `App.renderAdminPage(portal, title, content)` for rendering shop portal screens.
  - `Router`: Centralized hash-based routing.
  - `I18n`: Multi-language translation engine.
  - `Store` / `StoreMock`: State management and storage adapter.
  - `Components`: Shared reusable UI generators (headers, modals, tables).

---

## 2. Strict Multi-Language (i18n) Enforcement

- **Supported Locales**: English (`en`), Myanmar (`mm`), and Japanese (`ja`).
- **Zero Hardcoded Display Text**:
  - NEVER output user-facing strings directly inside JS template literals (e.g. avoid `<div>Save Changes</div>` or `alert('Booking submitted')`).
  - ALL labels, placeholders, tooltips, validation messages, toasts, and modal contents MUST be fetched via `I18n.t('key_name')`.
- **Mandatory 3-Language Keys**: When adding any new feature, field, or screen, add corresponding translation keys for all three languages (`en`, `mm`, `ja`) inside `/shared/js/i18n.js`.
- **Font Stack Integrity**: Always respect Myanmar unicode font rendering (`Padauk`, `Noto Sans Myanmar`, `Pyidaungsu`) and ensure font line-heights accommodate non-Latin scripts without vertical clipping.

---

## 3. Multilingual Typography & Myanmar Safety

- **Diacritic Preservation**: Myanmar unicode scripts require generous vertical metrics. Set line-height to a minimum of `1.55` for body text, form labels, and table cells to prevent stacking marks and tone marks from clipping.
- **Single-Line Badges & Buttons**: Text inside buttons, chips, tabs, pills, and status badges must sit on a single line (`white-space: nowrap;`). They must never wrap, hyphenate, or truncate awkwardly across languages. Sizing must adapt dynamically to label lengths across English, Myanmar, and Japanese.

---

## 4. Responsive Layout & "Anti-Card Fatigue" Rule

- **Desktop & Tablet (Screen Width ≥ 768px)**:
  - Use structured **Segmented Cards** (`.stitch-card`) with subtle borders, gentle border-radii (12px–16px), and soft ambient shadows.
  - Keep desktop sticky summaries or action sidebars pinned for rapid glanceability.
- **Mobile Devices (Screen Width < 768px)**:
  - **Borderless Flowing Sections**: Mobile screens must be borderless (no outer card boxes, heavy card outlines, or drop shadows).
  - **Subtle Hairline Dividers**: Separate sections using clean hairline dividers (`1px solid #E2E8F0` / `var(--color-outline-variant)`) with generous vertical padding (20px–24px).
  - **Full-Width Tap Targets**: Form inputs, segmented pickers, and choice chips must expand across the viewport with a minimum tap target height of 44px.
- **NO Floating / Sticky Overlay Buttons on Mobile**:
  - Primary CTA buttons (e.g., "Register Booking", "Save Settings", "Confirm") MUST stay naturally **in-flow** at the bottom of the section or form, directly following any summary cards.
  - Floating action buttons (FABs) or sticky screen-bottom floating bars are strictly prohibited unless explicitly requested by the user.

---

## 5. Unified Iconography Standards

- **System Standard**: Use Google **Material Symbols Outlined** (`<span class="material-symbols-outlined">icon_name</span>`) for all navigation items, form inputs, tooltips, and action buttons.
- **Icon Sizing Grid**:
  - Inline / Badges / Chips: `18px` (`font-size: 18px`)
  - Buttons / Inputs / Table cells: `20px` (`font-size: 20px`)
  - Card Headers / Nav Items / Hero icons: `24px` (`font-size: 24px`)
- **Emoji Boundaries**: Reserve emojis strictly for national flag language indicators (🇲🇲, 🇯🇵, 🇬🇧). Never mix ad-hoc emojis into core UI action buttons or form field headers.

---

## 6. Strict Button & Interactive Component Hierarchy

- **Primary Action (`.stitch-btn-primary`)**: Deep Teal background (`var(--color-primary)`), white text. Restricted to **one primary action per viewport/screen** (e.g., "Register Booking", "Confirm Reservation").
- **Secondary Action (`.stitch-btn-secondary`)**: Neutral background with hairline border (`var(--color-outline-variant)`), dark text. Used for secondary, dismiss, or cancel options.
- **Destructive Action (`.stitch-btn-danger`)**: Soft crimson surface with bold crimson label (`#DC2626`). Must always invoke a confirmation dialog before executing.
- **Padding Ratio Math**: Button horizontal padding must be exactly **2x vertical padding** (e.g., `padding: 10px 20px` or `padding: 12px 24px`), with a minimum touch target height of `44px`.

---

## 7. Standardized Status Badges & Semantic Color Tokens

Never invent arbitrary colors for booking, table, or account statuses. All screens must use the standardized `.stitch-badge--{status}` class family:
- **Confirmed / Active**: Forest Green (`color: #16A34A; background: #DCFCE7; border: 1px solid #BBF7D0;`)
- **Pending / In-Review**: Amber/Ochre (`color: #D97706; background: #FEF3C7; border: 1px solid #FDE68A;`)
- **Cancelled / Rejected**: Rose Red (`color: #DC2626; background: #FEE2E2; border: 1px solid #FECACA;`)
- **Seated / Arrived**: Deep Teal (`color: #0F4C5C; background: #E0F2F1; border: 1px solid #B2DFDB;`)
- **Completed / Finished**: Slate Gray (`color: #475569; background: #F1F5F9; border: 1px solid #E2E8F0;`)

---

## 8. Modals, Drawers & Dialog Standards

- **Backdrop Atmosphere**: Use `background: rgba(15, 23, 42, 0.45); backdrop-filter: blur(4px);`.
- **Triple-Exit Safety**: Every modal or overlay must support closing via:
  1. The top-right close icon button (`✕`).
  2. Clicking outside on the backdrop overlay.
  3. Pressing the physical `Escape` keyboard key.
- **Mobile Adaptive Sheets**: On viewports `< 768px`, modals must transition to bottom-sheet drawers with top rounded corners (`border-radius: 16px 16px 0 0`) and automatic scrolling overflow.

---

## 9. Standard Empty States & Loading Patterns

- **Zero Blank Voids**: Empty lists, tables, and search results must never render a raw blank area.
- **Standard Empty Component**: Always render `.stitch-empty-state` containing:
  - A muted `36px–48px` Material Symbol icon.
  - A clear localized heading via `I18n.t(...)` and explanatory subtext.
  - An optional primary CTA button if the user can create or add the missing item.

---

## 10. Design System, Tokens, & CSS (Option A: Strict Tokenized Architecture)

- **Zero Inline Styles in JavaScript**:
  - Do NOT write inline `style="..."` attributes inside JS template literals.
  - Do NOT hardcode arbitrary raw hex color codes (e.g. `#0F4C5C`, `#E2E8F0`, `#F8FAFC`) inside JavaScript files.
- **CSS Class & Variable Enforcement**:
  - All visual styling, paddings, borders, colors, and layout flex/grid utilities must reside in `/shop/css/` stylesheets (`design-system.css`, `components.css`, `layouts.css`).
  - Use existing design system classes:
    - `.stitch-card`, `.stitch-card-header`, `.stitch-summary-card`, `.stitch-simulator-card`
    - `.stitch-btn-primary`, `.stitch-btn-secondary`, `.stitch-btn-active`
    - `.stitch-input`, `.stitch-select`, `.stitch-badge`, `.stitch-pill`
  - When authoring CSS, always use defined CSS Custom Properties from `:root` in `/shop/css/design-system.css`:
    - **Primary / Brand**: `var(--color-primary)` (#0F4C5C / #0B1220), `var(--color-on-primary)`
    - **Accents**: `var(--color-accent)` (#FFB547 / #E36414)
    - **Borders & Dividers**: `var(--color-outline-variant)` (#E2E8F0), `var(--color-outline)`
    - **Surfaces & Backgrounds**: `var(--color-bg)` (#F8FAFC), `var(--color-surface)` (#FFFFFF), `var(--color-surface-container)` (#F1F5F9)
    - **Typography Colors**: `var(--color-on-surface)` (#111827), `var(--color-on-surface-variant)` (#64748B)
- **Banned Clichés**:
  - No purple-to-blue gradients, glowing drop shadows, or arbitrarily rounded 24px+ card corners.
  - No side-tab borders (single thick line on the left of a card).

---

## 11. State Management & Data Persistence

- **Centralized Store Pattern**:
  - State mutations must flow through centralized stores or event emitters (`Store`, `StoreMock`).
  - Avoid scattered, uncoordinated `localStorage.setItem` calls inside component templates.
- **Network & Offline Resilience**:
  - Support offline tolerance and network simulation gracefully.
  - Queue actions when offline and synchronize when connectivity is restored.
  - UI interactions must be optimistic with feedback toasts for transient states.
- **Decoupled Business Logic**: Keep calculations (e.g., party size validation, table conflict checks, time-slot availability) in pure utility functions rather than buried in DOM click listeners.

---

## 12. PWA Header Bar & Active Branch Display Standards

- **PWA Safe Area Compliance**:
  - Headers must include `padding-top: max(0px, env(safe-area-inset-top, 0px))` so content is never clipped by native device notches, dynamic islands, or mobile OS status bars.
- **Active Branch Name Display & Safe Truncation**:
  - Show the current branch as a clean, static status badge (`.admin-header__branch-badge`). Branch switching is managed through the navigation drawer.
  - Required truncation constraints:
    - Mobile (< 768px): `max-width: 140px`
    - Desktop (> 1024px): `max-width: 220px`
    - CSS: `white-space: nowrap; overflow: hidden; text-overflow: ellipsis; min-width: 0;`
  - Always provide the full name in the `title="..."` attribute for native desktop hover tooltips.
- **Flexbox Shrink Priority**:
  - Right-hand controls (`.admin-header__right` with language switcher, notification bell, user profile) must have `flex-shrink: 0;` so they are never compressed or pushed off-screen.

---

## 14. Responsive Typography, Spacing & Padding Matrix

All 3 portals (Shop, Admin, User) must adhere strictly to this cross-device matrix to maintain mathematical visual rhythm, touch ergonomic safety, and Burmese/Japanese script integrity.

### 14.1 Cross-Device Master Matrix

| Parameter | Mobile (< 768px) | Tablet (768px – 1023px) | Desktop (≥ 1024px) |
| :--- | :--- | :--- | :--- |
| **Primary Device** | Phone / Waiter PWA | Host Stand iPad / Counter Tablet | Manager PC / Admin Terminal |
| **Outer Page Inset / Gutter** | `16px` (`--gutter-mobile`) | `24px` (`--gutter-tablet`) | `32px` (`--gutter-desktop`, max container `1280px`) |
| **Card Internal Padding** | `16px` (or borderless section) | `20px` (`--card-padding-tablet`) | `24px` (`--card-padding-desktop`) |
| **Card Border Radius** | `0` (borderless) or `12px` | `12px` | `14px`–`16px` |
| **Section Gap (Vertical)** | `20px` | `28px` | `36px` |
| **Page Title (H1)** | `22px` / line-height `1.35` | `26px` / line-height `1.30` | `30px` / line-height `1.25` |
| **Card Title (H2)** | `17px` / line-height `1.40` | `19px` / line-height `1.35` | `20px` / line-height `1.30` |
| **Subhead (H3)** | `15px` / line-height `1.45` | `15px` / line-height `1.40` | `16px` / line-height `1.35` |
| **Body Text (Default)** | `15px` / **line-height `1.55`** | `16px` / **line-height `1.55`** | `16px` / **line-height `1.55`** |
| **Caption / Help Text** | `13px` / line-height `1.50` | `13px` / line-height `1.50` | `13px` / line-height `1.50` |
| **Status Badges / Chips** | `12px` / line-height `1.20` | `12px` / line-height `1.20` | `12px` / line-height `1.20` |
| **Touch Target Minimum** | `44px` height | `44px` height | `38px`–`42px` height |
| **Table Row Height / Style** | Cards / List items (`min 52px`) | `48px` (touch-safe spacious rows) | `38px`–`40px` (dense operational grid) |
| **Button Padding Math** | `12px 24px` (2:1 ratio) | `10px 20px` (2:1 ratio) | `9px 18px` (2:1 ratio) |

### 14.2 Mathematical Rules & Constraints
1. **Outer ≥ Inner Padding**: The outer padding of any parent container must always equal or exceed the internal gap between its children (`Parent Padding >= Child Gap`).
2. **Nested Radius Formula**: When nesting a rounded element inside a rounded card, enforce:  
   $$\text{Inner Radius} = \max(4\text{px}, \text{Outer Radius} - \text{Padding})$$
3. **Burmese Diacritic Safeguard**: Never set body or form text `line-height` below `1.55`. Never use font sizes below `12px` in any script.
4. **Desktop High Density**: POS, Table View, and Ledger tables on desktop must remain compact (`38px`–`40px` row height) so staff can monitor 15–20 bookings simultaneously without vertical scrolling fatigue.

---

## 15. Directory Structure & File Conventions

```
├── /shop/
│   ├── css/
│   │   ├── design-system.css  # Core tokens, reset, typography, responsive card/divider rules
│   │   ├── components.css     # Reusable UI component classes (.stitch-*, buttons, inputs)
│   │   └── layouts.css        # Admin layout, sidebar, grid system
│   ├── js/
│   │   └── screens/           # Modular screen controllers (s01 through s22)
│   └── index.html             # Shop portal entry point
├── /user/                     # Customer-facing booking portal
├── /shared/
│   ├── js/
│   │   ├── app.js             # Shell & admin page coordinator (App.renderAdminPage)
│   │   ├── router.js          # Hash routing & navigation
│   │   ├── i18n.js            # EN / MM / JA localization dictionary
│   │   └── store.js           # Core state store
├── AGENTS.md                  # This specification file
└── metadata.json              # Platform capabilities & app manifest
```
