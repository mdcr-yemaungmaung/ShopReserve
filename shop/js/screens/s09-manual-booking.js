/* ============================================================
   EzBookNow Screen S-09 — Manual Booking Screen
   Integrated with Shop Portal Header, Sidebar & Layout (App.renderAdminPage)
   Based on stitch ui draw / stitch_ezbooknow_enterprise_ui_design (6)
   ============================================================ */

const ScreenS09 = (() => {
  let isOffline = false;
  let forceConflict = false;
  try {
    isOffline = localStorage.getItem('s09_offline') === 'true';
    forceConflict = localStorage.getItem('s09_sync_conflict') === 'true';
  } catch (e) {}
  
  let bookingSource = 'phone'; // 'phone' | 'walkin'
  let guestCount = 4;
  let currentViewYear = 2026;
  let currentViewMonth = 6; // 0-indexed: 6 = July
  let selectedIsoDate = '2026-07-20';
  let selectedTime = '19:00';
  let selectedSeatTags = [];

  const tableTags = [
    { code: 'near_tv', name: '📺 Near TV', name_mm: '📺 တီဗီ အနီး' },
    { code: 'window', name: '🪟 Window View', name_mm: '🪟 ပြတင်းပေါက်နား' },
    { code: 'quiet', name: '🔇 Quiet Zone', name_mm: '🔇 တိတ်ဆိတ်သောနေရာ' },
    { code: 'private_room', name: '🚪 Private Room', name_mm: '🚪 သီးသန့်ခန်း' },
    { code: 'outdoor', name: '🌿 Outdoor / Terrace', name_mm: '🌿 ပြင်ပ/ဝရံတာ' },
    { code: 'counter', name: '🍸 Bar Counter', name_mm: '🍸 ဘားကောင်တာ' }
  ];

  function matchesTablePreference(table, selectedTags) {
    if (!selectedTags || selectedTags.length === 0) return true;
    const tableTagsList = (table.seat_tags || []).map(t => String(t).toLowerCase());
    const tableType = String(table.type || '').toLowerCase();
    
    return selectedTags.every(tagCode => {
      const code = tagCode.toLowerCase();
      if (code === 'near_tv' || code === 'tv_front') {
        return tableTagsList.includes('near_tv') || tableTagsList.includes('tv_front');
      }
      if (code === 'window') {
        return tableTagsList.includes('window') || tableType.includes('window');
      }
      if (code === 'quiet') {
        return tableTagsList.includes('quiet');
      }
      if (code === 'private_room' || code === 'room' || code === 'vip') {
        return tableTagsList.includes('private_room') || tableType.includes('vip') || tableType.includes('private');
      }
      if (code === 'outdoor' || code === 'smoking' || code === 'terrace') {
        return tableTagsList.includes('outdoor') || tableTagsList.includes('smoking') || tableType.includes('garden') || tableType.includes('terrace') || tableType.includes('outdoor');
      }
      if (code === 'counter' || code === 'bar') {
        return tableTagsList.includes('counter') || tableType.includes('bar');
      }
      if (code === 'booth') {
        return tableType.includes('booth');
      }
      return tableTagsList.includes(code);
    });
  }

  function getFilteredTables() {
    const allTables = MockData.tables || [];
    return allTables.filter(t => {
      const fitsParty = (t.seats || 2) >= guestCount;
      const matchesPref = matchesTablePreference(t, selectedSeatTags);
      return fitsParty && matchesPref;
    });
  }

  function renderTableSelectHtml(selectedTableValue = '') {
    const filtered = getFilteredTables();
    
    // Option C: check if currently selected table is in filtered list
    const isSelectedStillValid = selectedTableValue && filtered.some(t => t.name === selectedTableValue);
    const currentVal = isSelectedStillValid ? selectedTableValue : '';

    let optionsHtml = '';
    if (filtered.length > 0) {
      const autoLabel = selectedSeatTags.length > 0
        ? I18n.t('s09_auto_assign_matching', { count: String(filtered.length) })
        : I18n.t('s09_auto_assign_available', { count: String(filtered.length) });
      optionsHtml = `<option value="">${autoLabel}</option>` + 
        filtered.map(t => `<option value="${t.name}" ${t.name === currentVal ? 'selected' : ''}>${t.name} (${t.seats} ${I18n.t('s09_table_seats_unit')} · ${t.type})</option>`).join('');
    } else {
      optionsHtml = `<option value="" disabled selected>⚠️ ${I18n.t('s09_no_matching_table')}</option>`;
    }

    const activePrefNames = selectedSeatTags.map(c => I18n.getSeatTagLabel(c)).join(', ');

    const noMatchWarningHtml = filtered.length === 0
      ? `
        <div id="s09-no-table-warning" style="display: flex; align-items: flex-start; gap: 8px; padding: 10px 12px; background: #FEF2F2; border: 1px solid #FCA5A5; border-radius: 10px; margin-top: 6px; font-size: 12px; color: #991B1B;">
          <span class="material-symbols-outlined" style="font-size: 18px; color: #DC2626; flex-shrink: 0; margin-top: 1px;">warning</span>
          <div>
            <strong>${I18n.t('s09_no_matching_warning_title')}</strong> 
            ${I18n.t('s09_no_matching_warning_desc', { guestCount: String(guestCount), criteria: activePrefNames ? `[${activePrefNames}]` : 'criteria' })}
          </div>
        </div>
      `
      : `
        <div id="s09-table-filter-hint" style="display: flex; align-items: center; justify-content: space-between; margin-top: 4px; font-size: 11px; color: #64748B;">
          <span>${I18n.t('s09_filtered_tables_hint', { guestCount: String(guestCount), prefs: selectedSeatTags.length > 0 ? ` & ${activePrefNames}` : '', count: String(filtered.length) })}</span>
          ${selectedSeatTags.length > 0 ? `<button type="button" onclick="ScreenS09.clearSeatPreferences()" style="background: none; border: none; color: #0F4C5C; font-size: 11px; font-weight: 600; cursor: pointer; text-decoration: underline; padding: 0;">${I18n.t('s09_clear_filter')}</button>` : ''}
        </div>
      `;

    return `
      <select id="mb-table" onchange="ScreenS09.updateSummary()" style="width: 100%; height: 44px; border: 1px solid #c7c5d0; border-radius: 12px; padding: 0 14px; font-size: 14px; color: #0F4C5C; font-weight: 600; background: #f4f8fa;">
        ${optionsHtml}
      </select>
      ${noMatchWarningHtml}
    `;
  }

  function refreshTableSelect() {
    const container = document.getElementById('s09-table-select-container');
    const tableSelect = document.getElementById('mb-table');
    const currentVal = tableSelect ? tableSelect.value : '';
    if (container) {
      container.innerHTML = renderTableSelectHtml(currentVal);
    }
  }

  function clearSeatPreferences() {
    selectedSeatTags = [];
    const tagsContainer = document.getElementById('s09-tags-container');
    if (tagsContainer) {
      const tagButtons = tagsContainer.querySelectorAll('button[data-tag-code]');
      tagButtons.forEach(btn => {
        btn.style.border = '1.5px solid #CBD5E1';
        btn.style.background = '#FFFFFF';
        btn.style.color = '#334155';
      });
    }
    refreshTableSelect();
    updateSummary();
  }

  const timeSlots = ['18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30'];

  function getDateStatus(isoDate) {
    const parts = isoDate.split('-').map(n => parseInt(n, 10));
    const d = new Date(parts[0], parts[1] - 1, parts[2]);
    const dayOfWeek = d.getDay();
    const dayNum = d.getDate();

    if (dayOfWeek === 0) {
      return { status: 'closed', label: I18n.t('date_status_closed'), dotColor: '#9ca3af', bg: '#f3f4f6', color: '#6b7280' };
    }
    if (dayNum === 10 || dayNum === 24) {
      return { status: 'full', label: I18n.t('date_status_full'), dotColor: '#ef4444', bg: '#fee2e2', color: '#991b1b' };
    }
    if (dayOfWeek === 6 || dayNum === 7 || dayNum === 14) {
      return { status: 'limited', label: I18n.t('date_status_limited'), dotColor: '#D8902F', bg: '#fbead1', color: '#854d0e' };
    }
    return { status: 'available', label: I18n.t('date_status_available'), dotColor: '#0F4C5C', bg: '#d0e6ec', color: '#0F4C5C' };
  }

  function getFullDisplay(isoDate) {
    return I18n.formatFullDate(isoDate);
  }

  function renderMonthCalendarHtml() {
    const monthTitle = I18n.formatMonthYear(currentViewYear, currentViewMonth);

    const firstDayOfWeek = new Date(currentViewYear, currentViewMonth, 1).getDay();
    const totalDaysInMonth = new Date(currentViewYear, currentViewMonth + 1, 0).getDate();

    let gridCellsHtml = '';
    for (let i = 0; i < firstDayOfWeek; i++) {
      gridCellsHtml += `<div style="height: 42px;"></div>`;
    }

    const todayStr = '2026-07-20';

    for (let day = 1; day <= totalDaysInMonth; day++) {
      const isoDate = `${currentViewYear}-${String(currentViewMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const status = getDateStatus(isoDate);
      const isSelected = isoDate === selectedIsoDate;
      const isPast = isoDate < todayStr;

      if (isPast) {
        gridCellsHtml += `
          <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 42px; opacity: 0.35; pointer-events: none;">
            <span style="font-size: 13px; font-weight: 500; color: #9ca3af;">${day}</span>
          </div>
        `;
      } else {
        gridCellsHtml += `
          <div onclick="ScreenS09.setSelectedDate('${isoDate}')" style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 42px; cursor: pointer; user-select: none;">
            <div style="width: 28px; height: 28px; border-radius: 50%; background: ${isSelected ? '#0F4C5C' : 'transparent'}; color: ${isSelected ? '#ffffff' : (status.status === 'closed' ? '#9ca3af' : '#1F2937')}; font-weight: ${isSelected ? '700' : '600'}; font-size: 13px; display: flex; align-items: center; justify-content: center; transition: all 0.15s; ${isSelected ? 'box-shadow: 0 2px 8px rgba(15, 76, 92, 0.4);' : ''}">
              ${day}
            </div>
            <span style="width: 5px; height: 5px; border-radius: 50%; background: ${status.dotColor}; margin-top: 2px; display: inline-block;"></span>
          </div>
        `;
      }
    }

    return `
      <div class="s09-month-calendar-box" style="background: linear-gradient(145deg, #fbfcfe 0%, #f3f7fa 100%); border: 1px solid rgba(15, 76, 92, 0.14); border-radius: 16px; padding: 14px; box-shadow: 0 2px 8px rgba(15, 76, 92, 0.03);">
        
        <!-- Month Navigation Header -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; padding: 0 4px;">
          <button type="button" onclick="ScreenS09.changeMonth(-1)" style="border: 1px solid rgba(15, 76, 92, 0.12); background: #f4f8fa; cursor: pointer; font-size: 14px; color: #0F4C5C; font-weight: 700; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; transition: all 0.2s;">
            ‹
          </button>
          <span style="font-family: 'Outfit', sans-serif; font-size: 16px; font-weight: 700; color: #0F4C5C;" id="s09-month-title">
            ${monthTitle}
          </span>
          <button type="button" onclick="ScreenS09.changeMonth(1)" style="border: 1px solid rgba(15, 76, 92, 0.12); background: #f4f8fa; cursor: pointer; font-size: 14px; color: #0F4C5C; font-weight: 700; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; transition: all 0.2s;">
            ›
          </button>
        </div>

        <!-- 7 Column Weekday Header -->
        <div style="display: grid; grid-template-columns: repeat(7, 1fr); text-align: center; font-size: 11.5px; font-weight: 600; color: #46464f; margin-bottom: 6px;">
          <span>${I18n.formatWeekday(0, true)}</span>
          <span>${I18n.formatWeekday(1, true)}</span>
          <span>${I18n.formatWeekday(2, true)}</span>
          <span>${I18n.formatWeekday(3, true)}</span>
          <span>${I18n.formatWeekday(4, true)}</span>
          <span>${I18n.formatWeekday(5, true)}</span>
          <span>${I18n.formatWeekday(6, true)}</span>
        </div>

        <!-- Days Grid -->
        <div style="display: grid; grid-template-columns: repeat(7, 1fr); row-gap: 4px; text-align: center;" id="s09-days-grid">
          ${gridCellsHtml}
        </div>

        <!-- Status Legend -->
        <div style="display: flex; gap: 12px; margin-top: 12px; padding-top: 10px; border-top: 1px solid #f0f1f2; font-size: 11px; font-weight: 500; color: #46464f; justify-content: center; flex-wrap: wrap;">
          <div style="display: flex; align-items: center; gap: 4px;">
            <span style="width: 7px; height: 7px; border-radius: 50%; background: #0F4C5C; display: inline-block;"></span>
            <span>${I18n.t('date_status_available')}</span>
          </div>
          <div style="display: flex; align-items: center; gap: 4px;">
            <span style="width: 7px; height: 7px; border-radius: 50%; background: #D8902F; display: inline-block;"></span>
            <span>${I18n.t('date_status_limited')}</span>
          </div>
          <div style="display: flex; align-items: center; gap: 4px;">
            <span style="width: 7px; height: 7px; border-radius: 50%; background: #ef4444; display: inline-block;"></span>
            <span>${I18n.t('date_status_full')}</span>
          </div>
          <div style="display: flex; align-items: center; gap: 4px;">
            <span style="width: 7px; height: 7px; border-radius: 50%; background: #9ca3af; display: inline-block;"></span>
            <span>${I18n.t('date_status_closed')}</span>
          </div>
        </div>

      </div>
    `;
  }

  function render() {
    const activeDateDisplay = getFullDisplay(selectedIsoDate);
    const activeStatus = getDateStatus(selectedIsoDate);

    const offlineBannerHtml = isOffline ? `
      <div style="background: #fff3e0; color: #ed6c02; padding: 12px 16px; border-radius: 12px; font-size: 13px; font-weight: 500; display: flex; align-items: center; gap: 8px; margin-bottom: 16px; border: 1px solid #ffe0b2;">
        <span class="material-symbols-outlined" style="font-size: 18px;">wifi_off</span>
        <span>${I18n.t('offline_banner_text')}</span>
      </div>
    ` : '';

    const simulatorHtml = `
      <div class="stitch-simulator-card" style="border-radius: 16px; padding: 16px; margin-top: 16px;">
        <div style="font-weight: 700; font-size: 12.5px; color: #191c1d; margin-bottom: 10px; display: flex; align-items: center; gap: 6px;">
          📶 ${I18n.t('network_simulator_label')}
        </div>
        <div style="display: flex; flex-direction: column; gap: 10px; font-size: 12.5px;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span>${I18n.t('network_simulator_status')}</span>
            <div style="display: flex; gap: 8px;">
              <button type="button" class="btn btn-sm ${!isOffline ? 'btn-primary' : 'btn-secondary'}" style="height:28px; padding:0 12px; font-size:11px;" onclick="ScreenS09.toggleNetwork(false)">
                🟢 Online
              </button>
              <button type="button" class="btn btn-sm ${isOffline ? 'btn-warning' : 'btn-secondary'}" style="height:28px; padding:0 12px; font-size:11px;" onclick="ScreenS09.toggleNetwork(true)">
                🟠 Offline
              </button>
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 8px; border-top: 1px solid #edeeef; padding-top: 8px;">
            <input type="checkbox" id="sim-conflict-check" ${forceConflict ? 'checked' : ''} onchange="ScreenS09.toggleConflict(this.checked)" style="cursor:pointer; width:16px; height:16px;">
            <label for="sim-conflict-check" style="cursor:pointer; font-weight:500;">
              ⚡ ${I18n.t('network_simulator_conflict_toggle')}
            </label>
          </div>
        </div>
      </div>
    `;

    const formHtml = `
      <div style="max-width: 1040px; margin: 0 auto;">
        ${offlineBannerHtml}
        
        <div id="s09-screen">
        <form id="s09-form" onsubmit="ScreenS09.registerManualBooking(event)" class="stitch-layout-grid">
          
          <!-- Left Column: Customer Details, Schedule & Special Requests -->
          <div style="display: flex; flex-direction: column;">
            
            <!-- GROUP 1: CUSTOMER INFORMATION Card -->
            <div class="stitch-card" style="display: flex; flex-direction: column; gap: 14px;">
              <div class="stitch-card-header">
                <div class="stitch-card-header-left">
                  <span class="stitch-card-icon">👤</span>
                  <h4 class="stitch-card-title">${I18n.t('mb_group_customer')}</h4>
                </div>
                <span class="stitch-card-badge" style="background: rgba(15, 76, 92, 0.08); color: #0F4C5C;">${I18n.t('s09_required')}</span>
              </div>

              <!-- Customer Name -->
              <div style="display: flex; flex-direction: column; gap: 6px;">
                <label style="font-size: 13px; font-weight: 500; color: #46464f;">${I18n.t('customer_name')} <span class="text-error">*</span></label>
                <input type="text" id="mb-name" placeholder="${I18n.t('s09_name_placeholder')}" style="width: 100%; height: 46px; border: 1px solid #c7c5d0; border-radius: 12px; padding: 0 16px; font-size: 14.5px; color: #1F2937; background: #f4f8fa; outline: none; transition: border-color 0.15s;" required />
              </div>

              <!-- Customer Phone -->
              <div style="display: flex; flex-direction: column; gap: 6px;">
                <label style="font-size: 13px; font-weight: 500; color: #46464f;">${I18n.t('contact_phone')} <span class="text-error">*</span></label>
                ${Components.phoneInput({ id: 'mb-phone', required: true })}
              </div>
            </div>

            <!-- GROUP 2: SCHEDULE (Date & Time) Card -->
            <div class="stitch-card" style="display: flex; flex-direction: column; gap: 14px;">
              <div class="stitch-card-header">
                <div class="stitch-card-header-left">
                  <span class="stitch-card-icon">📅</span>
                  <h4 class="stitch-card-title">${I18n.t('mb_group_schedule')}</h4>
                </div>
                <span class="stitch-card-badge" id="selected-date-display">${activeDateDisplay} • ${activeStatus.label}</span>
              </div>

              <!-- Monthly Grid Calendar Picker -->
              <div id="s09-calendar-wrapper">
                ${renderMonthCalendarHtml()}
              </div>

              <!-- Time Slots Grid -->
              <div style="display: flex; flex-direction: column; gap: 6px; margin-top: 4px;">
                <span style="font-size: 12px; font-weight: 600; color: #46464f; text-transform: uppercase; letter-spacing: 0.04em;">${I18n.t('visit_date_time')}</span>
                <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px;" id="s09-time-container">
                  ${timeSlots.map(t => `
                    <button type="button" data-time="${t}" onclick="ScreenS09.setTimeSlot('${t}')" class="stitch-time-slot ${t === selectedTime ? 'active' : 'inactive'}">
                      ${t}
                    </button>
                  `).join('')}
                </div>
              </div>
            </div>

            <!-- GROUP 5: SPECIAL REQUESTS & NOTES Card -->
            <div class="stitch-card" style="display: flex; flex-direction: column; gap: 12px;">
              <div class="stitch-card-header">
                <div class="stitch-card-header-left">
                  <span class="stitch-card-icon">📝</span>
                  <h4 class="stitch-card-title">${I18n.t('mb_group_notes')}</h4>
                </div>
                <span class="stitch-card-badge">${I18n.t('s09_optional')}</span>
              </div>

              <!-- Quick Occasion & Dietary Tags -->
              <div style="display: flex; flex-direction: column; gap: 6px;">
                <span style="font-size: 11.5px; font-weight: 600; color: #64748B;">${I18n.t('mb_quick_tags_title')}</span>
                <div style="display: flex; gap: 6px; flex-wrap: wrap;">
                  <button type="button" class="stitch-request-chip" onclick="ScreenS09.appendNoteTag('${I18n.t('mb_tag_birthday')}')">${I18n.t('mb_tag_birthday')}</button>
                  <button type="button" class="stitch-request-chip" onclick="ScreenS09.appendNoteTag('${I18n.t('mb_tag_anniversary')}')">${I18n.t('mb_tag_anniversary')}</button>
                  <button type="button" class="stitch-request-chip" onclick="ScreenS09.appendNoteTag('${I18n.t('mb_tag_highchair')}')">${I18n.t('mb_tag_highchair')}</button>
                  <button type="button" class="stitch-request-chip" onclick="ScreenS09.appendNoteTag('${I18n.t('mb_tag_vegetarian')}')">${I18n.t('mb_tag_vegetarian')}</button>
                  <button type="button" class="stitch-request-chip" onclick="ScreenS09.appendNoteTag('${I18n.t('mb_tag_nopork')}')">${I18n.t('mb_tag_nopork')}</button>
                  <button type="button" class="stitch-request-chip" onclick="ScreenS09.appendNoteTag('${I18n.t('mb_tag_wheelchair')}')">${I18n.t('mb_tag_wheelchair')}</button>
                  <button type="button" class="stitch-request-chip" onclick="ScreenS09.appendNoteTag('${I18n.t('mb_tag_business')}')">${I18n.t('mb_tag_business')}</button>
                </div>
              </div>

              <!-- Notes Textarea -->
              <textarea id="mb-notes" placeholder="${I18n.t('s09_notes_placeholder')}" style="width: 100%; min-height: 84px; border: 1px solid #c7c5d0; border-radius: 12px; padding: 12px 16px; font-size: 14px; color: #1F2937; background: #f4f8fa; resize: none; outline: none; transition: border-color 0.15s;"></textarea>
            </div>

          </div>

          <!-- Right Column: Guests, Seating, Summary & Actions (Sticky on Desktop) -->
          <div style="display: flex; flex-direction: column;" class="stitch-desktop-sticky-summary">
            
            <!-- GROUP 3: TOTAL GUESTS & PARTY SIZE Card -->
            <div class="stitch-card" style="display: flex; flex-direction: column; gap: 14px;">
              <div class="stitch-card-header">
                <div class="stitch-card-header-left">
                  <span class="stitch-card-icon">👥</span>
                  <h4 class="stitch-card-title">${I18n.t('mb_group_guests')}</h4>
                </div>
                <span class="stitch-card-badge" id="guest-count-badge">${guestCount} ${I18n.t('s09_guests_unit')}</span>
              </div>

              <!-- 1-Tap Quick Guest Chips -->
              <div class="stitch-guest-chips">
                <button type="button" data-guests="2" onclick="ScreenS09.setGuestCount(2)" class="stitch-guest-chip ${guestCount === 2 ? 'active' : ''}">
                  ${I18n.t('mb_quick_guest_2')}
                </button>
                <button type="button" data-guests="4" onclick="ScreenS09.setGuestCount(4)" class="stitch-guest-chip ${guestCount === 4 ? 'active' : ''}">
                  ${I18n.t('mb_quick_guest_4')}
                </button>
                <button type="button" data-guests="6" onclick="ScreenS09.setGuestCount(6)" class="stitch-guest-chip ${guestCount === 6 ? 'active' : ''}">
                  ${I18n.t('mb_quick_guest_6')}
                </button>
                <button type="button" data-guests="8" onclick="ScreenS09.setGuestCount(8)" class="stitch-guest-chip ${guestCount === 8 ? 'active' : ''}">
                  ${I18n.t('mb_quick_guest_8')}
                </button>
              </div>

              <!-- Stepper Control -->
              <div style="display: flex; align-items: center; justify-content: space-between; background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 8px 16px;">
                <div style="display: flex; flex-direction: column;">
                  <span style="font-size: 11.5px; font-weight: 600; color: #64748B; text-transform: uppercase;">${I18n.t('s09_party_count')}</span>
                  <div style="display: flex; align-items: baseline; gap: 4px;">
                    <span style="font-family: 'Outfit', sans-serif; font-size: 26px; font-weight: 700; color: #0F4C5C;" id="guest-count">${guestCount}</span>
                    <span style="font-size: 13px; color: #475569; font-weight: 500;">${I18n.t('s09_person_unit')}</span>
                  </div>
                </div>
                <div style="display: flex; align-items: center; gap: 12px;">
                  <button type="button" class="stitch-stepper-btn" onclick="ScreenS09.adjustGuests(-1)" aria-label="Decrease guests">
                    <span class="material-symbols-outlined" style="font-size: 20px;">remove</span>
                  </button>
                  <button type="button" class="stitch-stepper-btn" onclick="ScreenS09.adjustGuests(1)" aria-label="Increase guests">
                    <span class="material-symbols-outlined" style="font-size: 20px;">add</span>
                  </button>
                </div>
              </div>
            </div>

            <!-- GROUP 4: SEATING & TABLE PREFERENCE Card -->
            <div class="stitch-card" style="display: flex; flex-direction: column; gap: 14px;">
              <div class="stitch-card-header">
                <div class="stitch-card-header-left">
                  <span class="stitch-card-icon">🪑</span>
                  <h4 class="stitch-card-title">${I18n.t('mb_group_table')}</h4>
                </div>
                <span class="stitch-card-badge" id="s09-table-badge">${selectedSeatTags.length > 0 ? `${selectedSeatTags.length} tag(s)` : I18n.t('s09_auto_match')}</span>
              </div>

              <!-- Seating Preference Tags -->
              <div style="display: flex; flex-direction: column; gap: 6px;">
                <span style="font-size: 12px; font-weight: 600; color: #46464f;">${I18n.t('s09_seating_feature_tags')}</span>
                <div style="display: flex; gap: 8px; flex-wrap: wrap;" id="s09-tags-container">
                  ${tableTags.map(tag => {
                    const isSelected = selectedSeatTags.includes(tag.code);
                    const label = I18n.getSeatTagLabel(tag.code);
                    return `
                      <button type="button" data-tag-code="${tag.code}" onclick="ScreenS09.togglePreferredTag('${tag.code}')" style="padding: 6px 14px; border-radius: 20px; font-size: 12px; font-weight: 600; border: 1.5px solid ${isSelected ? '#0B1220' : '#CBD5E1'}; background: ${isSelected ? '#0B1220' : '#FFFFFF'}; color: ${isSelected ? '#FFFFFF' : '#334155'}; cursor: pointer; transition: all 0.15s;">
                        ${label}
                      </button>
                    `;
                  }).join('')}
                </div>
              </div>

              <!-- Assigned Table Select -->
              <div style="display: flex; flex-direction: column; gap: 6px; margin-top: 2px;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <label style="font-size: 13px; font-weight: 500; color: #46464f;">${I18n.t('s09_assigned_table')}</label>
                  <span style="font-size: 11px; color: #64748B;">${I18n.t('select_table')}</span>
                </div>
                <div id="s09-table-select-container">
                  ${renderTableSelectHtml()}
                </div>
              </div>
            </div>

            <!-- GROUP 6: BOOKING SUMMARY & CONFIRMATION Card -->
            <div class="stitch-card stitch-summary-card">
              <div class="stitch-card-header" style="border-bottom: 1px solid rgba(15,76,92,0.12);">
                <div class="stitch-card-header-left">
                  <span class="stitch-card-icon" style="background: rgba(15,76,92,0.12);">📋</span>
                  <h4 class="stitch-card-title">${I18n.t('mb_group_summary')}</h4>
                </div>
                <span class="stitch-card-badge" style="background: #E0F2FE; color: #0369A1; font-weight: 700;">Live Review</span>
              </div>

              <!-- Summary Items List -->
              <div style="display: flex; flex-direction: column; gap: 10px; margin-bottom: 16px;">
                <div style="display: flex; justify-content: space-between; align-items: center; font-size: 13px;">
                  <span style="color: #64748B; display: flex; align-items: center; gap: 6px;">
                    <span class="material-symbols-outlined" style="font-size: 16px;">event</span>
                    ${I18n.t('s09_date_and_time')}
                  </span>
                  <span style="color: #0F4C5C; font-weight: 700;" id="summary-text">${activeDateDisplay} • ${selectedTime}</span>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; font-size: 13px;">
                  <span style="color: #64748B; display: flex; align-items: center; gap: 6px;">
                    <span class="material-symbols-outlined" style="font-size: 16px;">group</span>
                    ${I18n.t('guests')}
                  </span>
                  <span style="color: #0F4C5C; font-weight: 700;" id="summary-guests">${guestCount} ${I18n.t('s09_guests_unit')}</span>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; font-size: 13px;">
                  <span style="color: #64748B; display: flex; align-items: center; gap: 6px;">
                    <span class="material-symbols-outlined" style="font-size: 16px;">table_restaurant</span>
                    ${I18n.t('s09_table_status')}
                  </span>
                  <span style="color: #0F4C5C; font-weight: 700;" id="summary-table-status">Table 12 (${I18n.t('s09_available')})</span>
                </div>
              </div>

              <!-- Primary Submit CTA -->
              <button type="submit" class="stitch-register-btn">
                <span class="material-symbols-outlined" style="font-size: 22px; font-variation-settings: 'FILL' 1;">check_circle</span>
                <span>${I18n.t('register_booking')}</span>
              </button>
            </div>

            <!-- Network Simulator Card -->
            ${simulatorHtml}

          </div>

        </form>
        </div>
      </div>
    `;

    const content = `
      ${Components.pageHeader(I18n.t('manual_booking'), I18n.t('manual_booking_subtitle'))}
      ${formHtml}
    `;

    App.renderAdminPage('shop', I18n.t('sidebar_manual_booking'), content);
    updateSummary();
  }

  function setSource(type) {
    bookingSource = type;
    const btnPhone = document.getElementById('s09-btn-phone') || document.getElementById('btn-phone');
    const btnWalkin = document.getElementById('s09-btn-walkin') || document.getElementById('btn-walkin');

    if (btnPhone && btnWalkin) {
      if (type === 'phone') {
        btnPhone.className = 'stitch-btn-active';
        btnWalkin.className = 'stitch-btn-inactive';
      } else {
        btnWalkin.className = 'stitch-btn-active';
        btnPhone.className = 'stitch-btn-inactive';
      }
    }
    updateSummary();
  }

  function changeMonth(delta) {
    currentViewMonth += delta;
    if (currentViewMonth < 0) {
      currentViewMonth = 11;
      currentViewYear -= 1;
    } else if (currentViewMonth > 11) {
      currentViewMonth = 0;
      currentViewYear += 1;
    }

    const wrapper = document.getElementById('s09-calendar-wrapper');
    if (wrapper) {
      wrapper.innerHTML = renderMonthCalendarHtml();
    }
  }

  function setSelectedDate(isoDate) {
    selectedIsoDate = isoDate;
    const activeDateDisplay = getFullDisplay(selectedIsoDate);
    const activeStatus = getDateStatus(selectedIsoDate);

    const wrapper = document.getElementById('s09-calendar-wrapper');
    if (wrapper) {
      wrapper.innerHTML = renderMonthCalendarHtml();
    }

    const dateDisplay = document.getElementById('selected-date-display');
    if (dateDisplay) {
      dateDisplay.innerText = `${activeDateDisplay} • ${activeStatus.label}`;
    }

    updateSummary();
  }

  function setTimeSlot(time) {
    selectedTime = time;
    const timeContainer = document.getElementById('s09-time-container');
    if (timeContainer) {
      const timeButtons = timeContainer.querySelectorAll('button[data-time]');
      timeButtons.forEach(btn => {
        const btnTime = btn.getAttribute('data-time');
        if (btnTime === selectedTime) {
          btn.className = 'stitch-time-slot active';
        } else {
          btn.className = 'stitch-time-slot inactive';
        }
      });
    }

    updateSummary();
  }

  function setGuestCount(count) {
    guestCount = Math.max(1, Math.min(20, count));
    const el = document.getElementById('guest-count');
    if (el) el.innerText = guestCount;
    const badge = document.getElementById('guest-count-badge');
    if (badge) {
      badge.innerText = `${guestCount} ${I18n.t('s09_guests_unit')}`;
    }
    updateGuestChips();
    refreshTableSelect();
    updateSummary();
  }

  function adjustGuests(val) {
    setGuestCount(guestCount + val);
  }

  function updateGuestChips() {
    const chips = document.querySelectorAll('.stitch-guest-chip');
    chips.forEach(chip => {
      const val = parseInt(chip.getAttribute('data-guests'), 10);
      if (val === guestCount) {
        chip.classList.add('active');
      } else {
        chip.classList.remove('active');
      }
    });
  }

  function appendNoteTag(tagText) {
    const textarea = document.getElementById('mb-notes');
    if (!textarea) return;
    const current = textarea.value.trim();
    if (!current) {
      textarea.value = tagText;
    } else if (current.includes(tagText)) {
      // Toggle off cleanly
      const regex = new RegExp(`(^|,\\s*)${tagText.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&')}(,\\s*|$)`, 'g');
      textarea.value = current.replace(regex, ', ').replace(/^,\s*/, '').replace(/,\s*$/, '').replace(/,\s*,/g, ', ').trim();
    } else {
      textarea.value = current + ', ' + tagText;
    }
    textarea.focus();
  }

  function togglePreferredTag(tagCode) {
    const idx = selectedSeatTags.indexOf(tagCode);
    if (idx === -1) {
      selectedSeatTags.push(tagCode);
    } else {
      selectedSeatTags.splice(idx, 1);
    }

    const tagsContainer = document.getElementById('s09-tags-container');
    if (tagsContainer) {
      const tagButtons = tagsContainer.querySelectorAll('button[data-tag-code]');
      tagButtons.forEach(btn => {
        const code = btn.getAttribute('data-tag-code');
        const isSelected = selectedSeatTags.includes(code);
        btn.style.border = `1.5px solid ${isSelected ? '#0B1220' : '#CBD5E1'}`;
        btn.style.background = isSelected ? '#0B1220' : '#FFFFFF';
        btn.style.color = isSelected ? '#FFFFFF' : '#334155';
      });
    }

    const tableBadge = document.getElementById('s09-table-badge');
    if (tableBadge) {
      tableBadge.innerText = selectedSeatTags.length > 0 ? `${selectedSeatTags.length} tag(s)` : I18n.t('s09_auto_match');
    }

    refreshTableSelect();
    updateSummary();
  }

  function updateSummary() {
    const activeDateDisplay = getFullDisplay(selectedIsoDate);
    
    const summaryTextEl = document.getElementById('summary-text');
    if (summaryTextEl) {
      summaryTextEl.innerText = `${activeDateDisplay} • ${selectedTime}`;
    }

    const summaryGuestsEl = document.getElementById('summary-guests');
    if (summaryGuestsEl) {
      summaryGuestsEl.innerText = `${guestCount} ${I18n.t('s09_guests_unit')}`;
    }

    const tableSelect = document.getElementById('mb-table');
    const tableStatusEl = document.getElementById('summary-table-status');
    if (tableStatusEl) {
      const val = tableSelect ? tableSelect.value : '';
      const filtered = getFilteredTables();
      const availText = I18n.t('s09_available');
      const autoText = I18n.t('s09_auto_assign');
      const noMatchText = I18n.t('s09_no_matching_table');
      
      if (val) {
        tableStatusEl.innerText = `${val} (${availText})`;
      } else if (filtered.length > 0) {
        tableStatusEl.innerText = `${autoText} (${filtered[0].name})`;
      } else {
        tableStatusEl.innerText = noMatchText;
      }
    }
  }

  function toggleNetwork(offline) {
    isOffline = offline;
    localStorage.setItem('s09_offline', offline.toString());
    showToast('info', offline ? 'Simulated Offline' : 'Simulated Online', offline ? 'Network simulated to Offline. Active sync queue enabled.' : 'Network simulated to Online.');
    render();
  }

  function toggleConflict(checked) {
    forceConflict = checked;
    localStorage.setItem('s09_sync_conflict', checked.toString());
    showToast('info', 'Simulator Mode', checked ? 'Sync conflicts simulated (409).' : 'Clean sync simulated.');
  }

  function registerManualBooking(e) {
    e.preventDefault();
    const nameInput = document.getElementById('mb-name');
    const name = nameInput ? nameInput.value.trim() : '';
    
    if (!Components.validatePhoneNumber('mb-phone')) {
      showToast('error', I18n.t('validation_error'), I18n.t('phone_validation_msg'));
      return;
    }
    const phone = Components.getRawPhoneNumber('mb-phone');

    const dateStr = selectedIsoDate;
    const timeStr = selectedTime;
    const table = document.getElementById('mb-table')?.value || 'Table 12';
    const notes = document.getElementById('mb-notes')?.value.trim() || '';

    if (!name || !phone) {
      showToast('error', I18n.t('error') || 'Error', I18n.t('fill_required_fields'));
      return;
    }

    const clientRequestId = 'client_req_' + Math.random().toString(36).substr(2, 9);

    const bookingPayload = {
      id: `SR-ENT-${dateStr.replace(/-/g, '')}-${String(Math.floor(100 + Math.random() * 900)).padStart(3, '0')}`,
      name,
      phone,
      date: dateStr,
      time: timeStr,
      guests: guestCount,
      table: table || 'Table 12',
      notes,
      source: bookingSource,
      preferred_seat_tags: [...selectedSeatTags],
      client_request_id: clientRequestId,
      created_at: new Date().toISOString()
    };

    if (isOffline) {
      const queue = JSON.parse(localStorage.getItem('pending_bookings') || '[]');
      bookingPayload.status = 'pending_sync';
      queue.push(bookingPayload);
      localStorage.setItem('pending_bookings', JSON.stringify(queue));
      showToast('warning', 'Offline Registration', 'Reservation queued locally in Sync Queue. Redirecting...');
    } else {
      bookingPayload.status = 'confirmed';
      MockData.shopReservations.unshift(bookingPayload);
      showToast('success', 'Registered', `Manual booking ${bookingPayload.id} successfully registered.`);
    }

    selectedSeatTags = [];
    Router.navigate('/shop/ledger');
  }

  return { 
    render, 
    setSource,
    changeMonth,
    setSelectedDate,
    setTimeSlot,
    adjustGuests,
    setGuestCount,
    appendNoteTag,
    togglePreferredTag, 
    clearSeatPreferences,
    refreshTableSelect,
    updateSummary,
    toggleNetwork, 
    toggleConflict, 
    registerManualBooking 
  };
})();
