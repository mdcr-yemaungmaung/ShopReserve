/* ============================================================
   EzBookNow Screen S-14 — Viber Broadcast Screen (Pkg3)
   ============================================================ */

const ScreenS14 = (() => {
  function render() {
    const broadcastForm = `
      <form class="card flex flex-col gap-5" onsubmit="ScreenS14.sendBroadcast(event)">
        <h3 class="text-label-md" style="font-weight:700; color:var(--color-primary); border-bottom:1px solid var(--color-surface-container); padding-bottom:8px;">${I18n.t('viber_broadcast')}</h3>
        
        <div class="form-group">
          <label class="form-label">${I18n.t('segment_targeting')}</label>
          <select class="form-select" id="broadcast-target">
            <option value="all">All Customers (4 users)</option>
            <option value="vip">VIP Segment Only (2 users)</option>
            <option value="dormant">Dormant Customers Segment (1 user)</option>
          </select>
        </div>

        <div class="form-group">
          <label class="form-label">Message Content</label>
          <textarea class="form-textarea" id="broadcast-msg" placeholder="Write your Viber campaign message here... (e.g. Try our new Wagyu Beef and get 15% discount using coupon CHEF50!)" required style="min-height:120px;"></textarea>
        </div>

        <div class="form-group">
          <label class="form-check">
            <input type="checkbox" checked required>
            <span style="font-size:13px; font-weight:600;">${I18n.t('consented_users')}</span>
          </label>
          <div class="form-hint" style="font-size:11px; margin-top:2px;">Messages will only be sent to customers who explicitly accepted Viber updates.</div>
        </div>

        <div class="flex gap-3 justify-end mt-4">
          <button type="button" class="btn btn-secondary" onclick="ScreenS14.scheduleSend()">${I18n.t('schedule_post')}</button>
          <button type="submit" class="btn btn-primary">${I18n.t('viber_broadcast')}</button>
        </div>
      </form>
    `;

    const content = `
      ${Components.pageHeader(I18n.t('viber_broadcast'), '')}
      <div style="max-width:640px; margin:0 auto;">
        ${broadcastForm}
      </div>
    `;

    App.renderAdminPage('shop', I18n.t('sidebar_viber'), content);
  }

  function sendBroadcast(e) {
    e.preventDefault();
    const target = document.getElementById('broadcast-target').value;
    const msg = document.getElementById('broadcast-msg').value.trim();

    if(!msg) return;

    showToast('success', 'Viber Broadcast', `Automated Viber message sent to "${target}" target group.`);
    document.getElementById('broadcast-msg').value = '';
  }

  function scheduleSend() {
    showToast('info', 'Scheduler', 'Broadcast post scheduled for tomorrow.');
  }

  return { render, sendBroadcast, scheduleSend };
})();
