/* ============================================================
   EzBookNow Screen S-11 — Shop Portal Login Screen (Enterprise UI)
   ============================================================ */

const ScreenS11 = (() => {
  let passwordVisible = false;

  // Local authentication sandbox state
  let loginFailCount = 0;
  let isLockedOut = false;
  try {
    loginFailCount = parseInt(localStorage.getItem('s11_login_fail_count') || '0', 10);
    isLockedOut = localStorage.getItem('s11_locked_out') === 'true';
  } catch (e) {}

  function render() {
    const isPhase2 = localStorage.getItem('s10_phase') === '2';
    const twofaEnabled = localStorage.getItem('s10_2fa_enabled') === 'true';
    const lang = I18n.getLang();

    // Check brute force lockout warning
    let lockoutWarningHtml = '';
    if (isLockedOut) {
      lockoutWarningHtml = `
        <div style="background:#fef2f2; border:1.5px solid #fca5a5; border-radius:12px; padding:14px 16px; margin-bottom:18px; display:flex; align-items:flex-start; gap:12px; font-size:12.5px; line-height:1.4;">
          <span style="font-size:20px; line-height:1;">⚠️</span>
          <div style="color:#991b1b; font-weight:600;">
            ${I18n.t('auth_account_locked_warning')}
          </div>
        </div>
      `;
    }

    // Alphanumeric Password pattern warning
    const passwordWarning = lang === 'mm' 
      ? 'စကားဝှက်သည် အနည်းဆုံး ၈ လုံးရှိရမည်ဖြစ်ပြီး အင်္ဂလိပ်စာလုံးနှင့် ကိန်းဂဏန်းများ ပါဝင်ရမည်။' 
      : 'Password must be at least 8 characters and contain both letters and numbers.';

    // Check if 2FA code field is required (Phase 2 or 2FA Active)
    const show2FAField = isPhase2 || twofaEnabled;
    const twofaFieldHtml = show2FAField ? `
      <div class="form-group" style="margin-bottom:18px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
          <label class="form-label" style="font-size:13px; font-weight:700; color:#1e293b; margin:0;">
            ${I18n.t('twofa_code_label')} <span style="color:#ef4444;">*</span>
          </label>
          <span style="font-size:10.5px; background:#e0e7ff; color:#3730a3; font-weight:700; padding:2px 8px; border-radius:10px;">
            ${isPhase2 ? 'Phase 2 Mandatory' : '2FA Active'}
          </span>
        </div>
        <div style="position:relative;">
          <span style="position:absolute; left:12px; top:50%; transform:translateY(-50%); font-size:16px;">🔑</span>
          <input type="text" class="form-input" id="shop-2fa-code" placeholder="${I18n.t('totp_code_placeholder')}" 
                 required maxlength="6" pattern="\\d{6}" 
                 style="padding-left:40px; font-size:16px; font-weight:700; letter-spacing:0.2em; height:44px; border-radius:10px;" 
                 oninput="ScreenS11.validateForm(); ScreenS11.clearAlertBanner()">
        </div>
        <p style="font-size:11px; color:#64748b; margin:4px 0 0 0;">
          💡 Test Code: <code style="font-weight:700; color:#4f46e5;">123456</code>
        </p>
      </div>
    ` : '';

    // Tenant Branding Header Card (Shop Context Auto-Display)
    const tenantContextHtml = `
      <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); color:white; border-radius:14px; padding:16px 20px; margin-bottom:20px; display:flex; align-items:center; gap:14px; box-shadow:0 8px 20px rgba(15,23,42,0.15);">
        <div style="width:46px; height:46px; border-radius:12px; background:#4f46e5; display:flex; align-items:center; justify-content:center; font-size:24px; box-shadow:0 4px 10px rgba(0,0,0,0.2);">
          👨‍🍳
        </div>
        <div style="flex:1;">
          <div style="font-size:15px; font-weight:800; color:white; display:flex; align-items:center; gap:8px;">
            Yangon Garden Bistro
            <span style="background:rgba(16, 185, 129, 0.2); color:#6ee7b7; border:1px solid rgba(110, 231, 183, 0.3); font-size:10px; font-weight:700; padding:2px 8px; border-radius:10px;">
              Verified Shop
            </span>
          </div>
          <div style="font-size:11.5px; color:#94a3b8; margin-top:2px;">
            🌐 ezbooknow.com/shop/yangon-bistro/login
          </div>
        </div>
      </div>
    `;

    const loginForm = `
      ${lockoutWarningHtml}
      <div id="login-alert-banner" style="display:none; font-size:12.5px; border-radius:10px; padding:12px 16px; margin-bottom:18px; align-items:center; gap:10px; line-height:1.4;"></div>

      <form onsubmit="ScreenS11.handleLogin(event)">
        
        <!-- Email Input -->
        <div class="form-group" style="margin-bottom:18px;">
          <label class="form-label" style="font-size:13px; font-weight:700; color:#1e293b; display:block; margin-bottom:6px;">
            ${I18n.t('email_address')} <span style="color:#ef4444;">*</span>
          </label>
          <div style="position:relative;">
            <span style="position:absolute; left:12px; top:50%; transform:translateY(-50%); font-size:16px;">✉️</span>
            <input type="email" class="form-input" id="shop-email" placeholder="chef@restaurant.com" required 
                   value="chef@glasspavilion.com" 
                   style="padding-left:40px; font-size:14px; height:44px; border-radius:10px;" 
                   oninput="ScreenS11.validateForm(); ScreenS11.clearAlertBanner()">
          </div>
        </div>

        <!-- Password Input -->
        <div class="form-group" style="margin-bottom:18px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
            <label class="form-label" style="font-size:13px; font-weight:700; color:#1e293b; margin:0;">
              ${I18n.t('password_label')} <span style="color:#ef4444;">*</span>
            </label>
            <a style="font-size:12px; font-weight:700; color:#4f46e5; cursor:pointer; text-decoration:none;" 
               onclick="ScreenS11.openForgotPasswordModal()">
              ${I18n.t('forgot_password')}
            </a>
          </div>
          <div style="position:relative;">
            <span style="position:absolute; left:12px; top:50%; transform:translateY(-50%); font-size:16px;">🔒</span>
            <input type="${passwordVisible ? 'text' : 'password'}" class="form-input" id="shop-password" 
                   placeholder="••••••••" required value="chef123a" 
                   pattern="^(?=.*[A-Za-z])(?=.*\\d).{8,}$" 
                   style="padding-left:40px; padding-right:45px; font-size:14px; height:44px; border-radius:10px;" 
                   oninput="this.setCustomValidity(this.validity.patternMismatch ? '${passwordWarning}' : ''); ScreenS11.validateForm(); ScreenS11.clearAlertBanner()">
            <button type="button" onclick="ScreenS11.togglePassword()" 
                    style="position:absolute; right:10px; top:50%; transform:translateY(-50%); background:none; border:none; color:#64748b; cursor:pointer; font-size:18px; padding:4px;">
              ${passwordVisible ? '👁️' : '🙈'}
            </button>
          </div>
        </div>

        ${twofaFieldHtml}

        <!-- Remember Me Checkbox -->
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
          <label style="display:flex; align-items:center; gap:8px; cursor:pointer; font-size:12.5px; font-weight:600; color:#475569;">
            <input type="checkbox" id="remember-me" checked style="width:16px; height:16px; cursor:pointer;">
            <span>${I18n.t('remember_me')}</span>
          </label>
        </div>

        <button type="submit" class="btn btn-primary btn-block" id="shop-login-btn" disabled 
                style="height:46px; font-size:14.5px; font-weight:700; border-radius:10px; box-shadow:0 4px 14px rgba(79,70,229,0.25);">
          🔑 ${I18n.t('login_button')}
        </button>
      </form>
    `;

    // Developer / Reviewer Auth Sandbox Panel
    const selectedMode = localStorage.getItem('s11_sandbox_mode') || 'success';
    const sandboxHtml = `
      <div style="margin-top:24px; padding:16px; border:1px solid #e2e8f0; border-radius:12px; background:#f8fafc;">
        <div style="font-weight:700; font-size:13px; color:#0f172a; margin-bottom:8px; display:flex; align-items:center; gap:6px;">
          🛠️ ${I18n.t('auth_sandbox_label')}
        </div>
        <p style="font-size:11.5px; color:#64748b; margin-top:0; margin-bottom:12px; line-height:1.4;">
          ${I18n.t('auth_sandbox_desc')}
        </p>
        <div style="display:flex; flex-direction:column; gap:10px;">
          <div class="form-group" style="margin-bottom:0;">
            <select class="form-input" id="sandbox-login-mode" onchange="ScreenS11.setSandboxMode(this.value)" 
                    style="font-size:12px; height:36px; padding:6px 12px; cursor:pointer; border-radius:8px; font-weight:600;">
              <option value="success" ${selectedMode === 'success' ? 'selected' : ''}>${I18n.t('auth_sandbox_success')}</option>
              <option value="401" ${selectedMode === '401' ? 'selected' : ''}>${I18n.t('auth_sandbox_401')}</option>
              <option value="429" ${selectedMode === '429' ? 'selected' : ''}>${I18n.t('auth_sandbox_429')}</option>
              <option value="suspended" ${selectedMode === 'suspended' ? 'selected' : ''}>${I18n.t('auth_sandbox_suspended')}</option>
              <option value="not_approved" ${selectedMode === 'not_approved' ? 'selected' : ''}>Shop Pending Approval</option>
            </select>
          </div>
          <div style="font-size:11px; color:#64748b; line-height:1.4;">
            Current Phase: <strong>${isPhase2 ? 'Phase 2 (Mandatory 2FA)' : 'Phase 1 (Optional 2FA)'}</strong> | 
            Failures: <strong>${loginFailCount} / 3</strong>
          </div>
          <div style="display:flex; gap:8px;">
            <button class="btn btn-ghost btn-sm" style="font-size:11px; border:1px solid #cbd5e1; padding:4px 12px;" onclick="ScreenS11.resetSandbox()">
              ${I18n.t('auth_sandbox_reset')}
            </button>
          </div>
        </div>
      </div>
    `;

    const footer = `
      <div style="text-align:center; margin-top:20px;">
        <p style="font-size:12.5px; color:#64748b; margin:0 0 12px 0;">
          Want to list your restaurant? 
          <a style="font-weight:700; color:#4f46e5; cursor:pointer; text-decoration:none;" onclick="Router.navigate('/shop/application')">
            ${I18n.t('footer_partner')} →
          </a>
        </p>
        <div style="border-top:1px solid #e2e8f0; margin:14px 0;"></div>
        <div style="display:flex; justify-content:space-between; font-size:12px;">
          <a style="color:#64748b; cursor:pointer; font-weight:600;" onclick="Router.navigate('/user/home')">← User Portal</a>
          <a style="color:#64748b; cursor:pointer; font-weight:600;" onclick="Router.navigate('/admin/login')">System Admin Portal →</a>
        </div>
      </div>
    `;

    const content = `
      <div style="max-width:440px; margin:0 auto; padding:20px 0;">
        
        <!-- Header Spec Pill Badges -->
        <div style="display:flex; justify-content:center; gap:8px; margin-bottom:16px; flex-wrap:wrap;">
          <span style="background:#dcfce7; color:#15803d; font-size:10.5px; font-weight:800; padding:3px 10px; border-radius:12px;">
            Function ID: C-01
          </span>
        </div>

        <div class="card" style="border-radius:18px; padding:28px; border:1px solid #e2e8f0; box-shadow: 0 10px 30px rgba(0,0,0,0.06); background:white;">
          
          <h1 style="font-size:22px; font-weight:800; color:#0f172a; margin:0 0 6px 0; text-align:center; display:flex; align-items:center; justify-content:center; gap:8px;">
            👨‍🍳 ${I18n.t('s11_title')}
          </h1>
          <p style="font-size:12.5px; color:#64748b; margin:0 0 20px 0; text-align:center;">
            ${I18n.t('s11_subtitle')}
          </p>

          ${tenantContextHtml}
          ${loginForm}
          ${sandboxHtml}
          ${footer}

        </div>
      </div>
    `;

    App.renderLoginPage(content);

    // Sync form validation states on render
    setTimeout(() => {
      validateForm();
    }, 50);
  }

  function validateForm() {
    const emailEl = document.getElementById('shop-email');
    const pwdEl = document.getElementById('shop-password');
    const totpEl = document.getElementById('shop-2fa-code');
    const btn = document.getElementById('shop-login-btn');

    if (!emailEl || !pwdEl || !btn) return;

    const emailValid = emailEl.checkValidity() && emailEl.value.trim().length > 0;
    const pwdValid = pwdEl.checkValidity() && pwdEl.value.trim().length >= 8;
    
    let totpValid = true;
    if (totpEl) {
      totpValid = totpEl.checkValidity() && totpEl.value.trim().length === 6 && /^\d+$/.test(totpEl.value);
    }

    btn.disabled = !(emailValid && pwdValid && totpValid);
  }

  function clearAlertBanner() {
    const banner = document.getElementById('login-alert-banner');
    if (banner) banner.style.display = 'none';
  }

  function togglePassword() {
    passwordVisible = !passwordVisible;
    render();
  }

  function openForgotPasswordModal() {
    const email = document.getElementById('shop-email')?.value || 'chef@glasspavilion.com';
    
    // Remove existing modal if any
    const existing = document.getElementById('forgot-pwd-modal');
    if (existing) existing.remove();

    const overlay = document.createElement('div');
    overlay.id = 'forgot-pwd-modal';
    overlay.className = 'modal-overlay';
    overlay.style.cssText = 'position:fixed; top:0; left:0; right:0; bottom:0; background:rgba(15,23,42,0.6); backdrop-filter:blur(4px); display:flex; align-items:center; justify-content:center; z-index:9999;';
    
    overlay.innerHTML = `
      <div class="modal-card" style="background:white; border-radius:16px; padding:24px; max-width:420px; width:90%; box-shadow:0 20px 40px rgba(0,0,0,0.25); border:1px solid #e2e8f0;" onclick="event.stopPropagation()">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
          <h3 style="font-size:17px; font-weight:800; color:#0f172a; margin:0; display:flex; align-items:center; gap:8px;">
            📧 ${I18n.t('forgot_password')}
          </h3>
          <button type="button" style="background:none; border:none; font-size:20px; color:#64748b; cursor:pointer; padding:4px;" onclick="ScreenS11.closeForgotPasswordModal()">✕</button>
        </div>

        <p style="font-size:12.5px; color:#64748b; margin:0 0 16px 0; line-height:1.5;">
          Enter your shop account email address below to receive a secure password reset link via Supabase Auth.
        </p>

        <div class="form-group" style="margin-bottom:18px;">
          <label class="form-label" style="font-size:12.5px; font-weight:700; color:#1e293b; display:block; margin-bottom:6px;">
            Shop Account Email <span style="color:#ef4444;">*</span>
          </label>
          <div style="position:relative;">
            <span style="position:absolute; left:12px; top:50%; transform:translateY(-50%); font-size:16px;">✉️</span>
            <input type="email" class="form-input" id="reset-email" value="${email}" 
                   style="padding-left:40px; font-size:14px; height:44px; border-radius:10px; width:100%; border:1px solid #cbd5e1;"
                   onkeydown="if(event.key==='Enter'){ScreenS11.sendPasswordResetLink(); event.preventDefault();}">
          </div>
        </div>

        <div style="display:flex; justify-content:flex-end; gap:10px;">
          <button type="button" class="btn btn-ghost btn-sm" style="font-size:13px; font-weight:600;" onclick="ScreenS11.closeForgotPasswordModal()">Cancel</button>
          <button type="button" class="btn btn-primary btn-sm" style="font-size:13px; font-weight:700; border-radius:8px; padding:8px 18px;" onclick="ScreenS11.sendPasswordResetLink()">Send Reset Link</button>
        </div>
      </div>
    `;

    overlay.onclick = (e) => {
      if (e.target === overlay) {
        ScreenS11.closeForgotPasswordModal();
      }
    };

    document.body.appendChild(overlay);
  }

  function closeForgotPasswordModal() {
    const modal = document.getElementById('forgot-pwd-modal');
    if (modal) modal.remove();
  }

  function sendPasswordResetLink() {
    const resetEmailInput = document.getElementById('reset-email');
    const resetEmail = resetEmailInput ? resetEmailInput.value.trim() : '';

    if (!resetEmail) {
      showToast('error', 'Validation Error', 'Please enter a valid shop account email address.');
      return;
    }

    showToast('success', 'Reset Link Sent', `Password reset link sent to ${resetEmail}. Please check your inbox!`);
    closeForgotPasswordModal();
  }

  function setSandboxMode(mode) {
    localStorage.setItem('s11_sandbox_mode', mode);
    showToast('info', 'Sandbox Mode Configured', `Shop Login response set to: ${mode.toUpperCase()}`);
  }

  function resetSandbox() {
    loginFailCount = 0;
    isLockedOut = false;
    localStorage.setItem('s11_login_fail_count', '0');
    localStorage.setItem('s11_locked_out', 'false');
    localStorage.setItem('s11_sandbox_mode', 'success');
    showToast('success', 'Sandbox Reset', 'Lockout counter and sandbox states cleared.');
    render();
  }

  function handleLogin(e) {
    e.preventDefault();
    clearAlertBanner();

    if (isLockedOut) {
      showToast('error', 'Account Locked', 'Brute-force lockout active. Please reset the simulator.');
      return;
    }

    const email = document.getElementById('shop-email').value;
    const mode = localStorage.getItem('s11_sandbox_mode') || 'success';
    const banner = document.getElementById('login-alert-banner');

    // 1. Simulate Rate Limited (429)
    if (mode === '429') {
      loginFailCount++;
      localStorage.setItem('s11_login_fail_count', loginFailCount.toString());
      if (loginFailCount >= 3) {
        isLockedOut = true;
        localStorage.setItem('s11_locked_out', 'true');
      }
      showToast('error', 'Rate Limited (429)', 'Rate limit exceeded. Account temporarily locked.');
      if (banner) {
        banner.style.display = 'flex';
        banner.style.background = '#fef2f2';
        banner.style.border = '1px solid #fca5a5';
        banner.style.color = '#991b1b';
        banner.innerHTML = `⚠️ ${I18n.t('auth_rate_limited')}`;
      }
      render();
      return;
    }

    // 2. Simulate Invalid Credentials (401)
    if (mode === '401') {
      loginFailCount++;
      localStorage.setItem('s11_login_fail_count', loginFailCount.toString());
      if (loginFailCount >= 3) {
        isLockedOut = true;
        localStorage.setItem('s11_locked_out', 'true');
      }
      showToast('error', 'Authentication Error (401)', 'Invalid email or password.');
      if (banner) {
        banner.style.display = 'flex';
        banner.style.background = '#fef2f2';
        banner.style.border = '1px solid #fca5a5';
        banner.style.color = '#991b1b';
        banner.innerHTML = `⚠️ ${I18n.t('auth_invalid_credentials')}`;
      }
      render();
      return;
    }

    // 3. Simulate Account Suspended / Locked (403 - Recommendation #4)
    if (mode === 'suspended') {
      showToast('error', 'Access Denied (403)', 'This shop account has been suspended by administrators.');
      if (banner) {
        banner.style.display = 'flex';
        banner.style.background = '#fef2f2';
        banner.style.border = '1px solid #fca5a5';
        banner.style.color = '#991b1b';
        banner.innerHTML = `⚠️ ${I18n.t('shop_account_suspended_msg')}`;
      }
      return;
    }

    // 4. Simulate Shop Not Approved
    if (mode === 'not_approved') {
      showToast('warning', 'Approval Pending', 'Shop registration is pending administrator approval.');
      if (banner) {
        banner.style.display = 'flex';
        banner.style.background = '#fefce8';
        banner.style.border = '1px solid #fde047';
        banner.style.color = '#854d0e';
        banner.innerHTML = `⚠️ ${I18n.t('shop_not_approved_msg')}`;
      }
      return;
    }

    // 5. Success Login Flow
    const isPhase2 = localStorage.getItem('s10_phase') === '2';
    const twofaEnabled = localStorage.getItem('s10_2fa_enabled') === 'true';

    // Verify 2FA token if required
    if (isPhase2 || twofaEnabled) {
      const codeEl = document.getElementById('shop-2fa-code');
      const code = codeEl ? codeEl.value.trim() : '';
      if (code !== '123456') {
        showToast('error', '2FA Failed', 'Invalid security token.');
        if (banner) {
          banner.style.display = 'flex';
          banner.style.background = '#fef2f2';
          banner.style.border = '1px solid #fca5a5';
          banner.style.color = '#991b1b';
          banner.innerHTML = `⚠️ ${I18n.t('twofa_code_invalid')}`;
        }
        return;
      }
    }

    // Proceed to login
    loginFailCount = 0;
    localStorage.setItem('s11_login_fail_count', '0');
    Router.authState.shop.isLoggedIn = true;
    Router.authState.shop.name = email.split('@')[0];

    // Force-redirect logic for Phase 2 when 2FA has NOT been configured yet
    if (isPhase2 && !twofaEnabled) {
      showToast('warning', 'Policy Alert', '2FA configuration is mandatory in Phase 2. Redirecting to setup...');
      Router.navigate('/shop/security');
    } else {
      showToast('success', 'Logged In', 'Logged in to shop portal successfully.');
      Router.navigate('/shop/dashboard');
    }
  }

  return { 
    render, 
    togglePassword, 
    openForgotPasswordModal,
    closeForgotPasswordModal,
    sendPasswordResetLink,
    setSandboxMode, 
    resetSandbox, 
    validateForm, 
    clearAlertBanner, 
    handleLogin 
  };
})();
