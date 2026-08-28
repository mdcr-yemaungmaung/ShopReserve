/* ============================================================
   EzBookNow Screen S-01 — Shop Management Dashboard Screen
   Conforms strictly to Basic Design: docs/01_bd/EzBookNow_画面設計書.md §3.27
   Language: English Only
   ============================================================ */

const ScreenS01 = (() => {
  // Read onboarding status from local storage (default is active)
  let shopStatus = 'active';
  try {
    shopStatus = localStorage.getItem('s01_shop_status') || 'active';
  } catch (e) {
    shopStatus = 'active';
  }

  // Active simulated business date (Default matching rich mock data: 2026-07-20)
  const activeDate = '2026-07-20';

  function formatTime12h(timeStr) {
    if (!timeStr) return '-';
    if (timeStr.includes('AM') || timeStr.includes('PM')) {
      return `<span style="font-weight:700; color:var(--color-on-surface); white-space:nowrap;">${timeStr}</span>`;
    }
    const parts = timeStr.split(':');
    const hr = parseInt(parts[0], 10);
    if (isNaN(hr)) return timeStr;
    const ampm = hr >= 12 ? 'PM' : 'AM';
    const hr12 = hr === 0 ? 12 : hr > 12 ? hr - 12 : hr;
    const min = (parts[1] || '00').padStart(2, '0');
    return `<span style="font-weight:700; color:var(--color-on-surface); white-space:nowrap;">${hr12}:${min} ${ampm}</span>`;
  }

  function render() {
    if (typeof document !== 'undefined' && document.body) {
      document.body.classList.add('screen-s01-s02-theme');
    }
    const shop = Router.getAuth() || { name: 'The Glass Pavilion', id: 'r1' };
    
    // Check if network is offline simulation
    const isOffline = localStorage.getItem('s09_offline') === 'true';

    // 1. Pending sync queue & conflicts
    const localQueue = JSON.parse(localStorage.getItem('pending_bookings') || '[]');
    const syncConflictCount = MockData.shopReservations.filter(r => r.is_conflict).length;
    const syncWaitCount = localQueue.length;
    
    // Unread notifications count for S-20 badge
    const unreadNotifCount = 3;

    // Combine local pending offline bookings with master shopReservations
    const allReservations = [...localQueue, ...MockData.shopReservations];
    const todaysBookings = allReservations.filter(r => r.date === activeDate);

    // --- KPI Calculations (Strictly 4 metrics per §3.27) ---
    // 1. Today's Bookings Count
    const bookingCount = todaysBookings.length;
    // 2. Checked-in & Completed Count
    const checkinCompletedCount = todaysBookings.filter(r => r.status === 'checked_in' || r.status === 'completed').length;
    // 3. Cancelled Count
    const cancelledCount = todaysBookings.filter(r => r.status === 'cancelled').length;
    // 4. No-Show Count
    const noShowCount = todaysBookings.filter(r => r.status === 'no_show').length;

    // --- Action Required Counts ---
    // Pending approval count (auto_confirm=FALSE shops)
    const pendingActionCount = todaysBookings.filter(r => r.status === 'pending').length;
    // Pending guest callback count (guest bookings user_id=NULL and pending)
    const pendingGuestCallbackCount = todaysBookings.filter(r => (r.user_id === null || !r.user_id) && r.status === 'pending').length;

    // 2. Top Alert Banners / Status Warnings (Suspended, Closed, Pending, Rejected, Offline)
    let statusAlertHtml = '';

    if (shopStatus === 'suspended') {
      // Review Item No.50: Fixed Top Suspension Banner with reason, date, procedure, contact
      statusAlertHtml = `
        <div class="card mb-6" style="border: 2px solid var(--color-error, #ba1a1a); background: rgba(186, 26, 26, 0.06); border-radius: var(--radius-md, 8px); padding: 16px 20px; font-family: 'Inter', sans-serif;">
          <div style="display:flex; align-items:flex-start; gap:14px;">
            <span style="font-size:24px; line-height:1;">🚫</span>
            <div style="flex:1;">
              <div style="font-size:15px; font-weight:700; color:var(--color-error, #ba1a1a); margin-bottom:6px;">
                Shop Listing Suspended (SHOP SUSPENDED)
              </div>
              <div style="font-size:13px; color:var(--color-on-surface, #1c1b1b); line-height:1.6; margin-bottom:10px;">
                <strong>Reason:</strong> Compliance verification pending and delayed renewal of business license documents<br>
                <strong>Suspension Date:</strong> 2026-08-01<br>
                <strong>Procedure to Resume:</strong> Please submit updated business registration documents to operations support. Listing will be resumed upon verification.<br>
                <strong>Operations Contact:</strong> support@ezbooknow.com / 09-770001111
              </div>
              <div style="font-size:12px; background:rgba(186, 26, 26, 0.1); border-radius:6px; padding:6px 12px; color:var(--color-error, #ba1a1a); font-weight:600;">
                ℹ️ Existing reservations can be processed normally. Modifications to shop settings and new incoming reservations are disabled during suspension.
              </div>
            </div>
          </div>
        </div>
      `;
    } else if (shopStatus === 'closed') {
      statusAlertHtml = `
        <div class="card mb-6" style="border: 2px solid var(--color-outline, #777680); background: var(--color-surface-container-high, #eae7e7); border-radius: var(--radius-md, 8px); padding: 16px; font-family: 'Inter', sans-serif;">
          <div style="display:flex; align-items:center; gap:12px;">
            <span style="font-size:24px;">🔒</span>
            <div>
              <strong style="color:var(--color-on-surface); font-size:14px;">Shop Closed (Closure Processing in Progress)</strong>
              <div style="font-size:12.5px; color:var(--color-outline); margin-top:2px;">
                Only the Booking Ledger remains accessible to process remaining customer reservations.
              </div>
            </div>
          </div>
        </div>
      `;
    } else if (shopStatus === 'pending') {
      statusAlertHtml = `
        <div class="card mb-6" style="border: 1.5px solid var(--color-warning, #795900); background: var(--color-warning-container, #ffc641); color: var(--color-on-warning-container, #715300); border-radius: var(--radius-md, 8px); padding: 14px 18px; font-family: 'Inter', sans-serif;">
          <div style="display:flex; align-items:flex-start; gap:10px;">
            <span style="font-size:20px;">⏳</span>
            <div>
              <strong>Shop Verification Pending (Under Review)</strong>
              <div style="font-size:12px; margin-top:4px; opacity:0.95;">
                System operators are reviewing submitted business documents and shop info. All features will be unlocked upon approval.
              </div>
            </div>
          </div>
        </div>
      `;
    } else if (shopStatus === 'rejected') {
      statusAlertHtml = `
        <div class="card mb-6" style="border: 1.5px solid var(--color-error, #ba1a1a); background: var(--color-error-container, #ffdad6); color: var(--color-on-error-container, #93000a); border-radius: var(--radius-md, 8px); padding: 14px 18px; font-family: 'Inter', sans-serif;">
          <div style="display:flex; align-items:flex-start; gap:10px;">
            <span style="font-size:20px;">⚠️</span>
            <div>
              <strong>Shop Onboarding Rejected</strong>
              <div style="font-size:12px; margin-top:4px;">
                Onboarding verification failed due to missing or expired business credentials. Please review information and resubmit.
              </div>
              <div style="margin-top:8px;">
                <button class="btn btn-sm btn-primary" onclick="Router.navigate('/shop/application')">Review Application & Resubmit</button>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    const offlineAlertHtml = isOffline ? `
      <div class="card mb-6" style="border: 1.5px solid var(--color-warning, #795900); background: rgba(255, 198, 65, 0.15); border-radius: var(--radius-md, 8px); padding: 12px 16px; font-family: 'Inter', sans-serif; display:flex; align-items:center; justify-content:between; flex-wrap:wrap; gap:8px;">
        <div style="display:flex; align-items:center; gap:8px;">
          <span style="font-size:18px;">📶</span>
          <div>
            <strong style="font-size:12.5px; color:var(--color-on-surface);">Offline Mode (Disconnected)</strong>
            <div style="font-size:11.5px; color:var(--color-outline);">Operating offline using local device cache (IndexedDB). Changes will automatically synchronize upon reconnection.</div>
          </div>
        </div>
        <span class="badge badge--warning" style="font-size:11px;">Offline Cached</span>
      </div>
    ` : '';

    // 3. Top Badges Strip (Notification Center Badge -> S-20, Sync Queue Badge -> S-02)
    const topBadgesHtml = `
      <div class="flex items-center justify-between flex-wrap gap-3 mb-6" style="background:#FFFFFF; padding:10px 16px; border-radius:var(--radius-md, 8px); border:1px solid #E2E8F0;">
        <div class="flex items-center gap-4 flex-wrap">
          <!-- Sync Queue / Conflict Badge -> S-02 -->
          <div onclick="Router.navigate('/shop/ledger')" style="display:inline-flex; align-items:center; gap:6px; cursor:pointer; font-size:12.5px; font-weight:600; color:${syncConflictCount > 0 ? 'var(--color-error)' : 'var(--color-on-surface)'};" title="View Booking Ledger">
            <span>🔄</span>
            <span>Sync Queue / Conflicts</span>
            ${syncConflictCount > 0 ? `
              <span class="badge badge--error" style="font-size:11px; padding:1px 7px; border-radius:12px; background:#fee2e2; color:#991b1b; border:1px solid #fecaca;">⚠️ ${syncConflictCount} conflict</span>
            ` : syncWaitCount > 0 ? `
              <span class="badge badge--warning" style="font-size:11px; padding:1px 7px; border-radius:12px; background:#ffedd5; color:#9a3412; border:1px solid #fed7aa;">${syncWaitCount} queued</span>
            ` : `
              <span class="badge badge--success" style="font-size:11px; padding:1px 7px; border-radius:12px; background:#d1fae5; color:#065f46; border:1px solid #a7f3d0;">0 synced</span>
            `}
          </div>
        </div>

        <div style="font-size:11.5px; color:var(--color-outline); font-weight:500;">
          📅 Business Date: <strong>${activeDate}</strong>
        </div>
      </div>
    `;

    // 4. Initial Setup Guide (Onboarding Checklist)
    // Shown when newly approved / onboarding mode
    let onboardingGuideHtml = '';
    if (shopStatus === 'onboarding') {
      onboardingGuideHtml = `
        <div class="card mb-6" style="border:1.5px solid #2563EB; background:linear-gradient(135deg, rgba(37, 99, 235, 0.04), rgba(16, 185, 129, 0.06)); border-radius:var(--radius-md, 8px); font-family:'Inter', sans-serif;">
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center gap-2">
              <span style="font-size:20px;">🚀</span>
              <h3 class="text-label-md" style="font-weight:700; font-size:14px; color:#1E293B; margin:0;">
                Newly Approved Shop Setup Guide (Checklist)
              </h3>
            </div>
            <span class="badge badge--info" style="font-size:11px;">Step 1 of 4</span>
          </div>
          <p style="font-size:12px; color:var(--color-outline); margin-top:0; margin-bottom:12px; line-height:1.4;">
            Congratulations on your shop approval. Please complete these 4 setup steps to start accepting online reservations.
          </p>
          <div class="grid grid-2 gap-3" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr));">
            <div class="p-3 bg-surface-container flex items-center justify-between" style="border-radius:6px; cursor:pointer;" onclick="Router.navigate('/shop/availability')">
              <div style="font-size:12px; font-weight:600;">⏰ 1. Business Hours & Slots</div>
              <span style="color:#2563EB;">→</span>
            </div>
            <div class="p-3 bg-surface-container flex items-center justify-between" style="border-radius:6px; cursor:pointer;" onclick="Router.navigate('/shop/shop-info')">
              <div style="font-size:12px; font-weight:600;">🏬 2. Shop Info & Menu Items</div>
              <span style="color:#2563EB;">→</span>
            </div>
            <div class="p-3 bg-surface-container flex items-center justify-between" style="border-radius:6px; cursor:pointer;" onclick="Router.navigate('/shop/staff-tables')">
              <div style="font-size:12px; font-weight:600;">👥 3. Staff Roster</div>
              <span style="color:#2563EB;">→</span>
            </div>
            <div class="p-3 bg-surface-container flex items-center justify-between" style="border-radius:6px; cursor:pointer;" onclick="Router.navigate('/shop/tables')">
              <div style="font-size:12px; font-weight:600;">🪑 4. Tables & Floor Plan</div>
              <span style="color:#2563EB;">→</span>
            </div>
          </div>
        </div>
      `;
    }

    // 5. 4 KPI Cards (Strictly per §3.27)
    let statsHtml = '';
    if (shopStatus === 'active' || shopStatus === 'onboarding') {
      statsHtml = `
        <div class="s01-kpi-grid grid grid-4 gap-4 mb-6" style="margin-bottom: 24px; gap: 16px;">
          ${Components.kpiCard('calendar', "Today's Bookings", `${bookingCount} Bookings`, `${activeDate}`, 'stable', 'primary')}
          ${Components.kpiCard('check', 'Checked-in / Completed', `${checkinCompletedCount} Guests`, 'Checked-in & Completed', 'up', 'success')}
          ${Components.kpiCard('x', 'Cancelled Bookings', `${cancelledCount} Cancelled`, 'Cancelled', 'stable', 'neutral')}
          ${Components.kpiCard('alertCircle', 'No-Shows', `${noShowCount} No-Shows`, 'No-Shows', 'down', 'error')}
        </div>
      `;
    }

    // 6. Action Required & Callback Queue Cards
    let actionCardsHtml = '';
    if (shopStatus === 'active' || shopStatus === 'onboarding' || shopStatus === 'suspended') {
      actionCardsHtml = `
        <div class="s01-action-grid grid grid-2 gap-4 mb-6" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:16px; margin-bottom:24px;">
          <!-- Pending Approvals Card -->
          <div class="card p-4 flex items-center justify-between" style="background:linear-gradient(145deg, #FFFFFF 0%, rgba(255, 181, 71, 0.18) 100%); border: 1px solid rgba(255, 181, 71, 0.4); border-left: 4px solid #FFB547; border-radius: var(--radius-md); font-family:'Inter', sans-serif;">
            <div>
              <div style="font-size:12px; font-weight:700; color:#78350F; text-transform:uppercase; letter-spacing:0.04em;">Action Required: Pending Approvals</div>
              <div style="font-size:22px; font-weight:700; color:#B45309; margin-top:2px;">
                ${pendingActionCount} <span style="font-size:13px; font-weight:500;">Bookings</span>
              </div>
              <div style="font-size:11.5px; color:#92400E; margin-top:2px;">Awaiting merchant confirmation before seating</div>
            </div>
            <button class="btn btn-secondary btn-sm" style="font-weight:600; white-space:nowrap; border-color:#FFB547; color:#78350F; background:#FFFFFF;" onclick="Router.navigate('/shop/ledger')">
              Review List →
            </button>
          </div>

          <!-- Pending Guest Callbacks Card -->
          <div class="card p-4 flex items-center justify-between" style="background:linear-gradient(145deg, #FFFFFF 0%, #F1F5F9 100%); border: 1px solid rgba(30, 41, 59, 0.2); border-left: 4px solid #1E293B; border-radius: var(--radius-md); font-family:'Inter', sans-serif;">
            <div>
              <div style="font-size:12px; font-weight:700; color:#0B1220; text-transform:uppercase; letter-spacing:0.04em;">Action Required: Guest Phone Verification</div>
              <div style="font-size:22px; font-weight:700; color:#0B1220; margin-top:2px;">
                ${pendingGuestCallbackCount} <span style="font-size:13px; font-weight:500;">Bookings</span>
              </div>
              <div style="font-size:11.5px; color:#64748B; margin-top:2px;">Direct guest bookings awaiting phone callback</div>
            </div>
            <button class="btn btn-secondary btn-sm" style="font-weight:600; white-space:nowrap; border-color:#CBD5E1; color:#0B1220; background:#FFFFFF;" onclick="Router.navigate('/shop/ledger')">
              Verify Callbacks →
            </button>
          </div>
        </div>
      `;
    }

    // 7. Availability Capacity Gauge (Today & Tomorrow Slots)
    const totalCapacity = 100;
    const totalOccupiedSeats = todaysBookings.reduce((acc, curr) => acc + (curr.status !== 'cancelled' ? (curr.guests || 2) : 0), 0);
    const availableSeats = Math.max(0, totalCapacity - totalOccupiedSeats);
    const vacancyPercentage = Math.round((availableSeats / totalCapacity) * 100);
    const occupancyPercentage = 100 - vacancyPercentage;
    const isFull = availableSeats === 0;

    let availabilityGaugeHtml = '';
    if (shopStatus === 'active' || shopStatus === 'onboarding') {
      availabilityGaugeHtml = `
        <div class="card mb-6" style="background:#FFFFFF; border: 1px solid #E2E8F0; border-radius: var(--radius-md); font-family:'Inter', sans-serif;">
          <div class="flex justify-between items-center mb-2">
            <h3 class="text-label-md" style="font-weight:700; color:#111827; margin:0;">
              📊 Table Availability & Capacity
            </h3>
            ${isFull ? `
              <span class="badge badge--error" style="font-size:11px; font-weight:700;">FULL (100% Occupied)</span>
            ` : `
              <span class="badge badge--success" style="font-size:11px; font-weight:600;">${vacancyPercentage}% available</span>
            `}
          </div>
          
          <div style="font-size:12.5px; color:#64748B; margin-bottom:8px;">
            Available Today: ${availableSeats} of ${totalCapacity} seats (${occupancyPercentage}% reserved)
          </div>
          
          <div style="width:100%; height:16px; background:#F8FAFC; border:1px solid #E2E8F0; border-radius:10px; overflow:hidden; position:relative;">
            <div style="width:${occupancyPercentage}%; height:100%; background: ${isFull ? '#EF4444' : occupancyPercentage > 80 ? 'linear-gradient(90deg, #FFB547, #EF4444)' : 'linear-gradient(90deg, #0B1220, #00C389)'}; border-radius:10px; transition: width 0.5s ease-in-out;"></div>
          </div>

          <div class="flex justify-between items-center mt-3" style="font-size:11px; color:#64748B;">
            <span>📅 Today (${activeDate}): ${occupancyPercentage}% booked</span>
            <span>📅 Tomorrow (2026-07-21): 45% booked</span>
          </div>
        </div>
      `;
    }

    // 8. Quick Actions (Clean distinct shortcuts, no duplicates)
    const isSuspended = shopStatus === 'suspended';
    const isLockedAll = shopStatus === 'pending' || shopStatus === 'rejected' || shopStatus === 'closed';

    const quickActionsHtml = `
      <div class="card mb-6" style="background:#FFFFFF; border: 1px solid #E2E8F0; border-radius: var(--radius-md); position:relative;">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-label-md" style="font-weight:700; color:#1E293B; margin:0;">Quick Management Shortcuts</h3>
          ${isSuspended ? `
            <span class="badge badge--error" style="font-size:11px;">🔒 Settings Locked (Suspended)</span>
          ` : ''}
        </div>
        
        <div class="flex gap-3 flex-wrap">
          <!-- Availability Settings (Disabled when suspended) -->
          <button class="btn btn-secondary btn-sm" onclick="${isSuspended ? `alert('Settings cannot be modified while shop is suspended')` : `Router.navigate('/shop/availability')`}" style="${isSuspended ? 'opacity:0.5; cursor:not-allowed;' : ''}" title="${isSuspended ? 'Settings cannot be modified while shop is suspended' : ''}">
            ${Components.icon('clock', 14)} Availability & Hours
          </button>
          
          <!-- Shop Info (Disabled when suspended) -->
          <button class="btn btn-secondary btn-sm" onclick="${isSuspended ? `alert('Settings cannot be modified while shop is suspended')` : `Router.navigate('/shop/shop-info')`}" style="${isSuspended ? 'opacity:0.5; cursor:not-allowed;' : ''}" title="${isSuspended ? 'Settings cannot be modified while shop is suspended' : ''}">
            ${Components.icon('store', 14)} Shop Profile & Menus
          </button>

          <!-- Tables & Seat Tags (Disabled when suspended) -->
          <button class="btn btn-secondary btn-sm" onclick="${isSuspended ? `alert('Settings cannot be modified while shop is suspended')` : `Router.navigate('/shop/tables')`}" style="${isSuspended ? 'opacity:0.5; cursor:not-allowed;' : ''}" title="${isSuspended ? 'Settings cannot be modified while shop is suspended' : ''}">
            🪑 Floor Plan & Tables
          </button>

          <!-- Staff Accounts (Disabled when suspended) -->
          <button class="btn btn-secondary btn-sm" onclick="${isSuspended ? `alert('Settings cannot be modified while shop is suspended')` : `Router.navigate('/shop/staff-accounts')`}" style="${isSuspended ? 'opacity:0.5; cursor:not-allowed;' : ''}" title="${isSuspended ? 'Settings cannot be modified while shop is suspended' : ''}">
            👥 Staff Accounts
          </button>

          <!-- Customer Management -->
          <button class="btn btn-secondary btn-sm" onclick="Router.navigate('/shop/customers')">
            📇 Customer Directory
          </button>
        </div>
      </div>
    `;

    // 9. Recent Bookings Table
    let recentBookingsTable = '';
    if (shopStatus === 'active' || shopStatus === 'onboarding' || shopStatus === 'suspended') {
      const displayBookings = todaysBookings.slice(0, 10);
      if (displayBookings.length === 0) {
        recentBookingsTable = `
          <div style="padding:48px 24px; text-align:center; color:var(--color-outline); font-family:'Inter', sans-serif;">
            <div style="font-size:40px; margin-bottom:12px;">📅</div>
            <div style="font-weight:600; font-size:14px;">No reservations scheduled for today.</div>
          </div>
        `;
      } else {
        const rowsHtml = displayBookings.map(b => `
          <tr onclick="ScreenS01.openBookingDetail('${b.id}')" style="cursor:pointer;" title="Click to view booking details">
            <td style="white-space:nowrap;"><span class="s-booking-id">${b.id}</span></td>
            <td style="white-space:nowrap; word-break:keep-all;">
              <div class="s-customer-name" style="font-weight:600; color:#1E293B; white-space:nowrap; word-break:keep-all; display:inline-flex; align-items:center; gap:6px;">
                <span>${b.name}</span>
                ${!b.user_id ? '<span class="badge badge--warning" style="font-size:9px; padding:1px 5px; white-space:nowrap; display:inline-block;">Guest</span>' : ''}
              </div>
            </td>
            <td style="font-weight:700; color:#1E293B; white-space:nowrap;">${formatTime12h(b.time)}</td>
            <td style="white-space:nowrap;">👥 ${b.guests}</td>
            <td style="white-space:nowrap;"><span class="badge badge--info" style="background:#dbeafe; color:#1e40af; font-weight:700; font-size:12px; border-radius:20px; padding:3px 10px; border:1px solid #bfdbfe; white-space:nowrap;">${b.table || 'Auto'}</span></td>
            <td style="white-space:nowrap;">${Components.statusBadge(b.status)}</td>
          </tr>
        `).join('');

        recentBookingsTable = Components.dataTable({
          columns: ['ID', 'Customer', 'Time', 'Guests', 'Table', 'Status'],
          rows: rowsHtml,
          searchPlaceholder: 'Search customer name...',
          pagination: false
        });
      }
    }

    // 10. Notifications & System Announcements
    let announcementsHtml = '';
    if (shopStatus === 'active' || shopStatus === 'onboarding' || shopStatus === 'suspended') {
      const announcements = MockData.announcements || [];
      announcementsHtml = `
        <div class="card mb-6" style="background:#FFFFFF; border: 1px solid #E2E8F0; border-radius: var(--radius-md); font-family:'Inter', sans-serif;">
          <div class="flex justify-between items-center mb-3">
            <h3 class="text-label-md" style="font-weight:700; color:var(--color-primary); margin:0;">
              📢 System Announcements
            </h3>
            <button class="btn btn-text btn-sm" style="font-size:11px; padding:0; color:#0F768E;" onclick="Router.navigate('/shop/notifications')">
              View All →
            </button>
          </div>
          <div class="flex flex-col gap-3">
            ${announcements.slice(0, 3).map(a => `
              <div style="border-bottom:1px solid #E2E8F0; padding-bottom:8px;">
                <div class="flex justify-between items-center mb-1">
                  <strong style="font-size:12px; color:var(--color-on-surface);">${a.title}</strong>
                  <span style="font-size:10px; color:var(--color-outline);">${a.date || 'Today'}</span>
                </div>
                <p style="font-size:11.5px; color:var(--color-outline); margin:0; line-height:1.4;">${a.content || a.summary}</p>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    // 11. Realtime Sandbox Simulator Widget
    const simulatorHtml = `
      <div class="card mt-6 p-4" style="border: 1px solid #E2E8F0; border-radius: var(--radius-md); background: #FFFFFF; font-family: 'Inter', sans-serif;">
        <div style="font-weight:700; font-size:13px; color:#1E293B; margin-bottom:8px; display:flex; align-items:center; justify-content:between;">
          <div style="display:flex; align-items:center; gap:6px;">
            🛠️ Realtime & Verification Simulator
          </div>
          <span class="badge badge--info" style="font-size:10px;">Operational Controls</span>
        </div>
        
        <div class="flex flex-col gap-4">
          <div class="flex justify-between items-center flex-wrap gap-2" style="font-size:12.5px;">
            <span>Simulated Shop Status:</span>
            <select class="form-input" onchange="ScreenS01.changeShopStatus(this.value)" style="font-size:12px; height:32px; padding:4px 10px; width:260px; cursor:pointer;">
              <option value="active" ${shopStatus === 'active' ? 'selected' : ''}>Active / Approved (Normal Operations)</option>
              <option value="onboarding" ${shopStatus === 'onboarding' ? 'selected' : ''}>Onboarding (Newly Approved Checklist)</option>
              <option value="suspended" ${shopStatus === 'suspended' ? 'selected' : ''}>Suspended (Listing Suspended)</option>
              <option value="closed" ${shopStatus === 'closed' ? 'selected' : ''}>Closed (Shop Closure Processing)</option>
              <option value="pending" ${shopStatus === 'pending' ? 'selected' : ''}>Pending Review (Under Operator Review)</option>
              <option value="rejected" ${shopStatus === 'rejected' ? 'selected' : ''}>Rejected (Onboarding Rejected)</option>
            </select>
          </div>

          <div style="border-top:1px dashed #E2E8F0; padding-top:10px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
            <div style="font-size:11.5px; color:var(--color-outline);">
              ⚡ Realtime Event Simulator
            </div>
            <button class="btn btn-primary btn-sm" style="font-size:11px; height:30px;" onclick="ScreenS01.simulateRealtimeBooking()">
              ⚡ Simulate Realtime Booking Arrival
            </button>
          </div>
        </div>
      </div>
    `;

    const lang = (typeof I18n !== 'undefined') ? I18n.getLang() : 'en';
    const formattedHeader = `
      <div class="s01-dashboard-header mb-6" style="background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 14px; padding: 20px 24px; box-shadow: 0 1px 4px rgba(11,18,32,0.04); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
        <div style="flex: 1; min-width: 280px;">
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px;">
            <span style="display: inline-flex; align-items: center; gap: 6px; font-size: 11.5px; font-weight: 700; background: rgba(0, 195, 137, 0.12); color: #007A53; padding: 3px 9px; border-radius: 6px; border: 1px solid rgba(0, 195, 137, 0.3);">
              <span style="width: 7px; height: 7px; border-radius: 50%; background: #00C389; display: inline-block;"></span>
              ${shop.shopName || 'The Glass Pavilion'} • ${lang === 'mm' ? 'ဆိုင်ဖွင့်ထားသည်' : 'Open for Service'}
            </span>
            <span style="font-size: 12px; color: #CBD5E1;">•</span>
            <span style="font-size: 12px; font-weight: 600; color: #64748B;">
              ${lang === 'mm' ? 'ဆိုင်စီမံခန့်ခွဲမှု ပေါ်တယ်' : 'Merchant Operations Hub'}
            </span>
          </div>

          <h1 style="font-size: 26px; font-weight: 800; color: #0B1220; margin: 0 0 6px 0; font-family: 'Outfit', 'Inter', sans-serif; letter-spacing: -0.02em; display: flex; align-items: center; gap: 8px;">
            <span>${lang === 'mm' ? 'အကျဉ်းချုပ် (Overview)' : 'Overview'}</span>
          </h1>

          <p style="font-size: 13.5px; color: #475569; margin: 0; line-height: 1.5;">
            ${lang === 'mm' 
              ? 'ယနေ့အတွက် ဘွတ်ကင်အခြေအနေ၊ စားပွဲနေရာလွတ်နှင့် ဆိုင်လုပ်ငန်းဆောင်ရွက်မှု အနှစ်ချုပ် အချက်အလက်များ။' 
              : `Real-time operational summary, reservation status, and dining capacity for <strong style="color: #0B1220; font-weight: 600;">${shop.shopName || 'The Glass Pavilion'}</strong>.`}
          </p>
        </div>

        <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
          <button class="btn btn-primary btn-sm" onclick="ScreenS03B.open(() => ScreenS01.render())" style="font-weight: 700; display: inline-flex; align-items: center; gap: 6px; padding: 9px 18px; border-radius: 8px; background: #0B1220; color: #FFFFFF; box-shadow: 0 2px 8px rgba(11,18,32,0.18);">
            ${Components.icon('plus', 14)} ${lang === 'mm' ? 'ဘွတ်ကင် အသစ်' : 'New Reservation'}
          </button>
        </div>
      </div>
    `;

    const content = `
      ${formattedHeader}
      
      <div style="max-width:1040px; margin:0 auto;">
        ${statusAlertHtml}
        ${offlineAlertHtml}
        ${topBadgesHtml}
        ${onboardingGuideHtml}
        ${statsHtml}
        ${actionCardsHtml}
        
        <div class="grid grid-2-1 gap-6 mb-6" style="display:grid; grid-template-columns: ${(shopStatus === 'active' || shopStatus === 'onboarding' || shopStatus === 'suspended') ? '2fr 1fr' : '1fr'}; gap:24px;">
          <div class="flex flex-col gap-6">
            ${quickActionsHtml}
            ${(shopStatus === 'active' || shopStatus === 'onboarding' || shopStatus === 'suspended') ? `
              <div class="card p-0 overflow-hidden">
                <div class="flex justify-between items-center p-4" style="border-bottom:1px solid var(--color-surface-container);">
                  <h3 class="text-label-md" style="font-weight:700; color:var(--color-primary); margin:0;">
                    Today's Reservations
                  </h3>
                  <button class="btn btn-text btn-sm" style="font-size:11.5px; padding:0; color:#0F768E; font-weight:600;" onclick="Router.navigate('/shop/ledger')">
                    View Full Ledger →
                  </button>
                </div>
                ${recentBookingsTable}
              </div>
            ` : ''}
          </div>
          
          ${(shopStatus === 'active' || shopStatus === 'onboarding' || shopStatus === 'suspended') ? `
            <div class="flex flex-col gap-6">
              ${availabilityGaugeHtml}
              ${announcementsHtml}
            </div>
          ` : ''}
        </div>

        ${simulatorHtml}
      </div>
    `;

    App.renderAdminPage('shop', '', content);
  }

  function changeShopStatus(status) {
    shopStatus = status;
    localStorage.setItem('s01_shop_status', status);
    showToast('info', 'Status Changed', `Shop status set to ${status.toUpperCase()}`);
    render();
  }

  function simulateRealtimeBooking() {
    const mockNames = ['Ko Min Min', 'Ma Thida', 'U Tin Tun', 'Daw Khin Win', 'Ko Kaung Htet', 'Ma Hnin Yu'];
    const mockTables = ['T-01', 'T-03', 'T-05', 'T-06', 'T-09', 'W-01', 'VIP-01'];
    const randomName = mockNames[Math.floor(Math.random() * mockNames.length)];
    const randomTable = mockTables[Math.floor(Math.random() * mockTables.length)];
    const randomGuests = Math.floor(2 + Math.random() * 5); // 2-6 guests
    const randomTime = `${Math.floor(18 + Math.random() * 3)}:30`;

    const newBooking = {
      id: `SR-ENT-${activeDate.replace(/-/g, '')}-${String(Math.floor(100 + Math.random() * 900)).padStart(3, '0')}`,
      name: randomName,
      phone: `+95 9 4500 ${Math.floor(1000 + Math.random() * 9000)}`,
      date: activeDate,
      time: randomTime,
      guests: randomGuests,
      table: randomTable,
      status: 'confirmed',
      source: 'online',
      user_id: `usr-rt-${Math.floor(Math.random() * 100)}`,
      notes: 'Realtime database notification push simulation (Supabase Realtime).'
    };

    MockData.shopReservations.unshift(newBooking);
    showToast('success', 'Realtime Booking Received', `New booking ${newBooking.id} received for ${randomTime} (${randomName}, ${randomGuests} guests).`);
    render();
  }

  function openBookingDetail(id) {
    if (typeof ScreenS03A !== 'undefined') {
      ScreenS03A.open(id, () => render());
    } else {
      Router.navigate(`/shop/booking/${id}`);
    }
  }

  return { render, changeShopStatus, simulateRealtimeBooking, openBookingDetail };
})();
