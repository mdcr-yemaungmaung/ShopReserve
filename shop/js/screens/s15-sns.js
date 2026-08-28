/* ============================================================
   EzBookNow Screen S-15 — SNS Management Screen (Pkg3)
   ============================================================ */

const ScreenS15 = (() => {
  function render() {
    const snsComposer = `
      <form class="card flex flex-col gap-5" onsubmit="ScreenS15.postNow(event)">
        <h3 class="text-label-md" style="font-weight:700; color:var(--color-primary); border-bottom:1px solid var(--color-surface-container); padding-bottom:8px;">SNS Post Composer</h3>
        
        <div class="form-group">
          <label class="form-label">Link Platforms</label>
          <div class="flex gap-4 mt-2">
            <label class="form-check">
              <input type="checkbox" checked>
              <span>Facebook page (Connected)</span>
            </label>
            <label class="form-check">
              <input type="checkbox" checked>
              <span>Instagram account (Connected)</span>
            </label>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Post Caption / Message</label>
          <textarea class="form-textarea" id="sns-msg" placeholder="Write updates about new menus, events, closures..." required style="min-height:120px;"></textarea>
        </div>

        <div class="form-row">
          <div class="form-group mb-0">
            <label class="form-label">Schedule Date</label>
            <input type="date" class="form-input" id="sns-date" value="2026-07-16">
          </div>
          <div class="form-group mb-0">
            <label class="form-label">Schedule Time</label>
            <input type="time" class="form-input" id="sns-time" value="12:00">
          </div>
        </div>

        <div class="flex gap-3 justify-end mt-4">
          <button type="button" class="btn btn-secondary" onclick="ScreenS15.schedulePost()">${I18n.t('schedule_post')}</button>
          <button type="submit" class="btn btn-primary">Post Now</button>
        </div>
      </form>
    `;

    const content = `
      ${Components.pageHeader(I18n.t('sns_management'), '')}
      <div style="max-width:640px; margin:0 auto;">
        ${snsComposer}
      </div>
    `;

    App.renderAdminPage('shop', I18n.t('sidebar_sns'), content);
  }

  function postNow(e) {
    e.preventDefault();
    const msg = document.getElementById('sns-msg').value.trim();
    if(!msg) return;
    showToast('success', 'SNS Post', 'Campaign successfully published to connected Facebook and Instagram pages.');
    document.getElementById('sns-msg').value = '';
  }

  function schedulePost() {
    const date = document.getElementById('sns-date').value;
    const time = document.getElementById('sns-time').value;
    showToast('success', 'SNS Post Scheduled', `Campaign scheduled for: ${date} at ${time}`);
  }

  return { render, postNow, schedulePost };
})();
