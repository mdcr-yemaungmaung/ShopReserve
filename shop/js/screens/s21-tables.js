/* ============================================================
   EzBookNow Screen S-21 — Table Management & Seat Attribute Tags
   Docs: 席(テーブル)管理 — 卓名・収容人数・席属性タグ設定(seat_attribute)・有効フラグ
   Entity: shop_tables (shop master) | Function: C-07 | Pkg1
   Restricted to shop_owner role only.
   ============================================================ */

const ScreenS21 = (() => {
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

  function render() {
    const lang = I18n.getLang();
    const auth = Router.getAuth();
    const isOwner = auth.role === 'shop_owner';
    const tableList = MockData.tables || [];

    // Role Limit Warning Banner if shop_staff
    const warningBanner = !isOwner ? `
      <div class="p-3 mb-4 bg-error-container text-on-error-container flex items-center gap-2" style="border-radius:var(--radius-md); font-weight:600; font-size:13px; border: 1px solid var(--color-error);">
        🚫 ${lang === 'mm' ? 'ဝင်ရောက်ခွင့် မရှိပါ: S-21 စားပွဲစီမံခန့်ခွဲမှုကို ဆိုင်ပိုင်ရှင် (Shop Owner) တစ်ဦးတည်းသာ ဝင်ရောက်ပြင်ဆင်ခွင့် ရှိပါသည်။ (Role Limit: C-07)' : 'Access Restricted: Only the Shop Owner (shop_owner) has permission to modify table master data (C-07).'}
      </div>
    ` : '';

    const filteredTables = tableList.filter(tb => {
      const matchSearch = tb.name.toLowerCase().includes(tableSearchQuery.toLowerCase()) || (tb.type || '').toLowerCase().includes(tableSearchQuery.toLowerCase());
      const matchTag = selectedTagFilter === 'all' || (tb.seat_tags || []).includes(selectedTagFilter);
      const matchActive = true;
      return matchSearch && matchTag && matchActive;
    });

    const content = `
      <div class="card flex flex-col gap-4">

        <!-- Header -->
        <div class="flex justify-between items-center border-bottom pb-3" style="border-bottom:1px solid var(--color-surface-container); flex-wrap:wrap; gap:10px;">
          <div>
            <h3 class="text-label-md" style="font-weight:700; color:var(--color-primary); font-size:16px;">
              🪑 ${lang === 'mm' ? 'ခုံခွဲ (စားပွဲ) စီမံခန့်ခွဲခြင်း' : 'Table Management (shop_tables)'}
            </h3>
            <p style="font-size:12px; color:var(--color-outline); margin:2px 0 0 0;">
              ${lang === 'mm' ? 'စားပွဲဝိုင်း အမည်၊ ဆံ့ဝင်လူဦးရေ၊ စားပွဲ လက္ခဏာ Tag (seat_attribute) နှင့် အသက်ဝင်များ (active) ကို သတ်မှတ်ပါ' : 'Register table name, capacity, seat attribute tags (seat_attribute), and active flag.'}
            </p>
          </div>
          ${isOwner ? `
            <button class="btn btn-primary btn-sm" onclick="ScreenS21.openTableModal()">
              <span class="material-symbols-outlined" style="font-size: 16px;">add</span>
              ${lang === 'mm' ? 'စားပွဲ အသစ်ထည့်မည်' : 'Add New Table'}
            </button>
          ` : ''}
        </div>

        <!-- Seat Attribute Tags Overview Banner -->
        <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:12px; margin-bottom:4px;">
          <div style="font-size:12px; font-weight:700; color:#0f172a; margin-bottom:8px; display:flex; align-items:center; gap:6px;">
            🏷️ ${lang === 'mm' ? 'စနစ်တွင်း သတ်မှတ်ထားသော စားပွဲ Tag များ (Seat Attribute Library):' : 'Available Seat Attribute Tags (seat_attribute library):'}
          </div>
          <div style="display:flex; flex-wrap:wrap; gap:6px;">
            ${SEAT_TAG_DEFINITIONS.map(t => {
              const tagLabel = lang === 'mm' ? t.label_mm : t.label_en;
              const isSelected = selectedTagFilter === t.code;
              return `
                <button type="button" onclick="ScreenS21.setTagFilter('${t.code}')" style="display:flex; align-items:center; gap:4px; padding:4px 10px; border-radius:16px; font-size:11.5px; font-weight:600; border:1px solid ${isSelected ? t.color : '#cbd5e1'}; background:${isSelected ? t.bg : '#ffffff'}; color:${isSelected ? t.color : '#334155'}; cursor:pointer;">
                  <span class="material-symbols-outlined" style="font-size:14px;">${t.icon}</span>
                  ${tagLabel}
                </button>
              `;
            }).join('')}
            ${selectedTagFilter !== 'all' ? `
              <button type="button" onclick="ScreenS21.setTagFilter('all')" style="padding:4px 10px; border-radius:16px; font-size:11.5px; font-weight:600; border:1px solid #cbd5e1; background:#e2e8f0; color:#334155; cursor:pointer;">
                ✕ Clear Filter
              </button>
            ` : ''}
          </div>
        </div>

        <!-- Search Bar -->
        <div style="display:flex; justify-content:space-between; align-items:center; gap:10px; margin-bottom:4px;">
          <div style="position:relative; flex:1; max-width:320px;">
            <span class="material-symbols-outlined" style="position:absolute; left:10px; top:50%; transform:translateY(-50%); font-size:18px; color:#94a3b8;">search</span>
            <input type="text" placeholder="${lang === 'mm' ? 'စားပွဲအမည် ဖြင့် ရှာမည်...' : 'Search tables...'}" value="${tableSearchQuery}" oninput="ScreenS21.handleSearch(this.value)" style="width:100%; height:36px; padding-left:34px; padding-right:12px; border:1px solid #cbd5e1; border-radius:8px; font-size:13px; outline:none;" />
          </div>
          <span style="font-size:12px; color:#64748b; font-weight:600;">
            ${lang === 'mm' ? `စားပွဲ စုစုပေါင်း: ${filteredTables.length} ခု` : `Showing ${filteredTables.length} tables`}
          </span>
        </div>

        <!-- Scrollable Grid Container for Tables -->
        <div style="max-height: 520px; overflow-y: auto; padding-right: 4px;" class="grid grid-3 gap-3">
          ${filteredTables.map((tb) => {
            const realIdx = tableList.findIndex(t => t.id === tb.id);
            const tags = tb.seat_tags || [];
            const isActive = tb.is_active !== false;

            return `
              <div class="card p-3 flex flex-col justify-between" style="background:linear-gradient(145deg, #fbfcfe 0%, #f3f7fa 100%); border:1px solid rgba(15,76,92,0.12); border-radius:12px; box-shadow:0 1px 4px rgba(15,76,92,0.03); ${isActive ? '' : 'opacity:0.55;'};">
                <div>
                  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
                    <span style="font-weight:700; font-size:15px; color:var(--color-primary);">${tb.name}</span>
                    <span class="badge ${isActive ? 'badge--success' : 'badge--expired'}" style="font-size:11px; font-weight:700;">
                      ${isActive ? (lang === 'mm' ? 'အသက်ဝင်သည်' : 'Active') : (lang === 'mm' ? 'ရပ်ထားသည်' : 'Inactive')}
                    </span>
                  </div>
                  <div style="font-size:12px; color:#64748b; font-weight:500; margin-bottom:8px;">
                    📍 ${tb.type || 'Main Hall'} · ${tb.seats || tb.capacity || 4} ${lang === 'mm' ? 'ခုံ' : 'seats'}
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
                    <button class="btn btn-ghost btn-sm" style="padding:2px 8px; font-size:11.5px;" onclick="ScreenS21.toggleActive(${realIdx})">
                      <span class="material-symbols-outlined" style="font-size:14px;">power_settings_new</span> ${isActive ? 'Disable' : 'Enable'}
                    </button>
                    <button class="btn btn-ghost btn-sm" style="padding:2px 8px; font-size:11.5px;" onclick="ScreenS21.openTableModal(${realIdx})">
                      <span class="material-symbols-outlined" style="font-size:14px;">edit</span> Edit
                    </button>
                    <button class="btn btn-ghost btn-sm" style="color:var(--color-error); padding:2px 8px; font-size:11.5px;" onclick="ScreenS21.deleteTable(${realIdx})">
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

    App.renderAdminPage('shop', lang === 'mm' ? 'စားပွဲစီမံခန့်ခွဲမှု (S-21)' : 'Table Management (S-21)', `
      ${Components.pageHeader(lang === 'mm' ? 'စားပွဲစီမံခန့်ခွဲမှု (S-21)' : 'Table Management (S-21)', lang === 'mm' ? 'shop_tables ခုံခွဲများနှင့် seat_attribute Tag များ စီမံရန် (C-07)' : 'Manage table master data and seat attribute tags (shop_tables / C-07).')}
      ${warningBanner}
      ${content}
    `);
  }

  function handleSearch(val) {
    tableSearchQuery = val;
    render();
  }

  function setTagFilter(tagCode) {
    selectedTagFilter = tagCode;
    render();
  }

  function toggleActive(idx) {
    const tb = MockData.tables[idx];
    if (tb) {
      tb.is_active = tb.is_active === false;
      showToast('info', 'Table Updated', `${tb.name} is now ${tb.is_active === false ? 'inactive' : 'active'}.`);
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
                  🏷️ ${lang === 'mm' ? 'စားပွဲ လက္ခဏာ Tag များ (seat_attribute)' : 'Seat Attribute Tags (seat_attribute)'}
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
                    <label style="display:flex; align-items:center; gap:8px; padding:8px 10px; border-radius:8px; border:1px solid ${checked ? t.color : 'rgba(15,76,92,0.14)'}; background:${checked ? t.bg : '#f4f8fa'}; cursor:pointer; font-size:12px; font-weight:600; color:${checked ? t.color : '#334155'}; transition:all 0.15s;">
                      <input type="checkbox" value="${t.code}" ${checked ? 'checked' : ''} style="width:16px; height:16px; cursor:pointer;" />
                      <span class="material-symbols-outlined" style="font-size:16px;">${t.icon}</span>
                      ${label}
                    </label>
                  `;
                }).join('')}
              </div>
            </div>

            <div class="form-group mb-0">
              <label class="form-label">${lang === 'mm' ? 'အသက်ဝင်မှု (Active flag)' : 'Active Flag'}</label>
              <select class="form-select" id="tb-active">
                <option value="true" ${!editTable || editTable.is_active !== false ? 'selected' : ''}>Active</option>
                <option value="false" ${editTable && editTable.is_active === false ? 'selected' : ''}>Inactive (closed for booking)</option>
              </select>
            </div>

          </div>

          <div class="modal__footer">
            <button class="btn btn-ghost" onclick="document.getElementById('table-modal').remove()">${I18n.t('cancel')}</button>
            <button class="btn btn-primary" onclick="ScreenS21.saveTable(${editIdx})">${editTable ? I18n.t('save') : I18n.t('create')}</button>
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
    const isActive = document.getElementById('tb-active').value === 'true';

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
      target.is_active = isActive;
      showToast('success', 'Updated', `Table ${name} and seat tags updated.`);
    } else {
      MockData.tables.push({
        id: `tbl-${Date.now()}`,
        name,
        seats,
        capacity: seats,
        type,
        seat_tags: selectedTags,
        is_active: isActive
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
    handleSearch,
    setTagFilter,
    toggleActive,
    openTableModal,
    saveTable,
    deleteTable
  };
})();