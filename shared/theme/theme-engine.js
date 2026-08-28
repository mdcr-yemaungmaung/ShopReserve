/* ============================================================
   EzBookNow Theme Engine — shared/theme/theme-engine.js
   PURE LOGIC ONLY. No DOM access. Works in both browser
   (via <script>) and Node (via require / module.exports).
   ============================================================ */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else if (typeof exports === 'object') {
    exports.ThemeEngine = factory();
  } else {
    root.ThemeEngine = factory();
  }
})(typeof globalThis !== 'undefined' ? globalThis : (typeof self !== 'undefined' ? self : this), function () {
  'use strict';

  /* ==========================================================
     SECTION 1 — Lightweight YAML frontmatter parser
     Supports: `key: value`, nested objects via 2-space indent,
     inline flow objects `{ a: 1, b: 2 }`, quoted strings,
     # comments. This covers the DESIGN.md contract format.
     ========================================================== */

  function parseFrontmatter(md) {
    const text = String(md || '');
    const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(text);
    if (!match) return null;
    return parseYaml(match[1]);
  }

  function parseYaml(src) {
    const lines = src.split(/\r?\n/).map(l => l.replace(/\t/g, '  '));
    const root = {};
    const stack = [{ indent: -1, obj: root }];

    for (const raw of lines) {
      const stripped = raw.replace(/^\s*#.*$/, ''); // strip full-line comments
      if (stripped.trim() === '') continue;

      const indent = (raw.match(/^ */) || [''])[0].length;
      const content = stripped.trim();
      if (content.startsWith('#')) continue;

      // Pop stack while current indent <= parent indent
      while (stack.length > 1 && indent <= stack[stack.length - 1].indent) {
        stack.pop();
      }
      const parent = stack[stack.length - 1].obj;

      const inlineFlowMatch = content.match(/^([A-Za-z0-9_-]+)\s*:\s*\{(.*)\}\s*$/);
      if (inlineFlowMatch) {
        const key = inlineFlowMatch[1];
        const flowObj = {};
        inlineFlowMatch[2].split(',').forEach(part => {
          const kv = part.split(':');
          if (kv.length >= 2) {
            flowObj[kv[0].trim()] = parseScalar(kv.slice(1).join(':').trim());
          }
        });
        parent[key] = flowObj;
        continue;
      }

      const colonIdx = content.indexOf(':');
      if (colonIdx === -1) {
        // bare scalar line — treat as key with empty value
        parent[content.trim()] = null;
        continue;
      }

      const key = content.slice(0, colonIdx).trim();
      let value = content.slice(colonIdx + 1).trim();

      if (value === '') {
        const childObj = {};
        parent[key] = childObj;
        stack.push({ indent, obj: childObj });
      } else {
        parent[key] = parseScalar(value);
      }
    }
    return root;
  }

  function parseScalar(value) {
    if (value === '') return null;
    if (value === 'true') return true;
    if (value === 'false') return false;
    if (value === 'null' || value === '~') return null;
    if (/^-?\d+$/.test(value)) return parseInt(value, 10);
    if (/^-?\d*\.\d+$/.test(value)) return parseFloat(value);
    const unquoted = value.replace(/^['"](.*)['"]$/, '$1');
    return unquoted;
  }

  /* ==========================================================
     SECTION 2 — Color math (contrast, mixing)
     ========================================================== */

  function hexToRgb(hex) {
    let h = String(hex || '').replace('#', '').trim();
    if (h.length === 3) h = h.split('').map(c => c + c).join('');
    if (!/^[0-9a-fA-F]{6}$/.test(h)) return null;
    const n = parseInt(h, 16);
    return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
  }

  function rgbToHex(r, g, b) {
    const c = v => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0');
    return '#' + c(r) + c(g) + c(b);
  }

  function mix(colorA, colorB, t) {
    const a = hexToRgb(colorA);
    const b = hexToRgb(colorB);
    if (!a || !b) return colorA;
    return rgbToHex(a.r + (b.r - a.r) * t, a.g + (b.g - a.g) * t, a.b + (b.b - a.b) * t);
  }

  function luminance(hex) {
    const rgb = hexToRgb(hex);
    if (!rgb) return 0;
    const f = v => {
      const c = v / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    };
    return 0.2126 * f(rgb.r) + 0.7152 * f(rgb.g) + 0.0722 * f(rgb.b);
  }

  function wcagContrast(hexA, hexB) {
    const l1 = luminance(hexA);
    const l2 = luminance(hexB);
    const hi = Math.max(l1, l2);
    const lo = Math.min(l1, l2);
    return (hi + 0.05) / (lo + 0.05);
  }

  function contrastTextColor(hex) {
    return wcagContrast(hex, '#ffffff') > 4.5 ? '#ffffff' : '#111111';
  }

  /* ==========================================================
     SECTION 3 — Token → CSS variable mapping
     Mirrors the token names already used in css/design-system.css
     ========================================================== */

  const COLOR_KEY_MAP = {
    background: 'bg',
    surface: 'surface',
    'surface-dim': 'surface-dim',
    'surface-bright': 'surface-bright',
    'surface-container-lowest': 'surface-container-lowest',
    'surface-container-low': 'surface-container-low',
    'surface-container': 'surface-container',
    'surface-container-high': 'surface-container-high',
    'surface-container-highest': 'surface-container-highest',
    'on-surface': 'on-surface',
    'on-surface-variant': 'on-surface-variant',
    'inverse-surface': 'inverse-surface',
    'inverse-on-surface': 'inverse-on-surface',
    outline: 'outline',
    'outline-variant': 'outline-variant',
    'surface-tint': 'surface-tint',
    primary: 'primary',
    'on-primary': 'on-primary',
    'primary-container': 'primary-container',
    'on-primary-container': 'on-primary-container',
    'inverse-primary': 'inverse-primary',
    secondary: 'secondary',
    'on-secondary': 'on-secondary',
    'secondary-container': 'secondary-container',
    'on-secondary-container': 'on-secondary-container',
    tertiary: 'tertiary',
    'on-tertiary': 'on-tertiary',
    'tertiary-container': 'tertiary-container',
    'on-tertiary-container': 'on-tertiary-container',
    error: 'error',
    'on-error': 'on-error',
    'error-container': 'error-container',
    'on-error-container': 'on-error-container',
    'primary-fixed': 'primary-fixed',
    'primary-fixed-dim': 'primary-fixed-dim',
    'on-primary-fixed': 'on-primary-fixed',
    'on-primary-fixed-variant': 'on-primary-fixed-variant',
    'secondary-fixed': 'secondary-fixed',
    'secondary-fixed-dim': 'secondary-fixed-dim',
    'on-secondary-fixed': 'on-secondary-fixed',
    'on-secondary-fixed-variant': 'on-secondary-fixed-variant',
    'tertiary-fixed': 'tertiary-fixed',
    'tertiary-fixed-dim': 'tertiary-fixed-dim',
    'on-tertiary-fixed': 'on-tertiary-fixed',
    'on-tertiary-fixed-variant': 'on-tertiary-fixed-variant'
  };

  const TYPOGRAPHY_LEVEL_MAP = {
    'headline-xl': 'headline-xl',
    'headline-lg': 'headline-lg',
    'headline-md': 'headline-md',
    'headline-sm': 'headline-sm',
    'body-lg': 'body-lg',
    'body-md': 'body-md',
    'body-sm': 'body-sm',
    'label-md': 'label-md',
    'label-sm': 'label-sm',
    'headline-lg-mobile': 'headline-lg-mobile'
  };

  // DESIGN.md scale (sm 4, DEFAULT 8, md 12, lg 16, xl 24) is one
  // step ahead of the CSS variable scale (xs 4, sm 6, md 8, lg 12,
  // xl 16, 2xl 24). Map by value so seed themes reproduce exactly.
  const ROUNDED_MAP = {
    sm: 'xs',
    DEFAULT: 'md',
    md: 'lg',
    lg: 'xl',
    xl: '2xl'
  };

  const SPACING_MAP = {
    base: '1',
    xs: '2',
    sm: '3',
    md: '4',
    lg: '6',
    xl: '8',
    gutter: 'gutter',
    'margin-mobile': 'margin-mobile',
    'margin-desktop': 'margin-desktop'
  };

  /* ==========================================================
     SECTION 4 — Design doc → tokens + CSS var compilation
     ========================================================== */

  function parseDesignDoc(md) {
    const front = parseFrontmatter(md);
    if (!front) return null;
    const tokens = {
      name: front.name || 'Unnamed Theme',
      colors: front.colors || {},
      typography: front.typography || {},
      rounded: front.rounded || {},
      spacing: front.spacing || {}
    };
    return tokens;
  }

  function tokensToCssVars(tokens, defaults) {
    const vars = {};
    const colors = tokens && tokens.colors ? tokens.colors : {};
    const typo = tokens && tokens.typography ? tokens.typography : {};
    const rounded = tokens && tokens.rounded ? tokens.rounded : {};
    const spacing = tokens && tokens.spacing ? tokens.spacing : {};
    const d = defaults || {};

    // Colors
    for (const [key, value] of Object.entries(colors)) {
      const mapped = COLOR_KEY_MAP[key];
      if (mapped && typeof value === 'string' && value) {
        vars['--color-' + mapped] = value;
      }
    }
    // Derived colors (hover/dim) from primary & secondary when absent
    const primary = colors.primary || (d.colors && d.colors.primary);
    const secondary = colors.secondary || (d.colors && d.colors.secondary);
    if (primary) {
      if (!vars['--color-primary-hover']) vars['--color-primary-hover'] = mix(primary, '#000000', 0.18);
      if (!vars['--color-primary-dim']) vars['--color-primary-dim'] = mix(primary, '#000000', 0.32);
      if (!vars['--color-on-primary']) vars['--color-on-primary'] = contrastTextColor(primary);
    }
    if (secondary) {
      if (!vars['--color-secondary-hover']) vars['--color-secondary-hover'] = mix(secondary, '#000000', 0.18);
      if (!vars['--color-secondary-dim']) vars['--color-secondary-dim'] = mix(secondary, '#000000', 0.32);
      if (!vars['--color-on-secondary']) vars['--color-on-secondary'] = contrastTextColor(secondary);
    }
    // Ensure bg falls back to background
    if (!vars['--color-bg'] && colors.background) vars['--color-bg'] = colors.background;

    // Typography — headline & body font families, plus size variables
    const headlineLevel = typo['headline-xl'] || typo['headline-lg'] || {};
    const bodyLevel = typo['body-md'] || typo['body-sm'] || {};
    if (headlineLevel.fontFamily) vars['--font-headline'] = headlineLevel.fontFamily;
    if (bodyLevel.fontFamily) vars['--font-body'] = bodyLevel.fontFamily;
    for (const [level, value] of Object.entries(typo)) {
      const varSuffix = TYPOGRAPHY_LEVEL_MAP[level];
      if (!varSuffix || typeof value !== 'object' || value === null) continue;
      if (value.fontSize) vars['--text-' + varSuffix] = value.fontSize;
      if (level === 'headline-xl' && value.fontFamily) vars['--font-headline'] = value.fontFamily;
      if (level === 'body-md' && value.fontFamily) vars['--font-body'] = value.fontFamily;
    }

    // Rounded
    for (const [key, value] of Object.entries(rounded)) {
      const mapped = ROUNDED_MAP[key];
      if (mapped && value) vars['--radius-' + mapped] = value;
      if (key === 'full' && value) vars['--radius-full'] = value;
    }

    // Spacing
    for (const [key, value] of Object.entries(spacing)) {
      const mapped = SPACING_MAP[key];
      if (mapped && value) {
        vars['--space-' + mapped] = typeof value === 'number' ? value + 'px' : value;
      }
    }

    return vars;
  }

  /* ==========================================================
     SECTION 5 — DOM application (browser only; no-op in Node)
     ========================================================== */

  function applyVars(documentRef, vars) {
    if (!documentRef || typeof documentRef.documentElement === 'undefined') return 0;
    const el = documentRef.documentElement;
    let count = 0;
    for (const [name, value] of Object.entries(vars)) {
      el.style.setProperty(name, value);
      count++;
    }
    return count;
  }

  function clearApplied(documentRef) {
    if (!documentRef || typeof documentRef.documentElement === 'undefined') return;
    const el = documentRef.documentElement;
    const themeVars = el.style.cssText;
    if (themeVars) el.removeAttribute('style');
  }

  /* ==========================================================
     SECTION 6 — Theme registry data
     ========================================================== */

  function summarize(tokens) {
    const colors = tokens.colors || {};
    return {
      name: tokens.name,
      primary: colors.primary || colors['on-primary-container'] || '#131546',
      secondary: colors.secondary || colors['on-secondary-container'] || '#3d6a00',
      hasCustomTypography: Object.keys(tokens.typography || {}).length > 0
    };
  }

  return {
    parseFrontmatter,
    parseYaml,
    parseDesignDoc,
    tokensToCssVars,
    applyVars,
    clearApplied,
    summarize,
    wcagContrast,
    contrastTextColor,
    mix,
    hexToRgb,
    luminance
  };
});
