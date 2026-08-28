/* ============================================================
   EzBookNow Screen S-08 — Staff & Table Management Master Data (Pkg1 Core)
   Restricted to shop_owner role only (C-07 / C-15 Master Data)
   ============================================================ */

const ScreenS08 = (() => {
  let activeTab = 'staff'; // 'staff' | 'tables'
  let tableSearchQuery = '';
  let selectedTagFilter = 'all';

  const SEAT_TAG_DEFINITIONS = [
    { code: 'tv_front', label_mm: 'တီဗွီရှေ့', label_en: 'TV Front', icon: 'tv', color: '#0284c7', bg: '#e0f2fe' },
    { code: 'stage_front', label_mm: 'စင်မြင့်/တီးဝိုင်းအနီး', label_en: 'Stage/Band Front', icon: 'mic', color: '#9333ea', bg: '#f3e8ff' },
    { code: 'quiet', label_mm: 'တိတ်ဆိတ်သောစားပွဲ', label_en: 'Quiet Zone', icon: 'volume_off', color: '#166534', bg: '#dcfce7' },
    { code: 'window', label_mm: 'ပြတင်းပေါက်အနီး', label_en: 'Window Seat', icon: 'window', color: '#d97706', bg: '#fef3c7' },
    { code: 'outdoor', label_mm: 'ပြင်ပ/ဝရန်တာ', label_en: 'Outdoor / Veranda', icon: 'deck', color: '#059669', bg: '#d1fae5' },
    { code: 'private_room', label_mm: 'သီးသန့်ခန်း', label_en: 'Private Room', icon: 'meeting_room', color: '#dc2626', bg: '#fee2e2' },
    { code: 'counter', label_mm: 'ကောင်တာဝိုင်း', label_en: 'Bar Counter', icon: 'local_bar', color: '#4f46e5', bg: '#e0e7ff' },
    { code: 'near_entrance', label_mm: 'ဝင်ပေါက်အနီး', label_en: 'Near Entrance', icon: 'door_front', color: '#4b5563', bg: '#f3f4f6' }
  ];

  function getTagMeta(code) {
    return SEAT_TAG_DEFINITIONS.find(t => t.code === code) || {
      code,
      label_mm: code,
      label_en: code,
      icon: 'tag',
      color: '#4b5563',
      bg: '#f3f4f6'
    };
  }

  function setTestRole(role) {
    Router.authState.shop.role = role;
    showToast('info', 'Role Changed', `Permission role switched to: ${role}`);
    render();
  }

  function render() {
    const lang = I18n.getLang();
    const auth = Router.getAuth();
    const isOwner = auth.role === 'shop_owner';
    const staffList = MockData.staffMembers || [];
    const tableList = MockData.tables || [];

    // Debug testing bar for role switching
    const debugRoleBar = `
      <div class="card p-3 mb-4 bg-surface-container-low flex justify-between items-center" style="border:1px dashed var(--color-outline-variant); border-radius:var(--radius-md);">
        <span style="font-size:13px; font-weight:600; color:var(--color-primary); display:flex; align-items:center; gap:6px;">
          🧪 Debug Testing: Toggle shop permissions (C-07 / C-15 Master Data)
        </span>
        <div class="flex gap-2">
          <button class="btn btn-sm ${isOwner ? 'btn-primary' : 'btn-secondary'}" onclick="ScreenS08.setTestRole('shop_owner')" style="padding:4px 10px; font-size:12px;">
            Shop Owner (Full Access)
          </button>
          <button class="btn btn-sm ${!isOwner ? 'btn-primary' : 'btn-secondary'}" onclick="ScreenS08.setTestRole('shop_staff')" style="padding:4px 10px; font-size:12px;">
            Shop Staff (Read-Only / Restricted)
          </button>
        </div>
      </div>
    `;

    // Role Limit Warning Banner if shop_staff
    const warningBanner = !isOwner ? `
      <div class="p-3 mb-4 bg-error-container text-on-error-container flex items-center gap-2" style="border-radius:var(--radius-md); font-weight:600; font-size:13px; border: 1px solid var(--color-error);">
        🚫 ${lang === 'mm' ? 'ဝင်ရောက်ခွင့် မရှိပါ: ဤ S-08 ဝန်ထမ်းနှင့် စားပွဲစီမံခန့်ခွဲမှု (Master Data) မျက်နှာပြင်ကို ဆိုင်ပိုင်ရှင် (Shop Owner) တစ်ဦးတည်းသာ ဝင်ရောက်ပြင်ဆင်ခွင့် ရှိပါသည်။ (Role Limit: C-07 / C-15)' : 'Access Restricted: Only the Shop Owner (shop_owner) has permission to create and modify Staff & Table master data (C-07 / C-15).'}
      </div>
    ` : '';

    // Navigation Tabs
    const tabsHtml = `
      <div style="display: flex; gap: 8px; margin-bottom: 16px; border-bottom: 2px solid var(--color-surface-container); padding-bottom: 4px;">
        <button class="btn ${activeTab === 'staff' ? 'btn-primary' : 'btn-ghost'}" onclick="ScreenS08.switchTab('staff')" style="display: flex; align-items: center; gap: 8px;">
          <span class="material-symbols-outlined" style="font-size: 18px;">badge</span>
          ${lang === 'mm' ? 'ဝန်ထမ်း စီမံခန့်ခွဲခြင်း (Staff C-15)' : 'Staff Management (C-15)'}
          <span class="badge badge--info" style="font-size: 11px;">${staffList.length}</span>
        </button>
        <button class="btn ${activeTab === 'tables' ? 'btn-primary' : 'btn-ghost'}" onclick="ScreenS08.switchTab('tables')" style="display: flex; align-items: center; gap: 8px;">
          <span class="material-symbols-outlined" style="font-size: 18px;">table_restaurant</span>
          ${lang === 'mm' ? 'စားပွဲစီမံခန့်ခွဲခြင်း & Tags (Tables C-07)' : 'Table Management & Tags (C-07)'}
          <span class="badge badge--info" style="font-size: 11px;">${tableList.length}</span>
        </button>
      </div>
    `;

    // STAFF MANAGEMENT SECTION (C-15)
    const staffSectionHtml = `
      <div class="card flex flex-col gap-4">
        <div class="flex justify-between items-center border-bottom pb-3" style="border-bottom:1px solid var(--color-surface-container);">
          <div>
            <h3 class="text-label-md" style="font-weight:700; color:var(--color-primary); font-size:16px;">
              👥 ${lang === 'mm' ? 'ဆိုင်ဝန်ထမ်းများ စာရင်း (Staff Accounts & Roles)' : 'Shop Staff & Account Management'}
            </h3>
            <p style="font-size:12px; color:var(--color-outline); margin:2px 0 0 0;">
              ${lang === 'mm' ? 'ဝန်ထမ်းများ၏ ရာထူး၊ ကိုယ်ရေးအကျဉ်း၊ ဘွတ်ကင်လက်ခံမှုနှင့် စနစ်ဝင်ရောက်ခွင့် အကောင့်များကို စီမံရန်' : 'Manage staff roles, bios, booking availability toggle, and app login credentials.'}
            </p>
          </div>
          ${isOwner ? `
            <button class="btn btn-primary btn-sm" onclick="ScreenS08.openStaffModal()">
              <span class="material-symbols-outlined" style="font-size: 16px;">add</span>
              ${lang === 'mm' ? 'ဝန်ထမ်း အသစ်ထည့်မည်' : 'Add New Staff'}
            </button>
          ` : ''}
        </div>

        <!-- Staff Members Grid -->
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 14px;">
          ${staffList.map((st, idx) => {
            const acceptsBooking = st.accepts_booking !== false;
            const initials = st.avatar || (st.name ? st.name.split(' ').map(n=>n[0]).join('').slice(0,2).toUpperCase() : 'S');
            const bgColors = ['#84cc16', '#0284c7', '#9333ea', '#d97706', '#059669', '#dc2626', '#4f46e5'];
            const avatarBg = bgColors[idx % bgColors.length];

            const avatarHtml = `
              <div style="width:48px; height:48px; min-width:48px; border-radius:50%; overflow:hidden; position:relative; background:${avatarBg}; color:#ffffff; font-weight:700; font-size:16px; display:flex; align-items:center; justify-content:center; border:2px solid var(--color-surface-container); box-shadow:0 2px 4px rgba(0,0,0,0.08); flex-shrink:0;">
                ${st.avatar_url ? `
                  <img src="${st.avatar_url}" onerror="this.style.display='none';" style="position:absolute; top:0; left:0; width:100%; height:100%; object-fit:cover;" />
                ` : ''}
                <span>${initials}</span>
              </div>
            `;

            return `
              <div class="card p-3 flex flex-col justify-between" style="background:linear-gradient(145deg, #ffffff 0%, #f6f9fc 100%); border:1px solid rgba(15,76,92,0.12); border-radius:14px; box-shadow:0 2px 6px rgba(15,76,92,0.03);">
                
                <!-- Staff Header -->
                <div style="display:flex; gap:12px; align-items:flex-start;">
                  ${avatarHtml}
                  <div style="flex:1;">
                    <div style="display:flex; justify-content:space-between; align-items:flex-start;">
                      <span style="font-weight:700; font-size:15px; color:#191c1d;">${st.name}</span>
                      <span style="font-size:11px; font-weight:600; padding:2px 8px; border-radius:999px; background:#e0f2fe; color:#0369a1;">
                        ${st.job_title || st.role || 'Staff'}
                      </span>
                    </div>
                    <div style="font-size:12px; color:#46464f; margin-top:2px; display:flex; align-items:center; gap:6px;">
                      <span class="material-symbols-outlined" style="font-size:14px;">call</span> ${st.phone || '+95 9 ...'}
                      <span style="color:#c7c5d0;">•</span> ${st.shift || 'Full Day'}
                    </div>
                  </div>
                </div>

                <!-- Bio -->
                <p style="font-size:12px; color:#46464f; margin:10px 0; background:#f0f4f7; padding:8px 10px; border-radius:8px; border:1px solid rgba(15,76,92,0.08); font-style:italic;">
                  "${st.bio || (lang === 'mm' ? 'ကိုယ်ရေးအကျဉ်း ထည့်သွင်းမထားပါ' : 'No bio provided.')}"
                </p>

                <!-- Status & Booking Accept Toggle -->
                <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid #f0f1f2; padding-top:10px; margin-top:4px;">
                  <div>
                    <span style="font-size:11px; color:#46464f; display:block;">${lang === 'mm' ? 'ဘွတ်ကင် လက်ခံမှု' : 'Booking Status'}</span>
                    <button type="button" ${isOwner ? `onclick="ScreenS08.toggleStaffBooking(${idx})"` : 'disabled'} style="border:none; background:none; padding:0; cursor:${isOwner ? 'pointer' : 'default'};">
                      <span class="badge ${acceptsBooking ? 'badge--success' : 'badge--neutral'}" style="font-size:11px; display:inline-flex; align-items:center; gap:4px;">
                        ${acceptsBooking ? '🟢 ' + (lang === 'mm' ? 'ဘွတ်ကင် လက်ခံမည်' : 'Accepts Booking') : '⚪ ' + (lang === 'mm' ? 'မလက်ခံပါ' : 'No Direct Booking')}
                      </span>
                    </button>
                  </div>

                  <div style="text-align:right;">
                    <span style="font-size:11px; color:#46464f; display:block;">${lang === 'mm' ? 'စနစ် အကောင့်' : 'Account'}</span>
                    <span style="font-size:11px; font-weight:600; color:${st.account_username ? '#15803d' : '#6b7280'};">
                      ${st.account_username ? `@${st.account_username}` : (lang === 'mm' ? 'အကောင့်မရှိသေးပါ' : 'No App Account')}
                    </span>
                  </div>
                </div>

                <!-- Staff Action Buttons -->
                ${isOwner ? `
                  <div style="display:flex; gap:6px; margin-top:12px; border-top:1px dashed #e1e3e4; padding-top:8px; justify-content:flex-end;">
                    <button class="btn btn-ghost btn-sm" onclick="ScreenS08.openStaffModal(${idx})" style="font-size:12px;">
                      <span class="material-symbols-outlined" style="font-size:14px;">edit</span>
                      ${lang === 'mm' ? 'ပြင်ဆင်မည်' : 'Edit'}
                    </button>
                    <button class="btn btn-ghost btn-sm" style="color:var(--color-error); font-size:12px;" onclick="ScreenS08.deleteStaff(${idx})">
                      <span class="material-symbols-outlined" style="font-size:14px;">delete</span>
                      ${lang === 'mm' ? 'ဖျက်မည်' : 'Delete'}
                    </button>
                  </div>
                ` : ''}

              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;

    // TABLE MANAGEMENT SECTION (C-07)
    const filteredTables = tableList.filter(tb => {
      const matchSearch = tb.name.toLowerCase().includes(tableSearchQuery.toLowerCase()) || (tb.type || '').toLowerCase().includes(tableSearchQuery.toLowerCase());
      const matchTag = selectedTagFilter === 'all' || (tb.seat_tags || []).includes(selectedTagFilter);
      return matchSearch && matchTag;
    });

    const tablesSectionHtml = `
      <div class="card flex flex-col gap-4">
        
        <!-- Header -->
        <div class="flex justify-between items-center border-bottom pb-3" style="border-bottom:1px solid var(--color-surface-container); flex-wrap:wrap; gap:10px;">
          <div>
            <h3 class="text-label-md" style="font-weight:700; color:var(--color-primary); font-size:16px;">
              🪑 ${lang === 'mm' ? 'စားပွဲဝိုင်းများနှင့် လက္ခဏာ Tag များ စီမံခြင်း' : 'Table Master Data & Seat Attribute Tags'}
            </h3>
            <p style="font-size:12px; color:var(--color-outline); margin:2px 0 0 0;">
              ${lang === 'mm' ? 'စားပွဲဝိုင်း အရေအတွက်၊ ဆံ့ဝင်လူဦးရေ (Capacity) နှင့် စားပွဲ လက္ခဏာ Tag များကို ကြိုတင်သတ်မှတ်ရန်' : 'Register table capacities and seat attributes (seat_tags) for client table matching.'}
            </p>
          </div>
          ${isOwner ? `
            <button class="btn btn-primary btn-sm" onclick="ScreenS08.openTableModal()">
              <span class="material-symbols-outlined" style="font-size: 16px;">add</span>
              ${lang === 'mm' ? 'စားပွဲ အသစ်ထည့်မည်' : 'Add New Table'}
            </button>
          ` : ''}
        </div>

        <!-- Seat Attribute Tags Overview Banner -->
        <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:12px; margin-bottom:4px;">
          <div style="font-size:12px; font-weight:700; color:#0f172a; margin-bottom:8px; display:flex; align-items:center; gap:6px;">
            🏷️ ${lang === 'mm' ? 'စနစ်တွင်း သတ်မှတ်ထားသော စားပွဲ Tag များ (Seat Tags Library):' : 'Available Seat Attribute Tags (Seat Tags Library):'}
          </div>
          <div style="display:flex; flex-wrap:wrap; gap:6px;">
            ${SEAT_TAG_DEFINITIONS.map(t => {
              const tagLabel = lang === 'mm' ? t.label_mm : t.label_en;
              const isSelected = selectedTagFilter === t.code;
              return `
                <button type="button" onclick="ScreenS08.setTagFilter('${t.code}')" style="display:flex; align-items:center; gap:4px; padding:4px 10px; border-radius:16px; font-size:11.5px; font-weight:600; border:1px solid ${isSelected ? t.color : '#cbd5e1'}; background:${isSelected ? t.bg : '#ffffff'}; color:${isSelected ? t.color : '#334155'}; cursor:pointer;">
                  <span class="material-symbols-outlined" style="font-size:14px;">${t.icon}</span>
                  ${tagLabel}
                </button>
              `;
            }).join('')}
            ${selectedTagFilter !== 'all' ? `
              <button type="button" onclick="ScreenS08.setTagFilter('all')" style="padding:4px 10px; border-radius:16px; font-size:11.5px; font-weight:600; border:1px solid #cbd5e1; background:#e2e8f0; color:#334155; cursor:pointer;">
                ✕ Clear Filter
              </button>
            ` : ''}
          </div>
        </div>

        <!-- Search Bar -->
        <div style="display:flex; justify-content:space-between; align-items:center; gap:10px; margin-bottom:4px;">
          <div style="position:relative; flex:1; max-width:320px;">
            <span class="material-symbols-outlined" style="position:absolute; left:10px; top:50%; transform:translateY(-50%); font-size:18px; color:#94a3b8;">search</span>
            <input type="text" placeholder="${lang === 'mm' ? 'စားပွဲအမည် ဖြင့် ရှာမည်...' : 'Search tables...'}" value="${tableSearchQuery}" oninput="ScreenS08.handleSearch(this.value)" style="width:100%; height:36px; padding-left:34px; padding-right:12px; border:1px solid #cbd5e1; border-radius:8px; font-size:13px; outline:none;" />
          </div>
          <span style="font-size:12px; color:#64748b; font-weight:600;">
            ${lang === 'mm' ? `စားပွဲ စုစုပေါင်း: ${filteredTables.length} ဝိုင်း` : `Showing ${filteredTables.length} tables`}
          </span>
        </div>

        <!-- Scrollable Grid Container for Tables -->
        <div style="max-height: 520px; overflow-y: auto; padding-right: 4px;" class="grid grid-3 gap-3">
          ${filteredTables.map((tb) => {
            const realIdx = tableList.findIndex(t => t.id === tb.id);
            const tags = tb.seat_tags || [];
            
            return `
              <div class="card p-3 flex flex-col justify-between" style="background:linear-gradient(145deg, #ffffff 0%, #f6f9fc 100%); border:1px solid rgba(15,76,92,0.12); border-radius:12px; box-shadow:0 1px 4px rgba(15,76,92,0.03);">
                <div>
                  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                    <span style="font-weight:700; font-size:15px; color:var(--color-primary);">${tb.name}</span>
                    <span class="badge badge--info" style="font-size:11px; font-weight:700;">
                      ${tb.seats || tb.capacity || 4} ${lang === 'mm' ? 'ခုံ (Capacity)' : 'Seats'}
                    </span>
                  </div>
                  <div style="font-size:12px; color:#64748b; font-weight:500; margin-bottom:8px;">
                    📍 ${tb.type || 'Main Hall'}
                  </div>

                  <!-- Table Seat Attribute Tags -->
                  <div style="display:flex; flex-wrap:wrap; gap:4px; margin-top:6px;">
                    ${tags.length > 0 ? tags.map(tagCode => {
                      const meta = getTagMeta(tagCode);
                      return `
                        <span style="display:inline-flex; align-items:center; gap:3px; padding:2px 8px; border-radius:12px; font-size:10.5px; font-weight:600; background:${meta.bg}; color:${meta.color}; border:1px solid ${meta.color}40;">
                          <span class="material-symbols-outlined" style="font-size:12px;">${meta.icon}</span>
                          ${lang === 'mm' ? meta.label_mm : meta.label_en}
                        </span>
                      `;
                    }).join('') : `<span style="font-size:11px; color:#94a3b8; font-style:italic;">No Tags</span>`}
                  </div>
                </div>

                ${isOwner ? `
                  <div style="display:flex; justify-content:flex-end; gap:4px; margin-top:10px; border-top:1px solid #f1f5f9; padding-top:6px;">
                    <button class="btn btn-ghost btn-sm" style="padding:2px 8px; font-size:11.5px;" onclick="ScreenS08.openTableModal(${realIdx})">
                      <span class="material-symbols-outlined" style="font-size:14px;">edit</span> Edit
                    </button>
                    <button class="btn btn-ghost btn-sm" style="color:var(--color-error); padding:2px 8px; font-size:11.5px;" onclick="ScreenS08.deleteTable(${realIdx})">
                      ✕ Delete
                    </button>
                  </div>
                ` : ''}

              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;

    const content = `
      ${Components.pageHeader(I18n.t('staff_tables'), lang === 'mm' ? 'ဆိုင်ပိုင်ရှင်များမှ ဝန်ထမ်းများနှင့် စားပွဲ Tag များကို စီမံခန့်ခွဲရန် Master Data မျက်နှာပြင်' : 'Master Data Management for Shop Staff & Tables (shop_owner privilege).')}
      ${debugRoleBar}
      ${warningBanner}
      ${tabsHtml}
      ${activeTab === 'staff' ? staffSectionHtml : tablesSectionHtml}
    `;

    App.renderAdminPage('shop', I18n.t('sidebar_staff_tables'), content);
  }

  function switchTab(tab) {
    activeTab = tab;
    render();
  }

  function handleSearch(val) {
    tableSearchQuery = val;
    render();
  }

  function setTagFilter(tagCode) {
    selectedTagFilter = tagCode;
    render();
  }

  function toggleStaffBooking(idx) {
    const staff = MockData.staffMembers[idx];
    if (staff) {
      staff.accepts_booking = !staff.accepts_booking;
      showToast('info', 'Booking Status Updated', `${staff.name} is now ${staff.accepts_booking ? 'accepting bookings' : 'not accepting direct bookings'}.`);
      render();
    }
  }

  // --- STAFF MODAL (Add / Edit) ---
  function openStaffModal(editIdx = null) {
    const lang = I18n.getLang();
    const staffList = MockData.staffMembers || [];
    const editStaff = editIdx !== null ? staffList[editIdx] : null;

    const modalHtml = `
      <div class="modal-backdrop" id="staff-modal" onclick="if(event.target===this)this.remove()">
        <div class="modal modal--md animate-scale-in" onclick="event.stopPropagation()">
          <div class="modal__header">
            <h3 class="modal__title">
              ${editStaff ? (lang === 'mm' ? 'ဝန်ထမ်းအချက်အလက် ပြင်ဆင်ရန်' : 'Edit Staff Member') : (lang === 'mm' ? 'ဝန်ထမ်း အသစ်ထည့်ရန်' : 'Add New Staff Member')}
            </h3>
            <button class="modal__close" onclick="document.getElementById('staff-modal').remove()">✕</button>
          </div>
          
          <div class="modal__body flex flex-col gap-4">
            
            <div class="form-row">
              <div class="form-group mb-0">
                <label class="form-label">${I18n.t('staff_name')} <span class="text-error">*</span></label>
                <input type="text" class="form-input" id="st-name" value="${editStaff ? editStaff.name : ''}" placeholder="e.g. Aung Ko" required>
              </div>
              <div class="form-group mb-0">
                <label class="form-label">${lang === 'mm' ? 'ရာထူး (Job Title)' : 'Job Title'}</label>
                <input type="text" class="form-input" id="st-jobtitle" value="${editStaff ? (editStaff.job_title || editStaff.role || '') : ''}" placeholder="e.g. Head Chef / Senior Server">
              </div>
            </div>

            <div class="form-row">
              <div class="form-group mb-0">
                <label class="form-label">${lang === 'mm' ? 'ဖုန်းနံပါတ်' : 'Contact Phone'}</label>
                <input type="text" class="form-input" id="st-phone" value="${editStaff ? editStaff.phone : '+95 9 '}" placeholder="+95 9 450 ...">
              </div>
              <div class="form-group mb-0">
                <label class="form-label">Shift</label>
                <select class="form-select" id="st-shift">
                  <option value="Morning Shift" ${editStaff && editStaff.shift === 'Morning Shift' ? 'selected' : ''}>Morning Shift</option>
                  <option value="Evening Shift" ${editStaff && editStaff.shift === 'Evening Shift' ? 'selected' : ''}>Evening Shift</option>
                  <option value="Full Day" ${editStaff && editStaff.shift === 'Full Day' ? 'selected' : ''}>Full Day</option>
                </select>
              </div>
            </div>

            <div class="form-group mb-0">
              <label class="form-label">${lang === 'mm' ? 'ကိုယ်ရေးအကျဉ်း (Bio)' : 'Bio / Profile Description'}</label>
              <textarea class="form-input" id="st-bio" rows="2" style="height:auto;" placeholder="${lang === 'mm' ? 'ဝန်ထမ်း၏ အတွေ့အကြုံနှင့် တာဝန်ယူမှု ကိုယ်ရေးအကျဉ်း...' : 'Short summary of staff experience...'}">${editStaff ? (editStaff.bio || '') : ''}</textarea>
            </div>

            <div class="form-group mb-0">
              <label class="form-label">${lang === 'mm' ? 'ပရိုဖိုင် ဓာတ်ပုံ URL (Avatar URL)' : 'Avatar Image URL'}</label>
              <input type="text" class="form-input" id="st-avatar-url" value="${editStaff ? (editStaff.avatar_url || '') : ''}" placeholder="../shared/images/avatar-user.svg">
            </div>

            <div style="background:#f8f9fa; border:1px solid #e1e3e4; border-radius:10px; padding:12px; display:flex; flex-direction:column; gap:10px;">
              <div style="display:flex; justify-content:space-between; align-items:center;">
                <div>
                  <span style="font-size:13px; font-weight:700; color:#191c1d;">${lang === 'mm' ? 'ဘွတ်ကင်စနစ်တွင် တာဝန်ချထားမှု လက်ခံမည်' : 'Accepts Booking Assignments'}</span>
                  <p style="font-size:11px; color:#64748b; margin:2px 0 0 0;">${lang === 'mm' ? 'ဧည့်သည် ဘွတ်ကင်များတွင် ဤဝန်ထမ်းအား တာဝန်ချပေး၍ ရ/မရ သတ်မှတ်သည်' : 'Determines if staff member accepts client table assignments.'}</p>
                </div>
                <input type="checkbox" id="st-accepts-booking" ${!editStaff || editStaff.accepts_booking !== false ? 'checked' : ''} style="width:20px; height:20px; cursor:pointer;" />
              </div>
            </div>

            <div style="background:#f0fdf4; border:1px solid #bbf7d0; border-radius:10px; padding:12px; display:flex; flex-direction:column; gap:8px;">
              <span style="font-size:12.5px; font-weight:700; color:#166534; display:flex; align-items:center; gap:4px;">
                🔐 ${lang === 'mm' ? 'စနစ်သုံး အကောင့် စီမံခြင်း (App Account Credentials)' : 'App Login Credentials'}
              </span>
              <div class="form-row">
                <div class="form-group mb-0">
                  <label class="form-label" style="font-size:11px;">${lang === 'mm' ? 'အသုံးပြုသူအမည် (Username)' : 'Username'}</label>
                  <input type="text" class="form-input" id="st-username" value="${editStaff ? (editStaff.account_username || '') : ''}" placeholder="e.g. aungko_chef">
                </div>
                <div class="form-group mb-0">
                  <label class="form-label" style="font-size:11px;">${lang === 'mm' ? 'စကားဝှက် (Password)' : 'Password'}</label>
                  <input type="password" class="form-input" id="st-password" placeholder="••••••••">
                </div>
              </div>
            </div>

          </div>

          <div class="modal__footer">
            <button class="btn btn-ghost" onclick="document.getElementById('staff-modal').remove()">${I18n.t('cancel')}</button>
            <button class="btn btn-primary" onclick="ScreenS08.saveStaff(${editIdx})">${editStaff ? I18n.t('save') : I18n.t('create')}</button>
          </div>

        </div>
      </div>
    `;
    const div = document.createElement('div');
    div.innerHTML = modalHtml;
    document.body.appendChild(div.firstElementChild);
  }

  function saveStaff(editIdx = null) {
    const name = document.getElementById('st-name').value.trim();
    const jobTitle = document.getElementById('st-jobtitle').value.trim();
    const phone = document.getElementById('st-phone').value.trim();
    const shift = document.getElementById('st-shift').value;
    const bio = document.getElementById('st-bio').value.trim();
    const avatarUrl = document.getElementById('st-avatar-url').value.trim();
    const acceptsBooking = document.getElementById('st-accepts-booking').checked;
    const username = document.getElementById('st-username').value.trim();

    if(!name) {
      showToast('error', 'Error', 'Please enter staff name.');
      return;
    }

    const initials = name.split(' ').map(n => n.charAt(0)).join('').toUpperCase();

    if (editIdx !== null && MockData.staffMembers[editIdx]) {
      const target = MockData.staffMembers[editIdx];
      target.name = name;
      target.job_title = jobTitle || target.role;
      target.role = jobTitle || target.role;
      target.phone = phone;
      target.shift = shift;
      target.bio = bio;
      target.avatar_url = avatarUrl;
      target.accepts_booking = acceptsBooking;
      target.account_username = username;
      showToast('success', 'Updated', `Staff member ${name} updated successfully.`);
    } else {
      MockData.staffMembers.push({
        id: `stf-${Date.now()}`,
        name,
        job_title: jobTitle || 'Staff',
        role: jobTitle || 'Staff',
        shift,
        phone,
        bio,
        avatar_url: avatarUrl,
        avatar: initials || 'S',
        accepts_booking: acceptsBooking,
        account_username: username,
        account_status: username ? 'active' : 'none'
      });
      showToast('success', 'Created', `New staff member ${name} added.`);
    }

    document.getElementById('staff-modal').remove();
    render();
  }

  function deleteStaff(idx) {
    if (confirm('Are you sure you want to remove this staff member?')) {
      const removed = MockData.staffMembers.splice(idx, 1);
      showToast('success', 'Deleted', `Staff member ${removed[0]?.name} removed.`);
      render();
    }
  }

  // --- TABLE MODAL (Add / Edit) ---
  function openTableModal(editIdx = null) {
    const lang = I18n.getLang();
    const tableList = MockData.tables || [];
    const editTable = editIdx !== null ? tableList[editIdx] : null;
    const existingTags = editTable ? (editTable.seat_tags || []) : [];

    const modalHtml = `
      <div class="modal-backdrop" id="table-modal" onclick="if(event.target===this)this.remove()">
        <div class="modal modal--md animate-scale-in" onclick="event.stopPropagation()">
          <div class="modal__header">
            <h3 class="modal__title">
              ${editTable ? (lang === 'mm' ? 'စားပွဲဝိုင်း ပြင်ဆင်ရန်' : 'Edit Table & Seat Tags') : (lang === 'mm' ? 'စားပွဲဝိုင်း အသစ်ထည့်ရန်' : 'Add New Table')}
            </h3>
            <button class="modal__close" onclick="document.getElementById('table-modal').remove()">✕</button>
          </div>
          
          <div class="modal__body flex flex-col gap-4">
            
            <div class="form-row">
              <div class="form-group mb-0">
                <label class="form-label">${I18n.t('table_name')} <span class="text-error">*</span></label>
                <input type="text" class="form-input" id="tb-name" value="${editTable ? editTable.name : ''}" placeholder="e.g. T-41 / VIP-11" required>
              </div>
              <div class="form-group mb-0">
                <label class="form-label">${lang === 'mm' ? 'ဆံ့ဝင်လူဦးရေ (Capacity)' : 'Seats / Capacity'} <span class="text-error">*</span></label>
                <input type="number" class="form-input" id="tb-seats" value="${editTable ? (editTable.seats || editTable.capacity || 4) : 4}" min="1" max="50" required>
              </div>
            </div>

            <div class="form-group mb-0">
              <label class="form-label">${lang === 'mm' ? 'စားပွဲ နေရာ ဧရိယာ (Section/Type)' : 'Table Section / Type'}</label>
              <select class="form-select" id="tb-type">
                <option value="Main Hall" ${editTable && editTable.type === 'Main Hall' ? 'selected' : ''}>Main Hall</option>
                <option value="Window View" ${editTable && editTable.type === 'Window View' ? 'selected' : ''}>Window View</option>
                <option value="Booth" ${editTable && editTable.type === 'Booth' ? 'selected' : ''}>Booth / Sofa</option>
                <option value="VIP Room" ${editTable && editTable.type === 'VIP Room' ? 'selected' : ''}>VIP Room</option>
                <option value="Garden Terrace" ${editTable && editTable.type === 'Garden Terrace' ? 'selected' : ''}>Garden Terrace / Outdoor</option>
                <option value="Bar Counter" ${editTable && editTable.type === 'Bar Counter' ? 'selected' : ''}>Bar Counter</option>
              </select>
            </div>

            <!-- Seat Attribute Tags Selection -->
            <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:14px; display:flex; flex-direction:column; gap:10px;">
              <div>
                <label style="font-size:13px; font-weight:700; color:#0f172a; display:block;">
                  🏷️ ${lang === 'mm' ? 'စားပွဲ လက္ခဏာ Tag များ (Seat Tags)' : 'Seat Attribute Tags (seat_tags)'}
                </label>
                <p style="font-size:11.5px; color:#64748b; margin:2px 0 0 0;">
                  ${lang === 'mm' ? 'ဧည့်သည်များ ဘွတ်ကင်လုပ်ချိန်တွင် စိတ်ကြိုက် ရွေးချယ်နိုင်သော စားပွဲလက္ခဏာများကို သတ်မှတ်ပေးပါ' : 'Select all matching seat tags for client booking request alignment.'}
                </p>
              </div>

              <div style="display:grid; grid-template-columns:1fr 1fr; gap:8px;" id="tb-tag-checkboxes">
                ${SEAT_TAG_DEFINITIONS.map(t => {
                  const checked = existingTags.includes(t.code);
                  const label = lang === 'mm' ? t.label_mm : t.label_en;
                  return `
                    <label style="display:flex; align-items:center; gap:8px; padding:8px 10px; border-radius:8px; border:1px solid ${checked ? t.color : '#e2e8f0'}; background:${checked ? t.bg : '#ffffff'}; cursor:pointer; font-size:12px; font-weight:600; color:${checked ? t.color : '#334155'}; transition:all 0.15s;">
                      <input type="checkbox" value="${t.code}" ${checked ? 'checked' : ''} style="width:16px; height:16px; cursor:pointer;" />
                      <span class="material-symbols-outlined" style="font-size:16px;">${t.icon}</span>
                      ${label}
                    </label>
                  `;
                }).join('')}
              </div>
            </div>

          </div>

          <div class="modal__footer">
            <button class="btn btn-ghost" onclick="document.getElementById('table-modal').remove()">${I18n.t('cancel')}</button>
            <button class="btn btn-primary" onclick="ScreenS08.saveTable(${editIdx})">${editTable ? I18n.t('save') : I18n.t('create')}</button>
          </div>

        </div>
      </div>
    `;
    const div = document.createElement('div');
    div.innerHTML = modalHtml;
    document.body.appendChild(div.firstElementChild);
  }

  function saveTable(editIdx = null) {
    const name = document.getElementById('tb-name').value.trim();
    const seats = parseInt(document.getElementById('tb-seats').value, 10);
    const type = document.getElementById('tb-type').value;

    const checkboxes = document.querySelectorAll('#tb-tag-checkboxes input[type="checkbox"]:checked');
    const selectedTags = Array.from(checkboxes).map(cb => cb.value);

    if(!name || !seats) {
      showToast('error', 'Error', 'Please fill table name and capacity.');
      return;
    }

    if (editIdx !== null && MockData.tables[editIdx]) {
      const target = MockData.tables[editIdx];
      target.name = name;
      target.seats = seats;
      target.capacity = seats;
      target.type = type;
      target.seat_tags = selectedTags;
      showToast('success', 'Updated', `Table ${name} and seat tags updated.`);
    } else {
      MockData.tables.push({
        id: `tbl-${Date.now()}`,
        name,
        seats,
        capacity: seats,
        type,
        seat_tags: selectedTags
      });
      showToast('success', 'Created', `Table ${name} registered with ${selectedTags.length} seat tags.`);
    }

    document.getElementById('table-modal').remove();
    render();
  }

  function deleteTable(idx) {
    if (confirm('Are you sure you want to remove this table?')) {
      const removed = MockData.tables.splice(idx, 1);
      showToast('success', 'Deleted', `Table ${removed[0]?.name} removed.`);
      render();
    }
  }

  return { 
    render, 
    setTestRole,
    switchTab, 
    handleSearch, 
    setTagFilter, 
    toggleStaffBooking,
    openStaffModal, 
    saveStaff, 
    deleteStaff, 
    openTableModal, 
    saveTable, 
    deleteTable 
  };
})();
