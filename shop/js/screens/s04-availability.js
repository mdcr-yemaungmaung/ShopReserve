/* ============================================================
   EzBookNow Screen S-04 — Shop Availability Settings Screen
   Conforms strictly to Basic Design: docs/01_bd/EzBookNow_画面設計書.md §3.18
   4-Section Structure:
     - Regular Weekly Business Hours (shop_business_hours)
     - Special & Holiday Hours (shop_special_hours)
     - Slot Generation Settings (shops: slot_interval, duration, capacity)
     - Booking Rules (shops: booking_window, cutoff, min/max party)
   ============================================================ */

const ScreenS04 = (() => {
  let list = [];
  
  // Section: Special hours / temporary closures (shop_special_hours)
  let specialHours = [
    { id: 1, type: 'closed', name: 'Thingyan Water Festival Closure', start: '2026-04-13', end: '2026-04-17', open: '', close: '', lastOrder: '', note: 'Annual Water Festival Public Holiday' },
    { id: 2, type: 'special_hours', name: 'New Year Eve Special Dinner Hours', start: '2026-12-31', end: '2026-12-31', open: '17:00', close: '02:00', lastOrder: '01:00', note: 'Countdown event with special set menu' }
  ];

  // Section: Slot settings
  let slotIntervalMin = 60;       // 30 or 60 min
  let defaultDurationMin = 90;     // 30 to 480 min
  let slotCapacity = 36;          // guests capacity per slot (default active tables capacity sum)

  // Section: Booking rules
  let bookingWindowDays = 60;      // 1 to 180 days (default 60)
  let bookingCutoffMin = 60;       // min before arrival (default 60)
  let minPartySize = 1;            // min guests
  let maxPartySize = 10;           // max guests

  // Effective Date Management (適用開始日 / effective_from)
  let effectiveDateType = 'immediate'; // 'immediate' | 'specific'
  let effectiveDateVal = '2026-10-01';

  // Responsive Accordion Expansion States
  let expandedSections = {
    sec1: true,
    sec2: true,
    sec3: true,
    sec4: true
  };

  let initialized = false;

  function initData() {
    if (initialized) return;
    list = MockData.businessHours.map(item => ({
      ...item,
      hasSecondShift: false,
      secondOpen: '00:00',
      secondClose: '02:00',
      secondLastOrder: '01:30'
    }));

    if (MockData.tables && MockData.tables.length > 0) {
      slotCapacity = MockData.tables.reduce((sum, t) => sum + (t.seats || 2), 0);
    }
    initialized = true;
  }

  function render() {
    const lang = I18n.getLang();
    initData();

    const auth = Router.getAuth() || { role: 'shop_owner' };
    const isStaff = auth.role === 'shop_staff';

    // Business hours time logic check
    let timeRangeErrorMsg = '';
    for (let i = 0; i < list.length; i++) {
      const item = list[i];
      if (item.isOpen) {
        if (item.open >= item.close) {
          timeRangeErrorMsg = I18n.t('s04_time_logic_error');
          break;
        }
        if (item.hasSecondShift) {
          if (item.secondOpen >= item.secondClose) {
            timeRangeErrorMsg = I18n.t('s04_time_logic_error');
            break;
          }
        }
      }
    }

    const timeValidationAlertHtml = timeRangeErrorMsg ? `
      <div class="p-3 mb-4 flex items-center gap-2" style="background:var(--color-error-container); color:var(--color-on-error-container); border-radius:var(--radius-md, 8px); font-size:12.5px; border: 1.5px solid var(--color-error); line-height:1.5;">
        <span class="material-symbols-outlined" style="font-size:18px; color:var(--color-error);">error</span>
        <span>${timeRangeErrorMsg}</span>
      </div>
    ` : '';

    // Warnings and Debug controls
    const debugRoleBar = `
      <div class="card p-3 mb-4 flex justify-between items-center flex-wrap gap-3" style="background:var(--color-surface-container-low); border:1px dashed var(--color-outline-variant); border-radius:var(--radius-md, 8px);">
        <span style="font-size:13px; font-weight:600; color:var(--color-primary); display:flex; align-items:center; gap:6px;">
          <span class="material-symbols-outlined" style="font-size:18px;">science</span>
          ${I18n.t('s04_debug_role_bar')}
        </span>
        <div class="flex gap-2">
          <button type="button" class="${auth.role === 'shop_owner' ? 'stitch-btn-primary' : 'stitch-btn-secondary'}" onclick="ScreenS04.setTestRole('shop_owner')" style="min-height:36px; padding:6px 14px; font-size:12px;">${I18n.t('s04_role_owner')}</button>
          <button type="button" class="${auth.role === 'shop_staff' ? 'stitch-btn-primary' : 'stitch-btn-secondary'}" onclick="ScreenS04.setTestRole('shop_staff')" style="min-height:36px; padding:6px 14px; font-size:12px;">${I18n.t('s04_role_staff')}</button>
        </div>
      </div>
    `;

    const warningBanner = isStaff ? `
      <div class="p-3 mb-4 flex items-center gap-2" style="background:var(--color-error-container); color:var(--color-on-error-container); border:1px solid var(--color-error); border-radius:var(--radius-md, 8px); font-weight:600; font-size:13px;">
        <span class="material-symbols-outlined" style="font-size:20px;">info</span>
        <span>${I18n.t('s04_readonly_owner_warning')}</span>
      </div>
    ` : '';

    // ==========================================
    // Section 1: Regular Business Hours (shop_business_hours)
    // ==========================================
    const hourRows = list.map((item, idx) => {
      const dayLabel = I18n.t(item.day);
      
      // Calculate row-specific validation error
      let rowErrors = [];
      if (item.isOpen) {
        if (item.open >= item.close) {
          rowErrors.push(I18n.t('s04_row_error_open_close'));
        }
        if (item.lastOrder && (item.lastOrder < item.open || item.lastOrder > item.close)) {
          rowErrors.push(I18n.t('s04_row_error_lo'));
        }
        if (item.hasSecondShift) {
          if (item.secondOpen >= item.secondClose) {
            rowErrors.push(I18n.t('s04_row_error_shift2'));
          }
          if (item.secondLastOrder && (item.secondLastOrder < item.secondOpen || item.secondLastOrder > item.secondClose)) {
            rowErrors.push(I18n.t('s04_row_error_shift2_lo'));
          }
        }
      }
      const hasRowError = rowErrors.length > 0;

      return `
        <div class="flex flex-col py-3 ${hasRowError ? 'bg-error-container-low' : ''}" style="border-bottom:1px solid var(--color-outline-variant); padding:14px 8px; transition:background 0.15s; border-radius:var(--radius-md, 8px); ${hasRowError ? 'border-left:3px solid var(--color-error); background:rgba(186,26,26,0.04);' : ''}">
          <div class="availability-row flex items-center justify-between flex-wrap gap-3">
            <div class="availability-row-header" style="min-width:130px; display:flex; flex-direction:column; gap:4px;">
              <span style="font-weight:700; color:var(--color-primary); font-size:15px; font-family:var(--font-heading, 'Outfit', sans-serif);">${dayLabel}</span>
              ${item.isOpen ? `
                <span class="stitch-badge--seated" style="font-size:12px; width:fit-content;">
                  <span class="material-symbols-outlined" style="font-size:14px;">schedule</span>
                  ${item.open || '--:--'} - ${item.close || '--:--'}
                </span>
              ` : `
                <span class="stitch-badge--completed" style="font-size:11.5px; width:fit-content;">
                  ${I18n.t('s04_closed_status')}
                </span>
              `}
            </div>
            
            <!-- Shift 1 Inputs -->
            <div class="availability-time-group flex items-center gap-3 flex-wrap">
              <div class="availability-time-group__inputs flex items-center gap-2">
                <input type="time" class="form-input" id="open-${idx}" style="min-width:110px; height:38px; font-size:15px; font-weight:700; color:var(--color-primary); background:var(--color-surface); border:1.5px solid ${item.isOpen && item.open >= item.close ? 'var(--color-error)' : 'var(--color-outline-variant)'}; text-align:center; padding:0 8px;" value="${item.open}" ${item.isOpen && !isStaff ? '' : 'disabled'} onchange="ScreenS04.updateTime(${idx}, 'open', this.value)">
                <span style="font-size:13px; font-weight:600; color:var(--color-on-surface-variant);">${I18n.t('s04_to')}</span>
                <input type="time" class="form-input" id="close-${idx}" style="min-width:110px; height:38px; font-size:15px; font-weight:700; color:var(--color-primary); background:var(--color-surface); border:1.5px solid ${item.isOpen && item.open >= item.close ? 'var(--color-error)' : 'var(--color-outline-variant)'}; text-align:center; padding:0 8px;" value="${item.close}" ${item.isOpen && !isStaff ? '' : 'disabled'} onchange="ScreenS04.updateTime(${idx}, 'close', this.value)">
              </div>
              <div class="availability-time-group__lo flex items-center gap-1.5">
                <span style="color:var(--color-primary); font-size:12px; font-weight:700;">${I18n.t('s04_lo_prefix')}</span>
                <input type="time" class="form-input" id="lo-${idx}" style="min-width:110px; height:38px; font-size:15px; font-weight:700; color:var(--color-primary); background:var(--color-surface); border:1.5px solid ${item.isOpen && item.lastOrder && (item.lastOrder < item.open || item.lastOrder > item.close) ? 'var(--color-error)' : 'var(--color-outline-variant)'}; text-align:center; padding:0 8px;" value="${item.lastOrder}" ${item.isOpen && !isStaff ? '' : 'disabled'} onchange="ScreenS04.updateTime(${idx}, 'lastOrder', this.value)" title="${I18n.t('s04_lo_footnote')}">
              </div>
            </div>

            <!-- Toggles, copy button and splits -->
            <div class="availability-row-actions flex items-center gap-2.5">
              ${item.isOpen && !isStaff ? `
                <button type="button" class="stitch-btn-secondary" onclick="ScreenS04.openCopyModal(${idx})" title="Copy ${dayLabel}'s hours" style="min-height:36px; padding:6px 10px; font-size:12px; gap:4px;">
                  <span class="material-symbols-outlined" style="font-size:16px;">content_copy</span>
                  <span>${I18n.t('copy')}</span>
                </button>
                <button type="button" class="stitch-btn-secondary" onclick="ScreenS04.toggleSecondShift(${idx})" style="min-height:36px; padding:6px 10px; font-size:12px; gap:4px;">
                  <span class="material-symbols-outlined" style="font-size:16px;">${item.hasSecondShift ? 'close' : 'add'}</span>
                  <span>${item.hasSecondShift ? I18n.t('s04_remove_split_btn') : I18n.t('s04_split_shift_btn')}</span>
                </button>
              ` : ''}
              <label class="toggle">
                <input type="checkbox" ${item.isOpen ? 'checked' : ''} ${isStaff ? 'disabled' : ''} onchange="ScreenS04.toggleDay('${item.day}')">
                <span class="toggle__slider"></span>
              </label>
            </div>
          </div>

          <!-- Secondary Shift Row for mid-day break or midnight crossings -->
          ${item.isOpen && item.hasSecondShift ? `
            <div class="flex items-center gap-4 justify-between mt-2.5 p-3" style="border-radius:var(--radius-md, 8px); font-size:13px; margin-left:8px; border: 1.5px dashed var(--color-outline-variant); flex-wrap:wrap; background:var(--color-surface-container-low);">
              <div style="font-weight:700; color:var(--color-primary); display:flex; align-items:center; gap:6px;">
                <span class="material-symbols-outlined" style="font-size:18px;">bedtime</span>
                <span>${I18n.t('s04_break_time_badge')}</span>
              </div>
              <div class="availability-time-group flex items-center gap-3" style="flex:1;">
                <div class="availability-time-group__inputs flex items-center gap-2">
                  <input type="time" class="form-input" style="min-width:110px; height:38px; font-size:15px; font-weight:700; color:var(--color-primary); background:var(--color-surface); border:1.5px solid ${item.secondOpen >= item.secondClose ? 'var(--color-error)' : 'var(--color-outline-variant)'}; text-align:center; padding:0 8px;" value="${item.secondOpen}" ${isStaff ? 'disabled' : ''} onchange="ScreenS04.updateSecondTime(${idx}, 'secondOpen', this.value)">
                  <span style="font-size:13px; font-weight:600; color:var(--color-on-surface-variant);">${I18n.t('s04_to')}</span>
                  <input type="time" class="form-input" style="min-width:110px; height:38px; font-size:15px; font-weight:700; color:var(--color-primary); background:var(--color-surface); border:1.5px solid ${item.secondOpen >= item.secondClose ? 'var(--color-error)' : 'var(--color-outline-variant)'}; text-align:center; padding:0 8px;" value="${item.secondClose}" ${isStaff ? 'disabled' : ''} onchange="ScreenS04.updateSecondTime(${idx}, 'secondClose', this.value)">
                </div>
                <div class="availability-time-group__lo flex items-center gap-1.5">
                  <span style="color:var(--color-primary); font-size:12px; font-weight:700;">${I18n.t('s04_lo_prefix')}</span>
                  <input type="time" class="form-input" style="min-width:110px; height:38px; font-size:15px; font-weight:700; color:var(--color-primary); background:var(--color-surface); border:1.5px solid ${item.secondLastOrder && (item.secondLastOrder < item.secondOpen || item.secondLastOrder > item.secondClose) ? 'var(--color-error)' : 'var(--color-outline-variant)'}; text-align:center; padding:0 8px;" value="${item.secondLastOrder}" ${isStaff ? 'disabled' : ''} onchange="ScreenS04.updateSecondTime(${idx}, 'secondLastOrder', this.value)">
                </div>
              </div>
              <div style="font-size:11.5px; color:var(--color-on-surface-variant); font-style:italic;">${I18n.t('s04_break_time_hint')}</div>
            </div>
          ` : ''}

          <!-- Inline row validation error message -->
          ${hasRowError ? `
            <div style="font-size:11.5px; color:var(--color-error); margin-top:6px; font-weight:600; display:flex; align-items:center; gap:4px; padding-left:4px;">
              <span class="material-symbols-outlined" style="font-size:16px;">warning</span>
              <span>${rowErrors.join(' • ')}</span>
            </div>
          ` : ''}
        </div>
      `;
    }).join('');

    // Effective Date Card inside Section 1
    const effectiveDateCardHtml = `
      <div class="s04-effective-card mb-3">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
          <span style="font-weight:700; font-size:13px; color:var(--color-primary); display:flex; align-items:center; gap:6px;">
            <span class="material-symbols-outlined" style="font-size:18px;">event_repeat</span>
            ${I18n.t('s04_effective_label')}
          </span>
          <span style="font-size:11.5px; color:var(--color-on-surface-variant); font-style:italic;">
            ${I18n.t('s04_effective_hint')}
          </span>
        </div>
        <div class="s04-effective-options">
          <label class="s04-effective-radio-label">
            <input type="radio" name="s04-effective-type" value="immediate" ${effectiveDateType === 'immediate' ? 'checked' : ''} ${isStaff ? 'disabled' : ''} onchange="ScreenS04.setEffectiveType('immediate')">
            <span>${I18n.t('s04_effective_immediate')}</span>
          </label>
          <label class="s04-effective-radio-label">
            <input type="radio" name="s04-effective-type" value="specific" ${effectiveDateType === 'specific' ? 'checked' : ''} ${isStaff ? 'disabled' : ''} onchange="ScreenS04.setEffectiveType('specific')">
            <span>${I18n.t('s04_effective_specific')}</span>
          </label>
          ${effectiveDateType === 'specific' ? `
            <input type="date" class="form-input" style="height:34px; font-size:12.5px; width:150px; font-weight:600;" value="${effectiveDateVal}" ${isStaff ? 'disabled' : ''} onchange="ScreenS04.setEffectiveDate(this.value)">
          ` : ''}
        </div>
      </div>
    `;

    // ==========================================
    // Section 2: Special & Holiday Hours (shop_special_hours)
    // ==========================================
    const specialHoursContent = `
      <div class="flex justify-between items-center mb-3 flex-wrap gap-2">
        <span style="font-size:12px; color:var(--color-outline);">
          ${I18n.t('s04_holiday_advance_note')}
        </span>
        ${isStaff ? '' : `<button type="button" class="stitch-btn-secondary" style="min-height:36px; padding:6px 14px; font-size:12px;" onclick="ScreenS04.addSpecialHourModal()"><span class="material-symbols-outlined" style="font-size:16px;">add</span> ${I18n.t('s04_add_exception_btn')}</button>`}
      </div>

      <div class="flex flex-col gap-3">
        ${specialHours.length === 0 ? `
          <div style="font-size:12px; color:var(--color-outline); padding:16px; text-align:center; background:var(--color-surface-container); border-radius:var(--radius-md, 8px);">
            ${I18n.t('s04_no_special_hours')}
          </div>
        ` : specialHours.map(h => `
          <div class="flex justify-between items-start p-3 ${h.type === 'closed' ? 'bg-error-container text-on-error-container' : 'bg-surface-container-high'}" style="border-radius:var(--radius-md, 8px); font-size:12.5px; border:1px solid ${h.type === 'closed' ? 'var(--color-error)' : 'var(--color-outline-variant)'};">
            <div>
              <div style="display:flex; align-items:center; gap:6px;">
                <strong style="font-weight:700;">${h.name}</strong>
                ${h.type === 'closed' ? `
                  <span class="stitch-badge--cancelled" style="font-size:11px;">
                    ${I18n.t('s04_temp_closure')}
                  </span>
                ` : `
                  <span class="stitch-badge--seated" style="font-size:11px;">
                    ${I18n.t('s04_special_hours_badge')}
                  </span>
                `}
              </div>
              <div style="font-size:11.5px; margin-top:3px; opacity:0.9; display:flex; align-items:center; gap:4px; flex-wrap:wrap;">
                <span class="material-symbols-outlined" style="font-size:14px;">calendar_today</span>
                <strong>${h.start}</strong> ${h.start !== h.end ? `${I18n.t('s04_to')} <strong>${h.end}</strong>` : ''}
                ${h.type === 'special_hours' ? ` • <span class="material-symbols-outlined" style="font-size:14px;">schedule</span> ${h.open} - ${h.close} (${I18n.t('s04_lo_prefix')} ${h.lastOrder})` : ''}
              </div>
              ${h.note ? `<div style="font-size:11px; margin-top:2px; font-style:italic; opacity:0.8;">Note: ${h.note}</div>` : ''}
            </div>
            ${isStaff ? '' : `<button type="button" class="stitch-btn-danger" style="min-height:32px; padding:4px 8px; font-size:12px;" onclick="ScreenS04.deleteSpecialHour(${h.id})"><span class="material-symbols-outlined" style="font-size:16px;">delete</span></button>`}
          </div>
        `).join('')}
      </div>
    `;

    // ==========================================
    // Section 3: Slot Settings (shops: slot_interval, duration, capacity)
    // ==========================================
    const previewSlots = [];
    const openH = 11;
    const closeH = 22;
    for (let h = openH; h < closeH; h += (slotIntervalMin / 60)) {
      const hFloor = Math.floor(h);
      const m = (h % 1) * 60;
      const startStr = `${String(hFloor).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
      const endH = Math.floor(h + (slotIntervalMin / 60));
      const endM = ((h + (slotIntervalMin / 60)) % 1) * 60;
      const endStr = `${String(endH).padStart(2, '0')}:${String(endM).padStart(2, '0')}`;
      previewSlots.push(`${startStr}-${endStr}`);
    }

    const slotConfigContent = `
      <div class="grid grid-3 gap-4 mb-3" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr));">
        <!-- Slot Interval -->
        <div class="form-group mb-0">
          <label class="form-label" style="font-size:12px; font-weight:600;">
            ${I18n.t('s04_slot_interval_label')}<span class="required">*</span>
          </label>
          <select class="form-input" style="height:38px; font-size:13px;" ${isStaff ? 'disabled' : ''} onchange="ScreenS04.updateSlotInterval(this.value)">
            <option value="30" ${slotIntervalMin === 30 ? 'selected' : ''}>30 ${I18n.t('s04_minutes')}</option>
            <option value="60" ${slotIntervalMin === 60 ? 'selected' : ''}>60 ${I18n.t('s04_minutes')}</option>
          </select>
          <span class="form-hint" style="font-size:10.5px;">${I18n.t('s04_slot_interval_hint', { min: slotIntervalMin })}</span>
        </div>

        <!-- Default Duration -->
        <div class="form-group mb-0">
          <label class="form-label" style="font-size:12px; font-weight:600;">
            ${I18n.t('s04_default_duration_label')}<span class="required">*</span>
          </label>
          <div class="flex items-center gap-2">
            <input type="number" class="form-input" style="height:38px; font-size:13px; width:100px;" min="30" max="480" step="15" value="${defaultDurationMin}" ${isStaff ? 'disabled' : ''} onchange="ScreenS04.updateDuration(this.value)">
            <span style="font-size:12px; color:var(--color-outline);">${I18n.t('s04_minutes')}</span>
          </div>
          <span class="form-hint" style="font-size:10.5px;">${I18n.t('s04_default_duration_hint')}</span>
        </div>

        <!-- Slot Capacity -->
        <div class="form-group mb-0">
          <label class="form-label" style="font-size:12px; font-weight:600;">
            ${I18n.t('s04_capacity_label')}<span class="required">*</span>
          </label>
          <div class="flex items-center gap-2">
            <div class="number-stepper">
              <button type="button" class="number-stepper__btn" ${isStaff ? 'disabled' : ''} onclick="ScreenS04.adjustSeats(-2)"><span class="material-symbols-outlined" style="font-size:14px;">remove</span></button>
              <span class="number-stepper__value" style="font-size:13px; font-weight:700;">${slotCapacity}</span>
              <button type="button" class="number-stepper__btn" ${isStaff ? 'disabled' : ''} onclick="ScreenS04.adjustSeats(2)"><span class="material-symbols-outlined" style="font-size:14px;">add</span></button>
            </div>
            <span style="font-size:12px; color:var(--color-outline);">${I18n.t('s04_guests')}</span>
          </div>
          <span class="form-hint" style="font-size:10.5px;">${I18n.t('s04_capacity_hint')}</span>
        </div>
      </div>

      <!-- Generation Preview -->
      <div class="p-3 bg-surface-container flex flex-col gap-2" style="border-radius:var(--radius-md, 8px); border:1px solid var(--color-outline-variant);">
        <div style="font-size:12px; font-weight:700; color:var(--color-primary); display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:6px;">
          <span style="display:flex; align-items:center; gap:6px;">
            <span class="material-symbols-outlined" style="font-size:18px;">visibility</span>
            ${I18n.t('s04_slot_schedule_preview')}
          </span>
          <span class="stitch-badge--seated" style="font-size:11px;">${I18n.t('s04_slots_per_day', { count: previewSlots.length, capacity: slotCapacity })}</span>
        </div>
        <div style="font-size:11.5px; color:var(--color-on-surface-variant); line-height:1.5;">
          ${I18n.t('s04_preview_daily_example')}<br>
          <strong>${previewSlots.slice(0, 6).join(' • ')} ... ${I18n.t('s04_total_slots_suffix', { count: previewSlots.length })}</strong>
        </div>
      </div>
    `;

    // ==========================================
    // Section 4: Booking Acceptance Rules (shops: booking_window, cutoff, min/max party)
    // ==========================================
    const bookingRulesContent = `
      <div class="grid grid-4 gap-4" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr));">
        <!-- Booking Window Days -->
        <div class="form-group mb-0">
          <label class="form-label" style="font-size:12px; font-weight:600;">
            ${I18n.t('s04_booking_window_label')}<span class="required">*</span>
          </label>
          <div class="flex items-center gap-2">
            <input type="number" class="form-input" style="height:38px; font-size:13px; width:90px;" min="1" max="180" value="${bookingWindowDays}" ${isStaff ? 'disabled' : ''} onchange="ScreenS04.updateRule('bookingWindowDays', this.value)">
            <span style="font-size:12px; color:var(--color-outline);">${I18n.t('s04_days_ahead')}</span>
          </div>
          <span class="form-hint" style="font-size:10.5px;">${I18n.t('s04_booking_window_hint', { days: bookingWindowDays })}</span>
        </div>

        <!-- Cutoff Minutes -->
        <div class="form-group mb-0">
          <label class="form-label" style="font-size:12px; font-weight:600;">
            ${I18n.t('s04_cutoff_label')}<span class="required">*</span>
          </label>
          <div class="flex items-center gap-2">
            <input type="number" class="form-input" style="height:38px; font-size:13px; width:90px;" min="0" max="1440" step="15" value="${bookingCutoffMin}" ${isStaff ? 'disabled' : ''} onchange="ScreenS04.updateRule('bookingCutoffMin', this.value)">
            <span style="font-size:12px; color:var(--color-outline);">${I18n.t('s04_minutes_before')}</span>
          </div>
          <span class="form-hint" style="font-size:10.5px;">${I18n.t('s04_cutoff_hint', { min: bookingCutoffMin })}</span>
        </div>

        <!-- Min Party Size -->
        <div class="form-group mb-0">
          <label class="form-label" style="font-size:12px; font-weight:600;">
            ${I18n.t('s04_min_party_label')}<span class="required">*</span>
          </label>
          <div class="flex items-center gap-2">
            <input type="number" class="form-input" style="height:38px; font-size:13px; width:80px;" min="1" max="20" value="${minPartySize}" ${isStaff ? 'disabled' : ''} onchange="ScreenS04.updateRule('minPartySize', this.value)">
            <span style="font-size:12px; color:var(--color-outline);">${I18n.t('s04_guests')}</span>
          </div>
          <span class="form-hint" style="font-size:10.5px;">${I18n.t('s04_min_party_hint')}</span>
        </div>

        <!-- Max Party Size -->
        <div class="form-group mb-0">
          <label class="form-label" style="font-size:12px; font-weight:600;">
            ${I18n.t('s04_max_party_label')}<span class="required">*</span>
          </label>
          <div class="flex items-center gap-2">
            <input type="number" class="form-input" style="height:38px; font-size:13px; width:80px;" min="${minPartySize}" max="100" value="${maxPartySize}" ${isStaff ? 'disabled' : ''} onchange="ScreenS04.updateRule('maxPartySize', this.value)">
            <span style="font-size:12px; color:var(--color-outline);">${I18n.t('s04_guests')}</span>
          </div>
          <span class="form-hint" style="font-size:10.5px;">${I18n.t('s04_max_party_hint')}</span>
        </div>
      </div>
    `;

    // BAT-26 & Zero Cancellation Policy Card
    const batProtectionCard = `
      <div class="s04-protection-card">
        <div style="font-weight:700; font-size:13.5px; display:flex; align-items:center; gap:8px;">
          <span class="material-symbols-outlined" style="font-size:20px; color:var(--color-status-confirmed);">published_with_changes</span>
          ${I18n.t('s04_bat26_title')}
        </div>
        <div style="font-size:12.5px;">
          ${I18n.t('s04_bat26_desc')}
        </div>
        <div style="font-size:12px; font-weight:600; padding:8px 12px; background:rgba(22,101,52,0.08); border-radius:6px; margin-top:4px; display:flex; align-items:center; gap:6px;">
          <span class="material-symbols-outlined" style="font-size:16px; color:var(--color-status-confirmed);">verified_user</span>
          <span>${I18n.t('s04_existing_booking_protect')}</span>
        </div>
        <div class="flex items-center justify-between mt-1 flex-wrap gap-2">
          <span style="font-size:12px; font-weight:600; color:var(--color-status-confirmed); display:flex; align-items:center; gap:6px;">
            <span class="material-symbols-outlined" style="font-size:16px;">check_circle</span>
            BAT-26 Integrated • 60-Day Slot Synchronization
          </span>
          ${isStaff ? '' : `<button type="button" class="stitch-btn-secondary" onclick="ScreenS04.triggerBatch()" style="min-height:36px; padding:6px 14px; font-size:12px;"><span class="material-symbols-outlined" style="font-size:16px;">play_arrow</span> ${I18n.t('s04_simulate_bat_btn')}</button>`}
        </div>
      </div>
    `;

    const saveDisabledAttr = (isStaff || timeRangeErrorMsg) ? 'disabled' : '';

    // Overall Page Layout
    const content = `
      ${debugRoleBar}
      ${warningBanner}
      ${Components.pageHeader(I18n.t('s04_title'), I18n.t('s04_subtitle'))}

      <div style="display:flex; flex-direction:column; gap:20px; max-width:1080px; margin:0 auto;">
        
        <!-- Accordion Quick Toggle Toolbar -->
        <div class="flex justify-between items-center flex-wrap gap-2 px-1">
          <span style="font-size:12.5px; font-weight:600; color:var(--color-primary); display:flex; align-items:center; gap:6px;">
            <span class="material-symbols-outlined" style="font-size:18px;">tune</span>
            ${I18n.t('s04_master_sections_count')}
          </span>
          <div class="flex gap-2">
            <button type="button" class="stitch-btn-secondary" onclick="ScreenS04.toggleAllSections(true)" style="min-height:36px; font-size:12px; padding:4px 12px;">
              ${I18n.t('s04_accordion_expand_all')}
            </button>
            <button type="button" class="stitch-btn-secondary" onclick="ScreenS04.toggleAllSections(false)" style="min-height:36px; font-size:12px; padding:4px 12px;">
              ${I18n.t('s04_accordion_collapse_all')}
            </button>
          </div>
        </div>

        <!-- Section 1: Business Hours Accordion Card -->
        <div class="s04-accordion-item ${expandedSections.sec1 ? 'is-expanded' : ''}">
          <button type="button" class="s04-accordion-header" onclick="ScreenS04.toggleSection('sec1')">
            <div class="s04-accordion-header__title-wrap">
              <span class="s04-accordion-header__badge">1</span>
              <div class="s04-accordion-header__text">
                <h3 class="s04-accordion-header__title">${I18n.t('s04_sec1_title')}</h3>
                <span class="s04-accordion-header__desc">${I18n.t('s04_sec1_desc')}</span>
              </div>
            </div>
            <span class="material-symbols-outlined s04-accordion-header__chevron">expand_more</span>
          </button>
          <div class="s04-accordion-body">
            ${effectiveDateCardHtml}
            <div class="flex justify-between items-center flex-wrap gap-2 mb-3 pb-2" style="border-bottom:1px solid var(--color-surface-container);">
              <span style="font-size:11px; color:var(--color-outline);">${I18n.t('s04_lo_footnote')}</span>
              ${isStaff ? '' : `
                <button type="button" class="stitch-btn-secondary" onclick="ScreenS04.openCopyModal(0)" style="min-height:36px; font-size:12px; font-weight:600; padding:5px 12px; display:inline-flex; align-items:center; gap:6px;">
                  <span class="material-symbols-outlined" style="font-size:16px;">content_copy</span>
                  ${I18n.t('s04_copy_hours_btn')}
                </button>
              `}
            </div>
            ${timeValidationAlertHtml}
            <div class="flex flex-col">
              ${hourRows}
            </div>
          </div>
        </div>

        <!-- Section 2: Special & Holiday Hours Accordion Card -->
        <div class="s04-accordion-item ${expandedSections.sec2 ? 'is-expanded' : ''}">
          <button type="button" class="s04-accordion-header" onclick="ScreenS04.toggleSection('sec2')">
            <div class="s04-accordion-header__title-wrap">
              <span class="s04-accordion-header__badge">2</span>
              <div class="s04-accordion-header__text">
                <h3 class="s04-accordion-header__title">${I18n.t('s04_sec2_title')}</h3>
                <span class="s04-accordion-header__desc">${I18n.t('s04_sec2_desc')}</span>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <span class="stitch-badge--completed" style="font-size:11px;">${specialHours.length}</span>
              <span class="material-symbols-outlined s04-accordion-header__chevron">expand_more</span>
            </div>
          </button>
          <div class="s04-accordion-body">
            ${specialHoursContent}
          </div>
        </div>

        <!-- Section 3: Slot Settings Accordion Card -->
        <div class="s04-accordion-item ${expandedSections.sec3 ? 'is-expanded' : ''}">
          <button type="button" class="s04-accordion-header" onclick="ScreenS04.toggleSection('sec3')">
            <div class="s04-accordion-header__title-wrap">
              <span class="s04-accordion-header__badge">3</span>
              <div class="s04-accordion-header__text">
                <h3 class="s04-accordion-header__title">${I18n.t('s04_sec3_title')}</h3>
                <span class="s04-accordion-header__desc">${I18n.t('s04_sec3_desc')}</span>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <span class="stitch-badge--seated" style="font-size:11px;">${slotIntervalMin}m / ${slotCapacity}p</span>
              <span class="material-symbols-outlined s04-accordion-header__chevron">expand_more</span>
            </div>
          </button>
          <div class="s04-accordion-body">
            ${slotConfigContent}
          </div>
        </div>

        <!-- Section 4: Booking Acceptance Rules Accordion Card -->
        <div class="s04-accordion-item ${expandedSections.sec4 ? 'is-expanded' : ''}">
          <button type="button" class="s04-accordion-header" onclick="ScreenS04.toggleSection('sec4')">
            <div class="s04-accordion-header__title-wrap">
              <span class="s04-accordion-header__badge">4</span>
              <div class="s04-accordion-header__text">
                <h3 class="s04-accordion-header__title">${I18n.t('s04_sec4_title')}</h3>
                <span class="s04-accordion-header__desc">${I18n.t('s04_sec4_desc')}</span>
              </div>
            </div>
            <div class="flex items-center gap-2">
              <span class="stitch-badge--completed" style="font-size:11px;">${bookingWindowDays}d</span>
              <span class="material-symbols-outlined s04-accordion-header__chevron">expand_more</span>
            </div>
          </button>
          <div class="s04-accordion-body">
            ${bookingRulesContent}
          </div>
        </div>

        <!-- BAT-26 Recalculation & Zero-Cancellation Protection Card -->
        ${batProtectionCard}

        <!-- Global Save Actions Bar -->
        <div class="s04-save-bar p-4 flex justify-between items-center flex-wrap gap-4 mt-6">
          <div style="font-size:12.5px; color:var(--color-on-surface-variant); line-height:1.5;">
            ${isStaff ? I18n.t('s04_save_notice_readonly') : I18n.t('s04_save_notice')}
          </div>
          <div class="flex gap-3">
            <button type="button" class="stitch-btn-secondary" onclick="Router.navigate('/shop/dashboard')">${I18n.t('cancel')}</button>
            <button type="button" class="stitch-btn-primary" ${saveDisabledAttr} onclick="ScreenS04.saveSettings()">
              <span class="material-symbols-outlined" style="font-size:18px;">save</span>
              <span>${I18n.t('s04_save_all_btn')}</span>
            </button>
          </div>
        </div>

      </div>
    `;

    App.renderAdminPage('shop', 'Availability Settings', content);
  }

  function updateTime(idx, field, val) {
    if (list[idx]) {
      list[idx][field] = val;
      render();
    }
  }

  function updateSecondTime(idx, field, val) {
    if (list[idx]) {
      list[idx][field] = val;
      render();
    }
  }

  function toggleSecondShift(idx) {
    if (list[idx]) {
      list[idx].hasSecondShift = !list[idx].hasSecondShift;
      render();
    }
  }

  function toggleDay(day) {
    const item = list.find(h => h.day === day);
    if(item) {
      item.isOpen = !item.isOpen;
      render();
    }
  }

  function updateSlotInterval(val) {
    slotIntervalMin = parseInt(val, 10) || 60;
    render();
  }

  function updateDuration(val) {
    defaultDurationMin = Math.max(30, Math.min(480, parseInt(val, 10) || 90));
    render();
  }

  function adjustSeats(val) {
    slotCapacity = Math.max(1, slotCapacity + val);
    render();
  }

  function updateRule(key, val) {
    const num = parseInt(val, 10);
    if (key === 'bookingWindowDays') bookingWindowDays = Math.max(1, Math.min(180, num || 60));
    if (key === 'bookingCutoffMin') bookingCutoffMin = Math.max(0, num || 60);
    if (key === 'minPartySize') minPartySize = Math.max(1, num || 1);
    if (key === 'maxPartySize') maxPartySize = Math.max(minPartySize, num || 10);
    render();
  }

  // ==========================================
  // Copy Hours Modal & Logic (P1 UX Enhancement)
  // ==========================================
  function openCopyModal(defaultSourceIdx = 0) {
    const sourceIdx = Math.max(0, Math.min(list.length - 1, defaultSourceIdx));
    const sourceItem = list[sourceIdx];

    const modalHtml = `
      <div class="modal-backdrop" id="copy-hours-modal" onclick="if(event.target===this)this.remove()">
        <div class="modal animate-scale-in" style="max-width:520px; border-radius:var(--radius-lg, 14px); background:var(--color-surface);">
          <div class="modal__header">
            <div style="display:flex; align-items:center; gap:8px;">
              <span class="material-symbols-outlined" style="font-size:20px; color:var(--color-primary);">content_copy</span>
              <h3 class="modal__title">${I18n.t('s04_copy_modal_title')}</h3>
            </div>
            <button type="button" class="modal__close" onclick="document.getElementById('copy-hours-modal').remove()">
              <span class="material-symbols-outlined" style="font-size:20px;">close</span>
            </button>
          </div>

          <div class="modal__body flex flex-col gap-4">
            <div style="font-size:12.5px; color:var(--color-on-surface-variant); line-height:1.5;">
              ${I18n.t('s04_copy_modal_desc')}
            </div>

            <!-- Source Day Selection -->
            <div class="form-group mb-0">
              <label class="form-label" style="font-weight:700; font-size:12px; color:var(--color-primary);">
                ${I18n.t('s04_copy_source_label')}
              </label>
              <select class="form-input" id="copy-source-select" style="font-size:13px; font-weight:600; height:38px;" onchange="ScreenS04.onCopySourceChange(this.value)">
                ${list.map((d, idx) => `
                  <option value="${idx}" ${idx === sourceIdx ? 'selected' : ''}>
                    ${I18n.t(d.day)} (${d.isOpen ? `${d.open} - ${d.close} | LO: ${d.lastOrder}${d.hasSecondShift ? ` + Shift 2: ${d.secondOpen}-${d.secondClose}` : ''}` : 'Closed'})
                  </option>
                `).join('')}
              </select>
            </div>

            <!-- Source Preview Card -->
            <div id="copy-source-preview" class="p-3" style="border-radius:var(--radius-md, 8px); border:1px solid var(--color-outline-variant); font-size:12px; background:var(--color-surface-container-low);">
              <div style="font-weight:700; color:var(--color-primary); margin-bottom:4px; display:flex; align-items:center; gap:6px;">
                <span class="material-symbols-outlined" style="font-size:16px;">schedule</span>
                <span>Operating Schedule to Apply:</span>
              </div>
              <div id="copy-source-details" style="font-size:12.5px; color:var(--color-on-surface);">
                ${sourceItem.isOpen ? `
                  <span><strong>Shift 1:</strong> ${sourceItem.open} - ${sourceItem.close} (LO: ${sourceItem.lastOrder})</span>
                  ${sourceItem.hasSecondShift ? `<br><span style="color:var(--color-on-surface-variant);"><strong>Shift 2:</strong> ${sourceItem.secondOpen} - ${sourceItem.secondClose} (LO: ${sourceItem.secondLastOrder})</span>` : ''}
                ` : '<span style="color:var(--color-on-surface-variant); font-style:italic;">Closed (Sets target days to Closed status)</span>'}
              </div>
            </div>

            <!-- Target Days Selection -->
            <div class="form-group mb-0">
              <div class="flex justify-between items-center mb-2 flex-wrap gap-2">
                <label class="form-label mb-0" style="font-weight:700; font-size:12px; color:var(--color-primary);">
                  ${I18n.t('s04_copy_target_label')}
                </label>
                <!-- Quick Selection Buttons -->
                <div class="flex gap-1.5 flex-wrap">
                  <button type="button" class="stitch-btn-secondary" onclick="ScreenS04.selectCopyTargets('weekdays')" style="min-height:30px; font-size:11.5px; padding:3px 10px;">
                    ${I18n.t('s04_copy_quick_weekdays')}
                  </button>
                  <button type="button" class="stitch-btn-secondary" onclick="ScreenS04.selectCopyTargets('all')" style="min-height:30px; font-size:11.5px; padding:3px 10px;">
                    ${I18n.t('s04_copy_quick_all')}
                  </button>
                  <button type="button" class="stitch-btn-secondary" onclick="ScreenS04.selectCopyTargets('weekends')" style="min-height:30px; font-size:11.5px; padding:3px 10px;">
                    ${I18n.t('s04_copy_quick_weekends')}
                  </button>
                </div>
              </div>

              <!-- Day Checkboxes -->
              <div class="grid grid-2 gap-2" style="display:grid; grid-template-columns:repeat(auto-fill, minmax(130px, 1fr));">
                ${list.map((d, idx) => {
                  const isSource = idx === sourceIdx;
                  const isWeekday = idx >= 0 && idx <= 4;
                  const defaultChecked = !isSource && isWeekday;
                  return `
                    <label class="flex items-center gap-2 p-2" style="background:var(--color-surface-container-high); border-radius:var(--radius-md, 8px); cursor:pointer; font-size:12.5px; border:1px solid var(--color-outline-variant); user-select:none; ${isSource ? 'opacity:0.5;' : ''}">
                      <input type="checkbox" class="copy-target-checkbox" value="${idx}" ${defaultChecked ? 'checked' : ''} ${isSource ? 'disabled' : ''} onchange="ScreenS04.onTargetCheckChange()">
                      <span style="font-weight:600; ${isSource ? 'text-decoration:line-through;' : ''}">${I18n.t(d.day)}</span>
                      ${isSource ? '<span style="font-size:10px; color:var(--color-outline);">(Source)</span>' : ''}
                    </label>
                  `;
                }).join('')}
              </div>
            </div>
          </div>

          <div class="modal__footer flex justify-between items-center">
            <button type="button" class="stitch-btn-secondary" onclick="document.getElementById('copy-hours-modal').remove()">${I18n.t('cancel')}</button>
            <button type="button" class="stitch-btn-primary" onclick="ScreenS04.applyCopiedHours()">
              ${I18n.t('s04_copy_apply_btn')}
            </button>
          </div>
        </div>
      </div>
    `;

    const existing = document.getElementById('copy-hours-modal');
    if (existing) existing.remove();

    const div = document.createElement('div');
    div.innerHTML = modalHtml;
    document.body.appendChild(div.firstElementChild);
  }

  function onCopySourceChange(sourceIdxStr) {
    const sIdx = parseInt(sourceIdxStr, 10);
    const sourceItem = list[sIdx];
    const previewEl = document.getElementById('copy-source-details');
    if (previewEl && sourceItem) {
      if (sourceItem.isOpen) {
        previewEl.innerHTML = `
          <span><strong>Shift 1:</strong> ${sourceItem.open} - ${sourceItem.close} (LO: ${sourceItem.lastOrder})</span>
          ${sourceItem.hasSecondShift ? `<br><span style="color:var(--color-on-surface-variant);"><strong>Shift 2:</strong> ${sourceItem.secondOpen} - ${sourceItem.secondClose} (LO: ${sourceItem.secondLastOrder})</span>` : ''}
        `;
      } else {
        previewEl.innerHTML = `<span style="color:var(--color-on-surface-variant); font-style:italic;">Closed (Sets target days to Closed status)</span>`;
      }
    }

    // Refresh disabled state of checkboxes
    const checkboxes = document.querySelectorAll('.copy-target-checkbox');
    checkboxes.forEach(cb => {
      const idx = parseInt(cb.value, 10);
      const parentLabel = cb.closest('label');
      if (idx === sIdx) {
        cb.checked = false;
        cb.disabled = true;
        if (parentLabel) parentLabel.style.opacity = '0.5';
      } else {
        cb.disabled = false;
        if (parentLabel) parentLabel.style.opacity = '1';
      }
    });
  }

  function selectCopyTargets(type) {
    const sourceSelect = document.getElementById('copy-source-select');
    const sIdx = sourceSelect ? parseInt(sourceSelect.value, 10) : -1;
    const checkboxes = document.querySelectorAll('.copy-target-checkbox');

    checkboxes.forEach(cb => {
      const idx = parseInt(cb.value, 10);
      if (idx === sIdx) {
        cb.checked = false;
        return;
      }
      if (type === 'weekdays') {
        cb.checked = idx >= 0 && idx <= 4; // Mon-Fri
      } else if (type === 'all') {
        cb.checked = true;
      } else if (type === 'weekends') {
        cb.checked = idx === 5 || idx === 6; // Sat-Sun
      }
    });
  }

  function onTargetCheckChange() {
    // Keep UI responsive
  }

  function applyCopiedHours() {
    const sourceSelect = document.getElementById('copy-source-select');
    if (!sourceSelect) return;
    const sIdx = parseInt(sourceSelect.value, 10);
    const source = list[sIdx];
    if (!source) return;

    const checkedBoxes = document.querySelectorAll('.copy-target-checkbox:checked');
    const targetIndices = Array.from(checkedBoxes).map(cb => parseInt(cb.value, 10)).filter(idx => idx !== sIdx);

    if (targetIndices.length === 0) {
      showToast('error', 'Selection Required', I18n.t('s04_copy_no_target_err'));
      return;
    }

    targetIndices.forEach(idx => {
      if (list[idx]) {
        list[idx].isOpen = source.isOpen;
        list[idx].open = source.open;
        list[idx].close = source.close;
        list[idx].lastOrder = source.lastOrder;
        list[idx].hasSecondShift = !!source.hasSecondShift;
        list[idx].secondOpen = source.secondOpen || '00:00';
        list[idx].secondClose = source.secondClose || '02:00';
        list[idx].secondLastOrder = source.secondLastOrder || '01:30';
      }
    });

    const sourceName = I18n.t(source.day);
    showToast('success', 'Hours Applied', I18n.t('s04_copy_success', { source: sourceName, count: targetIndices.length }));

    const modal = document.getElementById('copy-hours-modal');
    if (modal) modal.remove();

    render();
  }

  function addSpecialHourModal() {
    const modalHtml = `
      <div class="modal-backdrop" id="special-hour-modal" onclick="if(event.target===this)this.remove()">
        <div class="modal animate-scale-in" style="max-width:480px; border-radius:var(--radius-lg, 14px); background:var(--color-surface);">
          <div class="modal__header">
            <div style="display:flex; align-items:center; gap:8px;">
              <span class="material-symbols-outlined" style="font-size:20px; color:var(--color-primary);">event_note</span>
              <h3 class="modal__title">${I18n.t('s04_add_exception_btn')}</h3>
            </div>
            <button type="button" class="modal__close" onclick="document.getElementById('special-hour-modal').remove()">
              <span class="material-symbols-outlined" style="font-size:20px;">close</span>
            </button>
          </div>
          <div class="modal__body flex flex-col gap-4">
            <div class="form-group mb-0">
              <label class="form-label" style="font-size:12px; font-weight:600;">Type<span class="required">*</span></label>
              <div class="flex gap-4">
                <label class="flex items-center gap-2" style="cursor:pointer; font-size:12.5px;">
                  <input type="radio" name="special-type" value="closed" checked onchange="document.getElementById('special-time-row').style.display='none'">
                  <span>${I18n.t('s04_temp_closure')}</span>
                </label>
                <label class="flex items-center gap-2" style="cursor:pointer; font-size:12.5px;">
                  <input type="radio" name="special-type" value="special_hours" onchange="document.getElementById('special-time-row').style.display='flex'">
                  <span>${I18n.t('s04_special_hours_badge')}</span>
                </label>
              </div>
            </div>

            <div class="form-group mb-0">
              <label class="form-label" style="font-size:12px; font-weight:600;">Reason / Occasion Name<span class="required">*</span></label>
              <input type="text" class="form-input" id="special-name" placeholder="E.g. Thingyan Holiday / Private Venue Event" maxlength="200" style="height:38px;">
            </div>

            <div class="form-row" style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
              <div class="form-group mb-0">
                <label class="form-label" style="font-size:12px; font-weight:600;">Start Date<span class="required">*</span></label>
                <input type="date" class="form-input" id="special-start" value="2026-08-01" style="height:38px;">
              </div>
              <div class="form-group mb-0">
                <label class="form-label" style="font-size:12px; font-weight:600;">End Date<span class="required">*</span></label>
                <input type="date" class="form-input" id="special-end" value="2026-08-01" style="height:38px;">
              </div>
            </div>

            <div id="special-time-row" class="form-row" style="display:none; gap:8px;">
              <div class="form-group mb-0" style="flex:1;">
                <label class="form-label" style="font-size:11px;">Open Time</label>
                <input type="time" class="form-input" id="special-open" value="12:00" style="height:38px;">
              </div>
              <div class="form-group mb-0" style="flex:1;">
                <label class="form-label" style="font-size:11px;">Close Time</label>
                <input type="time" class="form-input" id="special-close" value="23:00" style="height:38px;">
              </div>
              <div class="form-group mb-0" style="flex:1;">
                <label class="form-label" style="font-size:11px;">Last Order</label>
                <input type="time" class="form-input" id="special-lo" value="22:00" style="height:38px;">
              </div>
            </div>

            <div class="form-group mb-0">
              <label class="form-label" style="font-size:11.5px; font-weight:600;">Public Note (Displayed on U-03 Shop Detail)</label>
              <input type="text" class="form-input" id="special-note" placeholder="E.g. Closed for private wedding reception" style="height:38px;">
            </div>
          </div>
          <div class="modal__footer flex justify-between items-center">
            <button type="button" class="stitch-btn-secondary" onclick="document.getElementById('special-hour-modal').remove()">${I18n.t('cancel')}</button>
            <button type="button" class="stitch-btn-primary" onclick="ScreenS04.saveSpecialHour()">${I18n.t('create')}</button>
          </div>
        </div>
      </div>
    `;
    const div = document.createElement('div');
    div.innerHTML = modalHtml;
    document.body.appendChild(div.firstElementChild);
  }

  function saveSpecialHour() {
    const type = document.querySelector('input[name="special-type"]:checked').value;
    const name = document.getElementById('special-name').value.trim();
    const start = document.getElementById('special-start').value;
    const end = document.getElementById('special-end').value;
    const open = document.getElementById('special-open') ? document.getElementById('special-open').value : '';
    const close = document.getElementById('special-close') ? document.getElementById('special-close').value : '';
    const lastOrder = document.getElementById('special-lo') ? document.getElementById('special-lo').value : '';
    const note = document.getElementById('special-note') ? document.getElementById('special-note').value.trim() : '';

    if(!name || !start || !end) {
      showToast('error', 'Validation Error', 'Please fill all mandatory exception details.');
      return;
    }

    if (new Date(start) > new Date(end)) {
      showToast('error', 'Validation Error', 'Start date must be earlier than or equal to End date.');
      return;
    }

    specialHours.push({
      id: Date.now(),
      type,
      name,
      start,
      end,
      open,
      close,
      lastOrder,
      note
    });

    showToast('success', 'Exception Scheduled', `Special schedule "${name}" added.`);
    document.getElementById('special-hour-modal').remove();
    render();
  }

  function deleteSpecialHour(id) {
    specialHours = specialHours.filter(h => h.id !== id);
    showToast('success', 'Removed', 'Special schedule removed.');
    render();
  }

  function setTestRole(role) {
    Router.authState.shop.role = role;
    showToast('info', 'Permission Role Changed', `Current session role updated to ${role}.`);
    render();
  }

  function toggleSection(secKey) {
    if (expandedSections[secKey] !== undefined) {
      expandedSections[secKey] = !expandedSections[secKey];
      render();
    }
  }

  function toggleAllSections(expand) {
    expandedSections.sec1 = !!expand;
    expandedSections.sec2 = !!expand;
    expandedSections.sec3 = !!expand;
    expandedSections.sec4 = !!expand;
    render();
  }

  function setEffectiveType(type) {
    effectiveDateType = type;
    render();
  }

  function setEffectiveDate(val) {
    effectiveDateVal = val;
  }

  function triggerBatch() {
    const overlay = document.createElement('div');
    overlay.className = 'modal-backdrop flex items-center justify-center';
    overlay.style.zIndex = '9999999';
    overlay.innerHTML = `
      <div class="card p-6 flex flex-col items-center gap-4 text-center animate-scale-in" style="max-width:360px; border-radius:var(--radius-lg, 14px); background:var(--color-surface); border:1px solid var(--color-outline-variant);">
        <span class="material-symbols-outlined" style="font-size:36px; color:var(--color-primary); animation: spin 1.5s linear infinite;">settings</span>
        <div>
          <h4 style="font-weight:700; color:var(--color-primary); margin:0; font-family:var(--font-heading, 'Outfit', sans-serif); font-size:16px;">Executing BAT-03 & BAT-26</h4>
          <p style="font-size:12px; color:var(--color-on-surface-variant); margin-top:6px; line-height:1.5;">
            Auto-recalculating slots for the next <strong>${bookingWindowDays} days</strong> (${slotIntervalMin}-min intervals, ${slotCapacity} capacity/slot)...<br>
            <span style="color:var(--color-status-confirmed, #16a34a); font-weight:600;">Preserving 100% of existing bookings (zero cancellation policy).</span>
          </p>
        </div>
        <div style="width:100%; height:4px; background:var(--color-surface-container); border-radius:2px; overflow:hidden;">
          <div style="width:100%; height:100%; background:var(--color-primary); animation: progress-fill 1.8s ease-in-out forwards;"></div>
        </div>
      </div>
      <style>
        @keyframes spin { 100% { transform: rotate(360deg); } }
        @keyframes progress-fill { 0% { width: 0%; } 100% { width: 100%; } }
      </style>
    `;
    document.body.appendChild(overlay);

    setTimeout(() => {
      overlay.remove();
      showToast('success', 'Batch Completed', `BAT-26 completed: Slot schedules recalculated with 0 cancellations.`);
    }, 1800);
  }

  function saveSettings() {
    for (let i = 0; i < list.length; i++) {
      const item = list[i];
      if (item.isOpen) {
        if (item.open >= item.close) {
          showToast('error', 'Validation Error', `${I18n.t(item.day)}: Opening time must be earlier than closing time.`);
          return;
        }
        if (item.lastOrder < item.open || item.lastOrder > item.close) {
          showToast('error', 'Validation Error', `${I18n.t(item.day)}: Last Order must be within opening hours.`);
          return;
        }
        if (item.hasSecondShift) {
          if (item.secondOpen >= item.secondClose) {
            showToast('error', 'Validation Error', `${I18n.t(item.day)} Shift 2: Opening time must be earlier than closing time.`);
            return;
          }
        }
      }
    }

    if (slotCapacity < 1) {
      showToast('error', 'Validation Error', 'Capacity per slot must be at least 1.');
      return;
    }

    MockData.businessHours = list.map(item => ({
      day: item.day,
      open: item.open,
      close: item.close,
      lastOrder: item.lastOrder,
      isOpen: item.isOpen
    }));

    const effectiveNotice = effectiveDateType === 'specific' 
      ? `Changes scheduled to take effect on ${effectiveDateVal}.` 
      : 'Changes take effect immediately on upcoming slots.';

    showToast('success', 'Saved Successfully', `Settings saved. ${effectiveNotice}`);
    triggerBatch();
  }

  return { 
    render, 
    toggleDay, 
    updateTime, 
    updateSecondTime, 
    toggleSecondShift, 
    updateSlotInterval,
    updateDuration,
    adjustSeats, 
    updateRule,
    openCopyModal,
    onCopySourceChange,
    selectCopyTargets,
    onTargetCheckChange,
    applyCopiedHours,
    addSpecialHourModal, 
    saveSpecialHour, 
    deleteSpecialHour, 
    setTestRole, 
    toggleSection,
    toggleAllSections,
    setEffectiveType,
    setEffectiveDate,
    triggerBatch, 
    saveSettings 
  };
})();
