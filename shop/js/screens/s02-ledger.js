/* ============================================================
   EzBookNow Screen S-02 — Booking Ledger (Redesigned)
   4-View System: Day | Week | Month | List
   ============================================================ */

const ScreenS02 = (() => {
  // State
  let activeView = 'day';       // 'day' | 'week' | 'month' | 'list'
  let selectedDate = '2026-07-20';
  let calendarMonth = 6;        // 0-indexed (6 = July)
  let calendarYear = 2026;
  let searchQuery = '';
  let statusFilter = 'all';
  let isPdfModalOpen = false;
  let isOffline = false;
  let realtimeQueue = [];
  let pendingSyncCount = 0;
  let activeConflictId = null;

  // Helpers
  const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const DAY_NAMES_FULL = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  function formatDate(d) {
    const parts = d.split('-');
    return `${parts[0]}-${parts[1]}-${parts[2]}`;
  }

  function formatTime12h(time24) {
    const [h, m] = time24.split(':');
    const hr = parseInt(h);
    const ampm = hr >= 12 ? 'PM' : 'AM';
    const hr12 = hr === 0 ? 12 : hr > 12 ? hr - 12 : hr;
    return `${hr12}:${m} ${ampm}`;
  }

  function getDayOfWeek(dateStr) {
    const d = new Date(dateStr + 'T00:00:00+06:30');
    return d.getDay();
  }

  function getWeekRange(dateStr) {
    const d = new Date(dateStr + 'T00:00:00+06:30');
    const day = d.getDay();
    const start = new Date(d);
    start.setDate(d.getDate() - (day === 0 ? 6 : day - 1));
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    const fmt = (dt) => dt.toISOString().split('T')[0];
    return { start: fmt(start), end: fmt(end) };
  }

  function getAllReservations() {
    const queue = JSON.parse(localStorage.getItem('pending_bookings') || '[]');
    return [...queue, ...MockData.shopReservations];
  }

  function getFilteredReservations() {
    let list = getAllReservations();
    const week = getWeekRange(selectedDate);

    if (activeView === 'day') {
      list = list.filter(r => r.date === selectedDate);
    } else if (activeView === 'week') {
      list = list.filter(r => r.date >= week.start && r.date <= week.end);
    } else if (activeView === 'month') {
      const monthPrefix = `${calendarYear}-${String(calendarMonth + 1).padStart(2, '0')}`;
      list = list.filter(r => r.date.startsWith(monthPrefix));
    } else if (activeView === 'list') {
      list = list.filter(r => r.date >= week.start && r.date <= week.end);
    }

    if (statusFilter !== 'all') {
      list = list.filter(r => r.status === statusFilter);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(r =>
        r.name.toLowerCase().includes(q) ||
        r.id.toLowerCase().includes(q) ||
        r.phone.includes(q)
      );
    }

    list.sort((a, b) => {
      if (a.date === b.date) return a.time.localeCompare(b.time);
      return a.date.localeCompare(b.date);
    });

    return list;
  }

  function getStatusCounts() {
    const list = getAllReservations();
    const totalGuests = list.reduce((sum, r) => sum + (parseInt(r.guests, 10) || 0), 0);
    const pendingGuests = list.filter(r => r.status === 'pending' && (!r.user_id || r.user_id === 'null')).length;
    return {
      total: list.length,
      totalGuests: totalGuests,
      confirmed: list.filter(r => r.status === 'confirmed').length,
      pending: list.filter(r => r.status === 'pending').length,
      checked_in: list.filter(r => r.status === 'checked_in').length,
      completed: list.filter(r => r.status === 'completed').length,
      cancelled: list.filter(r => r.status === 'cancelled').length,
      no_show: list.filter(r => r.status === 'no_show').length,
      pendingGuestCallbacks: pendingGuests
    };
  }

  function getBookingsForDate(dateStr) {
    return getAllReservations().filter(r => r.date === dateStr);
  }

  function getStatusColor(status) {
    const palette = {
      confirmed: '#16A34A',
      pending: '#0F768E',
      checked_in: '#334155',
      completed: '#777778',
      cancelled: '#EF4444',
      no_show: '#EF4444',
      sync_conflict: '#0F768E'
    };
    return palette[status] || palette.confirmed;
  }

  function getMonthCellClass(dayData) {
    if (!dayData || dayData.total === 0) return '';
    const statusOrder = ['confirmed', 'pending', 'checked_in', 'completed', 'cancelled', 'no_show', 'sync_conflict'];
    const dominant = statusOrder.find(status => (dayData[status] || 0) > 0) || 'confirmed';
    return `s02-month-cell--${dominant}`;
  }

  // ============================================================
  // RENDER
  // ============================================================
  function render() {
    if (typeof document !== 'undefined' && document.body) {
      document.body.classList.add('screen-s01-s02-theme');
    }
    const lang = I18n.getLang();
    const counts = getStatusCounts();
    const filtered = getFilteredReservations();

    const content = `
      ${renderOfflineBar()}
      ${renderConflictAlerts()}
      ${renderHeader(counts)}
      ${renderViewToolbar()}
      <div class="s02-view-container">
        ${activeView === 'day' ? renderDayView(filtered) : ''}
        ${activeView === 'week' ? renderWeekView(filtered) : ''}
        ${activeView === 'month' ? renderMonthView(filtered) : ''}
        ${activeView === 'list' ? renderListView(filtered) : ''}
      </div>
      ${isPdfModalOpen ? renderPdfModal() : ''}
    `;

    App.renderAdminPage('shop', I18n.t('sidebar_booking_ledger'), content);
  }

  // ============================================================
  // OFFLINE BAR
  // ============================================================
  function renderOfflineBar() {
    if (!isOffline) return '';
    return `
      <div class="s02-offline-bar" style="
        background: linear-gradient(135deg, #fef3c7, #fde68a);
        border: 1px solid #f59e0b;
        border-radius: var(--radius-md);
        padding: 10px 16px;
        margin-bottom: 16px;
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 13px;
        font-weight: 500;
        color: #92400e;
      ">
        <span style="font-size:18px;">⚡</span>
        <div style="flex:1;">
          <strong>${I18n.t('offline_mode')}</strong> — ${I18n.t('offline_banner_text')}
        </div>
        <span class="badge badge--warning" style="font-size:11px;">
          📥 ${pendingSyncCount} pending sync
        </span>
      </div>
    `;
  }

  // ============================================================
  // CONFLICT ALERTS
  // ============================================================
  function renderConflictAlerts() {
    const conflicts = getAllReservations().filter(r => r.status === 'sync_conflict');
    if (conflicts.length === 0) return '';

    return conflicts.map(c => {
      const isOpen = activeConflictId === c.id;
      return `
        <div class="s02-conflict-alert" style="
          background: linear-gradient(135deg, #fef2f2, #fee2e2);
          border: 1.5px solid #ef4444;
          border-radius: var(--radius-md);
          padding: 12px 16px;
          margin-bottom: 12px;
          font-size: 13px;
          line-height: 1.5;
          animation: fadeIn 0.3s ease;
        ">
          <div style="display:flex; align-items:flex-start; gap:10px;">
            <span style="font-size:20px; flex-shrink:0;">🚨</span>
            <div style="flex:1;">
              <div style="font-weight:700; color:#991b1b; margin-bottom:4px;">
                ${I18n.t('conflict_warning_title')}
              </div>
              <div style="color:#7f1d1d;">
                ${I18n.t('sync_conflict_alert_pattern', { id: c.id, name: c.name, time: `${c.date} ${c.time}` })}
              </div>
              <div style="margin-top:6px; font-weight:600;">
                📞 <a href="tel:${c.phone}" style="color:#b91c1c; text-decoration:underline;">${c.phone}</a>
              </div>
              ${isOpen ? `
                <div style="margin-top:10px; padding:10px; background:#fff1f2; border:1px solid #fecaca; border-radius:6px; font-size:12px; color:#991b1b;">
                  <strong>📋 ${I18n.t('reschedule_guide')}:</strong><br>
                  ${I18n.t('sync_conflict_instruction')}
                </div>
              ` : ''}
            </div>
            <div style="display:flex; gap:6px; flex-shrink:0;">
              <button class="btn btn-sm" style="background:#ef4444; color:#fff; padding:4px 10px; font-size:11px;"
                onclick="event.stopPropagation(); ScreenS02.resolveConflict('${c.id}')">
                ${I18n.t('dismiss')}
              </button>
              <button class="btn btn-sm btn-ghost" style="padding:4px 8px; font-size:11px;"
                onclick="event.stopPropagation(); ScreenS02.toggleConflictDetail('${c.id}')">
                ${isOpen ? '▲' : '▼'} Details
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  // ============================================================
  // HEADER with KPI Stats
  // ============================================================
  function renderHeader(counts) {
    const isOfflineBadge = isOffline
      ? `<span class="badge badge--warning" style="font-size:11px; padding:3px 8px;">⚡ Offline</span>`
      : `<span class="badge badge--success" style="font-size:11px; padding:3px 8px;">● Online</span>`;

    const lang = I18n.getLang();

    return `
      <div class="s02-header" style="margin-bottom: 20px;">
        <div class="s02-header__top" style="margin-bottom: 16px;">
          <div>
            <h1 class="s02-header__title">${I18n.t('booking_ledger')}</h1>
            <p class="s02-header__subtitle">${I18n.t('ledger_subtitle')}</p>
          </div>
          <div style="display:flex; align-items:center; gap:8px;">
            ${isOfflineBadge}
            <button class="btn btn-sm btn-ghost" onclick="ScreenS02.toggleNetwork()" title="Toggle Network" style="height:36px; padding:0 10px; border-radius:8px; border:1px solid #E2E8F0;">
              🔄
            </button>
          </div>
        </div>

        <div class="s02-kpi-grid">
          <!-- 1. All Bookings Card -->
          <div class="s02-kpi-card s02-kpi-card--primary ${statusFilter === 'all' ? 'active' : ''}" onclick="ScreenS02.setStatusFilter('all')" title="Filter by All Reservations">
            <div style="display:flex; justify-content:space-between; align-items:flex-start;">
              <div>
                <span style="font-size:11.5px; font-weight:700; color:#64748B; text-transform:uppercase; letter-spacing:0.04em;">
                  ${lang === 'mm' ? 'ဘွတ်ကင် စုစုပေါင်း' : 'Total Bookings'}
                </span>
                <div style="font-size:24px; font-weight:800; color:#0F768E; margin-top:3px; font-family:'Outfit',sans-serif; line-height:1.2;">
                  ${counts.total} <span style="font-size:12.5px; font-weight:600; color:#475569;">${lang === 'mm' ? 'ခု' : 'Total'}</span>
                </div>
              </div>
              <div style="width:34px; height:34px; border-radius:8px; background:rgba(15,118,142,0.1); color:#0F768E; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
                ${Components.icon('calendar', 17)}
              </div>
            </div>
            <div style="font-size:11.5px; color:#64748B; margin-top:10px; border-top:1px solid #F1F5F9; padding-top:7px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
              👥 ${lang === 'mm' ? 'ဧည့်သည် စုစုပေါင်း' : 'Total Expected'}: <strong>${counts.totalGuests} ${lang === 'mm' ? 'ဦး' : 'Guests'}</strong>
            </div>
          </div>

          <!-- 2. Confirmed & Seated Card -->
          <div class="s02-kpi-card s02-kpi-card--success ${statusFilter === 'confirmed' ? 'active' : ''}" onclick="ScreenS02.setStatusFilter('confirmed')" title="Filter by Confirmed">
            <div style="display:flex; justify-content:space-between; align-items:flex-start;">
              <div>
                <span style="font-size:11.5px; font-weight:700; color:#64748B; text-transform:uppercase; letter-spacing:0.04em;">
                  ${lang === 'mm' ? 'အတည်ပြုပြီး / ထိုင်ခုံချ' : 'Confirmed & Seated'}
                </span>
                <div style="font-size:24px; font-weight:800; color:#10B981; margin-top:3px; font-family:'Outfit',sans-serif; line-height:1.2;">
                  ${counts.confirmed + counts.checked_in} <span style="font-size:12.5px; font-weight:600; color:#475569;">${lang === 'mm' ? 'ခု' : 'Active'}</span>
                </div>
              </div>
              <div style="width:34px; height:34px; border-radius:8px; background:rgba(16,185,129,0.1); color:#10B981; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
                ${Components.icon('check', 17)}
              </div>
            </div>
            <div style="font-size:11.5px; color:#64748B; margin-top:10px; border-top:1px solid #F1F5F9; padding-top:7px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
              🪑 <strong>${counts.checked_in}</strong> ${lang === 'mm' ? 'ထိုင်ခုံချပြီး' : 'Seated'} • <strong>${counts.confirmed}</strong> ${lang === 'mm' ? 'အတည်ပြုပြီး' : 'Confirmed'}
            </div>
          </div>

          <!-- 3. Action Required (Pending) Card -->
          <div class="s02-kpi-card s02-kpi-card--warning ${statusFilter === 'pending' ? 'active' : ''}" onclick="ScreenS02.setStatusFilter('pending')" title="Filter by Action Required">
            <div style="display:flex; justify-content:space-between; align-items:flex-start;">
              <div>
                <span style="font-size:11.5px; font-weight:700; color:#64748B; text-transform:uppercase; letter-spacing:0.04em;">
                  ${lang === 'mm' ? 'လုပ်ဆောင်ရန် လိုအပ်' : 'Action Required'}
                </span>
                <div style="font-size:24px; font-weight:800; color:#D97706; margin-top:3px; font-family:'Outfit',sans-serif; line-height:1.2;">
                  ${counts.pending} <span style="font-size:12.5px; font-weight:600; color:#475569;">${lang === 'mm' ? 'စောင့်ဆိုင်းဆဲ' : 'Pending'}</span>
                </div>
              </div>
              <div style="width:34px; height:34px; border-radius:8px; background:rgba(245,158,11,0.1); color:#D97706; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
                ${Components.icon('clock', 17)}
              </div>
            </div>
            <div style="font-size:11.5px; color:#64748B; margin-top:10px; border-top:1px solid #F1F5F9; padding-top:7px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
              ${counts.pendingGuestCallbacks > 0 
                ? `📞 <strong>${counts.pendingGuestCallbacks}</strong> ${lang === 'mm' ? 'ဖုန်းဆက်ရန် လိုအပ်' : 'Phone Callbacks'}` 
                : (lang === 'mm' ? 'အတည်ပြုချက် စောင့်ဆိုင်းနေသည်' : 'Awaiting Merchant Approval')}
            </div>
          </div>

          <!-- 4. Completed Dining Card -->
          <div class="s02-kpi-card s02-kpi-card--neutral ${statusFilter === 'completed' ? 'active' : ''}" onclick="ScreenS02.setStatusFilter('completed')" title="Filter by Completed">
            <div style="display:flex; justify-content:space-between; align-items:flex-start;">
              <div>
                <span style="font-size:11.5px; font-weight:700; color:#64748B; text-transform:uppercase; letter-spacing:0.04em;">
                  ${lang === 'mm' ? 'ပြီးစီးပြီး' : 'Completed'}
                </span>
                <div style="font-size:24px; font-weight:800; color:#475569; margin-top:3px; font-family:'Outfit',sans-serif; line-height:1.2;">
                  ${counts.completed} <span style="font-size:12.5px; font-weight:600; color:#475569;">${lang === 'mm' ? 'ပြီးစီး' : 'Finished'}</span>
                </div>
              </div>
              <div style="width:34px; height:34px; border-radius:8px; background:rgba(100,116,139,0.12); color:#475569; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
                ${Components.icon('userCheck', 17)}
              </div>
            </div>
            <div style="font-size:11.5px; color:#64748B; margin-top:10px; border-top:1px solid #F1F5F9; padding-top:7px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
              ✓ ${lang === 'mm' ? 'ပြီးစီးခဲ့သော ဘွတ်ကင်များ' : 'Finished Dining Services'}
            </div>
          </div>

          <!-- 5. Cancellations / No-Show Card -->
          <div class="s02-kpi-card s02-kpi-card--error ${statusFilter === 'cancelled' ? 'active' : ''}" onclick="ScreenS02.setStatusFilter('cancelled')" title="Filter by Cancelled / No-Show">
            <div style="display:flex; justify-content:space-between; align-items:flex-start;">
              <div>
                <span style="font-size:11.5px; font-weight:700; color:#64748B; text-transform:uppercase; letter-spacing:0.04em;">
                  ${lang === 'mm' ? 'ပယ်ဖျက် / မလာရောက်' : 'Cancellations / No-Show'}
                </span>
                <div style="font-size:24px; font-weight:800; color:#EF4444; margin-top:3px; font-family:'Outfit',sans-serif; line-height:1.2;">
                  ${counts.cancelled + counts.no_show} <span style="font-size:12.5px; font-weight:600; color:#475569;">${lang === 'mm' ? 'ခု' : 'Total'}</span>
                </div>
              </div>
              <div style="width:34px; height:34px; border-radius:8px; background:rgba(239,68,68,0.1); color:#EF4444; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
                ${Components.icon('alertCircle', 17)}
              </div>
            </div>
            <div style="font-size:11.5px; color:#64748B; margin-top:10px; border-top:1px solid #F1F5F9; padding-top:7px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
              🚫 <strong>${counts.cancelled}</strong> ${lang === 'mm' ? 'ပယ်ဖျက်' : 'Cancelled'} • <strong>${counts.no_show}</strong> ${lang === 'mm' ? 'မလာရောက်' : 'No-Show'}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // ============================================================
  // VIEW TOOLBAR
  // ============================================================
  function renderViewToolbar() {
    const views = [
      { id: 'day', label: I18n.t('day_view') },
      { id: 'week', label: I18n.t('week_view') },
      { id: 'month', label: I18n.t('month_view') },
      { id: 'list', label: I18n.t('list_view') },
    ];

    return `
      <div class="s02-toolbar">
        <div class="s02-toolbar__left">
          <div class="s02-view-switcher">
            ${views.map(v => `
              <button class="s02-view-btn ${activeView === v.id ? 'active' : ''}"
                onclick="ScreenS02.setView('${v.id}')">
                <span class="s02-view-btn__label">${v.label}</span>
              </button>
            `).join('')}
          </div>
        </div>
        <div class="s02-toolbar__right">
          <div class="s02-date-nav">
            <button class="s02-date-nav__btn" onclick="ScreenS02.navigateDate(-1)" title="Previous">◀</button>
            <div class="s02-date-nav__label">${renderDateLabel()}</div>
            <button class="s02-date-nav__btn" onclick="ScreenS02.navigateDate(1)" title="Next">▶</button>
            <button class="s02-date-nav__btn s02-date-nav__btn--today" onclick="ScreenS02.goToday()">Today</button>
          </div>
          <div class="s02-toolbar__actions">
            <select class="s02-status-filter" onchange="ScreenS02.setStatusFilter(this.value)">
              <option value="all" ${statusFilter === 'all' ? 'selected' : ''}>${I18n.t('all_statuses')}</option>
              <option value="confirmed" ${statusFilter === 'confirmed' ? 'selected' : ''}>${I18n.t('status_confirmed')}</option>
              <option value="pending" ${statusFilter === 'pending' ? 'selected' : ''}>${I18n.t('status_pending')}</option>
              <option value="checked_in" ${statusFilter === 'checked_in' ? 'selected' : ''}>${I18n.t('status_checked_in')}</option>
              <option value="completed" ${statusFilter === 'completed' ? 'selected' : ''}>${I18n.t('status_completed')}</option>
              <option value="cancelled" ${statusFilter === 'cancelled' ? 'selected' : ''}>${I18n.t('status_cancelled')}</option>
              <option value="no_show" ${statusFilter === 'no_show' ? 'selected' : ''}>${I18n.t('status_no_show')}</option>
            </select>
            <button class="btn btn-sm btn-secondary" onclick="ScreenS02.openPdfModal()">
              ${Components.icon('download', 14)} PDF
            </button>
            <button class="btn btn-sm btn-primary" onclick="ScreenS02.openNewBookingModal()">
              ${Components.icon('plus', 14)} ${I18n.t('new_booking')}
            </button>
          </div>
        </div>
      </div>
    `;
  }

  function renderDateLabel() {
    const isToday = selectedDate === '2026-07-20';

    if (activeView === 'day') {
      const dow = getDayOfWeek(selectedDate);
      const label = isToday ? 'Today' : `${DAY_NAMES_FULL[dow]}, ${formatDate(selectedDate)}`;
      return `
        <div style="display:inline-flex; align-items:center; gap:6px;">
          <span>${label}</span>
          <input type="date" value="${selectedDate}" onchange="ScreenS02.setDate(this.value)" style="border:1px solid #c7c5d0; border-radius:6px; padding:2px 4px; font-size:12px; cursor:pointer;" title="Select date" />
        </div>
      `;
    }
    if (activeView === 'week' || activeView === 'list') {
      const week = getWeekRange(selectedDate);
      const label = isToday ? 'This week' : `${week.start} — ${week.end}`;
      return `
        <div style="display:inline-flex; align-items:center; gap:6px;">
          <span>${label}</span>
          <input type="date" value="${selectedDate}" onchange="ScreenS02.setDate(this.value)" style="border:1px solid #c7c5d0; border-radius:6px; padding:2px 4px; font-size:12px; cursor:pointer;" title="Select week date" />
        </div>
      `;
    }
    if (activeView === 'month') {
      const mStr = `${calendarYear}-${String(calendarMonth + 1).padStart(2, '0')}`;
      return `
        <div style="display:inline-flex; align-items:center; gap:6px;">
          <span>This month • ${MONTH_NAMES[calendarMonth]} ${calendarYear}</span>
          <input type="month" value="${mStr}" onchange="ScreenS02.setMonth(this.value)" style="border:1px solid #c7c5d0; border-radius:6px; padding:2px 4px; font-size:12px; cursor:pointer;" title="Select month" />
        </div>
      `;
    }
    const week = getWeekRange(selectedDate);
    return isToday ? 'This week' : `${week.start} — ${week.end}`;
  }

  // ============================================================
  // DAY VIEW — Time-slot based layout
  // ============================================================
  function renderDayView(list) {
    const hours = [];
    for (let h = 10; h <= 23; h++) {
      hours.push(`${String(h).padStart(2, '0')}:00`);
      hours.push(`${String(h).padStart(2, '0')}:30`);
    }

    return `
      <div class="s02-day-view">
        <div class="s02-day-timeline">
          ${hours.map(slot => {
            const slotBookings = list.filter(b => {
              const bTime = b.time.substring(0, 5);
              return bTime === slot;
            });
            const isLunch = parseInt(slot.split(':')[0]) < 17;
            return `
              <div class="s02-time-slot ${isLunch ? 's02-time-slot--lunch' : 's02-time-slot--dinner'}">
                <div class="s02-time-slot__label">${formatTime12h(slot)}</div>
                <div class="s02-time-slot__cells">
                  ${slotBookings.length > 0
                    ? slotBookings.map(b => renderBookingCell(b)).join('')
                    : `<div class="s02-time-slot__empty">${I18n.t('no_bookings')}</div>`
                  }
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }

  // ============================================================
  // BOOKING CELL — Shared component for all views
  // ============================================================
  function renderBookingCell(b) {
    const isNonMember = !b.user_id || b.user_id === 'null' || b.user_id === null;
    const isPendingSync = b.pending_sync === true || b.source === 'offline_queue';
    const hasConflict = b.status === 'sync_conflict';

    // Status color mapping
    const statusColors = {
      confirmed: { bg: 'rgba(0, 195, 137, 0.14)', border: '#00C389', text: '#007A53', dot: '#00C389' },
      pending: { bg: 'rgba(255, 181, 71, 0.2)', border: '#FFB547', text: '#92400E', dot: '#FFB547' },
      checked_in: { bg: '#E2E8F0', border: '#1E293B', text: '#0B1220', dot: '#1E293B' },
      completed: { bg: '#F1F5F9', border: '#E2E8F0', text: '#64748B', dot: '#64748B' },
      cancelled: { bg: '#FEE2E2', border: '#EF4444', text: '#991B1B', dot: '#EF4444' },
      no_show: { bg: '#FEE2E2', border: '#EF4444', text: '#991B1B', dot: '#EF4444' },
      sync_conflict: { bg: '#FEE2E2', border: '#EF4444', text: '#991B1B', dot: '#EF4444' },
    };
    const sc = statusColors[b.status] || statusColors.confirmed;

    // Action buttons based on status
    let actionBtns = '';
    if (b.status === 'confirmed') {
      actionBtns = `
        <button class="s02-action-btn s02-action-btn--checkin" onclick="event.stopPropagation(); ScreenS02.updateStatus('${b.id}', 'checked_in')" title="Check-in">
          ✓ ${I18n.t('check_in')}
        </button>
        <button class="s02-action-btn s02-action-btn--noshow" onclick="event.stopPropagation(); ScreenS02.updateStatus('${b.id}', 'no_show')" title="No-show">
          ✕ No-show
        </button>
      `;
    } else if (b.status === 'pending') {
      actionBtns = `
        <button class="s02-action-btn s02-action-btn--approve" onclick="event.stopPropagation(); ScreenS02.updateStatus('${b.id}', 'confirmed')" title="Approve">
          ✓ ${I18n.t('confirm')}
        </button>
        <button class="s02-action-btn s02-action-btn--reject" onclick="event.stopPropagation(); ScreenS02.updateStatus('${b.id}', 'cancelled')" title="Reject">
          ✕ ${I18n.t('cancel')}
        </button>
      `;
    } else if (b.status === 'checked_in') {
      actionBtns = `
        <button class="s02-action-btn s02-action-btn--complete" onclick="event.stopPropagation(); ScreenS02.updateStatus('${b.id}', 'completed')" title="Complete">
          ✓ Complete
        </button>
      `;
    } else if (b.status === 'no_show') {
      actionBtns = `
        <button class="s02-action-btn" style="background:#FEF3C7; color:#92400E; border:1px solid #FCD34D; font-weight:600;" onclick="event.stopPropagation(); ScreenS02.openUndoNoShowModal('${b.id}')" title="Undo No-show">
          ↩️ ${I18n.t('undo_no_show')}
        </button>
      `;
    }

    return `
      <div class="s02-booking-cell ${hasConflict ? 's02-booking-cell--conflict' : ''} ${isPendingSync ? 's02-booking-cell--pending-sync' : ''}"
        style="border-left: 4px solid ${sc.dot};"
        onclick="ScreenS02.openBookingDetail('${b.id}')">

        <div class="s02-booking-cell__header">
          <span class="s02-booking-cell__time">${formatTime12h(b.time)}</span>
          <span class="s02-booking-cell__id">${b.id}</span>
        </div>

        <div class="s02-booking-cell__body">
          <div class="s02-booking-cell__name">${b.name}</div>
          <div class="s02-booking-cell__meta">
            <span>👥 ${b.guests}</span>
            <span>🪑 ${b.table || 'Auto'}</span>
          </div>
        </div>

        <div class="s02-booking-cell__footer">
          <span class="s02-booking-cell__status" style="background:${sc.bg}; color:${sc.text};">
            <span class="s02-booking-cell__dot" style="background:${sc.dot};"></span>
            ${I18n.t('status_' + b.status) || b.status}
          </span>

          ${(isNonMember && b.status === 'pending') ? `<span class="s02-phone-badge" title="Requires call confirmation">${I18n.t('phone_followup_badge')}</span>` : ''}
          ${isPendingSync ? `<span class="s02-pending-sync-badge" title="Pending sync">🔄 Pending Sync</span>` : ''}
          ${hasConflict ? `<span class="s02-conflict-badge" title="Sync conflict">⚠️ Conflict</span>` : ''}
        </div>

        ${actionBtns ? `<div class="s02-booking-cell__actions" onclick="event.stopPropagation();">${actionBtns}</div>` : ''}
      </div>
    `;
  }

  // ============================================================
  // WEEK VIEW — 7-column grid
  // ============================================================
  function renderWeekView(list) {
    const week = getWeekRange(selectedDate);
    const days = [];
    const startD = new Date(week.start + 'T00:00:00+06:30');
    for (let i = 0; i < 7; i++) {
      const d = new Date(startD);
      d.setDate(startD.getDate() + i);
      days.push(d.toISOString().split('T')[0]);
    }

    const dayColumns = days.map(day => {
      const dayBookings = list.filter(b => b.date === day);
      const dow = getDayOfWeek(day);
      const isToday = day === '2026-07-15';
      return `
        <div class="s02-week-day ${isToday ? 's02-week-day--today' : ''}">
          <div class="s02-week-day__header">
            <div class="s02-week-day__name">${DAY_NAMES[dow]}</div>
            <div class="s02-week-day__date">${day.split('-')[2]}</div>
            <div class="s02-week-day__count">${dayBookings.length} bookings</div>
          </div>
          <div class="s02-week-day__body">
            ${dayBookings.length > 0
              ? dayBookings.map(b => renderBookingCellCompact(b)).join('')
              : `<div class="s02-week-day__empty">${I18n.t('no_bookings')}</div>`
            }
          </div>
        </div>
      `;
    }).join('');

    return `<div class="s02-week-view">${dayColumns}</div>`;
  }

  function renderBookingCellCompact(b) {
    const statusColors = {
      confirmed: '#16a34a', pending: '#d97706', checked_in: '#2563eb',
      completed: '#64748b', cancelled: '#dc2626', no_show: '#db2777',
      sync_conflict: '#ea580c'
    };
    const dotColor = statusColors[b.status] || '#22c55e';
    const isNonMember = !b.user_id || b.user_id === 'null' || b.user_id === null;

    return `
      <div class="s02-booking-compact" onclick="ScreenS02.openBookingDetail('${b.id}')"
        style="border-left: 3px solid ${dotColor};">
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <span class="s02-booking-compact__time">${formatTime12h(b.time)}</span>
          ${isNonMember ? '<span style="font-size:10px;">📞</span>' : ''}
        </div>
        <div class="s02-booking-compact__name">${b.name}</div>
        <div class="s02-booking-compact__meta">👥 ${b.guests} · ${b.table || '-'}</div>
      </div>
    `;
  }

  // ============================================================
  // MONTH VIEW — Calendar grid with density indicators
  // ============================================================
  function renderMonthView(list) {
    const firstDay = new Date(calendarYear, calendarMonth, 1);
    const lastDay = new Date(calendarYear, calendarMonth + 1, 0);
    const startDay = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1; // Monday start
    const totalDays = lastDay.getDate();
    const today = '2026-07-15';

    // Precompute booking counts per day
    const bookingMap = {};
    list.forEach(b => {
      if (!bookingMap[b.date]) bookingMap[b.date] = { total: 0, confirmed: 0, pending: 0, statuses: [] };
      bookingMap[b.date].total++;
      bookingMap[b.date][b.status] = (bookingMap[b.date][b.status] || 0) + 1;
      bookingMap[b.date].statuses.push(b.status);
    });

    let cells = '';
    // Previous month padding
    const prevMonthLast = new Date(calendarYear, calendarMonth, 0).getDate();
    for (let i = startDay - 1; i >= 0; i--) {
      const d = prevMonthLast - i;
      cells += `<div class="s02-month-cell s02-month-cell--other">${d}</div>`;
    }

    // Current month days
    for (let d = 1; d <= totalDays; d++) {
      const dateStr = `${calendarYear}-${String(calendarMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      const isToday = dateStr === today;
      const isSelected = dateStr === selectedDate;
      const dayData = bookingMap[dateStr];
      const count = dayData ? dayData.total : 0;
      const statusClass = getMonthCellClass(dayData);
      const statusDots = ['confirmed', 'pending', 'checked_in', 'completed', 'cancelled', 'no_show', 'sync_conflict']
        .filter(status => (dayData && (dayData[status] || 0) > 0))
        .map(status => `<span class="s02-dot" style="background:${getStatusColor(status)};"></span>`)
        .join('');

      cells += `
        <div class="s02-month-cell ${isToday ? 's02-month-cell--today' : ''} ${isSelected ? 's02-month-cell--selected' : ''} ${statusClass}"
          onclick="ScreenS02.selectMonthDate('${dateStr}')">
          <div class="s02-month-cell__day">${d}</div>
          ${count > 0 ? `
            <div class="s02-month-cell__count">${count}</div>
            <div class="s02-month-cell__dots">${statusDots}</div>
          ` : ''}
        </div>
      `;
    }

    // Next month padding
    const endDay = lastDay.getDay() === 0 ? 6 : lastDay.getDay() - 1;
    for (let i = 1; i <= 6 - endDay; i++) {
      cells += `<div class="s02-month-cell s02-month-cell--other">${i}</div>`;
    }

    // Selected date bookings list
    const selectedBookings = getBookingsForDate(selectedDate);

    return `
      <div class="s02-month-view">
        <div class="s02-month-calendar">
          <div class="s02-month-header">
            ${['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d =>
              `<div class="s02-month-header__day">${d}</div>`
            ).join('')}
          </div>
          <div class="s02-month-grid">${cells}</div>
          <div class="s02-month-legend">
            <span class="s02-legend-item"><span class="s02-dot" style="background:#22c55e;"></span> Confirmed</span>
            <span class="s02-legend-item"><span class="s02-dot" style="background:#eab308;"></span> Pending</span>
            <span class="s02-legend-item"><span class="s02-dot" style="background:#3b82f6;"></span> Checked-in</span>
            <span class="s02-legend-item"><span class="s02-dot" style="background:#9ca3af;"></span> Completed</span>
            <span class="s02-legend-item"><span class="s02-dot" style="background:#ef4444;"></span> Cancelled / No-show</span>
          </div>
        </div>
        <div class="s02-month-detail">
          <h3 style="font-family:var(--font-headline); font-size:16px; font-weight:600; margin-bottom:12px;">
            ${DAY_NAMES_FULL[getDayOfWeek(selectedDate)]}, ${selectedDate}
            <span style="font-size:13px; font-weight:400; color:var(--color-on-surface-variant); margin-left:8px;">
              (${selectedBookings.length} bookings)
            </span>
          </h3>
          ${selectedBookings.length > 0
            ? `<div class="s02-month-detail__list">${selectedBookings.map(b => renderBookingCell(b)).join('')}</div>`
            : `<div class="s02-empty-state">${I18n.t('no_bookings_for_date')}</div>`
          }
        </div>
      </div>
    `;
  }

  // ============================================================
  // LIST VIEW — Sortable table with filters
  // ============================================================
  function renderListView(list) {
    if (list.length === 0) {
      return `
        <div class="s02-empty-state" style="padding:60px 20px;">
          <div style="font-size:48px; opacity:0.3; margin-bottom:16px;">📭</div>
          <h3 style="font-size:16px; font-weight:600; margin-bottom:8px;">${I18n.t('no_results')}</h3>
          <p style="font-size:13px; color:var(--color-on-surface-variant);">${I18n.t('try_different_filters')}</p>
        </div>
      `;
    }

    const rows = list.map(b => {
      const isNonMember = !b.user_id || b.user_id === 'null' || b.user_id === null;
      const isPendingSync = b.pending_sync === true || b.source === 'offline_queue';
      const hasConflict = b.status === 'sync_conflict';

      const statusColors = {
        confirmed: { bg: 'rgba(0, 195, 137, 0.14)', text: '#007A53', dot: '#00C389' },
        pending: { bg: 'rgba(255, 181, 71, 0.2)', text: '#92400E', dot: '#FFB547' },
        checked_in: { bg: '#E2E8F0', text: '#0B1220', dot: '#1E293B' },
        completed: { bg: '#F1F5F9', text: '#64748B', dot: '#64748B' },
        cancelled: { bg: '#fee2e2', text: '#991b1b', dot: '#ef4444' },
        no_show: { bg: '#fee2e2', text: '#991b1b', dot: '#ef4444' },
        sync_conflict: { bg: '#fee2e2', text: '#991b1b', dot: '#ef4444' },
      };
      const sc = statusColors[b.status] || statusColors.confirmed;

      return `
        <tr class="s02-list-row ${hasConflict ? 's02-list-row--conflict' : ''}" onclick="ScreenS02.openBookingDetail('${b.id}')">
          <td style="white-space:nowrap;">
            <span class="s-booking-id">${b.id}</span>
          </td>
          <td style="white-space:nowrap; word-break:keep-all;">
            <div class="s-customer-name" style="font-weight:600; color:#0B1220; white-space:nowrap; word-break:keep-all; display:inline-flex; align-items:center; gap:6px;">
              <span>${b.name}</span>
              ${!b.user_id ? '<span class="badge badge--warning" style="font-size:9px; padding:1px 5px; white-space:nowrap;">Guest</span>' : ''}
            </div>
          </td>
          <td style="white-space:nowrap;">${formatDate(b.date)}</td>
          <td style="font-weight:600; white-space:nowrap;">${formatTime12h(b.time)}</td>
          <td style="white-space:nowrap;">👥 ${b.guests}</td>
          <td style="white-space:nowrap;">
            <span class="s02-booking-cell__status" style="background:${sc.bg}; color:${sc.text}; font-size:11px; white-space:nowrap;">
              <span class="s02-booking-cell__dot" style="background:${sc.dot};"></span>
              ${I18n.t('status_' + b.status) || b.status}
            </span>
            ${isPendingSync ? '<span style="font-size:10px; margin-left:4px;">🔄</span>' : ''}
            ${hasConflict ? '<span style="font-size:10px; margin-left:4px;">⚠️</span>' : ''}
          </td>
          <td onclick="event.stopPropagation();" style="white-space:nowrap;">
            <div style="display:flex; gap:4px;">
              ${b.status === 'confirmed' ? `
                <button class="btn btn-sm" style="padding:3px 8px; font-size:11px; background:#dcfce7; color:#166534;"
                  onclick="ScreenS02.updateStatus('${b.id}', 'checked_in')">Check-in</button>
                <button class="btn btn-sm" style="padding:3px 8px; font-size:11px; color:#991b1b;"
                  onclick="ScreenS02.updateStatus('${b.id}', 'no_show')">No-show</button>
              ` : ''}
              ${b.status === 'no_show' ? `
                <button class="btn btn-sm" style="padding:3px 8px; font-size:11px; background:#fef3c7; color:#92400e; border:1px solid #fcd34d; font-weight:600;"
                  onclick="ScreenS02.openUndoNoShowModal('${b.id}')">↩️ ${I18n.t('undo_no_show')}</button>
              ` : ''}
              ${b.status === 'pending' ? `
                <button class="btn btn-sm" style="padding:3px 8px; font-size:11px; background:#dcfce7; color:#166534;"
                  onclick="ScreenS02.updateStatus('${b.id}', 'confirmed')">Approve</button>
                <button class="btn btn-sm" style="padding:3px 8px; font-size:11px; color:#991b1b;"
                  onclick="ScreenS02.updateStatus('${b.id}', 'cancelled')">Reject</button>
              ` : ''}
              <button class="btn btn-sm btn-ghost" style="padding:3px 6px; font-size:11px;"
                onclick="ScreenS02.openBookingDetail('${b.id}')">View</button>
            </div>
          </td>
        </tr>
      `;
    }).join('');

    return `
      <div class="s02-list-view">
        <div class="data-table-wrapper">
          <div class="data-table-toolbar">
            <div class="data-table-toolbar__search">
              <span class="search-icon">${Components.icon('search', 14)}</span>
              <input type="text" placeholder="${I18n.t('search_customer')}..."
                value="${searchQuery}"
                oninput="ScreenS02.setSearch(this.value)">
            </div>
            <div style="font-size:13px; color:var(--color-on-surface-variant);">
              ${I18n.t('showing')} ${list.length} ${I18n.t('results')}
            </div>
          </div>
          <div class="data-table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>${I18n.t('customer')}</th>
                  <th>${I18n.t('date')}</th>
                  <th>${I18n.t('time')}</th>
                  <th>Guests</th>
                  <th>${I18n.t('status')}</th>
                  <th>${I18n.t('actions')}</th>
                </tr>
              </thead>
              <tbody>${rows}</tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  }

  // ============================================================
  // PDF MODAL
  // ============================================================
  function renderPdfModal() {
    const list = getBookingsForDate(selectedDate);
    const total = list.length;
    const confirmed = list.filter(r => r.status === 'confirmed').length;
    const checkedIn = list.filter(r => r.status === 'checked_in').length;
    const noShow = list.filter(r => r.status === 'no_show').length;
    const cancelled = list.filter(r => r.status === 'cancelled').length;

    return `
      <div class="s02-modal-overlay" onclick="if(event.target===this) ScreenS02.closePdfModal()">
        <div class="s02-modal" style="max-width:720px;">
          <div class="s02-modal__header">
            <h3 style="font-weight:700; font-size:16px; margin:0;">
              📄 ${I18n.t('pdf_report_title')}
            </h3>
            <button class="s02-modal__close" onclick="ScreenS02.closePdfModal()">✕</button>
          </div>
          <div class="s02-modal__body">
            <div id="pdf-printable-area" style="padding:20px; border:1px solid #cbd5e1; background:#f8fafc; font-family:'Courier New', monospace; font-size:12px; line-height:1.4; border-radius:8px;">
              <div style="text-align:center; margin-bottom:16px;">
                <h2 style="margin:0; font-size:16px; font-weight:700;">EZBOOKNOW - DAILY RESERVATION LEDGER</h2>
                <div>Report ID: RPT-06 (BAT-25 Auto-Generated)</div>
                <div>Date: ${selectedDate} &nbsp;&nbsp; Time: 07:00 AM (Yangon Time)</div>
              </div>
              <div style="margin-bottom:16px; border-bottom:1px dashed #333; padding-bottom:10px;">
                <strong>SUMMARY STATS:</strong><br>
                -----------------------------------------------------<br>
                Total Bookings Scheduled: ${total}<br>
                - Confirmed: ${confirmed} &nbsp;&nbsp; - Checked-in: ${checkedIn}<br>
                - No Show: ${noShow} &nbsp;&nbsp;&nbsp; - Cancelled: ${cancelled}<br>
                -----------------------------------------------------
              </div>
              <table style="width:100%; text-align:left; border-collapse:collapse; font-size:11px;">
                <thead>
                  <tr style="border-bottom:1px dashed #333;">
                    <th style="padding:4px 0;">ID</th>
                    <th style="padding:4px 0;">Name</th>
                    <th style="padding:4px 0;">Time</th>
                    <th style="padding:4px 0;">Guests</th>
                    <th style="padding:4px 0;">Table</th>
                    <th style="padding:4px 0;">Status</th>
                  </tr>
                </thead>
                <tbody>
                  ${list.map(r => `
                    <tr>
                      <td style="padding:4px 0;">${r.id}</td>
                      <td style="padding:4px 0;">${r.name}</td>
                      <td style="padding:4px 0;">${r.time}</td>
                      <td style="padding:4px 0;">${r.guests}</td>
                      <td style="padding:4px 0;">${r.table || 'Auto'}</td>
                      <td style="padding:4px 0;">${r.status.toUpperCase()}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
          <div class="s02-modal__footer">
            <button class="btn btn-sm btn-secondary" onclick="window.print()">Print Document</button>
            <button class="btn btn-sm btn-primary" onclick="ScreenS02.closePdfModal()">Close</button>
          </div>
        </div>
      </div>
    `;
  }

  // ============================================================
  // STATE ACTIONS
  // ============================================================
  function setView(view) {
    activeView = view;
    render();
  }

  function setDate(dateStr) {
    if (!dateStr) return;
    selectedDate = dateStr;
    const parts = dateStr.split('-');
    calendarYear = parseInt(parts[0]);
    calendarMonth = parseInt(parts[1]) - 1;
    render();
  }

  function setMonth(monthStr) {
    if (!monthStr) return;
    const parts = monthStr.split('-');
    calendarYear = parseInt(parts[0]);
    calendarMonth = parseInt(parts[1]) - 1;
    render();
  }

  function selectDayView(dateStr) {
    selectedDate = dateStr;
    activeView = 'day';
    render();
  }

  function navigateDate(delta) {
    if (activeView === 'month') {
      calendarMonth += delta;
      if (calendarMonth > 11) { calendarMonth = 0; calendarYear++; }
      if (calendarMonth < 0) { calendarMonth = 11; calendarYear--; }
    } else if (activeView === 'week' || activeView === 'list') {
      const d = new Date(selectedDate + 'T00:00:00+06:30');
      d.setDate(d.getDate() + (delta * 7));
      selectedDate = d.toISOString().split('T')[0];
      calendarMonth = d.getMonth();
      calendarYear = d.getFullYear();
    } else {
      const d = new Date(selectedDate + 'T00:00:00+06:30');
      d.setDate(d.getDate() + delta);
      selectedDate = d.toISOString().split('T')[0];
      calendarMonth = d.getMonth();
      calendarYear = d.getFullYear();
    }
    render();
  }

  function goToday() {
    selectedDate = '2026-07-20';
    calendarMonth = 6;
    calendarYear = 2026;
    render();
  }

  function selectMonthDate(dateStr) {
    selectedDate = dateStr;
    render();
  }

  function setStatusFilter(val) {
    statusFilter = val;
    render();
  }

  function setSearch(val) {
    searchQuery = val;
    render();
  }

  function updateStatus(id, newStatus) {
    const res = MockData.shopReservations.find(r => r.id === id);
    if (res) {
      if (isOffline) {
        res.pending_sync = true;
        showToast('info', 'Queued Offline', `Booking ${id} status change queued. Will sync when online.`);
      } else {
        res.status = newStatus;
        showToast('success', 'Status Updated', `Booking ${id} → ${newStatus.toUpperCase()}.`);
      }
      render();
    }
  }

  function toggleConflictDetail(id) {
    activeConflictId = activeConflictId === id ? null : id;
    render();
  }

  function resolveConflict(id) {
    const idx = MockData.shopReservations.findIndex(r => r.id === id);
    if (idx !== -1) {
      MockData.shopReservations.splice(idx, 1);
      showToast('success', 'Resolved', `Sync conflict resolved for booking ${id}.`);
      if (activeConflictId === id) activeConflictId = null;
      render();
    }
  }

  function openBookingDetail(id) {
    if (typeof ScreenS03A !== 'undefined') {
      ScreenS03A.open(id, () => render());
    }
  }

  function openUndoNoShowModal(id) {
    if (typeof ScreenS03A !== 'undefined') {
      ScreenS03A.openUndoNoShowModal(id);
    }
  }

  function openNewBookingModal() {
    if (typeof ScreenS03B !== 'undefined') {
      ScreenS03B.open(() => render());
    }
  }

  function openPdfModal() { isPdfModalOpen = true; render(); }
  function closePdfModal() { isPdfModalOpen = false; render(); }

  // ============================================================
  // NETWORK TOGGLE (Demo)
  // ============================================================
  function toggleNetwork() {
    isOffline = !isOffline;
    if (isOffline) {
      pendingSyncCount = Math.floor(Math.random() * 3) + 1;
      showToast('info', 'Network Changed', 'Platform set to OFFLINE mode. Cached data displayed.');
    } else {
      if (pendingSyncCount > 0) {
        showToast('success', 'Sync Complete', `${pendingSyncCount} offline bookings synced successfully.`);
        pendingSyncCount = 0;
      } else {
        showToast('success', 'Network Restored', 'Connection restored. Realtime sync active.');
      }
    }
    render();
  }

  // ============================================================
  // REALTIME SIMULATION
  // ============================================================
  function simulateRealtimeBooking() {
    const names = ['Ko Thiha', 'Daw Mya', 'U Kyaw Zin', 'Ma Su Su', 'Ko Naing Win'];
    const newBooking = {
      id: `SR-ENT-${selectedDate.replace(/-/g, '')}-${String(Math.floor(Math.random() * 900) + 100).padStart(3, '0')}`,
      name: names[Math.floor(Math.random() * names.length)],
      phone: `+95 9 ${Math.floor(Math.random() * 900) + 100} ${Math.floor(Math.random() * 900) + 100}`,
      date: selectedDate,
      time: `${String(Math.floor(Math.random() * 12) + 11).padStart(2, '0')}:${Math.random() > 0.5 ? '00' : '30'}`,
      guests: Math.floor(Math.random() * 6) + 1,
      table: null,
      status: 'confirmed',
      source: 'online',
      user_id: `usr-${Math.floor(Math.random() * 1000)}`,
      preferred_seat_tags: [],
      notes: '',
      _isNew: true
    };
    MockData.shopReservations.unshift(newBooking);
    showToast('success', '🟢 New Booking', `Real-time: ${newBooking.name} booked for ${newBooking.guests} guests.`);
    render();
  }

  // Auto-simulate new bookings periodically
  let realtimeInterval = null;
  function startRealtimeSimulation() {
    if (realtimeInterval) clearInterval(realtimeInterval);
    realtimeInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        simulateRealtimeBooking();
      }
    }, 15000);
  }

  // ============================================================
  // PUBLIC API
  // ============================================================
  return {
    render,
    setView,
    setDate,
    setMonth,
    selectDayView,
    navigateDate,
    goToday,
    selectMonthDate,
    setStatusFilter,
    setSearch,
    updateStatus,
    toggleConflictDetail,
    resolveConflict,
    openBookingDetail,
    openUndoNoShowModal,
    openNewBookingModal,
    openPdfModal,
    closePdfModal,
    toggleNetwork,
    simulateRealtimeBooking,
    startRealtimeSimulation,
  };
})();
