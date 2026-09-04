/* ============================================================
   EzBookNow Screen S-03-B — Quick New Booking Modal Screen
   Responsive modal dialog for Desktop, Tablet, and Mobile devices
   ============================================================ */

const ScreenS03B = (() => {
  let modalElement = null;

  let bookingSource = 'phone';
  let guestCount = 4;
  let currentViewYear = 2026;
  let currentViewMonth = 6; // 0-indexed: 6 = July
  let selectedIsoDate = '2026-07-20';
  let selectedTime = '19:00';
  let selectedSeatTags = [];

  const tableTags = [
    { code: 'near_tv', key: 's03b_tag_near_tv' },
    { code: 'window', key: 's03b_tag_window' },
    { code: 'quiet', key: 's03b_tag_quiet' },
    { code: 'private_room', key: 's03b_tag_private_room' },
    { code: 'outdoor', key: 's03b_tag_outdoor' },
    { code: 'counter', key: 's03b_tag_counter' }
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
        ? I18n.t('auto_assign_matching', { count: filtered.length })
        : I18n.t('auto_assign_available', { count: filtered.length });
      optionsHtml = `<option value="">${autoLabel}</option>` + 
        filtered.map(t => `<option value="${t.name}" ${t.name === currentVal ? 'selected' : ''}>${t.name} (${t.seats} ${I18n.t('table_seats_unit')} · ${t.type})</option>`).join('');
    } else {
      optionsHtml = `<option value="" disabled selected>${I18n.t('no_matching_tables')}</option>`;
    }

    const activePrefNames = selectedSeatTags.map(c => {
      const tag = tableTags.find(t => t.code === c);
      return tag ? I18n.t(tag.key) : c;
    }).join(', ');

    const noMatchWarningHtml = filtered.length === 0
      ? `
        <div id="s03b-no-table-warning" style="display: flex; align-items: flex-start; gap: 6px; padding: 8px 10px; background: #FEF2F2; border: 1px solid #FCA5A5; border-radius: 8px; margin-top: 4px; font-size: 11.5px; color: #991B1B;">
          <span class="material-symbols-outlined" style="font-size: 16px; color: #DC2626; flex-shrink: 0; margin-top: 1px;">warning</span>
          <div>
            <strong>${I18n.t('no_matching_tables_prefix')}</strong> 
            ${I18n.t('no_tables_capacity_match', { guests: guestCount, criteria: activePrefNames ? `[${activePrefNames}]` : I18n.t('criteria_fallback') })}
          </div>
        </div>
      `
      : `
        <div id="s03b-table-filter-hint" style="display: flex; align-items: center; justify-content: space-between; margin-top: 3px; font-size: 11px; color: #64748B;">
          <span>${I18n.t('filtered_by_summary', { guests: guestCount, pref: selectedSeatTags.length > 0 ? ` & ${activePrefNames}` : '', count: filtered.length })}</span>
          ${selectedSeatTags.length > 0 ? `<button type="button" onclick="ScreenS03B.clearSeatPreferences()" style="background: none; border: none; color: #0F4C5C; font-size: 11px; font-weight: 600; cursor: pointer; text-decoration: underline; padding: 0;">${I18n.t('clear_filter')}</button>` : ''}
        </div>
      `;

    return `
      <select id="new-book-table" onchange="ScreenS03B.updateSummary()" style="width: 100%; height: 40px; border: 1px solid #c7c5d0; border-radius: 10px; padding: 0 12px; font-size: 13px; color: #0F4C5C; font-weight: 600; background: #f4f8fa;">
        ${optionsHtml}
      </select>
      ${noMatchWarningHtml}
    `;
  }

  function refreshTableSelect() {
    const container = document.getElementById('s03b-table-select-container');
    const tableSelect = document.getElementById('new-book-table');
    const currentVal = tableSelect ? tableSelect.value : '';
    if (container) {
      container.innerHTML = renderTableSelectHtml(currentVal);
    }
  }

  function clearSeatPreferences() {
    selectedSeatTags = [];
    const tagsContainer = document.getElementById('s03b-tags-container');
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
          <div onclick="ScreenS03B.setSelectedDate('${isoDate}')" style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 42px; cursor: pointer; user-select: none;">
            <div style="width: 28px; height: 28px; border-radius: 50%; background: ${isSelected ? '#0F4C5C' : 'transparent'}; color: ${isSelected ? '#ffffff' : (status.status === 'closed' ? '#9ca3af' : '#1F2937')}; font-weight: ${isSelected ? '700' : '600'}; font-size: 13px; display: flex; align-items: center; justify-content: center; transition: all 0.15s; ${isSelected ? 'box-shadow: 0 2px 8px rgba(15, 76, 92, 0.4);' : ''}">
              ${day}
            </div>
            <span style="width: 5px; height: 5px; border-radius: 50%; background: ${status.dotColor}; margin-top: 2px; display: inline-block;"></span>
          </div>
        `;
      }
    }

    return `
      <div style="background: linear-gradient(145deg, #fbfcfe 0%, #f3f7fa 100%); border: 1px solid rgba(15, 76, 92, 0.14); border-radius: 16px; padding: 14px; box-shadow: 0 2px 8px rgba(15, 76, 92, 0.03);">
        
        <!-- Month Navigation Header -->
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; padding: 0 4px;">
          <button type="button" onclick="ScreenS03B.changeMonth(-1)" aria-label="Previous Month" style="border: 1px solid rgba(15, 76, 92, 0.12); background: #f4f8fa; cursor: pointer; font-size: 18px; color: #0F4C5C; font-weight: 700; width: 44px; height: 44px; min-width: 44px; min-height: 44px; border-radius: 50%; display: flex; align-items: center; justify-content: center; transition: all 0.2s;">
            ‹
          </button>
          <span style="font-family: 'Outfit', sans-serif; font-size: 16px; font-weight: 700; color: #0F4C5C;" id="s03b-month-title">
            ${monthTitle}
          </span>
          <button type="button" onclick="ScreenS03B.changeMonth(1)" aria-label="Next Month" style="border: 1px solid rgba(15, 76, 92, 0.12); background: #f4f8fa; cursor: pointer; font-size: 18px; color: #0F4C5C; font-weight: 700; width: 44px; height: 44px; min-width: 44px; min-height: 44px; border-radius: 50%; display: flex; align-items: center; justify-content: center; transition: all 0.2s;">
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
        <div style="display: grid; grid-template-columns: repeat(7, 1fr); row-gap: 4px; text-align: center;" id="s03b-days-grid">
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
    window.location.hash = '/shop/ledger';
    setTimeout(() => {
      open(() => {
        if (typeof ScreenS02 !== 'undefined') {
          ScreenS02.render();
        }
      });
    }, 50);
  }

  function open(onSuccess) {
    close();

    const activeDateDisplay = getFullDisplay(selectedIsoDate);
    const activeStatus = getDateStatus(selectedIsoDate);

    modalElement = document.createElement('div');
    modalElement.id = 's03b-new-booking-modal';
    modalElement.className = 'modal-backdrop s03b-modal-backdrop';
    modalElement.onclick = (e) => {
      if (e.target === modalElement) close();
    };

    modalElement.innerHTML = `
      <div id="s03b-screen" class="s03b-modal-sheet" onclick="event.stopPropagation()">
      <form id="s03b-form" style="display:flex; flex-direction:column; gap:16px;" onsubmit="return false;">
        
        <!-- Modal Header -->
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid rgba(15,76,92,0.1); padding-bottom:12px;">
          <div>
            <h3 style="font-family:'Outfit',sans-serif; font-size:22px; font-weight:700; color:#0F4C5C; margin:0; display:flex; align-items:center; gap:8px;">
              <span class="material-symbols-outlined" style="font-size:24px;">menu_book</span>
              <span>${I18n.t('s03b_modal_title')}</span>
            </h3>
            <p style="font-size:13px; color:#46464f; margin:2px 0 0 0;">
              ${I18n.t('s03b_modal_subtitle')}
            </p>
          </div>
          <button type="button" class="modal__close" style="min-width:44px; min-height:44px; width:44px; height:44px; font-size:20px; cursor:pointer;" title="${I18n.t('close')}" onclick="ScreenS03B.close()">✕</button>
        </div>

        <!-- Responsive Layout Grid inside Modal -->
        <div class="stitch-layout-grid">
          
          <!-- Left Column -->
          <div style="display:flex; flex-direction:column; gap:12px;">
            <!-- BOOKING SOURCE Card -->
            <div class="stitch-card" style="margin-bottom:0;">
              <span class="stitch-label">${I18n.t('booking_source_title')}</span>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                <button type="button" id="s03b-btn-phone" onclick="ScreenS03B.setSource('phone')" class="${bookingSource === 'phone' ? 'stitch-btn-active' : 'stitch-btn-inactive'}" style="height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; gap: 8px; font-size: 13.5px; cursor: pointer; transition: all 0.2s;">
                  <span class="material-symbols-outlined" style="font-size: 18px;">call</span>
                  ${I18n.t('source_phone')}
                </button>
                <button type="button" id="s03b-btn-walkin" onclick="ScreenS03B.setSource('walkin')" class="${bookingSource === 'walkin' ? 'stitch-btn-active' : 'stitch-btn-inactive'}" style="height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; gap: 8px; font-size: 13.5px; cursor: pointer; transition: all 0.2s;">
                  <span class="material-symbols-outlined" style="font-size: 18px;">directions_walk</span>
                  ${I18n.t('source_walkin')}
                </button>
              </div>
            </div>

            <!-- CUSTOMER INFORMATION Card -->
            <div class="stitch-card" style="display: flex; flex-direction: column; gap: 10px; margin-bottom:0;">
              <span class="stitch-label" style="margin-bottom: 0;">${I18n.t('customer_info_title')}</span>
              <div style="display: flex; flex-direction: column; gap: 4px;">
                <label style="font-size: 12px; font-weight: 500; color: #46464f;">${I18n.t('customer_name')} <span class="text-error">*</span></label>
                <input type="text" id="new-book-name" placeholder="${I18n.t('customer_name_placeholder')}" style="width: 100%; height: 42px; border: 1px solid #c7c5d0; border-radius: 10px; padding: 0 14px; font-size: 14px; color: #1F2937; background: #f4f8fa; outline: none;" required />
              </div>
              <div style="display: flex; flex-direction: column; gap: 4px;">
                <label style="font-size: 12px; font-weight: 500; color: #46464f;">${I18n.t('contact_phone')} <span class="text-error">*</span></label>
                ${Components.phoneInput({ id: 'new-book-phone', required: true })}
              </div>
            </div>

            <!-- SCHEDULE Card -->
            <div class="stitch-card" style="display: flex; flex-direction: column; gap: 10px; margin-bottom:0;">
              <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
                <span class="stitch-label" style="margin-bottom: 0;">${I18n.t('booking_schedule_title')}</span>
                <span style="color: #0F4C5C; font-weight: 700; font-size: 12px;" id="s03b-selected-date-display">${activeDateDisplay} • ${activeStatus.label}</span>
              </div>

              <!-- Monthly Grid Calendar Picker -->
              <div id="s03b-calendar-wrapper">
                ${renderMonthCalendarHtml()}
              </div>

              <!-- Time Slots Grid -->
              <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; margin-top: 6px;" id="s03b-time-container">
                ${timeSlots.map(t => `
                  <button type="button" data-time="${t}" onclick="ScreenS03B.setTimeSlot('${t}')" class="stitch-time-slot ${t === selectedTime ? 'active' : 'inactive'}">
                    ${t}
                  </button>
                `).join('')}
              </div>
            </div>
          </div>

          <!-- Right Column -->
          <div style="display:flex; flex-direction:column; gap:12px;">
            <!-- TOTAL GUESTS Card -->
            <div class="stitch-card" style="display: flex; align-items: center; justify-content: space-between; margin-bottom:0;">
              <div>
                <span class="stitch-label" style="margin-bottom: 2px;">${I18n.t('total_guests')}</span>
                <span style="font-family: 'Outfit', sans-serif; font-size: 22px; font-weight: 700; color: #0F4C5C;" id="s03b-guest-count">${guestCount}</span>
              </div>
              <div style="display: flex; align-items: center; gap: 12px;">
                <button type="button" class="stitch-stepper-btn" onclick="ScreenS03B.adjustGuests(-1)" aria-label="Decrease Guests">
                  <span class="material-symbols-outlined" style="font-size: 20px;">remove</span>
                </button>
                <button type="button" class="stitch-stepper-btn" onclick="ScreenS03B.adjustGuests(1)" aria-label="Increase Guests">
                  <span class="material-symbols-outlined" style="font-size: 20px;">add</span>
                </button>
              </div>
            </div>

            <!-- Table & Seating Preference -->
            <div class="stitch-card" style="display: flex; flex-direction: column; gap: 10px; margin-bottom:0;">
              <span class="stitch-label" style="margin-bottom: 0;">${I18n.t('seating_table_pref_title')}</span>
              <div style="display: flex; gap: 6px; flex-wrap: wrap;" id="s03b-tags-container">
                ${tableTags.map(tag => {
                  const isSelected = selectedSeatTags.includes(tag.code);
                  const tagLabel = I18n.t(tag.key);
                  return `
                    <button type="button" data-tag-code="${tag.code}" onclick="ScreenS03B.togglePreferredTag('${tag.code}')" style="padding: 6px 14px; min-height: 36px; border-radius: 20px; font-size: 11.5px; font-weight: 600; border: 1.5px solid ${isSelected ? '#0B1220' : '#CBD5E1'}; background: ${isSelected ? '#0B1220' : '#FFFFFF'}; color: ${isSelected ? '#FFFFFF' : '#334155'}; cursor: pointer; transition: all 0.15s; display: inline-flex; align-items: center; justify-content: center;">
                      ${tagLabel}
                    </button>
                  `;
                }).join('')}
              </div>
              <div style="display: flex; flex-direction: column; gap: 4px; margin-top: 4px;">
                <label style="font-size: 12px; font-weight: 500; color: #46464f;">${I18n.t('assigned_table')}</label>
                <div id="s03b-table-select-container">
                  ${renderTableSelectHtml()}
                </div>
              </div>
            </div>

            <!-- SPECIAL REQUESTS / NOTES Card -->
            <div class="stitch-card" style="margin-bottom:0;">
              <span class="stitch-label">${I18n.t('special_requests_notes')}</span>
              <textarea id="new-book-notes" placeholder="${I18n.t('special_requests_placeholder')}" style="width: 100%; min-height: 64px; border: 1px solid #c7c5d0; border-radius: 10px; padding: 10px 12px; font-size: 13px; color: #1F2937; background: #f4f8fa; resize: none; outline: none;"></textarea>
            </div>
          </div>

        </div>

        <!-- Summary & Submit Footer -->
        <div class="s03b-modal-footer">
          <div class="s03b-summary-info">
            <span style="font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: #777680; display: block;">${I18n.t('booking_summary')}</span>
            <span style="font-size: 13.5px; color: #0F4C5C; font-weight: 700;" id="s03b-summary-text">${activeDateDisplay} • ${selectedTime} • ${guestCount} ${I18n.t('guests_unit')}</span>
          </div>
          <div class="s03b-footer-actions">
            <button type="button" id="s03b-btn-cancel" onclick="ScreenS03B.close()" class="btn btn-secondary s03b-footer-btn">
              <span class="material-symbols-outlined" style="font-size: 18px;">close</span>
              <span>${I18n.t('cancel')}</span>
            </button>
            <button type="submit" id="s03b-btn-submit" class="stitch-register-btn s03b-footer-btn">
              <span class="material-symbols-outlined" style="font-size: 18px;">check_circle</span>
              <span>${I18n.t('btn_register_booking')}</span>
            </button>
          </div>
        </div>

      </form>
      </div>
    `;

    modalElement.onclick = () => close();
    document.body.appendChild(modalElement);

    const form = document.getElementById('s03b-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        submitNewBooking(e, onSuccess);
      });
    }
  }

  function close() {
    if (modalElement) {
      modalElement.remove();
      modalElement = null;
    }
  }

  function setSource(type) {
    bookingSource = type;
    const btnPhone = document.getElementById('s03b-btn-phone');
    const btnWalkin = document.getElementById('s03b-btn-walkin');

    if (btnPhone && btnWalkin) {
      if (type === 'phone') {
        btnPhone.className = 'stitch-btn-active';
        btnWalkin.className = 'stitch-btn-inactive';
      } else {
        btnWalkin.className = 'stitch-btn-active';
        btnPhone.className = 'stitch-btn-inactive';
      }
    }
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

    const wrapper = document.getElementById('s03b-calendar-wrapper');
    if (wrapper) {
      wrapper.innerHTML = renderMonthCalendarHtml();
    }
  }

  function setSelectedDate(isoDate) {
    selectedIsoDate = isoDate;
    const activeDateDisplay = getFullDisplay(selectedIsoDate);
    const activeStatus = getDateStatus(selectedIsoDate);

    const wrapper = document.getElementById('s03b-calendar-wrapper');
    if (wrapper) {
      wrapper.innerHTML = renderMonthCalendarHtml();
    }

    const dateDisplay = document.getElementById('s03b-selected-date-display');
    if (dateDisplay) {
      dateDisplay.innerText = `${activeDateDisplay} • ${activeStatus.label}`;
    }

    updateSummary();
  }

  function setTimeSlot(time) {
    selectedTime = time;
    const timeContainer = document.getElementById('s03b-time-container');
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

  function adjustGuests(val) {
    guestCount = Math.max(1, Math.min(20, guestCount + val));
    const el = document.getElementById('s03b-guest-count');
    if (el) el.innerText = guestCount;
    refreshTableSelect();
    updateSummary();
  }

  function togglePreferredTag(tagCode) {
    const idx = selectedSeatTags.indexOf(tagCode);
    if (idx === -1) {
      selectedSeatTags.push(tagCode);
    } else {
      selectedSeatTags.splice(idx, 1);
    }
    
    const tagsContainer = document.getElementById('s03b-tags-container');
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

    refreshTableSelect();
    updateSummary();
  }

  function updateSummary() {
    const activeDateDisplay = getFullDisplay(selectedIsoDate);
    
    const summaryTextEl = document.getElementById('s03b-summary-text');
    if (summaryTextEl) {
      summaryTextEl.innerText = `${activeDateDisplay} • ${selectedTime} • ${guestCount} ${I18n.t('guests_unit')}`;
    }
  }

  function submitNewBooking(e, onSuccess) {
    e.preventDefault();
    const name = document.getElementById('new-book-name').value.trim();
    
    if (!Components.validatePhoneNumber('new-book-phone')) {
      showToast('error', I18n.t('validation_error', 'Validation Error'), I18n.t('phone_validation_msg'));
      return;
    }
    const phone = Components.getRawPhoneNumber('new-book-phone');
    const date = selectedIsoDate;
    const time = selectedTime;
    const guests = guestCount;
    const table = document.getElementById('new-book-table').value;
    const notes = document.getElementById('new-book-notes').value.trim();

    if (!name || !phone) {
      showToast('error', I18n.t('validation_error', 'Validation Error'), I18n.t('fill_required_fields'));
      return;
    }

    const isOffline = localStorage.getItem('s09_offline') === 'true';

    const newRes = {
      id: `SR-ENT-${date.replace(/-/g, '')}-${String(Math.floor(100 + Math.random() * 900)).padStart(3, '0')}`,
      name,
      phone,
      date,
      time,
      guests,
      table: table || 'Table 12',
      notes,
      preferred_seat_tags: [...selectedSeatTags],
      status: isOffline ? 'pending_sync' : 'confirmed',
      source: bookingSource,
      user_id: null,
      submittedAt: new Date().toISOString()
    };

    if (isOffline) {
      const queue = JSON.parse(localStorage.getItem('pending_bookings') || '[]');
      queue.unshift(newRes);
      localStorage.setItem('pending_bookings', JSON.stringify(queue));
      showToast('info', I18n.t('s03b_offline_queued_title'), I18n.t('s03b_offline_queued_msg'));
    } else {
      MockData.shopReservations.unshift(newRes);
      showToast('success', I18n.t('s03b_booking_confirmed_title'), I18n.t('s03b_booking_confirmed_msg', { id: newRes.id }));
    }

    if (onSuccess) onSuccess();
    close();
  }

  return { 
    render, 
    open, 
    close,
    setSource,
    changeMonth,
    setSelectedDate,
    setTimeSlot,
    adjustGuests,
    togglePreferredTag,
    clearSeatPreferences,
    refreshTableSelect,
    updateSummary
  };
})();

