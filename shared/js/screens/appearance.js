/* ============================================================
   EzBookNow Appearance & Theme — shared/js/screens/appearance.js
   Theme picker used by all three apps:
     U-22 (User), S-23 (Shop), AD-18 (Admin)
   Lists the CURRENT app's own registered themes (from its own
   design-systems/ + registry.json). Each app's catalog is fully
   separate — Shop never sees User or Admin themes, and vice versa.
   Selecting a theme applies it INSTANTLY via CSS variables and
   persists to that app's localStorage key.
   ============================================================ */

const ScreenAppearance = (() => {
  let registryLoaded = false;
  let registryThemes = [];
  let busy = false;

  async function ensureRegistry() {
    if (typeof window !== 'undefined' && window.THEME_REGISTRY && window.THEME_REGISTRY.themes) {
      registryThemes = window.THEME_REGISTRY.themes;
      registryLoaded = true;
      return;
    }
    if (registryLoaded && registryThemes.length > 0) return;
    try {
      // Each app owns its registry next to its shell page
      // (user/registry.json, shop/registry.json, admin/registry.json).
      const url = 'registry.json?t=' + Date.now();
      const res = await fetch(url, { cache: 'no-cache' });
      if (res.ok) {
        const data = await res.json();
        registryThemes = (data && data.themes) || [];
        registryLoaded = true;
      }
    } catch (e) {
      console.warn('[Appearance] registry load failed', e);
      if (typeof window !== 'undefined' && window.THEME_REGISTRY) {
        registryThemes = window.THEME_REGISTRY.themes || [];
        registryLoaded = true;
      }
    }
  }

  function themeKeyFor(portal) {
    if (typeof StorageMap !== 'undefined' && StorageMap[portal]) {
      return StorageMap[portal].theme;
    }
    return 'ez' + portal.charAt(0) + '_theme';
  }

  function currentSavedId(portal) {
    try {
      const key = themeKeyFor(portal);
      const raw = localStorage.getItem(key);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      return parsed && parsed.id ? parsed.id : null;
    } catch (e) { return null; }
  }

  function render() {
    const portal = Router.getPortal();
    const savedId = currentSavedId(portal);

    const content = `
      <div style="font-family:'Inter',sans-serif; max-width:880px;">
        <div class="mb-6">
          <h2 class="text-headline-md" style="font-family:'Outfit',sans-serif;">Appearance & Theme</h2>
          <p class="text-body-sm text-muted" style="margin-top:6px;">
            Design systems are auto-registered from this app's own
            <code style="font-family:'JetBrains Mono','Fira Code',monospace;font-size:12px;background:var(--color-surface-container);padding:2px 6px;border-radius:6px;">${portal}/design-systems/*.md</code>.
            The theme you pick applies instantly to the entire ${portal} interface.
          </p>
        </div>

        <div id="appearance-themes">
          <div class="glass-card" style="border-radius:var(--radius-lg,12px);padding:32px;text-align:center;color:var(--color-on-surface-variant);">
            <div style="display:inline-block;width:28px;height:28px;border:3px solid var(--color-outline-variant);border-top-color:var(--color-primary);border-radius:50%;animation:spin .8s linear infinite;"></div>
            <p class="text-body-sm" style="margin-top:12px;">Loading registered themes…</p>
          </div>
        </div>

        <div class="mt-6" id="appearance-actions"></div>

        <div class="glass-card" style="border-radius:var(--radius-lg,12px);padding:16px 20px;margin-top:24px;font-size:12.5px;color:var(--color-on-surface-variant);line-height:1.7;">
          <strong style="color:var(--color-primary);">How it works:</strong>
          Drop a <code style="font-family:'JetBrains Mono',monospace;">Design.md</code> into this app's <code style="font-family:'JetBrains Mono',monospace;">${portal}/design-systems/</code>, run
          <code style="font-family:'JetBrains Mono',monospace;">node shared/scripts/build-theme-registry.js</code>, and it appears here automatically.
          Themes are completely per-app: each app keeps its own catalog and its own saved selection
          (<code style="font-family:'JetBrains Mono',monospace;">${themeKeyFor(portal)}</code>) — changing Shop never affects User or Admin.
        </div>
      </div>
    `;

    if (portal === 'user') {
      App.renderUserPage(content);
    } else {
      App.renderAdminPage(portal, 'Appearance & Theme', content);
    }
    loadThemes(portal, savedId);
  }

  async function loadThemes(portal, savedId) {
    await ensureRegistry();
    const container = document.getElementById('appearance-themes');
    const actions = document.getElementById('appearance-actions');
    if (!container) return;

    if (!registryLoaded || registryThemes.length === 0) {
      container.innerHTML = `
        <div class="glass-card" style="border-radius:var(--radius-lg,12px);padding:32px;text-align:center;color:var(--color-on-surface-variant);">
          <div style="font-size:28px;margin-bottom:8px;">🎨</div>
          <p class="text-body-md">No themes registered yet.</p>
          <p class="text-body-sm" style="margin-top:6px;">Add a <code style="font-family:'JetBrains Mono',monospace;">Design.md</code> to this app's <code style="font-family:'JetBrains Mono',monospace;">design-systems/</code> folder and rebuild the registry.</p>
        </div>`;
      return;
    }

    const cards = registryThemes.map(theme => {
      const active = savedId === theme.id;
      return `
        <div onclick="ScreenAppearance.apply('${theme.id.replace(/'/g, "\\'")}')"
             style="cursor:pointer;border-radius:var(--radius-lg,12px);padding:16px;border:2px solid ${active ? 'var(--color-primary,#131546)' : 'var(--color-outline-variant,#e0e0e0)'};background:var(--color-surface,#fff);transition:border-color .2s, transform .2s;${active ? 'box-shadow:0 6px 18px rgba(19,21,70,0.12);' : ''}">
          <div style="display:flex;gap:10px;margin-bottom:12px;">
            <span style="width:34px;height:34px;border-radius:10px;background:${theme.primary};border:1px solid rgba(0,0,0,0.08);"></span>
            <span style="width:34px;height:34px;border-radius:10px;background:${theme.secondary};border:1px solid rgba(0,0,0,0.08);"></span>
            <span style="width:34px;height:34px;border-radius:10px;background:var(--color-surface-container-high);border:1px solid rgba(0,0,0,0.08);"></span>
          </div>
          <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;">
            <strong style="font-family:'Outfit',sans-serif;font-size:15px;color:var(--color-on-surface);">${theme.name}</strong>
            ${active ? '<span style="font-size:10.5px;font-weight:700;letter-spacing:.04em;padding:3px 9px;border-radius:999px;background:var(--color-secondary-container,#dcfce7);color:var(--color-on-secondary-container,#166534);">ACTIVE</span>' : ''}
          </div>
          <div style="font-size:12px;color:var(--color-on-surface-variant);margin-top:4px;font-family:'JetBrains Mono','Fira Code',monospace;">
            ${theme.primary} · ${theme.secondary}
          </div>
        </div>`;
    }).join('');

    container.innerHTML = `
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:14px;">${cards}</div>`;

    const saved = currentSavedId(portal);
    const resetBtn = `<button class="btn" style="margin-right:10px;${saved ? '' : 'opacity:.5;cursor:not-allowed;'}" onclick="ScreenAppearance.resetTheme()"${saved ? '' : ' disabled'}>Use App Default</button>`;
    actions.innerHTML = `
      <div style="display:flex;flex-wrap:wrap;gap:10px;align-items:center;">
        ${resetBtn}
        <span class="text-body-sm text-muted">${registryThemes.length} registered theme${registryThemes.length === 1 ? '' : 's'} · saved key: <code style="font-family:'JetBrains Mono',monospace;">${themeKeyFor(portal)}</code></span>
      </div>`;
  }

  async function apply(id) {
    if (busy || typeof ThemeManager === 'undefined') return;
    busy = true;
    try {
      const theme = await ThemeManager.apply(id);
      if (theme) {
        ThemeManager.save(id);
        const portal = Router.getPortal();
        const saved = currentSavedId(portal);
        loadThemes(portal, saved);
        if (typeof showToast === 'function') {
          showToast('success', 'Theme Applied', `"${theme.name}" is now active across the ${portal} app.`);
        }
      }
    } catch (e) {
      console.warn('[Appearance] apply failed', e);
    } finally {
      busy = false;
    }
  }

  async function resetTheme() {
    if (typeof ThemeManager === 'undefined') return;
    ThemeManager.reset();
    const portal = Router.getPortal();
    loadThemes(portal, null);
    if (typeof showToast === 'function') {
      showToast('success', 'Theme Reset', 'Using the app default design system.');
    }
  }

  return { render, apply, resetTheme };
})();