/* ============================================================
   EzBookNow Router — Hash-based SPA Router
   ============================================================ */

var Router = (() => {
  const routes = {};
  let currentRoute = null;
  let currentParams = {};

  // Mock auth state
  const authState = {
    user: {
      isLoggedIn: false,
      name: '',
      email: '',
      avatar: null,
      role: 'user'
    },
    shop: {
      isLoggedIn: true,
      name: 'Chef Aung',
      shopName: 'The Glass Pavilion',
      role: 'shop_owner'
    },
    admin: {
      isLoggedIn: true,
      name: 'Elena Vance',
      role: 'super_admin',
      ip: '192.168.1.120'
    }
  };

  function register(path, handler) {
    routes[path] = handler;
  }

  function navigate(path) {
    if (path === '/user/login' && sessionStorage.getItem('booking_redirect_flow') !== 'true') {
      if (currentRoute && currentRoute !== '/user/login' && !currentRoute.startsWith('/user/booking-input')) {
        sessionStorage.setItem('login_return_route', currentRoute);
      }
    }
    window.location.hash = path;
  }

  function getPortal() {
    const hash = window.location.hash.slice(1) || '/user/home';
    if (hash.startsWith('/admin')) return 'admin';
    if (hash.startsWith('/shop')) return 'shop';
    return 'user';
  }

  function getAuth() {
    return authState[getPortal()];
  }

  function parseRoute(hash) {
    let path = hash.slice(1) || '/user/home';
    const params = {};
    
    // Parse and strip query parameters if present
    const queryIndex = path.indexOf('?');
    if (queryIndex !== -1) {
      const queryString = path.slice(queryIndex + 1);
      path = path.slice(0, queryIndex);
      
      queryString.split('&').forEach(pair => {
        const [key, val] = pair.split('=');
        if (key) {
          params[decodeURIComponent(key)] = decodeURIComponent(val || '');
        }
      });
    }
    
    // Check for exact match first
    if (routes[path]) return { path, params, handler: routes[path] };
    
    // Check for parameterized routes
    for (const [routePath, handler] of Object.entries(routes)) {
      const routeParts = routePath.split('/');
      const pathParts = path.split('/');
      
      if (routeParts.length !== pathParts.length) continue;
      
      let match = true;
      const extracted = {};
      
      for (let i = 0; i < routeParts.length; i++) {
        if (routeParts[i].startsWith(':')) {
          extracted[routeParts[i].slice(1)] = pathParts[i];
        } else if (routeParts[i] !== pathParts[i]) {
          match = false;
          break;
        }
      }
      
      if (match) {
        Object.assign(params, extracted);
        return { path: routePath, params, handler };
      }
    }
    
    return { path, params, handler: null };
  }

  const routeToScreenId = {
    '/user/home': 'U-01 Top Page',
    '/user/search': 'U-02 Search List',
    '/user/shop/:id': 'U-03 Shop Detail',
    '/user/calendar/:id': 'U-04 Calendar',
    '/user/booking-input/:id': 'U-05 Booking Input',
    '/user/booking-confirm': 'U-06 Booking Confirm',
    '/user/booking-complete': 'U-07 Booking Complete',
    '/user/mypage': 'U-08 My Page',
    '/user/booking/:id': 'U-09 Booking Detail',
    '/user/login': 'U-10 Login',
    '/user/register': 'U-11 Register',
    '/user/password-reset': 'U-12 Password Reset',
    '/user/review/:id': 'U-13 Review Write',
    '/user/coupons': 'U-14 Coupons',
    '/user/notifications': 'U-15 Notification Center',
    '/user/points': 'U-16 Points & Rank',
    '/user/notification-settings': 'U-17 Notif Settings',
    '/user/payment': 'U-18 Online Payment',
    '/user/announcements': 'U-19 Announcements',
    '/user/account-settings': 'U-20 Account Settings',
    '/user/waitlist': 'U-21 Waitlist',
    '/user/appearance': 'U-22 Appearance & Theme',

    '/shop/dashboard': 'S-01 Dashboard',
    '/shop/ledger': 'S-02 Ledger',
    '/shop/booking/:id': 'S-03-A Booking Details',
    '/shop/new-booking': 'S-03-B New Booking',
    '/shop/availability': 'S-04 Availability',
    '/shop/shop-info': 'S-05 Shop Info',
    '/shop/coupons': 'S-06 Coupons',
    '/shop/analytics': 'S-07 Analytics',
    '/shop/staff-tables': 'S-08 Staff & Tables',
    '/shop/manual-booking': 'S-09 Manual Booking',
    '/shop/security': 'S-10 Security',
    '/shop/login': 'S-11 Login',
    '/shop/customers': 'S-12 CRM Customers',
    '/shop/follow-up': 'S-13 Follow-up',
    '/shop/viber-broadcast': 'S-14 Viber Broadcast',
    '/shop/sns': 'S-15 SNS Marketing',
    '/shop/loyalty': 'S-16 Loyalty Settings',
    '/shop/application': 'S-17 Application',
    '/shop/billing': 'S-18 Billing/Plan',
    '/shop/reviews': 'S-19 Reviews Admin',
    '/shop/notifications': 'S-20 Notification Center',
    '/shop/appearance': 'S-23 Appearance & Theme',
    '/shop/tables': 'S-21 Table Management',
    '/shop/staff-accounts': 'S-22 Staff Accounts',


    '/admin/dashboard': 'Dashboard',
    '/admin/shop-review': 'Shop Review',
    '/admin/shops': 'Shop Review',
    '/admin/users': 'Users',
    '/admin/reports': 'Reports',
    '/admin/coupons': 'Coupons',
    '/admin/billing': 'Billing',
    '/admin/announcements': 'Announcements',
    '/admin/audit-log': 'Audit Log',
    '/admin/ranking': 'Ranking',
    '/admin/login': 'AD-10 System Admin Login',
    '/admin/invoices': 'Invoices',
    '/admin/analytics': 'Analytics',
    '/admin/points': 'Points',
    '/admin/refunds': 'Refunds',
    '/admin/operators': 'Operators',
    '/admin/master': 'Master Data',
    '/admin/shop-management': 'AD-17 Shop & Shop Account Management',
    '/admin/appearance': 'AD-18 Appearance & Theme',
    '/admin/security': 'AD-X1 Security Settings (shared S-10)',
    '/logo-concepts': 'LOGO-01 Logo Concepts'
  };

  const screenNavRoutes = {
    'Design & Branding': [
      { id: 'LOGO-01', name: 'Logo Concepts Showcase', path: '/logo-concepts', pkg: 'Pkg1', isExtra: true }
    ],
    'User Portal (U-xx)': [
      { id: 'U-01', name: 'Top Page (Home)', path: '/user/home', pkg: 'Pkg1' },
      { id: 'U-02', name: 'Search Results', path: '/user/search', pkg: 'Pkg1' },
      { id: 'U-03', name: 'Shop Detail', path: '/user/shop/r1', pkg: 'Pkg1' },
      { id: 'U-04', name: 'Calendar/Slots Selection', path: '/user/calendar/r1', pkg: 'Pkg1' },
      { id: 'U-05', name: 'Booking Input', path: '/user/booking-input/r1', pkg: 'Pkg1' },
      { id: 'U-06', name: 'Booking Confirm', path: '/user/booking-confirm', pkg: 'Pkg1' },
      { id: 'U-07', name: 'Booking Complete', path: '/user/booking-complete', pkg: 'Pkg1' },
      { id: 'U-08', name: 'My Page', path: '/user/mypage', pkg: 'Pkg1' },
      { id: 'U-09', name: 'Booking Details/Cancel', path: '/user/booking/RES-2026-001', pkg: 'Pkg1' },
      { id: 'U-10', name: 'Login', path: '/user/login', pkg: 'Pkg1' },
      { id: 'U-11', name: 'Register', path: '/user/register', pkg: 'Pkg1' },
      { id: 'U-12', name: 'Password Reset', path: '/user/password-reset', pkg: 'Pkg1' },
      { id: 'U-13', name: 'Write Review', path: '/user/review/RES-2026-003', pkg: 'Pkg2' },
      { id: 'U-14', name: 'Coupons List', path: '/user/coupons', pkg: 'Pkg2' },
      { id: 'U-15', name: 'Notification Center', path: '/user/notifications', pkg: 'Pkg1' },
      { id: 'U-16', name: 'Points & Rank', path: '/user/points', pkg: 'Pkg3' },
      { id: 'U-17', name: 'Notification Settings', path: '/user/notification-settings', pkg: 'Pkg1' },
      { id: 'U-18', name: 'Online Payment', path: '/user/payment', pkg: 'Pkg2' },
      { id: 'U-19', name: 'Announcements', path: '/user/announcements', pkg: 'Pkg2' },
      { id: 'U-20', name: 'Account Settings/Delete', path: '/user/account-settings', pkg: 'Pkg1' },
      { id: 'U-21', name: 'Waitlist', path: '/user/waitlist', pkg: 'Pkg2' },
      { id: 'U-22', name: 'Appearance & Theme', path: '/user/appearance', pkg: 'Pkg1', isExtra: true, note: 'Theme registry picker' }
    ],
    'Shop Portal (S-xx)': [
      { id: 'S-01', name: 'Shop Dashboard', path: '/shop/dashboard', pkg: 'Pkg1' },
      { id: 'S-02', name: 'Booking Ledger', path: '/shop/ledger', pkg: 'Pkg1' },
      { id: 'S-03-A', name: 'Booking Detail Modal', path: '/shop/booking/RES-2026-001', pkg: 'Pkg1' },
      { id: 'S-03-B', name: 'New Booking Modal', path: '/shop/new-booking', pkg: 'Pkg1' },
      { id: 'S-04', name: 'Availability Settings', path: '/shop/availability', pkg: 'Pkg1' },
      { id: 'S-05', name: 'Shop Info Edit', path: '/shop/shop-info', pkg: 'Pkg1' },
      { id: 'S-06', name: 'Coupons Management', path: '/shop/coupons', pkg: 'Pkg2' },
      { id: 'S-07', name: 'Analytics Reports', path: '/shop/analytics', pkg: 'Pkg2' },
      { id: 'S-08', name: 'Staff & Tables', path: '/shop/staff-tables', pkg: 'Pkg1' },
      { id: 'S-09', name: 'Manual Booking Input', path: '/shop/manual-booking', pkg: 'Pkg1' },
      { id: 'S-10', name: 'Security Settings', path: '/shop/security', pkg: 'Pkg1' },
      { id: 'S-11', name: 'Shop Login', path: '/shop/login', pkg: 'Pkg1' },
      { id: 'S-12', name: 'CRM Customers', path: '/shop/customers', pkg: 'Pkg3' },
      { id: 'S-13', name: 'Follow-up Automation', path: '/shop/follow-up', pkg: 'Pkg3' },
      { id: 'S-14', name: 'Viber Broadcast', path: '/shop/viber-broadcast', pkg: 'Pkg3' },
      { id: 'S-15', name: 'SNS Scheduler', path: '/shop/sns', pkg: 'Pkg3' },
      { id: 'S-16', name: 'Loyalty/Points config', path: '/shop/loyalty', pkg: 'Pkg3' },
      { id: 'S-17', name: 'New Shop Application', path: '/shop/application', pkg: 'Pkg1' },
      { id: 'S-18', name: 'Billing / Subscription', path: '/shop/billing', pkg: 'Pkg2' },
      { id: 'S-19', name: 'Reviews Management', path: '/shop/reviews', pkg: 'Pkg2' },
      { id: 'S-20', name: 'Shop Notification Center', path: '/shop/notifications', pkg: 'Pkg1' },
      { id: 'S-21', name: 'Table Management & Seat Tags', path: '/shop/tables', pkg: 'Pkg1' },
      { id: 'S-22', name: 'Staff Accounts Management', path: '/shop/staff-accounts', pkg: 'Pkg1' },
      { id: 'S-23', name: 'Appearance & Theme', path: '/shop/appearance', pkg: 'Pkg1', isExtra: true, note: 'Theme registry picker' }
    ],

    'Admin Portal (AD-xx)': [
      { id: 'AD-01', name: 'Admin Dashboard', path: '/admin/dashboard', pkg: 'Pkg1' },
      { id: 'AD-02', name: 'Shop Review & Approval', path: '/admin/shop-review', pkg: 'Pkg1' },
      { id: 'AD-03', name: 'Users Management', path: '/admin/users', pkg: 'Pkg1' },
      { id: 'AD-04', name: 'Reports Summary', path: '/admin/reports', pkg: 'Pkg1' },
      { id: 'AD-05', name: 'Coupons Admin', path: '/admin/coupons', pkg: 'Pkg2' },
      { id: 'AD-06', name: 'Billing Sync & Transfers', path: '/admin/billing', pkg: 'Pkg2' },
      { id: 'AD-07', name: 'System Announcements', path: '/admin/announcements', pkg: 'Pkg2' },
      { id: 'AD-08', name: 'Audit Operational Log', path: '/admin/audit-log', pkg: 'Pkg1' },
      { id: 'AD-09', name: 'Ranking Algorithms', path: '/admin/ranking', pkg: 'Pkg2' },
      { id: 'AD-10', name: 'System Admin Login', path: '/admin/login', pkg: 'Pkg1' },
      { id: 'AD-11', name: 'Invoice Management', path: '/admin/invoices', pkg: 'Pkg2' },
      { id: 'AD-12', name: 'Marketing Analytics', path: '/admin/analytics', pkg: 'Pkg2' },
      { id: 'AD-13', name: 'Points Management', path: '/admin/points', pkg: 'Pkg3' },
      { id: 'AD-14', name: 'Refunds Review', path: '/admin/refunds', pkg: 'Pkg3' },
      { id: 'AD-15', name: 'Operator Settings', path: '/admin/operators', pkg: 'Pkg1' },
      { id: 'AD-16', name: 'Master Data Management', path: '/admin/master', pkg: 'Pkg1' },
      { id: 'AD-17', name: 'Shop & Shop Account Management', path: '/admin/shop-management', pkg: 'Pkg1' },
      { id: 'AD-X1', name: 'Security Settings (shared S-10)', path: '/admin/security', pkg: 'Pkg1', isExtra: true, note: 'Prototype extension — reuses Shop Security (S-10) screen, not a separate doc screen' },
      { id: 'AD-18', name: 'Appearance & Theme', path: '/admin/appearance', pkg: 'Pkg1', isExtra: true, note: 'Theme registry picker' }
    ]
  };

  function findScreenObjectByPath(path) {
    for (const [section, screens] of Object.entries(screenNavRoutes)) {
      const found = screens.find(s => s.path === path);
      if (found) return found;
    }
    if (path.startsWith('/user/shop/')) return { id: 'U-03', name: 'Shop Detail', pkg: 'Pkg1' };
    if (path.startsWith('/user/calendar/')) return { id: 'U-04', name: 'Calendar/Slots Selection', pkg: 'Pkg1' };
    if (path.startsWith('/user/booking-input/')) return { id: 'U-05', name: 'Booking Input', pkg: 'Pkg1' };
    if (path.startsWith('/user/booking/')) return { id: 'U-09', name: 'Booking Details/Cancel', pkg: 'Pkg1' };
    if (path.startsWith('/user/review/')) return { id: 'U-13', name: 'Write Review', pkg: 'Pkg2' };
    if (path.startsWith('/shop/booking/')) return { id: 'S-03-A', name: 'Booking Detail Modal', pkg: 'Pkg1' };
    return null;
  }

  let activePkgFilter = 'All';

  function getPkgBadgeStyle(pkg) {
    if (pkg === 'Pkg1') return 'background:#e0f2fe; color:#0369a1; border:1px solid #7dd3fc;';
    if (pkg === 'Pkg2') return 'background:#dcfce7; color:#15803d; border:1px solid #86efac;';
    if (pkg === 'Pkg3') return 'background:#f3e8ff; color:#6b21a8; border:1px solid #d8b4fe;';
    return 'background:#f3f4f6; color:#374151; border:1px solid #e5e7eb;';
  }

  function setPkgFilter(pkg) {
    activePkgFilter = pkg;
    document.querySelectorAll('.pkg-filter-btn').forEach(btn => {
      const p = btn.dataset.pkg;
      if (p === pkg) {
        btn.style.fontWeight = '700';
        btn.style.boxShadow = '0 2px 6px rgba(0,0,0,0.15)';
        if (p === 'All') {
          btn.style.background = 'var(--color-primary, #0F4C5C)';
          btn.style.color = '#ffffff';
          btn.style.borderColor = 'transparent';
        } else if (p === 'Pkg1') {
          btn.style.background = '#0284c7';
          btn.style.color = '#ffffff';
          btn.style.borderColor = 'transparent';
        } else if (p === 'Pkg2') {
          btn.style.background = '#16a34a';
          btn.style.color = '#ffffff';
          btn.style.borderColor = 'transparent';
        } else if (p === 'Pkg3') {
          btn.style.background = '#7c3aed';
          btn.style.color = '#ffffff';
          btn.style.borderColor = 'transparent';
        } else if (p === 'AI') {
          btn.style.background = '#b45309';
          btn.style.color = '#ffffff';
          btn.style.borderColor = 'transparent';
        }
      } else {
        btn.style.fontWeight = '600';
        btn.style.boxShadow = 'none';
        if (p === 'All') {
          btn.style.background = '#f3f4f6';
          btn.style.color = '#4b5563';
          btn.style.borderColor = '#e5e7eb';
        } else if (p === 'Pkg1') {
          btn.style.background = '#e0f2fe';
          btn.style.color = '#0369a1';
          btn.style.borderColor = '#7dd3fc';
        } else if (p === 'Pkg2') {
          btn.style.background = '#dcfce7';
          btn.style.color = '#15803d';
          btn.style.borderColor = '#86efac';
        } else if (p === 'Pkg3') {
          btn.style.background = '#f3e8ff';
          btn.style.color = '#6b21a8';
          btn.style.borderColor = '#d8b4fe';
        } else if (p === 'AI') {
          btn.style.background = '#fef3c7';
          btn.style.color = '#b45309';
          btn.style.borderColor = '#fde68a';
        }
      }
    });

    const searchInput = document.getElementById('screen-search-input');
    filterScreens(searchInput ? searchInput.value : '');
  }

  function toggleDrawer() {
    const drawer = document.getElementById('screen-jump-drawer');
    const overlay = document.getElementById('screen-jump-overlay');
    if (drawer && overlay) {
      const isOpen = drawer.classList.contains('open');
      if (!isOpen) {
        const searchInput = document.getElementById('screen-search-input');
        if (searchInput) {
          searchInput.value = '';
        }
        setPkgFilter('All');
      }
      drawer.classList.toggle('open');
      overlay.classList.toggle('open');
    }
  }

  function filterScreens(query) {
    const q = (query || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    const items = document.querySelectorAll('.drawer-item');

    items.forEach(item => {
      const id = item.querySelector('.drawer-item-id').textContent.toLowerCase().replace(/[^a-z0-9]/g, '');
      const name = item.textContent.toLowerCase();
      const itemPkg = item.dataset.pkg;
      const isExtra = item.dataset.extra === 'true';

      const matchesSearch = !q || id.includes(q) || name.includes((query || '').toLowerCase());
      const matchesPkg = (activePkgFilter === 'All') || (activePkgFilter === 'AI' ? isExtra : itemPkg === activePkgFilter);

      if (matchesSearch && matchesPkg) {
        item.style.display = 'flex';
      } else {
        item.style.display = 'none';
      }
    });

    let currentSection = null;
    let hasVisibleItems = false;
    
    const bodyChildren = document.querySelector('.drawer-body').children;
    for (let i = 0; i < bodyChildren.length; i++) {
      const child = bodyChildren[i];
      if (child.classList.contains('drawer-section-title')) {
        if (currentSection) {
          currentSection.style.display = hasVisibleItems ? 'block' : 'none';
        }
        currentSection = child;
        hasVisibleItems = false;
      } else if (child.classList.contains('drawer-item')) {
        if (child.style.display !== 'none') {
          hasVisibleItems = true;
        }
      }
    }
    if (currentSection) {
      currentSection.style.display = hasVisibleItems ? 'block' : 'none';
    }
  }

  function makeElementDraggable(elmnt) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    let isDragged = false;

    elmnt.addEventListener('mousedown', dragMouseDown);
    elmnt.addEventListener('touchstart', dragTouchStart, { passive: false });

    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      isDragged = false;
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
      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) isDragged = true;
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
      isDragged = false;
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
      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
        isDragged = true;
        if (e.cancelable) e.preventDefault();
      }
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

    elmnt.addEventListener('click', (e) => {
      if (isDragged) {
        e.stopImmediatePropagation();
        e.preventDefault();
      } else {
        toggleDrawer();
      }
    });
  }

  function injectScreenBadge(path) {
    // The cross-app Screen Jump (devtools/screen-jump.js) replaces this
    // legacy in-app badge/drawer when present (all app shells + Hub load it).
    if (typeof ScreenJump !== 'undefined') return;
    const screenId = routeToScreenId[path] || 'Unknown';
    let badge = document.getElementById('screen-id-badge');
    if (!badge) {
      badge = document.createElement('div');
      badge.id = 'screen-id-badge';
      const style = document.createElement('style');
      style.innerHTML = `
        #screen-id-badge {
          position: fixed;
          bottom: 12px;
          right: 12px;
          background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%);
          color: #ffffff;
          padding: 7px 14px;
          border-radius: 24px;
          font-family: 'Outfit', 'Inter', sans-serif;
          font-size: 11.5px;
          font-weight: 700;
          letter-spacing: 0.03em;
          z-index: 999999;
          box-shadow: 0 8px 24px rgba(15, 23, 42, 0.45), 0 0 0 1.5px #6366f1, 0 0 12px rgba(99, 102, 241, 0.3);
          backdrop-filter: blur(8px);
          cursor: move;
          user-select: none;
          touch-action: none;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        #screen-id-badge:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 28px rgba(15, 23, 42, 0.6), 0 0 0 2px #818cf8, 0 0 18px rgba(129, 140, 248, 0.5);
        }
        @media (max-width: 768px) {
          #screen-id-badge {
            bottom: calc(var(--mobile-nav-height) + 12px);
            right: 12px;
            font-size: 10.5px;
            padding: 5px 12px;
          }
        }
        
        #screen-jump-drawer {
          position: fixed;
          top: 0;
          right: -360px;
          width: 360px;
          height: 100vh;
          background: var(--color-surface, #ffffff);
          box-shadow: -4px 0 24px rgba(0, 0, 0, 0.15);
          z-index: 9999999;
          transition: right 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          flex-direction: column;
          font-family: 'Inter', sans-serif;
          border-left: 1px solid var(--color-outline-variant, #e0e0e0);
        }
        #screen-jump-drawer.open {
          right: 0;
        }
        .drawer-header {
          padding: 16px;
          background: rgba(19, 21, 70, 0.02);
          border-bottom: 1px solid var(--color-outline-variant, #e0e0e0);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .drawer-body {
          padding: 16px;
          overflow-y: auto;
          flex: 1;
        }
        .drawer-section-title {
          font-family: 'Outfit', sans-serif;
          font-size: 12px;
          font-weight: 700;
          color: var(--color-primary, #0F4C5C);
          margin-top: 16px;
          margin-bottom: 8px;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          border-bottom: 1.5px solid var(--color-outline-variant, #e0e0e0);
          padding-bottom: 4px;
        }
        .drawer-item {
          display: flex;
          align-items: center;
          padding: 8px 12px;
          border-radius: var(--radius-md, 8px);
          font-size: 13px;
          color: var(--color-on-surface, #333333);
          cursor: pointer;
          transition: background 0.2s;
          margin-bottom: 4px;
        }
        .drawer-item:hover {
          background: rgba(15, 76, 92, 0.06);
        }
        .drawer-item.active {
          background: rgba(15, 76, 92, 0.1);
          font-weight: 600;
          color: var(--color-primary, #0F4C5C);
        }
        .drawer-item-id {
          font-family: 'Outfit', sans-serif;
          font-weight: 600;
          min-width: 60px;
          color: var(--color-primary, #0F4C5C);
        }
        .drawer-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.4);
          z-index: 9999998;
          display: none;
          backdrop-filter: blur(2px);
        }
        .drawer-overlay.open {
          display: block;
        }
      `;
      document.head.appendChild(style);
      document.body.appendChild(badge);
      makeElementDraggable(badge);
    }
    
    const matched = findScreenObjectByPath(path);
    const extraTag = matched && matched.isExtra ? `<span style="font-size:9.5px; font-weight:800; padding:2px 6px; border-radius:10px; background:#fef3c7; color:#b45309; border:1px solid #fde68a; display:inline-block; vertical-align:middle; margin-left:3px;">✨ AI Added</span>` : '';
    const pkgBadge = matched ? `<span style="font-size:10px; font-weight:800; padding:2px 7px; border-radius:10px; ${matched.pkg === 'Pkg1' ? 'background:#0284c7; color:#fff;' : matched.pkg === 'Pkg2' ? 'background:#16a34a; color:#fff;' : 'background:#7c3aed; color:#fff;'} display:inline-block; vertical-align:middle; margin-left:4px;">${matched.pkg}</span>` : '';
    
    badge.innerHTML = `<span style="display:inline-flex; align-items:center; gap:5px;"><span style="font-size:12px;">⚙️</span> <span style="font-weight:700; letter-spacing:0.02em;">${screenId}</span>${extraTag}${pkgBadge} <span style="font-size:10px; color:#cbd5e1; font-weight:600; margin-left:2px;">(Jump)</span></span>`;
    
    let drawer = document.getElementById('screen-jump-drawer');
    let overlay = document.getElementById('screen-jump-overlay');
    if (!drawer) {
      overlay = document.createElement('div');
      overlay.id = 'screen-jump-overlay';
      overlay.className = 'drawer-overlay';
      overlay.addEventListener('click', toggleDrawer);
      document.body.appendChild(overlay);
      
      drawer = document.createElement('div');
      drawer.id = 'screen-jump-drawer';
      
      let sectionsHtml = '';
      for (const [sectionName, screens] of Object.entries(screenNavRoutes)) {
        sectionsHtml += `<div class="drawer-section-title">${sectionName}</div>`;
        screens.forEach(s => {
          sectionsHtml += `
            <div class="drawer-item" id="nav-item-${s.id}" data-pkg="${s.pkg}" data-extra="${s.isExtra ? 'true' : 'false'}" onclick="Router.navigate('${s.path}'); Router.toggleDrawer();">
              <span class="drawer-item-id">${s.id}</span>
              <span style="flex:1;">${s.name} ${s.isExtra ? `<span style="font-size:9.5px; padding:2px 6px; border-radius:10px; font-weight:700; background:#fef3c7; color:#b45309; border:1px solid #fde68a; margin-left:4px;">✨ AI Added</span>` : ''}</span>
              <span class="badge" style="font-size:10px; padding:2px 8px; border-radius:12px; font-weight:700; ${getPkgBadgeStyle(s.pkg)}">${s.pkg}</span>
            </div>
          `;
        });
      }
      
      drawer.innerHTML = `
        <div class="drawer-header">
          <h3 style="font-family:'Outfit', sans-serif; font-size:16px; font-weight:700; margin:0; color:var(--color-primary);">EzBookNow Screen Jump</h3>
          <button style="border:none; background:none; font-size:18px; cursor:pointer;" onclick="Router.toggleDrawer()">✕</button>
        </div>
        <div style="padding: 12px 16px 10px 16px; border-bottom: 1px solid var(--color-outline-variant, #e0e0e0); background: rgba(15, 76, 92, 0.02);">
          <input type="text" id="screen-search-input" placeholder="Search by name or ID (e.g. u02, s09, login)..." style="width: 100%; padding: 8px 12px; font-size: 13px; border: 1px solid var(--color-outline-variant, #dadce0); border-radius: 6px; outline: none; box-shadow: inset 0 1px 2px rgba(0,0,0,0.05);" oninput="Router.filterScreens(this.value)">
          
          <div style="display:flex; gap:5px; margin-top:10px;" id="pkg-filter-container">
            <button class="pkg-filter-btn" data-pkg="All" onclick="Router.setPkgFilter('All')" style="flex:1; padding:5px 0; font-size:11px; font-weight:700; border-radius:6px; border:1px solid transparent; cursor:pointer; background:var(--color-primary, #0F4C5C); color:#ffffff; transition:all 0.2s;">All</button>
            <button class="pkg-filter-btn" data-pkg="Pkg1" onclick="Router.setPkgFilter('Pkg1')" style="flex:1; padding:5px 0; font-size:11px; font-weight:600; border-radius:6px; border:1px solid #7dd3fc; cursor:pointer; background:#e0f2fe; color:#0369a1; transition:all 0.2s;">Pkg1</button>
            <button class="pkg-filter-btn" data-pkg="Pkg2" onclick="Router.setPkgFilter('Pkg2')" style="flex:1; padding:5px 0; font-size:11px; font-weight:600; border-radius:6px; border:1px solid #86efac; cursor:pointer; background:#dcfce7; color:#15803d; transition:all 0.2s;">Pkg2</button>
            <button class="pkg-filter-btn" data-pkg="Pkg3" onclick="Router.setPkgFilter('Pkg3')" style="flex:1; padding:5px 0; font-size:11px; font-weight:600; border-radius:6px; border:1px solid #d8b4fe; cursor:pointer; background:#f3e8ff; color:#6b21a8; transition:all 0.2s;">Pkg3</button>
            <button class="pkg-filter-btn" data-pkg="AI" onclick="Router.setPkgFilter('AI')" style="flex:1; padding:5px 0; font-size:11px; font-weight:600; border-radius:6px; border:1px solid #fde68a; cursor:pointer; background:#fef3c7; color:#b45309; transition:all 0.2s;">✨ AI</button>
          </div>
        </div>
        <div class="drawer-body">
          ${sectionsHtml}
        </div>
      `;
      document.body.appendChild(drawer);
    }
    
    document.querySelectorAll('.drawer-item').forEach(el => el.classList.remove('active'));
    if (matched) {
      const activeEl = document.getElementById(`nav-item-${matched.id}`);
      if (activeEl) {
        activeEl.classList.add('active');
        activeEl.scrollIntoView({ block: 'nearest' });
      }
    }
  }

  function handleRoute() {
    const hash = window.location.hash || '#/user/home';
    const { path, params, handler } = parseRoute(hash);
    
    // 2FA Security Guard for Phase 2 (Mandatory 2FA)
    let isPhase2 = false;
    let twofaEnabled = false;
    try {
      isPhase2 = localStorage.getItem('s10_phase') === '2';
      twofaEnabled = localStorage.getItem('s10_2fa_enabled') === 'true';
    } catch (e) {}
    if (isPhase2 && !twofaEnabled && path.startsWith('/shop') && path !== '/shop/login' && path !== '/shop/security') {
      try {
        showToast('error', 'Security Policy Enforced', '2FA configuration is mandatory in Phase 2. Redirecting to Security Settings...');
      } catch (e) {}
      setTimeout(() => {
        window.location.hash = '/shop/security';
      }, 50);
      return;
    }
    
    currentRoute = path;
    currentParams = params;
    
    // Apply S01 & S02 exclusive color palette ONLY for S-01 Dashboard and S-02 Ledger
    if (typeof document !== 'undefined' && document.body) {
      const isS01orS02 = (path === '/shop/dashboard' || path === '/shop/ledger' || path === '/shop' || path === '/shop/');
      if (isS01orS02) {
        document.body.classList.add('screen-s01-s02-theme');
      } else {
        document.body.classList.remove('screen-s01-s02-theme');
      }
    }
    
    if (handler) {
      handler(params);
    } else {
      // 404 page
      const app = document.getElementById('app');
      app.innerHTML = `
        <div class="login-layout">
          <div style="text-align:center;">
            <div style="font-size:64px;margin-bottom:16px;">🔍</div>
            <h1 class="text-headline-lg" style="margin-bottom:8px;">404</h1>
            <p class="text-body-md text-muted" style="margin-bottom:24px;">${I18n.t('no_results')}</p>
            <button class="btn btn-primary" onclick="Router.navigate('/user/home')">${I18n.t('home')}</button>
          </div>
        </div>`;
    }
    injectScreenBadge(path);
  }

  function getCurrentRoute() { return currentRoute; }
  function getParams() { return currentParams; }

  // Initialize
  window.addEventListener('hashchange', handleRoute);
  
  return { register, navigate, handleRoute, getPortal, getAuth, getCurrentRoute, getParams, authState, toggleDrawer, filterScreens, setPkgFilter };
})();
