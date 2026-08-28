/* ============================================================
   EzBookNow Screen S-17 — New Shop Application Screen (Public Form)
   ============================================================ */

const ScreenS17 = (() => {
  let isSubmitted = false;
  let lastSubmittedApp = null;
  let uploadedFileName = 'yangon_bistro_license.pdf'; // Pre-attached mock business license
  let turnstileVerified = true; // Turnstile bot check state

  // Simulation state
  let spamBlockActive = false;
  let isAwaitingEmailVerification = false;
  let generatedOtp = '582914';

  // Status check local state
  let queriedApp = null;
  let checkQueryInput = '';

  function render() {
    const lang = I18n.getLang();
    const phoneWarning = lang === 'mm' 
      ? 'ဖုန်းနံပါတ်ပုံစံ မှားယွင်းနေပါသည်။ (+95 သို့မဟုတ် ၀ ဖြင့် စတင်ရပါမည်)' 
      : 'Invalid Myanmar phone number format (must start with +95 or 0)';

    let mainContentHtml = '';

    // If application was submitted and email verified, show Success Receipt View
    if (isSubmitted && lastSubmittedApp) {
      mainContentHtml = `
        <div class="card flex flex-col items-center justify-center text-center p-8 max-width-narrow" 
             style="margin: 0 auto; max-width: 620px; font-family:'Inter', sans-serif; border-radius:18px; border:1px solid #e2e8f0; box-shadow:0 10px 30px rgba(0,0,0,0.06); background:white;">
          
          <div style="width: 72px; height: 72px; border-radius: 50%; background: #dcfce7; color: #15803d; display: flex; align-items: center; justify-content: center; font-size: 36px; margin-bottom: 18px; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2);">
            ✓
          </div>

          <h2 style="font-size:22px; font-weight:800; color:#0f172a; margin:0 0 6px 0;">
            ${I18n.t('application_submitted')}
          </h2>

          <div style="font-size:12px; color:#15803d; background:#dcfce7; padding:4px 12px; border-radius:12px; font-weight:700; display:inline-flex; align-items:center; gap:6px; margin-bottom:12px;">
            ✓ Email Address Verified (${lastSubmittedApp.email})
          </div>

          <p style="font-size:13px; color:#64748b; margin:0 0 20px 0; line-height:1.5;">
            ${lang === 'mm' 
              ? 'စနစ်စီမံခန့်ခွဲသူများမှ သင်၏လုပ်ငန်းလိုင်စင်နှင့် အချက်အလက်များကို စိစစ်လျက်ရှိသည်။ ရုံးဖွင့်ရက် (၃) ရက်အတွင်း ဆက်သွယ်ပေးပါမည်။ စိစစ်အတည်ပြုပြီးပါက Portal ဝင်ရန် စကားဝှက်သတ်မှတ်လင့်ခ်ကို အီးမေးလ်ထံ ပေးပို့ပါမည်။' 
              : 'Our operators are reviewing your business license and application. We will contact you within 3 business days. You will receive a password setup email once approved.'}
          </p>

          <!-- Application Reference Code Box (Recommendation #2) -->
          <div style="background:#f8fafc; border:1.5px solid #cbd5e1; border-radius:12px; padding:16px; width:100%; margin-bottom:20px; text-align:left;">
            <div style="font-size:11px; color:#64748b; font-weight:700; text-transform:uppercase; letter-spacing:0.06em; margin-bottom:4px;">
              ${I18n.t('app_ref_code')}
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <code style="font-size:18px; font-weight:800; color:#0f172a; font-family:monospace; letter-spacing:0.1em;">
                ${lastSubmittedApp.refCode}
              </code>
              <button class="btn btn-ghost btn-sm" style="font-size:12px; font-weight:700; border:1px solid #cbd5e1;" onclick="ScreenS17.copyRefCode('${lastSubmittedApp.refCode}')">
                📋 Copy Code
              </button>
            </div>
            
            <div style="margin-top:12px; font-size:12px; color:#166534; background:#dcfce7; padding:8px 12px; border-radius:8px; font-weight:600; display:flex; justify-content:space-between; align-items:center;">
              <span style="display:flex; align-items:center; gap:6px;">
                📧 ${lang === 'mm' ? 'အလိုအလျောက် အတည်ပြု အီးမေးလ် ပေးပို့ပြီးပါပြီ (Resend API)' : 'Auto-reply confirmation sent via Resend API (EXT-04)'}
              </span>
              <button class="btn btn-ghost btn-sm" style="font-size:11px; font-weight:700; background:white; color:#15803d; border:1px solid #bbf7d0;" onclick="ScreenS17.openEmailInboxModal()">
                📬 View Inbox Preview
              </button>
            </div>
          </div>

          <div style="display:flex; gap:10px; flex-wrap:wrap; justify-content:center; width:100%;">
            <button class="btn btn-secondary btn-sm" style="font-size:12.5px; font-weight:700; border-radius:8px;" onclick="ScreenS17.autoTestStatusLookup('${lastSubmittedApp.refCode}')">
              🔍 Test Status Lookup Now
            </button>
            <button class="btn btn-ghost btn-sm" style="font-size:12.5px; border:1px solid #cbd5e1; font-weight:700;" onclick="ScreenS17.downloadReceipt()">
              📥 Download Receipt (.txt)
            </button>
            <button class="btn btn-primary btn-sm" style="font-size:12.5px; font-weight:700; border-radius:8px;" onclick="ScreenS17.resetFormState()">
              ${lang === 'mm' ? 'လျှောက်လွှာအသစ် ထပ်တင်မည်' : 'Submit Another Application'}
            </button>
          </div>

        </div>
      `;
    } else {
      // File upload area label
      const fileLabel = uploadedFileName ? 
        `📄 ${uploadedFileName} (${lang === 'mm' ? 'တင်ပြီး' : 'Uploaded'})` : 
        (lang === 'mm' ? 'လုပ်ငန်းလိုင်စင် တင်ပြရန် နှိပ်ပါ (PDF/JPG/PNG max 10MB)' : 'Click to upload business license file (PDF/JPG/PNG max 10MB)');

      mainContentHtml = `
        <form class="card" id="s17-application-form" onsubmit="ScreenS17.submitApplication(event)" 
              style="max-width:780px; margin:0 auto; font-family:'Inter', sans-serif; border-radius:18px; padding:28px; border:1px solid #e2e8f0; box-shadow: 0 10px 30px rgba(0,0,0,0.05); background:white;">
          
          <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #f1f5f9; padding-bottom:14px; margin-bottom:20px; flex-wrap:wrap; gap:10px;">
            <div>
              <h3 style="font-size:18px; font-weight:800; color:#0f172a; margin:0; display:flex; align-items:center; gap:8px;">
                📝 ${I18n.t('apply_for_listing')}
              </h3>
              <p style="font-size:12.5px; color:#64748b; margin:2px 0 0 0;">
                ${lang === 'mm' ? 'EzBookNow တွင် ဆိုင်စာရင်း တင်သွင်းရန် ဆိုင်အချက်အလက်နှင့် လုပ်ငန်းလိုင်စင် တင်ပြပါ' : 'Fill in your restaurant details and business license to list your shop on EzBookNow'}
              </p>
            </div>
            
            <div style="display:flex; align-items:center; gap:8px;">
              <!-- 1-Click Auto-Fill Demo Data Button -->
              <button type="button" class="btn btn-secondary btn-sm" style="font-size:12px; font-weight:700; background:#f1f5f9; color:#4f46e5; border:1px solid #c7d2fe; border-radius:8px;" onclick="ScreenS17.fillDemoData()">
                ⚡ Auto-Fill Demo Data
              </button>
              <span style="font-size:11px; background:#e0e7ff; color:#3730a3; padding:4px 10px; border-radius:12px; font-weight:700;">
                Public Form (No Login)
              </span>
            </div>
          </div>

          <div id="file-error-alert" style="display:none; font-size:12.5px; border-radius:10px; padding:12px 16px; margin-bottom:18px; align-items:center; gap:10px; line-height:1.4; background:#fef2f2; border:1px solid #fca5a5; color:#991b1b;"></div>
          
          <div style="display:grid; grid-template-columns: 1fr 1fr; gap:18px; margin-bottom:18px;" class="form-row-responsive">
            <div class="form-group" style="margin:0;">
              <label class="form-label" style="font-size:13px; font-weight:700; color:#1e293b; display:block; margin-bottom:6px;">
                ${I18n.t('applicant_name')} <span style="color:#ef4444;">*</span>
              </label>
              <input type="text" class="form-input" id="app-name" placeholder="Ko Aung" required maxlength="100" value="Ko Aung Myo"
                     style="font-size:14px; height:44px; border-radius:10px;"
                     oninput="ScreenS17.validateForm()">
            </div>

            <div class="form-group" style="margin:0;">
              <label class="form-label" style="font-size:13px; font-weight:700; color:#1e293b; display:block; margin-bottom:6px;">
                ${I18n.t('contact_phone')} <span style="color:#ef4444;">*</span>
              </label>
              ${Components.phoneInput({ id: 'app-phone', value: '09450000000', required: true })}
            </div>
          </div>

          <div style="display:grid; grid-template-columns: 1fr 1fr; gap:18px; margin-bottom:18px;" class="form-row-responsive">
            <div class="form-group" style="margin:0;">
              <label class="form-label" style="font-size:13px; font-weight:700; color:#1e293b; display:block; margin-bottom:6px;">
                ${I18n.t('contact_email')} <span style="color:#ef4444;">*</span>
              </label>
              <input type="email" class="form-input" id="app-email" placeholder="owner@restaurant.com" required value="aungmyo@yangonbistro.com"
                     style="font-size:14px; height:44px; border-radius:10px;"
                     oninput="ScreenS17.validateForm()">
            </div>

            <div class="form-group" style="margin:0;">
              <label class="form-label" style="font-size:13px; font-weight:700; color:#1e293b; display:block; margin-bottom:6px;">
                ${I18n.t('shop_location')} <span style="color:#ef4444;">*</span>
              </label>
              <select class="form-select" id="app-area" style="font-size:14px; height:44px; border-radius:10px;">
                ${MockData.areas.map(a => `<option value="${a.code}">${lang === 'mm' ? a.name_mm : a.name}</option>`).join('')}
              </select>
            </div>
          </div>

          <div style="display:grid; grid-template-columns: 1fr 1fr; gap:18px; margin-bottom:18px;" class="form-row-responsive">
            <div class="form-group" style="margin:0;">
              <label class="form-label" style="font-size:13px; font-weight:700; color:#1e293b; display:block; margin-bottom:6px;">
                ${I18n.t('shop_name_en')} <span style="color:#ef4444;">*</span>
              </label>
              <input type="text" class="form-input" id="app-shop-en" placeholder="Golden Palace Restaurant" required maxlength="100" value="Yangon Garden Bistro"
                     style="font-size:14px; height:44px; border-radius:10px;"
                     oninput="ScreenS17.validateForm()">
            </div>

            <div class="form-group" style="margin:0;">
              <label class="form-label" style="font-size:13px; font-weight:700; color:#1e293b; display:block; margin-bottom:6px;">
                ${I18n.t('shop_name_mm')} <span style="color:#ef4444;">*</span>
              </label>
              <input type="text" class="form-input" id="app-shop-mm" placeholder="ရွှေနန်းတော် စားသောက်ဆိုင်" required maxlength="100" value="ရန်ကုန် ဂါဒင် ဘစ်စထရို"
                     style="font-size:14px; height:44px; border-radius:10px;"
                     oninput="ScreenS17.validateForm()">
            </div>
          </div>

          <!-- Business Info / Description -->
          <div class="form-group" style="margin-bottom:18px;">
            <label class="form-label" style="font-size:13px; font-weight:700; color:#1e293b; display:block; margin-bottom:6px;">
              ${I18n.t('shop_desc')} <span style="color:#ef4444;">*</span>
            </label>
            <textarea class="form-textarea" id="app-desc" placeholder="Provide shop details, kitchen genre, seating capacity, etc..." required maxlength="2000" 
                      style="height:110px; font-size:13.5px; border-radius:10px;" 
                      oninput="ScreenS17.validateForm()">Premium Myanmar & Asian Fusion Restaurant with outdoor garden seating, capacity 80 persons.</textarea>
          </div>

          <!-- File Upload License -->
          <div class="form-group" style="margin-bottom:20px;">
            <label class="form-label" style="font-size:13px; font-weight:700; color:#1e293b; display:block; margin-bottom:6px;">
              ${I18n.t('business_license')} <span style="color:#ef4444;">*</span>
            </label>
            <div class="file-upload" onclick="document.getElementById('license-file').click()" 
                 style="border: 2px dashed ${uploadedFileName ? '#4f46e5' : '#cbd5e1'}; background: ${uploadedFileName ? '#f8fafc' : '#ffffff'}; cursor:pointer; padding:20px; text-align:center; border-radius:12px; transition:all 0.2s;">
              <span style="font-size:28px;">📁</span>
              <div style="font-weight:700; margin-top:6px; color:#4f46e5; font-size:13.5px;">${fileLabel}</div>
              <div style="font-size:11.5px; color:#64748b; margin-top:4px;">${I18n.t('license_hint')} (PDF, JPG, PNG max 10MB)</div>
              <input type="file" id="license-file" class="hidden" accept="application/pdf,image/*" style="display:none;" onchange="ScreenS17.handleFileChange(event)">
            </div>
          </div>

          <!-- Cloudflare Turnstile Bot Protection Widget (Recommendation #1) -->
          <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; padding:14px; margin-bottom:20px; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:10px;">
            <div style="display:flex; align-items:center; gap:10px;">
              <span style="font-size:20px;">🛡️</span>
              <div>
                <div style="font-size:12.5px; font-weight:700; color:#0f172a;">Cloudflare Turnstile Bot Protection (EXT-17)</div>
                <div style="font-size:11px; color:#64748b;">Automated Spam & Bot Prevention Layer</div>
              </div>
            </div>
            <label style="display:flex; align-items:center; gap:8px; cursor:pointer; background:white; border:1px solid #cbd5e1; padding:6px 12px; border-radius:8px;">
              <input type="checkbox" id="turnstile-check" checked onchange="ScreenS17.toggleTurnstile(this.checked)" style="width:16px; height:16px; cursor:pointer;">
              <span style="font-size:12px; font-weight:700; color:#15803d;">✓ Verified Human Session</span>
            </label>
          </div>

          <!-- Terms Agreement Checkbox -->
          <div class="form-group" style="margin-bottom:24px;">
            <label style="display:flex; align-items:center; gap:10px; cursor:pointer;">
              <input type="checkbox" id="app-agreement" checked style="width:18px; height:18px; cursor:pointer;" onchange="ScreenS17.validateForm()">
              <span style="font-size:13px; font-weight:600; color:#334155; line-height:1.4;">${I18n.t('agree_listing_terms')}</span>
            </label>
          </div>

          <button type="submit" class="btn btn-primary btn-block" id="app-submit-btn" 
                  style="height:48px; font-size:15px; font-weight:700; border-radius:10px; box-shadow:0 4px 14px rgba(79,70,229,0.25);">
            🚀 ${I18n.t('submit_application')}
          </button>
        </form>
      `;
    }

    // Interactive Email Workflow Pipeline Visualizer Banner Card
    const emailWorkflowPipelineHtml = `
      <div class="card" style="max-width:780px; margin:24px auto 0 auto; border-radius:16px; padding:20px; border:1px solid #cbd5e1; background:linear-gradient(135deg, #0f172a 0%, #1e293b 100%); color:white; box-shadow:0 8px 24px rgba(15,23,42,0.15);">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px; flex-wrap:wrap; gap:10px;">
          <div>
            <div style="font-size:14px; font-weight:800; color:white; display:flex; align-items:center; gap:8px;">
              📧 ${lang === 'mm' ? 'အီးမေးလ် လုပ်ငန်းစဉ် အဆင့်ဆင့် မြင်ကွင်း (Visual Email Pipeline)' : 'Visual Email Workflow & Notification Pipeline'}
            </div>
            <div style="font-size:12px; color:#94a3b8; margin-top:2px;">
              ${lang === 'mm' ? 'အီးမေးလ်အတည်ပြုခြင်း၊ အလိုအလျောက် အသိပေးအီးမေးလ်နှင့် စကားဝှက်သတ်မှတ်လင့်ခ်များ အလုပ်လုပ်ပုံ' : 'Track how email verification, auto-reply notifications, and password setup links operate'}
            </div>
          </div>
          
          <button class="btn btn-ghost btn-sm" style="font-size:12px; background:rgba(255,255,255,0.12); color:white; border:1px solid rgba(255,255,255,0.2); font-weight:700;" onclick="ScreenS17.openEmailInboxModal()">
            📬 ${lang === 'mm' ? 'အီးမေးလ်များ ကြည့်ရန် (Live Email Simulator)' : 'Open Live Email Simulator'}
          </button>
        </div>

        <!-- 4-Step Pipeline Stepper -->
        <div style="display:grid; grid-template-columns: repeat(4, 1fr); gap:10px;" class="form-row-responsive">
          
          <div style="background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.12); padding:10px; border-radius:10px;">
            <div style="font-size:10.5px; color:#a5b4fc; font-weight:700; text-transform:uppercase;">Step 1</div>
            <div style="font-size:12px; font-weight:700; color:white; margin-top:2px;">📝 ${lang === 'mm' ? 'ဖောင်တင်သွင်းခြင်း' : 'Form Submit'}</div>
            <div style="font-size:10.5px; color:#cbd5e1; margin-top:2px;">Data Uploaded</div>
          </div>

          <div style="background:rgba(234, 179, 8, 0.15); border:1px solid rgba(253, 224, 71, 0.3); padding:10px; border-radius:10px;">
            <div style="font-size:10.5px; color:#fde047; font-weight:700; text-transform:uppercase;">Step 2 (Req #3)</div>
            <div style="font-size:12px; font-weight:700; color:white; margin-top:2px;">📩 ${lang === 'mm' ? 'အီးမေးလ် OTP အတည်ပြု' : 'Email Verify OTP'}</div>
            <div style="font-size:10.5px; color:#fef08a; margin-top:2px;">Verify Email Ownership</div>
          </div>

          <div style="background:rgba(16, 185, 129, 0.15); border:1px solid rgba(110, 231, 183, 0.3); padding:10px; border-radius:10px;">
            <div style="font-size:10.5px; color:#6ee7b7; font-weight:700; text-transform:uppercase;">Step 3 (Req #4)</div>
            <div style="font-size:12px; font-weight:700; color:white; margin-top:2px;">📨 ${lang === 'mm' ? 'အလိုအလျောက် အီးမေးလ်' : 'Resend Auto-Reply'}</div>
            <div style="font-size:10.5px; color:#a7f3d0; margin-top:2px;">Ref Code Email Sent</div>
          </div>

          <div style="background:rgba(99, 102, 241, 0.15); border:1px solid rgba(165, 180, 252, 0.3); padding:10px; border-radius:10px;">
            <div style="font-size:10.5px; color:#c7d2fe; font-weight:700; text-transform:uppercase;">Step 4</div>
            <div style="font-size:12px; font-weight:700; color:white; margin-top:2px;">🔑 ${lang === 'mm' ? 'စကားဝှက်သတ်မှတ်ခြင်း' : 'Password Setup'}</div>
            <div style="font-size:10.5px; color:#e0e7ff; margin-top:2px;">Access Shop Login</div>
          </div>

        </div>
      </div>
    `;

    // Checker status HTML panel (Lookup by Ref Code, Email, OR Phone Number 09...)
    let appStatusResultHtml = '';
    if (checkQueryInput) {
      if (queriedApp) {
        let badgeClass = 'badge--info';
        if (queriedApp.status === 'active') badgeClass = 'badge--success';
        if (queriedApp.status === 'rejected') badgeClass = 'badge--expired';
        if (queriedApp.status === 'unverified_email') badgeClass = 'badge--warning';

        const commentHtml = queriedApp.status === 'rejected' ? `
          <div style="margin-top:12px; padding:12px; background:#fef2f2; border:1px solid #fca5a5; border-radius:8px; font-size:12.5px; color:#991b1b; line-height:1.4;">
            <strong>⚠️ ${lang === 'mm' ? 'စနစ်စီမံခန့်ခွဲသူ မှတ်ချက်:' : 'Admin Reviewer Note:'}</strong><br>
            ${queriedApp.returnComment || (lang === 'mm' ? 'လုပ်ငန်းလိုင်စင်စာရွက်မှာ မှုန်ဝါးနေသဖြင့် ဖတ်၍မရပါ။ ကျေးဇူးပြု၍ ပုံရိပ်ကြည်လင်သော ဖိုင်ကို ပြန်တင်ပေးပါ။' : 'Business license image is blurry. Please upload a clear document.')}
          </div>
        ` : '';

        // Approved Password Setup Link Notice
        const approvedPasswordSetupHtml = queriedApp.status === 'active' ? `
          <div style="margin-top:14px; background:#f0fdf4; border:1.5px solid #86efac; padding:14px; border-radius:10px;">
            <div style="font-size:13px; font-weight:800; color:#166534; display:flex; align-items:center; gap:8px;">
              🟢 ${lang === 'mm' ? 'ဆိုင်လျှောက်ထားမှု အတည်ပြုပြီးပါပြီ! စကားဝှက်သတ်မှတ်ရန် အီးမေးလ် ပေးပို့ပြီးပါပြီ' : 'Application Approved! Password Setup Email Sent'}
            </div>
            <p style="font-size:12px; color:#15803d; margin:4px 0 10px 0; line-height:1.4;">
              ${lang === 'mm' ? `စနစ်စီမံခန့်ခွဲသူမှ ဤဆိုင်ကို အတည်ပြုပေးလိုက်ပါပြီ။ စကားဝှက်သတ်မှတ်ရန် လင့်ခ်ကို <strong>${queriedApp.email}</strong> ထံသို့ ပေးပို့ထားပါသည်။` : `System administrator approved this shop! A password setup URL was emailed to <strong>${queriedApp.email}</strong>.`}
            </p>
            <button class="btn btn-primary btn-sm" style="font-size:12px; font-weight:700; border-radius:8px; background:#10b981; border-color:#10b981;" onclick="Router.navigate('/shop/login')">
              🔑 ${lang === 'mm' ? 'စကားဝှက်သတ်မှတ်၍ Portal သို့ ဝင်မည် →' : 'Open Password Setup & Log in to Portal →'}
            </button>
          </div>
        ` : '';

        appStatusResultHtml = `
          <div style="background:#f8fafc; border:1px solid #e2e8f0; border-radius:14px; padding:18px; margin-top:16px; font-size:13px; line-height:1.6;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
              <div>
                <strong style="font-size:15px; color:#0f172a;">${lang === 'mm' && queriedApp.shopName_mm ? queriedApp.shopName_mm : queriedApp.shopName}</strong>
                <span style="font-size:11px; color:#64748b; margin-left:8px; font-family:monospace;">(${queriedApp.refCode || 'APP-20260721-7A8B'})</span>
              </div>
              <span class="badge ${badgeClass}" style="font-weight:700; padding:4px 12px; border-radius:14px;">
                ${queriedApp.status === 'unverified_email' ? (lang === 'mm' ? '⚠️ အီးမေးလ် အတည်ပြုရန် လိုအပ်သည်' : '⚠️ Email Verification Required') : Components.statusBadge(queriedApp.status)}
              </span>
            </div>
            <div>👤 ${lang === 'mm' ? 'လျှောက်ထားသူ' : 'Applicant'}: <strong>${queriedApp.applicant}</strong></div>
            <div>📧 Email: <strong>${queriedApp.email}</strong> ${queriedApp.emailVerified ? (lang === 'mm' ? '🟢 (အတည်ပြုပြီး)' : '🟢 (Verified)') : (lang === 'mm' ? '🟡 (OTP စောင့်ဆိုင်းဆဲ)' : '🟡 (Pending OTP)')}</div>
            <div>📞 ${lang === 'mm' ? 'ဖုန်းနံပါတ်' : 'Phone'}: <strong style="color:#0f172a; font-weight:800;">${queriedApp.phone}</strong></div>
            <div>📅 ${lang === 'mm' ? 'လျှောက်ထားသည့်နေ့' : 'Submitted'}: <strong>${queriedApp.submittedAt ? queriedApp.submittedAt.split('T')[0] : '2026-07-21'}</strong></div>
            
            ${approvedPasswordSetupHtml}
            ${commentHtml}

            <!-- Quick Status Simulator Controls -->
            <div style="margin-top:14px; pt:12px; border-top:1px dashed #cbd5e1; display:flex; gap:8px; flex-wrap:wrap; align-items:center;">
              <span style="font-size:11px; font-weight:700; color:#64748b;">${lang === 'mm' ? 'Admin အတည်ပြုမှု စမ်းသပ်ခြင်း:' : 'Simulate Admin Approval:'}</span>
              <button class="btn btn-ghost btn-sm" style="font-size:11px; background:#dcfce7; color:#15803d; font-weight:700;" onclick="ScreenS17.setQueriedAppStatus('active')">🟢 Approve (Active)</button>
              <button class="btn btn-ghost btn-sm" style="font-size:11px; background:#fee2e2; color:#991b1b; font-weight:700;" onclick="ScreenS17.setQueriedAppStatus('rejected')">🔴 Reject with Note</button>
              <button class="btn btn-ghost btn-sm" style="font-size:11px; background:#f1f5f9; color:#475569; font-weight:700;" onclick="ScreenS17.setQueriedAppStatus('pending')">🟡 Reset Pending</button>
            </div>
          </div>
        `;
      } else {
        appStatusResultHtml = `
          <div style="padding:14px; background:#f8fafc; border:1px solid #e2e8f0; color:#64748b; text-align:center; font-size:13px; border-radius:10px; margin-top:16px;">
            ❌ ${I18n.t('app_not_found')} (No application matches code, email, or phone: "${checkQueryInput}")
          </div>
        `;
      }
    }

    const checkerCardHtml = `
      <div class="card" id="s17-checker-section" style="max-width:780px; margin:24px auto 0 auto; font-family:'Inter', sans-serif; border-radius:16px; padding:24px; border:1px solid #e2e8f0; background:white;">
        <h3 style="font-size:16px; font-weight:800; color:#0f172a; margin:0 0 4px 0; display:flex; align-items:center; gap:8px;">
          🔍 ${I18n.t('check_app_status')}
        </h3>
        <p style="font-size:12px; color:#64748b; margin:0 0 14px 0;">
          ${lang === 'mm' 
            ? 'မိမိ၏ လျှောက်လွှာ ခြေရာခံနံပါတ် (ဥပမာ- APP-20260721-7A8B)၊ အီးမေးလ် သို့မဟုတ် ဖုန်းနံပါတ် (၀၉...) ဖြင့် လျှောက်လွှာ အခြေအနေကို စစ်ဆေးပါ' 
            : 'Lookup your application progress using your Application Reference Code (e.g. APP-20260721-7A8B), Email, or Myanmar Phone Number (09...)'}
        </p>
        <div style="display:flex; gap:10px;">
          <input type="text" class="form-input" id="check-query-input" placeholder="${I18n.t('app_ref_placeholder')}" value="${checkQueryInput}" 
                 style="height:42px; font-size:13.5px; padding:6px 14px; border-radius:10px; flex:1;"
                 onkeydown="if(event.key==='Enter'){ScreenS17.checkApplicationStatus(); event.preventDefault();}">
          <button class="btn btn-primary" style="height:42px; font-size:13px; padding:0 20px; white-space:nowrap; font-weight:700; border-radius:10px;" onclick="ScreenS17.checkApplicationStatus()">
            ${I18n.t('check_status_btn')}
          </button>
        </div>
        ${appStatusResultHtml}
      </div>
    `;

    // Spam & Bot Protection Simulator Panel
    const simulatorHtml = `
      <div class="card" style="max-width:780px; margin:24px auto 0 auto; border: 1.5px solid #cbd5e1; border-radius: 14px; padding:20px; background: #f8fafc; font-family: 'Inter', sans-serif;">
        <div style="font-weight:700; font-size:13.5px; color:#0f172a; margin-bottom:8px; display:flex; align-items:center; gap:8px;">
          🛡️ Bot Protection & Rate Limiting Controls (Developer Simulator)
        </div>
        <div style="display:flex; align-items:center; gap:10px; font-size:13px;">
          <input type="checkbox" id="sim-spam-check" ${spamBlockActive ? 'checked' : ''} onchange="ScreenS17.toggleSpamBlock(this.checked)" style="cursor:pointer; width:16px; height:16px;">
          <label for="sim-spam-check" style="cursor:pointer; font-weight:600; color:#334155;">
            ⚡ ${I18n.t('sim_spam_active')} (Simulate Rate Limit 429 Block)
          </label>
        </div>
      </div>
    `;

    const content = `
      <div style="max-width:840px; margin:0 auto; padding:16px 0;">
        
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
          <button class="btn btn-ghost btn-sm" onclick="Router.navigate('/user/home')" style="font-size:13px; font-weight:600;">
            ← ${I18n.t('back')}
          </button>
          
          <div style="display:flex; gap:8px; flex-wrap:wrap;">
            <span style="background:#dcfce7; color:#15803d; font-size:10.5px; font-weight:800; padding:3px 10px; border-radius:12px;">
              Function ID: C-13
            </span>
          </div>
        </div>

        ${Components.pageHeader(I18n.t('s17_title'), I18n.t('s17_subtitle'))}

        ${mainContentHtml}
        ${emailWorkflowPipelineHtml}
        ${checkerCardHtml}
        ${simulatorHtml}

      </div>
    `;

    App.renderUserPage(content);

    // Initial form check
    setTimeout(() => {
      validateForm();
      const phoneInputEl = document.getElementById('app-phone');
      if (phoneInputEl) {
        phoneInputEl.addEventListener('input', validateForm);
      }
    }, 50);
  }

  function fillDemoData() {
    const lang = I18n.getLang();
    const nameEl = document.getElementById('app-name');
    const phoneEl = document.getElementById('app-phone');
    const emailEl = document.getElementById('app-email');
    const shopEnEl = document.getElementById('app-shop-en');
    const shopMmEl = document.getElementById('app-shop-mm');
    const descEl = document.getElementById('app-desc');
    const agreeEl = document.getElementById('app-agreement');
    const turnstileEl = document.getElementById('turnstile-check');

    if (nameEl) nameEl.value = 'Ko Aung Myo';
    if (phoneEl) phoneEl.value = '09450000000';
    if (emailEl) emailEl.value = 'aungmyo@yangonbistro.com';
    if (shopEnEl) shopEnEl.value = 'Yangon Garden Bistro';
    if (shopMmEl) shopMmEl.value = 'ရန်ကုန် ဂါဒင် ဘစ်စထရို';
    if (descEl) descEl.value = 'Premium Myanmar & Asian Fusion Restaurant with outdoor garden seating, capacity 80 persons.';
    if (agreeEl) agreeEl.checked = true;
    if (turnstileEl) turnstileEl.checked = true;

    uploadedFileName = 'yangon_bistro_license.pdf';
    turnstileVerified = true;

    showToast('info', lang === 'mm' ? 'ဒီမိုအချက်အလက်များ ဖြည့်စွက်ပြီး' : 'Demo Data Filled', lang === 'mm' ? 'ဖောင် အချက်အလက်များအားလုံး တရားဝင် Test Data ဖြင့် ဖြည့်စွက်ပြီးပါပြီ။' : 'All fields pre-populated with valid test data!');
    render();
  }

  function validateForm() {
    const form = document.getElementById('s17-application-form');
    const submitBtn = document.getElementById('app-submit-btn');
    if (!form || !submitBtn) return;

    const nameEl = document.getElementById('app-name');
    const phoneEl = document.getElementById('app-phone');
    const emailEl = document.getElementById('app-email');
    const shopEnEl = document.getElementById('app-shop-en');
    const shopMmEl = document.getElementById('app-shop-mm');
    const descEl = document.getElementById('app-desc');
    const agreeEl = document.getElementById('app-agreement');

    if (!nameEl || !phoneEl || !emailEl || !shopEnEl || !shopMmEl || !descEl || !agreeEl) return;

    const inputsValid = nameEl.value.trim().length > 0 &&
                       Components.validatePhoneNumber('app-phone') &&
                       emailEl.checkValidity() && emailEl.value.trim().length > 0 &&
                       shopEnEl.value.trim().length > 0 &&
                       shopMmEl.value.trim().length > 0 &&
                       descEl.value.trim().length > 0 &&
                       Boolean(uploadedFileName) &&
                       agreeEl.checked &&
                       turnstileVerified;

    submitBtn.disabled = !inputsValid;
  }

  function toggleTurnstile(checked) {
    turnstileVerified = checked;
    validateForm();
  }

  function handleFileChange(e) {
    const file = e.target.files[0];
    const alertEl = document.getElementById('file-error-alert');
    if (alertEl) alertEl.style.display = 'none';

    if (!file) {
      uploadedFileName = '';
      render();
      return;
    }

    // 1. File size validation (10MB limit)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      showToast('error', 'File Size Limit Exceeded', 'Document size exceeds 10MB limit.');
      if (alertEl) {
        alertEl.style.display = 'flex';
        alertEl.innerHTML = I18n.t('app_size_error');
      }
      e.target.value = ''; // Reset input
      uploadedFileName = '';
      validateForm();
      return;
    }

    // 2. File type validation (PDF, Images only)
    const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      showToast('error', 'Format Unaccepted', 'Accepted formats: PDF, JPG, PNG.');
      if (alertEl) {
        alertEl.style.display = 'flex';
        alertEl.innerHTML = I18n.t('app_type_error');
      }
      e.target.value = ''; // Reset input
      uploadedFileName = '';
      validateForm();
      return;
    }

    // Accept file
    uploadedFileName = file.name;
    showToast('success', 'License Validated', `File "${file.name}" accepted.`);
    render();
  }

  function toggleSpamBlock(checked) {
    spamBlockActive = checked;
    showToast('info', 'Rate Limiter Simulator', checked ? 'Rate limit simulation active. New applications will be blocked.' : 'Normal submissions enabled.');
  }

  // STAGE 1: Submit Application & Trigger Email Verification Modal (Requirement #3)
  function submitApplication(e) {
    e.preventDefault();
    
    if (spamBlockActive) {
      showToast('error', 'Submission Rejected', 'Bot Protection System blocked the request (429 Rate Limit).');
      const alertEl = document.getElementById('file-error-alert');
      if (alertEl) {
        alertEl.style.display = 'flex';
        alertEl.innerHTML = I18n.t('app_spam_warning');
      }
      return;
    }

    if (!Components.validatePhoneNumber('app-phone')) {
      showToast('error', 'Validation Error', I18n.getLang() === 'mm' 
        ? 'ကျေးဇူးပြု၍ တရားဝင် မြန်မာဖုန်းနံပါတ် ၇ လုံးမှ ၉ လုံး ထည့်သွင်းပါ (ဥပမာ - ၉၄၅၀၀၀၀၀၀၀)' 
        : 'Please enter a valid Myanmar phone number (e.g., 9450000000).');
      return;
    }

    const applicant = document.getElementById('app-name')?.value.trim() || 'Ko Aung Myo';
    const phone = Components.getRawPhoneNumber('app-phone') || '09450000000';
    const email = document.getElementById('app-email')?.value.trim() || 'aungmyo@yangonbistro.com';
    const shopEn = document.getElementById('app-shop-en')?.value.trim() || 'Yangon Garden Bistro';
    const shopMm = document.getElementById('app-shop-mm')?.value.trim() || 'ရန်ကုန် ဂါဒင် ဘစ်စထရို';
    const area = document.getElementById('app-area')?.value || 'yangon_bhn';
    const desc = document.getElementById('app-desc')?.value.trim() || 'Premium Myanmar & Asian Fusion Restaurant with outdoor garden seating.';

    // Generate unique Application Reference Code & 6-digit Verification OTP
    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const randCode = Math.random().toString(36).substring(2, 6).toUpperCase();
    const refCode = `APP-${dateStr}-${randCode}`;
    generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();

    // Mock Business License Storage URL (EXT-15)
    const businessLicenseUrl = `https://supabase.storage/business_licenses/${applicant.replace(/\s+/g, '_')}_license.pdf`;

    const newApp = {
      id: `app-${Date.now()}`,
      refCode: refCode,
      shopName: shopEn,
      shopName_mm: shopMm,
      area: area,
      applicant: applicant,
      email: email,
      emailVerified: false,
      phone: phone,
      description: desc,
      business_license_url: businessLicenseUrl,
      status: 'unverified_email', // Require email verification before AD-02 review!
      submittedAt: new Date().toISOString()
    };

    lastSubmittedApp = newApp;

    // Show Email Verification Prompt (Requirement #3)
    openEmailVerificationModal();
  }

  // STAGE 2: Email Verification Modal (Requirement #3 & #4)
  function openEmailVerificationModal() {
    if (!lastSubmittedApp) return;
    const lang = I18n.getLang();

    const existing = document.getElementById('email-verification-modal');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.id = 'email-verification-modal';
    overlay.style.cssText = 'position:fixed; top:0; left:0; right:0; bottom:0; background:rgba(15,23,42,0.7); backdrop-filter:blur(5px); display:flex; align-items:center; justify-content:center; z-index:9999;';

    overlay.innerHTML = `
      <div style="background:white; border-radius:18px; padding:28px; max-width:500px; width:92%; box-shadow:0 20px 40px rgba(0,0,0,0.25); border:1px solid #e2e8f0; font-family:'Inter', sans-serif; text-align:center;" onclick="event.stopPropagation()">
        
        <div style="width: 64px; height: 64px; border-radius: 50%; background: #e0e7ff; color: #4f46e5; display: flex; align-items: center; justify-content: center; font-size: 32px; margin: 0 auto 16px auto;">
          📧
        </div>

        <h3 style="font-size:19px; font-weight:800; color:#0f172a; margin:0 0 6px 0;">
          ${lang === 'mm' ? 'အီးမေးလ်အတည်ပြုပါ (Requirement #3)' : 'Verify Your Email Address (Requirement #3)'}
        </h3>

        <p style="font-size:13px; color:#475569; line-height:1.5; margin:0 0 16px 0;">
          ${lang === 'mm' ? 'အတည်ပြုလင့်ခ်နှင့် ဂဏန်း ၆ လုံးပါ OTP ကုတ်ကို အောက်ပါ အီးမေးလ်သို့ ပေးပို့ထားပါသည်:' : 'A verification link and 6-digit OTP code were sent to:'}<br>
          <strong style="color:#0f172a; font-size:14px;">${lastSubmittedApp.email}</strong>
        </p>

        <div style="background:#f8fafc; border:1px solid #cbd5e1; border-radius:12px; padding:16px; margin-bottom:20px; text-align:left;">
          <label style="font-size:12px; font-weight:700; color:#334155; display:block; margin-bottom:6px;">
            ${lang === 'mm' ? 'ဂဏန်း ၆ လုံးပါ OTP ကုတ် ရိုက်ထည့်ပါ:' : 'Enter 6-Digit OTP Code'} (Demo OTP: <code style="color:#4f46e5; font-weight:800;">${generatedOtp}</code>):
          </label>
          <div style="display:flex; gap:10px;">
            <input type="text" class="form-input" id="otp-input" placeholder="${generatedOtp}" maxlength="6" 
                   style="height:42px; font-size:16px; font-weight:800; letter-spacing:0.2em; text-align:center; border-radius:8px; flex:1;" value="${generatedOtp}">
            <button class="btn btn-primary" style="font-size:13px; font-weight:700; border-radius:8px; padding:0 18px;" onclick="ScreenS17.confirmOtpVerification()">
              ${lang === 'mm' ? 'OTP အတည်ပြုမည်' : 'Confirm OTP'}
            </button>
          </div>
        </div>

        <div style="border-top:1px dashed #e2e8f0; pt:14px; margin-top:14px; display:flex; flex-direction:column; gap:8px;">
          <button class="btn btn-secondary btn-sm" style="font-size:12.5px; font-weight:700; background:#f0fdf4; color:#166534; border:1px solid #bbf7d0; width:100%; height:38px;" onclick="ScreenS17.confirmEmailLinkVerification()">
            ⚡ ${lang === 'mm' ? 'အီးမေးလ်ထဲမှ Verification Link ကို နှိပ်မည် (1-Click)' : 'Simulate Clicking Verification Link in Email'}
          </button>
          <div style="font-size:11px; color:#64748b;">
            ${lang === 'mm' ? 'အီးမေးလ် အတည်ပြုပြီးပါက လျှောက်လွှာသည် စနစ်စီမံသူ (AD-02) ၏ စိစစ်မည့် စာရင်းထဲသို့ ရောက်ရှိသွားမည်ဖြစ်ပြီး အလိုအလျောက် အတည်ပြု အီးမေးလ် (EXT-04) ကို ပေးပို့ပါမည်။' : 'Once verified, application status updates to "Pending Admin Review" (AD-02) and auto-responder email (EXT-04) is sent.'}
          </div>
        </div>

      </div>
    `;

    document.body.appendChild(overlay);
  }

  function confirmOtpVerification() {
    const input = document.getElementById('otp-input');
    const entered = input ? input.value.trim() : '';

    if (entered !== generatedOtp && entered !== '582914') {
      showToast('error', 'Invalid OTP', `Incorrect code. Use demo code: ${generatedOtp}`);
      return;
    }

    completeVerification();
  }

  function confirmEmailLinkVerification() {
    completeVerification();
  }

  function completeVerification() {
    const modal = document.getElementById('email-verification-modal');
    if (modal) modal.remove();

    if (!lastSubmittedApp) return;

    // 1. Update verification state & status to pending
    lastSubmittedApp.emailVerified = true;
    lastSubmittedApp.status = 'pending';

    // Add to MockData array
    MockData.shopApplications.unshift(lastSubmittedApp);

    isSubmitted = true;
    showToast('success', 'Email Verified', `Email verified! Reference Code ${lastSubmittedApp.refCode} registered & Auto-responder email sent.`);
    render();
  }

  // BILINGUAL SENT EMAIL INBOX SIMULATOR (EN & MM Dynamic Multilingual Support)
  function openEmailInboxModal() {
    const lang = I18n.getLang();
    const email = lastSubmittedApp ? lastSubmittedApp.email : 'aungmyo@yangonbistro.com';
    const refCode = lastSubmittedApp ? lastSubmittedApp.refCode : 'APP-20260721-7A8B';
    const shopNameEn = lastSubmittedApp ? lastSubmittedApp.shopName : 'Yangon Garden Bistro';
    const shopNameMm = lastSubmittedApp ? (lastSubmittedApp.shopName_mm || lastSubmittedApp.shopName) : 'ရန်ကုန် ဂါဒင် ဘစ်စထရို';
    const shopNameDisplay = lang === 'mm' ? shopNameMm : shopNameEn;

    const existing = document.getElementById('email-inbox-modal');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.id = 'email-inbox-modal';
    overlay.style.cssText = 'position:fixed; top:0; left:0; right:0; bottom:0; background:rgba(15,23,42,0.65); backdrop-filter:blur(4px); display:flex; align-items:center; justify-content:center; z-index:9999;';

    // Localized Email Contents
    const email1Subject = lang === 'mm' 
      ? `[EzBookNow] ဆိုင်အသစ်လျှောက်ထားခြင်းအတွက် အီးမေးလ်အတည်ပြုရန်`
      : `[EzBookNow] Verify Your Email Address for Shop Application`;

    const email1Sender = lang === 'mm' 
      ? `EzBookNow လုံခြုံရေးအဖွဲ့ <verify@ezbooknow.com>`
      : `EzBookNow Security <verify@ezbooknow.com>`;

    const email1Body = lang === 'mm' ? `
      မင်္ဂလာပါ ဆိုင်လျှောက်ထားသူရှင့်၊<br><br>
      "<strong>${shopNameDisplay}</strong>" ဆိုင်လျှောက်ထားမှု ပြီးမြောက်စေရန် ကျေးဇူးပြု၍ မိမိ၏ အီးမေးလ်ကို အတည်ပြုပေးပါ။<br>
      သင့်၏ ဂဏန်း ၆ လုံးပါ အတည်ပြု OTP ကုဒ်မှာ: <code style="font-weight:800; color:#d97706; font-size:14px;">${generatedOtp}</code> ဖြစ်ပါသည်။<br><br>
      သို့မဟုတ် အောက်ပါ လင့်ခ်ကို နှိပ်၍လည်း ချက်ချင်း အတည်ပြုနိုင်ပါသည်- <br>
      <a href="#" onclick="event.preventDefault(); ScreenS17.closeEmailInboxModal(); ScreenS17.confirmEmailLinkVerification();" style="color:#2563eb; font-weight:700;">https://ezbooknow.com/verify-email?token=xyz987</a>
    ` : `
      Dear Applicant,<br><br>
      Please verify your email address to complete your application for "<strong>${shopNameDisplay}</strong>".<br>
      Your 6-digit Verification OTP Code is: <code style="font-weight:800; color:#d97706; font-size:14px;">${generatedOtp}</code><br><br>
      Alternatively, click the link below to verify instantly:<br>
      <a href="#" onclick="event.preventDefault(); ScreenS17.closeEmailInboxModal(); ScreenS17.confirmEmailLinkVerification();" style="color:#2563eb; font-weight:700;">https://ezbooknow.com/verify-email?token=xyz987</a>
    `;

    const email2Subject = lang === 'mm' 
      ? `[EzBookNow] ဆိုင်အသစ်လျှောက်ထားမှု လက်ခံရရှိပါပြီ (${refCode})`
      : `[EzBookNow] Shop Application Received (${refCode})`;

    const email2Sender = lang === 'mm' 
      ? `EzBookNow မိတ်ဖက်ဝန်ဆောင်မှု <no-reply@ezbooknow.com>`
      : `EzBookNow Partner Support <no-reply@ezbooknow.com>`;

    const email2Body = lang === 'mm' ? `
      မင်္ဂလာပါ ဆိုင်လျှောက်ထားသူရှင့်၊<br><br>
      "<strong>${shopNameDisplay}</strong>" ဆိုင်လျှောက်ထားမှုအတွက် အထူးကျေးဇူးတင်ရှိပါသည်။<br>
      သင်၏ လျှောက်လွှာ ခြေရာခံနံပါတ်မှာ: <code style="font-weight:800; color:#4f46e5;">${refCode}</code> ဖြစ်ပါသည်။<br><br>
      ကျွန်ုပ်တို့ စနစ်စီမံခန့်ခွဲသူများမှ သင်၏ လုပ်ငန်းလိုင်စင်နှင့် အချက်အလက်များကို စိစစ်လျက်ရှိပြီး၊ <strong>ရုံးဖွင့်ရက် (၃) ရက်အတွင်း</strong> ပြန်လည်ဆက်သွယ်ပေးမည် ဖြစ်ပါသည်။ ဤမျက်နှာပြင်တွင် လျှောက်လွှာခြေရာခံနံပါတ်ဖြင့် အချိန်မရွေး ပြန်လည်စစ်ဆေးနိုင်ပါသည်။
    ` : `
      Dear Applicant,<br><br>
      Thank you for submitting your shop listing application for "<strong>${shopNameDisplay}</strong>".<br>
      Your Application Reference Code is: <code style="font-weight:800; color:#4f46e5;">${refCode}</code><br><br>
      Our operations team is currently reviewing your business license and application. We will contact you within <strong>3 business days</strong>. You can track your status anytime using your Reference Code.
    `;

    const email3Subject = lang === 'mm' 
      ? `🎉 ဂုဏ်ယူပါသည်! "${shopNameDisplay}" ဆိုင်လျှောက်ထားမှု အတည်ပြုပြီးပါပြီ!`
      : `🎉 Congratulations! Your Shop Application for "${shopNameDisplay}" is Approved!`;

    const email3Sender = lang === 'mm' 
      ? `EzBookNow စနစ်စီမံခန့်ခွဲသူအဖွဲ့ <admin@ezbooknow.com>`
      : `EzBookNow Admin Team <admin@ezbooknow.com>`;

    const email3Body = lang === 'mm' ? `
      မင်္ဂလာပါ ဆိုင်လျှောက်ထားသူရှင့်၊<br><br>
      သင်၏ "<strong>${shopNameDisplay}</strong>" ဆိုင်လျှောက်ထားမှုကို စနစ်စီမံခန့်ခွဲသူများမှ <strong>အတည်ပြုပေးလိုက်ပြီဖြစ်ကြောင်း</strong> ဝမ်းမြောက်စွာ အသိပေးအပ်ပါသည်။<br><br>
      Shop Management Portal သို့ ဝင်ရောက်နိုင်ရန် ကျေးဇူးပြု၍ အောက်ပါ ခလုတ်ကို နှိပ်၍ အကောင့်စကားဝှက်ကို သတ်မှတ်ပေးပါ-<br>
      <div style="margin-top:10px;">
        <button class="btn btn-primary btn-sm" style="font-size:12px; font-weight:800; background:#10b981; border-color:#10b981;" onclick="ScreenS17.closeEmailInboxModal(); Router.navigate('/shop/login');">
          🔑 စကားဝှက်သတ်မှတ်၍ Portal သို့ ဝင်မည် →
        </button>
      </div>
    ` : `
      Dear Applicant,<br><br>
      We are pleased to inform you that your shop "<strong>${shopNameDisplay}</strong>" has been <strong>APPROVED</strong> by system administrators!<br><br>
      Please click the button below to set your account password and access the Shop Management Portal:<br>
      <div style="margin-top:10px;">
        <button class="btn btn-primary btn-sm" style="font-size:12px; font-weight:800; background:#10b981; border-color:#10b981;" onclick="ScreenS17.closeEmailInboxModal(); Router.navigate('/shop/login');">
          🔐 Set Password & Log In to Portal →
        </button>
      </div>
    `;

    overlay.innerHTML = `
      <div style="background:white; border-radius:18px; padding:24px; max-width:580px; width:92%; box-shadow:0 20px 40px rgba(0,0,0,0.25); border:1px solid #e2e8f0; font-family:'Inter', sans-serif;" onclick="event.stopPropagation()">
        <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid #f1f5f9; padding-bottom:12px; margin-bottom:16px;">
          <div>
            <h3 style="font-size:16.5px; font-weight:800; color:#0f172a; margin:0; display:flex; align-items:center; gap:8px;">
              📬 ${lang === 'mm' ? 'အီးမေးလ်များ ကြည့်ရန် (Live Sent Email Inbox Simulator)' : 'Sent Email Inbox Simulator (EXT-04 Resend API)'}
            </h3>
            <p style="font-size:11.5px; color:#64748b; margin:2px 0 0 0;">
              ${lang === 'mm' ? 'အကောင့်အီးမေးလ်' : 'Inbox Preview for'} <strong>${email}</strong> (${lang === 'mm' ? 'မြန်မာဘာသာဖြင့် ဖော်ပြပေးထားသည်' : 'Localized Text'})
            </p>
          </div>
          <button type="button" style="background:none; border:none; font-size:20px; color:#64748b; cursor:pointer;" onclick="ScreenS17.closeEmailInboxModal()">✕</button>
        </div>

        <div style="display:flex; flex-direction:column; gap:14px; max-height:450px; overflow-y:auto; padding-right:4px;">
          
          <!-- EMAIL 1: Email Verification Link / OTP (Requirement #3) -->
          <div style="border:1px solid #fde047; border-radius:12px; padding:16px; background:#fefce8;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
              <span style="font-size:11px; background:#fef08a; color:#854d0e; font-weight:800; padding:2px 8px; border-radius:10px;">
                Email #1 (${lang === 'mm' ? 'အီးမေးလ် အတည်ပြုရန် - Requirement #3' : 'Verification Link / OTP - Requirement #3'})
              </span>
              <span style="font-size:11px; color:#64748b;">Step 1</span>
            </div>
            <div style="font-size:13px; font-weight:800; color:#713f12; margin-bottom:4px;">
              Subject: ${email1Subject}
            </div>
            <div style="font-size:11.5px; color:#854d0e; margin-bottom:8px;">
              From: ${email1Sender}
            </div>
            <div style="font-size:12px; color:#713f12; line-height:1.5; background:white; padding:12px; border-radius:8px; border:1px solid #fef08a;">
              ${email1Body}
            </div>
          </div>

          <!-- EMAIL 2: Auto-Reply Confirmation Email (Requirement #4) -->
          <div style="border:1px solid #cbd5e1; border-radius:12px; padding:16px; background:#f8fafc;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
              <span style="font-size:11px; background:#dcfce7; color:#15803d; font-weight:800; padding:2px 8px; border-radius:10px;">
                Email #2 (${lang === 'mm' ? 'အလိုအလျောက် အကြောင်းပြန် အီးမေးလ် - Requirement #4' : 'Auto-Reply Sent - Requirement #4'})
              </span>
              <span style="font-size:11px; color:#64748b;">Step 2</span>
            </div>
            <div style="font-size:13px; font-weight:800; color:#0f172a; margin-bottom:4px;">
              Subject: ${email2Subject}
            </div>
            <div style="font-size:11.5px; color:#475569; margin-bottom:8px;">
              From: ${email2Sender}
            </div>
            <div style="font-size:12px; color:#334155; line-height:1.5; background:white; padding:12px; border-radius:8px; border:1px solid #e2e8f0;">
              ${email2Body}
            </div>
          </div>

          <!-- EMAIL 3: Admin Approval & Password Setup Email -->
          <div style="border:1px solid #86efac; border-radius:12px; padding:16px; background:#f0fdf4;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
              <span style="font-size:11px; background:#bbf7d0; color:#166534; font-weight:800; padding:2px 8px; border-radius:10px;">
                Email #3 (${lang === 'mm' ? 'Admin အတည်ပြုပြီးချိန် ပေးပို့မည့် အီးမေးလ်' : 'Sent upon Admin Approval in AD-02'})
              </span>
              <span style="font-size:11px; color:#15803d; font-weight:700;">When Approved</span>
            </div>
            <div style="font-size:13px; font-weight:800; color:#14532d; margin-bottom:4px;">
              Subject: ${email3Subject}
            </div>
            <div style="font-size:11.5px; color:#166534; margin-bottom:8px;">
              From: ${email3Sender}
            </div>
            <div style="font-size:12px; color:#14532d; line-height:1.5; background:white; padding:12px; border-radius:8px; border:1px solid #bbf7d0;">
              ${email3Body}
            </div>
          </div>

        </div>

        <div style="display:flex; justify-content:space-between; align-items:center; margin-top:16px;">
          <div style="font-size:11.5px; color:#64748b;">
            💡 ${lang === 'mm' ? 'ညာဘက်အပေါ်ရှိ ဘာသာစကားပြောင်းပါက အီးမေးလ်များ မြန်မာ/အင်္ဂလိပ် အလိုအလျောက် ပြောင်းလဲပါသည်' : 'Emails dynamically update based on application language!'}
          </div>
          <button class="btn btn-ghost btn-sm" style="font-size:12.5px; font-weight:700;" onclick="ScreenS17.closeEmailInboxModal()">
            ${lang === 'mm' ? 'ပိတ်မည်' : 'Close Preview'}
          </button>
        </div>
      </div>
    `;

    overlay.onclick = (e) => {
      if (e.target === overlay) ScreenS17.closeEmailInboxModal();
    };

    document.body.appendChild(overlay);
  }

  function closeEmailInboxModal() {
    const modal = document.getElementById('email-inbox-modal');
    if (modal) modal.remove();
  }

  function autoTestStatusLookup(refCode) {
    checkQueryInput = refCode;
    checkApplicationStatus();
    
    // Smooth scroll down to checker section
    setTimeout(() => {
      const checkerEl = document.getElementById('s17-checker-section');
      if (checkerEl) {
        checkerEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
  }

  function setQueriedAppStatus(status) {
    if (!queriedApp) return;
    queriedApp.status = status;
    if (status === 'rejected') {
      queriedApp.returnComment = 'လုပ်ငန်းလိုင်စင်စာရွက်မှာ မှုန်ဝါးနေသဖြင့် ဖတ်၍မရပါ။ ကျေးဇူးပြု၍ ပုံရိပ်ကြည်လင်သော ဖိုင်ကို ပြန်တင်ပေးပါ။ (Uploaded business license document is blurry. Please re-upload clear file.)';
    } else {
      delete queriedApp.returnComment;
    }
    showToast('info', 'Status Simulated', `Application ${queriedApp.refCode} status set to: ${status.toUpperCase()}`);
    render();
  }

  function copyRefCode(code) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code);
      showToast('success', 'Copied', `Reference Code ${code} copied to clipboard!`);
    }
  }

  function downloadReceipt() {
    if (!lastSubmittedApp) return;
    const text = `EZBOOKNOW SHOP APPLICATION RECEIPT\n` +
                 `----------------------------------------\n` +
                 `Reference Code : ${lastSubmittedApp.refCode}\n` +
                 `Shop Name      : ${lastSubmittedApp.shopName}\n` +
                 `Applicant      : ${lastSubmittedApp.applicant}\n` +
                 `Email          : ${lastSubmittedApp.email}\n` +
                 `Email Verified : YES\n` +
                 `Phone          : ${lastSubmittedApp.phone}\n` +
                 `Submitted At   : ${lastSubmittedApp.submittedAt}\n` +
                 `Status         : PENDING OPERATOR REVIEW\n` +
                 `----------------------------------------\n` +
                 `Our team will review your application within 3 business days.\n` +
                 `You will receive a password setup email once reviewed by administrators.`;

    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ezbooknow_receipt_${lastSubmittedApp.refCode}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('success', 'Receipt Downloaded', `Receipt file saved.`);
  }

  // MULTI-FIELD FLEXIBLE APPLICATION STATUS LOOKUP (Ref Code, Email, OR Phone Number 09...)
  function checkApplicationStatus() {
    const input = document.getElementById('check-query-input');
    if (input && input.value.trim()) {
      checkQueryInput = input.value.trim();
    }

    if (!checkQueryInput) {
      queriedApp = null;
      render();
      return;
    }

    const queryLower = checkQueryInput.toLowerCase().trim();
    const queryDigits = queryLower.replace(/\D/g, '');

    const found = MockData.shopApplications.find(a => {
      // 1. Match Reference Code
      if (a.refCode && a.refCode.toLowerCase() === queryLower) return true;
      // 2. Match Email Address
      if (a.email && a.email.toLowerCase() === queryLower) return true;
      // 3. Match Phone Number (Flexible Myanmar 09... / 9... / +959... matching)
      if (a.phone) {
        const phoneDigits = a.phone.replace(/\D/g, '');
        if (queryDigits.length >= 7) {
          if (phoneDigits === queryDigits) return true;
          if (phoneDigits.endsWith(queryDigits)) return true;
          if (queryDigits.endsWith(phoneDigits)) return true;
          if (queryDigits.startsWith('09') && phoneDigits.endsWith(queryDigits.substring(1))) return true;
          if (queryDigits.startsWith('9') && phoneDigits.endsWith(queryDigits)) return true;
        }
      }
      return false;
    });
    
    if (found) {
      queriedApp = found;
    } else {
      queriedApp = null;
    }
    render();
  }

  function resetFormState() {
    isSubmitted = false;
    lastSubmittedApp = null;
    uploadedFileName = 'yangon_bistro_license.pdf';
    queriedApp = null;
    checkQueryInput = '';
    render();
  }

  return { 
    render, 
    fillDemoData,
    validateForm, 
    toggleTurnstile,
    handleFileChange, 
    toggleSpamBlock, 
    submitApplication, 
    confirmOtpVerification,
    confirmEmailLinkVerification,
    openEmailInboxModal,
    closeEmailInboxModal,
    autoTestStatusLookup,
    setQueriedAppStatus,
    copyRefCode,
    downloadReceipt,
    checkApplicationStatus, 
    resetFormState 
  };
})();
