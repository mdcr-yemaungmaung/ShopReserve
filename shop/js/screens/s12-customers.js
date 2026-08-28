/* ============================================================
   EzBookNow Screen S-12 — Customer Management Screen (Pkg3)
   ============================================================ */

const ScreenS12 = (() => {
  let list = [
    { id: 'c-1', name: 'Jonathan Wick', phone: '+95 9 111 222 333', email: 'john@wick.com', visits: 12, spent: 480000, allergies: 'None', prefs: 'Prefers window seat, drinks sparkling water.' },
    { id: 'c-2', name: 'Sarah Connor', phone: '+95 9 222 333 444', email: 'sarah@skynet.net', visits: 4, spent: 150000, allergies: 'Peanuts', prefs: 'Vegetarian meals, allergic to peanuts.' },
    { id: 'c-3', name: 'Michael Corleone', phone: '+95 9 333 444 555', email: 'don@corleone.com', visits: 25, spent: 1800000, allergies: 'Seafood', prefs: 'VIP guest. Prefers private dining room.' },
    { id: 'c-4', name: 'Ellen Ripley', phone: '+95 9 444 555 666', email: 'ripley@nostromo.org', visits: 2, spent: 30000, allergies: 'None', prefs: 'Spicy condiments requested.' }
  ];

  function render() {
    const rowsHtml = list.map(c => `
      <tr>
        <td style="font-weight:600; color:var(--color-primary);">${c.name}</td>
        <td>
          <div>${c.phone}</div>
          <div style="font-size:11px;color:var(--color-outline);">${c.email}</div>
        </td>
        <td style="font-weight:700;">${c.visits} visits<br><span style="font-size:11px;color:var(--color-outline);font-weight:normal;">Spent: ${MockData.formatMMK(c.spent)}</span></td>
        <td>
          ${c.allergies !== 'None' ? `<span class="badge badge--cancelled">${c.allergies}</span>` : `<span class="badge badge--expired">None</span>`}
        </td>
        <td>
          <div style="font-size:12px; color:var(--color-on-surface-variant); max-width:240px; line-height:1.4;">${c.prefs}</div>
        </td>
        <td>
          <div class="flex gap-2">
            <button class="btn btn-ghost btn-sm" onclick="ScreenS12.editPreferences('${c.id}')">${I18n.t('edit')}</button>
            <button class="btn btn-ghost btn-icon" style="color:var(--color-error);" onclick="ScreenS12.deleteCustomer('${c.id}')">✕</button>
          </div>
        </td>
      </tr>
    `).join('');

    const tableHtml = Components.dataTable({
      columns: ['Name', 'Contact', 'Visit Stats', 'Allergies', 'Preferences', 'Actions'],
      rows: rowsHtml,
      searchPlaceholder: 'Search customer name or phone...',
      pagination: true
    });

    const content = `
      ${Components.pageHeader(I18n.t('customer_management'), '')}
      <div class="card p-0 overflow-hidden">
        ${tableHtml}
      </div>
    `;

    App.renderAdminPage('shop', I18n.t('sidebar_customers'), content);
  }

  function editPreferences(id) {
    const cust = list.find(c => c.id === id);
    if (!cust) return;

    const modalHtml = `
      <div class="modal-backdrop" id="cust-modal" onclick="if(event.target===this)this.remove()">
        <div class="modal modal--sm animate-scale-in">
          <div class="modal__header">
            <h3 class="modal__title">${I18n.t('preferences')} — ${cust.name}</h3>
            <button class="modal__close" onclick="document.getElementById('cust-modal').remove()">✕</button>
          </div>
          <div class="modal__body flex flex-col gap-4">
            <div class="form-group mb-0">
              <label class="form-label">${I18n.t('allergies')}</label>
              <input type="text" class="form-input" id="cust-allergies" value="${cust.allergies}">
            </div>
            <div class="form-group mb-0">
              <label class="form-label">${I18n.t('preferences')}</label>
              <textarea class="form-textarea" id="cust-prefs">${cust.prefs}</textarea>
            </div>
          </div>
          <div class="modal__footer">
            <button class="btn btn-ghost" onclick="document.getElementById('cust-modal').remove()">${I18n.t('cancel')}</button>
            <button class="btn btn-primary" onclick="ScreenS12.saveCustomer('${id}')">${I18n.t('save')}</button>
          </div>
        </div>
      </div>
    `;
    const div = document.createElement('div');
    div.innerHTML = modalHtml;
    document.body.appendChild(div.firstElementChild);
  }

  function saveCustomer(id) {
    const allergies = document.getElementById('cust-allergies').value.trim();
    const prefs = document.getElementById('cust-prefs').value.trim();
    
    const cust = list.find(c => c.id === id);
    if (cust) {
      cust.allergies = allergies || 'None';
      cust.prefs = prefs;
      showToast('success', 'Saved', 'Customer preferences updated.');
      document.getElementById('cust-modal').remove();
      render();
    }
  }

  function deleteCustomer(id) {
    const idx = list.findIndex(c => c.id === id);
    if(idx !== -1) {
      list.splice(idx, 1);
      showToast('success', 'Deleted', 'Customer entry removed from CRM database.');
      render();
    }
  }

  return { render, editPreferences, saveCustomer, deleteCustomer };
})();
