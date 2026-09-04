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

  function getRoleLabel(role) {
    if (role === 'owner') return I18n.t('s22_role_owner');
    if (role === 'staff') return I18n.t('s22_role_staff');
    return role;
  }

  function render() {
    const isOwner = Router.getAuth().role === 'shop_owner';

    const rowsHtml = staffAccounts.map((a, idx) => {
      const roleBadge = a.role === 'owner'
        ? `<span class="badge badge--primary" style="background:#ede9fe;color:#6d28d9;border:1px solid #ddd6fe;">${getRoleLabel('owner')}</span>`
        : `<span class="badge" style="background:#e0f2fe;color:#0369a1;border:1px solid #bae6fd;">${getRoleLabel('staff')}</span>`;

      const statusBadge = a.status === 'active'
        ? `<span class="badge badge--success">${I18n.t('s22_active')}</span>`
        : `<span class="badge badge--expired">${I18n.t('s22_suspended')}</span>`;

      const twoFaBadge = a.twoFa === 'enabled'
        ? `<span class="badge badge--success" style="background:#dcfce7;color:#166534;border:1px solid #86efac;">2FA ✓</span>`
        : `<span class="badge" style="background:#f3f4f6;color:#6b7280;border:1px solid #e5e7eb;">2FA ${I18n.t('s22_no_2fa')}</span>`;

      const lastOwner = a.role === 'owner';
      const actions = !isOwner ? `<span style="font-size:11.5px;color:var(--color-outline);">${I18n.t('s22_readonly')}</span>` : `
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
            <div style="font-size:11px;color:var(--color-outline);">${I18n.t('s22_last_login')}: ${a.lastLogin}</div>
          </td>
          <td>${roleBadge}</td>
          <td>${statusBadge}</td>
          <td>${twoFaBadge}</td>
          <td>${actions}</td>
        </tr>`;
    }).join('');

    const toolbar = isOwner
      ? `<button class="btn btn-primary btn-sm" onclick="ScreenS22.showInviteModal()">${Components.icon('plus', 14)} ${I18n.t('s22_invite_account')}</button>`
      : '';

    const tableHtml = Components.dataTable({
      columns: [
        I18n.t('s22_email_label'),
        I18n.t('s22_name_label'),
        I18n.t('s22_role_label'),
        I18n.t('s22_status_label'),
        '2FA',
        I18n.t('s22_actions_label')
      ],
      rows: rowsHtml,
      searchPlaceholder: I18n.t('s22_search_placeholder'),
      actions: toolbar,
      pagination: false
    });

    const readOnlyBanner = !isOwner ? `
      <div class="p-3 mb-4 bg-error-container text-on-error-container flex items-center gap-2" style="border-radius:var(--radius-md);font-weight:600;font-size:13px;">
        ⚠️ ${I18n.t('s22_readonly_owner_warning')}
      </div>
    ` : '';

    const subNavTabs = `
      <div class="flex gap-2 mb-4 p-1 bg-surface-container-low" style="border-radius:var(--radius-md);border:1px solid var(--color-outline-variant);width:fit-content;">
        <button class="btn btn-ghost btn-sm" onclick="Router.navigate('/shop/staff-tables')">👥 ${I18n.t('s22_tab_staff')}</button>
        <button class="btn btn-ghost btn-sm" onclick="Router.navigate('/shop/tables')">🪑 ${I18n.t('s22_tab_tables')}</button>
        <button class="btn btn-primary btn-sm" onclick="Router.navigate('/shop/staff-accounts')">🔐 ${I18n.t('s22_tab_accounts')}</button>
      </div>`;

    const content = `
      ${Components.pageHeader(I18n.t('s22_title'), I18n.t('s22_subtitle'))}
      ${subNavTabs}
      ${readOnlyBanner}
      <div class="card p-0 overflow-hidden">
        ${tableHtml}
      </div>
      <div class="card" style="margin-top:16px;padding:14px 18px;font-size:12.5px;color:var(--color-on-surface-variant);line-height:1.7;">
        ${I18n.t('s22_2fa_help')}
      </div>
    `;

    App.renderAdminPage('shop', I18n.t('s22_tab_accounts'), content);
  }

  function logAudit(action, detail) {
    try {
      const logs = JSON.parse(localStorage.getItem('s22_audit_logs') || '[]');
      logs.unshift({ at: new Date().toISOString(), action, detail });
      localStorage.setItem('s22_audit_logs', JSON.stringify(logs.slice(0, 200)));
    } catch (e) { /* ignore */ }
  }

  function showInviteModal() {
    const modal = document.createElement('div');
    modal.className = 'modal-backdrop';
    modal.id = 's22-invite-modal';
    modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
    modal.innerHTML = `
      <div class="modal modal--sm animate-scale-in">
        <div class="modal__header">
          <h3 class="modal__title">${I18n.t('s22_invite_modal_title')}</h3>
          <button class="modal__close" onclick="document.getElementById('s22-invite-modal').remove()">✕</button>
        </div>
        <div class="modal__body flex flex-col gap-4">
          <div>
            <label class="form-label" style="font-size:12px;font-weight:600;">${I18n.t('s22_email_label')} *</label>
            <input type="email" id="s22-email" class="form-input" placeholder="staff@example.com">
          </div>
          <div>
            <label class="form-label" style="font-size:12px;font-weight:600;">${I18n.t('s22_name_label')} *</label>
            <input type="text" id="s22-name" class="form-input" placeholder="Full name">
          </div>
          <div>
            <label class="form-label" style="font-size:12px;font-weight:600;">${I18n.t('s22_role_label')} *</label>
            <select id="s22-role" class="form-input">
              <option value="staff">${I18n.t('s22_role_staff')}</option>
              <option value="owner">${I18n.t('s22_role_owner')}</option>
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
