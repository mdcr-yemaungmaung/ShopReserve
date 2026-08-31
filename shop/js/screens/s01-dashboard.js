/* ============================================================
   EzBookNow Screen S-01 — Shop Management Dashboard Screen
   Refined for Desktop & Tablet First (with Mobile Support) & PWA
   Conforms to Basic Design: docs/01_bd/EzBookNow_画面設計書.md §3.27
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
  let activeDate = '2026-07-20';
  let activeScheduleTab = 'all'; // 'all', 'upcoming', 'seated', 'action'
  let searchQuery = '';

  // Default Master Tables for Floor Plan Snapshot
  const defaultTables = [
    { id: 'T-01', name: 'Table 1', capacity: 2, section: 'Main Hall', type: 'standard' },
    { id: 'T-02', name: 'Table 2', capacity: 2, section: 'Main Hall', type: 'standard' },
    { id: 'T-03', name: 'Table 3', capacity: 4, section: 'Main Hall', type: 'window' },
    { id: 'T-04', name: 'Table 4', capacity: 4, section: 'Main Hall', type: 'window' },
    { id: 'T-05', name: 'Table 5', capacity: 6, section: 'Family Zone', type: 'sofa' },
    { id: 'T-06', name: 'Table 6', capacity: 6, section: 'Family Zone', type: 'sofa' },
    { id: 'T-07', name: 'Table 7', capacity: 8, section: 'Family Zone', type: 'large' },
    { id: 'VIP-01', name: 'VIP Suite 1', capacity: 10, section: 'Private Room', type: 'vip' },
    { id: 'W-01', name: 'Balcony 1', capacity: 4, section: 'Terrace', type: 'outdoor' },
    { id: 'W-02', name: 'Balcony 2', capacity: 4, section: 'Terrace', type: 'outdoor' },
  ];

  function formatTime12h(timeStr) {
    if (!timeStr) return '-';
    if (timeStr.includes('AM') || timeStr.includes('PM')) {
      return timeStr;
    }
    const parts = timeStr.split(':');
    const hr = parseInt(parts[0], 10);
    if (isNaN(hr)) return timeStr;
    const ampm = hr >= 12 ? 'PM' : 'AM';
    const hr12 = hr === 0 ? 12 : hr > 12 ? hr - 12 : hr;
    const min = (parts[1] || '00').padStart(2, '0');
    return `${hr12}:${min} ${ampm}`;
  }

  function getServiceShiftInfo() {
    const now = new Date();
    const hours = now.getHours();
    if (hours >= 11 && hours < 15) {
      return { shift: 'Lunch Service', badgeColor: '#0F768E', bg: 'rgba(15, 118, 142, 0.1)', timeRange: '11:30 AM – 3:00 PM' };
    } else if (hours >= 17 && hours < 23) {
      return { shift: 'Dinner Service', badgeColor: '#007A53', bg: 'rgba(0, 195, 137, 0.1)', timeRange: '5:30 PM – 10:30 PM' };
    } else {
      return { shift: 'Pre-Service Prep', badgeColor: '#D97706', bg: 'rgba(217, 119, 6, 0.1)', timeRange: 'Reservations Open' };
    }
  }

  function render() {
    if (typeof document !== 'undefined' && document.body) {
      document.body.classList.add('screen-s01-s02-theme');
    }
    const shop = Router.getAuth() || { name: 'The Glass Pavilion', id: 'r1' };
    const lang = (typeof I18n !== 'undefined') ? I18n.getLang() : 'en';
    const isOffline = localStorage.getItem('s09_offline') === 'true';

    // 1. Pending sync queue & conflicts
    const localQueue = JSON.parse(localStorage.getItem('pending_bookings') || '[]');
    const syncConflictCount = MockData.shopReservations.filter(r => r.is_conflict).length;
    const syncWaitCount = localQueue.length;

    // Combine local pending offline bookings with master shopReservations
    const allReservations = [...localQueue, ...MockData.shopReservations];
    const todaysBookings = allReservations.filter(r => r.date === activeDate);

    // --- KPI Calculations (Strictly per §3.27) ---
    const bookingCount = todaysBookings.length;
    const totalGuests = todaysBookings.reduce((sum, b) => sum + (b.status !== 'cancelled' ? (b.guests || 2) : 0), 0);
    const checkedInCount = todaysBookings.filter(r => r.status === 'checked_in').length;
    const completedCount = todaysBookings.filter(r => r.status === 'completed').length;
    const checkinCompletedCount = checkedInCount + completedCount;
    const cancelledCount = todaysBookings.filter(r => r.status === 'cancelled').length;
    const noShowCount = todaysBookings.filter(r => r.status === 'no_show').length;

    // --- Action Required Counts ---
    const pendingActionCount = todaysBookings.filter(r => r.status === 'pending').length;
    const pendingGuestCallbackCount = todaysBookings.filter(r => (r.user_id === null || !r.user_id) && r.status === 'pending').length;

    // Filter today's bookings for live queue
    let filteredBookings = todaysBookings;
    if (activeScheduleTab === 'upcoming') {
      filteredBookings = todaysBookings.filter(r => r.status === 'confirmed' || r.status === 'pending');
    } else if (activeScheduleTab === 'seated') {
      filteredBookings = todaysBookings.filter(r => r.status === 'checked_in');
    } else if (activeScheduleTab === 'action') {
      filteredBookings = todaysBookings.filter(r => r.status === 'pending');
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filteredBookings = filteredBookings.filter(r => 
        (r.name && r.name.toLowerCase().includes(q)) ||
        (r.id && r.id.toLowerCase().includes(q)) ||
        (r.phone && r.phone.toLowerCase().includes(q)) ||
        (r.table && r.table.toLowerCase().includes(q))
      );
    }

    // Sort by time ascending
    filteredBookings.sort((a, b) => (a.time || '').localeCompare(b.time || ''));

    // --- Table Occupancy Calculation ---
    const totalCapacity = 80;
    const currentOccupiedSeats = todaysBookings.reduce((sum, b) => {
      if (b.status === 'checked_in' || b.status === 'confirmed') return sum + (b.guests || 2);
      return sum;
    }, 0);
    const availableSeats = Math.max(0, totalCapacity - currentOccupiedSeats);
    const occupancyPercentage = Math.min(100, Math.round((currentOccupiedSeats / totalCapacity) * 100));
    const vacancyPercentage = 100 - occupancyPercentage;
    const isFull = availableSeats === 0;

    // Map table occupancy
    const tableStatusMap = {};
    defaultTables.forEach(t => {
      const seatedBooking = todaysBookings.find(b => b.table === t.id && b.status === 'checked_in');
      const reservedBooking = todaysBookings.find(b => b.table === t.id && (b.status === 'confirmed' || b.status === 'pending'));
      if (seatedBooking) {
        tableStatusMap[t.id] = { state: 'seated', label: `Seated (${seatedBooking.name.split(' ')[0]})`, booking: seatedBooking };
      } else if (reservedBooking) {
        tableStatusMap[t.id] = { state: 'reserved', label: `${formatTime12h(reservedBooking.time)} (${reservedBooking.name.split(' ')[0]})`, booking: reservedBooking };
      } else {
        tableStatusMap[t.id] = { state: 'vacant', label: 'Vacant', booking: null };
      }
    });

    const shiftInfo = getServiceShiftInfo();

    // 2. Top Alert Banners / Status Warnings
    let statusAlertHtml = '';
    if (shopStatus === 'suspended') {
      statusAlertHtml = `
        <div class="card mb-6" style="border: 2px solid var(--color-error, #ba1a1a); background: rgba(186, 26, 26, 0.06); border-radius: var(--radius-md, 8px); padding: 16px 20px;">
          <div style="display:flex; align-items:flex-start; gap:14px;">
            <span style="font-size:24px; line-height:1;">🚫</span>
            <div style="flex:1;">
              <div style="font-size:15px; font-weight:700; color:var(--color-error, #ba1a1a); margin-bottom:6px;">
                Shop Listing Suspended (SHOP SUSPENDED)
              </div>
              <div style="font-size:13px; color:var(--color-on-surface, #1c1b1b); line-height:1.6; margin-bottom:10px;">
                <strong>Reason:</strong> Compliance verification pending and delayed renewal of business license documents<br>
                <strong>Suspension Date:</strong> 2026-08-01<br>
                <strong>Procedure to Resume:</strong> Please submit updated business registration documents to operations support.<br>
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
        <div class="card mb-6" style="border: 2px solid var(--color-outline, #777680); background: var(--color-surface-container-high, #eae7e7); border-radius: var(--radius-md, 8px); padding: 16px;">
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
        <div class="card mb-6" style="border: 1.5px solid #D97706; background: #FEF3C7; color: #92400E; border-radius: var(--radius-md, 8px); padding: 14px 18px;">
          <div style="display:flex; align-items:flex-start; gap:10px;">
            <span style="font-size:20px;">⏳</span>
            <div>
              <strong>Shop Verification Pending (Under Review)</strong>
              <div style="font-size:12px; margin-top:4px;">
                System operators are reviewing submitted business documents and shop info. All features will be unlocked upon approval.
              </div>
            </div>
          </div>
        </div>
      `;
    } else if (shopStatus === 'rejected') {
      statusAlertHtml = `
        <div class="card mb-6" style="border: 1.5px solid #EF4444; background: #FEE2E2; color: #991B1B; border-radius: var(--radius-md, 8px); padding: 14px 18px;">
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
      <div class="card mb-6" style="border: 1.5px solid #D97706; background: rgba(254, 243, 199, 0.7); border-radius: var(--radius-md, 8px); padding: 12px 16px; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:8px;">
        <div style="display:flex; align-items:center; gap:8px;">
          <span style="font-size:18px;">📶</span>
          <div>
            <strong style="font-size:13px; color:#92400E;">Offline Mode Active (Disconnected)</strong>
            <div style="font-size:12px; color:#B45309;">Operating offline using local tablet cache (IndexedDB). Changes will automatically synchronize upon reconnection.</div>
          </div>
        </div>
        <button class="btn btn-sm btn-secondary" onclick="ScreenS01.toggleOffline()" style="font-size:11.5px; height:32px; border-color:#D97706; color:#92400E;">
          Reconnect Online
        </button>
      </div>
    ` : '';

    // 3. Header & Operations Bar (Tablet & Desktop Ergonomic)
    const headerHtml = `
      <div class="s01-dashboard-header mb-6" style="background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 14px; padding: 20px 24px; box-shadow: 0 2px 8px rgba(11,18,32,0.04); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
        <div style="flex: 1; min-width: 280px;">
          <!-- Live Service Status & Shift Pill -->
          <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 6px; flex-wrap: wrap;">
            <span style="display: inline-flex; align-items: center; gap: 6px; font-size: 11.5px; font-weight: 700; background: ${shiftInfo.bg}; color: ${shiftInfo.badgeColor}; padding: 4px 10px; border-radius: 9999px; border: 1px solid ${shiftInfo.badgeColor}40;">
              <span style="width: 7px; height: 7px; border-radius: 50%; background: ${shiftInfo.badgeColor}; display: inline-block;"></span>
              ${shiftInfo.shift} (${shiftInfo.timeRange})
            </span>

            <span style="font-size: 12px; color: #CBD5E1;">•</span>

            <!-- Sync / Network Pill -->
            <span onclick="ScreenS01.toggleOffline()" style="display: inline-flex; align-items: center; gap: 6px; font-size: 11.5px; font-weight: 600; cursor: pointer; padding: 4px 10px; border-radius: 9999px; background: ${isOffline ? '#FEE2E2' : '#ECFDF5'}; color: ${isOffline ? '#991B1B' : '#065F46'}; border: 1px solid ${isOffline ? '#FECACA' : '#A7F3D0'};" title="Click to toggle Online/Offline simulation">
              <span>${isOffline ? '⚠️ Offline Cached' : '● Live Synced'}</span>
              ${syncWaitCount > 0 ? `<span style="background:#9A3412; color:white; border-radius:10px; padding:0 6px; font-size:10px;">${syncWaitCount} queued</span>` : ''}
            </span>
          </div>

          <h1 style="font-size: 24px; font-weight: 800; color: #0B1220; margin: 0 0 4px 0; font-family: 'Outfit', 'Inter', sans-serif; letter-spacing: -0.02em; display: flex; align-items: center; gap: 8px;">
            <span>${shop.shopName || 'The Glass Pavilion'}</span>
          </h1>
        </div>

        <!-- Fast Tablet Touch Actions -->
        <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
          <!-- Quick Walk-in (1-tap host desk) -->
          <button class="btn btn-secondary" onclick="ScreenS01.openQuickWalkIn()" style="font-weight: 700; height: 44px; padding: 0 18px; border-radius: 10px; border: 1.5px solid #0F768E; color: #0F768E; background: #F0F9FB; display: inline-flex; align-items: center; gap: 8px; font-size: 13.5px; box-shadow: 0 1px 3px rgba(15,118,142,0.1);">
            <span style="font-size: 16px;">⚡</span>
            <span>${lang === 'mm' ? 'အမြန် ဧည့်သည်နေရာချ' : 'Quick Walk-in'}</span>
          </button>

          <!-- New Reservation Modal -->
          <button class="btn btn-primary" onclick="ScreenS03B.open(() => ScreenS01.render())" style="font-weight: 700; height: 44px; padding: 0 20px; border-radius: 10px; background: #0B1220; color: #FFFFFF; display: inline-flex; align-items: center; gap: 8px; font-size: 13.5px; box-shadow: 0 2px 8px rgba(11,18,32,0.2);">
            ${Components.icon('plus', 16)}
            <span>${lang === 'mm' ? 'ဘွတ်ကင် အသစ်' : 'New Booking'}</span>
          </button>

          <!-- Fullscreen Toggle for Host Stand Tablet -->
          <button class="btn btn-ghost" onclick="ScreenS01.toggleFullscreen()" title="Toggle Fullscreen for Tablet Mode" style="width: 44px; height: 44px; padding: 0; border-radius: 10px; border: 1px solid #E2E8F0; color: #475569; display: inline-flex; align-items: center; justify-content: center;">
            ⛶
          </button>
        </div>
      </div>
    `;

    // 4. 4 KPI Metrics Grid (Responsive: 4 on Desktop, 2x2 on Tablet, 2x2 on Mobile)
    let statsHtml = '';
    if (shopStatus === 'active' || shopStatus === 'onboarding' || shopStatus === 'suspended') {
      statsHtml = `
        <div class="s01-kpi-grid mb-6">
          <!-- 1. All Bookings Card / Filter -->
          <div class="s01-kpi-card s01-kpi-card--primary ${activeScheduleTab === 'all' ? 'active' : ''}" onclick="ScreenS01.setScheduleTab('all')" title="Click to filter all reservations">
            <div class="flex justify-between items-start">
              <div>
                <span class="kpi-label" style="font-size:12px; font-weight:700; color:#64748B; text-transform:uppercase; letter-spacing:0.04em;">Today's Bookings</span>
                <div class="kpi-number" style="font-size:26px; font-weight:800; color:#0F768E; margin-top:4px; font-family:'Outfit',sans-serif;">
                  ${bookingCount} <span style="font-size:13px; font-weight:600; color:#475569;">Total</span>
                </div>
              </div>
              <div class="kpi-icon" style="width:36px; height:36px; border-radius:8px; background:rgba(15,118,142,0.1); color:#0F768E; display:flex; align-items:center; justify-content:center;">
                ${Components.icon('calendar', 18)}
              </div>
            </div>
            <div class="kpi-subtitle" style="font-size:12px; color:#64748B; margin-top:10px; border-top:1px solid #F1F5F9; padding-top:8px;">
              👥 Total Expected: <strong>${totalGuests} Guests</strong>
            </div>
          </div>

          <!-- 2. Seated & Completed Card / Filter -->
          <div class="s01-kpi-card s01-kpi-card--success ${activeScheduleTab === 'seated' ? 'active' : ''}" onclick="ScreenS01.setScheduleTab('seated')" title="Click to filter seated guests">
            <div class="flex justify-between items-start">
              <div>
                <span class="kpi-label" style="font-size:12px; font-weight:700; color:#64748B; text-transform:uppercase; letter-spacing:0.04em;">Seated & Completed</span>
                <div class="kpi-number" style="font-size:26px; font-weight:800; color:#10B981; margin-top:4px; font-family:'Outfit',sans-serif;">
                  ${checkinCompletedCount} <span style="font-size:13px; font-weight:600; color:#475569;">Seated</span>
                </div>
              </div>
              <div class="kpi-icon" style="width:36px; height:36px; border-radius:8px; background:rgba(16,185,129,0.1); color:#10B981; display:flex; align-items:center; justify-content:center;">
                ${Components.icon('check', 18)}
              </div>
            </div>
            <div class="kpi-subtitle" style="font-size:12px; color:#64748B; margin-top:10px; border-top:1px solid #F1F5F9; padding-top:8px;">
              🪑 <strong>${checkedInCount}</strong> Active Dining • <strong>${completedCount}</strong> Completed
            </div>
          </div>

          <!-- 3. Action Required Card / Filter -->
          <div class="s01-kpi-card s01-kpi-card--warning ${activeScheduleTab === 'action' ? 'active' : ''}" onclick="ScreenS01.setScheduleTab('action')" title="Click to filter pending actions">
            <div class="flex justify-between items-start">
              <div>
                <span class="kpi-label" style="font-size:12px; font-weight:700; color:#64748B; text-transform:uppercase; letter-spacing:0.04em;">Action Required</span>
                <div class="kpi-number" style="font-size:26px; font-weight:800; color:#D97706; margin-top:4px; font-family:'Outfit',sans-serif;">
                  ${pendingActionCount} <span style="font-size:13px; font-weight:600; color:#475569;">Pending</span>
                </div>
              </div>
              <div class="kpi-icon" style="width:36px; height:36px; border-radius:8px; background:rgba(245,158,11,0.1); color:#D97706; display:flex; align-items:center; justify-content:center;">
                ${Components.icon('clock', 18)}
              </div>
            </div>
            <div class="kpi-subtitle" style="font-size:12px; color:#64748B; margin-top:10px; border-top:1px solid #F1F5F9; padding-top:8px;">
              ${pendingGuestCallbackCount > 0 ? `📞 <strong>${pendingGuestCallbackCount}</strong> Phone Callbacks` : `Awaiting Merchant Approval`}
            </div>
          </div>

          <!-- 4. Cancellations / No-Show Card / Filter -->
          <div class="s01-kpi-card s01-kpi-card--error ${activeScheduleTab === 'cancelled' ? 'active' : ''}" onclick="ScreenS01.setScheduleTab('cancelled')" title="Click to filter cancellations and no-shows">
            <div class="flex justify-between items-start">
              <div>
                <span class="kpi-label" style="font-size:12px; font-weight:700; color:#64748B; text-transform:uppercase; letter-spacing:0.04em;">Cancellations / No-Show</span>
                <div class="kpi-number" style="font-size:26px; font-weight:800; color:#EF4444; margin-top:4px; font-family:'Outfit',sans-serif;">
                  ${cancelledCount + noShowCount} <span style="font-size:13px; font-weight:600; color:#475569;">Total</span>
                </div>
              </div>
              <div class="kpi-icon" style="width:36px; height:36px; border-radius:8px; background:rgba(239,68,68,0.1); color:#EF4444; display:flex; align-items:center; justify-content:center;">
                ${Components.icon('alertCircle', 18)}
              </div>
            </div>
            <div class="kpi-subtitle" style="font-size:12px; color:#64748B; margin-top:10px; border-top:1px solid #F1F5F9; padding-top:8px;">
              🚫 <strong>${cancelledCount}</strong> Cancelled • <strong>${noShowCount}</strong> No-Shows
            </div>
          </div>
        </div>
      `;
    }

    // 6. Live Service Queue & Schedule Table (Tablet & Desktop Optimized)
    let scheduleSectionHtml = '';
    if (shopStatus === 'active' || shopStatus === 'onboarding' || shopStatus === 'suspended') {
      const upcomingCount = todaysBookings.filter(r => r.status === 'confirmed' || r.status === 'pending').length;

      scheduleSectionHtml = `
        <div class="card p-0 mb-6 s01-schedule-card" style="background:#FFFFFF; border:1px solid #E2E8F0; border-radius:12px; overflow:hidden; box-shadow:0 1px 3px rgba(0,0,0,0.02);">
          <!-- Header Bar with Filter Tabs & Search -->
          <div class="s01-schedule-header" style="padding:14px 18px; border-bottom:1px solid #E2E8F0; background:#FAFAFA; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; box-sizing:border-box; width:100%;">
            <div class="s01-schedule-title-block" style="box-sizing:border-box;">
              <h3 style="font-size:15px; font-weight:800; color:#0B1220; margin:0 0 2px 0; font-family:'Outfit',sans-serif;">
                📋 Live Service Schedule & Guest Queue
              </h3>
              <div class="s01-schedule-subtitle" style="font-size:12px; color:#64748B;">
                Tap any guest to update table status or view reservation details.
              </div>
            </div>

            <!-- Search Field -->
            <div class="s01-schedule-search-block" style="position:relative; width:220px; max-width:100%; box-sizing:border-box;">
              <input type="text" placeholder="Search name, phone, table..." value="${searchQuery}" oninput="ScreenS01.handleSearch(this.value)" style="width:100%; height:34px; padding:0 12px 0 32px; border-radius:9999px; border:1px solid #CBD5E1; font-size:12px; background:#FFFFFF; box-sizing:border-box; display:block;" />
              <span style="position:absolute; left:10px; top:50%; transform:translateY(-50%); font-size:12px; color:#94A3B8; pointer-events:none;">🔍</span>
            </div>
          </div>

          <!-- Schedule Category Tabs (Scrollable on small screens) -->
          <div class="s01-schedule-tabs" style="display:flex; border-bottom:1px solid #E2E8F0; background:#FFFFFF; overflow-x:auto; -webkit-overflow-scrolling:touch; scrollbar-width:none;">
            <button class="btn btn-ghost s01-tab-btn" onclick="ScreenS01.setScheduleTab('all')" style="border-radius:0; padding:12px 18px; font-size:12.5px; font-weight:700; white-space:nowrap; color:${activeScheduleTab === 'all' ? '#0F768E' : '#64748B'}; border-bottom:${activeScheduleTab === 'all' ? '3px solid #0F768E' : '3px solid transparent'};">
              All Today (${bookingCount})
            </button>
            <button class="btn btn-ghost s01-tab-btn" onclick="ScreenS01.setScheduleTab('upcoming')" style="border-radius:0; padding:12px 18px; font-size:12.5px; font-weight:700; white-space:nowrap; color:${activeScheduleTab === 'upcoming' ? '#0F768E' : '#64748B'}; border-bottom:${activeScheduleTab === 'upcoming' ? '3px solid #0F768E' : '3px solid transparent'};">
              ⏰ Upcoming (${upcomingCount})
            </button>
            <button class="btn btn-ghost s01-tab-btn" onclick="ScreenS01.setScheduleTab('seated')" style="border-radius:0; padding:12px 18px; font-size:12.5px; font-weight:700; white-space:nowrap; color:${activeScheduleTab === 'seated' ? '#0F768E' : '#64748B'}; border-bottom:${activeScheduleTab === 'seated' ? '3px solid #0F768E' : '3px solid transparent'};">
              🪑 Seated Now (${checkedInCount})
            </button>
            <button class="btn btn-ghost s01-tab-btn" onclick="ScreenS01.setScheduleTab('action')" style="border-radius:0; padding:12px 18px; font-size:12.5px; font-weight:700; white-space:nowrap; color:${activeScheduleTab === 'action' ? '#D97706' : '#64748B'}; border-bottom:${activeScheduleTab === 'action' ? '3px solid #D97706' : '3px solid transparent'};">
              ⏳ Pending Action (${pendingActionCount})
            </button>
            <button class="btn btn-ghost s01-tab-btn" onclick="ScreenS01.setScheduleTab('cancelled')" style="border-radius:0; padding:12px 18px; font-size:12.5px; font-weight:700; white-space:nowrap; color:${activeScheduleTab === 'cancelled' ? '#EF4444' : '#64748B'}; border-bottom:${activeScheduleTab === 'cancelled' ? '3px solid #EF4444' : '3px solid transparent'};">
              🚫 Cancelled (${cancelledCount + noShowCount})
            </button>
          </div>

          <!-- Bookings List Table & Mobile Cards -->
          <div class="data-table-responsive s01-table-wrapper" style="max-height:500px; overflow-y:auto;">
            ${filteredBookings.length === 0 ? `
              <div style="padding:48px 24px; text-align:center; color:#64748B;">
                <div style="font-size:36px; margin-bottom:10px;">📋</div>
                <div style="font-weight:700; font-size:14px; color:#1E293B;">No reservations found</div>
                <div style="font-size:12px; margin-top:4px;">No guests matching this filter on ${activeDate}.</div>
              </div>
            ` : `
              <!-- Desktop / Tablet Table View -->
              <table class="data-table s01-desktop-table" style="width:100%; border-collapse:collapse;">
                <thead>
                  <tr style="background:#F8FAFC; border-bottom:1px solid #E2E8F0; text-align:left;">
                    <th style="padding:12px 16px; font-size:12px; font-weight:700; color:#475569;">Time</th>
                    <th style="padding:12px 16px; font-size:12px; font-weight:700; color:#475569;">Guest Name</th>
                    <th style="padding:12px 16px; font-size:12px; font-weight:700; color:#475569;">Pax</th>
                    <th style="padding:12px 16px; font-size:12px; font-weight:700; color:#475569;">Table</th>
                    <th style="padding:12px 16px; font-size:12px; font-weight:700; color:#475569;">Status</th>
                    <th style="padding:12px 16px; font-size:12px; font-weight:700; color:#475569; text-align:right;">Quick Action</th>
                  </tr>
                </thead>
                <tbody>
                  ${filteredBookings.map(b => `
                    <tr class="s01-table-row" style="border-bottom:1px solid #F1F5F9; transition:background 0.15s ease;" onmouseover="this.style.background='#F8FAFC'" onmouseout="this.style.background='transparent'">
                      <td style="padding:14px 16px; white-space:nowrap; font-weight:700; color:#0B1220; font-size:13px;">
                        ${formatTime12h(b.time)}
                      </td>
                      <td style="padding:14px 16px; white-space:nowrap;">
                        <div style="font-weight:700; color:#0B1220; font-size:13.5px; cursor:pointer;" onclick="ScreenS01.openBookingDetail('${b.id}')">
                          ${b.name}
                          ${!b.user_id ? '<span class="badge badge--warning" style="font-size:9px; margin-left:4px; padding:1px 5px;">Guest</span>' : ''}
                        </div>
                        <div style="font-size:11.5px; color:#64748B; margin-top:2px;">
                          ${b.phone || '-'}
                        </div>
                      </td>
                      <td style="padding:14px 16px; white-space:nowrap; font-weight:600; font-size:13px; color:#334155;">
                        👥 ${b.guests || 2}
                      </td>
                      <td style="padding:14px 16px; white-space:nowrap;">
                        <span style="background:#E0F2FE; color:#0369A1; font-weight:700; font-size:12px; padding:3px 9px; border-radius:6px; border:1px solid #BAE6FD;">
                          ${b.table || 'Auto'}
                        </span>
                      </td>
                      <td style="padding:14px 16px; white-space:nowrap;">
                        ${Components.statusBadge(b.status)}
                      </td>
                      <td style="padding:14px 16px; white-space:nowrap; text-align:right;">
                        <div style="display:inline-flex; align-items:center; gap:6px;">
                          ${b.status === 'confirmed' ? `
                            <button class="btn btn-sm btn-primary" onclick="ScreenS01.quickUpdateStatus('${b.id}', 'checked_in')" style="font-size:11.5px; font-weight:700; height:32px; background:#10B981; border-color:#10B981; color:white; border-radius:6px; padding:0 10px;">
                              🪑 Seat Now
                            </button>
                          ` : b.status === 'checked_in' ? `
                            <button class="btn btn-sm btn-secondary" onclick="ScreenS01.quickUpdateStatus('${b.id}', 'completed')" style="font-size:11.5px; font-weight:700; height:32px; border-radius:6px; padding:0 10px;">
                              ✅ Complete
                            </button>
                          ` : b.status === 'pending' ? `
                            <button class="btn btn-sm btn-primary" onclick="ScreenS01.quickUpdateStatus('${b.id}', 'confirmed')" style="font-size:11.5px; font-weight:700; height:32px; background:#0F768E; border-color:#0F768E; border-radius:6px; padding:0 10px;">
                              ✓ Confirm
                            </button>
                          ` : ''}

                          <button class="btn btn-sm btn-ghost" onclick="ScreenS01.openBookingDetail('${b.id}')" title="View Full Details" style="font-size:12px; height:32px; padding:0 8px; border:1px solid #E2E8F0; border-radius:6px;">
                            Details
                          </button>
                        </div>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>

              <!-- Mobile Card List View (<768px) -->
              <div class="s01-mobile-card-list" style="display:none;">
                ${filteredBookings.map(b => {
                  const isCheckedIn = b.status === 'checked_in';
                  const isPending = b.status === 'pending';
                  const isCancelled = b.status === 'cancelled' || b.status === 'no_show';
                  const statusBorderColor = isCheckedIn ? '#10B981' : isPending ? '#F59E0B' : isCancelled ? '#EF4444' : '#0F768E';

                  return `
                    <div class="s01-guest-card" style="background:#FFFFFF; border:1px solid #E2E8F0; border-radius:8px; padding:8px 10px; margin-bottom:6px; box-shadow:0 1px 2px rgba(11,18,32,0.03); border-left:3.5px solid ${statusBorderColor};">
                      <!-- Row 1: Time, Pax, Table, Status & Compact Action -->
                      <div style="display:flex; justify-content:space-between; align-items:center; gap:6px;">
                        <div style="display:flex; align-items:center; gap:5px; flex-wrap:wrap;">
                          <span style="font-weight:800; font-size:12px; color:#0F768E; background:#F0F9FB; padding:1px 6px; border-radius:4px; border:1px solid #BAE6FD; white-space:nowrap;">
                            ${formatTime12h(b.time)}
                          </span>
                          <span style="font-weight:700; font-size:11px; color:#475569; background:#F1F5F9; padding:1px 5px; border-radius:4px; white-space:nowrap;">
                            👥 ${b.guests || 2}p
                          </span>
                          <span style="background:#E0F2FE; color:#0369A1; font-weight:700; font-size:11px; padding:1px 6px; border-radius:4px; border:1px solid #BAE6FD; white-space:nowrap;">
                            🪑 ${b.table || 'Auto'}
                          </span>
                        </div>
                        <div style="flex-shrink:0;">
                          ${Components.statusBadge(b.status)}
                        </div>
                      </div>

                      <!-- Row 2: Guest Name & Phone/Notes with Right Action -->
                      <div style="display:flex; justify-content:space-between; align-items:center; gap:8px; margin-top:6px; padding-top:6px; border-top:1px dashed #F1F5F9;">
                        <div style="flex:1; min-width:0;">
                          <div style="display:flex; align-items:center; gap:5px;">
                            <span style="font-weight:700; font-size:13px; color:#0B1220; cursor:pointer; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;" onclick="ScreenS01.openBookingDetail('${b.id}')">
                              ${b.name}
                            </span>
                            ${!b.user_id ? '<span class="badge badge--warning" style="font-size:9px; padding:0 4px;">Guest</span>' : ''}
                          </div>
                          <div style="display:flex; align-items:center; gap:6px; margin-top:2px; font-size:11px; color:#64748B;">
                            ${b.phone ? `
                              <a href="tel:${b.phone}" style="color:#0F768E; font-weight:600; text-decoration:none; white-space:nowrap;" onclick="event.stopPropagation();">
                                📞 ${b.phone}
                              </a>
                            ` : `<span style="color:#94A3B8;">No phone</span>`}
                            ${b.notes ? `
                              <span style="color:#B45309; background:#FEF3C7; border:1px solid #FDE68A; border-radius:3px; padding:0 4px; font-size:10px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; max-width:110px;">
                                📝 ${b.notes}
                              </span>
                            ` : ''}
                          </div>
                        </div>

                        <!-- Compact Action Button Group -->
                        <div style="display:flex; align-items:center; gap:4px; flex-shrink:0;">
                          ${b.status === 'confirmed' ? `
                            <button class="btn btn-sm btn-primary" onclick="ScreenS01.quickUpdateStatus('${b.id}', 'checked_in')" style="height:28px; padding:0 8px; font-size:11px; font-weight:700; background:#10B981; border-color:#10B981; color:white; border-radius:6px; white-space:nowrap;">
                              🪑 Seat
                            </button>
                          ` : b.status === 'checked_in' ? `
                            <button class="btn btn-sm btn-secondary" onclick="ScreenS01.quickUpdateStatus('${b.id}', 'completed')" style="height:28px; padding:0 8px; font-size:11px; font-weight:700; border-radius:6px; white-space:nowrap;">
                              ✅ Done
                            </button>
                          ` : b.status === 'pending' ? `
                            <button class="btn btn-sm btn-primary" onclick="ScreenS01.quickUpdateStatus('${b.id}', 'confirmed')" style="height:28px; padding:0 8px; font-size:11px; font-weight:700; background:#0F768E; border-color:#0F768E; border-radius:6px; white-space:nowrap;">
                              ✓ Confirm
                            </button>
                          ` : ''}
                          <button class="btn btn-sm btn-outline" onclick="ScreenS01.openBookingDetail('${b.id}')" style="height:28px; padding:0 8px; font-size:11px; font-weight:600; border-radius:6px; color:#475569; border-color:#CBD5E1; background:#FFFFFF; white-space:nowrap;">
                            Info
                          </button>
                        </div>
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
            `}
          </div>

          <!-- Bottom Footer Link -->
          <div style="padding:12px 20px; background:#F8FAFC; border-top:1px solid #E2E8F0; display:flex; justify-content:space-between; align-items:center;">
            <span style="font-size:12px; color:#64748B;">Showing ${filteredBookings.length} reservations</span>
            <button class="btn btn-text btn-sm" onclick="Router.navigate('/shop/ledger')" style="font-size:12px; font-weight:700; color:#0F768E; padding:0;">
              Open Full Booking Ledger →
            </button>
          </div>
        </div>
      `;
    }

    // 7. Quick Operational Tool Shortcuts (Tablet Grid)
    const isSuspended = shopStatus === 'suspended';
    const quickShortcutsHtml = `
      <div class="card mb-6 s01-desktop-only" style="background:#FFFFFF; border:1px solid #E2E8F0; border-radius:12px; padding:18px;">
        <div class="flex justify-between items-center mb-3">
          <h3 style="font-size:15px; font-weight:800; color:#0B1220; margin:0;">
            ⚙️ Operational Shortcuts
          </h3>
          ${isSuspended ? '<span class="badge badge--error" style="font-size:10.5px;">Locked (Suspended)</span>' : ''}
        </div>

        <div class="grid grid-2 gap-3" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:10px;">
          <div class="s01-quick-action-tile" onclick="${isSuspended ? `alert('Locked while suspended')` : `Router.navigate('/shop/availability')`}">
            <div>
              <div style="font-size:12.5px; font-weight:700; color:#0B1220;">⏰ Availability & Slots</div>
              <div style="font-size:11px; color:#64748B;">Business hours & holiday rules</div>
            </div>
            <span style="color:#0F768E; font-weight:700;">→</span>
          </div>

          <div class="s01-quick-action-tile" onclick="${isSuspended ? `alert('Locked while suspended')` : `Router.navigate('/shop/tables')`}">
            <div>
              <div style="font-size:12.5px; font-weight:700; color:#0B1220;">🪑 Floor Plan & Seats</div>
              <div style="font-size:11px; color:#64748B;">Table layouts & seat attributes</div>
            </div>
            <span style="color:#0F768E; font-weight:700;">→</span>
          </div>

          <div class="s01-quick-action-tile" onclick="${isSuspended ? `alert('Locked while suspended')` : `Router.navigate('/shop/staff-tables')`}">
            <div>
              <div style="font-size:12.5px; font-weight:700; color:#0B1220;">👥 Staff & Shift Roster</div>
              <div style="font-size:11px; color:#64748B;">Server assignments & duty logs</div>
            </div>
            <span style="color:#0F768E; font-weight:700;">→</span>
          </div>

          <div class="s01-quick-action-tile" onclick="Router.navigate('/shop/customers')">
            <div>
              <div style="font-size:12.5px; font-weight:700; color:#0B1220;">📇 Customer Directory</div>
              <div style="font-size:11px; color:#64748B;">VIP tags & dining history</div>
            </div>
            <span style="color:#0F768E; font-weight:700;">→</span>
          </div>
        </div>
      </div>
    `;

    // 8. Notifications & System Announcements
    const announcements = MockData.announcements || [];
    const announcementsHtml = `
      <div class="card mb-6 s01-desktop-only" style="background:#FFFFFF; border:1px solid #E2E8F0; border-radius:12px; padding:18px;">
        <div class="flex justify-between items-center mb-3">
          <h3 style="font-size:15px; font-weight:800; color:#0B1220; margin:0;">
            📢 Announcements
          </h3>
          <button class="btn btn-text btn-sm" style="font-size:11.5px; padding:0; color:#0F768E; font-weight:700;" onclick="Router.navigate('/shop/notifications')">
            View All →
          </button>
        </div>
        <div class="flex flex-col gap-3">
          ${announcements.slice(0, 3).map(a => `
            <div style="border-bottom:1px solid #F1F5F9; padding-bottom:8px;">
              <div class="flex justify-between items-center mb-1">
                <strong style="font-size:12px; color:#0B1220;">${a.title}</strong>
                <span style="font-size:10px; color:#94A3B8;">${a.date || 'Today'}</span>
              </div>
              <p style="font-size:11.5px; color:#64748B; margin:0; line-height:1.4;">${a.content || a.summary}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    // 9. Sandbox Simulator
    const simulatorHtml = `
      <div class="card mt-6 p-4" style="border:1px solid #E2E8F0; border-radius:12px; background:#FFFFFF;">
        <div style="font-weight:700; font-size:13px; color:#0B1220; margin-bottom:8px; display:flex; align-items:center; justify-content:between;">
          <div style="display:flex; align-items:center; gap:6px;">
            🛠️ Operational Sandbox & Real-time Event Simulator
          </div>
          <span class="badge badge--info" style="font-size:10px;">Dev Controls</span>
        </div>
        
        <div class="flex flex-col gap-4">
          <div class="flex justify-between items-center flex-wrap gap-2" style="font-size:12.5px;">
            <span>Simulated Shop Status:</span>
            <select class="form-input" onchange="ScreenS01.changeShopStatus(this.value)" style="font-size:12px; height:34px; padding:4px 10px; width:260px; cursor:pointer;">
              <option value="active" ${shopStatus === 'active' ? 'selected' : ''}>Active / Approved (Normal Operations)</option>
              <option value="onboarding" ${shopStatus === 'onboarding' ? 'selected' : ''}>Onboarding (Checklist Mode)</option>
              <option value="suspended" ${shopStatus === 'suspended' ? 'selected' : ''}>Suspended (Listing Suspended)</option>
              <option value="closed" ${shopStatus === 'closed' ? 'selected' : ''}>Closed (Shop Closure Processing)</option>
              <option value="pending" ${shopStatus === 'pending' ? 'selected' : ''}>Pending Review (Under Review)</option>
              <option value="rejected" ${shopStatus === 'rejected' ? 'selected' : ''}>Rejected (Onboarding Rejected)</option>
            </select>
          </div>

          <div style="border-top:1px dashed #E2E8F0; padding-top:10px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
            <div style="font-size:11.5px; color:#64748B;">
              ⚡ Real-time Push Arrival Simulation
            </div>
            <button class="btn btn-primary btn-sm" style="font-size:11.5px; height:32px;" onclick="ScreenS01.simulateRealtimeBooking()">
              ⚡ Simulate Real-time Booking Arrival
            </button>
          </div>
        </div>
      </div>
    `;

    const content = `
      <div class="s01-container">
        ${statusAlertHtml}
        ${offlineAlertHtml}
        ${headerHtml}
        ${statsHtml}
        
        <div class="s01-main-grid">
          <!-- Main Left Column -->
          <div>
            ${scheduleSectionHtml}
          </div>

          <!-- Secondary Right Column -->
          <div>
            ${quickShortcutsHtml}
            ${announcementsHtml}
            ${simulatorHtml}
          </div>
        </div>
      </div>
    `;

    App.renderAdminPage('shop', '', content);
  }

  // --- Handlers & Actions ---
  function setDate(newDate) {
    activeDate = newDate;
    showToast('info', 'Date Changed', `Viewing schedule for ${activeDate}`);
    render();
  }

  function setScheduleTab(tab) {
    activeScheduleTab = tab;
    render();
  }

  function handleSearch(query) {
    searchQuery = query;
    render();
  }

  function toggleOffline() {
    const current = localStorage.getItem('s09_offline') === 'true';
    const next = !current;
    localStorage.setItem('s09_offline', String(next));
    showToast(next ? 'warning' : 'success', next ? 'Offline Mode Active' : 'Online Connected', next ? 'Using tablet cached database.' : 'Reconnected to live network.');
    render();
  }

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.log('Fullscreen error:', err);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }

  function quickUpdateStatus(bookingId, newStatus) {
    const booking = MockData.shopReservations.find(b => b.id === bookingId);
    if (booking) {
      booking.status = newStatus;
      const statusNames = { checked_in: 'Seated', completed: 'Completed', confirmed: 'Confirmed' };
      showToast('success', 'Status Updated', `Booking for ${booking.name} is now ${statusNames[newStatus] || newStatus}.`);
      render();
    }
  }

  function handleTableClick(tableId, state) {
    if (state === 'vacant') {
      openQuickWalkIn(tableId);
    } else {
      Router.navigate('/shop/tables');
    }
  }

  // --- Quick Walk-in Modal Engine (2-tap host desk) ---
  function openQuickWalkIn(preselectedTableId = '') {
    const vacantTables = defaultTables;
    const modalId = 's01-quick-walkin-modal';
    const existing = document.getElementById(modalId);
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.id = modalId;
    modal.className = 'modal-backdrop';
    modal.style.cssText = 'position:fixed; top:0; left:0; right:0; bottom:0; background:rgba(11,18,32,0.6); display:flex; align-items:center; justify-content:center; z-index:99999; padding:16px;';
    
    modal.innerHTML = `
      <div class="card animate-scale-in" style="width:100%; max-width:460px; background:#FFFFFF; border-radius:16px; padding:24px; box-shadow:0 20px 40px rgba(0,0,0,0.2);">
        <div class="flex justify-between items-center mb-4">
          <div style="display:flex; align-items:center; gap:8px;">
            <span style="font-size:22px;">⚡</span>
            <h3 style="font-size:18px; font-weight:800; color:#0B1220; margin:0; font-family:'Outfit',sans-serif;">
              Quick Walk-in Seating
            </h3>
          </div>
          <button type="button" onclick="document.getElementById('${modalId}').remove()" style="background:none; border:none; font-size:20px; color:#94A3B8; cursor:pointer;">✕</button>
        </div>

        <form onsubmit="ScreenS01.submitWalkIn(event)">
          <!-- Guest Count Selection -->
          <div class="form-group mb-4">
            <label class="form-label" style="font-weight:700; font-size:13px; color:#0B1220; margin-bottom:8px; display:block;">Number of Guests (Pax):</label>
            <div style="display:flex; gap:8px; flex-wrap:wrap;" id="walkin-pax-pills">
              ${[1, 2, 3, 4, 5, 6, 8, 10].map((num, i) => `
                <button type="button" class="s01-touch-pill ${i === 1 ? 'active' : ''}" onclick="ScreenS01.selectWalkInPax(this, ${num})" style="flex:1; min-width:44px; justify-content:center; font-size:14px; font-weight:700;">
                  ${num}
                </button>
              `).join('')}
            </div>
            <input type="hidden" id="walkin-pax-input" value="2" />
          </div>

          <!-- Table Selection -->
          <div class="form-group mb-4">
            <label class="form-label" style="font-weight:700; font-size:13px; color:#0B1220; margin-bottom:6px; display:block;">Assign Table:</label>
            <select class="form-input" id="walkin-table-input" style="height:44px; border-radius:10px; font-size:14px; font-weight:600;">
              ${vacantTables.map(t => `
                <option value="${t.id}" ${preselectedTableId === t.id ? 'selected' : ''}>${t.name} (${t.capacity} Seats • ${t.section})</option>
              `).join('')}
            </select>
          </div>

          <!-- Guest Name (Optional) -->
          <div class="form-group mb-5">
            <label class="form-label" style="font-weight:700; font-size:13px; color:#0B1220; margin-bottom:6px; display:block;">Guest Name (Optional):</label>
            <input type="text" class="form-input" id="walkin-name-input" placeholder="e.g. Walk-in Guest / Table Tag" value="Walk-in Guest" style="height:44px; border-radius:10px; font-size:13.5px;" />
          </div>

          <!-- Action Buttons -->
          <div style="display:flex; gap:10px;">
            <button type="button" class="btn btn-ghost" onclick="document.getElementById('${modalId}').remove()" style="flex:1; height:44px; font-weight:600;">
              Cancel
            </button>
            <button type="submit" class="btn btn-primary" style="flex:2; height:44px; font-weight:800; background:#0F768E; border-color:#0F768E; color:white; border-radius:10px; font-size:14px; display:inline-flex; align-items:center; justify-content:center; gap:6px;">
              🪑 Seat Immediately
            </button>
          </div>
        </form>
      </div>
    `;

    document.body.appendChild(modal);
  }

  function selectWalkInPax(btn, pax) {
    const parent = document.getElementById('walkin-pax-pills');
    if (parent) {
      parent.querySelectorAll('.s01-touch-pill').forEach(b => b.classList.remove('active'));
    }
    btn.classList.add('active');
    const input = document.getElementById('walkin-pax-input');
    if (input) input.value = String(pax);
  }

  function submitWalkIn(e) {
    e.preventDefault();
    const pax = parseInt(document.getElementById('walkin-pax-input').value, 10) || 2;
    const table = document.getElementById('walkin-table-input').value || 'T-01';
    const name = (document.getElementById('walkin-name-input').value || '').trim() || 'Walk-in Guest';

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newBooking = {
      id: `SR-WI-${activeDate.replace(/-/g, '')}-${Math.floor(100 + Math.random() * 900)}`,
      name: name,
      phone: '-',
      date: activeDate,
      time: timeStr,
      guests: pax,
      table: table,
      status: 'checked_in',
      source: 'walk_in',
      user_id: null,
      notes: 'Host desk quick walk-in seating.'
    };

    MockData.shopReservations.unshift(newBooking);

    const modal = document.getElementById('s01-quick-walkin-modal');
    if (modal) modal.remove();

    showToast('success', 'Walk-in Seated', `${name} (${pax} guests) seated at ${table}.`);
    render();
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
    const randomGuests = Math.floor(2 + Math.random() * 5);
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

  return { 
    render, 
    setDate, 
    setScheduleTab, 
    handleSearch, 
    toggleOffline, 
    toggleFullscreen, 
    quickUpdateStatus, 
    handleTableClick, 
    openQuickWalkIn, 
    selectWalkInPax, 
    submitWalkIn, 
    changeShopStatus, 
    simulateRealtimeBooking, 
    openBookingDetail 
  };
})();
