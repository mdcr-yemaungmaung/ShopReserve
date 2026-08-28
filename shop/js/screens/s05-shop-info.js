/* ============================================================
   EzBookNow Screen S-05 — Shop Information Settings Screen
   Conforms strictly to Basic Design: docs/01_bd/EzBookNow_画面設計書.md §3.19
   4-Section Structure:
     - Basic Information (name unified, multi-cuisine, facilities)
     - Contact & Location (area, address, shop_phones list up to 5)
     - Media & Menus (photos, menu items with categories & photos, QR)
     - Booking Operations (auto_confirm, cancellation policy)
   Language: English & Myanmar (No Japanese in UI)
   ============================================================ */

const ScreenS05 = (() => {
  let menuList = [];
  let uploadedPhotos = [];
  let selectedCuisines = ['Fine Dining', 'Myanmar Traditional', 'Western'];
  let primaryCuisine = 'Fine Dining';
  let selectedFacilities = ['Wi-Fi', 'Air Conditioning', 'Generator (Backup Power)', 'Parking', 'Private Dining Rooms'];
  let phoneList = [
    { id: 1, number: '+95 9 4500 1111', phone_type: 'representative', is_public: true, label: 'Main Shop Line / MPT', sort_order: 1 },
    { id: 2, number: '+95 9 7700 2222', phone_type: 'reservation', is_public: true, label: 'Table Booking Hotline', sort_order: 2 },
    { id: 3, number: '+95 9 9500 3333', phone_type: 'viber_whatsapp', is_public: true, label: 'Viber Inquiries', sort_order: 3 }
  ];

  const ALL_CUISINES = [
    'Fine Dining', 'Myanmar Traditional', 'Western', 'Japanese', 'Chinese', 'Thai', 
    'Asian Fusion', 'Cafe & Bakery', 'Seafood', 'Steakhouse', 'Bar & Grill', 'Vegetarian / Vegan'
  ];

  const ALL_FACILITIES = [
    'Wi-Fi', 'Parking', 'Air Conditioning', 'Generator (Backup Power)', 
    'Wheelchair Accessible', 'Pet Friendly', 'Halal Certified', 'Private Dining Rooms', 
    'Outdoor Seating', 'Live Music / Stage', 'Credit / Debit Card', 'KBZPay / WavePay', 
    'Bar / Alcohol Served', 'Smoking Area'
  ];

  let initialized = false;

  function initData(rest) {
    if (initialized) return;
    menuList = rest.menuItems ? [...rest.menuItems] : [
      { name: 'Signature Roasted Chicken', name_mm: 'အထူး ကြက်ကင်', category_name: 'Main Course', price: 18500, price_usd: 6.5, duration_min: 60, is_popular: true, is_published: true, description: 'Slow-roasted herb chicken with seasonal vegetables.' },
      { name: 'Grilled River Prawns', name_mm: 'မီးကင် ပုစွန်ထုပ်', category_name: 'Seafood', price: 32000, price_usd: 11.0, duration_min: 75, is_popular: true, is_published: true, description: 'Fresh river prawns with garlic chili butter sauce.' },
      { name: 'Truffle Mushroom Pasta', name_mm: 'မှိုခေါက်ဆွဲ', category_name: 'Pasta', price: 16000, price_usd: 5.5, duration_min: 45, is_popular: false, is_published: true, description: 'Handmade fettuccine with black truffle paste and parmesan.' }
    ];
    
    const initialImages = rest.images || [rest.image || Paths.image('glass_pavilion.png')];
    uploadedPhotos = initialImages.map((url, i) => ({
      url,
      caption: i === 0 ? 'Main Dining Hall' : (i === 1 ? 'Private Garden Area' : 'Chef Signature Table'),
      is_cover: i === 0,
      sort_order: i
    }));
    initialized = true;
  }

  function render() {
    const lang = I18n.getLang();
    const rest = MockData.restaurants[0] || { name: 'The Glass Bistro (သ ဖန်ဆိုင်)', address: '123 Inya Road, Bahan', cancel_hours: 24, cancel_fee_pct: 0, auto_confirm: true };
    initData(rest);

    const auth = Router.getAuth() || { role: 'shop_owner' };
    const isStaff = auth.role === 'shop_staff';

    // Warnings and Debug controls
    const debugRoleBar = `
      <div class="card p-3 mb-4 bg-surface-container-low flex justify-between items-center flex-wrap gap-3" style="border:1px dashed var(--color-outline-variant); border-radius:var(--radius-md);">
        <span style="font-size:13px; font-weight:600; color:var(--color-primary); display:flex; align-items:center; gap:6px;">
          🧪 Debug Testing: Toggle shop permissions (C-06)
        </span>
        <div class="flex gap-2">
          <button class="btn btn-sm ${auth.role === 'shop_owner' ? 'btn-primary' : 'btn-secondary'}" onclick="ScreenS05.setTestRole('shop_owner')" style="padding:4px 10px; font-size:12px;">Owner (Edit/Save)</button>
          <button class="btn btn-sm ${auth.role === 'shop_staff' ? 'btn-primary' : 'btn-secondary'}" onclick="ScreenS05.setTestRole('shop_staff')" style="padding:4px 10px; font-size:12px;">Staff (Read-Only)</button>
        </div>
      </div>
    `;

    const warningBanner = isStaff ? `
      <div class="p-3 mb-4 bg-error-container text-on-error-container flex items-center gap-2" style="border-radius:var(--radius-md); font-weight:600; font-size:13px;">
        ⚠️ ${lang === 'mm' ? 'ဖတ်ရှုရန်သာ: ဆိုင်ပိုင်ရှင် (Shop Owner) သာ ဆိုင်အချက်အလက်များကို ပြင်ဆင်ခွင့်ရှိသည်။' : 'Read-Only Mode: Only the Shop Owner (shop_owner) can modify settings (C-06).'}
      </div>
    ` : '';

    // ==========================================
    // Section: Basic Information
    // ==========================================
    const cuisinesChipsHtml = ALL_CUISINES.map(c => {
      const isSelected = selectedCuisines.includes(c);
      const isPrimary = primaryCuisine === c;
      return `
        <div style="display:inline-flex; align-items:center; gap:6px; padding:4px 10px; border-radius:20px; border:1.5px solid ${isSelected ? 'var(--color-primary)' : 'var(--color-outline-variant)'}; background:${isSelected ? 'rgba(0,84,50,0.08)' : 'var(--color-surface-container)'}; font-size:12px; cursor:${isStaff ? 'default' : 'pointer'};">
          <span onclick="${isStaff ? '' : `ScreenS05.toggleCuisine('${c}')`}" style="font-weight:${isSelected ? '700' : '500'}; color:${isSelected ? 'var(--color-primary)' : 'var(--color-on-surface)'};">
            ${isSelected ? '✓ ' : '+ '}${c}
          </span>
          ${isSelected ? `
            <label style="display:inline-flex; align-items:center; margin-left:4px; font-size:10px; color:${isPrimary ? 'var(--color-primary)' : 'var(--color-outline)'}; cursor:pointer;" title="Set as primary cuisine">
              <input type="radio" name="primary_cuisine" value="${c}" ${isPrimary ? 'checked' : ''} ${isStaff ? 'disabled' : ''} onchange="ScreenS05.setPrimaryCuisine('${c}')" style="margin-right:2px;">
              ${isPrimary ? '<strong>Primary</strong>' : 'Set Primary'}
            </label>
          ` : ''}
        </div>
      `;
    }).join('');

    const facilitiesChipsHtml = ALL_FACILITIES.map(f => {
      const isSelected = selectedFacilities.includes(f);
      return `
        <button type="button" class="btn btn-sm" onclick="${isStaff ? '' : `ScreenS05.toggleFacility('${f}')`}" 
          style="padding:4px 10px; font-size:12px; border-radius:18px; border:1px solid ${isSelected ? 'var(--color-primary)' : 'var(--color-outline-variant)'}; background:${isSelected ? 'var(--color-primary)' : 'transparent'}; color:${isSelected ? '#fff' : 'var(--color-on-surface)'}; font-weight:${isSelected ? '600' : '400'};">
          ${isSelected ? '✓ ' : '+ '}${f}
        </button>
      `;
    }).join('');

    const section1BasicInfo = `
      <div class="card flex flex-col gap-5">
        <div>
          <h3 class="text-label-md" style="font-weight:700; color:var(--color-primary); margin:0;">
            Basic Information
          </h3>
          <div style="font-size:11.5px; color:var(--color-outline); margin-top:2px;">
            Shop identification, multilingual descriptions, cuisine genres, and customer amenities.
          </div>
        </div>
        
        <!-- Unified Shop Name Field (Review Item No.22/28) -->
        <div class="form-group mb-0">
          <label class="form-label" style="font-size:12.5px; font-weight:600;">
            Shop Name (Official Signboard Name)<span class="required">*</span>
          </label>
          <input type="text" class="form-input" id="shop-name" value="${rest.name || 'The Glass Bistro (သ ဖန်ဆိုင်)'}" maxlength="400" ${isStaff ? 'disabled' : ''}>
        </div>

        <!-- Multilingual Description -->
        <div class="form-row">
          <div class="form-group mb-0" style="flex:1;">
            <label class="form-label" style="font-size:12px; font-weight:600;">Description (English)</label>
            <textarea class="form-textarea" id="shop-desc-en" rows="3" ${isStaff ? 'disabled' : ''}>${rest.description || 'Modern contemporary dining offering farm-to-table cuisine and curated wines.'}</textarea>
          </div>
          <div class="form-group mb-0" style="flex:1;">
            <label class="form-label" style="font-size:12px; font-weight:600;">Description (Myanmar - Optional)</label>
            <textarea class="form-textarea" id="shop-desc-mm" rows="3" ${isStaff ? 'disabled' : ''}>${rest.description_mm || 'အရည်အသွေးမြင့် လတ်ဆတ်သော အစားအစာများနှင့် စိတ်ချမ်းမြေ့ဖွယ် ပတ်ဝန်းကျင်။'}</textarea>
          </div>
        </div>

        <!-- Cuisines Multi-Selection (Review Item No.35) -->
        <div class="form-group mb-0">
          <div class="flex justify-between items-center mb-2">
            <label class="form-label mb-0" style="font-size:12.5px; font-weight:600;">
              Cuisine Genres (${selectedCuisines.length} selected, Primary: <strong>${primaryCuisine}</strong>)<span class="required">*</span>
            </label>
          </div>
          <div class="flex flex-wrap gap-2 p-3 bg-surface-container-low" style="border-radius:var(--radius-md); border:1px solid var(--color-outline-variant);">
            ${cuisinesChipsHtml}
          </div>
          <span class="form-hint" style="font-size:11px;">
            Select all genres that apply. Primary genre is used for main ranking and category cards.
          </span>
        </div>

        <!-- Facilities Multi-Selection (Review Item No.25) -->
        <div class="form-group mb-0">
          <div class="flex justify-between items-center mb-2">
            <label class="form-label mb-0" style="font-size:12.5px; font-weight:600;">
              Facilities & Amenities (${selectedFacilities.length} active)
            </label>
          </div>
          <div class="flex flex-wrap gap-2 p-3 bg-surface-container-low" style="border-radius:var(--radius-md); border:1px solid var(--color-outline-variant);">
            ${facilitiesChipsHtml}
          </div>
          <span class="form-hint" style="font-size:11px;">
            Selected amenities appear as search filters on U-02 and badges on U-03 Shop Detail.
          </span>
        </div>
      </div>
    `;

    // ==========================================
    // Section: Contact & Location (shop_phones list up to 5)
    // ==========================================
    const phoneRowsHtml = phoneList.map((p, idx) => {
      const typeLabels = {
        representative: 'Shop Representative (Primary)',
        reservation: 'Reservation Line',
        viber_whatsapp: 'Viber / WhatsApp',
        admin_contact: 'Internal Operator Contact (Private)'
      };

      return `
        <div class="flex items-center justify-between p-3 bg-surface-container-low border rounded flex-wrap gap-3" style="border-radius:var(--radius-md); font-size:12px;">
          <div class="flex items-center gap-3 flex-wrap" style="flex:1;">
            <div style="min-width:140px; font-weight:700; color:var(--color-primary);">
              📞 ${p.number}
            </div>
            <select class="form-input" style="height:30px; font-size:11.5px; width:200px;" ${isStaff ? 'disabled' : ''} onchange="ScreenS05.updatePhoneType(${idx}, this.value)">
              <option value="representative" ${p.phone_type === 'representative' ? 'selected' : ''}>Shop Representative (Main)</option>
              <option value="reservation" ${p.phone_type === 'reservation' ? 'selected' : ''}>Reservation Line</option>
              <option value="viber_whatsapp" ${p.phone_type === 'viber_whatsapp' ? 'selected' : ''}>Viber / WhatsApp</option>
              <option value="admin_contact" ${p.phone_type === 'admin_contact' ? 'selected' : ''}>Internal Operator Contact</option>
            </select>
            <input type="text" class="form-input" placeholder="Label (E.g. English speaking)" value="${p.label || ''}" style="height:30px; font-size:11.5px; width:150px;" ${isStaff ? 'disabled' : ''} onchange="ScreenS05.updatePhoneLabel(${idx}, this.value)">
            <label class="flex items-center gap-1.5" style="cursor:${p.phone_type === 'admin_contact' ? 'not-allowed' : 'pointer'}; font-size:11px;">
              <input type="checkbox" ${p.is_public ? 'checked' : ''} ${p.phone_type === 'admin_contact' || isStaff ? 'disabled' : ''} onchange="ScreenS05.updatePhonePublic(${idx}, this.checked)">
              <span>Public</span>
            </label>
          </div>
          ${(phoneList.length > 1 && !isStaff) ? `
            <button class="btn btn-ghost btn-sm text-error" onclick="ScreenS05.deletePhone(${idx})" style="padding:2px 6px;">✕</button>
          ` : ''}
        </div>
      `;
    }).join('');

    const section2ContactLocation = `
      <div class="card flex flex-col gap-5">
        <div>
          <h3 class="text-label-md" style="font-weight:700; color:var(--color-primary); margin:0;">
            Contact Numbers & Location
          </h3>
          <div style="font-size:11.5px; color:var(--color-outline); margin-top:2px;">
            Multiple contact lines (up to 5), district area, physical address, and GPS coordinates.
          </div>
        </div>

        <!-- Phone Numbers List (Review Item No.20) -->
        <div class="form-group mb-0">
          <div class="flex justify-between items-center mb-2">
            <label class="form-label mb-0" style="font-size:12.5px; font-weight:600;">
              Contact Phone Numbers (${phoneList.length}/5 Registered)<span class="required">*</span>
            </label>
            ${(phoneList.length < 5 && !isStaff) ? `
              <button class="btn btn-secondary btn-sm" onclick="ScreenS05.addPhoneModal()" style="font-size:11px; padding:3px 8px;">
                + Add Phone Number
              </button>
            ` : ''}
          </div>
          <div class="flex flex-col gap-2">
            ${phoneRowsHtml}
          </div>
          <span class="form-hint" style="font-size:11px;">
            The lowest sort-order public phone is designated as the primary shop representative number on customer vouchers (RPT-01).
          </span>
        </div>

        <div class="form-row">
          <div class="form-group mb-0" style="flex:1;">
            <label class="form-label" style="font-size:12px; font-weight:600;">Area / Township<span class="required">*</span></label>
            <select class="form-input" id="shop-area" ${isStaff ? 'disabled' : ''}>
              <option value="Bahan">Bahan (ဗဟန်း)</option>
              <option value="Downtown">Downtown (မြို့ထဲ / ကျောက်တံတား)</option>
              <option value="Sanchaung">Sanchaung (စမ်းချောင်း)</option>
              <option value="Kamayut">Kamayut (ကမာရွတ်)</option>
              <option value="Yankin">Yankin (ရန်ကင်း)</option>
              <option value="Hlaing">Hlaing (လှိုင်)</option>
              <option value="Mayangone">Mayangone (မရမ်းကုန်း)</option>
            </select>
          </div>
          <div class="form-group mb-0" style="flex:1;">
            <label class="form-label" style="font-size:12px; font-weight:600;">Contact Email</label>
            <input type="email" class="form-input" id="shop-email" value="${rest.email || 'contact@theglasspavilion.com'}" ${isStaff ? 'disabled' : ''}>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group mb-0" style="flex:1;">
            <label class="form-label" style="font-size:12px; font-weight:600;">Physical Address (English)<span class="required">*</span></label>
            <input type="text" class="form-input" id="shop-address-en" value="${rest.address || '123 Inya Road, Bahan Township, Yangon'}" ${isStaff ? 'disabled' : ''}>
          </div>
          <div class="form-group mb-0" style="flex:1;">
            <label class="form-label" style="font-size:12px; font-weight:600;">Physical Address (Myanmar - Optional)</label>
            <input type="text" class="form-input" id="shop-address-mm" value="${rest.address_mm || '၁၂၃ အင်းလျားလမ်း၊ ဗဟန်းမြို့နယ်၊ ရန်ကုန်'}" ${isStaff ? 'disabled' : ''}>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group mb-0" style="flex:1;">
            <label class="form-label" style="font-size:12px; font-weight:600;">Latitude</label>
            <input type="number" class="form-input" id="shop-lat" value="16.8194" step="0.0001" ${isStaff ? 'disabled' : ''}>
          </div>
          <div class="form-group mb-0" style="flex:1;">
            <label class="form-label" style="font-size:12px; font-weight:600;">Longitude</label>
            <input type="number" class="form-input" id="shop-lng" value="96.1561" step="0.0001" ${isStaff ? 'disabled' : ''}>
          </div>
        </div>
      </div>
    `;

    // ==========================================
    // Section: Media & Menus (photos, menu items, KBZPay QR)
    // ==========================================
    const renderImagesList = () => {
      return uploadedPhotos.map((photo, index) => `
        <div class="flex flex-col gap-2 p-3 bg-surface-container-low border rounded" style="border-radius:var(--radius-md); font-size:12px;">
          <div class="flex items-center gap-3">
            <img src="${photo.url}" onerror="this.onerror=null; this.src=Paths.image('glass_pavilion.png');" style="width:52px; height:52px; object-fit:cover; border-radius:4px; border: 1px solid var(--color-outline-variant);">
            <div style="flex:1;">
              <input type="text" class="form-input" placeholder="Caption (E.g. Main Dining Hall)" 
                     value="${photo.caption || ''}" ${isStaff ? 'disabled' : ''} 
                     onchange="ScreenS05.updateImageCaption(${index}, this.value)" style="height:32px; font-size:12px; padding:4px 8px;">
            </div>
            ${isStaff ? '' : `<button class="btn btn-ghost btn-sm text-error" onclick="ScreenS05.deletePhoto(${index})" style="padding:0 8px;">✕</button>`}
          </div>
          <div class="flex items-center gap-2" style="font-size:11px; margin-top:2px;">
            <input type="checkbox" id="photo-cover-${index}" ${photo.is_cover ? 'checked' : ''} ${isStaff ? 'disabled' : ''} 
                   onchange="ScreenS05.setCoverImage(${index}, this.checked)" style="cursor:pointer;">
            <label for="photo-cover-${index}" style="cursor:pointer;">Set as Main Cover Photo</label>
          </div>
        </div>
      `).join('');
    };

    const menuItemsHtml = menuList.map((item, idx) => {
      const nameLabel = lang === 'mm' ? (item.name_mm || item.name) : item.name;
      const popularBadge = item.is_popular ? `<span style="font-size:9px; font-weight:700; color:white; background:#e09f00; padding:1px 6px; border-radius:10px; margin-left:6px;">Popular</span>` : '';
      const publishedBadge = item.is_published ? `<span class="badge badge--success" style="font-size:9px; padding:1px 6px; margin-left:6px;">Published</span>` : `<span class="badge badge--expired" style="font-size:9px; padding:1px 6px; margin-left:6px;">Hidden</span>`;
      const categoryLabel = item.category_name ? `<span style="font-size:10px; color:var(--color-primary); background:rgba(0,84,50,0.06); padding:2px 6px; border-radius:4px; margin-left:6px; font-weight:600;">${item.category_name}</span>` : '';
      
      return `
        <div class="flex justify-between items-center p-3 bg-surface-container-low" style="border-radius:var(--radius-md); border:1px solid var(--color-surface-container);">
          <div style="flex:1;">
            <div style="font-weight:600; font-size:14px; color:var(--color-primary); display:flex; align-items:center; flex-wrap:wrap; gap:4px;">
              ${nameLabel}
              ${popularBadge}
              ${publishedBadge}
              ${categoryLabel}
            </div>
            <div style="font-size:12px; color:var(--color-outline); margin-top:2px;">
              <strong>${MockData.formatMMK(item.price)}</strong>
              ${item.price_usd ? `<span style="font-size:11px; margin-left:4px;">(~ $${item.price_usd} USD)</span>` : ''}
              <span style="margin-left:8px; font-weight:500;">· ⏱️ ${item.duration_min || 60} mins duration</span>
            </div>
            ${item.description ? `<div style="font-size:11px; color:var(--color-outline); margin-top:4px; font-style:italic;">${item.description}</div>` : ''}
          </div>
          ${isStaff ? '' : `
            <div class="flex items-center gap-2">
              <button class="btn btn-ghost btn-sm" onclick="ScreenS05.togglePublishMenu(${idx})" title="Toggle Visibility">
                ${item.is_published ? 'Hide' : 'Publish'}
              </button>
              <button class="btn btn-ghost btn-sm text-error" onclick="ScreenS05.deleteMenuItem(${idx})" style="padding:4px 8px;">✕</button>
            </div>
          `}
        </div>
      `;
    }).join('');

    const section3MediaMenus = `
      <div class="card flex flex-col gap-5">
        <div class="flex justify-between items-center">
          <div>
            <h3 class="text-label-md" style="font-weight:700; color:var(--color-primary); margin:0;">
              Media, Photos & Menu Catalog
            </h3>
            <div style="font-size:11.5px; color:var(--color-outline); margin-top:2px;">
              Photo gallery, menu items with durations, and merchant KBZPay static QR code.
            </div>
          </div>
          ${isStaff ? '' : `<button class="btn btn-secondary btn-sm" onclick="ScreenS05.addMenuItem()">${Components.icon('plus', 14)} Add Menu Item</button>`}
        </div>

        <!-- Menu items list -->
        <div class="flex flex-col gap-3">
          ${menuItemsHtml}
        </div>

        <!-- Gallery Upload & QR -->
        <div class="grid grid-2 gap-4 mt-2" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));">
          <!-- Gallery Card -->
          <div class="p-4 bg-surface-container flex flex-col gap-3" style="border-radius:var(--radius-md); border:1px solid var(--color-outline-variant);">
            <div class="flex justify-between items-center">
              <strong style="font-size:12.5px; color:var(--color-primary);">🖼️ Shop Photo Gallery</strong>
              ${isStaff ? '' : `<button class="btn btn-secondary btn-sm" style="font-size:11px; padding:2px 8px;" onclick="ScreenS05.triggerMockUpload()">+ Upload Photo</button>`}
            </div>
            <div class="flex flex-col gap-2">
              ${renderImagesList()}
            </div>
          </div>

          <!-- Static QR Card -->
          <div class="p-4 bg-surface-container flex flex-col gap-3" style="border-radius:var(--radius-md); border:1px solid var(--color-outline-variant);">
            <div class="flex justify-between items-center">
              <strong style="font-size:12.5px; color:var(--color-primary);">📱 Merchant KBZPay Static QR</strong>
              ${isStaff ? '' : `<button class="btn btn-secondary btn-sm" style="font-size:11px; padding:2px 8px;" onclick="ScreenS05.triggerQRUpload()">Upload New QR</button>`}
            </div>
            <div class="flex items-center gap-4">
              <img id="qr-preview-img" src="${rest.qr_image || Paths.image('glass_pavilion.png')}" onerror="this.onerror=null; this.src=Paths.image('glass_pavilion.png');" style="width:90px; height:90px; object-fit:cover; border:1px solid var(--color-outline-variant); padding:4px; background:#f4f8fa; border-radius:8px;">
              <div style="flex:1;">
                <label class="form-label" style="font-size:11px; margin-bottom:2px;">Merchant Code (Text)</label>
                <input type="text" class="form-input" id="shop-merchant-code" value="${rest.merchant_code || 'KBZP-98721382'}" ${isStaff ? 'disabled' : ''} style="height:32px; font-size:12px;">
                <div style="font-size:10.5px; color:var(--color-outline); margin-top:4px;">Displayed to customers on bill checkout.</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Social Media Links -->
        <div class="form-row mt-2">
          <div class="form-group mb-0" style="flex:1;">
            <label class="form-label" style="font-size:12px; font-weight:600;">Facebook URL</label>
            <input type="url" class="form-input" id="shop-facebook" value="${rest.facebook_url || 'https://facebook.com/theglasspavilion'}" ${isStaff ? 'disabled' : ''}>
          </div>
          <div class="form-group mb-0" style="flex:1;">
            <label class="form-label" style="font-size:12px; font-weight:600;">Instagram URL</label>
            <input type="url" class="form-input" id="shop-instagram" value="${rest.instagram_url || 'https://instagram.com/theglasspavilion'}" ${isStaff ? 'disabled' : ''}>
          </div>
        </div>
      </div>
    `;

    // ==========================================
    // Section: Booking Operations Settings (cancellation policy & auto_confirm)
    // ==========================================
    const cancelHoursVal = rest.cancel_hours !== undefined ? rest.cancel_hours : 24;
    const cancelFeeVal = rest.cancel_fee_pct !== undefined ? rest.cancel_fee_pct : 0;

    const section4BookingOperations = `
      <div class="card flex flex-col gap-4">
        <div>
          <h3 class="text-label-md" style="font-weight:700; color:var(--color-primary); margin:0;">
            Booking Operations & Cancellation Policy
          </h3>
          <div style="font-size:11.5px; color:var(--color-outline); margin-top:2px;">
            Auto-confirmation rule and customer cancellation policy parameters.
          </div>
        </div>

        <div class="grid grid-3 gap-4" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr));">
          <!-- Free Cancellation Deadline -->
          <div class="form-group mb-0">
            <label class="form-label" style="font-size:12px; font-weight:600;">
              Free Cancellation Deadline<span class="required">*</span>
            </label>
            <div class="flex items-center gap-2">
              <input type="number" class="form-input" id="shop-cancel-hours" value="${cancelHoursVal}" ${isStaff ? 'disabled' : ''} min="0" max="168" onchange="ScreenS05.updatePolicyPreview()">
              <span style="font-size:12px; color:var(--color-outline);">Hours before</span>
            </div>
            <span class="form-hint" style="font-size:10.5px;">Free cancellation up to ${cancelHoursVal}h before arrival.</span>
          </div>

          <!-- Cancellation Fee Percentage -->
          <div class="form-group mb-0">
            <label class="form-label" style="font-size:12px; font-weight:600;">
              Cancellation Fee Percentage<span class="required">*</span>
            </label>
            <div class="flex items-center gap-2">
              <input type="number" class="form-input" id="shop-cancel-fee" value="${cancelFeeVal}" ${isStaff ? 'disabled' : ''} min="0" max="100" onchange="ScreenS05.updatePolicyPreview()">
              <span style="font-size:12px; color:var(--color-outline);">%</span>
            </div>
            <span class="form-hint" style="font-size:10.5px;">Applied if cancelled after deadline.</span>
          </div>

          <!-- Auto Confirm Toggle -->
          <div class="form-group mb-0 flex flex-col justify-center">
            <label class="flex items-center gap-2" style="cursor:pointer; font-size:12.5px; font-weight:600; color:var(--color-primary);">
              <input type="checkbox" id="shop-auto-confirm" ${rest.auto_confirm !== false ? 'checked' : ''} ${isStaff ? 'disabled' : ''} style="width:16px; height:16px; cursor:pointer;">
              <span>Auto-Confirm Incoming Bookings</span>
            </label>
            <span class="form-hint" style="font-size:10.5px;">
              When OFF, bookings start as <code>pending</code> and require manual confirmation or 30-min BAT-02 timeout.
            </span>
          </div>
        </div>

        <!-- Policy Preview Box -->
        <div id="cancel-policy-preview" class="p-3 bg-surface-container flex items-center gap-3" style="border-radius:var(--radius-md); border:1px dashed var(--color-outline-variant); font-size:12px; color:var(--color-on-surface);">
          <span style="font-size:16px;">📜</span>
          <div>
            <strong>Cancellation Policy Preview (Shown on U-06 / RPT-01):</strong><br>
            <span id="cancel-preview-text" style="color:var(--color-primary); font-weight:600;">
              Free cancellation up to ${cancelHoursVal} hours before arrival time. Late cancellations will incur a ${cancelFeeVal}% fee.
            </span>
          </div>
        </div>
      </div>
    `;

    const content = `
      ${debugRoleBar}
      ${warningBanner}
      ${Components.pageHeader('Shop Information Settings', 'Configure basic details, multi-cuisines, contact lines, menu catalog, and cancellation policies')}

      <div style="display:flex; flex-direction:column; gap:24px; max-width:1080px; margin:0 auto;">
        ${section1BasicInfo}
        ${section2ContactLocation}
        ${section3MediaMenus}
        ${section4BookingOperations}

        <!-- Global Save Actions Bar -->
        <div class="card p-4 flex justify-between items-center flex-wrap gap-4" style="position:sticky; bottom:16px; z-index:10; background:var(--color-surface-container-lowest, #fff); box-shadow:0 4px 16px rgba(0,0,0,0.08); border-radius:var(--radius-md);">
          <div style="font-size:12px; color:var(--color-outline);">
            ${isStaff ? 'Viewing in Read-Only Mode (Staff)' : 'All 4 sections will be saved simultaneously to shops, menus, shop_phones, and shop_facilities.'}
          </div>
          <div class="flex gap-3">
            <button class="btn btn-ghost" onclick="Router.navigate('/shop/dashboard')">${I18n.t('cancel')}</button>
            <button class="btn btn-primary" ${isStaff ? 'disabled' : ''} onclick="ScreenS05.saveAllSettings()">
              💾 Save All Settings
            </button>
          </div>
        </div>
      </div>
    `;

    App.renderAdminPage('shop', 'Shop Information', content);
  }

  function toggleCuisine(c) {
    if (selectedCuisines.includes(c)) {
      if (selectedCuisines.length === 1) {
        showToast('error', 'Validation Error', 'At least one cuisine genre is required (§3.19).');
        return;
      }
      selectedCuisines = selectedCuisines.filter(item => item !== c);
      if (primaryCuisine === c) {
        primaryCuisine = selectedCuisines[0];
      }
    } else {
      selectedCuisines.push(c);
    }
    render();
  }

  function setPrimaryCuisine(c) {
    primaryCuisine = c;
    render();
  }

  function toggleFacility(f) {
    if (selectedFacilities.includes(f)) {
      selectedFacilities = selectedFacilities.filter(item => item !== f);
    } else {
      selectedFacilities.push(f);
    }
    render();
  }

  function updatePhoneType(idx, type) {
    if (phoneList[idx]) {
      phoneList[idx].phone_type = type;
      if (type === 'admin_contact') {
        phoneList[idx].is_public = false;
      }
      render();
    }
  }

  function updatePhoneLabel(idx, label) {
    if (phoneList[idx]) {
      phoneList[idx].label = label.trim();
    }
  }

  function updatePhonePublic(idx, isPublic) {
    if (phoneList[idx]) {
      phoneList[idx].is_public = isPublic;
      render();
    }
  }

  function deletePhone(idx) {
    phoneList.splice(idx, 1);
    render();
  }

  function addPhoneModal() {
    const modalHtml = `
      <div class="modal-backdrop" id="add-phone-modal" onclick="if(event.target===this)this.remove()">
        <div class="modal modal--sm animate-scale-in" style="max-width:420px;">
          <div class="modal__header">
            <h3 class="modal__title">Add Contact Phone Number</h3>
            <button class="modal__close" onclick="document.getElementById('add-phone-modal').remove()">✕</button>
          </div>
          <div class="modal__body flex flex-col gap-4">
            <div class="form-group mb-0">
              <label class="form-label">Phone Number<span class="required">*</span></label>
              <input type="tel" class="form-input" id="new-phone-num" placeholder="+95 9 1234 5678">
            </div>
            <div class="form-group mb-0">
              <label class="form-label">Usage Type<span class="required">*</span></label>
              <select class="form-input" id="new-phone-type">
                <option value="reservation">Reservation Line</option>
                <option value="representative">Shop Representative</option>
                <option value="viber_whatsapp">Viber / WhatsApp</option>
                <option value="admin_contact">Internal Operator Contact (Private)</option>
              </select>
            </div>
            <div class="form-group mb-0">
              <label class="form-label">Label (Optional)</label>
              <input type="text" class="form-input" id="new-phone-label" placeholder="E.g. English speaking line">
            </div>
          </div>
          <div class="modal__footer">
            <button class="btn btn-ghost" onclick="document.getElementById('add-phone-modal').remove()">${I18n.t('cancel')}</button>
            <button class="btn btn-primary" onclick="ScreenS05.saveNewPhone()">${I18n.t('create')}</button>
          </div>
        </div>
      </div>
    `;
    const div = document.createElement('div');
    div.innerHTML = modalHtml;
    document.body.appendChild(div.firstElementChild);
  }

  function saveNewPhone() {
    const num = document.getElementById('new-phone-num').value.trim();
    const type = document.getElementById('new-phone-type').value;
    const label = document.getElementById('new-phone-label').value.trim();

    if (!num) {
      showToast('error', 'Validation Error', 'Please enter a phone number.');
      return;
    }

    phoneList.push({
      id: Date.now(),
      number: num,
      phone_type: type,
      is_public: type !== 'admin_contact',
      label,
      sort_order: phoneList.length + 1
    });

    showToast('success', 'Phone Added', 'New phone line added to registry.');
    document.getElementById('add-phone-modal').remove();
    render();
  }

  function triggerMockUpload() {
    showToast('info', 'Uploading', 'Uploading photo to Supabase Storage...');
    setTimeout(() => {
      const mockImages = [
        Paths.image('street_bites_cafe.png'),
        Paths.image('spice_route.png'),
        Paths.image('lakeview_terrace.png')
      ];
      const randomUrl = mockImages[Math.floor(Math.random() * mockImages.length)];
      uploadedPhotos.push({
        url: randomUrl,
        caption: 'Dining Hall View',
        is_cover: uploadedPhotos.length === 0,
        sort_order: uploadedPhotos.length
      });
      showToast('success', 'Upload Complete', 'Photo uploaded and added to gallery.');
      render();
    }, 600);
  }

  function triggerQRUpload() {
    showToast('info', 'Uploading QR', 'Uploading KBZPay static merchant QR code...');
    setTimeout(() => {
      showToast('success', 'Complete', 'KBZPay merchant QR code updated.');
      render();
    }, 600);
  }

  function updateImageCaption(index, val) {
    if (uploadedPhotos[index]) {
      uploadedPhotos[index].caption = val.trim();
    }
  }

  function setCoverImage(index, checked) {
    if (!checked) return;
    uploadedPhotos.forEach((photo, idx) => {
      photo.is_cover = idx === index;
    });
    showToast('info', 'Cover Assigned', 'Selected photo assigned as primary cover.');
    render();
  }

  function deletePhoto(index) {
    const wasCover = uploadedPhotos[index]?.is_cover;
    uploadedPhotos.splice(index, 1);
    if (wasCover && uploadedPhotos.length > 0) {
      uploadedPhotos[0].is_cover = true;
    }
    showToast('success', 'Removed', 'Image removed from gallery.');
    render();
  }

  function togglePublishMenu(idx) {
    if (menuList[idx]) {
      menuList[idx].is_published = !menuList[idx].is_published;
      render();
    }
  }

  function addMenuItem() {
    const modalHtml = `
      <div class="modal-backdrop" id="add-menu-modal" onclick="if(event.target===this)this.remove()">
        <div class="modal modal--sm animate-scale-in" style="max-width:460px;">
          <div class="modal__header">
            <h3 class="modal__title">${I18n.t('add_menu_item')}</h3>
            <button class="modal__close" onclick="document.getElementById('add-menu-modal').remove()">✕</button>
          </div>
          <div class="modal__body flex flex-col gap-4">
            <div class="form-group mb-0">
              <label class="form-label">Menu Item Name (English)<span class="required">*</span></label>
              <input type="text" class="form-input" id="menu-item-name" placeholder="E.g. Roasted Chicken">
            </div>
            <div class="form-group mb-0">
              <label class="form-label">Menu Item Name (Myanmar - Optional)</label>
              <input type="text" class="form-input" id="menu-item-name-mm" placeholder="ဥပမာ - ကြက်ကင်">
            </div>
            <div class="form-row">
              <div class="form-group mb-0" style="flex:1;">
                <label class="form-label">Category<span class="required">*</span></label>
                <select class="form-input" id="menu-item-category">
                  <option value="Main Course">Main Course</option>
                  <option value="Seafood">Seafood</option>
                  <option value="Appetizer">Appetizer</option>
                  <option value="Dessert">Dessert</option>
                  <option value="Beverage">Beverage</option>
                </select>
              </div>
              <div class="form-group mb-0" style="flex:1;">
                <label class="form-label">Expected Duration<span class="required">*</span></label>
                <input type="number" class="form-input" id="menu-item-duration" value="60" min="30" max="480">
              </div>
            </div>
            <div class="form-group mb-0">
              <label class="form-label">Price (MMK)<span class="required">*</span></label>
              <input type="number" class="form-input" id="menu-item-price" placeholder="E.g. 18500" min="0">
            </div>
            <div class="form-group mb-0">
              <label class="form-label">Description (Optional)</label>
              <textarea class="form-textarea" id="menu-item-desc" rows="2" placeholder="Brief menu description..."></textarea>
            </div>
            <div class="flex items-center gap-4">
              <label class="flex items-center gap-2" style="font-size:12px; cursor:pointer;">
                <input type="checkbox" id="menu-item-popular" style="cursor:pointer;">
                <span>Mark as Popular</span>
              </label>
              <label class="flex items-center gap-2" style="font-size:12px; cursor:pointer;">
                <input type="checkbox" id="menu-item-published" checked style="cursor:pointer;">
                <span>Published (Active)</span>
              </label>
            </div>
          </div>
          <div class="modal__footer">
            <button class="btn btn-ghost" onclick="document.getElementById('add-menu-modal').remove()">${I18n.t('cancel')}</button>
            <button class="btn btn-primary" onclick="ScreenS05.saveMenuItem()">${I18n.t('create')}</button>
          </div>
        </div>
      </div>
    `;
    const div = document.createElement('div');
    div.innerHTML = modalHtml;
    document.body.appendChild(div.firstElementChild);
  }

  function saveMenuItem() {
    const name = document.getElementById('menu-item-name').value.trim();
    const name_mm = document.getElementById('menu-item-name-mm').value.trim();
    const category = document.getElementById('menu-item-category').value;
    const desc = document.getElementById('menu-item-desc').value.trim();
    const price = document.getElementById('menu-item-price').value.trim();
    const duration = document.getElementById('menu-item-duration').value.trim();
    const isPopular = document.getElementById('menu-item-popular').checked;
    const isPublished = document.getElementById('menu-item-published').checked;

    if(!name || !price) {
      showToast('error', 'Validation Error', 'Please enter item name and price.');
      return;
    }

    const priceNum = parseInt(price, 10);
    const durationNum = parseInt(duration, 10) || 60;

    menuList.push({
      name,
      name_mm,
      category_name: category,
      description: desc,
      price: priceNum,
      duration_min: durationNum,
      is_popular: isPopular,
      is_published: isPublished
    });

    showToast('success', 'Created', 'Menu item registered.');
    document.getElementById('add-menu-modal').remove();
    render();
  }

  function deleteMenuItem(idx) {
    if (menuList.length <= 1) {
      showToast('error', 'Validation Error', 'At least 1 menu item is required (§3.19).');
      return;
    }
    menuList.splice(idx, 1);
    showToast('success', 'Deleted', 'Menu item removed.');
    render();
  }

  function updatePolicyPreview() {
    const hours = document.getElementById('shop-cancel-hours').value || 24;
    const fee = document.getElementById('shop-cancel-fee').value || 0;
    const previewEl = document.getElementById('cancel-preview-text');
    if (previewEl) {
      previewEl.innerText = `Free cancellation up to ${hours} hours before arrival time. Late cancellations will incur a ${fee}% fee.`;
    }
  }

  function setTestRole(role) {
    Router.authState.shop.role = role;
    showToast('info', 'Permission Role Changed', `Current session role updated to ${role}.`);
    render();
  }

  function saveAllSettings() {
    const name = document.getElementById('shop-name').value.trim();
    if (!name) {
      showToast('error', 'Validation Error', 'Shop name is required.');
      return;
    }

    const hasPublicPhone = phoneList.some(p => p.is_public);
    if (!hasPublicPhone) {
      showToast('error', 'Validation Error', 'At least 1 public contact phone number is required (§3.19).');
      return;
    }

    showToast('success', 'Saved Successfully', 'All 4 shop information sections updated in database.');
  }

  return { 
    render, 
    toggleCuisine, 
    setPrimaryCuisine, 
    toggleFacility, 
    updatePhoneType, 
    updatePhoneLabel, 
    updatePhonePublic, 
    deletePhone, 
    addPhoneModal, 
    saveNewPhone, 
    triggerMockUpload, 
    triggerQRUpload, 
    updateImageCaption, 
    setCoverImage, 
    deletePhoto, 
    togglePublishMenu, 
    addMenuItem, 
    saveMenuItem, 
    deleteMenuItem, 
    updatePolicyPreview, 
    setTestRole, 
    saveAllSettings 
  };
})();
