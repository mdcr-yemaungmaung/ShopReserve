---
name: Kinetic Glass - Shop Portal
colors:
  # Primary Brand Colors
  primary: '#0F4C5C'
  on-primary: '#ffffff'
  primary-container: '#d0e6ec'
  on-primary-container: '#08323d'
  inverse-primary: '#98c9d4'
  
  # Secondary Colors
  secondary: '#D8902F'
  on-secondary: '#ffffff'
  secondary-container: '#fbead1'
  on-secondary-container: '#5c3806'
  
  # Tertiary Colors
  tertiary: '#623013'
  on-tertiary: '#ffffff'
  tertiary-container: '#f2dfd5'
  on-tertiary-container: '#3b1a07'
  
  # Error Colors
  error: '#BA1A1A'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  
  # Surface Colors
  surface: '#FFFFFF'
  surface-dim: '#E2E8F0'
  surface-bright: '#FFFFFF'
  surface-container-lowest: '#FFFFFF'
  surface-container-low: '#F1F5F9'
  surface-container: '#E2E8F0'
  surface-container-high: '#CBD5E1'
  surface-container-highest: '#94A3B8'
  surface-variant: '#E2E8F0'
  surface-tint: '#0F4C5C'
  
  # Background Colors
  background: '#F8FAFC'
  on-background: '#1F2937'
  
  # Text Colors
  on-surface: '#1F2937'
  on-surface-variant: '#4B5563'
  inverse-surface: '#1F2937'
  inverse-on-surface: '#F9FAFB'
  
  # Outline Colors
  outline: '#6B7280'
  outline-variant: '#D1D5DB'
  
  # Status Colors (Semantic)
  status-confirmed: '#16A34A'
  status-confirmed-bg: '#DCFCE7'
  status-confirmed-border: '#BBF7D0'
  status-pending: '#D97706'
  status-pending-bg: '#FEF3C7'
  status-pending-border: '#FDE68A'
  status-cancelled: '#DC2626'
  status-cancelled-bg: '#FEE2E2'
  status-cancelled-border: '#FECACA'
  status-seated: '#0F4C5C'
  status-seated-bg: '#E0F2F1'
  status-seated-border: '#B2DFDB'
  status-completed: '#475569'
  status-completed-bg: '#F1F5F9'
  status-completed-border: '#E2E8F0'
typography:
  # Font Families
  font-family-headline: 'Outfit'
  font-family-body: 'Inter'
  font-family-myanmar: 'Padauk', 'Noto Sans Myanmar', 'Pyidaungsu'
  font-family-mono: 'JetBrains Mono', 'Fira Code', monospace
  
  # Type Scale - Headlines
  headline-xl:
    fontFamily: Outfit
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Outfit
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Outfit
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-sm:
    fontFamily: Outfit
    fontSize: 20px
    fontWeight: '500'
    lineHeight: 28px
  
  # Type Scale - Body
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  
  # Type Scale - Labels
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.05em
  
  # Type Scale - Caption
  caption:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
  
  # Status Badge Typography
  badge:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  '2xl': 48px
  '3xl': 64px
  
  # Responsive Gutters
  gutter-mobile: 16px
  gutter-tablet: 24px
  gutter-desktop: 32px
  
  # Section Gaps
  section-gap-mobile: 20px
  section-gap-tablet: 28px
  section-gap-desktop: 36px
  
  # Card Padding
  card-padding-mobile: 16px
  card-padding-tablet: 20px
  card-padding-desktop: 24px
  
  # Margins
  margin-mobile: 16px
  margin-desktop: 48px
---

# Visual Design System

This document contains the complete UI/UX Design System specifications for the EzBookNow **Shop Portal (Merchant Management Dashboard)**. This is the single source of truth for all visual design tokens.

## 1. Color Palette

### Primary Colors
- **Primary**: `#0F4C5C` (Deep Teal) - Main brand color, primary actions, active states
- **On-Primary**: `#FFFFFF` - Text on primary backgrounds
- **Primary Container**: `#D0E6EC` - Light teal for secondary containers
- **On-Primary Container**: `#08323D` - Text on primary containers

### Secondary Colors
- **Secondary**: `#D8902F` (Amber/Gold) - Secondary actions, highlights, accents
- **On-Secondary**: `#FFFFFF` - Text on secondary backgrounds
- **Secondary Container**: `#FBEAD1` - Light amber for secondary containers
- **On-Secondary Container**: `#5C3806` - Text on secondary containers

### Tertiary Colors
- **Tertiary**: `#623013` (Brown) - Tertiary actions, subtle accents
- **On-Tertiary**: `#FFFFFF` - Text on tertiary backgrounds
- **Tertiary Container**: `#F2DFD5` - Light brown for tertiary containers
- **On-Tertiary Container**: `#3B1A07` - Text on tertiary containers

### Error Colors
- **Error**: `#BA1A1A` (Red) - Error states, destructive actions
- **On-Error**: `#FFFFFF` - Text on error backgrounds
- **Error Container**: `#FFDAD6` - Light red for error containers
- **On-Error Container**: `#93000A` - Text on error containers

### Surface Colors
- **Surface**: `#FFFFFF` - Main surface color
- **Surface Dim**: `#E2E8F0` - Dimmed surface (disabled states)
- **Surface Container Low**: `#F1F5F9` - Light container backgrounds
- **Surface Container**: `#E2E8F0` - Default container backgrounds
- **Surface Container High**: `#CBD5E1` - Elevated container backgrounds
- **Surface Container Highest**: `#94A3B8` - Highest elevation containers

### Background Colors
- **Background**: `#F8FAFC` - Page background
- **On-Background**: `#1F2937` - Text on background

### Text Colors
- **On-Surface**: `#1F2937` - Primary text color
- **On-Surface Variant**: `#4B5563` - Secondary/muted text
- **Inverse Surface**: `#1F2937` - Text on inverse surfaces
- **Inverse On-Surface**: `#F9FAFB` - Text on inverse backgrounds

### Outline Colors
- **Outline**: `#6B7280` - Borders, dividers
- **Outline Variant**: `#D1D5DB` - Light borders, subtle dividers

### Status Colors (Semantic)
- **Confirmed/Active**: `#16A34A` (Green) - Background: `#DCFCE7`, Border: `#BBF7D0`
- **Pending/In-Review**: `#D97706` (Amber) - Background: `#FEF3C7`, Border: `#FDE68A`
- **Cancelled/Rejected**: `#DC2626` (Red) - Background: `#FEE2E2`, Border: `#FECACA`
- **Seated/Arrived**: `#0F4C5C` (Teal) - Background: `#E0F2F1`, Border: `#B2DFDB`
- **Completed/Finished**: `#475569` (Gray) - Background: `#F1F5F9`, Border: `#E2E8F0`

## 2. Typography

### Font Families
- **Headlines**: Outfit (primary), fallback to system fonts
- **Body Text**: Inter (primary), fallback to system fonts
- **Myanmar Text**: Padauk, Noto Sans Myanmar, Pyidaungsu (required for Myanmar unicode)
- **Monospace**: JetBrains Mono, Fira Code (for code, numbers)

### Responsive Type Scale

#### Mobile (< 768px)
- **Page Title (H1)**: 22px / line-height 1.35
- **Card Title (H2)**: 17px / line-height 1.40
- **Subhead (H3)**: 15px / line-height 1.45
- **Body Text**: 15px / line-height **1.55** (Myanmar-safe)
- **Caption**: 13px / line-height 1.50
- **Status Badges**: 12px / line-height 1.20

#### Tablet (768px – 1023px)
- **Page Title (H1)**: 26px / line-height 1.30
- **Card Title (H2)**: 19px / line-height 1.35
- **Subhead (H3)**: 15px / line-height 1.40
- **Body Text**: 16px / line-height **1.55** (Myanmar-safe)
- **Caption**: 13px / line-height 1.50
- **Status Badges**: 12px / line-height 1.20

#### Desktop (≥ 1024px)
- **Page Title (H1)**: 30px / line-height 1.25
- **Card Title (H2)**: 20px / line-height 1.30
- **Subhead (H3)**: 16px / line-height 1.35
- **Body Text**: 16px / line-height **1.55** (Myanmar-safe)
- **Caption**: 13px / line-height 1.50
- **Status Badges**: 12px / line-height 1.20

### Line-Height Rules
- **Myanmar Safety**: Never set body text line-height below `1.55`
- **Headlines**: 1.25–1.35 ratios
- **Badges/Chips**: 1.20 ratio, single-line only (`white-space: nowrap`)
- **Minimum Font Size**: Never use below `12px` in any script

## 3. Spacing System

### Base Scale
- `4px` (base unit)
- `8px` (xs)
- `12px` (sm)
- `16px` (md)
- `24px` (lg)
- `32px` (xl)
- `48px` (2xl)
- `64px` (3xl)

### Responsive Gutters
- **Mobile**: 16px
- **Tablet**: 24px
- **Desktop**: 32px

### Section Gaps (Vertical)
- **Mobile**: 20px
- **Tablet**: 28px
- **Desktop**: 36px

### Card Padding
- **Mobile**: 16px (or borderless sections)
- **Tablet**: 20px
- **Desktop**: 24px

### Mathematical Rules
1. **Outer ≥ Inner Padding**: Parent padding must always equal or exceed internal child gap
2. **Nested Radius Formula**: `Inner Radius = max(4px, Outer Radius - Padding)`
3. **Touch Targets**: Minimum 44×44px for interactive elements

## 4. Border Radius

### Scale
- **Small (sm)**: 0.25rem (4px) - Badges, chips, small elements
- **Default**: 0.5rem (8px) - Buttons, inputs, standard elements
- **Medium (md)**: 0.75rem (12px) - Cards (mobile), small modals
- **Large (lg)**: 1rem (16px) - Cards (desktop), modals, sheets
- **Extra Large (xl)**: 1.5rem (24px) - Large cards, prominent elements
- **Full**: 9999px - Pills, circular elements

### Responsive Card Radii
- **Mobile**: 0 (borderless) or 12px
- **Tablet**: 12px
- **Desktop**: 14–16px

## 5. Component Specifications

### Buttons
#### Primary Button (`.stitch-btn-primary`)
- **Background**: `var(--color-primary)` (#0F4C5C)
- **Text**: White (`#FFFFFF`)
- **Padding**: 2:1 ratio (horizontal:vertical)
  - Mobile: `12px 24px`
  - Tablet: `10px 20px`
  - Desktop: `9px 18px`
- **Min Height**: 44px
- **One per viewport/screen**

#### Secondary Button (`.stitch-btn-secondary`)
- **Background**: Transparent or neutral
- **Border**: `1px solid var(--color-outline-variant)`
- **Text**: Dark (`var(--color-on-surface)`)
- **Padding**: Same 2:1 ratio as primary

#### Destructive Button (`.stitch-btn-danger`)
- **Background**: Soft crimson surface
- **Text**: Bold crimson (`#DC2626`)
- **Always invoke confirmation dialog**

### Status Badges (`.stitch-badge--{status}`)
- **Font Size**: 12px
- **Line-Height**: 1.20
- **White-Space**: nowrap (single-line only)
- **Border**: 1px solid (status-specific)
- **Padding**: 4px 8px (approximate)
- **Border Radius**: 9999px (pill shape)

### Cards
#### Desktop & Tablet (≥ 768px)
- **Class**: `.stitch-card`
- **Background**: `var(--color-surface)`
- **Border**: `1px solid var(--color-outline-variant)`
- **Border Radius**: 12–16px
- **Shadow**: Soft ambient shadow
- **Padding**: 20–24px

#### Mobile (< 768px)
- **Style**: Borderless flowing sections
- **Dividers**: `1px solid var(--color-outline-variant)`
- **Padding**: 16px
- **No shadows or heavy borders**

### Modals & Dialogs
- **Backdrop**: `background: rgba(15, 23, 42, 0.45); backdrop-filter: blur(4px);`
- **Max Width**: 480px (desktop)
- **Mobile**: Full-width bottom sheet
- **Border Radius**: 16px 16px 0 0 (mobile sheets)
- **Triple-Exit**: ✕ button, backdrop click, Escape key

### Icons
- **System**: Material Symbols Outlined
- **Sizes**:
  - Inline/Badges: 18px
  - Buttons/Inputs: 20px
  - Card Headers/Nav: 24px

## 6. Responsive Behavior

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px – 1023px
- **Desktop**: ≥ 1024px

### Mobile Rules
- **Layout**: Borderless flowing sections
- **Dividers**: Hairline (`1px solid var(--color-outline-variant)`)
- **Tap Targets**: Full-width, minimum 44px height
- **Buttons**: In-flow at bottom, no floating/sticky CTAs
- **Modals**: Bottom-sheet drawers

### Desktop Rules
- **Layout**: Segmented cards with shadows
- **Summaries**: Sticky/pinned sidebars
- **Tables**: Dense (38–40px row height)
- **Modals**: Centered dialogs

### PWA Safe Areas
- **Headers**: `padding-top: max(0px, env(safe-area-inset-top, 0px))`
- **Content**: Never clipped by notches or dynamic islands
- **Touch**: Minimum 44×44px targets

## 7. Brand Identity

### Color Usage
- **Primary Navy Blue (`#0F4C5C`)**: Main brand, primary actions, sidebar navigation
- **Secondary Amber (`#D8902F`)**: Highlights, accents, secondary actions
- **Merchant Lime (`#16A34A`)**: Status updates, active bookings, table status

### Design Philosophy
- **Operational Speed**: Designed for restaurant/merchant operators
- **Dashboard Focus**: Order/reservation management, table control, metrics
- **Clean Workspace**: Crisp boundaries, high legibility, professional appearance

## 8. CSS Custom Properties

### Required Variables (in `:root`)
```css
:root {
  /* Primary */
  --color-primary: #0F4C5C;
  --color-on-primary: #FFFFFF;
  
  /* Secondary */
  --color-secondary: #D8902F;
  --color-on-secondary: #FFFFFF;
  
  /* Tertiary */
  --color-tertiary: #623013;
  --color-on-tertiary: #FFFFFF;
  
  /* Error */
  --color-error: #BA1A1A;
  --color-on-error: #FFFFFF;
  
  /* Surface */
  --color-surface: #FFFFFF;
  --color-on-surface: #1F2937;
  --color-on-surface-variant: #4B5563;
  
  /* Background */
  --color-bg: #F8FAFC;
  --color-on-background: #1F2937;
  
  /* Outline */
  --color-outline: #6B7280;
  --color-outline-variant: #D1D5DB;
  
  /* Surface Containers */
  --color-surface-container: #E2E8F0;
  --color-surface-container-low: #F1F5F9;
  --color-surface-container-high: #CBD5E1;
}
```