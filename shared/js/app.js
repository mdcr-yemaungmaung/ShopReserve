/* ============================================================
   EzBookNow App — Bootstrap & Route Registration
   ============================================================ */

var App = (() => {
  function render() {
    Router.handleRoute();
  }

  // === Helper to mount User portal pages ===
  function renderUserPage(content) {
    const app = document.getElementById('app');
    if (app) {
      app.innerHTML = `
        <div class="user-layout">
          ${Components.userHeader()}
          <main class="user-content animate-fade-in">${content}</main>
          ${Components.userFooter()}
          ${Components.userMobileNav()}
        </div>
      `;
    }
  }

  // === Helper to mount Admin/Shop portal pages ===
  function renderAdminPage(portal, title, content) {
    const app = document.getElementById('app');
    if (app) {
      app.innerHTML = `
        <div class="admin-layout">
          ${Components.adminSidebar(portal)}
          <div class="sidebar-overlay" id="sidebar-overlay" onclick="Components.closeSidebar()"></div>
          <div style="flex:1;display:flex;flex-direction:column;min-width:0;">
            ${Components.adminHeader(title, portal)}
            <main class="admin-content animate-fade-in">
              <div class="admin-content__inner">${content}</div>
            </main>
          </div>
        </div>
      `;
    }
  }

  // === Helper for Login pages ===
  function renderLoginPage(content) {
    const app = document.getElementById('app');
    if (app) {
      app.innerHTML = `
        <div class="login-layout animate-fade-in">
          <div class="login-card">${content}</div>
        </div>
      `;
    }
  }

  // =========================================================
  // REGISTER ALL ROUTES
  // =========================================================

  // --- User Routes ---
  Router.register('/user/home', () => { if (typeof ScreenU01 !== 'undefined') ScreenU01.render(); });
  Router.register('/user/search', (p) => { if (typeof ScreenU02 !== 'undefined') ScreenU02.render(p); });
  Router.register('/user/shop/:id', (p) => { if (typeof ScreenU03 !== 'undefined') ScreenU03.render(p); });
  Router.register('/user/calendar/:id', (p) => { if (typeof ScreenU04 !== 'undefined') ScreenU04.render(p); });
  Router.register('/user/booking-input/:id', (p) => { if (typeof ScreenU05 !== 'undefined') ScreenU05.render(p); });
  Router.register('/user/booking-confirm', () => { if (typeof ScreenU06 !== 'undefined') ScreenU06.render(); });
  Router.register('/user/booking-complete', () => { if (typeof ScreenU07 !== 'undefined') ScreenU07.render(); });
  Router.register('/user/mypage', () => { if (typeof ScreenU08 !== 'undefined') ScreenU08.render(); });
  Router.register('/user/booking/:id', (p) => { if (typeof ScreenU09 !== 'undefined') ScreenU09.render(p); });
  Router.register('/user/login', () => { if (typeof ScreenU10 !== 'undefined') ScreenU10.render(); });
  Router.register('/user/register', () => { if (typeof ScreenU11 !== 'undefined') ScreenU11.render(); });
  Router.register('/user/password-reset', () => { if (typeof ScreenU12 !== 'undefined') ScreenU12.render(); });
  Router.register('/user/review/:id', (p) => { if (typeof ScreenU13 !== 'undefined') ScreenU13.render(p); });
  Router.register('/user/coupons', () => { if (typeof ScreenU14 !== 'undefined') ScreenU14.render(); });
  Router.register('/user/notifications', () => { if (typeof ScreenU15 !== 'undefined') ScreenU15.render(); });
  Router.register('/user/points', () => { if (typeof ScreenU16 !== 'undefined') ScreenU16.render(); });
  Router.register('/user/notification-settings', () => { if (typeof ScreenU17 !== 'undefined') ScreenU17.render(); });
  Router.register('/user/payment', () => { if (typeof ScreenU18 !== 'undefined') ScreenU18.render(); });
  Router.register('/user/announcements', () => { if (typeof ScreenU19 !== 'undefined') ScreenU19.render(); });
  Router.register('/user/account-settings', () => { if (typeof ScreenU20 !== 'undefined') ScreenU20.render(); });
  Router.register('/user/waitlist', () => { if (typeof ScreenU21 !== 'undefined') ScreenU21.render(); });
  Router.register('/user/appearance', () => { if (typeof ScreenAppearance !== 'undefined') ScreenAppearance.render(); });

  // --- Shop Routes ---
  Router.register('/shop/dashboard', () => { if (typeof ScreenS01 !== 'undefined') ScreenS01.render(); });
  Router.register('/shop/ledger', () => { if (typeof ScreenS02 !== 'undefined') ScreenS02.render(); });
  Router.register('/shop/booking/:id', (p) => { if (typeof ScreenS03A !== 'undefined') ScreenS03A.render(p); });
  Router.register('/shop/new-booking', () => { if (typeof ScreenS03B !== 'undefined') ScreenS03B.render(); });
  Router.register('/shop/availability', () => { if (typeof ScreenS04 !== 'undefined') ScreenS04.render(); });
  Router.register('/shop/shop-info', () => { if (typeof ScreenS05 !== 'undefined') ScreenS05.render(); });
  Router.register('/shop/coupons', () => { if (typeof ScreenS06 !== 'undefined') ScreenS06.render(); });
  Router.register('/shop/analytics', () => { if (typeof ScreenS07 !== 'undefined') ScreenS07.render(); });
  Router.register('/shop/staff-tables', () => { if (typeof ScreenS08 !== 'undefined') ScreenS08.render(); });
  Router.register('/shop/manual-booking', () => { if (typeof ScreenS09 !== 'undefined') ScreenS09.render(); });
  Router.register('/shop/security', () => { if (typeof ScreenS10 !== 'undefined') ScreenS10.render(); });
  Router.register('/shop/login', () => { if (typeof ScreenS11 !== 'undefined') ScreenS11.render(); });
  Router.register('/shop/customers', () => { if (typeof ScreenS12 !== 'undefined') ScreenS12.render(); });
  Router.register('/shop/follow-up', () => { if (typeof ScreenS13 !== 'undefined') ScreenS13.render(); });
  Router.register('/shop/viber-broadcast', () => { if (typeof ScreenS14 !== 'undefined') ScreenS14.render(); });
  Router.register('/shop/sns', () => { if (typeof ScreenS15 !== 'undefined') ScreenS15.render(); });
  Router.register('/shop/loyalty', () => { if (typeof ScreenS16 !== 'undefined') ScreenS16.render(); });
  Router.register('/shop/application', () => { if (typeof ScreenS17 !== 'undefined') ScreenS17.render(); });
  Router.register('/shop/billing', () => { if (typeof ScreenS18 !== 'undefined') ScreenS18.render(); });
  Router.register('/shop/reviews', () => { if (typeof ScreenS19 !== 'undefined') ScreenS19.render(); });
  Router.register('/shop/notifications', () => { if (typeof ScreenS20 !== 'undefined') ScreenS20.render(); });
  Router.register('/shop/tables', () => { if (typeof ScreenS21 !== 'undefined') ScreenS21.render(); });
  Router.register('/shop/staff-accounts', () => { if (typeof ScreenS22 !== 'undefined') ScreenS22.render(); });
  Router.register('/shop/appearance', () => { if (typeof ScreenAppearance !== 'undefined') ScreenAppearance.render(); });


  // --- Admin Routes ---
  Router.register('/admin/dashboard', () => { if (typeof ScreenAD01 !== 'undefined') ScreenAD01.render(); });
  Router.register('/admin/shop-review', () => { if (typeof ScreenAD02 !== 'undefined') ScreenAD02.render(); });
  Router.register('/admin/shops', () => { if (typeof ScreenAD02 !== 'undefined') ScreenAD02.render(); });
  Router.register('/admin/users', () => { if (typeof ScreenAD03 !== 'undefined') ScreenAD03.render(); });
  Router.register('/admin/reports', () => { if (typeof ScreenAD04 !== 'undefined') ScreenAD04.render(); });
  Router.register('/admin/coupons', () => { if (typeof ScreenAD05 !== 'undefined') ScreenAD05.render(); });
  Router.register('/admin/billing', () => { if (typeof ScreenAD06 !== 'undefined') ScreenAD06.render(); });
  Router.register('/admin/announcements', () => { if (typeof ScreenAD07 !== 'undefined') ScreenAD07.render(); });
  Router.register('/admin/audit-log', () => { if (typeof ScreenAD08 !== 'undefined') ScreenAD08.render(); });
  Router.register('/admin/ranking', () => { if (typeof ScreenAD09 !== 'undefined') ScreenAD09.render(); });
  Router.register('/admin/login', () => { if (typeof ScreenAD10 !== 'undefined') ScreenAD10.render(); });
  Router.register('/admin/invoices', () => { if (typeof ScreenAD11 !== 'undefined') ScreenAD11.render(); });
  Router.register('/admin/analytics', () => { if (typeof ScreenAD12 !== 'undefined') ScreenAD12.render(); });
  Router.register('/admin/points', () => { if (typeof ScreenAD13 !== 'undefined') ScreenAD13.render(); });
  Router.register('/admin/refunds', () => { if (typeof ScreenAD14 !== 'undefined') ScreenAD14.render(); });
  Router.register('/admin/operators', () => { if (typeof ScreenAD15 !== 'undefined') ScreenAD15.render(); });
  Router.register('/admin/master', () => { if (typeof ScreenAD16 !== 'undefined') ScreenAD16.render(); });
  Router.register('/admin/security', () => { if (typeof ScreenS10 !== 'undefined') ScreenS10.render(); });
  Router.register('/admin/shop-management', () => { if (typeof ScreenAD17 !== 'undefined') ScreenAD17.render(); });
  Router.register('/admin/appearance', () => { if (typeof ScreenAppearance !== 'undefined') ScreenAppearance.render(); });
  Router.register('/logo-concepts', () => { if (typeof ScreenLogoConcepts !== 'undefined') ScreenLogoConcepts.render(); });

  // Default redirect
  Router.register('/', () => Router.navigate('/user/home'));

  // Boot
  function init() {
    try {
      // Demo defaults — pre-fill sessionStorage for easy full-flow testing
      if (!sessionStorage.getItem('booking_date')) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        sessionStorage.setItem('booking_date', tomorrow.toISOString());
      }
      if (!sessionStorage.getItem('booking_time')) sessionStorage.setItem('booking_time', '7:00 PM');
      if (!sessionStorage.getItem('booking_guests')) sessionStorage.setItem('booking_guests', '4');
      if (!sessionStorage.getItem('booking_payment')) sessionStorage.setItem('booking_payment', 'at_store');

      if (typeof I18n !== 'undefined' && I18n.setLang) {
        I18n.setLang(I18n.getLang()); // Apply initial language
      }
      render();
      injectVersionBadge();
    } catch (err) {
      console.error('App init warning:', err);
      // Fallback render if initial route calculation encounters an issue
      try {
        if (typeof Router !== 'undefined' && Router.handleRoute) {
          Router.handleRoute();
        }
      } catch (e) {
        console.error('Fallback render failed:', e);
      }
    }
  }

  // Version tracking for prototype
  const APP_VERSION = "159";
  const VERSION_CHECK_URL = '/version.json';
  const VERSION_POLL_INTERVAL_MS = 15000;
  let updateBannerShown = false;

  function makeBadgeDraggable(elmnt) {
    let pos3 = 0, pos4 = 0;
    elmnt.addEventListener('mousedown', dragMouseDown);
    elmnt.addEventListener('touchstart', dragTouchStart, { passive: false });

    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.addEventListener('mouseup', closeDragElement);
      document.addEventListener('mousemove', elementDrag);
    }

    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      const dx = pos3 - e.clientX;
      const dy = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;

      const rect = elmnt.getBoundingClientRect();
      let newTop = rect.top - dy;
      let newLeft = rect.left - dx;

      newTop = Math.max(0, Math.min(window.innerHeight - rect.height, newTop));
      newLeft = Math.max(0, Math.min(window.innerWidth - rect.width, newLeft));

      elmnt.style.top = newTop + "px";
      elmnt.style.left = newLeft + "px";
      elmnt.style.bottom = "auto";
      elmnt.style.right = "auto";
    }

    function closeDragElement() {
      document.removeEventListener('mouseup', closeDragElement);
      document.removeEventListener('mousemove', elementDrag);
    }

    function dragTouchStart(e) {
      const touch = e.touches[0];
      pos3 = touch.clientX;
      pos4 = touch.clientY;
      document.addEventListener('touchend', closeTouchElement);
      document.addEventListener('touchmove', elementTouchMove, { passive: false });
    }

    function elementTouchMove(e) {
      const touch = e.touches[0];
      const dx = pos3 - touch.clientX;
      const dy = pos4 - touch.clientY;
      if (e.cancelable) e.preventDefault();
      pos3 = touch.clientX;
      pos4 = touch.clientY;

      const rect = elmnt.getBoundingClientRect();
      let newTop = rect.top - dy;
      let newLeft = rect.left - dx;

      newTop = Math.max(0, Math.min(window.innerHeight - rect.height, newTop));
      newLeft = Math.max(0, Math.min(window.innerWidth - rect.width, newLeft));

      elmnt.style.top = newTop + "px";
      elmnt.style.left = newLeft + "px";
      elmnt.style.bottom = "auto";
      elmnt.style.right = "auto";
    }

    function closeTouchElement() {
      document.removeEventListener('touchend', closeTouchElement);
      document.removeEventListener('touchmove', elementTouchMove);
    }
  }

  function injectVersionBadge() {
    try {
      if (!document.body) return;
      let badge = document.getElementById('app-version-badge');
      if (!badge) {
        badge = document.createElement('div');
        badge.id = 'app-version-badge';
        badge.innerHTML = `v${APP_VERSION}`;
        badge.style.cssText = `
          position: fixed;
          bottom: 16px;
          left: 16px;
          background: #10b981;
          color: #ffffff;
          padding: 6px 14px;
          border-radius: 9999px;
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 0.05em;
          border: 2px solid #ffffff;
          box-shadow: 0 4px 15px rgba(0,0,0,0.3);
          z-index: 99999;
          cursor: move;
          user-select: none;
          touch-action: none;
          backdrop-filter: blur(4px);
        `;
        document.body.appendChild(badge);
        makeBadgeDraggable(badge);
      }
    } catch (e) { }
  }

  function compareVersions(localVersion, remoteVersion) {
    try {
      const normalize = (value) => String(value || '').replace(/^v/i, '').split('.').map((part) => parseInt(part, 10) || 0);
      const a = normalize(localVersion);
      const b = normalize(remoteVersion);
      const maxLength = Math.max(a.length, b.length);
      for (let i = 0; i < maxLength; i += 1) {
        const left = a[i] || 0;
        const right = b[i] || 0;
        if (left !== right) return left - right;
      }
      return 0;
    } catch (e) {
      return 0;
    }
  }

  function showUpdateBanner(remoteVersion) {
    if (updateBannerShown) return;
    updateBannerShown = true;

    const banner = document.createElement('div');
    banner.id = 'app-update-banner';
    banner.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 100000;
      background: #f59e0b;
      color: #111827;
      padding: 12px 16px;
      text-align: center;
      font-family: 'Inter', sans-serif;
      font-size: 14px;
      font-weight: 700;
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
    `;
    banner.innerHTML = `
      <span>New version available (${remoteVersion}).</span>
      <button onclick="window.location.reload()" style="
        background: #111827;
        color: #ffffff;
        border: none;
        border-radius: 9999px;
        padding: 6px 12px;
        font-size: 13px;
        font-weight: 700;
        cursor: pointer;
      ">Refresh Now</button>
    `;
    document.body.appendChild(banner);
  }

  async function checkForUpdates() {
    try {
      const response = await fetch(`${VERSION_CHECK_URL}?t=${Date.now()}`, { cache: 'no-cache' });
      if (!response.ok) return;

      const data = await response.json();
      const remoteVersion = data && data.version ? data.version : null;
      if (!remoteVersion) return;

      if (compareVersions(APP_VERSION, remoteVersion) < 0) {
        showUpdateBanner(remoteVersion);
      }
    } catch (e) {
      console.debug('Version check failed', e);
    }
  }

  function startVersionWatcher() {
    checkForUpdates();
    window.setInterval(checkForUpdates, VERSION_POLL_INTERVAL_MS);
  }

  // Start app when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      init();
      startVersionWatcher();
    });
  } else {
    init();
    startVersionWatcher();
  }

  return { init, render, renderUserPage, renderAdminPage, renderLoginPage };
})();
