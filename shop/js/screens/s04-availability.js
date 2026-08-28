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
      <div class="p-3 bg-error-container text-on-error-container mb-4" style="border-radius: var(--radius-md); font-size:12.5px; border: 1.5px solid var(--color-error); line-height:1.4; font-family:'Inter', sans-serif;">
        ${timeRangeErrorMsg}
      </div>
    ` : '';

    // Warnings and Debug controls
    const debugRoleBar = `
      <div class="card p-3 mb-4 bg-surface-container-low flex justify-between items-center flex-wrap gap-3" style="border:1px dashed var(--color-outline-variant); border-radius:var(--radius-md);">
        <span style="font-size:13px; font-weight:600; color:var(--color-primary); display:flex; align-items:center; gap:6px;">
          🧪 Debug Testing: Toggle shop permissions (C-05)
        </span>
        <div class="flex gap-2">
          <button class="btn btn-sm ${auth.role === 'shop_owner' ? 'btn-primary' : 'btn-secondary'}" onclick="ScreenS04.setTestRole('shop_owner')" style="padding:4px 10px; font-size:12px;">Owner (Edit/Save)</button>
          <button class="btn btn-sm ${auth.role === 'shop_staff' ? 'btn-primary' : 'btn-secondary'}" onclick="ScreenS04.setTestRole('shop_staff')" style="padding:4px 10px; font-size:12px;">Staff (Read-Only)</button>
        </div>
      </div>
    `;

    const warningBanner = isStaff ? `
      <div class="p-3 mb-4 bg-error-container text-on-error-container flex items-center gap-2" style="border-radius:var(--radius-md); font-weight:600; font-size:13px;">
        ⚠️ ${lang === 'mm' ? 'ဖတ်ရှုရန်သာ: ဆိုင်ပိုင်ရှင် (Shop Owner) သာ အပြောင်းအလဲများ ပြုလုပ်သိမ်းဆည်းနိုင်ပါသည်။' : 'Read-Only Mode: Only the Shop Owner (shop_owner) can modify availability settings (C-05).'}
      </div>
    ` : '';

    // ==========================================
    // Section: Regular Business Hours (shop_business_hours)
    // ==========================================
    const hourRows = list.map((item, idx) => {
      const dayLabel = I18n.t(item.day);
      return `
        <div class="flex flex-col border-bottom py-3" style="border-bottom:1px solid rgba(15,76,92,0.12); padding:14px 8px; transition:background 0.15s; border-radius:8px;">
          <div class="availability-row flex items-center justify-between flex-wrap gap-3">
            <div style="min-width:130px; display:flex; flex-direction:column; gap:4px;">
              <span style="font-weight:700; color:var(--color-primary); font-size:15px; font-family:'Outfit', sans-serif;">${dayLabel}</span>
              ${item.isOpen ? `
                <span style="font-size:12px; font-weight:700; color:#0F4C5C; background:#d0e6ec; padding:2px 8px; border-radius:6px; display:inline-flex; align-items:center; gap:4px; width:fit-content; border:1px solid rgba(15,76,92,0.2);">
                  ⏰ ${item.open || '--:--'} - ${item.close || '--:--'}
                </span>
              ` : `
                <span style="font-size:11.5px; font-weight:600; color:#777680; background:#edf2f5; padding:2px 8px; border-radius:6px; width:fit-content;">
                  Closed
                </span>
              `}
            </div>
            
            <!-- Shift 1 Inputs -->
            <div class="availability-time-group flex items-center gap-3 flex-wrap">
              <div class="flex items-center gap-2">
                <input type="time" class="form-input" id="open-${idx}" style="width:130px; height:38px; font-size:15px; font-weight:700; color:#0F4C5C; background:#f4f8fa; border:1.5px solid rgba(15,76,92,0.25); text-align:center; padding:0 8px;" value="${item.open}" ${item.isOpen && !isStaff ? '' : 'disabled'} onchange="ScreenS04.updateTime(${idx}, 'open', this.value)">
                <span style="font-size:13px; font-weight:600; color:#46464f;">to</span>
                <input type="time" class="form-input" id="close-${idx}" style="width:130px; height:38px; font-size:15px; font-weight:700; color:#0F4C5C; background:#f4f8fa; border:1.5px solid rgba(15,76,92,0.25); text-align:center; padding:0 8px;" value="${item.close}" ${item.isOpen && !isStaff ? '' : 'disabled'} onchange="ScreenS04.updateTime(${idx}, 'close', this.value)">
              </div>
              <div class="flex items-center gap-1.5">
                <span style="color:#0F4C5C; font-size:12px; font-weight:700;">LO:</span>
                <input type="time" class="form-input" id="lo-${idx}" style="width:130px; height:38px; font-size:15px; font-weight:700; color:#0F4C5C; background:#f4f8fa; border:1.5px solid rgba(15,76,92,0.25); text-align:center; padding:0 8px;" value="${item.lastOrder}" ${item.isOpen && !isStaff ? '' : 'disabled'} onchange="ScreenS04.updateTime(${idx}, 'lastOrder', this.value)" title="Last Order">
              </div>
            </div>

            <!-- Toggles and splits -->
            <div class="flex items-center gap-3">
              ${item.isOpen && !isStaff ? `
                <button class="btn btn-ghost btn-sm" onclick="ScreenS04.toggleSecondShift(${idx})" style="padding:6px 10px; font-size:12px; font-weight:600; color:#0F4C5C; background:#f4f8fa; border:1px solid rgba(15,76,92,0.15); border-radius:6px;">
                  ${item.hasSecondShift ? '✕ Remove Split' : '➕ Split Shift'}
                </button>
              ` : ''}
              <label class="toggle">
                <input type="checkbox" ${item.isOpen ? 'checked' : ''} ${isStaff ? 'disabled' : ''} onchange="ScreenS04.toggleDay('${item.day}')">
                <span class="toggle__slider"></span>
              </label>
            </div>
          </div>

          <!-- Secondary Shift Row for midnight crossings (Row 2 registration rule) -->
          ${item.isOpen && item.hasSecondShift ? `
            <div class="flex items-center gap-4 justify-between mt-2.5 p-3 bg-surface-container-low" style="border-radius:8px; font-size:13px; margin-left:12px; border: 1.5px dashed rgba(15,76,92,0.25); flex-wrap:wrap; background:#f4f8fa;">
              <div style="font-weight:700; color:#0F4C5C; display:flex; align-items:center; gap:6px;">
                🌙 Shift 2 (After Midnight)
              </div>
              <div class="availability-time-group flex items-center gap-3" style="flex:1;">
                <div class="flex items-center gap-2">
                  <input type="time" class="form-input" style="width:130px; height:38px; font-size:15px; font-weight:700; color:#0F4C5C; background:#f4f8fa; border:1.5px solid rgba(15,76,92,0.25); text-align:center; padding:0 8px;" value="${item.secondOpen}" ${isStaff ? 'disabled' : ''} onchange="ScreenS04.updateSecondTime(${idx}, 'secondOpen', this.value)">
                  <span style="font-size:13px; font-weight:600; color:#46464f;">to</span>
                  <input type="time" class="form-input" style="width:130px; height:38px; font-size:15px; font-weight:700; color:#0F4C5C; background:#f4f8fa; border:1.5px solid rgba(15,76,92,0.25); text-align:center; padding:0 8px;" value="${item.secondClose}" ${isStaff ? 'disabled' : ''} onchange="ScreenS04.updateSecondTime(${idx}, 'secondClose', this.value)">
                </div>
                <div class="flex items-center gap-1.5">
                  <span style="color:#0F4C5C; font-size:12px; font-weight:700;">LO:</span>
                  <input type="time" class="form-input" style="width:130px; height:38px; font-size:15px; font-weight:700; color:#0F4C5C; background:#f4f8fa; border:1.5px solid rgba(15,76,92,0.25); text-align:center; padding:0 8px;" value="${item.secondLastOrder}" ${isStaff ? 'disabled' : ''} onchange="ScreenS04.updateSecondTime(${idx}, 'secondLastOrder', this.value)">
                </div>
              </div>
              <div style="font-size:11.5px; color:#777680; font-style:italic;">* Mid-day break or post-midnight hours</div>
            </div>
          ` : ''}
        </div>
      `;
    }).join('');

    // ==========================================
    // Section: Special & Holiday Hours (shop_special_hours)
    // ==========================================
    const specialHoursCard = `
      <div class="card flex flex-col gap-4">
        <div class="flex justify-between items-center">
          <div>
            <h3 class="text-label-md" style="font-weight:700; color:var(--color-primary); margin:0;">
              Special & Holiday Hours
            </h3>
            <div style="font-size:11.5px; color:var(--color-outline); margin-top:2px;">
              Override regular weekday hours for holidays, private events, or special business dates.
            </div>
          </div>
          ${isStaff ? '' : `<button class="btn btn-secondary btn-sm" onclick="ScreenS04.addSpecialHourModal()">${Components.icon('plus', 14)} Add Exception Date</button>`}
        </div>

        <div class="flex flex-col gap-3">
          ${specialHours.length === 0 ? `
            <div style="font-size:12px; color:var(--color-outline); padding:16px; text-align:center; background:var(--color-surface-container); border-radius:var(--radius-md);">
              No special business hours or holiday closures scheduled.
            </div>
          ` : specialHours.map(h => `
            <div class="flex justify-between items-start p-3 ${h.type === 'closed' ? 'bg-error-container text-on-error-container' : 'bg-surface-container-high'}" style="border-radius:var(--radius-md); font-size:12.5px; border:1px solid ${h.type === 'closed' ? 'var(--color-error)' : 'var(--color-outline-variant)'};">
              <div>
                <div style="display:flex; align-items:center; gap:6px;">
                  <strong style="font-weight:700;">${h.name}</strong>
                  <span class="badge ${h.type === 'closed' ? 'badge--error' : 'badge--primary'}" style="font-size:10px; padding:1px 6px;">
                    ${h.type === 'closed' ? 'Temporary Closure' : 'Special Hours'}
                  </span>
                </div>
                <div style="font-size:11.5px; margin-top:3px; opacity:0.9;">
                  📅 <strong>${h.start}</strong> ${h.start !== h.end ? `to <strong>${h.end}</strong>` : ''}
                  ${h.type === 'special_hours' ? ` • ⏰ ${h.open} - ${h.close} (LO: ${h.lastOrder})` : ''}
                </div>
                ${h.note ? `<div style="font-size:11px; margin-top:2px; font-style:italic; opacity:0.8;">Note: ${h.note}</div>` : ''}
              </div>
              ${isStaff ? '' : `<button class="btn btn-ghost btn-sm" style="color:${h.type === 'closed' ? 'var(--color-error)' : 'var(--color-outline)'}; padding:4px 8px;" onclick="ScreenS04.deleteSpecialHour(${h.id})">✕</button>`}
            </div>
          `).join('')}
        </div>
      </div>
    `;

    // ==========================================
    // Section: Slot Settings (shops: slot_interval, duration, capacity)
    // ==========================================
    // Generate sample preview slots
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

    const slotConfigSection = `
      <div class="card flex flex-col gap-4">
        <div>
          <h3 class="text-label-md" style="font-weight:700; color:var(--color-primary); margin:0;">
            Slot Generation Parameters
          </h3>
          <div style="font-size:11.5px; color:var(--color-outline); margin-top:2px;">
            Configures how BAT-03 slices daily business hours into bookable slots (shop_schedules).
          </div>
        </div>

        <div class="grid grid-3 gap-4" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr));">
          <!-- Slot Interval -->
          <div class="form-group mb-0">
            <label class="form-label" style="font-size:12px; font-weight:600;">
              Slot Interval<span class="required">*</span>
            </label>
            <select class="form-input" style="height:36px; font-size:12.5px;" ${isStaff ? 'disabled' : ''} onchange="ScreenS04.updateSlotInterval(this.value)">
              <option value="30" ${slotIntervalMin === 30 ? 'selected' : ''}>30 Minutes</option>
              <option value="60" ${slotIntervalMin === 60 ? 'selected' : ''}>60 Minutes (Default)</option>
            </select>
            <span class="form-hint" style="font-size:10.5px;">Slices open hours into ${slotIntervalMin}-min bookable blocks.</span>
          </div>

          <!-- Default Duration -->
          <div class="form-group mb-0">
            <label class="form-label" style="font-size:12px; font-weight:600;">
              Default Duration<span class="required">*</span>
            </label>
            <div class="flex items-center gap-2">
              <input type="number" class="form-input" style="height:36px; font-size:12.5px; width:100px;" min="30" max="480" step="15" value="${defaultDurationMin}" ${isStaff ? 'disabled' : ''} onchange="ScreenS04.updateDuration(this.value)">
              <span style="font-size:12px; color:var(--color-outline);">Minutes</span>
            </div>
            <span class="form-hint" style="font-size:10.5px;">Used when customer does not select a course menu.</span>
          </div>

          <!-- Slot Capacity -->
          <div class="form-group mb-0">
            <label class="form-label" style="font-size:12px; font-weight:600;">
              Capacity per Slot<span class="required">*</span>
            </label>
            <div class="flex items-center gap-2">
              <div class="number-stepper">
                <button class="number-stepper__btn" ${isStaff ? 'disabled' : ''} onclick="ScreenS04.adjustSeats(-2)">${Components.icon('minus', 14)}</button>
                <span class="number-stepper__value" style="font-size:13px; font-weight:700;">${slotCapacity}</span>
                <button class="number-stepper__btn" ${isStaff ? 'disabled' : ''} onclick="ScreenS04.adjustSeats(2)">${Components.icon('plus', 14)}</button>
              </div>
              <span style="font-size:12px; color:var(--color-outline);">Guests</span>
            </div>
            <span class="form-hint" style="font-size:10.5px;">Initial value calculated from the table sum defined in <a href="#/shop/tables" style="color:var(--color-primary); text-decoration:underline;">Table Management</a>.</span>
          </div>
        </div>

        <!-- Generation Preview -->
        <div class="p-3 bg-surface-container flex flex-col gap-2" style="border-radius:var(--radius-md); border:1px solid var(--color-outline-variant);">
          <div style="font-size:12px; font-weight:700; color:var(--color-primary); display:flex; align-items:center; justify-content:space-between;">
            <span>👁️ Slot Schedule Preview</span>
            <span class="badge badge--info" style="font-size:10px;">${previewSlots.length} slots / day • ${slotCapacity} guests each</span>
          </div>
          <div style="font-size:11px; color:var(--color-on-surface-variant); line-height:1.5;">
            Example daily slot allocation for regular business day (11:00 - 22:00):<br>
            <strong>${previewSlots.slice(0, 6).join(' • ')} ... (${previewSlots.length} slots total)</strong>
          </div>
        </div>
      </div>
    `;

    // ==========================================
    // Section: Booking Acceptance Rules (shops: booking_window, cutoff, min/max party)
    // ==========================================
    const bookingRulesSection = `
      <div class="card flex flex-col gap-4">
        <div>
          <h3 class="text-label-md" style="font-weight:700; color:var(--color-primary); margin:0;">
            Booking Acceptance Rules
          </h3>
          <div style="font-size:11.5px; color:var(--color-outline); margin-top:2px;">
            Booking window limits and cutoff deadlines enforced on user reservation screens (U-04 / U-05).
          </div>
        </div>

        <div class="grid grid-4 gap-4" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr));">
          <!-- Booking Window Days -->
          <div class="form-group mb-0">
            <label class="form-label" style="font-size:12px; font-weight:600;">
              Booking Window<span class="required">*</span>
            </label>
            <div class="flex items-center gap-2">
              <input type="number" class="form-input" style="height:36px; font-size:12.5px; width:90px;" min="1" max="180" value="${bookingWindowDays}" ${isStaff ? 'disabled' : ''} onchange="ScreenS04.updateRule('bookingWindowDays', this.value)">
              <span style="font-size:12px; color:var(--color-outline);">Days ahead</span>
            </div>
            <span class="form-hint" style="font-size:10.5px;">BAT-03 generates calendar slots up to ${bookingWindowDays} days ahead.</span>
          </div>

          <!-- Cutoff Minutes -->
          <div class="form-group mb-0">
            <label class="form-label" style="font-size:12px; font-weight:600;">
              Cutoff Before Arrival<span class="required">*</span>
            </label>
            <div class="flex items-center gap-2">
              <input type="number" class="form-input" style="height:36px; font-size:12.5px; width:90px;" min="0" max="1440" step="15" value="${bookingCutoffMin}" ${isStaff ? 'disabled' : ''} onchange="ScreenS04.updateRule('bookingCutoffMin', this.value)">
              <span style="font-size:12px; color:var(--color-outline);">Minutes before</span>
            </div>
            <span class="form-hint" style="font-size:10.5px;">Slots within ${bookingCutoffMin} min of start time are disabled in U-04.</span>
          </div>

          <!-- Min Party Size -->
          <div class="form-group mb-0">
            <label class="form-label" style="font-size:12px; font-weight:600;">
              Min Party Size<span class="required">*</span>
            </label>
            <div class="flex items-center gap-2">
              <input type="number" class="form-input" style="height:36px; font-size:12.5px; width:80px;" min="1" max="20" value="${minPartySize}" ${isStaff ? 'disabled' : ''} onchange="ScreenS04.updateRule('minPartySize', this.value)">
              <span style="font-size:12px; color:var(--color-outline);">Guests</span>
            </div>
            <span class="form-hint" style="font-size:10.5px;">Minimum guests per booking.</span>
          </div>

          <!-- Max Party Size -->
          <div class="form-group mb-0">
            <label class="form-label" style="font-size:12px; font-weight:600;">
              Max Party Size<span class="required">*</span>
            </label>
            <div class="flex items-center gap-2">
              <input type="number" class="form-input" style="height:36px; font-size:12.5px; width:80px;" min="${minPartySize}" max="100" value="${maxPartySize}" ${isStaff ? 'disabled' : ''} onchange="ScreenS04.updateRule('maxPartySize', this.value)">
              <span style="font-size:12px; color:var(--color-outline);">Guests</span>
            </div>
            <span class="form-hint" style="font-size:10.5px;">Enforced as shop max party limit on U-04/U-05.</span>
          </div>
        </div>
      </div>
    `;

    // Batch Status Side Block
    const batchBlock = `
      <div class="card flex flex-col gap-3 p-4" style="background:rgba(19, 21, 70, 0.02); border: 1.5px dashed var(--color-outline-variant);">
        <h4 style="font-size:13px; font-weight:700; color:var(--color-primary); margin:0;">⚙️ Slot Generator Status (BAT-03)</h4>
        <div style="font-size:11.5px; color:var(--color-outline); line-height:1.4;">
          The system auto-generates <strong>${bookingWindowDays} days</strong> of booking slot schedules daily from these 4 sections.
        </div>
        <div style="font-size:11px; color:var(--color-warning-dark, #795900); background:rgba(255, 198, 65, 0.15); padding:6px 10px; border-radius:6px;">
          ℹ️ Changes to slot interval (${slotIntervalMin}m) or capacity take effect on <strong>new slots generated starting tomorrow (BAT-03)</strong> to preserve existing reservations.
        </div>
        <div class="flex items-center justify-between mt-2 flex-wrap gap-2">
          <span style="font-size:11px; font-weight:600; color:var(--color-success);">🟢 Active (Last Run: Today 04:00)</span>
          ${isStaff ? '' : `<button class="btn btn-secondary btn-sm" onclick="ScreenS04.triggerBatch()" style="padding:4px 10px; font-size:11px;">Simulate BAT-03 Run</button>`}
        </div>
      </div>
    `;

    const saveDisabledAttr = (isStaff || timeRangeErrorMsg) ? 'disabled' : '';

    const content = `
      ${debugRoleBar}
      ${warningBanner}
      ${Components.pageHeader('Availability & Slots Settings', 'Configure business hours, special exceptions, slot parameters, and reservation window rules')}

      <div style="display:flex; flex-direction:column; gap:24px; max-width:1080px; margin:0 auto;">
        
        <!-- Section 1: Business Hours -->
        <section class="card flex flex-col gap-4">
          <div class="flex justify-between items-center" style="border-bottom:1px solid var(--color-surface-container); padding-bottom:8px;">
            <div>
              <h3 class="text-label-md" style="font-weight:700; color:var(--color-primary); margin:0;">
                Regular Weekly Business Hours
              </h3>
              <div style="font-size:11.5px; color:var(--color-outline); margin-top:2px;">
                Define open/close times, last orders, and optional mid-day breaks for each day of the week.
              </div>
            </div>
            <span style="font-size:11px; color:var(--color-outline);">* LO = Last Order Time</span>
          </div>
          
          ${timeValidationAlertHtml}

          <div class="flex flex-col">
            ${hourRows}
          </div>
        </section>

        <!-- Section 2: Special & Holiday Hours -->
        ${specialHoursCard}

        <!-- Section 3: Slot Settings -->
        ${slotConfigSection}

        <!-- Section 4: Booking Acceptance Rules -->
        ${bookingRulesSection}

        <!-- Batch info -->
        ${batchBlock}

        <!-- Global Save Actions -->
        <div class="card p-4 flex justify-between items-center flex-wrap gap-4" style="position:sticky; bottom:16px; z-index:10; background:var(--color-surface-container-lowest, #fff); box-shadow:0 4px 16px rgba(0,0,0,0.08); border-radius:var(--radius-md);">
          <div style="font-size:12px; color:var(--color-outline);">
            ${isStaff ? 'Viewing in Read-Only Mode (Staff)' : 'All 4 sections will be saved simultaneously to shops / shop_business_hours / shop_special_hours.'}
          </div>
          <div class="flex gap-3">
            <button class="btn btn-ghost" onclick="Router.navigate('/shop/dashboard')">${I18n.t('cancel')}</button>
            <button class="btn btn-primary" ${saveDisabledAttr} onclick="ScreenS04.saveSettings()">
              💾 ${I18n.t('save')} All Settings
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

  function addSpecialHourModal() {
    const modalHtml = `
      <div class="modal-backdrop" id="special-hour-modal" onclick="if(event.target===this)this.remove()">
        <div class="modal animate-scale-in" style="max-width:480px;">
          <div class="modal__header">
            <h3 class="modal__title">Add Special Hours / Temporary Closure</h3>
            <button class="modal__close" onclick="document.getElementById('special-hour-modal').remove()">✕</button>
          </div>
          <div class="modal__body flex flex-col gap-4">
            <div class="form-group mb-0">
              <label class="form-label">Type<span class="required">*</span></label>
              <div class="flex gap-4">
                <label class="flex items-center gap-2" style="cursor:pointer; font-size:12.5px;">
                  <input type="radio" name="special-type" value="closed" checked onchange="document.getElementById('special-time-row').style.display='none'">
                  <span>Temporary Closure</span>
                </label>
                <label class="flex items-center gap-2" style="cursor:pointer; font-size:12.5px;">
                  <input type="radio" name="special-type" value="special_hours" onchange="document.getElementById('special-time-row').style.display='flex'">
                  <span>Special Hours</span>
                </label>
              </div>
            </div>

            <div class="form-group mb-0">
              <label class="form-label">Reason / Occasion Name<span class="required">*</span></label>
              <input type="text" class="form-input" id="special-name" placeholder="E.g. Thingyan Holiday / Private Venue Event" maxlength="200">
            </div>

            <div class="form-row">
              <div class="form-group mb-0">
                <label class="form-label">Start Date<span class="required">*</span></label>
                <input type="date" class="form-input" id="special-start" value="2026-08-01">
              </div>
              <div class="form-group mb-0">
                <label class="form-label">End Date<span class="required">*</span></label>
                <input type="date" class="form-input" id="special-end" value="2026-08-01">
              </div>
            </div>

            <div id="special-time-row" class="form-row" style="display:none; gap:8px;">
              <div class="form-group mb-0" style="flex:1;">
                <label class="form-label" style="font-size:11px;">Open Time</label>
                <input type="time" class="form-input" id="special-open" value="12:00">
              </div>
              <div class="form-group mb-0" style="flex:1;">
                <label class="form-label" style="font-size:11px;">Close Time</label>
                <input type="time" class="form-input" id="special-close" value="23:00">
              </div>
              <div class="form-group mb-0" style="flex:1;">
                <label class="form-label" style="font-size:11px;">Last Order</label>
                <input type="time" class="form-input" id="special-lo" value="22:00">
              </div>
            </div>

            <div class="form-group mb-0">
              <label class="form-label" style="font-size:11.5px;">Public Note (Displayed on U-03 Shop Detail)</label>
              <input type="text" class="form-input" id="special-note" placeholder="E.g. Closed for private wedding reception">
            </div>
          </div>
          <div class="modal__footer">
            <button class="btn btn-ghost" onclick="document.getElementById('special-hour-modal').remove()">${I18n.t('cancel')}</button>
            <button class="btn btn-primary" onclick="ScreenS04.saveSpecialHour()">${I18n.t('create')}</button>
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

  function triggerBatch() {
    const overlay = document.createElement('div');
    overlay.className = 'modal-backdrop flex items-center justify-center';
    overlay.style.zIndex = '9999999';
    overlay.innerHTML = `
      <div class="card p-6 flex flex-col items-center gap-4 text-center animate-scale-in" style="max-width:340px; border-radius:var(--radius-lg);">
        <div style="font-size:32px; animation: spin 1.5s linear infinite;">⚙️</div>
        <div>
          <h4 style="font-weight:700; color:var(--color-primary); margin:0;">Executing BAT-03</h4>
          <p style="font-size:12px; color:var(--color-outline); margin-top:6px;">
            Auto-generating slot inventory for next <strong>${bookingWindowDays} days</strong> (${slotIntervalMin}-min intervals, ${slotCapacity} capacity/slot)...
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
      showToast('success', 'Batch Completed', `BAT-03 completed: ${bookingWindowDays}-day slots generated.`);
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

    showToast('success', 'Saved Successfully', 'All 4 sections stored in database. Tomorrow slots updated.');
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
    addSpecialHourModal, 
    saveSpecialHour, 
    deleteSpecialHour, 
    setTestRole, 
    triggerBatch, 
    saveSettings 
  };
})();
