/* ============================================================
   EzBookNow Screen S-06 — Shop Coupons Screen
   ============================================================ */

const ScreenS06 = (() => {
  let shopCoupons = [
    { code: 'CHEF50', name: 'Chef Special Offer', type: 'percentage', value: 15, limit: 100, used: 45, start: '2026-07-01', end: '2026-07-31', status: 'active' },
    { code: 'VIP2000', name: 'VIP Flat Discount', type: 'fixed', value: 10000, limit: 50, used: 12, start: '2026-06-15', end: '2026-08-15', status: 'active' },
    { code: 'JULYOFF', name: 'July Blast Promotion', type: 'percentage', value: 10, limit: 200, used: 110, start: '2026-07-01', end: '2026-07-31', status: 'active' }
  ];

  function render() {
    const rowsHtml = shopCoupons.map((c, idx) => {
      const discountLabel = c.type === 'percentage' ? `${c.value}%` : `${MockData.formatMMK(c.value)}`;
      return `
        <tr>
          <td style="font-weight:600; color:var(--color-primary); font-family:monospace;">${c.code}</td>
          <td>
            <div style="font-weight:600;">${c.name}</div>
            <div style="font-size:11px;color:var(--color-outline);">${I18n.t('valid_until')}: ${c.end}</div>
          </td>
          <td style="font-weight:700;">${discountLabel}</td>
          <td>${c.used} / ${c.limit} times</td>
          <td><span class="badge ${c.status === 'active' ? 'badge--success' : 'badge--expired'}">${c.status === 'active' ? I18n.t('coupon_active') : I18n.t('coupon_inactive')}</span></td>
          <td>
            <div class="flex gap-2">
              <button class="btn btn-ghost btn-sm" onclick="ScreenS06.toggleStatus(${idx})">Toggle</button>
              <button class="btn btn-ghost btn-sm" style="color:var(--color-error);" onclick="ScreenS06.deleteCoupon(${idx})">${I18n.t('delete')}</button>
            </div>
          </td>
        </tr>
      `;
    }).join('');

    const toolbarActions = `
      <button class="btn btn-primary btn-sm" onclick="ScreenS06.showCreateModal()">${Components.icon('plus', 14)} ${I18n.t('create_coupon')}</button>
    `;

    const tableHtml = Components.dataTable({
      columns: ['Code', 'Campaign Name', 'Value', 'Redeemed', 'Status', 'Actions'],
      rows: rowsHtml,
      searchPlaceholder: 'Search coupon codes...',
      actions: toolbarActions,
      pagination: false
    });

    const content = `
      ${Components.pageHeader(I18n.t('coupon_management'), '')}
      <div class="card p-0 overflow-hidden">
        ${tableHtml}
      </div>
    `;

    App.renderAdminPage('shop', I18n.t('sidebar_coupons'), content);
  }

  function toggleStatus(idx) {
    const c = shopCoupons[idx];
    if (c) {
      c.status = c.status === 'active' ? 'inactive' : 'active';
      showToast('success', 'Status Changed', `Coupon "${c.code}" toggled.`);
      render();
    }
  }

  function deleteCoupon(idx) {
    const confirmHtml = Components.confirmModal(
      I18n.t('delete'),
      'Are you sure you want to delete this coupon? Users will no longer be able to apply it.',
      `ScreenS06.executeDelete(${idx})`,
      I18n.t('delete'),
      true
    );
    const div = document.createElement('div');
    div.innerHTML = confirmHtml;
    document.body.appendChild(div.firstElementChild);
  }

  function executeDelete(idx) {
    shopCoupons.splice(idx, 1);
    showToast('success', 'Deleted', 'Coupon removed successfully.');
    render();
  }

  function showCreateModal() {
    const modalHtml = `
      <div class="modal-backdrop" id="coupon-modal" onclick="if(event.target===this)this.remove()">
        <div class="modal modal--sm animate-scale-in">
          <div class="modal__header">
            <h3 class="modal__title">${I18n.t('create_coupon')}</h3>
            <button class="modal__close" onclick="document.getElementById('coupon-modal').remove()">✕</button>
          </div>
          <div class="modal__body flex flex-col gap-4">
            <div class="form-group mb-0">
              <label class="form-label">${I18n.t('coupon_code_label')}</label>
              <input type="text" class="form-input" id="c-code" placeholder="E.g. GOLD2026" required style="font-family:monospace;">
            </div>
            <div class="form-group mb-0">
              <label class="form-label">${I18n.t('coupon_name')}</label>
              <input type="text" class="form-input" id="c-name" placeholder="E.g. VIP Anniversary" required>
            </div>
            <div class="form-row">
              <div class="form-group mb-0">
                <label class="form-label">${I18n.t('discount_type')}</label>
                <select class="form-select" id="c-type">
                  <option value="percentage">${I18n.t('percentage')} (%)</option>
                  <option value="fixed">${I18n.t('fixed_amount')} (MMK)</option>
                </select>
              </div>
              <div class="form-group mb-0">
                <label class="form-label">${I18n.t('discount_value')}</label>
                <input type="number" class="form-input" id="c-value" placeholder="10" required>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group mb-0">
                <label class="form-label">${I18n.t('usage_limit')}</label>
                <input type="number" class="form-input" id="c-limit" value="100" required>
              </div>
              <div class="form-group mb-0">
                <label class="form-label">${I18n.t('end_date')}</label>
                <input type="date" class="form-input" id="c-end" value="2026-07-31" required>
              </div>
            </div>
          </div>
          <div class="modal__footer">
            <button class="btn btn-ghost" onclick="document.getElementById('coupon-modal').remove()">${I18n.t('cancel')}</button>
            <button class="btn btn-primary" onclick="ScreenS06.saveCoupon()">${I18n.t('create')}</button>
          </div>
        </div>
      </div>
    `;
    const div = document.createElement('div');
    div.innerHTML = modalHtml;
    document.body.appendChild(div.firstElementChild);
  }

  function saveCoupon() {
    const code = document.getElementById('c-code').value.trim().toUpperCase();
    const name = document.getElementById('c-name').value.trim();
    const type = document.getElementById('c-type').value;
    const value = document.getElementById('c-value').value.trim();
    const limit = document.getElementById('c-limit').value.trim();
    const end = document.getElementById('c-end').value;

    if(!code || !name || !value) {
      showToast('error', 'Error', 'Please fill all required parameters.');
      return;
    }

    shopCoupons.push({
      code, name, type, value: parseInt(value), limit: parseInt(limit), used: 0, start: '2026-07-15', end, status: 'active'
    });

    showToast('success', 'Created', `Coupon "${code}" registered successfully.`);
    document.getElementById('coupon-modal').remove();
    render();
  }

  return { render, toggleStatus, deleteCoupon, executeDelete, showCreateModal, saveCoupon };
})();
