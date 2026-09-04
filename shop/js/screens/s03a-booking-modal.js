/* ============================================================
   EzBookNow Screen S-03-A — Booking Details Screen / Modal & Edit Mode
   Based on stitch ui draw / stitch_ezbooknow_enterprise_ui_design (7)
   Includes View Mode & Edit Mode with Table Assignment & Preferred Seat Tags
   ============================================================ */

const ScreenS03A = (() => {
  let modalElement = null;
  let isEditModeMap = {}; // Tracks edit mode state per reservation ID

  function buildDetailHtml(b, isModal = false) {
    // Status config
    const statusConfig = {
      confirmed: { label: I18n.t('booking_status_confirmed'), icon: 'check_circle', bg: '#d0e6ec', color: '#0F4C5C' },
      pending: { label: I18n.t('booking_status_pending'), icon: 'pending', bg: '#fbead1', color: '#854d0e' },
      checked_in: { label: I18n.t('booking_status_checked_in'), icon: 'how_to_reg', bg: '#dbeafe', color: '#1e40af' },
      completed: { label: I18n.t('booking_status_completed'), icon: 'task_alt', bg: '#dcfce7', color: '#166534' },
      cancelled: { label: I18n.t('booking_status_cancelled'), icon: 'cancel', bg: '#fee2e2', color: '#991b1b' },
      no_show: { label: I18n.t('booking_status_no_show'), icon: 'person_off', bg: '#fce7f3', color: '#9d174d' }
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
          <h2 style="font-family: 'Outfit', sans-serif; font-size: 28px; font-weight: 700; color: #0F4C5C; margin: 0 0 4px 0;">${I18n.t('booking_id_title', { id: b.id })}</h2>
          <p style="font-size: 13px; color: #46464f; margin: 0;">
            ${I18n.t('booking_created_on', { date: b.submittedAt ? b.submittedAt.split('T')[0] : '2026-10-24' })}
          </p>
        </div>

        <!-- Customer Info Card -->
        <div class="stitch-card" style="margin-bottom: 24px;">
          <span class="stitch-label">${I18n.t('customer_info')}</span>
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
              ${b.guest_phone_verified_at ? `<div style="font-size: 11px; color: #2e7d32; margin-top: 4px; font-weight: 600;">${I18n.t('phone_verified_badge')}</div>` : ''}
            </div>
            <button type="button" onclick="ScreenS03A.sendViber()" style="width: 42px; height: 42px; border-radius: 50%; background: #edeeef; border: none; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #0F4C5C; transition: transform 0.15s;" title="Send Message">
              <span class="material-symbols-outlined" style="font-size: 20px;">chat</span>
            </button>
          </div>
        </div>

        <!-- Booking Summary Bento Section -->
        <div style="margin-bottom: 24px;">
          <span class="stitch-label">${I18n.t('booking_summary_title')}</span>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px;">
            
            <!-- Date Card -->
            <div class="stitch-card" style="margin-bottom: 0; padding: 14px; display: flex; flex-direction: column;">
              <span class="material-symbols-outlined" style="color: #0F4C5C; font-size: 24px; margin-bottom: 6px;">calendar_month</span>
              <span style="font-size: 11px; color: #46464f; font-weight: 500;">${I18n.t('date')}</span>
              <span style="font-family: 'Outfit', sans-serif; font-size: 18px; font-weight: 700; color: #0F4C5C;">${b.date}</span>
            </div>

            <!-- Time Card -->
            <div class="stitch-card" style="margin-bottom: 0; padding: 14px; display: flex; flex-direction: column;">
              <span class="material-symbols-outlined" style="color: #0F4C5C; font-size: 24px; margin-bottom: 6px;">schedule</span>
              <span style="font-size: 11px; color: #46464f; font-weight: 500;">${I18n.t('time')}</span>
              <span style="font-family: 'Outfit', sans-serif; font-size: 18px; font-weight: 700; color: #0F4C5C;">${b.time}</span>
            </div>

            <!-- Guests Card -->
            <div class="stitch-card" style="margin-bottom: 0; padding: 14px; display: flex; flex-direction: column;">
              <span class="material-symbols-outlined" style="color: #0F4C5C; font-size: 24px; margin-bottom: 6px;">groups</span>
              <span style="font-size: 11px; color: #46464f; font-weight: 500;">${I18n.t('guests')}</span>
              <span style="font-family: 'Outfit', sans-serif; font-size: 18px; font-weight: 700; color: #0F4C5C;">${b.guests} ${I18n.t('guests_unit')}</span>
            </div>

            <!-- Table Card -->
            <div class="stitch-card" style="margin-bottom: 0; padding: 14px; display: flex; flex-direction: column;">
              <span class="material-symbols-outlined" style="color: #0F4C5C; font-size: 24px; margin-bottom: 6px;">restaurant_menu</span>
              <span style="font-size: 11px; color: #46464f; font-weight: 500;">${I18n.t('assigned_table')}</span>
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
                ${I18n.t('venue_address')}
              </p>
            </div>
          </div>
        </div>

        <!-- Special Requests Section -->
        <div class="stitch-card" style="margin-bottom: 24px;">
          <span class="stitch-label">${I18n.t('special_requests_tags_title')}</span>
          <div style="display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 10px;">
            ${seatTags.map(t => {
              return `<span style="background: #d0e6ec; color: #0F4C5C; border: 1px solid #98c9d4; font-size: 11.5px; font-weight: 600; padding: 4px 10px; border-radius: 20px;">${I18n.getSeatTagLabel(t)}</span>`;
            }).join('')}
          </div>
          <p style="font-size: 13.5px; color: #46464f; font-style: italic; margin: 0;">
            "${b.notes || I18n.t('no_special_requests')}"
          </p>
        </div>

        ${b.undo_no_show ? `
          <!-- Undo No-Show Audit Log -->
          <div class="stitch-card" style="margin-bottom: 24px; background: #FEF3C7; border: 1px solid #FCD34D;">
            <span class="stitch-label" style="color: #92400E; margin-bottom: 6px;">${I18n.t('undo_no_show_audit_title')}</span>
            <div style="font-size: 13px; color: #92400E; font-weight: 700; display:flex; align-items:center; gap:6px; margin-bottom: 4px;">
              <span class="material-symbols-outlined" style="font-size: 18px;">history</span>
              <span>${I18n.t('undo_no_show_reverted_log', { date: b.undo_no_show.at ? b.undo_no_show.at.split('T')[0] : '2026-07-20' })}</span>
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
              ${I18n.t('btn_confirm_booking')}
            </button>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
              <button type="button" onclick="ScreenS03A.toggleEdit('${b.id}', true)" style="height: 44px; background: #edeeef; color: #0F4C5C; font-weight: 600; font-size: 13.5px; border-radius: 12px; border: none; display: flex; align-items: center; justify-content: center; gap: 6px; cursor: pointer;">
                <span class="material-symbols-outlined" style="font-size: 18px;">edit</span>
                ${I18n.t('edit')}
              </button>
              <button type="button" onclick="ScreenS03A.updateStatus('${b.id}', 'cancelled')" style="height: 44px; background: #ffdad6; color: #93000a; font-weight: 600; font-size: 13.5px; border-radius: 12px; border: none; display: flex; align-items: center; justify-content: center; gap: 6px; cursor: pointer;">
                <span class="material-symbols-outlined" style="font-size: 18px;">cancel</span>
                ${I18n.t('cancel')}
              </button>
            </div>
          ` : ''}

          <!-- CONFIRMED -->
          ${b.status === 'confirmed' ? `
            <button type="button" onclick="ScreenS03A.updateStatus('${b.id}', 'checked_in')" class="stitch-register-btn" style="height: 48px; font-size: 14.5px;">
              <span class="material-symbols-outlined" style="font-size: 20px;">how_to_reg</span>
              ${I18n.t('btn_check_in_now')}
            </button>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
              <button type="button" onclick="ScreenS03A.toggleEdit('${b.id}', true)" style="height: 44px; background: #edeeef; color: #0F4C5C; font-weight: 600; font-size: 13.5px; border-radius: 12px; border: none; display: flex; align-items: center; justify-content: center; gap: 6px; cursor: pointer;">
                <span class="material-symbols-outlined" style="font-size: 18px;">edit</span>
                ${I18n.t('edit')}
              </button>
              <button type="button" onclick="ScreenS03A.updateStatus('${b.id}', 'no_show')" style="height: 44px; background: #fce7f3; color: #9d174d; font-weight: 600; font-size: 13.5px; border-radius: 12px; border: none; display: flex; align-items: center; justify-content: center; gap: 6px; cursor: pointer;">
                <span class="material-symbols-outlined" style="font-size: 18px;">person_off</span>
                ${I18n.t('no_show')}
              </button>
            </div>
          ` : ''}

          <!-- CHECKED_IN -->
          ${b.status === 'checked_in' ? `
            <button type="button" onclick="ScreenS03A.updateStatus('${b.id}', 'completed')" class="stitch-register-btn" style="height: 48px; font-size: 14.5px; background: #0F4C5C !important; color: #ffffff !important;">
              <span class="material-symbols-outlined" style="font-size: 20px;">task_alt</span>
              ${I18n.t('btn_complete_reservation')}
            </button>
            <div style="display: flex; gap: 10px; justify-content: flex-end;">
              <button type="button" onclick="ScreenS03A.toggleEdit('${b.id}', true)" style="height: 44px; width: 100%; background: #edeeef; color: #0F4C5C; font-weight: 600; font-size: 13.5px; border-radius: 12px; border: none; display: flex; align-items: center; justify-content: center; gap: 6px; cursor: pointer;">
                <span class="material-symbols-outlined" style="font-size: 18px;">edit</span>
                ${I18n.t('edit')}
              </button>
            </div>
          ` : ''}

          <!-- NO_SHOW STATE -->
          ${b.status === 'no_show' ? `
            <button type="button" onclick="ScreenS03A.openUndoNoShowModal('${b.id}')" class="stitch-register-btn" style="height: 48px; font-size: 14.5px; background: #D97706 !important; color: #ffffff !important;">
              <span class="material-symbols-outlined" style="font-size: 20px;">undo</span>
              ${I18n.t('btn_undo_no_show')}
            </button>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
              <button type="button" onclick="ScreenS03A.sendViber()" style="height: 44px; background: #fbead1; color: #D8902F; border: 1px solid #D8902F; font-weight: 600; font-size: 13.5px; border-radius: 12px; display: flex; align-items: center; justify-content: center; gap: 6px; cursor: pointer;">
                <span class="material-symbols-outlined" style="font-size: 18px;">chat</span>
                ${I18n.t('btn_viber_notify')}
              </button>
              <button type="button" onclick="ScreenS03A.close()" style="height: 44px; background: #edeeef; color: #0F4C5C; font-weight: 600; font-size: 13.5px; border-radius: 12px; border: none; cursor: pointer;">
                ${I18n.t('close')}
              </button>
            </div>
          ` : ''}

          <!-- COMPLETED / CANCELLED -->
          ${(b.status === 'completed' || b.status === 'cancelled') ? `
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
              <button type="button" onclick="ScreenS03A.sendViber()" style="height: 44px; background: #fbead1; color: #D8902F; border: 1px solid #D8902F; font-weight: 600; font-size: 13.5px; border-radius: 12px; display: flex; align-items: center; justify-content: center; gap: 6px; cursor: pointer;">
                <span class="material-symbols-outlined" style="font-size: 18px;">chat</span>
                ${I18n.t('btn_viber_notify')}
              </button>
              <button type="button" onclick="ScreenS03A.close()" style="height: 44px; background: #edeeef; color: #0F4C5C; font-weight: 600; font-size: 13.5px; border-radius: 12px; border: none; cursor: pointer;">
                ${I18n.t('close')}
              </button>
            </div>
          ` : ''}
        </div>

      </div>
    `;
  }

  function buildEditHtml(b, isModal = false) {
    const allSeatTags = [
      { code: 'Window View' },
      { code: 'Quiet Area' },
      { code: 'Near TV' },
      { code: 'Outdoor / Smoking' },
      { code: 'VIP Area' }
    ];

    const currentTags = b.preferred_seat_tags || ['Window View'];
    const tableList = MockData.tables || [];
    const tableOptionsHtml = tableList.map(t => `<option value="${t.name}" ${b.table === t.name ? 'selected' : ''}>${t.name} (${t.seats} ${I18n.t('table_seats_unit')} · ${t.type})</option>`).join('');

    return `
      <div id="s03a-screen">
      <form id="s03a-edit-form" onsubmit="ScreenS03A.saveEdit(event, '${b.id}')" style="${isModal ? 'max-width: 520px; width: 100%;' : 'max-width: 720px; margin: 0 auto;'} display: flex; flex-direction: column; gap: 16px; padding-bottom: 24px;">
        
        <!-- Edit Mode Header -->
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e1e3e4; padding-bottom: 12px; margin-bottom: 4px;">
          <div>
            <h3 style="font-family: 'Outfit', sans-serif; font-size: 20px; font-weight: 700; color: #0F4C5C; margin: 0;">
              ✏️ ${I18n.t('edit_booking_title', { id: b.id })}
            </h3>
            <p style="font-size: 13px; color: #46464f; margin: 2px 0 0 0;">
              ${I18n.t('edit_booking_subtitle')}
            </p>
          </div>
        </div>

        <!-- CUSTOMER INFORMATION Edit Card -->
        <div class="stitch-card" style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 0;">
          <span class="stitch-label" style="margin-bottom: 0;">${I18n.t('s03_customer_info_edit')}</span>
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
          <span class="stitch-label" style="margin-bottom: 0;">${I18n.t('schedule_and_guests')}</span>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
            <div style="display: flex; flex-direction: column; gap: 4px;">
              <label style="font-size: 12px; font-weight: 500; color: #46464f;">${I18n.t('date')}</label>
              <input type="date" id="edit-date" value="${b.date || '2026-07-20'}" style="width: 100%; height: 42px; border: 1px solid #c7c5d0; border-radius: 10px; padding: 0 12px; font-size: 13.5px; background: #f4f8fa;" required />
            </div>
            <div style="display: flex; flex-direction: column; gap: 4px;">
              <label style="font-size: 12px; font-weight: 500; color: #46464f;">${I18n.t('time')}</label>
              <input type="time" id="edit-time" value="${b.time || '19:00'}" style="width: 100%; height: 42px; border: 1px solid #c7c5d0; border-radius: 10px; padding: 0 12px; font-size: 13.5px; background: #f4f8fa;" required />
            </div>
          </div>
          <div style="display: flex; flex-direction: column; gap: 4px;">
            <label style="font-size: 12px; font-weight: 500; color: #46464f;">${I18n.t('total_guests')}</label>
            <input type="number" id="edit-guests" min="1" max="50" value="${b.guests || 4}" style="width: 100%; height: 42px; border: 1px solid #c7c5d0; border-radius: 10px; padding: 0 14px; font-size: 14px; background: #f4f8fa;" required />
          </div>
        </div>

        <!-- TABLE ASSIGNMENT & SEATING TAGS Edit Card -->
        <div class="stitch-card" style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 0;">
          <span class="stitch-label" style="margin-bottom: 0;">${I18n.t('table_assignment_and_prefs')}</span>
          <div style="display: flex; flex-direction: column; gap: 4px;">
            <label style="font-size: 12.5px; font-weight: 500; color: #46464f;">${I18n.t('assigned_table_field')}</label>
            <select id="edit-table" style="width: 100%; height: 44px; border: 1px solid #c7c5d0; border-radius: 10px; padding: 0 14px; font-size: 14px; font-weight: 600; color: #0F4C5C; background: #f4f8fa;">
              ${tableOptionsHtml}
            </select>
          </div>
          <div style="display: flex; flex-direction: column; gap: 6px; margin-top: 4px;">
            <label style="font-size: 12.5px; font-weight: 500; color: #46464f;">${I18n.t('preferred_seat_tags_field')}</label>
            <div style="display: flex; gap: 8px; flex-wrap: wrap;" id="edit-seat-tags-container">
              ${allSeatTags.map(tag => {
                const isSelected = currentTags.includes(tag.code);
                const label = I18n.getSeatTagLabel(tag.code);
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
          <span class="stitch-label">${I18n.t('special_requests_notes')}</span>
          <textarea id="edit-notes" placeholder="${I18n.t('special_requests_edit_placeholder')}" style="width: 100%; min-height: 72px; border: 1px solid #c7c5d0; border-radius: 10px; padding: 10px 14px; font-size: 13.5px; color: #1F2937; background: #f4f8fa; resize: none; outline: none;">${b.notes || ''}</textarea>
        </div>

        <!-- Action Buttons -->
        <div style="display: flex; gap: 12px; justify-content: flex-end; margin-top: 8px;">
          <button type="button" onclick="ScreenS03A.toggleEdit('${b.id}', false)" style="height: 46px; padding: 0 20px; background: #edeeef; color: #46464f; font-weight: 600; font-size: 14px; border-radius: 12px; border: none; cursor: pointer;">
            ${I18n.t('cancel')}
          </button>
          <button type="submit" class="stitch-register-btn" style="height: 46px; padding: 0 24px; font-size: 14px; max-width: 220px;">
            <span class="material-symbols-outlined" style="font-size: 20px;">save</span>
            ${I18n.t('btn_save_changes')}
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
    modalElement.className = 'modal-backdrop s03a-modal-backdrop';
    modalElement.onclick = (e) => {
      if (e.target === modalElement) close();
    };

    modalElement.innerHTML = `
      <div id="s03a-modal-shell" class="card glass-card s03a-sheet" onclick="event.stopPropagation()">
        <div class="flex justify-between items-center mb-4" style="border-bottom:1px solid rgba(15,76,92,0.1); padding-bottom:12px;">
          <h3 style="font-weight:700; color:var(--color-primary); font-size:18px; margin:0; font-family:'Outfit',sans-serif; display:flex; align-items:center; gap:6px;">
            <span class="material-symbols-outlined" style="font-size:22px;">menu_book</span>
            <span>${I18n.t('booking_ledger')} ${isEditing ? I18n.t('edit') : I18n.t('details')}</span>
          </h3>
          <button type="button" class="modal__close" style="min-width:44px; min-height:44px; width:44px; height:44px; font-size:20px; cursor:pointer;" title="Close" onclick="ScreenS03A.close()">✕</button>
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
      showToast('error', I18n.t('validation_error'), I18n.t('phone_validation_msg'));
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
      showToast('error', I18n.t('validation_error'), I18n.t('fill_required_fields'));
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

      showToast('success', I18n.t('booking_saved_title'), I18n.t('booking_saved_msg', { id }));
      
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
        showToast('info', I18n.t('verification_logged_title'), I18n.t('verification_logged_msg'));
      }
      res.status = status;
      showToast('success', I18n.t('status_updated_title'), I18n.t('status_updated_msg', { id, status: status.toUpperCase() }));
      
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
      showToast('success', I18n.t('table_updated_title'), I18n.t('table_updated_msg', { table: newTable, id }));
      if (modalElement && modalElement.onUpdateCallback) {
        modalElement.onUpdateCallback();
      }
    }
  }

  function sendViber() {
    showToast('error', I18n.t('enterprise_limit_title'), I18n.t('s03_viber_paid_limitation'));
  }

  let undoModalEl = null;

  function openUndoNoShowModal(id) {
    const queue = JSON.parse(localStorage.getItem('pending_bookings') || '[]');
    const list = [...queue, ...MockData.shopReservations];
    const b = list.find(r => r.id === id);
    if (!b) return;

    closeUndoNoShowModal();

    undoModalEl = document.createElement('div');
    undoModalEl.id = 's03a-undo-modal';
    undoModalEl.className = 'modal-backdrop s03a-undo-backdrop';
    undoModalEl.onclick = (e) => {
      if (e.target === undoModalEl) closeUndoNoShowModal();
    };

    undoModalEl.innerHTML = `
      <div class="card glass-card s03a-undo-sheet" onclick="event.stopPropagation()" style="width:100%; max-width:480px; border-radius:18px; position:relative; box-shadow:var(--shadow-xl); background:#FFFFFF; border:1px solid #E2E8F0; padding:24px;">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:16px;">
          <div style="display:flex; align-items:center; gap:10px;">
            <div style="width:36px; height:36px; border-radius:10px; background:#FEF3C7; color:#92400E; display:flex; align-items:center; justify-content:center; font-size:20px;">
              <span class="material-symbols-outlined" style="font-size:20px;">undo</span>
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
          <button type="button" class="modal__close" style="min-width:44px; min-height:44px; width:44px; height:44px; font-size:18px; cursor:pointer;" title="Close" onclick="ScreenS03A.closeUndoNoShowModal()">✕</button>
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
              <option value="confirmed">${I18n.t('undo_no_show_confirmed_option')}</option>
              <option value="checked_in">${I18n.t('undo_no_show_checked_in_option')}</option>
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
      showToast('error', I18n.t('required_input'), I18n.t('undo_no_show_error_reason'));
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

      showToast('success', I18n.t('undo_no_show_success_title'), I18n.t('undo_no_show_success'));
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
