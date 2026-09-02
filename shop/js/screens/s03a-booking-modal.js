/* ============================================================
   EzBookNow Screen S-03-A — Booking Details Screen / Modal & Edit Mode
   Based on stitch ui draw / stitch_ezbooknow_enterprise_ui_design (7)
   Includes View Mode & Edit Mode with Table Assignment & Preferred Seat Tags
   ============================================================ */

const ScreenS03A = (() => {
  let modalElement = null;
  let isEditModeMap = {}; // Tracks edit mode state per reservation ID

  function buildDetailHtml(b, isModal = false) {
    const lang = I18n.getLang();
    
    // Status config
    const statusConfig = {
      confirmed: { label: lang === 'mm' ? 'အတည်ပြုပြီး' : 'Confirmed', icon: 'check_circle', bg: '#d0e6ec', color: '#0F4C5C' },
      pending: { label: lang === 'mm' ? 'စောင့်ဆိုင်းဆဲ' : 'Pending', icon: 'pending', bg: '#fbead1', color: '#854d0e' },
      checked_in: { label: lang === 'mm' ? 'ဆိုက်ရောက်ပြီး (Checked In)' : 'Checked In', icon: 'how_to_reg', bg: '#dbeafe', color: '#1e40af' },
      completed: { label: lang === 'mm' ? 'ပြီးဆုံးပြီ (Completed)' : 'Completed', icon: 'task_alt', bg: '#dcfce7', color: '#166534' },
      cancelled: { label: lang === 'mm' ? 'ပယ်ဖျက်ပြီး (Cancelled)' : 'Cancelled', icon: 'cancel', bg: '#fee2e2', color: '#991b1b' },
      no_show: { label: lang === 'mm' ? 'မလာရောက်ပါ (No Show)' : 'No Show', icon: 'person_off', bg: '#fce7f3', color: '#9d174d' }
    };
    const st = statusConfig[b.status] || statusConfig.confirmed;

    const isManualUser = !b.user_id || b.user_id === 'null' || b.user_id === null;
    const isPending = b.status === 'pending';

    // Guest Warning Notice
    const guestNoticeHtml = (isManualUser && isPending) ? `
      <div style="background: #fbead1; border: 1px solid #fed7aa; color: #D8902F; padding: 12px 16px; border-radius: 12px; font-size: 12.5px; font-weight: 500; display: flex; align-items: flex-start; gap: 8px; margin-bottom: 16px;">
        <span class="material-symbols-outlined" style="font-size: 18px;">warning</span>
        <div><strong>${I18n.t('s03_guest_verification_warning')}</strong></div>
      </div>
    ` : '';

    // Seat tags dictionary
    const tagMmMap = {
      'Window View': 'ပြတင်းပေါက်နား',
      'Quiet Area': 'တိတ်ဆိတ်သောနေရာ',
      'Near TV': 'တီဗီ အနီး',
      'Outdoor / Smoking': 'ပြင်ပ/ဆေးလိပ်သောက်ဧရိယာ',
      'VIP Area': 'VIP သီးသန့်နေရာ'
    };

    // Seat tags
    const seatTags = (b.preferred_seat_tags && b.preferred_seat_tags.length) 
      ? b.preferred_seat_tags 
      : ['Window View', 'Quiet Area'];

    // Table options
    const tables = ['Table B-12', 'T-01', 'T-02', 'T-03', 'T-05', 'T-09', 'T-12', 'T-14', 'VIP-Deck', 'Booth-02', 'Bar-04'];
    const tableOptionsHtml = tables.map(t => `<option value="${t}" ${b.table === t ? 'selected' : ''}>${t}</option>`).join('');

    return `
      <div id="s03a-screen" style="${isModal ? 'max-width: 520px; width: 100%;' : 'max-width: 720px; margin: 0 auto;'} padding-bottom: 24px;">
        
        ${guestNoticeHtml}

        <!-- Header Section & Status -->
        <div style="display: flex; flex-direction: column; align-items: center; text-align: center; margin-bottom: 24px;">
          <div style="display: inline-flex; align-items: center; padding: 6px 16px; border-radius: 9999px; background: ${st.bg}; color: ${st.color}; margin-bottom: 12px; font-weight: 600; font-size: 13px;">
            <span class="material-symbols-outlined" style="font-size: 18px; margin-right: 6px; font-variation-settings: 'FILL' 1;">${st.icon}</span>
            <span>${st.label}</span>
          </div>
          <h2 style="font-family: 'Outfit', sans-serif; font-size: 28px; font-weight: 700; color: #0F4C5C; margin: 0 0 4px 0;">${lang === 'mm' ? `ဘွတ်ကင် အမှတ် #${b.id}` : `Booking #${b.id}`}</h2>
          <p style="font-size: 13px; color: #46464f; margin: 0;">
            ${lang === 'mm' ? `စတင် စာရင်းသွင်းသည့်နေ့ - ${b.submittedAt ? b.submittedAt.split('T')[0] : '2026-10-24'}` : `Created on ${b.submittedAt ? b.submittedAt.split('T')[0] : 'Oct 24, 2026'} • 10:45 AM`}
          </p>
        </div>

        <!-- Customer Info Card -->
        <div class="stitch-card" style="margin-bottom: 24px;">
          <span class="stitch-label">${lang === 'mm' ? 'ဧည့်သည် အချက်အလက်' : 'CUSTOMER INFO'}</span>
          <div style="display: flex; align-items: center; gap: 16px;">
            <div style="width: 60px; height: 60px; border-radius: 50%; overflow: hidden; border: 2.5px solid #D8902F; flex-shrink: 0; background: #0F4C5C; color: #fff; font-weight: 700; display: flex; align-items: center; justify-content: center; font-size: 20px;">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4gjSuzs79lZsLMVWQsJ7r1uKv6xGFjDTIQ6Ab5o6mX2YcjK_84G0NtKL565kOclu1SAKLD96vTZuVf1QcajrhTT8s-eFuVI-sEnC9Ym6nORB_P7MycMdlyGFB-GEc02LX-VSNX6vWZ3TXuWNIFdOpUXaJqA3Jd06suR2is9EflHGrWLEF6tNH6Qte6W7ZLVcfUU3QGd7zfqt_tGlOVRUW2XPwVWhs1TkQW749dvemf8w_ryZM5uMi6S-cP3EX3eS1MxWstoQpJlc4" onerror="this.style.display='none';" style="width: 100%; height: 100%; object-fit: cover;" alt="${b.name}" />
              <span>${b.name ? b.name.charAt(0) : 'C'}</span>
            </div>
            <div style="flex: 1;">
              <h4 style="font-family: 'Outfit', sans-serif; font-size: 20px; font-weight: 600; color: #0F4C5C; margin: 0 0 4px 0;">${b.name}</h4>
              <div style="display: flex; align-items: center; gap: 6px; color: #46464f; font-size: 13.5px;">
                <span class="material-symbols-outlined" style="font-size: 16px; color: #0F4C5C;">call</span>
                <span>${b.phone}</span>
              </div>
              ${b.guest_phone_verified_at ? `<div style="font-size: 11px; color: #2e7d32; margin-top: 4px; font-weight: 600;">${lang === 'mm' ? '✓ ဖုန်းနံပါတ် အတည်ပြုပြီး' : '✓ Phone Verified'}</div>` : ''}
            </div>
            <button type="button" onclick="ScreenS03A.sendViber()" style="width: 42px; height: 42px; border-radius: 50%; background: #edeeef; border: none; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #0F4C5C; transition: transform 0.15s;" title="Send Message">
              <span class="material-symbols-outlined" style="font-size: 20px;">chat</span>
            </button>
          </div>
        </div>

        <!-- Booking Summary Bento Section -->
        <div style="margin-bottom: 24px;">
          <span class="stitch-label">${lang === 'mm' ? 'ဘွတ်ကင် အနှစ်ချုပ်' : 'BOOKING SUMMARY'}</span>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px;">
            
            <!-- Date Card -->
            <div class="stitch-card" style="margin-bottom: 0; padding: 14px; display: flex; flex-direction: column;">
              <span class="material-symbols-outlined" style="color: #0F4C5C; font-size: 24px; margin-bottom: 6px;">calendar_month</span>
              <span style="font-size: 11px; color: #46464f; font-weight: 500;">${lang === 'mm' ? 'ရက်စွဲ' : 'Date'}</span>
              <span style="font-family: 'Outfit', sans-serif; font-size: 18px; font-weight: 700; color: #0F4C5C;">${b.date}</span>
            </div>

            <!-- Time Card -->
            <div class="stitch-card" style="margin-bottom: 0; padding: 14px; display: flex; flex-direction: column;">
              <span class="material-symbols-outlined" style="color: #0F4C5C; font-size: 24px; margin-bottom: 6px;">schedule</span>
              <span style="font-size: 11px; color: #46464f; font-weight: 500;">${lang === 'mm' ? 'အချိန်' : 'Time'}</span>
              <span style="font-family: 'Outfit', sans-serif; font-size: 18px; font-weight: 700; color: #0F4C5C;">${b.time}</span>
            </div>

            <!-- Guests Card -->
            <div class="stitch-card" style="margin-bottom: 0; padding: 14px; display: flex; flex-direction: column;">
              <span class="material-symbols-outlined" style="color: #0F4C5C; font-size: 24px; margin-bottom: 6px;">groups</span>
              <span style="font-size: 11px; color: #46464f; font-weight: 500;">${lang === 'mm' ? 'ဧည့်သည်' : 'Guests'}</span>
              <span style="font-family: 'Outfit', sans-serif; font-size: 18px; font-weight: 700; color: #0F4C5C;">${b.guests} ${lang === 'mm' ? 'ဦး' : 'Guests'}</span>
            </div>

            <!-- Table Card -->
            <div class="stitch-card" style="margin-bottom: 0; padding: 14px; display: flex; flex-direction: column;">
              <span class="material-symbols-outlined" style="color: #0F4C5C; font-size: 24px; margin-bottom: 6px;">restaurant_menu</span>
              <span style="font-size: 11px; color: #46464f; font-weight: 500;">${lang === 'mm' ? 'သတ်မှတ်ထားသော စားပွဲ' : 'Assigned Table'}</span>
              <select id="s03a-table-select" onchange="ScreenS03A.updateTable('${b.id}', this.value)" style="margin-top: 4px; border: 1px solid #c7c5d0; border-radius: 8px; padding: 2px 6px; font-size: 13px; font-weight: 700; color: #0F4C5C; background: #f4f8fa;">
                ${tableOptionsHtml}
              </select>
            </div>

          </div>

          <!-- Venue Info Wide Card -->
          <div class="stitch-card" style="margin-bottom: 0; padding: 16px; display: flex; gap: 16px; align-items: center;">
            <div style="width: 72px; height: 72px; border-radius: 12px; overflow: hidden; flex-shrink: 0;">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuC4jEumsqvruAnfI7kkKcxkypVieQL8oiA1iTkDkj8w93STZJKnWCLl4n8AnXAjVt-hlJ973DBoQAOGh7s4bYi-VPlDjAIfVhliJ2gWW09waXfC-f1sKOBzJZBfEDT53vRJgfocvK_sij1eSUwCEgRIaXs6tVyfkTzupDDwHIytldDfWq3bdarlg5d3AndQM6rVXaNJQRBoQAlDp-wF3aV2pXh4VcJQcdBKl7dDzcJ4ji2Dwz93-Gfn6Ukh8n0bP0lMK4TbYqZz1thx" onerror="this.onerror=null; this.src=Paths.image('glass_pavilion.png');" style="width: 100%; height: 100%; object-fit: cover;" alt="Venue" />
            </div>
            <div>
              <h4 style="font-family: 'Outfit', sans-serif; font-size: 18px; font-weight: 600; color: #0F4C5C; margin: 0 0 2px 0;">The Glass Bistro</h4>
              <p style="font-size: 13px; color: #46464f; margin: 0; display: flex; align-items: center; gap: 4px;">
                <span class="material-symbols-outlined" style="font-size: 16px; color: #777680;">location_on</span>
                ${lang === 'mm' ? '၄၂ လမ်း၊ မြို့လယ်ကင်း၊ ရန်ကုန်' : '42nd Modern Ave, Downtown'}
              </p>
            </div>
          </div>
        </div>

        <!-- Special Requests Section -->
        <div class="stitch-card" style="margin-bottom: 24px;">
          <span class="stitch-label">${lang === 'mm' ? 'အထူး တောင်းဆိုချက်များ နှင့် တောင်းဆိုချက် Tags' : 'SPECIAL REQUESTS & SEATING TAGS'}</span>
          <div style="display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 10px;">
            ${seatTags.map(t => {
              const label = lang === 'mm' ? (tagMmMap[t] || t) : t;
              return `<span style="background: #d0e6ec; color: #0F4C5C; border: 1px solid #98c9d4; font-size: 11.5px; font-weight: 600; padding: 4px 10px; border-radius: 20px;">${label}</span>`;
            }).join('')}
          </div>
          <p style="font-size: 13.5px; color: #46464f; font-style: italic; margin: 0;">
            "${b.notes || (lang === 'mm' ? 'အထူး တောင်းဆိုချက် မရှိပါ။' : 'No special requests specified.')}"
          </p>
        </div>

        ${b.undo_no_show ? `
          <!-- Undo No-Show Audit Log -->
          <div class="stitch-card" style="margin-bottom: 24px; background: #FEF3C7; border: 1px solid #FCD34D;">
            <span class="stitch-label" style="color: #92400E; margin-bottom: 6px;">${lang === 'mm' ? 'No-Show အမှားပြင်ဆင်မှု မှတ်တမ်း' : 'UNDO NO-SHOW AUDIT RECORD'}</span>
            <div style="font-size: 13px; color: #92400E; font-weight: 700; display:flex; align-items:center; gap:6px; margin-bottom: 4px;">
              <span class="material-symbols-outlined" style="font-size: 18px;">history</span>
              <span>${lang === 'mm' ? 'No-Show အား ပြန်လည်ပြင်ဆင်ခဲ့သည်' : 'Reverted from No-Show'} (${b.undo_no_show.at ? b.undo_no_show.at.split('T')[0] : '2026-07-20'})</span>
            </div>
            <div style="font-size: 12.5px; color: #78350F; font-style: italic; line-height: 1.4;">
              "${b.undo_no_show.reason || ''}"
            </div>
          </div>
        ` : ''}

        <!-- Footer Action Buttons (Status Dependent) -->
        <div style="display: flex; flex-direction: column; gap: 10px;">
          
          <!-- PENDING / PENDING_SYNC -->
          ${(b.status === 'pending' || b.status === 'pending_sync') ? `
            <button type="button" onclick="ScreenS03A.updateStatus('${b.id}', 'confirmed')" class="stitch-register-btn" style="height: 48px; font-size: 14.5px;">
              <span class="material-symbols-outlined" style="font-size: 20px;">check_circle</span>
              ${lang === 'mm' ? 'ဘွတ်ကင် အတည်ပြုမည်' : 'Confirm Booking'}
            </button>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
              <button type="button" onclick="ScreenS03A.toggleEdit('${b.id}', true)" style="height: 44px; background: #edeeef; color: #0F4C5C; font-weight: 600; font-size: 13.5px; border-radius: 12px; border: none; display: flex; align-items: center; justify-content: center; gap: 6px; cursor: pointer;">
                <span class="material-symbols-outlined" style="font-size: 18px;">edit</span>
                ${lang === 'mm' ? 'ပြင်ဆင်မည်' : 'Edit'}
              </button>
              <button type="button" onclick="ScreenS03A.updateStatus('${b.id}', 'cancelled')" style="height: 44px; background: #ffdad6; color: #93000a; font-weight: 600; font-size: 13.5px; border-radius: 12px; border: none; display: flex; align-items: center; justify-content: center; gap: 6px; cursor: pointer;">
                <span class="material-symbols-outlined" style="font-size: 18px;">cancel</span>
                ${lang === 'mm' ? 'ပယ်ဖျက်မည်' : 'Cancel'}
              </button>
            </div>
          ` : ''}

          <!-- CONFIRMED -->
          ${b.status === 'confirmed' ? `
            <button type="button" onclick="ScreenS03A.updateStatus('${b.id}', 'checked_in')" class="stitch-register-btn" style="height: 48px; font-size: 14.5px;">
              <span class="material-symbols-outlined" style="font-size: 20px;">how_to_reg</span>
              ${lang === 'mm' ? 'ဆိုက်ရောက်ကြောင်း အတည်ပြုမည် (Check-in)' : 'CHECK-IN NOW'}
            </button>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
              <button type="button" onclick="ScreenS03A.toggleEdit('${b.id}', true)" style="height: 44px; background: #edeeef; color: #0F4C5C; font-weight: 600; font-size: 13.5px; border-radius: 12px; border: none; display: flex; align-items: center; justify-content: center; gap: 6px; cursor: pointer;">
                <span class="material-symbols-outlined" style="font-size: 18px;">edit</span>
                ${lang === 'mm' ? 'ပြင်ဆင်မည်' : 'Edit'}
              </button>
              <button type="button" onclick="ScreenS03A.updateStatus('${b.id}', 'no_show')" style="height: 44px; background: #fce7f3; color: #9d174d; font-weight: 600; font-size: 13.5px; border-radius: 12px; border: none; display: flex; align-items: center; justify-content: center; gap: 6px; cursor: pointer;">
                <span class="material-symbols-outlined" style="font-size: 18px;">person_off</span>
                ${lang === 'mm' ? 'No-Show' : 'No-Show'}
              </button>
            </div>
          ` : ''}

          <!-- CHECKED_IN -->
          ${b.status === 'checked_in' ? `
            <button type="button" onclick="ScreenS03A.updateStatus('${b.id}', 'completed')" class="stitch-register-btn" style="height: 48px; font-size: 14.5px; background: #0F4C5C !important; color: #ffffff !important;">
              <span class="material-symbols-outlined" style="font-size: 20px;">task_alt</span>
              ${lang === 'mm' ? 'ဘွတ်ကင် ပြီးဆုံးပြီ (Complete)' : 'Complete Reservation'}
            </button>
            <div style="display: flex; gap: 10px; justify-content: flex-end;">
              <button type="button" onclick="ScreenS03A.toggleEdit('${b.id}', true)" style="height: 44px; width: 100%; background: #edeeef; color: #0F4C5C; font-weight: 600; font-size: 13.5px; border-radius: 12px; border: none; display: flex; align-items: center; justify-content: center; gap: 6px; cursor: pointer;">
                <span class="material-symbols-outlined" style="font-size: 18px;">edit</span>
                ${lang === 'mm' ? 'ပြင်ဆင်မည်' : 'Edit'}
              </button>
            </div>
          ` : ''}

          <!-- NO_SHOW STATE -->
          ${b.status === 'no_show' ? `
            <button type="button" onclick="ScreenS03A.openUndoNoShowModal('${b.id}')" class="stitch-register-btn" style="height: 48px; font-size: 14.5px; background: #D97706 !important; color: #ffffff !important;">
              <span class="material-symbols-outlined" style="font-size: 20px;">undo</span>
              ${lang === 'mm' ? 'No-Show အမှားပြင်ဆင်မည် (Undo No-Show)' : 'Undo No-Show'}
            </button>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
              <button type="button" onclick="ScreenS03A.sendViber()" style="height: 44px; background: #fbead1; color: #D8902F; border: 1px solid #D8902F; font-weight: 600; font-size: 13.5px; border-radius: 12px; display: flex; align-items: center; justify-content: center; gap: 6px; cursor: pointer;">
                <span class="material-symbols-outlined" style="font-size: 18px;">chat</span>
                ${lang === 'mm' ? 'Viber ဖြင့် သတိပေးမည်' : 'Viber Notify'}
              </button>
              <button type="button" onclick="ScreenS03A.close()" style="height: 44px; background: #edeeef; color: #0F4C5C; font-weight: 600; font-size: 13.5px; border-radius: 12px; border: none; cursor: pointer;">
                ${lang === 'mm' ? 'ပိတ်မည်' : 'Close'}
              </button>
            </div>
          ` : ''}

          <!-- COMPLETED / CANCELLED -->
          ${(b.status === 'completed' || b.status === 'cancelled') ? `
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
              <button type="button" onclick="ScreenS03A.sendViber()" style="height: 44px; background: #fbead1; color: #D8902F; border: 1px solid #D8902F; font-weight: 600; font-size: 13.5px; border-radius: 12px; display: flex; align-items: center; justify-content: center; gap: 6px; cursor: pointer;">
                <span class="material-symbols-outlined" style="font-size: 18px;">chat</span>
                ${lang === 'mm' ? 'Viber ဖြင့် သတိပေးမည်' : 'Viber Notify'}
              </button>
              <button type="button" onclick="ScreenS03A.close()" style="height: 44px; background: #edeeef; color: #0F4C5C; font-weight: 600; font-size: 13.5px; border-radius: 12px; border: none; cursor: pointer;">
                ${lang === 'mm' ? 'ပိတ်မည်' : 'Close'}
              </button>
            </div>
          ` : ''}
        </div>

      </div>
    `;
  }

  function buildEditHtml(b, isModal = false) {
    const lang = I18n.getLang();

    const allSeatTags = [
      { code: 'Window View', name: 'Window View', name_mm: 'ပြတင်းပေါက်နား' },
      { code: 'Quiet Area', name: 'Quiet Area', name_mm: 'တိတ်ဆိတ်သောနေရာ' },
      { code: 'Near TV', name: 'Near TV', name_mm: 'တီဗီ အနီး' },
      { code: 'Outdoor / Smoking', name: 'Outdoor / Smoking', name_mm: 'ပြင်ပ/ဆေးလိပ်သောက်ဧရိယာ' },
      { code: 'VIP Area', name: 'VIP Area', name_mm: 'VIP သီးသန့်နေရာ' }
    ];

    const currentTags = b.preferred_seat_tags || ['Window View'];
    const tableList = MockData.tables || [];
    const tableOptionsHtml = tableList.map(t => `<option value="${t.name}" ${b.table === t.name ? 'selected' : ''}>${t.name} (${t.seats} ${lang === 'mm' ? 'ခုံ' : 'seats'} · ${t.type})</option>`).join('');

    return `
      <div id="s03a-screen">
      <form id="s03a-edit-form" onsubmit="ScreenS03A.saveEdit(event, '${b.id}')" style="${isModal ? 'max-width: 520px; width: 100%;' : 'max-width: 720px; margin: 0 auto;'} display: flex; flex-direction: column; gap: 16px; padding-bottom: 24px;">
        
        <!-- Edit Mode Header -->
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e1e3e4; padding-bottom: 12px; margin-bottom: 4px;">
          <div>
            <h3 style="font-family: 'Outfit', sans-serif; font-size: 20px; font-weight: 700; color: #0F4C5C; margin: 0;">
              ✏️ ${lang === 'mm' ? 'ဘွတ်ကင် အချက်အလက် ပြင်ဆင်ရန်' : 'Edit Booking Details'} #${b.id}
            </h3>
            <p style="font-size: 13px; color: #46464f; margin: 2px 0 0 0;">
              ${lang === 'mm' ? 'ဧည့်သည်အချက်အလက်များနှင့် စားပွဲနေရာ သတ်မှတ်ချက်များကို ပြင်ဆင်ပါ' : 'Modify reservation details, assigned table, and preferences.'}
            </p>
          </div>
        </div>

        <!-- CUSTOMER INFORMATION Edit Card -->
        <div class="stitch-card" style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 0;">
          <span class="stitch-label" style="margin-bottom: 0;">${lang === 'mm' ? 'ဧည့်သည် အချက်အလက် ပြင်ဆင်ရန်' : 'CUSTOMER INFORMATION'}</span>
          <div style="display: flex; flex-direction: column; gap: 4px;">
            <label style="font-size: 12.5px; font-weight: 500; color: #46464f;">${I18n.t('customer_name')} <span class="text-error">*</span></label>
            <input type="text" id="edit-name" value="${b.name || ''}" style="width: 100%; height: 44px; border: 1px solid #c7c5d0; border-radius: 10px; padding: 0 14px; font-size: 14px; color: #1F2937; background: #f4f8fa; outline: none;" required />
          </div>
          <div style="display: flex; flex-direction: column; gap: 4px;">
            <label style="font-size: 12.5px; font-weight: 500; color: #46464f;">${I18n.t('contact_phone')} <span class="text-error">*</span></label>
            ${Components.phoneInput({ id: 'edit-phone', value: b.phone || '', required: true })}
          </div>
        </div>

        <!-- SCHEDULE & GUESTS Edit Card -->
        <div class="stitch-card" style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 0;">
          <span class="stitch-label" style="margin-bottom: 0;">${lang === 'mm' ? 'ရက်စွဲ၊ အချိန် နှင့် ဧည့်သည်ဦးရေ' : 'SCHEDULE & GUESTS'}</span>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
            <div style="display: flex; flex-direction: column; gap: 4px;">
              <label style="font-size: 12px; font-weight: 500; color: #46464f;">${lang === 'mm' ? 'ရက်စွဲ' : 'Date'}</label>
              <input type="date" id="edit-date" value="${b.date || '2026-07-20'}" style="width: 100%; height: 42px; border: 1px solid #c7c5d0; border-radius: 10px; padding: 0 12px; font-size: 13.5px; background: #f4f8fa;" required />
            </div>
            <div style="display: flex; flex-direction: column; gap: 4px;">
              <label style="font-size: 12px; font-weight: 500; color: #46464f;">${lang === 'mm' ? 'အချိန်' : 'Time'}</label>
              <input type="time" id="edit-time" value="${b.time || '19:00'}" style="width: 100%; height: 42px; border: 1px solid #c7c5d0; border-radius: 10px; padding: 0 12px; font-size: 13.5px; background: #f4f8fa;" required />
            </div>
          </div>
          <div style="display: flex; flex-direction: column; gap: 4px;">
            <label style="font-size: 12px; font-weight: 500; color: #46464f;">${lang === 'mm' ? 'ဧည့်သည် ဦးရေ' : 'Total Guests'}</label>
            <input type="number" id="edit-guests" min="1" max="50" value="${b.guests || 4}" style="width: 100%; height: 42px; border: 1px solid #c7c5d0; border-radius: 10px; padding: 0 14px; font-size: 14px; background: #f4f8fa;" required />
          </div>
        </div>

        <!-- TABLE ASSIGNMENT & SEATING TAGS Edit Card -->
        <div class="stitch-card" style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 0;">
          <span class="stitch-label" style="margin-bottom: 0;">${lang === 'mm' ? 'စားပွဲ သတ်မှတ်ခြင်း (Table Assignment) နှင့် Tag များ' : 'TABLE ASSIGNMENT & PREFERENCES'}</span>
          <div style="display: flex; flex-direction: column; gap: 4px;">
            <label style="font-size: 12.5px; font-weight: 500; color: #46464f;">${lang === 'mm' ? 'သတ်မှတ်ထားသော စားပွဲ (Table Assignment)' : 'Assigned Table (table_id)'}</label>
            <select id="edit-table" style="width: 100%; height: 44px; border: 1px solid #c7c5d0; border-radius: 10px; padding: 0 14px; font-size: 14px; font-weight: 600; color: #0F4C5C; background: #f4f8fa;">
              ${tableOptionsHtml}
            </select>
          </div>
          <div style="display: flex; flex-direction: column; gap: 6px; margin-top: 4px;">
            <label style="font-size: 12.5px; font-weight: 500; color: #46464f;">${lang === 'mm' ? 'တောင်းဆိုချက် Tags များ (preferred_seat_tags)' : 'Preferred Seat Tags (preferred_seat_tags)'}</label>
            <div style="display: flex; gap: 8px; flex-wrap: wrap;" id="edit-seat-tags-container">
              ${allSeatTags.map(tag => {
                const isSelected = currentTags.includes(tag.code);
                const label = lang === 'mm' ? tag.name_mm : tag.name;
                return `
                  <label style="display: inline-flex; align-items: center; gap: 6px; padding: 6px 14px; border-radius: 20px; font-size: 12px; font-weight: 600; border: 1px solid ${isSelected ? '#0F4C5C' : '#c7c5d0'}; background: ${isSelected ? '#0F4C5C' : '#edf3f7'}; color: ${isSelected ? '#ffffff' : '#1F2937'}; cursor: pointer;">
                    <input type="checkbox" name="edit-seat-tag" value="${tag.code}" ${isSelected ? 'checked' : ''} style="cursor:pointer;" onchange="this.parentElement.style.background = this.checked ? '#0F4C5C' : '#edf3f7'; this.parentElement.style.borderColor = this.checked ? '#0F4C5C' : '#c7c5d0'; this.parentElement.style.color = this.checked ? '#ffffff' : '#1F2937';" />
                    ${label}
                  </label>
                `;
              }).join('')}
            </div>
          </div>
        </div>

        <!-- SPECIAL REQUESTS / NOTES Edit Card -->
        <div class="stitch-card" style="margin-bottom: 0;">
          <span class="stitch-label">${lang === 'mm' ? 'အထူး တောင်းဆိုချက်များ / မှတ်ချက်' : 'SPECIAL REQUESTS / NOTES'}</span>
          <textarea id="edit-notes" placeholder="${lang === 'mm' ? 'ဓာတ်မတည့်သည့် အစားအစာများ၊ နှစ်ပတ်လည်ပွဲ၊ အထူး တောင်းဆိုချက်များ...' : 'Special requests, allergies, anniversary notes...'}" style="width: 100%; min-height: 72px; border: 1px solid #c7c5d0; border-radius: 10px; padding: 10px 14px; font-size: 13.5px; color: #1F2937; background: #f4f8fa; resize: none; outline: none;">${b.notes || ''}</textarea>
        </div>

        <!-- Action Buttons -->
        <div style="display: flex; gap: 12px; justify-content: flex-end; margin-top: 8px;">
          <button type="button" onclick="ScreenS03A.toggleEdit('${b.id}', false)" style="height: 46px; padding: 0 20px; background: #edeeef; color: #46464f; font-weight: 600; font-size: 14px; border-radius: 12px; border: none; cursor: pointer;">
            ${lang === 'mm' ? 'မလုပ်တော့ပါ' : 'Cancel'}
          </button>
          <button type="submit" class="stitch-register-btn" style="height: 46px; padding: 0 24px; font-size: 14px; max-width: 220px;">
            <span class="material-symbols-outlined" style="font-size: 20px;">save</span>
            ${lang === 'mm' ? 'ပြင်ဆင်ချက် သိမ်းမည်' : 'Save Changes'}
          </button>
        </div>

      </form>
      </div>
    `;
  }

  function render(params) {
    const id = (params && params.id) ? params.id : 'RES-2026-001';
    const queue = JSON.parse(localStorage.getItem('pending_bookings') || '[]');
    const list = [...queue, ...MockData.shopReservations];
    const b = list.find(r => r.id === id) || list[0] || MockData.shopReservations[0];

    const isEditing = !!isEditModeMap[b.id];
    const bodyHtml = isEditing ? buildEditHtml(b, false) : buildDetailHtml(b, false);

    const content = `
      ${bodyHtml}
    `;

    App.renderAdminPage('shop', I18n.t('s03_booking_details') || 'Booking Details', content);
  }

  function open(id, onUpdate) {
    close();

    const queue = JSON.parse(localStorage.getItem('pending_bookings') || '[]');
    const list = [...queue, ...MockData.shopReservations];
    const b = list.find(r => r.id === id) || list[0];
    if (!b) return;

    const isEditing = !!isEditModeMap[b.id];
    const bodyHtml = isEditing ? buildEditHtml(b, true) : buildDetailHtml(b, true);

    modalElement = document.createElement('div');
    modalElement.id = 's03a-detail-modal';
    modalElement.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(15, 23, 42, 0.45);
      backdrop-filter: blur(4px);
      z-index: 9999999;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px;
      font-family: 'Inter', sans-serif;
    `;

    modalElement.innerHTML = `
      <div id="s03a-modal-shell" class="card glass-card" style="width:100%; max-width:560px; max-height:90vh; overflow-y:auto; border-radius:20px; position:relative; box-shadow:var(--shadow-xl); background:linear-gradient(180deg, #fbfcfe 0%, #f3f7fa 100%); border:1px solid rgba(15,76,92,0.14); padding:20px;">
        <div class="flex justify-between items-center mb-4" style="border-bottom:1px solid rgba(15,76,92,0.1); padding-bottom:12px;">
          <h3 style="font-weight:700; color:var(--color-primary); font-size:18px; margin:0; font-family:'Outfit',sans-serif;">
            📖 ${I18n.t('booking_ledger')} ${isEditing ? 'Edit' : 'Details'}
          </h3>
          <button type="button" style="background:none; border:none; font-size:20px; cursor:pointer; color:var(--color-outline);" onclick="ScreenS03A.close()">✕</button>
        </div>
        ${bodyHtml}
      </div>
    `;

    document.body.appendChild(modalElement);
    modalElement.onUpdateCallback = onUpdate;
  }

  function close() {
    if (modalElement) {
      modalElement.remove();
      modalElement = null;
    }
  }

  function toggleEdit(id, enable) {
    isEditModeMap[id] = !!enable;
    if (modalElement) {
      const updateCb = modalElement.onUpdateCallback;
      open(id, updateCb);
    } else {
      render({ id });
    }
  }

  function saveEdit(e, id) {
    e.preventDefault();
    const name = document.getElementById('edit-name')?.value.trim();
    
    if (!Components.validatePhoneNumber('edit-phone')) {
      showToast('error', 'Validation Error', I18n.getLang() === 'mm' 
        ? 'ကျေးဇူးပြု၍ တရားဝင် မြန်မာဖုန်းနံပါတ် ၇ လုံးမှ ၉ လုံး ထည့်သွင်းပါ (ဥပမာ - ၉၄၅၀၀၀၀၀၀၀)' 
        : 'Please enter a valid Myanmar phone number (e.g., 9450000000).');
      return;
    }
    const phone = Components.getRawPhoneNumber('edit-phone');
    const date = document.getElementById('edit-date')?.value;
    const time = document.getElementById('edit-time')?.value;
    const guests = parseInt(document.getElementById('edit-guests')?.value || '4');
    const table = document.getElementById('edit-table')?.value;
    const notes = document.getElementById('edit-notes')?.value.trim();

    const tagCheckboxes = document.querySelectorAll('input[name="edit-seat-tag"]:checked');
    const selectedTags = Array.from(tagCheckboxes).map(cb => cb.value);

    if (!name || !phone) {
      showToast('error', 'Validation Error', 'Please fill required inputs.');
      return;
    }

    const res = MockData.shopReservations.find(r => r.id === id);
    if (res) {
      res.name = name;
      res.phone = phone;
      res.date = date;
      res.time = time;
      res.guests = guests;
      res.table = table;
      res.notes = notes;
      res.preferred_seat_tags = selectedTags;

      showToast('success', 'Booking Saved', `Reservation ${id} updated successfully.`);
      
      if (modalElement && modalElement.onUpdateCallback) {
        modalElement.onUpdateCallback();
      }
    }

    isEditModeMap[id] = false;
    if (modalElement) {
      open(id, modalElement.onUpdateCallback);
    } else {
      render({ id });
    }
  }

  function updateStatus(id, status) {
    const isModalOpen = modalElement !== null;
    const updateCb = modalElement ? modalElement.onUpdateCallback : null;

    const res = MockData.shopReservations.find(r => r.id === id);
    if (res) {
      const isManualUser = !res.user_id || res.user_id === 'null' || res.user_id === null;
      if (isManualUser && res.status === 'pending' && status === 'confirmed') {
        res.guest_phone_verified_at = new Date().toISOString();
        showToast('info', 'Verification Logged', 'Phone verification timestamp recorded.');
      }
      res.status = status;
      showToast('success', 'Status Updated', `Booking ${id} status updated to ${status.toUpperCase()}.`);
      
      if (updateCb) {
        updateCb();
      }
    }

    if (isModalOpen) {
      open(id, updateCb);
    } else {
      render({ id });
    }
  }

  function updateTable(id, newTable) {
    const res = MockData.shopReservations.find(r => r.id === id);
    if (res) {
      res.table = newTable;
      showToast('success', 'Table Updated', `Table ${newTable} assigned to booking ${id}.`);
      if (modalElement && modalElement.onUpdateCallback) {
        modalElement.onUpdateCallback();
      }
    }
  }

  function sendViber() {
    showToast('error', 'Enterprise Limit', I18n.t('s03_viber_paid_limitation'));
  }

  let undoModalEl = null;

  function openUndoNoShowModal(id) {
    const queue = JSON.parse(localStorage.getItem('pending_bookings') || '[]');
    const list = [...queue, ...MockData.shopReservations];
    const b = list.find(r => r.id === id);
    if (!b) return;

    const lang = I18n.getLang();
    closeUndoNoShowModal();

    undoModalEl = document.createElement('div');
    undoModalEl.id = 's03a-undo-modal';
    undoModalEl.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(15, 23, 42, 0.6);
      backdrop-filter: blur(4px);
      z-index: 10000000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px;
      font-family: 'Inter', sans-serif;
    `;

    undoModalEl.innerHTML = `
      <div class="card glass-card" style="width:100%; max-width:480px; border-radius:18px; position:relative; box-shadow:var(--shadow-xl); background:#FFFFFF; border:1px solid #E2E8F0; padding:24px;">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:16px;">
          <div style="display:flex; align-items:center; gap:10px;">
            <div style="width:36px; height:36px; border-radius:10px; background:#FEF3C7; color:#92400E; display:flex; align-items:center; justify-content:center; font-size:20px;">
              ↩️
            </div>
            <div>
              <h3 style="font-weight:700; color:#0F172A; font-size:16.5px; margin:0;">
                ${I18n.t('undo_no_show_modal_title')}
              </h3>
              <div style="font-size:12px; color:#64748B; margin-top:2px;">
                Booking #${b.id} • ${b.name} (${b.guests}p)
              </div>
            </div>
          </div>
          <button type="button" style="background:none; border:none; font-size:18px; cursor:pointer; color:#94A3B8;" onclick="ScreenS03A.closeUndoNoShowModal()">✕</button>
        </div>

        <div style="background:#FFFBEB; border:1px solid #FDE68A; border-radius:10px; padding:10px 14px; font-size:12px; color:#92400E; line-height:1.45; margin-bottom:16px;">
          ${I18n.t('undo_no_show_desc')}
        </div>

        <form onsubmit="ScreenS03A.submitUndoNoShow(event, '${b.id}')">
          <div style="margin-bottom:14px;">
            <label style="display:block; font-size:12.5px; font-weight:600; color:#334155; margin-bottom:6px;">
              ${I18n.t('undo_no_show_target_status')}
            </label>
            <select id="undo-target-status" style="width:100%; height:40px; border:1px solid #CBD5E1; border-radius:8px; padding:0 10px; font-size:13px; color:#0F172A; background:#F8FAFC; font-weight:600;">
              <option value="confirmed">${lang === 'mm' ? 'အတည်ပြုပြီး (Confirmed)' : 'Confirmed'}</option>
              <option value="checked_in">${lang === 'mm' ? 'ဆိုက်ရောက်ပြီး / ထိုင်ခုံချပြီး (Checked-In & Seated)' : 'Checked-In & Seated'}</option>
            </select>
          </div>

          <div style="margin-bottom:18px;">
            <label style="display:block; font-size:12.5px; font-weight:600; color:#334155; margin-bottom:6px;">
              ${I18n.t('undo_no_show_reason_label')} <span style="color:#EF4444;">*</span>
            </label>
            <textarea id="undo-reason" rows="3" required placeholder="${I18n.t('undo_no_show_reason_placeholder')}" style="width:100%; border:1px solid #CBD5E1; border-radius:8px; padding:8px 12px; font-size:13px; color:#0F172A; background:#F8FAFC; resize:none; outline:none;"></textarea>
          </div>

          <div style="display:flex; justify-content:flex-end; gap:10px;">
            <button type="button" onclick="ScreenS03A.closeUndoNoShowModal()" class="btn btn-sm btn-secondary" style="height:38px; padding:0 16px; font-size:13px; font-weight:600; border-radius:8px;">
              ${I18n.t('cancel')}
            </button>
            <button type="submit" class="btn btn-sm" style="height:38px; padding:0 18px; font-size:13px; font-weight:600; border-radius:8px; background:#D97706; border-color:#D97706; color:#FFFFFF;">
              ${I18n.t('undo_no_show_confirm_btn')}
            </button>
          </div>
        </form>
      </div>
    `;

    document.body.appendChild(undoModalEl);
  }

  function closeUndoNoShowModal() {
    if (undoModalEl) {
      undoModalEl.remove();
      undoModalEl = null;
    }
  }

  function submitUndoNoShow(e, id) {
    e.preventDefault();
    const targetStatus = document.getElementById('undo-target-status')?.value || 'confirmed';
    const reason = document.getElementById('undo-reason')?.value.trim();

    if (!reason) {
      showToast('error', 'Required Input', I18n.t('undo_no_show_error_reason'));
      return;
    }

    const res = MockData.shopReservations.find(r => r.id === id);
    if (res) {
      res.status = targetStatus;
      res.undo_no_show = {
        at: new Date().toISOString(),
        reason: reason,
        by: 'Shop Staff'
      };

      showToast('success', 'No-Show Reverted', I18n.t('undo_no_show_success'));
      closeUndoNoShowModal();

      const updateCb = modalElement ? modalElement.onUpdateCallback : null;
      if (updateCb) {
        updateCb();
      }

      if (modalElement) {
        open(id, updateCb);
      } else {
        render({ id });
      }
    }
  }

  return { 
    render, 
    open, 
    close, 
    toggleEdit, 
    saveEdit, 
    updateStatus, 
    updateTable, 
    sendViber,
    openUndoNoShowModal,
    closeUndoNoShowModal,
    submitUndoNoShow
  };
})();
