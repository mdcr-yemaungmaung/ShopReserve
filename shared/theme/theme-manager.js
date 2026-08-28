/* ============================================================
   EzBookNow Theme Manager — shared/theme/theme-manager.js
   Loads the current app's registry.json, applies a registered
   theme to the document via CSS variables, and persists the
   selection per app.

   Each app owns its own registry + design-systems folder:
     user/   -> user/registry.json,   user/design-systems/
     shop/   -> shop/registry.json,   shop/design-systems/
     admin/  -> admin/registry.json,  admin/design-systems/

   The storage key and registryUrl are passed in at init() so each
   app stays fully independent — its own theme catalog, its own
   saved selection, its own default.

   Used by: user/, shop/, admin/ app shells and the Hub previews.
   ============================================================ */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.ThemeManager = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  const ENGINE = (typeof ThemeEngine !== 'undefined') ? ThemeEngine : null;
  const DEFAULT_REGISTRY = 'registry.json';

  let registry = { themes: [] };
  let appKey = 'ez_default_theme';
  let defaultThemeId = null;
  let loaded = false;
  let designDir = 'design-systems/';

  async function loadRegistry(url) {
    // If the embedded registry-data.js was loaded (file:// where fetch is
    // blocked), prefer it. Otherwise fetch the JSON.
    if (typeof window !== 'undefined' && window.THEME_REGISTRY && window.THEME_REGISTRY.themes) {
      registry = window.THEME_REGISTRY;
      loaded = true;
      return registry;
    }
    try {
      const res = await fetch(url || DEFAULT_REGISTRY + '?t=' + Date.now(), { cache: 'no-cache' });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      registry = await res.json();
      loaded = true;
      return registry;
    } catch (err) {
      console.warn('[ThemeManager] registry load failed:', err);
      if (typeof window !== 'undefined' && window.THEME_REGISTRY) {
        registry = window.THEME_REGISTRY;
        loaded = true;
        return registry;
      }
      return { themes: [] };
    }
  }

  function getThemes() {
    return registry && registry.themes ? registry.themes : [];
  }

  function getTheme(id) {
    return getThemes().find(t => t.id === id) || null;
  }

  async function apply(id) {
    if (!ENGINE) { console.warn('[ThemeManager] ThemeEngine not loaded.'); return null; }
    let theme = getTheme(id);
    if (!theme) {
      // Theme file may have been added after registry build — try parsing on demand
      if (id) {
        theme = await loadThemeFile(id);
      }
    }
    if (!theme) {
      console.warn('[ThemeManager] theme not found:', id);
      return null;
    }
    const vars = theme.cssVars || (ENGINE.tokensToCssVars ? ENGINE.tokensToCssVars(theme) : {});
    ENGINE.applyVars(document, vars);
    return theme;
  }

  async function loadThemeFile(id) {
    try {
      const theme = getTheme(id);
      if (!theme) return null;
      // Each app keeps its design-systems/ folder next to its shell
      // (user/design-systems, shop/design-systems, admin/design-systems).
      // theme.file is relative to that app's folder.
      const res = await fetch(designDir + theme.file + '?t=' + Date.now(), { cache: 'no-cache' });
      if (!res.ok) throw new Error('HTTP ' + res.status);
      const md = await res.text();
      const tokens = ENGINE.parseDesignDoc(md);
      if (!tokens) return null;
      const cssVars = ENGINE.tokensToCssVars(tokens);
      theme.cssVars = cssVars;
      return theme;
    } catch (err) {
      console.warn('[ThemeManager] on-demand theme load failed:', err);
      return null;
    }
  }

  function save(id) {
    try { localStorage.setItem(appKey, JSON.stringify({ id, appliedAt: new Date().toISOString() })); } catch (e) { /* ignore */ }
  }

  function getSaved() {
    try {
      const raw = localStorage.getItem(appKey);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      return parsed && parsed.id ? parsed.id : null;
    } catch (e) { return null; }
  }

  function clearSaved() {
    try { localStorage.removeItem(appKey); } catch (e) { /* ignore */ }
  }

  function reset() {
    if (ENGINE && ENGINE.clearApplied) ENGINE.clearApplied(document);
    clearSaved();
    return defaultThemeId;
  }

  async function init(options) {
    options = options || {};
    appKey = options.storageKey || 'ez_default_theme';
    defaultThemeId = options.defaultThemeId || null;
    const registryUrl = options.registryUrl || DEFAULT_REGISTRY;
    if (options.designDir) designDir = options.designDir;

    await loadRegistry(registryUrl);

    // Priority: saved selection > explicit default > leave CSS defaults untouched
    const saved = getSaved();
    const target = saved || defaultThemeId;
    if (target) {
      await apply(target);
    }
    return { themes: getThemes(), applied: target || null };
  }

  return {
    init,
    loadRegistry,
    getThemes,
    getTheme,
    apply,
    save,
    reset,
    getSaved,
    clearSaved,
    isLoaded: () => loaded
  };
});