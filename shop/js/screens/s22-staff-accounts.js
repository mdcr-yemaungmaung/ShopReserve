/* ============================================================
   EzBookNow Screen S-22 — Staff Accounts Management
   Docs: スタッフアカウント管理 — login accounts (shop_users)
   issue, role, suspend, invite (C-15). Audit-required screen.
   Only shop_owner may operate. Entity: shop_users.
   ============================================================ */

const ScreenS22 = (() => {
  let staffAccounts = [
    { id: 1, email: 'owner@glasspavilion.example', name: 'Kyaw Zin Htet', role: 'owner', status: 'active', twoFa: 'enabled', lastLogin: '2026-08-12 21:40' },
    { id: 2, email: 'mgmg@glasspavilion.example', name: 'Mg Mg Aung', role: 'staff', status: 'active', twoFa: 'not_registered', lastLogin: '2026-08-11 18:05' },
    { id: 3, email: 'su@glasspavilion.example', name: 'Su Su Win', role: 'staff', status: 'active', twoFa: 'enabled', lastLogin: '2026-08-10 12:22' },
    { id: 4, email: 'thiha@glasspavilion.example', name: 'Thiha Kyaw', role: 'staff', status: 'suspended', twoFa: 'not_registered', lastLogin: '2026-07-28 09:14' }
  ];

  const ROLE_LABELS = { owner: { en: 'Owner', mm: 'ပိုင်ရှင်' }, staff: { en: 'Staff', mm: 'ဝန်ထမ်း' } };

  function t(role, lang) {
    const meta = ROLE_LABELS[role] || { en: role, mm: role };
    return lang === 'mm' ? meta.mm : meta.en;
  }

  function render() {
    const lang = I18n.getLang();
    const isOwner = Router.getAuth().role === 'shop_owner';

    const rowsHtml = staffAccounts.map((a, idx) => {
      const roleBadge = a.role === 'owner'
        ? `<span class="badge badge--primary" style="background:#ede9fe;color:#6d28d9;border:1px solid #ddd6fe;">${t('owner', lang)}</span>`
        : `<span class="badge" style="background:#e0f2fe;color:#0369a1;border:1px solid #bae6fd;">${t('staff', lang)}</span>`;

      const statusBadge = a.status === 'active'
        ? `<span class="badge badge--success">${lang === 'mm' ? 'ဖွင့်ထား' : 'Active'}</span>`
        : `<span class="badge badge--expired">${lang === 'mm' ? 'ရပ်ထား' : 'Suspended'}</span>`;

      const twoFaBadge = a.twoFa === 'enabled'
        ? `<span class="badge badge--success" style="background:#dcfce7;color:#166534;border:1px solid #86efac;">2FA ✓</span>`
        : `<span class="badge" style="background:#f3f4f6;color:#6b7280;border:1px solid #e5e7eb;">2FA ${lang === 'mm' ? 'မရှိ' : '—'}</span>`;

      const lastOwner = a.role === 'owner';
      const actions = !isOwner ? `<span style="font-size:11.5px;color:var(--color-outline);">${lang === 'mm' ? 'ဖတ်ရန်သာ' : 'Read-only'}</span>` : `
        <div class="flex gap-2">
          <button class="btn btn-ghost btn-sm" onclick="ScreenS22.reinvite(${idx})" title="Invite / re-invite">✉️</button>
          ${a.status === 'active'
            ? `<button class="btn btn-ghost btn-sm" onclick="ScreenS22.toggleStatus(${idx})" title="Suspend">⏸️</button>`
            : `<button class="btn btn-ghost btn-sm" onclick="ScreenS22.toggleStatus(${idx})" title="Activate">▶️</button>`}
          ${a.role === 'staff'
            ? `<button class="btn btn-ghost btn-sm" onclick="ScreenS22.send2faReset(${idx})" title="2FA reset link">🔐</button>`
            : ''}
          <button class="btn btn-ghost btn-sm" style="color:var(--color-error);" onclick="ScreenS22.remove(${idx})" title="Delete" ${lastOwner ? 'disabled' : ''}>🗑️</button>
        </div>`;

      return `
        <tr>
          <td style="font-weight:600;color:var(--color-primary);font-family:monospace;font-size:12.5px;">${a.email}</td>
          <td>
            <div style="font-weight:600;">${a.name}</div>
            <div style="font-size:11px;color:var(--color-outline);">${lang === 'mm' ? 'နောက်ဆုံးဝင်ချိန်' : 'Last login'}: ${a.lastLogin}</div>
          </td>
          <td>${roleBadge}</td>
          <td>${statusBadge}</td>
          <td>${twoFaBadge}</td>
          <td>${actions}</td>
        </tr>`;
    }).join('');

    const toolbar = isOwner
      ? `<button class="btn btn-primary btn-sm" onclick="ScreenS22.showInviteModal()">${Components.icon('plus', 14)} ${lang === 'mm' ? 'အကောင့်ဖိတ်ရန်' : 'Invite Account'}</button>`
      : '';

    const tableHtml = Components.dataTable({
      columns: [
        lang === 'mm' ? 'အီးမေးလ်' : 'Email',
        lang === 'mm' ? 'အမည်' : 'Name',
        lang === 'mm' ? 'အခန်းကဏ္ဍ' : 'Role',
        lang === 'mm' ? 'အခြေအနေ' : 'Status',
        '2FA',
        lang === 'mm' ? 'လုပ်ဆောင်ချက်' : 'Actions'
      ],
      rows: rowsHtml,
      searchPlaceholder: lang === 'mm' ? 'အီးမေးလ်/အမည် ရှာရန်...' : 'Search email or name...',
      actions: toolbar,
      pagination: false
    });

    const readOnlyBanner = !isOwner ? `
      <div class="p-3 mb-4 bg-error-container text-on-error-container flex items-center gap-2" style="border-radius:var(--radius-md);font-weight:600;font-size:13px;">
        ⚠️ ${lang === 'mm' ? 'ဖတ်ရှုရန်သာ: ပိုင်ရှင် (Owner) သာ အကောင့်များ စီမံနိုင်ပါသည်။' : 'Read-Only Mode: Only the Shop Owner (shop_owner) can manage login accounts (C-15).'}
      </div>
    ` : '';

    const subNavTabs = `
      <div class="flex gap-2 mb-4 p-1 bg-surface-container-low" style="border-radius:var(--radius-md);border:1px solid var(--color-outline-variant);width:fit-content;">
        <button class="btn btn-ghost btn-sm" onclick="Router.navigate('/shop/staff-tables')">👥 ${lang === 'mm' ? 'ဝန်ထမ်း' : 'Staff Members'}</button>
        <button class="btn btn-ghost btn-sm" onclick="Router.navigate('/shop/tables')">🪑 ${lang === 'mm' ? 'စားပွဲ' : 'Seat & Tables'}</button>
        <button class="btn btn-primary btn-sm" onclick="Router.navigate('/shop/staff-accounts')">🔐 ${lang === 'mm' ? 'စတက်ဖ်အကောင့်' : 'Staff Accounts'}</button>
      </div>`;

    const content = `
      ${Components.pageHeader(lang === 'mm' ? 'စတက်ဖ်အကောင့် စီမံခန့်ခွဲမှု' : 'Staff Accounts Management', lang === 'mm' ? 'ဆိုင်၏ လော့ဂ်အင်အကောင့်များကို စီမံပါ (shop_users)' : 'Manage shop login accounts (shop_users)')}
      ${subNavTabs}
      ${readOnlyBanner}
      <div class="card p-0 overflow-hidden">
        ${tableHtml}
      </div>
      <div class="card" style="margin-top:16px;padding:14px 18px;font-size:12.5px;color:var(--color-on-surface-variant);line-height:1.7;">
        ${lang === 'mm'
          ? '🔐 2FA ပြန်လည်သတ်မှတ်ခြင်း: ဝန်ထမ်းက ဖုန်းပျောက်ပြီး ပြန်လည်ရယူနိုင်မှု မရှိပါက ဤနေရာမှ လင့်ခ် ပို့နိုင်သည် (1နာရီသက်တမ်း)။ ပိုင်ရှင်၏ 2FA ပြန်လည်သတ်မှတ်မှုကို AD-17 (အော်ပရေတာ) မှ သာ ဆောင်ရွက်နိုင်သည်။'
          : '🔐 2FA reset: If a staff member loses their device and recovery codes, send a one-time (1h expiry) reset link here. Owner 2FA recovery is handled via AD-17 (operator) only.'}
      </div>
    `;

    App.renderAdminPage('shop', lang === 'mm' ? 'စတက်ဖ်အကောင့်' : 'Staff Accounts', content);
  }

  function logAudit(action, detail) {
    try {
      const logs = JSON.parse(localStorage.getItem('s22_audit_logs') || '[]');
      logs.unshift({ at: new Date().toISOString(), action, detail });
      localStorage.setItem('s22_audit_logs', JSON.stringify(logs.slice(0, 200)));
    } catch (e) { /* ignore */ }
  }

  function showInviteModal() {
    const lang = I18n.getLang();
    const modal = document.createElement('div');
    modal.className = 'modal-backdrop';
    modal.id = 's22-invite-modal';
    modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
    modal.innerHTML = `
      <div class="modal modal--sm animate-scale-in">
        <div class="modal__header">
          <h3 class="modal__title">${lang === 'mm' ? 'အကောင့်ဖိတ်ရန်' : 'Invite Staff Account'}</h3>
          <button class="modal__close" onclick="document.getElementById('s22-invite-modal').remove()">✕</button>
        </div>
        <div class="modal__body flex flex-col gap-4">
          <div>
            <label class="form-label" style="font-size:12px;font-weight:600;">Email *</label>
            <input type="email" id="s22-email" class="form-input" placeholder="staff@example.com">
          </div>
          <div>
            <label class="form-label" style="font-size:12px;font-weight:600;">${lang === 'mm' ? 'အမည်' : 'Name'} *</label>
            <input type="text" id="s22-name" class="form-input" placeholder="Full name">
          </div>
          <div>
            <label class="form-label" style="font-size:12px;font-weight:600;">${lang === 'mm' ? 'အခန်းကဏ္ဍ' : 'Role'} *</label>
            <select id="s22-role" class="form-input">
              <option value="staff">Staff</option>
              <option value="owner">Owner</option>
            </select>
          </div>
        </div>
        <div class="modal__footer">
          <button class="btn btn-ghost" onclick="document.getElementById('s22-invite-modal').remove()">${I18n.t('cancel')}</button>
          <button class="btn btn-primary" onclick="ScreenS22.saveInvite()">${I18n.t('confirm')}</button>
        </div>
      </div>`;
    document.body.appendChild(modal);
  }

  function saveInvite() {
    const email = (document.getElementById('s22-email') || {}).value?.trim();
    const name = (document.getElementById('s22-name') || {}).value?.trim();
    const role = (document.getElementById('s22-role') || {}).value;

    if (!email || !name) {
      showToast('error', 'Validation Error', 'Please fill in email and name.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showToast('error', 'Validation Error', 'Please enter a valid email address.');
      return;
    }
    if (staffAccounts.some(a => a.email === email)) {
      showToast('error', 'Duplicate Email', 'This account already exists.');
      return;
    }

    staffAccounts.push({
      id: Date.now(),
      email,
      name,
      role,
      status: 'active',
      twoFa: 'not_registered',
      lastLogin: '—'
    });
    logAudit('ACCOUNT_INVITE', email);
    showToast('success', 'Invite Sent', `Invitation email sent to ${email}.`);
    document.getElementById('s22-invite-modal')?.remove();
    render();
  }

  function reinvite(idx) {
    const a = staffAccounts[idx];
    logAudit('ACCOUNT_REINVITE', a.email);
    showToast('info', 'Re-invite', `Re-invitation email sent to ${a.email}.`);
  }

  function toggleStatus(idx) {
    const a = staffAccounts[idx];
    const next = a.status === 'active' ? 'suspended' : 'active';
    const modal = document.createElement('div');
    modal.className = 'modal-backdrop';
    modal.id = 's22-status-modal';
    modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
    modal.innerHTML = `
      <div class="modal modal--sm animate-scale-in">
        <div class="modal__header">
          <h3 class="modal__title">${next === 'suspended' ? 'Suspend Account' : 'Activate Account'}</h3>
          <button class="modal__close" onclick="document.getElementById('s22-status-modal').remove()">✕</button>
        </div>
        <div class="modal__body">
          <p style="font-size:13.5px;color:var(--color-on-surface);line-height:1.6;">
            ${next === 'suspended'
              ? `Suspend <strong>${a.name}</strong> (${a.email})? They will be blocked from logging in immediately and all refresh tokens revoked.`
              : `Activate <strong>${a.name}</strong> (${a.email})?`}
          </p>
        </div>
        <div class="modal__footer">
          <button class="btn btn-ghost" onclick="document.getElementById('s22-status-modal').remove()">${I18n.t('cancel')}</button>
          <button class="btn ${next === 'suspended' ? 'btn-danger' : 'btn-primary'}" onclick="ScreenS22.confirmToggle(${idx})">${I18n.t('confirm')}</button>
        </div>
      </div>`;
    document.body.appendChild(modal);
  }

  function confirmToggle(idx) {
    const a = staffAccounts[idx];
    a.status = a.status === 'active' ? 'suspended' : 'active';
    logAudit(a.status === 'suspended' ? 'ACCOUNT_SUSPEND' : 'ACCOUNT_ACTIVATE', a.email);
    document.getElementById('s22-status-modal')?.remove();
    showToast('success', a.status === 'suspended' ? 'Suspended' : 'Activated', `${a.email} is now ${a.status}.`);
    render();
  }

  function send2faReset(idx) {
    const a = staffAccounts[idx];
    if (a.role !== 'staff') return;
    const modal = document.createElement('div');
    modal.className = 'modal-backdrop';
    modal.id = 's22-2fa-modal';
    modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
    modal.innerHTML = `
      <div class="modal modal--sm animate-scale-in">
        <div class="modal__header">
          <h3 class="modal__title">2FA Reset Link</h3>
          <button class="modal__close" onclick="document.getElementById('s22-2fa-modal').remove()">✕</button>
        </div>
        <div class="modal__body">
          <p style="font-size:13.5px;color:var(--color-on-surface);line-height:1.6;">
            Send a one-time 2FA reset link (valid 1 hour) to <strong>${a.name}</strong> (${a.email})? The link requires their current password and revokes all refresh tokens on completion.
          </p>
        </div>
        <div class="modal__footer">
          <button class="btn btn-ghost" onclick="document.getElementById('s22-2fa-modal').remove()">${I18n.t('cancel')}</button>
          <button class="btn btn-primary" onclick="ScreenS22.confirm2faReset(${idx})">${I18n.t('confirm')}</button>
        </div>
      </div>`;
    document.body.appendChild(modal);
  }

  function confirm2faReset(idx) {
    const a = staffAccounts[idx];
    logAudit('ACCOUNT_2FA_RESET_LINK', a.email);
    document.getElementById('s22-2fa-modal')?.remove();
    showToast('success', 'Link Sent', `2FA reset link sent to ${a.email} (expires in 1 hour).`);
  }

  function remove(idx) {
    const a = staffAccounts[idx];
    if (a.role === 'owner') {
      showToast('error', 'Cannot Delete', 'The last owner account cannot be deleted.');
      return;
    }
    const modal = document.createElement('div');
    modal.className = 'modal-backdrop';
    modal.id = 's22-delete-modal';
    modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
    modal.innerHTML = `
      <div class="modal modal--sm animate-scale-in">
        <div class="modal__header">
          <h3 class="modal__title">Delete Account</h3>
          <button class="modal__close" onclick="document.getElementById('s22-delete-modal').remove()">✕</button>
        </div>
        <div class="modal__body">
          <p style="font-size:13.5px;color:var(--color-on-surface);line-height:1.6;">
            Permanently delete <strong>${a.name}</strong> (${a.email})? This is a logical delete (deleted_at set) and is recorded in the audit log.
          </p>
        </div>
        <div class="modal__footer">
          <button class="btn btn-ghost" onclick="document.getElementById('s22-delete-modal').remove()">${I18n.t('cancel')}</button>
          <button class="btn btn-danger" onclick="ScreenS22.confirmDelete(${idx})">Delete</button>
        </div>
      </div>`;
    document.body.appendChild(modal);
  }

  function confirmDelete(idx) {
    const a = staffAccounts[idx];
    staffAccounts.splice(idx, 1);
    logAudit('ACCOUNT_DELETE', a.email);
    document.getElementById('s22-delete-modal')?.remove();
    showToast('success', 'Deleted', `${a.email} marked as deleted.`);
    render();
  }

  return { render, showInviteModal, saveInvite, reinvite, toggleStatus, confirmToggle, send2faReset, confirm2faReset, remove, confirmDelete };
})();
