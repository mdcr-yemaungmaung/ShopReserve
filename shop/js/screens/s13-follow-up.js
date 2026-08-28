/* ============================================================
   EzBookNow Screen S-13 — Follow-up Automation Screen (Pkg3)
   ============================================================ */

const ScreenS13 = (() => {
  let automationFlows = [
    { key: 'review_request', label: I18n.t('review_request_flow'), desc: 'Sends an automated review request message 2 hours after checkout.', active: true },
    { key: 'coupon_auto_send', label: I18n.t('coupon_auto_send'), desc: 'Sends a 10% thank-you coupon code automatically for 5-star review ratings.', active: true },
    { key: 'dormant_reactivation', label: 'Dormant Customer Reactivation Flow', desc: 'Sends a custom promo offer to customers who did not visit for 60 days.', active: false }
  ];

  function render() {
    const flowsHtml = automationFlows.map((flow, idx) => `
      <div class="card flex flex-col gap-4 card--glass relative overflow-hidden" style="border-left:5px solid ${flow.active ? 'var(--color-secondary)' : 'var(--color-outline-variant)'};">
        <div class="flex justify-between items-start">
          <div>
            <h4 style="font-weight:600; font-size:15px; color:var(--color-primary);">${flow.label}</h4>
            <p class="text-body-sm text-muted mt-1" style="max-width:500px; line-height:1.5;">${flow.desc}</p>
          </div>
          <label class="toggle">
            <input type="checkbox" ${flow.active ? 'checked' : ''} onchange="ScreenS13.toggleFlow(${idx})">
            <span class="toggle__slider"></span>
          </label>
        </div>
        
        <div class="flex justify-end gap-2 border-top pt-3" style="border-top:1px solid var(--color-surface-container);">
          <button class="btn btn-ghost btn-sm" onclick="ScreenS13.configureFlow(${idx})">Configure Settings</button>
        </div>
      </div>
    `).join('');

    const content = `
      ${Components.pageHeader(I18n.t('follow_up_automation'), '')}
      <div class="flex flex-col gap-6" style="max-width:720px; margin:0 auto;">
        ${flowsHtml}
      </div>
    `;

    App.renderAdminPage('shop', I18n.t('sidebar_follow_up'), content);
  }

  function toggleFlow(idx) {
    const flow = automationFlows[idx];
    if (flow) {
      flow.active = !flow.active;
      showToast('success', 'Automation', `Automation flow "${flow.label}" toggled.`);
      render();
    }
  }

  function configureFlow(idx) {
    showToast('info', 'Automation Settings', `Configuration panel loaded for: ${automationFlows[idx].label}`);
  }

  return { render, toggleFlow, configureFlow };
})();
