---
name: ReserveHub Premium
colors:
  surface: '#f8f9ff'
  surface-dim: '#d0dbed'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e6eeff'
  surface-container-high: '#dee9fc'
  surface-container-highest: '#d9e3f6'
  on-surface: '#121c2a'
  on-surface-variant: '#40484b'
  inverse-surface: '#27313f'
  inverse-on-surface: '#eaf1ff'
  outline: '#70787c'
  outline-variant: '#c0c8cb'
  surface-tint: '#306576'
  primary: '#003441'
  on-primary: '#ffffff'
  primary-container: '#0f4c5c'
  on-primary-container: '#87bbce'
  inverse-primary: '#9acee1'
  secondary: '#865300'
  on-secondary: '#ffffff'
  secondary-container: '#ffb14e'
  on-secondary-container: '#714500'
  tertiary: '#502206'
  on-tertiary: '#ffffff'
  tertiary-container: '#6c381a'
  on-tertiary-container: '#eda37d'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#b6ebfe'
  primary-fixed-dim: '#9acee1'
  on-primary-fixed: '#001f28'
  on-primary-fixed-variant: '#114d5d'
  secondary-fixed: '#ffddb9'
  secondary-fixed-dim: '#ffb963'
  on-secondary-fixed: '#2b1700'
  on-secondary-fixed-variant: '#663e00'
  tertiary-fixed: '#ffdbcb'
  tertiary-fixed-dim: '#ffb691'
  on-tertiary-fixed: '#341100'
  on-tertiary-fixed-variant: '#6d391b'
  background: '#f8f9ff'
  on-background: '#121c2a'
  surface-variant: '#d9e3f6'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
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
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 64px
  gutter: 20px
  margin-mobile: 16px
  margin-desktop: 40px
  max-width: 1280px
---

## Brand & Style
The design system for this platform focuses on high-fidelity, enterprise-grade reliability with a warm, hospitable edge. It targets a sophisticated audience that values efficiency and clarity in the booking process. 

The aesthetic is **Corporate Modern** with a strong emphasis on **Minimalism** and **Tactile** refinement. It utilizes expansive whitespace, precise alignment, and a high-contrast color palette to ensure legibility and trust. The visual language takes cues from premium travel platforms, using layered surfaces and soft shadows to create a sense of physical space and hierarchy within the digital interface.

## Colors
The color strategy employs a "Professional Warmth" approach. 
- **Primary (Deep Teal):** Used for core navigation, primary actions, and brand reinforcement. It suggests stability and high-end service.
- **Secondary (Warm Gold):** Reserved for high-intent conversion points, such as "Book Now" buttons, ratings, and premium badges.
- **Tertiary (Deep Brown):** Used sparingly for accent borders or specific luxury-tier categorization.
- **Neutral (Dark Gray):** Applied to body text and icons to maintain high readability against the white background.

Backgrounds remain crisp white (`#FFFFFF`) to emphasize content, while subtle off-white surfaces (`#F9FAFB`) are used to distinguish container backgrounds from the page floor.

## Typography
The system relies exclusively on **Inter** to maintain a systematic, utilitarian, and modern appearance. 
- **Headlines:** Use tighter letter spacing and heavier weights to create a strong visual anchor for reservation cards and property titles.
- **Body Text:** Standard weight with generous line height to ensure long-form descriptions remain legible.
- **Labels:** Medium weight for UI elements like input headers and metadata tags. Small labels use uppercase styling to provide contrast without increasing font size.

## Layout & Spacing
The layout follows a **Fluid-Fixed Hybrid** model. Content is contained within a 1280px max-width container on desktop, centered on the screen.
- **Grid:** A 12-column grid is used for desktop (24px gutters), collapsing to a 4-column grid for mobile (16px gutters).
- **Rhythm:** Spacing follows a 4px/8px baseline shift. Most card components use `lg` (24px) internal padding to maintain a premium, airy feel.
- **Mobile Adaptivity:** Cards transition from multi-column layouts to single-stack lists. Margins reduce to 16px to maximize screen real estate for high-quality imagery.

## Elevation & Depth
Elevation is achieved through a combination of **Tonal Layers** and **Ambient Shadows**. 
- **Level 0 (Floor):** White (`#FFFFFF`).
- **Level 1 (Cards/Containers):** Subtle 1px border in a very light neutral (`#E5E7EB`) with a soft, diffused shadow. Shadow spec: `0px 4px 12px rgba(0, 0, 0, 0.05)`.
- **Level 2 (Hover/Active):** Increased shadow depth to suggest interactability. Shadow spec: `0px 10px 25px rgba(0, 0, 0, 0.08)`.
- **Level 3 (Modals/Overlays):** High-contrast depth with a backdrop blur (5px) on the floor layer to focus user attention.

## Shapes
To align with the approachable yet premium nature of Airbnb-inspired designs, this system utilizes **Rounded** corners. 
- **Standard (0.5rem):** Used for input fields, buttons, and small UI widgets.
- **Large (1rem):** Used for primary content cards and image containers.
- **Extra Large (1.5rem):** Reserved for large section wrappers or promotional banners.
This progressive rounding creates a soft, welcoming interface that avoids the clinical feel of sharp corners.

## Components
- **Buttons:** Primary buttons use the Deep Teal background with white text. Secondary "Action" buttons (like "View Details") use a subtle gray outline. The "Book" action specifically uses the Warm Gold background for maximum conversion visibility.
- **Cards:** Cards are the primary vessel for information. They feature 1rem corner radius, a 1px border, and a soft shadow. Images within cards should always occupy the top half with a top-only corner radius.
- **Input Fields:** Use a 0.5rem radius with a subtle gray border that thickens and changes to Deep Teal on focus.
- **Chips/Tags:** Used for "Available", "Instant Book", or "Superhost" status. These use low-saturation versions of the brand colors with bold text labels.
- **Search Bar:** A floating, high-elevation component often anchored at the top of the viewport or hero section, featuring distinct segments for "Location," "Dates," and "Guests."
- **Checkboxes & Radios:** Use the Deep Teal primary color for checked states, maintaining a clean, minimalist geometric form.