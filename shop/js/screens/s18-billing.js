/* ============================================================
   EzBookNow Screen S-18 — Shop Contract & Billing Screen (Pkg2)
   ============================================================ */

const ScreenS18 = (() => {
  let activePlan = 'growth'; // 'core', 'growth', 'enterprise'

  function render() {
    const plansInfo = MockData.plans;
    const currentPlan = plansInfo.find(p => p.code === activePlan) || plansInfo[1];

    const currentPlanCard = `
      <div class="card flex flex-col gap-5" style="background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dim)); color: white; border: none; border-radius: var(--radius-xl);">
        <div class="flex justify-between items-start">
          <div>
            <div class="text-overline" style="color:rgba(255,255,255,0.7);">${I18n.t('current_plan')}</div>
            <h2 class="text-headline-md" style="font-weight:700; color:var(--color-secondary-container);">${currentPlan.name} Plan</h2>
          </div>
          <span class="badge badge--success" style="font-size:12px;">Active Contract</span>
        </div>

        <div>
          <div style="font-size:32px; font-weight:800;">${MockData.formatMMK(currentPlan.price_mmk)} <span style="font-size:14px; font-weight:normal; color:rgba(255,255,255,0.7);">/ month</span></div>
        </div>

        <div style="border-top:1px solid rgba(255,255,255,0.15); padding-top:16px;">
          <div class="text-overline" style="color:rgba(255,255,255,0.7); margin-bottom:8px;">Plan Features</div>
          <div class="flex flex-col gap-2">
            ${Object.entries(currentPlan.features).filter(([k,v]) => v).map(([k,v]) => `
              <div class="flex items-center gap-2" style="font-size:13px;">
                <span style="color:var(--color-secondary-container);">✓</span>
                <span>${k.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="flex justify-end gap-3 mt-4">
          <button class="btn btn-secondary bg-surface text-primary border-none" onclick="ScreenS18.changePlan()">${I18n.t('billing_plan_mgmt')}</button>
        </div>
      </div>
    `;

    // Invoices list
    const invoicesHtml = `
      <tr>
        <td style="font-weight:600; color:var(--color-primary);">INV-2026-004</td>
        <td>Jul 01, 2026</td>
        <td style="font-weight:700;">100,000 MMK</td>
        <td>KBZPay E-Wallet</td>
        <td><span class="badge badge--success">${I18n.t('paid')}</span></td>
        <td>
          <button class="btn btn-ghost btn-sm" onclick="showToast('success', 'Download', 'Invoice PDF downloaded.')">${Components.icon('download', 14)}</button>
        </td>
      </tr>
      <tr>
        <td style="font-weight:600; color:var(--color-primary);">INV-2026-003</td>
        <td>Jun 01, 2026</td>
        <td style="font-weight:700;">100,000 MMK</td>
        <td>WaveMoney Pay</td>
        <td><span class="badge badge--success">${I18n.t('paid')}</span></td>
        <td>
          <button class="btn btn-ghost btn-sm" onclick="showToast('success', 'Download', 'Invoice PDF downloaded.')">${Components.icon('download', 14)}</button>
        </td>
      </tr>
      <tr>
        <td style="font-weight:600; color:var(--color-primary);">INV-2026-002</td>
        <td>May 01, 2026</td>
        <td style="font-weight:700;">100,000 MMK</td>
        <td>KBZPay E-Wallet</td>
        <td><span class="badge badge--success">${I18n.t('paid')}</span></td>
        <td>
          <button class="btn btn-ghost btn-sm" onclick="showToast('success', 'Download', 'Invoice PDF downloaded.')">${Components.icon('download', 14)}</button>
        </td>
      </tr>
    `;

    const tableHtml = Components.dataTable({
      columns: ['Invoice ID', 'Billing Date', 'Amount', 'Payment Method', 'Status', 'Actions'],
      rows: invoicesHtml,
      searchPlaceholder: 'Search invoices...',
      pagination: false
    });

    const content = `
      ${Components.pageHeader(I18n.t('billing_plan'), '')}
      <div class="grid grid-2 gap-8 mb-8">
        ${currentPlanCard}
        <div class="card flex flex-col gap-4">
          <h3 class="text-label-md" style="font-weight:700; color:var(--color-primary);">${I18n.t('plan_features')}</h3>
          <div class="flex flex-col gap-3">
            <div class="flex justify-between items-center p-3 bg-surface-container-low" style="border-radius:var(--radius-md);">
              <div>
                <strong>Core Plan</strong>
                <div style="font-size:12px; color:var(--color-outline);">Basic reservations management.</div>
              </div>
              <div style="font-weight:700;">50,000 MMK</div>
            </div>
            <div class="flex justify-between items-center p-3 bg-secondary-container text-on-secondary-container" style="border-radius:var(--radius-md);">
              <div>
                <strong>Growth Plan (Current)</strong>
                <div style="font-size:12px;">Includes online payment, coupons, reviews.</div>
              </div>
              <div style="font-weight:700;">100,000 MMK</div>
            </div>
            <div class="flex justify-between items-center p-3 bg-surface-container-low" style="border-radius:var(--radius-md);">
              <div>
                <strong>Enterprise Plan</strong>
                <div style="font-size:12px; color:var(--color-outline);">Advanced CRM, Viber Broadcast, Loyalty.</div>
              </div>
              <div style="font-weight:700;">200,000 MMK</div>
            </div>
          </div>
        </div>
      </div>

      <div class="card p-0 overflow-hidden">
        <h3 class="text-label-md p-4" style="font-weight:700; border-bottom:1px solid var(--color-surface-container);">${I18n.t('billing_history')}</h3>
        ${tableHtml}
      </div>
    `;

    App.renderAdminPage('shop', I18n.t('sidebar_billing'), content);
  }

  function changePlan() {
    const modalHtml = `
      <div class="modal-backdrop" id="plan-modal" onclick="if(event.target===this)this.remove()">
        <div class="modal modal--sm animate-scale-in">
          <div class="modal__header">
            <h3 class="modal__title">${I18n.t('billing_plan_mgmt')}</h3>
            <button class="modal__close" onclick="document.getElementById('plan-modal').remove()">✕</button>
          </div>
          <div class="modal__body flex flex-col gap-4">
            <div class="form-group mb-0">
              <label class="form-label">Select Plan Tier</label>
              <select class="form-select" id="plan-select">
                <option value="core" ${activePlan === 'core' ? 'selected' : ''}>Core Plan (50,000 MMK/mo)</option>
                <option value="growth" ${activePlan === 'growth' ? 'selected' : ''}>Growth Plan (100,000 MMK/mo)</option>
                <option value="enterprise" ${activePlan === 'enterprise' ? 'selected' : ''}>Enterprise Plan (200,000 MMK/mo)</option>
              </select>
            </div>
          </div>
          <div class="modal__footer">
            <button class="btn btn-ghost" onclick="document.getElementById('plan-modal').remove()">${I18n.t('cancel')}</button>
            <button class="btn btn-primary" onclick="ScreenS18.savePlan()">${I18n.t('save')}</button>
          </div>
        </div>
      </div>
    `;
    const div = document.createElement('div');
    div.innerHTML = modalHtml;
    document.body.appendChild(div.firstElementChild);
  }

  function savePlan() {
    const selected = document.getElementById('plan-select').value;
    activePlan = selected;
    showToast('success', 'Plan Changed', 'Your subscription plan has been scheduled for change.');
    document.getElementById('plan-modal').remove();
    render();
  }

  return { render, changePlan, savePlan };
})();
