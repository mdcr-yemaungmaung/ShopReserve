/* ============================================================
   EzBookNow Screen S-19 — Shop Review Management Screen (Pkg2)
   ============================================================ */

const ScreenS19 = (() => {
  let activeFilter = 'all'; // 'all', 'unreplied'

  function render() {
    const list = MockData.reviews;
    const filteredList = activeFilter === 'all' ? list : list.filter(r => r.reply === null);

    const toolbar = `
      <div class="tabs mb-6">
        <button class="tab ${activeFilter === 'all' ? 'active' : ''}" onclick="ScreenS19.setFilter('all')">${I18n.t('all_reviews')} (${list.length})</button>
        <button class="tab ${activeFilter === 'unreplied' ? 'active' : ''}" onclick="ScreenS19.setFilter('unreplied')">${I18n.t('unreplied')} (${list.filter(r => r.reply === null).length})</button>
      </div>
    `;

    const reviewsHtml = filteredList.length === 0 ?
      Components.emptyState('messageSquare', 'No reviews found', 'Check back later.') :
      `<div class="flex flex-col gap-6">
        ${filteredList.map(r => `
          <div class="card flex flex-col gap-4">
            <div class="flex justify-between items-start flex-wrap gap-2">
              <div>
                <h4 style="font-weight:600; font-size:15px; color:var(--color-primary);">${r.userName}</h4>
                <div style="font-size:11px; color:var(--color-outline); margin-top:2px;">📅 ${MockData.formatDate(r.date)}</div>
              </div>
              ${Components.starRating(r.rating)}
            </div>
            
            <p class="text-body-sm text-muted" style="line-height:1.5;">${r.comment}</p>

            ${r.reply ? `
              <div class="p-3 bg-secondary-container text-on-secondary-container" style="border-radius:var(--radius-md); border-left:3px solid var(--color-secondary);">
                <div class="flex justify-between items-center mb-1">
                  <span style="font-size:12px; font-weight:600;">Your Reply (${MockData.formatDate(r.repliedAt)})</span>
                  <button class="btn btn-ghost btn-sm py-0 px-2" style="color:var(--color-error); font-size:11px;" onclick="ScreenS19.deleteReply('${r.id}')">${I18n.t('delete_reply')}</button>
                </div>
                <p style="font-size:12px; line-height:1.4;">${r.reply}</p>
              </div>
            ` : `
              <div class="flex flex-col gap-2 mt-2">
                <textarea class="form-textarea" style="min-height:60px; font-size:13px;" id="reply-txt-${r.id}" placeholder="${I18n.t('review_reply_placeholder')}"></textarea>
                <div class="flex justify-end">
                  <button class="btn btn-primary btn-sm" onclick="ScreenS19.postReply('${r.id}')">${I18n.t('publish_reply')}</button>
                </div>
              </div>
            `}
          </div>
        `).join('')}
      </div>`;

    const content = `
      ${Components.pageHeader(I18n.t('review_management'), '')}
      ${toolbar}
      <div style="max-width:720px; margin:0 auto;">
        ${reviewsHtml}
      </div>
    `;

    App.renderAdminPage('shop', I18n.t('sidebar_reviews'), content);
  }

  function setFilter(filt) {
    activeFilter = filt;
    render();
  }

  function postReply(id) {
    const txt = document.getElementById(`reply-txt-${id}`).value.trim();
    if (!txt) {
      showToast('error', 'Error', 'Please enter a reply message.');
      return;
    }
    const rev = MockData.reviews.find(r => r.id === id);
    if (rev) {
      rev.reply = txt;
      rev.repliedAt = new Date().toISOString().split('T')[0];
      showToast('success', 'Replied', 'Reply successfully published.');
      render();
    }
  }

  function deleteReply(id) {
    const rev = MockData.reviews.find(r => r.id === id);
    if (rev) {
      rev.reply = null;
      rev.repliedAt = null;
      showToast('success', 'Deleted', 'Reply removed.');
      render();
    }
  }

  return { render, setFilter, postReply, deleteReply };
})();
