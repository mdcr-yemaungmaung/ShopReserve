/* ============================================================
   EzBookNow Screen S-07 — Shop Analytics & Reports Screen
   Color Palette:
     Primary:    #0B1220
     Secondary:  #1E293B
     Success:    #00C389
     Accent:     #FFB547
     Background: #F8FAFC
     Text:       #111827
   ============================================================ */

const ScreenS07 = (() => {
  let reportPeriod = 'monthly'; // 'monthly' | 'weekly' | 'daily'

  const analyticsData = {
    monthly: {
      revenue: '32,850,000 MMK',
      revenueChange: '+18.4%',
      diners: '1,420 Guests',
      dinersChange: '+12.5%',
      avgSpend: '54,200 MMK',
      avgSpendChange: '+6.2%',
      tableTurnover: '3.4 turns/day',
      bars: [
        { label: 'Mar', value: '14.2M', height: 45, isCurrent: false },
        { label: 'Apr', value: '18.6M', height: 60, isCurrent: false },
        { label: 'May', value: '16.4M', height: 52, isCurrent: false },
        { label: 'Jun', value: '25.1M', height: 80, isCurrent: false },
        { label: 'Jul (Current)', value: '32.8M', height: 100, isCurrent: true, isPeak: true }
      ],
      menu: [
        { name: 'Wagyu Beef Steak', share: 45, count: '184 orders', revenue: '14.7M MMK', color: '#0B1220' },
        { name: 'Grilled Lobster', share: 30, count: '122 orders', revenue: '9.8M MMK', color: '#00C389' },
        { name: 'Truffle Pasta', share: 15, count: '61 orders', revenue: '4.9M MMK', color: '#FFB547' },
        { name: 'Others & Beverages', share: 10, count: '42 orders', revenue: '3.4M MMK', color: '#6366F1' }
      ]
    },
    weekly: {
      revenue: '8,450,000 MMK',
      revenueChange: '+9.2%',
      diners: '365 Guests',
      dinersChange: '+7.8%',
      avgSpend: '52,800 MMK',
      avgSpendChange: '+4.1%',
      tableTurnover: '3.2 turns/day',
      bars: [
        { label: 'Week 1', value: '6.2M', height: 65, isCurrent: false },
        { label: 'Week 2', value: '7.8M', height: 82, isCurrent: false },
        { label: 'Week 3', value: '7.1M', height: 75, isCurrent: false },
        { label: 'Week 4 (Current)', value: '8.4M', height: 100, isCurrent: true, isPeak: true }
      ],
      menu: [
        { name: 'Wagyu Beef Steak', share: 42, count: '48 orders', revenue: '3.8M MMK', color: '#0B1220' },
        { name: 'Grilled Lobster', share: 32, count: '36 orders', revenue: '2.9M MMK', color: '#00C389' },
        { name: 'Truffle Pasta', share: 16, count: '18 orders', revenue: '1.4M MMK', color: '#FFB547' },
        { name: 'Others & Beverages', share: 10, count: '12 orders', revenue: '0.9M MMK', color: '#6366F1' }
      ]
    },
    daily: {
      revenue: '1,420,000 MMK',
      revenueChange: '+14.6%',
      diners: '68 Guests',
      dinersChange: '+11.0%',
      avgSpend: '56,000 MMK',
      avgSpendChange: '+8.3%',
      tableTurnover: '3.6 turns/day',
      bars: [
        { label: 'Mon', value: '1.1M', height: 50, isCurrent: false },
        { label: 'Tue', value: '1.2M', height: 55, isCurrent: false },
        { label: 'Wed', value: '0.9M', height: 42, isCurrent: false },
        { label: 'Thu', value: '1.4M', height: 65, isCurrent: false },
        { label: 'Fri', value: '2.1M', height: 92, isCurrent: false },
        { label: 'Sat', value: '2.4M', height: 100, isCurrent: false, isPeak: true },
        { label: 'Sun (Today)', value: '1.4M', height: 65, isCurrent: true }
      ],
      menu: [
        { name: 'Wagyu Beef Steak', share: 48, count: '12 orders', revenue: '680K MMK', color: '#0B1220' },
        { name: 'Grilled Lobster', share: 28, count: '7 orders', revenue: '395K MMK', color: '#00C389' },
        { name: 'Truffle Pasta', share: 14, count: '4 orders', revenue: '198K MMK', color: '#FFB547' },
        { name: 'Others & Beverages', share: 10, count: '3 orders', revenue: '147K MMK', color: '#6366F1' }
      ]
    }
  };

  function render() {
    const lang = I18n.getLang();
    const data = analyticsData[reportPeriod] || analyticsData.monthly;

    const tabsHtml = `
      <div class="flex justify-between items-center mb-6 flex-wrap gap-4" style="border-bottom: 2px solid #E2E8F0; padding-bottom: 12px;">
        <div style="display: flex; gap: 8px; background: #F1F5F9; padding: 4px; border-radius: 10px;">
          <button type="button" class="s07-period-btn ${reportPeriod === 'monthly' ? 'active' : ''}" onclick="ScreenS07.setPeriod('monthly')">
            📅 ${lang === 'mm' ? 'လစဉ်' : 'Monthly'}
          </button>
          <button type="button" class="s07-period-btn ${reportPeriod === 'weekly' ? 'active' : ''}" onclick="ScreenS07.setPeriod('weekly')">
            📊 ${lang === 'mm' ? 'အပတ်စဉ်' : 'Weekly'}
          </button>
          <button type="button" class="s07-period-btn ${reportPeriod === 'daily' ? 'active' : ''}" onclick="ScreenS07.setPeriod('daily')">
            ⏰ ${lang === 'mm' ? 'နေ့စဉ်' : 'Daily'}
          </button>
        </div>
        <div style="display: flex; gap: 8px;">
          <button class="btn btn-secondary btn-sm" style="display: inline-flex; align-items: center; gap: 6px; font-weight: 600;" onclick="showToast('success', 'Download Complete', 'Analytics PDF report downloaded successfully.')">
            ${Components.icon('download', 15)} ${lang === 'mm' ? 'အစီရင်ခံစာ ထုတ်ယူရန်' : 'Download Report'}
          </button>
        </div>
      </div>
    `;

    // KPI Summary Cards
    const kpiSummaryHtml = `
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin-bottom: 24px;">
        <div class="card" style="padding: 16px; border-left: 4px solid #0B1220; background: #FFFFFF; border-radius: 10px; border-top: 1px solid #E2E8F0; border-right: 1px solid #E2E8F0; border-bottom: 1px solid #E2E8F0; box-shadow: 0 1px 3px rgba(11,18,32,0.04);">
          <div style="font-size: 12px; font-weight: 600; color: #64748B; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.04em;">
            ${lang === 'mm' ? 'ဝင်ငွေ စုစုပေါင်း' : 'Total Revenue'}
          </div>
          <div style="font-size: 22px; font-weight: 800; color: #0B1220; line-height: 1.2; margin-bottom: 6px;">
            ${data.revenue}
          </div>
          <div style="font-size: 11.5px; font-weight: 700; color: #00C389; display: flex; align-items: center; gap: 4px;">
            <span>▲ ${data.revenueChange}</span>
            <span style="color: #94A3B8; font-weight: 500;">${lang === 'mm' ? 'ယခင်ကာလနှင့် နှိုင်းယှဉ်ချက်' : 'vs last period'}</span>
          </div>
        </div>

        <div class="card" style="padding: 16px; border-left: 4px solid #00C389; background: #FFFFFF; border-radius: 10px; border-top: 1px solid #E2E8F0; border-right: 1px solid #E2E8F0; border-bottom: 1px solid #E2E8F0; box-shadow: 0 1px 3px rgba(11,18,32,0.04);">
          <div style="font-size: 12px; font-weight: 600; color: #64748B; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.04em;">
            ${lang === 'mm' ? 'ဧည့်သည် စုစုပေါင်း' : 'Total Guests'}
          </div>
          <div style="font-size: 22px; font-weight: 800; color: #0B1220; line-height: 1.2; margin-bottom: 6px;">
            ${data.diners}
          </div>
          <div style="font-size: 11.5px; font-weight: 700; color: #00C389; display: flex; align-items: center; gap: 4px;">
            <span>▲ ${data.dinersChange}</span>
            <span style="color: #94A3B8; font-weight: 500;">${lang === 'mm' ? 'ယခင်ကာလနှင့် နှိုင်းယှဉ်ချက်' : 'vs last period'}</span>
          </div>
        </div>

        <div class="card" style="padding: 16px; border-left: 4px solid #FFB547; background: #FFFFFF; border-radius: 10px; border-top: 1px solid #E2E8F0; border-right: 1px solid #E2E8F0; border-bottom: 1px solid #E2E8F0; box-shadow: 0 1px 3px rgba(11,18,32,0.04);">
          <div style="font-size: 12px; font-weight: 600; color: #64748B; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.04em;">
            ${lang === 'mm' ? 'ပျမ်းမျှ စားသုံးမှု (ခန့်မှန်း)' : 'Avg. Spend / Table'}
          </div>
          <div style="font-size: 22px; font-weight: 800; color: #0B1220; line-height: 1.2; margin-bottom: 6px;">
            ${data.avgSpend}
          </div>
          <div style="font-size: 11.5px; font-weight: 700; color: #00C389; display: flex; align-items: center; gap: 4px;">
            <span>▲ ${data.avgSpendChange}</span>
            <span style="color: #94A3B8; font-weight: 500;">${lang === 'mm' ? 'တည်ငြိမ်တိုးတက်' : 'positive growth'}</span>
          </div>
        </div>

        <div class="card" style="padding: 16px; border-left: 4px solid #1E293B; background: #FFFFFF; border-radius: 10px; border-top: 1px solid #E2E8F0; border-right: 1px solid #E2E8F0; border-bottom: 1px solid #E2E8F0; box-shadow: 0 1px 3px rgba(11,18,32,0.04);">
          <div style="font-size: 12px; font-weight: 600; color: #64748B; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.04em;">
            ${lang === 'mm' ? 'စားပွဲ အလှည့်ကျနှုန်း' : 'Table Turnover'}
          </div>
          <div style="font-size: 22px; font-weight: 800; color: #0B1220; line-height: 1.2; margin-bottom: 6px;">
            ${data.tableTurnover}
          </div>
          <div style="font-size: 11.5px; font-weight: 700; color: #64748B; display: flex; align-items: center; gap: 4px;">
            <span>⚡ Optimal</span>
            <span style="color: #94A3B8; font-weight: 500;">(Peak 19:00 - 21:00)</span>
          </div>
        </div>
      </div>
    `;

    // Charts grid with clearly visible, high-contrast colors
    const chartsGrid = `
      <div class="grid grid-2 gap-6 mb-6" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px;">
        
        <!-- Revenue Trend Card -->
        <div class="card flex flex-col gap-4" style="background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 12px; padding: 20px; box-shadow: 0 1px 4px rgba(11,18,32,0.04);">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <h3 style="font-size: 16px; font-weight: 700; color: #0B1220; margin: 0;">
                📈 ${lang === 'mm' ? 'ဝင်ငွေလမ်းကြောင်း ခွဲခြမ်းစိတ်ဖြာမှု' : 'Revenue Trend'}
              </h3>
              <p style="font-size: 12px; color: #64748B; margin: 2px 0 0 0;">
                ${lang === 'mm' ? 'ကာလအလိုက် စုစုပေါင်းရောင်းအား (ကျပ်)' : 'Gross revenue across selected periods'}
              </p>
            </div>
            <span style="background: rgba(0, 195, 137, 0.12); color: #007A53; font-weight: 700; font-size: 11.5px; padding: 3px 8px; border-radius: 6px; border: 1px solid rgba(0,195,137,0.3);">
              ${data.revenueChange}
            </span>
          </div>

          <!-- Chart Area with high contrast & clearly visible bars -->
          <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 10px; padding: 24px 16px 12px 16px; min-height: 240px; display: flex; flex-direction: column; justify-content: flex-end; position: relative;">
            
            <!-- Grid Lines -->
            <div style="position: absolute; top: 20%; left: 16px; right: 16px; border-bottom: 1px dashed #CBD5E1; pointer-events: none;"></div>
            <div style="position: absolute; top: 50%; left: 16px; right: 16px; border-bottom: 1px dashed #CBD5E1; pointer-events: none;"></div>
            <div style="position: absolute; top: 80%; left: 16px; right: 16px; border-bottom: 1px dashed #CBD5E1; pointer-events: none;"></div>

            <!-- Bars Container -->
            <div style="display: flex; align-items: flex-end; justify-content: space-around; height: 180px; gap: 8px; z-index: 1;">
              ${data.bars.map(b => {
                // High contrast, clear colors:
                // Current peak: Solid Navy #0B1220 with gold top accent or Mint #00C389
                // Other periods: Rich Slate #1E293B or #334155
                let barBg = b.isPeak ? '#0B1220' : (b.isCurrent ? '#00C389' : '#1E293B');
                let valueBadgeBg = b.isPeak ? '#FFB547' : '#FFFFFF';
                let valueBadgeColor = b.isPeak ? '#0B1220' : '#1E293B';
                
                return `
                  <div style="display: flex; flex-direction: column; align-items: center; gap: 8px; height: 100%; justify-content: flex-end; flex: 1; max-width: 60px;">
                    <!-- Value Label on Top -->
                    <span style="font-size: 11px; font-weight: 700; color: ${valueBadgeColor}; background: ${valueBadgeBg}; border: 1px solid #CBD5E1; padding: 1px 6px; border-radius: 4px; box-shadow: 0 1px 2px rgba(0,0,0,0.05); white-space: nowrap;">
                      ${b.value}
                    </span>
                    
                    <!-- Bar Column -->
                    <div style="width: 100%; max-width: 38px; height: ${b.height}%; background: ${barBg}; border-radius: 6px 6px 0 0; transition: all 0.3s ease; box-shadow: 0 2px 6px rgba(11,18,32,0.15); border: 1px solid rgba(255,255,255,0.2); cursor: pointer;"
                         title="${b.label}: ${b.value} MMK"
                         onmouseover="this.style.filter='brightness(1.15)';"
                         onmouseout="this.style.filter='none';">
                    </div>
                  </div>
                `;
              }).join('')}
            </div>

            <!-- X-Axis Labels -->
            <div style="display: flex; justify-content: space-around; margin-top: 10px; border-top: 2px solid #CBD5E1; padding-top: 8px; z-index: 1;">
              ${data.bars.map(b => `
                <span style="font-size: 11.5px; font-weight: ${b.isCurrent ? '800' : '600'}; color: ${b.isCurrent ? '#0B1220' : '#475569'}; flex: 1; text-align: center; max-width: 60px;">
                  ${b.label}
                </span>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Menu Breakdown Card -->
        <div class="card flex flex-col gap-4" style="background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 12px; padding: 20px; box-shadow: 0 1px 4px rgba(11,18,32,0.04);">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <h3 style="font-size: 16px; font-weight: 700; color: #0B1220; margin: 0;">
                🍽️ ${lang === 'mm' ? 'ရောင်းအားအကောင်းဆုံး မီနူးများ' : 'Menu Breakdown'}
              </h3>
              <p style="font-size: 12px; color: #64748B; margin: 2px 0 0 0;">
                ${lang === 'mm' ? 'လူကြိုက်အများဆုံး အစားအသောက်များ ဝေစု' : 'Sales distribution by top menu items'}
              </p>
            </div>
            <span style="font-size: 12px; font-weight: 600; color: #64748B;">
              ${lang === 'mm' ? 'စုစုပေါင်း' : 'Total'}: 100%
            </span>
          </div>

          <!-- Menu Progress Bars with distinct, clearly visible colors -->
          <div style="display: flex; flex-direction: column; gap: 16px; padding: 8px 0;">
            ${data.menu.map(item => `
              <div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <span style="width: 10px; height: 10px; border-radius: 50%; background: ${item.color}; display: inline-block;"></span>
                    <span style="font-size: 13px; font-weight: 700; color: #111827;">${item.name}</span>
                    <span style="font-size: 11px; font-weight: 600; color: #64748B; background: #F1F5F9; padding: 1px 6px; border-radius: 4px;">${item.count}</span>
                  </div>
                  <div style="text-align: right;">
                    <span style="font-size: 13px; font-weight: 800; color: #0B1220;">${item.share}%</span>
                    <span style="font-size: 11.5px; font-weight: 500; color: #64748B; margin-left: 4px;">(${item.revenue})</span>
                  </div>
                </div>
                <!-- Clearly visible Progress Bar Track & Fill -->
                <div style="width: 100%; height: 10px; background: #E2E8F0; border-radius: 9999px; overflow: hidden; position: relative;">
                  <div style="width: ${item.share}%; height: 100%; background: ${item.color}; border-radius: 9999px; transition: width 0.5s ease; box-shadow: 0 1px 3px rgba(0,0,0,0.1);"></div>
                </div>
              </div>
            `).join('')}
          </div>

          <!-- Color Legend -->
          <div style="display: flex; flex-wrap: wrap; gap: 12px; padding-top: 12px; border-top: 1px solid #E2E8F0; font-size: 11.5px; color: #475569;">
            <div style="display: flex; align-items: center; gap: 4px;">
              <span style="width: 8px; height: 8px; border-radius: 2px; background: #0B1220;"></span>
              <span>Primary (Steak)</span>
            </div>
            <div style="display: flex; align-items: center; gap: 4px;">
              <span style="width: 8px; height: 8px; border-radius: 2px; background: #00C389;"></span>
              <span>Seafood</span>
            </div>
            <div style="display: flex; align-items: center; gap: 4px;">
              <span style="width: 8px; height: 8px; border-radius: 2px; background: #FFB547;"></span>
              <span>Pasta / Italian</span>
            </div>
            <div style="display: flex; align-items: center; gap: 4px;">
              <span style="width: 8px; height: 8px; border-radius: 2px; background: #6366F1;"></span>
              <span>Beverages & Other</span>
            </div>
          </div>
        </div>
      </div>
    `;

    // Staff Performance Stats
    const staffStats = `
      <div class="card p-0 overflow-hidden" style="background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 12px; box-shadow: 0 1px 4px rgba(11,18,32,0.04);">
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 16px 20px; border-bottom: 1px solid #E2E8F0;">
          <div>
            <h3 style="font-size: 16px; font-weight: 700; color: #0B1220; margin: 0;">
              👥 ${lang === 'mm' ? 'ဝန်ထမ်းစွမ်းဆောင်ရည် အစီရင်ခံစာ' : 'Staff Performance & Productivity'}
            </h3>
            <p style="font-size: 12px; color: #64748B; margin: 2px 0 0 0;">
              ${lang === 'mm' ? 'စားပွဲတာဝန်ယူမှု၊ ဖောက်သည်အဆင့်သတ်မှတ်ချက် နှင့် အဆိုင်းတက်ရောက်မှု' : 'Tables managed, feedback rating, and attendance metrics'}
            </p>
          </div>
          <button class="btn btn-text btn-sm" onclick="Router.navigate('/shop/staff')" style="font-weight: 600; color: #0B1220;">
            ${lang === 'mm' ? 'ဝန်ထမ်းစာရင်းသို့ →' : 'Manage Staff →'}
          </button>
        </div>

        <div class="data-table-responsive">
          <table class="data-table">
            <thead>
              <tr style="background: #F8FAFC;">
                <th style="font-weight: 700; color: #1E293B;">Staff Name</th>
                <th style="font-weight: 700; color: #1E293B;">Role</th>
                <th style="font-weight: 700; color: #1E293B;">Tables Managed</th>
                <th style="font-weight: 700; color: #1E293B;">Customer Rating</th>
                <th style="font-weight: 700; color: #1E293B;">Shift Attendance</th>
                <th style="font-weight: 700; color: #1E293B;">Performance Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style="font-weight: 700; color: #0B1220;">
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <span style="width: 28px; height: 28px; border-radius: 50%; background: #0B1220; color: #FFFFFF; font-size: 11px; font-weight: 700; display: inline-flex; align-items: center; justify-content: center;">MA</span>
                    <span>Mi Mi Aye</span>
                  </div>
                </td>
                <td><span class="badge" style="background: #E2E8F0; color: #1E293B; font-weight: 600;">Server</span></td>
                <td style="font-weight: 600; color: #111827;">142 tables</td>
                <td>
                  <span style="background: rgba(255, 181, 71, 0.2); color: #B45309; font-weight: 700; padding: 2px 8px; border-radius: 6px; border: 1px solid rgba(255, 181, 71, 0.4);">
                    ★ 4.9 / 5.0
                  </span>
                </td>
                <td>
                  <span style="background: rgba(0, 195, 137, 0.12); color: #007A53; font-weight: 700; padding: 2px 8px; border-radius: 6px; border: 1px solid rgba(0, 195, 137, 0.3);">
                    98%
                  </span>
                </td>
                <td>
                  <span class="badge badge--success" style="font-weight: 700;">🌟 Top Performer</span>
                </td>
              </tr>
              <tr>
                <td style="font-weight: 700; color: #0B1220;">
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <span style="width: 28px; height: 28px; border-radius: 50%; background: #1E293B; color: #FFFFFF; font-size: 11px; font-weight: 700; display: inline-flex; align-items: center; justify-content: center;">TS</span>
                    <span>Thida Soe</span>
                  </div>
                </td>
                <td><span class="badge" style="background: #E2E8F0; color: #1E293B; font-weight: 600;">VIP Hostess</span></td>
                <td style="font-weight: 600; color: #111827;">120 tables</td>
                <td>
                  <span style="background: rgba(255, 181, 71, 0.2); color: #B45309; font-weight: 700; padding: 2px 8px; border-radius: 6px; border: 1px solid rgba(255, 181, 71, 0.4);">
                    ★ 4.7 / 5.0
                  </span>
                </td>
                <td>
                  <span style="background: rgba(0, 195, 137, 0.12); color: #007A53; font-weight: 700; padding: 2px 8px; border-radius: 6px; border: 1px solid rgba(0, 195, 137, 0.3);">
                    95%
                  </span>
                </td>
                <td>
                  <span class="badge badge--success" style="font-weight: 700;">✓ Excellent</span>
                </td>
              </tr>
              <tr>
                <td style="font-weight: 700; color: #0B1220;">
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <span style="width: 28px; height: 28px; border-radius: 50%; background: #00C389; color: #0B1220; font-size: 11px; font-weight: 800; display: inline-flex; align-items: center; justify-content: center;">AK</span>
                    <span>Aung Ko</span>
                  </div>
                </td>
                <td><span class="badge" style="background: #E2E8F0; color: #1E293B; font-weight: 600;">Head Chef</span></td>
                <td style="font-weight: 600; color: #64748B;">Kitchen (All)</td>
                <td>
                  <span style="background: rgba(255, 181, 71, 0.2); color: #B45309; font-weight: 700; padding: 2px 8px; border-radius: 6px; border: 1px solid rgba(255, 181, 71, 0.4);">
                    ★ 4.8 / 5.0
                  </span>
                </td>
                <td>
                  <span style="background: rgba(0, 195, 137, 0.12); color: #007A53; font-weight: 700; padding: 2px 8px; border-radius: 6px; border: 1px solid rgba(0, 195, 137, 0.3);">
                    100%
                  </span>
                </td>
                <td>
                  <span class="badge badge--success" style="font-weight: 700;">✓ Perfect Attendance</span>
                </td>
              </tr>
              <tr>
                <td style="font-weight: 700; color: #0B1220;">
                  <div style="display: flex; align-items: center; gap: 8px;">
                    <span style="width: 28px; height: 28px; border-radius: 50%; background: #FFB547; color: #0B1220; font-size: 11px; font-weight: 800; display: inline-flex; align-items: center; justify-content: center;">ZW</span>
                    <span>Zaw Win</span>
                  </div>
                </td>
                <td><span class="badge" style="background: #E2E8F0; color: #1E293B; font-weight: 600;">Floor Manager</span></td>
                <td style="font-weight: 600; color: #111827;">All Sections</td>
                <td>
                  <span style="background: rgba(255, 181, 71, 0.2); color: #B45309; font-weight: 700; padding: 2px 8px; border-radius: 6px; border: 1px solid rgba(255, 181, 71, 0.4);">
                    ★ 4.9 / 5.0
                  </span>
                </td>
                <td>
                  <span style="background: rgba(0, 195, 137, 0.12); color: #007A53; font-weight: 700; padding: 2px 8px; border-radius: 6px; border: 1px solid rgba(0, 195, 137, 0.3);">
                    99%
                  </span>
                </td>
                <td>
                  <span class="badge badge--success" style="font-weight: 700;">🌟 Operations Lead</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;

    const content = `
      <div style="font-family: 'Inter', sans-serif;">
        ${Components.pageHeader(lang === 'mm' ? 'စာရင်းအင်းနှင့် အစီရင်ခံစာများ' : 'Analytics & Business Reports', lang === 'mm' ? 'ဆိုင်၏ ဝင်ငွေ၊ အစားအသောက်ရောင်းအား နှင့် ဝန်ထမ်းစွမ်းဆောင်ရည် ခွဲခြမ်းစိတ်ဖြာချက်' : 'Shop performance, revenue trends, popular menu items, and staff analytics')}
        ${tabsHtml}
        ${kpiSummaryHtml}
        ${chartsGrid}
        ${staffStats}
      </div>
    `;

    App.renderAdminPage('shop', I18n.t('sidebar_analytics'), content);
  }

  function setPeriod(p) {
    reportPeriod = p;
    render();
  }

  return { render, setPeriod };
})();
