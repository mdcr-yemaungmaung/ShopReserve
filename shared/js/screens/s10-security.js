/* ============================================================
   EzBookNow Screen AD-X1 / S-10 — Security Settings Screen
   Fully aligned with prototype/DESIGN.md & AD-18 standard (Components.icon())
   - Colors: Deep Navy (#0F1142), Vibrant Lime (#aaf457) CTAs, Crisp Off-white (#f8f9fa)
   - Glassmorphism: Backdrop blur (16px), 1px solid white 10% opacity top/left border
   - High Contrast CTA: Deep Navy text/icons on Vibrant Lime Green buttons
   - Typography: Outfit (Headlines & Display Numbers), Inter (Body, Labels & Controls)
   - Corner Radii: 12px Containers, 8px Buttons/Inputs, 9999px Status Chips/Badges
   ============================================================ */

var ScreenS10 = (() => {
  // Read persistent states from localStorage
  let twofaEnabled = false;
  let isPhase2 = false;
  let activeTab = 'password'; // 'password' | '2fa' | 'sessions' | 'policy'

  try {
    twofaEnabled = localStorage.getItem('s10_2fa_enabled') === 'true';
    isPhase2 = localStorage.getItem('s10_phase') === '2';
  } catch (e) {}
  
  // Local transient states
  let showSetupWizard = false;
  let showDeactivateWizard = false;

  let showCurrentPwd = false;
  let showNewPwd = false;
  let showConfirmPwd = false;

  // Recovery Codes Mock
  const RECOVERY_CODES = [
    '8F3A-9K1L', '4D7E-2P9M', '1A6B-8C9D', '3E5F-7G2H',
    '9H4I-6J3K', '2L5M-7N8O', '4P1Q-3R9S', '6T2U-8V4W'
  ];

  // Audit Logs Mock
  const AUDIT_LOGS = [
    { id: 'LOG-8912', event: 'Password Update', category: 'AUTHENTICATION', ip: '103.115.21.4', location: 'Yangon, MM', time: 'Today, 08:12 AM', status: 'Success' },
    { id: 'LOG-8845', event: '2FA TOTP Verification', category: 'SECURITY_MFA', ip: '103.115.21.4', location: 'Yangon, MM', time: 'Today, 07:45 AM', status: 'Success' },
    { id: 'LOG-8710', event: 'Shop Manager Login', category: 'SESSION_START', ip: '180.211.89.12', location: 'Mandalay, MM', time: 'Yesterday, 06:30 PM', status: 'Success' },
    { id: 'LOG-8602', event: 'Failed Password Attempt', category: 'AUTH_WARNING', ip: '192.168.1.99', location: 'Unknown', time: '19 Jul 2026, 11:20 PM', status: 'Blocked' },
  ];

  // ── Icon Helper (AD-18 Standard) ──────────────────────────────
  function getIcon(name, size = 18) {
    if (typeof Components !== 'undefined' && Components.icon) {
      return Components.icon(name, size);
    }
    return '';
  }

  function render() {
    const lang = I18n.getLang();

    // Security Score Calculation
    let securityScore = 50;
    if (twofaEnabled) securityScore += 35;
    if (!isPhase2 || twofaEnabled) securityScore += 15;

    // Header HTML with Breadcrumbs and Security Score Widget (Glassmorphism)
    const headerHtml = `
      <div style="background:rgba(15,17,66,0.95); backdrop-filter:blur(16px); color:#ffffff; border-radius:12px; padding:24px 28px; margin-bottom:24px; border:1px solid #c7c5d0; border-top:1px solid rgba(255,255,255,0.8); border-left:1px solid rgba(255,255,255,0.8); font-family:'Inter',sans-serif;">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px;">
          <div>
            <!-- Breadcrumbs -->
            <div style="font-size:11.5px; color:#c7c5d0; font-weight:600; text-transform:uppercase; letter-spacing:0.08em; margin-bottom:8px; display:flex; align-items:center; gap:6px;">
              <span>Enterprise Admin</span>
              <span>/</span>
              <span>Account Management</span>
              <span>/</span>
              <span style="color:#aaf457; font-weight:700;">Security Settings</span>
            </div>

            <h1 style="font-size:24px; font-weight:700; font-family:'Outfit',sans-serif; margin:0 0 8px 0; color:#ffffff; display:flex; align-items:center; gap:12px;">
              <span style="color:#aaf457; display:inline-flex;">${getIcon('shield', 26)}</span>
              ${I18n.t('security_settings')}
            </h1>

            <!-- System Spec Tags (Pill-shaped 9999px) -->
            <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
              <span style="background:rgba(170,244,87,0.2); color:#aaf457; border:1px solid #aaf457; font-size:11px; font-weight:700; font-family:'Inter',sans-serif; padding:4px 12px; border-radius:9999px;">
                Function ID: C-01
              </span>
              <span style="background:rgba(255,255,255,0.15); color:#c7c5d0; border:1px solid rgba(255,255,255,0.3); font-size:11px; font-weight:700; font-family:'Inter',sans-serif; padding:4px 12px; border-radius:9999px;">
                Roles: super_admin / operator / shop_owner
              </span>
            </div>
          </div>

          <!-- Enterprise Health Score Badge -->
          <div style="background:rgba(255,255,255,0.1); backdrop-filter:blur(12px); border:1px solid rgba(255,255,255,0.2); padding:14px 20px; border-radius:12px; display:flex; align-items:center; gap:16px; min-width:260px;">
            <div style="width:48px; height:48px; display:flex; align-items:center; justify-content:center; background:${securityScore >= 80 ? '#aaf457' : '#fff7ed'}; color:${securityScore >= 80 ? '#0F1142' : '#c2410c'}; border-radius:9999px; font-family:'Outfit',sans-serif; font-size:16px; font-weight:700;">
              ${securityScore}%
            </div>
            <div>
              <div style="font-size:11px; color:#c7c5d0; font-weight:600; text-transform:uppercase; letter-spacing:0.05em;">Security Health</div>
              <div style="font-size:14px; font-weight:700; font-family:'Outfit',sans-serif; color:#ffffff; margin-top:1px; display:flex; align-items:center; gap:6px;">
                ${securityScore >= 80 ? 'Strong Protection' : 'Action Recommended'}
              </div>
              <div style="font-size:11px; color:#c7c5d0; margin-top:2px;">
                Supabase Auth Hashed & Enforced
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    // Enterprise Tab Navigation Bar (Pill-shaped 9999px)
    const tabsBarHtml = `
      <div style="display:flex; gap:8px; background:#f3f4f5; padding:4px; border-radius:9999px; margin-bottom:24px; border:1px solid #c7c5d0; overflow-x:auto; font-family:'Inter',sans-serif;">
        <button onclick="ScreenS10.switchTab('password')" 
                style="flex:1; padding:10px 16px; border:none; border-radius:9999px; font-size:13px; font-weight:600; font-family:'Inter',sans-serif; cursor:pointer; transition:all 0.15s; display:flex; align-items:center; justify-content:center; gap:8px; ${activeTab === 'password' ? 'background:#0F1142; color:#ffffff;' : 'background:transparent; color:#46464f;'}">
          ${getIcon('key', 16)} ${I18n.t('change_password_title')}
        </button>

        <button onclick="ScreenS10.switchTab('2fa')" 
                style="flex:1; padding:10px 16px; border:none; border-radius:9999px; font-size:13px; font-weight:600; font-family:'Inter',sans-serif; cursor:pointer; transition:all 0.15s; display:flex; align-items:center; justify-content:center; gap:8px; ${activeTab === '2fa' ? 'background:#0F1142; color:#ffffff;' : 'background:transparent; color:#46464f;'}">
          ${getIcon('shield', 16)} ${I18n.t('two_factor_title')}
          ${twofaEnabled ? '<span style="width:8px; height:8px; border-radius:9999px; background:#aaf457; display:inline-block;"></span>' : '<span style="width:8px; height:8px; border-radius:9999px; background:#ba1a1a; display:inline-block;"></span>'}
        </button>

        <button onclick="ScreenS10.switchTab('sessions')" 
                style="flex:1; padding:10px 16px; border:none; border-radius:9999px; font-size:13px; font-weight:600; font-family:'Inter',sans-serif; cursor:pointer; transition:all 0.15s; display:flex; align-items:center; justify-content:center; gap:8px; ${activeTab === 'sessions' ? 'background:#0F1142; color:#ffffff;' : 'background:transparent; color:#46464f;'}">
          ${getIcon('clipboard', 16)} Sessions & Audit Log
        </button>

        <button onclick="ScreenS10.switchTab('policy')" 
                style="flex:1; padding:10px 16px; border:none; border-radius:9999px; font-size:13px; font-weight:600; font-family:'Inter',sans-serif; cursor:pointer; transition:all 0.15s; display:flex; align-items:center; justify-content:center; gap:8px; ${activeTab === 'policy' ? 'background:#0F1142; color:#ffffff;' : 'background:transparent; color:#46464f;'}">
          ${getIcon('settings', 16)} Policy Simulator
        </button>
      </div>
    `;

    // TAB 1: Password Form & Live Policy Checklist (Glassmorphism)
    const tabPasswordHtml = `
      <div style="border-radius:12px; padding:28px; border:1px solid #c7c5d0; border-top:1px solid rgba(255,255,255,0.8); border-left:1px solid rgba(255,255,255,0.8); background:rgba(255,255,255,0.8); backdrop-filter:blur(16px); box-shadow:0 2px 8px rgba(19,21,70,0.03); font-family:'Inter',sans-serif;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; border-bottom:1px solid #c7c5d0; padding-bottom:14px;">
          <div>
            <h3 style="font-size:18px; font-weight:700; font-family:'Outfit',sans-serif; color:#191c1d; margin:0; display:flex; align-items:center; gap:8px;">
              <span style="color:#0F1142; display:inline-flex;">${getIcon('key', 20)}</span>
              ${I18n.t('change_password_title')}
            </h3>
            <p style="font-size:13px; color:#46464f; margin:3px 0 0 0;">
              ${I18n.t('change_password_subtitle')}
            </p>
          </div>
          <span style="font-size:11.5px; background:#0F1142; color:#aaf457; padding:4px 12px; border-radius:9999px; font-weight:700;">
            NFR-SEC-01
          </span>
        </div>

        <div id="pwd-alert" style="display:none; font-size:13px; border-radius:8px; padding:14px 18px; margin-bottom:18px; align-items:center; gap:12px; line-height:1.4;"></div>

        <form onsubmit="ScreenS10.handlePasswordUpdate(event)">
          <div style="display:grid; grid-template-columns:1fr; gap:18px; margin-bottom:24px;">
            
            <!-- Current Password -->
            <div style="margin:0;">
              <label style="font-size:12px; font-weight:600; letter-spacing:0.05em; text-transform:uppercase; color:#46464f; display:block; margin-bottom:6px;">
                ${I18n.t('current_password')} <span style="color:#ba1a1a;">*</span>
              </label>
              <div style="position:relative;">
                <input type="${showCurrentPwd ? 'text' : 'password'}" class="form-input" id="pwd-current" required placeholder="••••••••" 
                       style="padding-right:45px; font-size:14px; height:42px; border-radius:8px; border:1px solid #c7c5d0; background:#ffffff; outline:none; width:100%; box-sizing:border-box;"
                       onfocus="this.style.borderColor='#0F1142'" onblur="this.style.borderColor='#c7c5d0'"
                       oninput="ScreenS10.validatePasswordForm(); ScreenS10.clearPwdAlert()">
                <button type="button" onclick="ScreenS10.togglePasswordVis('current')" style="position:absolute; right:10px; top:50%; transform:translateY(-50%); background:none; border:none; color:#777680; cursor:pointer; font-size:16px; padding:4px; display:inline-flex; align-items:center;">
                  ${getIcon('eye', 16)}
                </button>
              </div>
            </div>

            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:18px;" class="form-row-responsive">
              <!-- New Password -->
              <div style="margin:0;">
                <label style="font-size:12px; font-weight:600; letter-spacing:0.05em; text-transform:uppercase; color:#46464f; display:block; margin-bottom:6px;">
                  ${I18n.t('new_password')} <span style="color:#ba1a1a;">*</span>
                </label>
                <div style="position:relative;">
                  <input type="${showNewPwd ? 'text' : 'password'}" class="form-input" id="pwd-new" required placeholder="••••••••" 
                         style="padding-right:45px; font-size:14px; height:42px; border-radius:8px; border:1px solid #c7c5d0; background:#ffffff; outline:none; width:100%; box-sizing:border-box;"
                         onfocus="this.style.borderColor='#0F1142'" onblur="this.style.borderColor='#c7c5d0'"
                         oninput="ScreenS10.validatePasswordForm(); ScreenS10.clearPwdAlert()">
                  <button type="button" onclick="ScreenS10.togglePasswordVis('new')" style="position:absolute; right:10px; top:50%; transform:translateY(-50%); background:none; border:none; color:#777680; cursor:pointer; font-size:16px; padding:4px; display:inline-flex; align-items:center;">
                    ${getIcon('eye', 16)}
                  </button>
                </div>
              </div>

              <!-- Confirm Password -->
              <div style="margin:0;">
                <label style="font-size:12px; font-weight:600; letter-spacing:0.05em; text-transform:uppercase; color:#46464f; display:block; margin-bottom:6px;">
                  ${I18n.t('confirm_new_password')} <span style="color:#ba1a1a;">*</span>
                </label>
                <div style="position:relative;">
                  <input type="${showConfirmPwd ? 'text' : 'password'}" class="form-input" id="pwd-confirm" required placeholder="••••••••" 
                         style="padding-right:45px; font-size:14px; height:42px; border-radius:8px; border:1px solid #c7c5d0; background:#ffffff; outline:none; width:100%; box-sizing:border-box;"
                         onfocus="this.style.borderColor='#0F1142'" onblur="this.style.borderColor='#c7c5d0'"
                         oninput="ScreenS10.validatePasswordForm(); ScreenS10.clearPwdAlert()">
                  <button type="button" onclick="ScreenS10.togglePasswordVis('confirm')" style="position:absolute; right:10px; top:50%; transform:translateY(-50%); background:none; border:none; color:#777680; cursor:pointer; font-size:16px; padding:4px; display:inline-flex; align-items:center;">
                    ${getIcon('eye', 16)}
                  </button>
                </div>
              </div>
            </div>

          </div>

          <!-- Password Policy Real-time Checklist Grid -->
          <div style="background:#f8f9fa; border:1px solid #c7c5d0; border-radius:12px; padding:20px; margin-bottom:24px;">
            <div style="font-size:13px; font-weight:700; font-family:'Outfit',sans-serif; color:#191c1d; margin-bottom:12px; display:flex; align-items:center; justify-content:space-between;">
              <span style="display:flex; align-items:center; gap:8px;">
                ${getIcon('fileText', 16)} ${I18n.t('password_policy_title')}
              </span>
              <span id="pwd-strength-label" style="font-size:12px; font-weight:700; color:#777680; font-family:'Inter',sans-serif;">
                Strength: Empty
              </span>
            </div>

            <!-- Password Strength Bar -->
            <div style="height:6px; background:#edeeef; border-radius:3px; overflow:hidden; margin-bottom:16px;">
              <div id="pwd-strength-bar" style="height:100%; width:0%; background:#c7c5d0; transition:all 0.3s ease;"></div>
            </div>

            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:12px;">
              <div id="rule-length" style="font-size:12.5px; color:#777680; display:flex; align-items:center; gap:10px; font-weight:600;">
                <span class="rule-icon" style="width:20px; height:20px; border-radius:9999px; background:#edeeef; color:#777680; display:inline-flex; align-items:center; justify-content:center; font-size:11px; font-weight:800;">✕</span>
                ${I18n.t('password_req_length')} (>= 8)
              </div>
              <div id="rule-letters" style="font-size:12.5px; color:#777680; display:flex; align-items:center; gap:10px; font-weight:600;">
                <span class="rule-icon" style="width:20px; height:20px; border-radius:9999px; background:#edeeef; color:#777680; display:inline-flex; align-items:center; justify-content:center; font-size:11px; font-weight:800;">✕</span>
                ${I18n.t('password_req_letters')} (A-Z, a-z)
              </div>
              <div id="rule-numbers" style="font-size:12.5px; color:#777680; display:flex; align-items:center; gap:10px; font-weight:600;">
                <span class="rule-icon" style="width:20px; height:20px; border-radius:9999px; background:#edeeef; color:#777680; display:inline-flex; align-items:center; justify-content:center; font-size:11px; font-weight:800;">✕</span>
                ${I18n.t('password_req_numbers')} (0-9)
              </div>
              <div id="rule-match" style="font-size:12.5px; color:#777680; display:flex; align-items:center; gap:10px; font-weight:600;">
                <span class="rule-icon" style="width:20px; height:20px; border-radius:9999px; background:#edeeef; color:#777680; display:inline-flex; align-items:center; justify-content:center; font-size:11px; font-weight:800;">✕</span>
                ${I18n.t('password_match_status')}
              </div>
            </div>

            <div style="margin-top:16px; font-size:12px; color:#46464f; line-height:1.5; border-top:1px dashed #c7c5d0; padding-top:12px; display:flex; align-items:center; gap:8px;">
              <span style="color:#0F1142; display:inline-flex;">${getIcon('lock', 16)}</span>
              ${I18n.t('backend_hash_notice')}
            </div>
          </div>

          <div style="display:flex; justify-content:flex-end;">
            <button type="submit" id="pwd-save-btn" disabled 
                    style="padding:10px 24px; font-size:14px; font-weight:700; font-family:'Inter',sans-serif; border-radius:8px; border:none; background:#aaf457; color:#0F1142; cursor:pointer; display:inline-flex; align-items:center; gap:6px; box-shadow:0 3px 10px rgba(170,244,87,0.3);">
              ${getIcon('check', 18)} ${I18n.t('save')}
            </button>
          </div>
        </form>
      </div>
    `;

    // 2FA Setup Wizard / Deactivation Wizard HTML
    let setupWizardHtml = '';
    if (showSetupWizard) {
      setupWizardHtml = `
        <div style="background:#f8f9fa; border:1px solid #c7c5d0; border-radius:12px; padding:24px; margin-top:20px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
            <h4 style="font-size:16px; font-weight:700; font-family:'Outfit',sans-serif; color:#191c1d; margin:0; display:flex; align-items:center; gap:8px;">
              <span style="color:#0F1142; display:inline-flex;">${getIcon('shield', 20)}</span>
              Multi-Factor Authentication Setup (TOTP)
            </h4>
            <span style="font-size:12px; background:#0F1142; color:#aaf457; padding:4px 12px; border-radius:9999px; font-weight:700;">
              Step 1 of 2
            </span>
          </div>

          <p style="font-size:13.5px; color:#46464f; line-height:1.6; margin:0 0 18px 0;">
            ${I18n.t('twofa_setup_desc')}
          </p>
          
          <div id="totp-alert" style="display:none; font-size:13px; border-radius:8px; padding:12px 16px; margin-bottom:16px; align-items:center; gap:10px; line-height:1.4;"></div>

          <div style="display:flex; flex-direction:row; gap:24px; align-items:center; flex-wrap:wrap; background:#ffffff; padding:20px; border-radius:12px; border:1px solid #c7c5d0; margin-bottom:18px;">
            
            <!-- Styled SVG QR Code -->
            <div style="background:#ffffff; padding:14px; border-radius:12px; border:2px solid #0F1142; display:inline-flex; flex-direction:column; align-items:center; justify-content:center;">
              <svg width="120" height="120" viewBox="0 0 100 100" style="display:block;">
                <rect width="100" height="100" fill="white"/>
                <!-- Outer Corners -->
                <rect x="5" y="5" width="25" height="25" fill="#0F1142"/>
                <rect x="8" y="8" width="19" height="19" fill="white"/>
                <rect x="12" y="12" width="11" height="11" fill="#0F1142"/>

                <rect x="70" y="5" width="25" height="25" fill="#0F1142"/>
                <rect x="73" y="8" width="19" height="19" fill="white"/>
                <rect x="77" y="12" width="11" height="11" fill="#0F1142"/>

                <rect x="5" y="70" width="25" height="25" fill="#0F1142"/>
                <rect x="8" y="73" width="19" height="19" fill="white"/>
                <rect x="12" y="77" width="11" height="11" fill="#0F1142"/>

                <!-- QR Matrix Dots -->
                <rect x="35" y="10" width="8" height="8" fill="#0F1142"/>
                <rect x="50" y="10" width="8" height="8" fill="#0F1142"/>
                <rect x="35" y="25" width="15" height="8" fill="#0F1142"/>
                <rect x="10" y="35" width="12" height="12" fill="#0F1142"/>
                <rect x="28" y="40" width="10" height="10" fill="#0F1142"/>
                <rect x="45" y="35" width="15" height="15" fill="#0F1142"/>
                <rect x="68" y="38" width="12" height="12" fill="#0F1142"/>
                <rect x="85" y="35" width="10" height="15" fill="#0F1142"/>
                <rect x="35" y="55" width="20" height="10" fill="#0F1142"/>
                <rect x="60" y="55" width="10" height="10" fill="#0F1142"/>
                <rect x="75" y="55" width="15" height="15" fill="#0F1142"/>
                <rect x="35" y="70" width="10" height="20" fill="#0F1142"/>
                <rect x="50" y="75" width="15" height="10" fill="#0F1142"/>
                <rect x="70" y="75" width="20" height="15" fill="#0F1142"/>
              </svg>
              <span style="font-size:10px; font-weight:700; color:#46464f; margin-top:8px; letter-spacing:0.06em; font-family:'Inter',sans-serif;">SCAN IN AUTHENTICATOR</span>
            </div>

            <div style="flex:1; min-width:260px;">
              <div style="font-size:12px; color:#46464f; font-weight:600; text-transform:uppercase; letter-spacing:0.05em; margin-bottom:6px;">
                Secret Key (Manual Entry)
              </div>
              <div style="display:flex; align-items:center; gap:10px; margin-bottom:16px;">
                <code style="padding:10px 16px; background:#f8f9fa; border-radius:8px; font-size:15px; color:#0F1142; font-family:monospace; font-weight:700; border:1px solid #c7c5d0; letter-spacing:0.12em;">
                  EZBK SHP1 SECR ETM2
                </code>
                <button type="button" onclick="ScreenS10.copySecretKey('EZBKSHP1SECRETM2')" 
                        style="font-size:13px; border:1px solid #c7c5d0; background:#ffffff; color:#0F1142; font-weight:600; font-family:'Inter',sans-serif; border-radius:8px; padding:8px 14px; cursor:pointer; display:inline-flex; align-items:center; gap:4px;">
                  ${getIcon('clipboard', 14)} Copy Key
                </button>
              </div>

              <div style="margin:0;">
                <label style="font-size:12px; font-weight:600; letter-spacing:0.05em; text-transform:uppercase; color:#46464f; display:block; margin-bottom:6px;">
                  Enter 6-Digit Verification Code
                </label>
                <div style="display:flex; gap:12px; align-items:center;">
                  <input type="text" class="form-input" id="totp-code" placeholder="123456" maxlength="6" pattern="\\d{6}" 
                         style="font-size:18px; text-align:center; letter-spacing:0.25em; height:44px; width:180px; font-weight:700; border-radius:8px; border:1px solid #c7c5d0; background:#ffffff; outline:none;"
                         onfocus="this.style.borderColor='#0F1142'" onblur="this.style.borderColor='#c7c5d0'"
                         oninput="ScreenS10.validateTOTPForm(); ScreenS10.clearTOTPAlert()">
                  <button type="button" id="totp-verify-btn" disabled 
                          style="height:44px; font-size:14px; padding:0 24px; font-weight:700; font-family:'Inter',sans-serif; border-radius:8px; border:none; background:#aaf457; color:#0F1142; cursor:pointer; display:inline-flex; align-items:center; gap:6px; box-shadow:0 3px 10px rgba(170,244,87,0.3);"
                          onclick="ScreenS10.verify2FAActivation()">
                    ${getIcon('check', 18)} ${I18n.t('confirm')}
                  </button>
                </div>
                <p style="font-size:12px; color:#777680; margin:6px 0 0 0;">
                  Test Code: <code style="font-weight:700; color:#0F1142;">123456</code>
                </p>
              </div>
            </div>

          </div>

          <div style="display:flex; justify-content:flex-end;">
            <button style="font-size:13px; font-weight:600; font-family:'Inter',sans-serif; color:#46464f; border:none; background:none; cursor:pointer;" onclick="ScreenS10.cancel2FAWizard()">
              Cancel Setup
            </button>
          </div>
        </div>
      `;
    } else if (showDeactivateWizard) {
      setupWizardHtml = `
        <div style="background:#ffdad6; border:1px solid #fca5a5; border-radius:12px; padding:24px; margin-top:20px;">
          <h4 style="font-size:16px; font-weight:700; font-family:'Outfit',sans-serif; color:#93000a; margin:0 0 8px 0; display:flex; align-items:center; gap:8px;">
            ${getIcon('lock', 20)} Disable Two-Step Verification
          </h4>
          <p style="font-size:13.5px; color:#93000a; line-height:1.6; margin:0 0 16px 0;">
            Security verification required: Enter the current 6-digit TOTP code from your authenticator app to disable 2FA protection.
          </p>
          
          <div id="totp-deact-alert" style="display:none; font-size:13px; border-radius:8px; padding:12px 16px; margin-bottom:14px; align-items:center; gap:10px; line-height:1.4;"></div>

          <div style="display:flex; gap:12px; align-items:center; margin-bottom:14px; max-width:380px;">
            <input type="text" class="form-input" id="totp-deact-code" placeholder="123456" maxlength="6" pattern="\\d{6}" 
                   style="font-size:18px; text-align:center; letter-spacing:0.25em; height:44px; width:180px; font-weight:700; border-radius:8px; border:1px solid #c7c5d0; background:#ffffff; outline:none;" 
                   onfocus="this.style.borderColor='#ba1a1a'" onblur="this.style.borderColor='#c7c5d0'"
                   oninput="ScreenS10.validateDeactForm(); ScreenS10.clearDeactAlert()">
            <button type="button" id="totp-deact-btn" disabled 
                    style="height:44px; font-size:14px; padding:0 24px; background:#ba1a1a; color:#ffffff; border:none; font-weight:700; font-family:'Inter',sans-serif; border-radius:8px; cursor:pointer;" 
                    onclick="ScreenS10.confirm2FADeactivation()">
              Confirm Deactivate
            </button>
          </div>

          <div style="display:flex; justify-content:flex-end;">
            <button style="font-size:13px; font-weight:600; font-family:'Inter',sans-serif; color:#46464f; border:none; background:none; cursor:pointer;" onclick="ScreenS10.cancel2FAWizard()">
              Cancel
            </button>
          </div>
        </div>
      `;
    }

    // TAB 2: Two-factor Authentication Section Card (Glassmorphism)
    const tab2FAHtml = `
      <div style="border-radius:12px; padding:28px; border:1px solid #c7c5d0; border-top:1px solid rgba(255,255,255,0.8); border-left:1px solid rgba(255,255,255,0.8); background:rgba(255,255,255,0.8); backdrop-filter:blur(16px); box-shadow:0 2px 8px rgba(19,21,70,0.03); font-family:'Inter',sans-serif;">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:18px; flex-wrap:wrap; gap:14px;">
          <div>
            <h3 style="font-size:18px; font-weight:700; font-family:'Outfit',sans-serif; color:#191c1d; margin:0 0 4px 0; display:flex; align-items:center; gap:8px;">
              <span style="color:#0F1142; display:inline-flex;">${getIcon('shield', 20)}</span>
              ${I18n.t('two_factor_title')}
            </h3>
            <p style="font-size:13.5px; color:#46464f; margin:0; max-width:580px; line-height:1.6;">
              ${I18n.t('two_factor_desc')}
            </p>
          </div>
          <span style="font-size:12px; font-weight:700; padding:6px 16px; border-radius:9999px; display:inline-flex; align-items:center; gap:6px; ${twofaEnabled ? 'background:#dcfce7; color:#15803d; border:1px solid #86efac;' : 'background:#ffdad6; color:#93000a; border:1px solid #fca5a5;'}">
            ${twofaEnabled ? getIcon('check', 14) + ' 2FA Active & Enforced' : getIcon('x', 14) + ' 2FA Inactive'}
          </span>
        </div>

        <!-- Phase 1 vs Phase 2 Policy Card -->
        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:14px; margin-bottom:20px;" class="form-row-responsive">
          <div style="background:#f8f9fa; border:1px solid #c7c5d0; border-radius:12px; padding:16px;">
            <div style="font-size:13px; font-weight:700; font-family:'Outfit',sans-serif; color:#191c1d; margin-bottom:6px; display:flex; align-items:center; gap:6px;">
              Phase 1 (စတင်မည့်ကာလ)
            </div>
            <div style="font-size:12.5px; color:#46464f; line-height:1.5;">
              ${I18n.t('phase1_policy_desc')}
            </div>
          </div>

          <div style="background:${isPhase2 ? '#fff7ed' : '#f8f9fa'}; border:1px solid ${isPhase2 ? '#fed7aa' : '#c7c5d0'}; border-radius:12px; padding:16px;">
            <div style="font-size:13px; font-weight:700; font-family:'Outfit',sans-serif; color:${isPhase2 ? '#c2410c' : '#191c1d'}; margin-bottom:6px; display:flex; align-items:center; gap:6px;">
              Phase 2 (ကြီးထွားလာသည့်ကာလ)
            </div>
            <div style="font-size:12.5px; color:${isPhase2 ? '#c2410c' : '#46464f'}; line-height:1.5;">
              ${I18n.t('phase2_policy_desc')}
            </div>
          </div>
        </div>

        ${setupWizardHtml}

        ${(!showSetupWizard && !showDeactivateWizard) ? `
          <div style="display:flex; justify-content:flex-end; margin-top:14px;">
            <button style="padding:10px 24px; font-size:14px; font-weight:700; font-family:'Inter',sans-serif; border-radius:8px; ${twofaEnabled ? 'background:#ffffff; color:#46464f; border:1px solid #c7c5d0;' : 'background:#aaf457; color:#0F1142; border:none; box-shadow:0 3px 10px rgba(170,244,87,0.3);'} cursor:pointer; display:inline-flex; align-items:center; gap:6px;"
                    onclick="ScreenS10.trigger2FAWizard()">
              ${twofaEnabled ? getIcon('lock', 16) + ' Deactivate 2FA' : getIcon('shield', 16) + ' ' + I18n.t('enable_2fa')}
            </button>
          </div>
        ` : ''}

        ${(twofaEnabled) ? `
          <div style="background:#dcfce7; border:1px solid #86efac; border-radius:12px; padding:20px; margin-top:20px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
              <div style="font-size:14px; font-weight:700; font-family:'Outfit',sans-serif; color:#15803d; display:flex; align-items:center; gap:8px;">
                ${getIcon('shield', 18)} ${I18n.t('backup_codes_title')}
              </div>
              <span style="font-size:11.5px; background:#ffffff; color:#15803d; font-weight:700; padding:4px 10px; border-radius:9999px; border:1px solid #86efac;">
                8 Single-Use Codes Ready
              </span>
            </div>
            <p style="font-size:13px; color:#15803d; margin:0 0 14px 0; line-height:1.5;">
              ${I18n.t('backup_codes_desc')}
            </p>

            <div style="display:grid; grid-template-columns: repeat(4, 1fr); gap:10px; margin-bottom:16px; background:#ffffff; padding:14px; border-radius:8px; border:1px solid #86efac;">
              ${RECOVERY_CODES.map(c => `
                <div style="font-family:monospace; font-size:14px; font-weight:700; color:#191c1d; text-align:center; background:#f8f9fa; padding:8px; border-radius:6px; border:1px solid #c7c5d0; letter-spacing:0.05em;">
                  ${c}
                </div>
              `).join('')}
            </div>

            <div style="display:flex; gap:12px; flex-wrap:wrap;">
              <button style="font-size:13px; font-weight:600; font-family:'Inter',sans-serif; background:#ffffff; border:1px solid #86efac; color:#15803d; border-radius:8px; padding:8px 16px; cursor:pointer; display:inline-flex; align-items:center; gap:6px;" onclick="ScreenS10.copyBackupCodes()">
                ${getIcon('clipboard', 14)} ${I18n.t('copy_backup_codes')}
              </button>
              <button style="font-size:13px; font-weight:600; font-family:'Inter',sans-serif; background:#ffffff; border:1px solid #86efac; color:#15803d; border-radius:8px; padding:8px 16px; cursor:pointer; display:inline-flex; align-items:center; gap:6px;" onclick="ScreenS10.downloadBackupCodes()">
                ${getIcon('download', 14)} ${I18n.t('download_backup_codes')}
              </button>
            </div>
          </div>
        ` : ''}
      </div>
    `;

    // TAB 3: Active Sessions & Enterprise Audit Log Table (Glassmorphism)
    const tabSessionsHtml = `
      <div style="border-radius:12px; padding:28px; border:1px solid #c7c5d0; border-top:1px solid rgba(255,255,255,0.8); border-left:1px solid rgba(255,255,255,0.8); background:rgba(255,255,255,0.8); backdrop-filter:blur(16px); box-shadow:0 2px 8px rgba(19,21,70,0.03); font-family:'Inter',sans-serif; margin-bottom:24px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:18px; border-bottom:1px solid #c7c5d0; padding-bottom:14px;">
          <div>
            <h3 style="font-size:18px; font-weight:700; font-family:'Outfit',sans-serif; color:#191c1d; margin:0; display:flex; align-items:center; gap:8px;">
              <span style="color:#0F1142; display:inline-flex;">${getIcon('clipboard', 20)}</span>
              ${I18n.t('active_sessions_title')}
            </h3>
            <p style="font-size:13px; color:#46464f; margin:3px 0 0 0;">
              Active logged-in devices and real-time security audit trails
            </p>
          </div>
          <button style="font-size:13px; font-weight:600; font-family:'Inter',sans-serif; color:#93000a; background:#ffdad6; border:1px solid #fca5a5; border-radius:8px; padding:8px 16px; cursor:pointer; display:inline-flex; align-items:center; gap:6px;" onclick="ScreenS10.revokeOtherSessions()">
            ${getIcon('x', 14)} ${I18n.t('revoke_other_sessions')}
          </button>
        </div>

        <!-- Devices List -->
        <div style="display:flex; flex-direction:column; gap:14px; margin-bottom:28px;">
          
          <div style="display:flex; justify-content:space-between; align-items:center; padding:14px 18px; background:#f8f9fa; border:1px solid #c7c5d0; border-radius:8px;">
            <div style="display:flex; align-items:center; gap:14px;">
              <span style="color:#0F1142; display:inline-flex;">${getIcon('globe', 24)}</span>
              <div>
                <div style="font-size:14px; font-weight:700; font-family:'Outfit',sans-serif; color:#191c1d; display:flex; align-items:center; gap:10px;">
                  Windows PC (Chrome 126.0)
                  <span style="background:#dcfce7; color:#15803d; border:1px solid #86efac; font-size:11px; font-weight:700; font-family:'Inter',sans-serif; padding:2px 10px; border-radius:9999px;">
                    Current Device
                  </span>
                </div>
                <div style="font-size:12px; color:#777680; margin-top:3px; font-family:'Inter',sans-serif;">
                  📍 Yangon, Myanmar • IP: 103.115.21.4 • Active Session Token
                </div>
              </div>
            </div>
            <span style="font-size:12px; color:#15803d; font-weight:700; font-family:'Inter',sans-serif;">Online</span>
          </div>

          <div style="display:flex; justify-content:space-between; align-items:center; padding:14px 18px; background:#ffffff; border:1px solid #c7c5d0; border-radius:8px;">
            <div style="display:flex; align-items:center; gap:14px;">
              <span style="color:#0F1142; display:inline-flex;">${getIcon('phone', 24)}</span>
              <div>
                <div style="font-size:14px; font-weight:700; font-family:'Outfit',sans-serif; color:#191c1d;">
                  iPhone 15 Pro (Safari Mobile)
                </div>
                <div style="font-size:12px; color:#777680; margin-top:3px; font-family:'Inter',sans-serif;">
                  📍 Mandalay, Myanmar • IP: 180.211.89.12 • 2 hours ago
                </div>
              </div>
            </div>
            <button style="font-size:12px; color:#ba1a1a; font-weight:600; font-family:'Inter',sans-serif; border:none; background:none; cursor:pointer;" onclick="showToast('info', 'Session Logged Out', 'Revoked iPhone session successfully.')">
              Revoke Session
            </button>
          </div>

        </div>

        <!-- Audit Log Table -->
        <h4 style="font-size:15px; font-weight:700; font-family:'Outfit',sans-serif; color:#191c1d; margin:0 0 12px 0; display:flex; align-items:center; gap:8px;">
          ${getIcon('clipboard', 18)} Security Audit History Log
        </h4>
        <div style="overflow-x:auto; border:1px solid #c7c5d0; border-radius:8px;">
          <table style="width:100%; border-collapse:collapse; text-align:left; font-size:13px;">
            <thead>
              <tr style="background:#f8f9fa; border-bottom:1px solid #c7c5d0; color:#46464f; font-weight:600; font-size:12px; text-transform:uppercase; letter-spacing:0.05em;">
                <th style="padding:12px 14px;">Log ID</th>
                <th style="padding:12px 14px;">Event Action</th>
                <th style="padding:12px 14px;">Category</th>
                <th style="padding:12px 14px;">IP / Location</th>
                <th style="padding:12px 14px;">Timestamp</th>
                <th style="padding:12px 14px; text-align:right;">Status</th>
              </tr>
            </thead>
            <tbody>
              ${AUDIT_LOGS.map(log => `
                <tr style="border-bottom:1px solid #edeeef;">
                  <td style="padding:12px 14px; font-family:monospace; font-weight:700; color:#0F1142;">${log.id}</td>
                  <td style="padding:12px 14px; font-weight:700; font-family:'Outfit',sans-serif; color:#191c1d;">${log.event}</td>
                  <td style="padding:12px 14px;">
                    <span style="background:#f8f9fa; color:#46464f; border:1px solid #c7c5d0; font-size:11px; font-weight:600; padding:2px 8px; border-radius:9999px;">
                      ${log.category}
                    </span>
                  </td>
                  <td style="padding:12px 14px; color:#46464f;">${log.ip} (${log.location})</td>
                  <td style="padding:12px 14px; color:#777680;">${log.time}</td>
                  <td style="padding:12px 14px; text-align:right;">
                    <span style="font-size:11px; font-weight:700; padding:3px 10px; border-radius:9999px; ${log.status === 'Success' ? 'background:#dcfce7; color:#15803d; border:1px solid #86efac;' : 'background:#ffdad6; color:#93000a; border:1px solid #fca5a5;'}">
                      ${log.status}
                    </span>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;

    // TAB 4: Security Policy Simulator (Phase 1 vs Phase 2)
    const tabPolicyHtml = `
      <div style="border-radius:12px; padding:28px; border:1px solid #c7c5d0; border-top:1px solid rgba(255,255,255,0.8); border-left:1px solid rgba(255,255,255,0.8); background:rgba(255,255,255,0.8); backdrop-filter:blur(16px); box-shadow:0 2px 8px rgba(19,21,70,0.03); font-family:'Inter',sans-serif;">
        <div style="font-weight:700; font-size:18px; font-family:'Outfit',sans-serif; color:#191c1d; margin-bottom:8px; display:flex; align-items:center; gap:8px;">
          <span style="color:#0F1142; display:inline-flex;">${getIcon('settings', 20)}</span>
          ${I18n.t('security_sandbox_title')}
        </div>
        <p style="font-size:13.5px; color:#46464f; margin-top:0; margin-bottom:18px; line-height:1.6;">
          ${I18n.t('security_sandbox_desc')}
        </p>

        <div style="background:#f8f9fa; border:1px solid #c7c5d0; border-radius:8px; padding:20px; margin-bottom:18px;">
          <div style="margin-bottom:0; max-width:480px;">
            <label style="font-size:12px; font-weight:600; letter-spacing:0.05em; text-transform:uppercase; color:#46464f; display:block; margin-bottom:8px;">
              Active System Deployment Phase
            </label>
            <select class="form-input" id="sim-security-phase" onchange="ScreenS10.changeSecurityPhase(this.value)" 
                    style="font-size:14px; font-family:'Inter',sans-serif; height:42px; padding:8px 14px; cursor:pointer; border-radius:8px; border:1px solid #c7c5d0; background:#ffffff; font-weight:600; outline:none;">
              <option value="1" ${!isPhase2 ? 'selected' : ''}>${I18n.t('security_phase1_opt')}</option>
              <option value="2" ${isPhase2 ? 'selected' : ''}>${I18n.t('security_phase2_opt')}</option>
            </select>
          </div>
        </div>

        <div style="font-size:12.5px; color:#0F1142; line-height:1.5; background:#e0e7ff; border:1px solid #c7d2fe; padding:12px 16px; border-radius:8px; font-weight:600; display:flex; align-items:center; gap:8px;">
          <span style="display:inline-flex;">${getIcon('info', 16)}</span>
          Tip: Selecting Phase 2 will simulate system mandatory 2FA enforcement for all shop managers (shop_owner).
        </div>
      </div>
    `;

    // Dynamic Tab Selection Content
    let activeTabContent = tabPasswordHtml;
    if (activeTab === '2fa') activeTabContent = tab2FAHtml;
    if (activeTab === 'sessions') activeTabContent = tabSessionsHtml;
    if (activeTab === 'policy') activeTabContent = tabPolicyHtml;

    const content = `
      ${headerHtml}
      <div style="max-width:880px; margin:0 auto; font-family:'Inter',sans-serif;">
        ${tabsBarHtml}
        ${activeTabContent}
      </div>
    `;

    App.renderAdminPage(Router.getPortal(), I18n.t('sidebar_security'), content);
    
    // Sync initial policy validation state
    setTimeout(() => {
      validatePasswordForm();
      validateTOTPForm();
      validateDeactForm();
    }, 50);
  }

  function switchTab(tabName) {
    activeTab = tabName;
    render();
  }

  function togglePasswordVis(type) {
    if (type === 'current') showCurrentPwd = !showCurrentPwd;
    if (type === 'new') showNewPwd = !showNewPwd;
    if (type === 'confirm') showConfirmPwd = !showConfirmPwd;
    render();
  }

  function validatePasswordForm() {
    const curEl = document.getElementById('pwd-current');
    const newEl = document.getElementById('pwd-new');
    const confEl = document.getElementById('pwd-confirm');
    const saveBtn = document.getElementById('pwd-save-btn');
    const strengthBar = document.getElementById('pwd-strength-bar');
    const strengthLabel = document.getElementById('pwd-strength-label');

    if (!curEl || !newEl || !confEl || !saveBtn) return;

    const curVal = curEl.value.trim();
    const newVal = newEl.value;
    const confVal = confEl.value;

    const hasMinLen = newVal.length >= 8;
    const hasLetters = /[A-Za-z]/.test(newVal);
    const hasNumbers = /\d/.test(newVal);
    const hasMatch = newVal.length > 0 && newVal === confVal;

    // Update Strength Meter
    let score = 0;
    if (newVal.length >= 8) score += 25;
    if (newVal.length >= 12) score += 15;
    if (/[A-Z]/.test(newVal) && /[a-z]/.test(newVal)) score += 20;
    if (/\d/.test(newVal)) score += 20;
    if (/[^A-Za-z0-9]/.test(newVal)) score += 20;

    if (strengthBar && strengthLabel) {
      if (newVal.length === 0) {
        strengthBar.style.width = '0%';
        strengthBar.style.background = '#c7c5d0';
        strengthLabel.textContent = 'Strength: Empty';
        strengthLabel.style.color = '#777680';
      } else if (score < 40) {
        strengthBar.style.width = '25%';
        strengthBar.style.background = '#ba1a1a';
        strengthLabel.textContent = 'Strength: Weak';
        strengthLabel.style.color = '#ba1a1a';
      } else if (score < 70) {
        strengthBar.style.width = '60%';
        strengthBar.style.background = '#c2410c';
        strengthLabel.textContent = 'Strength: Medium';
        strengthLabel.style.color = '#c2410c';
      } else {
        strengthBar.style.width = '100%';
        strengthBar.style.background = '#15803d';
        strengthLabel.textContent = 'Strength: Strong Enterprise Grade';
        strengthLabel.style.color = '#15803d';
      }
    }

    // Update live checklist styling
    updateRuleBadge('rule-length', hasMinLen);
    updateRuleBadge('rule-letters', hasLetters);
    updateRuleBadge('rule-numbers', hasNumbers);
    updateRuleBadge('rule-match', hasMatch);

    const isAllValid = curVal.length > 0 && hasMinLen && hasLetters && hasNumbers && hasMatch;
    saveBtn.disabled = !isAllValid;
  }

  function updateRuleBadge(id, isValid) {
    const el = document.getElementById(id);
    if (!el) return;
    const icon = el.querySelector('.rule-icon');

    if (isValid) {
      el.style.color = '#15803d';
      if (icon) {
        icon.style.background = '#aaf457';
        icon.style.color = '#0F1142';
        icon.textContent = '✓';
      }
    } else {
      el.style.color = '#777680';
      if (icon) {
        icon.style.background = '#edeeef';
        icon.style.color = '#777680';
        icon.textContent = '✕';
      }
    }
  }

  function clearPwdAlert() {
    const banner = document.getElementById('pwd-alert');
    if (banner) banner.style.display = 'none';
  }

  function handlePasswordUpdate(e) {
    e.preventDefault();
    clearPwdAlert();

    const cur = document.getElementById('pwd-current').value;
    const pwd = document.getElementById('pwd-new').value;
    const conf = document.getElementById('pwd-confirm').value;

    const banner = document.getElementById('pwd-alert');

    if (cur !== 'password123' && cur !== 'admin123') {
      showToast('error', 'Authentication Failure', 'Current password incorrect. (Demo: password123)');
      if (banner) {
        banner.style.display = 'flex';
        banner.style.background = '#ffdad6';
        banner.style.border = '1px solid #fca5a5';
        banner.style.color = '#93000a';
        banner.innerHTML = `${I18n.t('auth_invalid_credentials')}`;
      }
      return;
    }

    if (pwd !== conf) {
      showToast('error', 'Validation Error', 'New passwords do not match.');
      if (banner) {
        banner.style.display = 'flex';
        banner.style.background = '#ffdad6';
        banner.style.border = '1px solid #fca5a5';
        banner.style.color = '#93000a';
        banner.innerHTML = `${I18n.t('passwords_not_match')}`;
      }
      return;
    }

    // Success Password Update
    showToast('success', 'Security Settings', 'Password updated successfully via Supabase Auth. Session token renewed!');
    document.getElementById('pwd-current').value = '';
    document.getElementById('pwd-new').value = '';
    document.getElementById('pwd-confirm').value = '';
    validatePasswordForm();
  }

  function trigger2FAWizard() {
    if (twofaEnabled) {
      showDeactivateWizard = true;
      showSetupWizard = false;
    } else {
      showSetupWizard = true;
      showDeactivateWizard = false;
    }
    render();
  }

  function cancel2FAWizard() {
    showSetupWizard = false;
    showDeactivateWizard = false;
    render();
  }

  function validateTOTPForm() {
    const codeEl = document.getElementById('totp-code');
    const verifyBtn = document.getElementById('totp-verify-btn');
    if (!codeEl || !verifyBtn) return;
    verifyBtn.disabled = !(codeEl.value.trim().length === 6 && /^\d+$/.test(codeEl.value));
  }

  function clearTOTPAlert() {
    const alertEl = document.getElementById('totp-alert');
    if (alertEl) alertEl.style.display = 'none';
  }

  function copySecretKey(key) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(key);
      showToast('success', 'Copied', 'Secret Key copied to clipboard!');
    }
  }

  function verify2FAActivation() {
    clearTOTPAlert();
    const code = document.getElementById('totp-code').value.trim();
    const alertEl = document.getElementById('totp-alert');

    if (code !== '123456') {
      showToast('error', 'Verification Failed', 'Invalid TOTP code token.');
      if (alertEl) {
        alertEl.style.display = 'flex';
        alertEl.style.background = '#ffdad6';
        alertEl.style.border = '1px solid #fca5a5';
        alertEl.style.color = '#93000a';
        alertEl.innerHTML = `${I18n.t('twofa_code_invalid')}`;
      }
      return;
    }

    // Success Activation
    twofaEnabled = true;
    localStorage.setItem('s10_2fa_enabled', 'true');
    showSetupWizard = false;
    showToast('success', 'Security Settings', 'Two-step verification (TOTP) activated! Enterprise protection enforced.');
    render();
  }

  function validateDeactForm() {
    const codeEl = document.getElementById('totp-deact-code');
    const deactBtn = document.getElementById('totp-deact-btn');
    if (!codeEl || !deactBtn) return;
    deactBtn.disabled = !(codeEl.value.trim().length === 6 && /^\d+$/.test(codeEl.value));
  }

  function clearDeactAlert() {
    const alertEl = document.getElementById('totp-deact-alert');
    if (alertEl) alertEl.style.display = 'none';
  }

  function confirm2FADeactivation() {
    clearDeactAlert();
    const code = document.getElementById('totp-deact-code').value.trim();
    const alertEl = document.getElementById('totp-deact-alert');

    if (code !== '123456') {
      showToast('error', 'Deactivation Failed', 'Invalid authentication code.');
      if (alertEl) {
        alertEl.style.display = 'flex';
        alertEl.style.background = '#ffdad6';
        alertEl.style.border = '1px solid #fca5a5';
        alertEl.style.color = '#93000a';
        alertEl.innerHTML = `${I18n.t('twofa_code_invalid')}`;
      }
      return;
    }

    // Success Deactivation
    twofaEnabled = false;
    localStorage.setItem('s10_2fa_enabled', 'false');
    showDeactivateWizard = false;
    showToast('success', 'Security Settings', 'Two-step verification deactivated.');
    render();
  }

  function copyBackupCodes() {
    const text = RECOVERY_CODES.join('\n');
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      showToast('success', 'Copied', '8 Recovery Codes copied to clipboard!');
    }
  }

  function downloadBackupCodes() {
    const text = `EzBookNow Account Recovery Codes\nGenerated: ${new Date().toISOString()}\n\n` + RECOVERY_CODES.join('\n');
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ezbooknow_recovery_codes.txt';
    a.click();
    URL.revokeObjectURL(url);
    showToast('success', 'Downloaded', 'ezbooknow_recovery_codes.txt saved.');
  }

  function revokeOtherSessions() {
    if (confirm('Are you sure you want to log out all other active devices?')) {
      showToast('success', 'Sessions Revoked', 'All other active device sessions have been logged out.');
      render();
    }
  }

  function changeSecurityPhase(val) {
    isPhase2 = val === '2';
    localStorage.setItem('s10_phase', val);
    
    showToast('info', 'Simulator Phase Settings', 
      val === '2' 
        ? 'Security phase updated: Phase 2 Mandatory 2FA active for shop managers.' 
        : 'Security phase updated: Phase 1 Optional 2FA active.'
    );
    render();
  }

  return { 
    render, 
    switchTab,
    togglePasswordVis,
    validatePasswordForm, 
    clearPwdAlert, 
    handlePasswordUpdate, 
    trigger2FAWizard, 
    cancel2FAWizard,
    validateTOTPForm,
    clearTOTPAlert,
    copySecretKey,
    verify2FAActivation,
    validateDeactForm,
    clearDeactAlert,
    confirm2FADeactivation,
    copyBackupCodes,
    downloadBackupCodes,
    revokeOtherSessions,
    changeSecurityPhase 
  };
})();
