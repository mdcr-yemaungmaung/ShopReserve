/* ============================================================
   EzBookNow Screen S-16 — Points & Loyalty Settings Screen (Pkg3)
   ============================================================ */

const ScreenS16 = (() => {
  function render() {
    const generalConfig = `
      <div class="card flex flex-col gap-5">
        <h3 class="text-label-md" style="font-weight:700; color:var(--color-primary); border-bottom:1px solid var(--color-surface-container); padding-bottom:8px;">General Loyalty Settings</h3>
        
        <div class="form-row">
          <div class="form-group mb-0">
            <label class="form-label">Points Issuance Rate</label>
            <div class="flex gap-2 items-center">
              <input type="number" class="form-input" style="width:100px;" value="10">
              <span style="font-size:13px; color:var(--color-outline);">Points per</span>
              <input type="number" class="form-input" style="width:120px;" value="1000">
              <span style="font-size:13px; color:var(--color-outline);">MMK spent</span>
            </div>
          </div>

          <div class="form-group mb-0">
            <label class="form-label">Initial Join Welcome Gift</label>
            <div class="flex gap-2 items-center">
              <input type="number" class="form-input" style="width:100px;" value="100">
              <span style="font-size:13px; color:var(--color-outline);">Points</span>
            </div>
          </div>
        </div>
      </div>
    `;

    const tiersConfig = `
      <div class="card flex flex-col gap-4">
        <h3 class="text-label-md" style="font-weight:700; color:var(--color-primary); border-bottom:1px solid var(--color-surface-container); padding-bottom:8px;">${I18n.t('rank_config')}</h3>
        <div class="flex flex-col gap-4">
          <div class="flex justify-between items-center flex-wrap gap-4">
            <div style="font-weight:600; min-width:120px;">Bronze Tier</div>
            <div class="flex gap-2 items-center">
              <input type="number" class="form-input" style="width:120px; height:36px;" value="0">
              <span style="font-size:12px; color:var(--color-outline);">PTS required</span>
            </div>
            <div class="flex gap-2 items-center">
              <input type="number" class="form-input" style="width:100px; height:36px;" value="1.0" step="0.1">
              <span style="font-size:12px; color:var(--color-outline);">multiplier</span>
            </div>
          </div>

          <div class="flex justify-between items-center flex-wrap gap-4">
            <div style="font-weight:600; min-width:120px; color:var(--color-primary);">Silver Tier</div>
            <div class="flex gap-2 items-center">
              <input type="number" class="form-input" style="width:120px; height:36px;" value="1000">
              <span style="font-size:12px; color:var(--color-outline);">PTS required</span>
            </div>
            <div class="flex gap-2 items-center">
              <input type="number" class="form-input" style="width:100px; height:36px;" value="1.2" step="0.1">
              <span style="font-size:12px; color:var(--color-outline);">multiplier</span>
            </div>
          </div>

          <div class="flex justify-between items-center flex-wrap gap-4">
            <div style="font-weight:600; min-width:120px; color:var(--color-secondary);">Gold Tier</div>
            <div class="flex gap-2 items-center">
              <input type="number" class="form-input" style="width:120px; height:36px;" value="2500">
              <span style="font-size:12px; color:var(--color-outline);">PTS required</span>
            </div>
            <div class="flex gap-2 items-center">
              <input type="number" class="form-input" style="width:100px; height:36px;" value="1.5" step="0.1">
              <span style="font-size:12px; color:var(--color-outline);">multiplier</span>
            </div>
          </div>
        </div>
      </div>
    `;

    const content = `
      ${Components.pageHeader(I18n.t('loyalty_settings'), '')}
      <div class="flex flex-col gap-6" style="max-width:720px; margin:0 auto;">
        ${generalConfig}
        ${tiersConfig}
        <div class="flex justify-end mt-2">
          <button class="btn btn-primary" onclick="showToast('success', 'Loyalty', 'Loyalty configuration saved successfully.')">${I18n.t('save')}</button>
        </div>
      </div>
    `;

    App.renderAdminPage('shop', I18n.t('sidebar_loyalty'), content);
  }

  return { render };
})();
