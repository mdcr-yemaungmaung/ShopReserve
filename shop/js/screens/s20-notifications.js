/* ============================================================
   EzBookNow Screen S-20 — Shop Notification Center
   Package: Pkg2 / Pkg3 (Future)
   
   ⚠️ DEVELOPER NOTE:
   This screen (S-20) is NOT part of the original design specification document.
   It is an ADDITIONAL screen designed for future Package 2 or 3 implementation.
   This screen handles shop-side in-app notification management including
   booking events, billing reports, system announcements, and customer reviews.
   
   In production:
   - Data source: reservation_notifications table (shop_id = own shop, channel = 'in_app')
   - Realtime: Supabase Realtime subscription for instant push
   - Pagination: Cursor-based (?limit=20&cursor=xxx) infinite scroll
   ============================================================ */

const ScreenS20 = (() => {
  let activeTab = 'all';
  let visibleCount = 10;
  const PAGE_SIZE = 10;

  // Type → Tab mapping
  const TYPE_TAB = {
    shop_new_booking:   'bookings',
    booking_cancelled:  'bookings',
    booking_confirmed:  'bookings',
    booking_reminder:   'bookings',
    monthly_report:     'billing',
    invoice_issued:     'billing',
    payout_completed:   'billing',
    review_new:         'reviews',
    announcement:       'system',
    system_maintenance: 'system',
    feature_update:     'system',
  };

  // Type → Icon
  const TYPE_ICON = {
    shop_new_booking:   '📅',
    booking_cancelled:  '❌',
    booking_confirmed:  '✅',
    booking_reminder:   '⏰',
    monthly_report:     '📊',
    invoice_issued:     '🧾',
    payout_completed:   '💰',
    review_new:         '⭐',
    announcement:       '📢',
    system_maintenance: '🔧',
    feature_update:     '🆕',
  };

  // Type → Tab accent color
  const TAB_COLOR = {
    bookings: '#6366f1',
    billing:  '#10b981',
    reviews:  '#f59e0b',
    system:   '#ef4444',
  };

  // Type → Navigation path
  const TYPE_NAV = {
    shop_new_booking:   (m) => m && m.reservationId ? `/shop/booking/${m.reservationId}` : '/shop/ledger',
    booking_cancelled:  (m) => m && m.reservationId ? `/shop/booking/${m.reservationId}` : '/shop/ledger',
    booking_confirmed:  (m) => m && m.reservationId ? `/shop/booking/${m.reservationId}` : '/shop/ledger',
    booking_reminder:   ()  => '/shop/ledger',
    monthly_report:     ()  => '/shop/billing',
    invoice_issued:     ()  => '/shop/billing',
    payout_completed:   ()  => '/shop/billing',
    review_new:         ()  => '/shop/reviews',
    announcement:       ()  => '/shop/dashboard',
    system_maintenance: ()  => '/shop/dashboard',
    feature_update:     ()  => '/shop/dashboard',
  };

  function getFiltered() {
    const all = MockData.shopNotifications;
    if (activeTab === 'all') return all;
    return all.filter(n => TYPE_TAB[n.type] === activeTab);
  }

  function renderNotifItem(n, lang) {
    const isUnread = n.readAt === null;
    const icon = TYPE_ICON[n.type] || '🔔';
    const tab = TYPE_TAB[n.type] || 'system';
    const color = TAB_COLOR[tab] || 'var(--color-primary)';
    const title = lang === 'mm' ? (n.title_mm || n.title) : n.title;
    const body  = lang === 'mm' ? (n.body_mm  || n.body)  : n.body;
    const timeStr = MockData.timeAgo(n.createdAt);

    return `
      <div onclick="ScreenS20.handleNotifClick('${n.id}')"
           style="cursor:pointer;padding:14px 20px;border-bottom:1px solid var(--color-outline-variant);
                  display:flex;gap:14px;align-items:flex-start;
                  background:${isUnread ? 'rgba(99,102,241,0.05)' : 'transparent'};
                  transition:background 0.15s;"
           onmouseenter="this.style.background='rgba(99,102,241,0.08)'"
           onmouseleave="this.style.background='${isUnread ? 'rgba(99,102,241,0.05)' : 'transparent'}'">
        <div style="width:42px;height:42px;border-radius:50%;
                    background:${color}1a;border:1.5px solid ${color}44;
                    display:flex;align-items:center;justify-content:center;
                    font-size:18px;flex-shrink:0;">
          ${icon}
        </div>
        <div style="flex:1;min-width:0;">
          <div style="font-weight:${isUnread ? '700' : '500'};font-size:13.5px;
                      color:var(--color-on-surface);margin-bottom:3px;line-height:1.35;">
            ${title}
          </div>
          <div style="font-size:12.5px;color:var(--color-outline);line-height:1.55;
                      overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;">
            ${body}
          </div>
        </div>
        <div style="display:flex;flex-direction:column;align-items:flex-end;gap:5px;flex-shrink:0;padding-top:2px;">
          <span style="font-size:11px;color:var(--color-outline);white-space:nowrap;">${timeStr}</span>
          ${isUnread ? `<span style="width:9px;height:9px;background:var(--color-primary);border-radius:50%;display:block;"></span>` : ''}
        </div>
      </div>
    `;
  }

  function render() {
    const lang = I18n.getLang();
    const all = MockData.shopNotifications;
    const filtered = getFiltered();
    const visible = filtered.slice(0, visibleCount);
    const hasMore = filtered.length > visibleCount;

    // Unread counts per tab
    const unread = {
      all:      all.filter(n => !n.readAt).length,
      bookings: all.filter(n => TYPE_TAB[n.type] === 'bookings' && !n.readAt).length,
      billing:  all.filter(n => TYPE_TAB[n.type] === 'billing'  && !n.readAt).length,
      reviews:  all.filter(n => TYPE_TAB[n.type] === 'reviews'  && !n.readAt).length,
      system:   all.filter(n => TYPE_TAB[n.type] === 'system'   && !n.readAt).length,
    };

    // Realtime indicator
    const realtimeHtml = `
      <span style="display:inline-flex;align-items:center;gap:5px;font-size:11px;
                   color:#16a34a;background:rgba(22,163,74,0.08);
                   border:1px solid rgba(22,163,74,0.25);border-radius:20px;padding:3px 10px;">
        <span style="width:7px;height:7px;background:#22c55e;border-radius:50%;
                     box-shadow:0 0 0 0 rgba(34,197,94,0.7);
                     animation:pulse 1.5s infinite;"></span>
        ${lang === 'mm' ? 'Realtime ချိတ်ဆက်မှု တက်ကြွနေသည်' : 'Realtime Connected (Simulated)'}
      </span>
    `;

    // Filter tabs
    const tabDefs = [
      { key: 'all',      label: lang === 'mm' ? 'အားလုံး'            : 'All' },
      { key: 'bookings', label: lang === 'mm' ? 'ဘွတ်ကင်ဆိုင်ရာ'     : 'Bookings' },
      { key: 'billing',  label: lang === 'mm' ? 'ငွေကြေး / အစီရင်ခံ' : 'Billing & Reports' },
      { key: 'reviews',  label: lang === 'mm' ? 'သုံးသပ်ချက်'        : 'Reviews' },
      { key: 'system',   label: lang === 'mm' ? 'စနစ်ကြေညာ'          : 'System' },
    ];

    const tabsHtml = `
      <div class="tabs" style="border-bottom:1px solid var(--color-outline-variant);margin-bottom:0;flex-wrap:wrap;gap:2px;">
        ${tabDefs.map(t => `
          <button class="tab ${activeTab === t.key ? 'active' : ''}" onclick="ScreenS20.setTab('${t.key}')">
            ${t.label}
            ${unread[t.key] > 0 
              ? `<span style="margin-left:5px;background:${activeTab === t.key ? '#fff' : 'var(--color-primary)'};
                              color:${activeTab === t.key ? 'var(--color-primary)' : '#fff'};
                              font-size:10px;font-weight:700;border-radius:10px;padding:1px 6px;">${unread[t.key]}</span>` 
              : ''}
          </button>
        `).join('')}
      </div>
    `;

    const toolbarHtml = `
      <div class="flex justify-between items-center" style="padding:14px 0 10px;flex-wrap:wrap;gap:10px;">
        <div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;">
          ${realtimeHtml}
          <span style="font-size:12px;color:var(--color-outline);">
            ${filtered.filter(n => !n.readAt).length > 0
              ? (lang === 'mm' 
                  ? `${filtered.filter(n => !n.readAt).length} ခု မဖတ်ရသေး`
                  : `${filtered.filter(n => !n.readAt).length} unread in this tab`)
              : (lang === 'mm' ? '✓ ဤ Tab ရှိ အားလုံး ဖတ်ပြီး' : '✓ All read in this tab')}
          </span>
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;">
          <button class="btn btn-ghost btn-sm" onclick="ScreenS20.simulateNewBookingNotif()" 
                  title="${lang === 'mm' ? 'Realtime ဘွတ်ကင်အသစ် စမ်းသပ်မည်' : 'Simulate incoming booking notification'}">
            🔔 ${lang === 'mm' ? 'Realtime စမ်းသပ်' : 'Simulate Realtime'}
          </button>
          ${unread.all > 0 ? `
            <button class="btn btn-secondary btn-sm" onclick="ScreenS20.markAllRead()">
              ✓ ${lang === 'mm' ? 'အားလုံး ဖတ်ပြီး သတ်မှတ်' : 'Mark All as Read'}
            </button>
          ` : ''}
        </div>
      </div>
    `;

    let listHtml = '';
    if (visible.length === 0) {
      listHtml = `<div style="padding:20px;">${Components.emptyState('bell',
        lang === 'mm' ? 'အကြောင်းကြားချက်မရှိပါ' : 'No notifications',
        lang === 'mm' ? 'ဤအမျိုးအစားအတွက် အကြောင်းကြားချက် မရှိသေးပါ' : 'No notifications in this category yet.'
      )}</div>`;
    } else {
      listHtml = `
        ${visible.map(n => renderNotifItem(n, lang)).join('')}
        <div style="text-align:center;padding:14px;border-top:1px solid var(--color-outline-variant);">
          ${hasMore 
            ? `<button class="btn btn-ghost btn-sm" onclick="ScreenS20.loadMore()">
                 ${lang === 'mm' ? `နောက်ထပ် ${PAGE_SIZE} ခု တင်မည်` : `Load ${PAGE_SIZE} more`} ↓
               </button>`
            : `<span style="font-size:11.5px;color:var(--color-outline);">
                 ${lang === 'mm' ? '— ဤ Tab ရှိ အကြောင်းကြားချက်အားလုံး ပြပြီးပါပြီ —' : '— End of notifications in this tab —'}
               </span>`}
        </div>
      `;
    }

    // Developer disclaimer note
    const devNoteHtml = `
      <div style="margin-top:20px;padding:14px 16px;background:rgba(245,158,11,0.07);
                  border:1.5px solid rgba(245,158,11,0.3);border-radius:var(--radius-md);
                  font-size:12px;color:var(--color-on-surface);line-height:1.65;">
        <div style="font-weight:700;margin-bottom:5px;color:#92400e;">
          📌 ${lang === 'mm' ? 'Developer မှတ်ချက် — Design Document ပြင်ပ Screen' : 'Developer Note — Screen Outside Design Spec'}
        </div>
        <div style="color:var(--color-outline);">
          ${lang === 'mm'
            ? 'ဤ S-20 မျက်နှာပြင်သည် မူလ 画面設計書 (Design Specification Document) တွင် မပါဝင်ဘဲ Package 2/3 အတွက် ထပ်ဆောင်း တည်ဆောက်ထားသော မျက်နှာပြင်ဖြစ်သည်။ Production တွင် <code>reservation_notifications</code> table (shop_id + channel=in_app) မှ Supabase Realtime subscription ဖြင့် data ရယူမည်ဖြစ်ပြီး Cursor-based pagination (?limit=20&cursor=xxx) ကို အသုံးပြုမည်ဖြစ်သည်။'
            : 'This S-20 screen is NOT in the original 画面設計書 design specification. It is an ADDITIONAL screen designed for Package 2/3. In production, real-time data will be subscribed from the <code>reservation_notifications</code> table (shop_id + channel=\'in_app\') via Supabase Realtime. Pagination uses cursor-based (?limit=20&cursor=xxx) infinite scroll.'
          }
        </div>
      </div>
    `;

    const content = `
      ${Components.pageHeader(
        lang === 'mm' ? 'ဆိုင် အကြောင်းကြားစာ ဗဟိုဌာန' : 'Shop Notification Center',
        lang === 'mm' ? 'ဘွတ်ကင်ဆိုင်ရာ၊ ငွေကြေး၊ သုံးသပ်ချက်နှင့် စနစ်ကြေညာချက်' : 'Bookings, Billing, Reviews & System Announcements'
      )}

      <div style="max-width:760px;margin:0 auto;">
        <div class="card p-0" style="border-radius:var(--radius-xl);overflow:hidden;margin-bottom:16px;">
          <div style="padding:0 20px;">
            ${tabsHtml}
            ${toolbarHtml}
          </div>
          <div>
            ${listHtml}
          </div>
        </div>
        ${devNoteHtml}
      </div>
    `;

    App.renderAdminPage(
      'shop',
      lang === 'mm' ? 'အကြောင်းကြားစာ ဗဟိုဌာန' : 'Notification Center',
      content
    );
  }

  function setTab(tab) {
    activeTab = tab;
    visibleCount = PAGE_SIZE;
    render();
  }

  function loadMore() {
    visibleCount += PAGE_SIZE;
    render();
  }

  function markAllRead() {
    const lang = I18n.getLang();
    MockData.shopNotifications.forEach(n => { n.readAt = new Date().toISOString(); });
    showToast('success',
      lang === 'mm' ? 'ဖတ်ပြီးပါပြီ' : 'All Read',
      lang === 'mm' ? 'အကြောင်းကြားချက်အားလုံး ဖတ်ပြီးအဖြစ် သတ်မှတ်ပြီးပါပြီ' : 'All notifications marked as read.');
    render();
  }

  function handleNotifClick(id) {
    const notif = MockData.shopNotifications.find(n => n.id === id);
    if (!notif) return;
    notif.readAt = new Date().toISOString();
    const navFn = TYPE_NAV[notif.type];
    if (navFn) {
      Router.navigate(navFn(notif.meta || {}));
    } else {
      render();
    }
  }

  // Simulate a Realtime incoming booking notification
  function simulateNewBookingNotif() {
    const lang = I18n.getLang();
    const names = ['ဦးကျော်ကျော်', 'ဒေါ်သီတာ', 'ကိုမျိုးထွဋ်', 'မမြတ်သူဇာ'];
    const randomName = names[Math.floor(Math.random() * names.length)];
    const guests = Math.floor(Math.random() * 5) + 1;
    const times = ['18:00', '18:30', '19:00', '19:30', '20:00'];
    const randomTime = times[Math.floor(Math.random() * times.length)];
    const resId = 'RES-LIVE-' + Math.floor(Math.random() * 9000 + 1000);

    MockData.shopNotifications.unshift({
      id: 'sim-' + Date.now(),
      type: 'shop_new_booking',
      title: 'New Booking Received',
      title_mm: 'ဘွတ်ကင်အသစ် ရောက်ရှိနေပြီ',
      body: `${randomName} made a reservation (${resId}) for ${guests} guest${guests > 1 ? 's' : ''} tonight at ${randomTime}.`,
      body_mm: `${randomName} မှ ဧည့်သည် ${guests} ဦးအတွက် ညနေ ${randomTime} ကြိုတင်မှာယူမှု (${resId}) ဝင်ရောက်လာပြီ`,
      readAt: null,
      createdAt: new Date().toISOString(),
      meta: { reservationId: resId }
    });

    showToast('info',
      lang === 'mm' ? '🔔 Realtime ဘွတ်ကင်' : '🔔 Realtime Booking',
      lang === 'mm' ? `${randomName} ဘွတ်ကင်အသစ် ချက်ချင်းထင်ဟပ်ပြသသည် (Simulated)` : `New booking from ${randomName} appeared instantly (Simulated)`);
    render();
  }

  return { render, setTab, loadMore, markAllRead, handleNotifClick, simulateNewBookingNotif };
})();
