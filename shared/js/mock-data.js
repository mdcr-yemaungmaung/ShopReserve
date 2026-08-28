/* ============================================================
   EzBookNow Mock Data — Realistic dummy data
   ============================================================ */

const MockData = (() => {
  // === Restaurants ===
  const restaurants = [
    {
      id: 'r1', name: 'The Glass Pavilion', name_mm: 'မှန်ခန်းမ',
      cuisine: 'Fine Dining', cuisine_mm: 'အဆင့်မြင့်စားသောက်ဆိုင်',
      area: 'Bahan', area_mm: 'ဗဟန်း', rating: 4.8, reviewCount: 234,
      priceRange: '25,000 - 80,000', image: Paths.image('glass_pavilion.png'),
      images: [
        Paths.image('glass_pavilion.png'),
        Paths.image('about_banner.png'),
        Paths.image('menu_item_1.png')
      ],
      description: 'Award-winning fine dining with panoramic city views. Our chef creates innovative fusion dishes blending traditional Myanmar flavors with modern techniques.',
      description_mm: 'မြို့ပြမြင်ကွင်းကျယ်ပါသော ဆုရ အဆင့်မြင့်စားသောက်ဆိုင်။ မြန်မာ့ရိုးရာအရသာနှင့် ခေတ်မီနည်းပညာများကို ပေါင်းစပ်ထားသော ဆန်းသစ်ဟင်းလျာများ ဖန်တီးပါသည်။',
      hours: '11:00 AM - 10:00 PM', isOpen: true, status: 'active',
      phone: '+95 9 123 456 789', address: '123 Inya Road, Bahan Township, Yangon',
      menuItems: [
        { name: 'Grilled Lobster', name_mm: 'ကင်ထားသော ကျောက်ပုစွန်', price: 45000 },
        { name: 'Wagyu Beef Steak', name_mm: 'ဝါဂျူးအမဲသားစတိတ်', price: 65000 },
        { name: 'Seafood Platter', name_mm: 'ပင်လယ်စာပန်းကန်', price: 80000 },
        { name: 'Caesar Salad', name_mm: 'ဆီဇာသုပ်', price: 12000 },
        { name: 'Truffle Pasta', name_mm: 'ထရပ်ဖယ်ခေါက်ဆွဲ', price: 35000 },
        { name: 'Mango Sticky Rice', name_mm: 'သရက်ထမင်းပေါင်း', price: 8000 }
      ]
    },
    {
      id: 'r2', name: 'Golden Mandalay', name_mm: 'ရွှေမန္တလေး',
      cuisine: 'Myanmar Traditional', cuisine_mm: 'မြန်မာ့ရိုးရာ',
      area: 'Kamayut', area_mm: 'ကမာရွတ်', rating: 4.6, reviewCount: 189,
      priceRange: '8,000 - 25,000', image: Paths.image('golden_mandalay.png'),
      images: [Paths.image('golden_mandalay.png')],
      description: 'Authentic Myanmar cuisine in a traditional setting. Experience the rich flavors of Burmese home cooking.',
      description_mm: 'ရိုးရာပတ်ဝန်းကျင်တွင် စစ်မှန်သော မြန်မာအစားအသောက်။ မြန်မာ့အိမ်ချက်ဟင်းလျာ အရသာကြွယ်ဝမှုကို ခံစားပါ။',
      hours: '10:00 AM - 9:00 PM', isOpen: true, status: 'active',
      phone: '+95 9 234 567 890', address: '45 University Avenue, Kamayut',
      menuItems: [
        { name: 'Mohinga', name_mm: 'မုန့်ဟင်းခါး', price: 3000 },
        { name: 'Shan Noodles', name_mm: 'ရှမ်းခေါက်ဆွဲ', price: 3500 },
        { name: 'Laphet Thoke', name_mm: 'လက်ဖက်သုပ်', price: 4000 },
        { name: 'Fish Curry', name_mm: 'ငါးဟင်း', price: 8000 }
      ]
    },
    {
      id: 'r3', name: 'Sakura Garden', name_mm: 'ချယ်ရီပန်းခြံ',
      cuisine: 'Japanese', cuisine_mm: 'ဂျပန်',
      area: 'Sanchaung', area_mm: 'စမ်းချောင်း', rating: 4.5, reviewCount: 156,
      priceRange: '15,000 - 50,000', image: Paths.image('sakura_garden.png'),
      images: [Paths.image('sakura_garden.png')],
      description: 'Premium Japanese dining experience featuring fresh sushi, sashimi, and traditional kaiseki courses.',
      description_mm: 'လတ်ဆတ်သော ဆူရှီ၊ ဆာရှီမီနှင့် ရိုးရာ ကိုင်ဆက်ခိုစ်များ ပါဝင်သော ပရီမီယံ ဂျပန်စားသောက်အတွေ့အကြုံ။',
      hours: '11:30 AM - 10:30 PM', isOpen: true, status: 'active',
      phone: '+95 9 345 678 901', address: '78 Bargayar Road, Sanchaung',
      menuItems: [
        { name: 'Omakase Set', name_mm: 'အိုမကာဆေးအစုံ', price: 50000 },
        { name: 'Dragon Roll', name_mm: 'နဂါးလိပ်', price: 18000 },
        { name: 'Ramen', name_mm: 'ရာမင်', price: 12000 },
        { name: 'Tempura Set', name_mm: 'တင်ပူရာအစုံ', price: 15000 }
      ]
    },
    {
      id: 'r4', name: 'Spice Route', name_mm: 'အမွှေးအကြိုင်လမ်းကြောင်း',
      cuisine: 'Indian', cuisine_mm: 'အိန္ဒိယ',
      area: 'Dagon', area_mm: 'ဒဂုံ', rating: 4.3, reviewCount: 98,
      priceRange: '10,000 - 30,000', image: Paths.image('spice_route.png'),
      images: [Paths.image('spice_route.png')],
      description: 'Authentic North Indian and South Indian cuisine with tandoor specialties.',
      description_mm: 'တန်ဒိုးအထူးဟင်းလျာများပါဝင်သော စစ်မှန်သော မြောက်အိန္ဒိယနှင့် တောင်အိန္ဒိယဟင်းလျာ။',
      hours: '10:30 AM - 10:00 PM', isOpen: true, status: 'active',
      phone: '+95 9 456 789 012', address: '22 Anawrahta Road, Dagon',
      menuItems: [
        { name: 'Butter Chicken', name_mm: 'ထောပတ်ကြက်', price: 12000 },
        { name: 'Biryani', name_mm: 'ဗီရီယာနီ', price: 10000 },
        { name: 'Naan Bread', name_mm: 'နန်ပေါင်မုန့်', price: 3000 }
      ]
    },
    {
      id: 'r5', name: 'Lakeview Terrace', name_mm: 'ရေကန်ရှုခင်း',
      cuisine: 'International', cuisine_mm: 'အပြည်ပြည်ဆိုင်ရာ',
      area: 'Mayangone', area_mm: 'မရမ်းကုန်း', rating: 4.7, reviewCount: 312,
      priceRange: '20,000 - 60,000', image: Paths.image('lakeview_terrace.png'),
      images: [Paths.image('lakeview_terrace.png')],
      description: 'International fine dining overlooking Inya Lake. Featuring Mediterranean, Asian fusion, and European cuisine.',
      description_mm: 'အင်းလျားကန်ကိုမြင်ရသော အပြည်ပြည်ဆိုင်ရာ အဆင့်မြင့်စားသောက်ဆိုင်။',
      hours: '12:00 PM - 11:00 PM', isOpen: false, status: 'active',
      phone: '+95 9 567 890 123', address: '56 Inya Road, Mayangone',
      menuItems: [
        { name: 'Grilled Salmon', name_mm: 'ကင်ထားသောဆယ်လ်မွန်', price: 35000 },
        { name: 'Pasta Carbonara', name_mm: 'ပါစတာကာဘိုနာရာ', price: 22000 },
        { name: 'Tiramisu', name_mm: 'တီရာမီဆူ', price: 10000 }
      ]
    },
    {
      id: 'r6', name: 'Street Bites Cafe', name_mm: 'လမ်းဘေးစားဖိုခေါင်',
      cuisine: 'Cafe & Bistro', cuisine_mm: 'ကဖေးနှင့်ဘစ်ထရို',
      area: 'Hlaing', area_mm: 'လှိုင်', rating: 4.2, reviewCount: 78,
      priceRange: '5,000 - 15,000', image: Paths.image('street_bites_cafe.png'),
      images: [Paths.image('street_bites_cafe.png')],
      description: 'Trendy cafe with artisan coffee, brunch specials, and creative Asian-Western fusion bites.',
      description_mm: 'လက်မှုကဖေး၊ နံနက်စာအထူးနှင့် ဖန်တီးမှုဆန်သော အာရှ-အနောက်တိုင်း ပေါင်းစပ်ဟင်းလျာများ ပါဝင်သော ခေတ်မီကဖေးဆိုင်။',
      hours: '8:00 AM - 9:00 PM', isOpen: true, status: 'active',
      phone: '+95 9 678 901 234', address: '88 Pyay Road, Hlaing',
      menuItems: [
        { name: 'Avocado Toast', name_mm: 'ထောပတ်သီးတုတ်စ်', price: 7000 },
        { name: 'Latte', name_mm: 'လာတေး', price: 4500 },
        { name: 'Club Sandwich', name_mm: 'ကလပ်ဆန်းဒွစ်ချ်', price: 8000 }
      ]
    }
  ];

  // === Areas ===
  const areas = [
    { code: 'bahan', name: 'Bahan', name_mm: 'ဗဟန်း', region: 'Yangon', sort_order: 1, is_active: true, created_at: '2026-01-01', updated_at: '2026-01-01' },
    { code: 'kamayut', name: 'Kamayut', name_mm: 'ကမာရွတ်', region: 'Yangon', sort_order: 2, is_active: true, created_at: '2026-01-01', updated_at: '2026-01-01' },
    { code: 'sanchaung', name: 'Sanchaung', name_mm: 'စမ်းချောင်း', region: 'Yangon', sort_order: 3, is_active: true, created_at: '2026-01-01', updated_at: '2026-01-01' },
    { code: 'dagon', name: 'Dagon', name_mm: 'ဒဂုံ', region: 'Yangon', sort_order: 4, is_active: true, created_at: '2026-01-01', updated_at: '2026-01-01' },
    { code: 'mayangone', name: 'Mayangone', name_mm: 'မရမ်းကုန်း', region: 'Yangon', sort_order: 5, is_active: true, created_at: '2026-01-01', updated_at: '2026-01-01' },
    { code: 'hlaing', name: 'Hlaing', name_mm: 'လှိုင်', region: 'Yangon', sort_order: 6, is_active: true, created_at: '2026-01-01', updated_at: '2026-01-01' },
    { code: 'yankin', name: 'Yankin', name_mm: 'ရန်ကင်း', region: 'Yangon', sort_order: 7, is_active: true, created_at: '2026-01-01', updated_at: '2026-01-01' },
    { code: 'mandalay', name: 'Mandalay', name_mm: 'မန္တလေး', region: 'Mandalay', sort_order: 8, is_active: true, created_at: '2026-01-01', updated_at: '2026-01-01' }
  ];

  // === Cuisine Genres ===
  const cuisines = [
    { code: 'fine_dining', name: 'Fine Dining', name_mm: 'အဆင့်မြင့်စားသောက်ဆိုင်', sort_order: 1, is_active: true, created_at: '2026-01-01', updated_at: '2026-01-01' },
    { code: 'myanmar', name: 'Myanmar Traditional', name_mm: 'မြန်မာ့ရိုးရာ', sort_order: 2, is_active: true, created_at: '2026-01-01', updated_at: '2026-01-01' },
    { code: 'japanese', name: 'Japanese', name_mm: 'ဂျပန်', sort_order: 3, is_active: true, created_at: '2026-01-01', updated_at: '2026-01-01' },
    { code: 'indian', name: 'Indian', name_mm: 'အိန္ဒိယ', sort_order: 4, is_active: true, created_at: '2026-01-01', updated_at: '2026-01-01' },
    { code: 'international', name: 'International', name_mm: 'အပြည်ပြည်ဆိုင်ရာ', sort_order: 5, is_active: true, created_at: '2026-01-01', updated_at: '2026-01-01' },
    { code: 'cafe', name: 'Cafe & Bistro', name_mm: 'ကဖေးနှင့်ဘစ်ထရို', sort_order: 6, is_active: true, created_at: '2026-01-01', updated_at: '2026-01-01' },
    { code: 'chinese', name: 'Chinese', name_mm: 'တရုတ်', sort_order: 7, is_active: true, created_at: '2026-01-01', updated_at: '2026-01-01' },
    { code: 'thai', name: 'Thai', name_mm: 'ထိုင်း', sort_order: 8, is_active: true, created_at: '2026-01-01', updated_at: '2026-01-01' },
    { code: 'korean', name: 'Korean', name_mm: 'ကိုရီးယား', sort_order: 9, is_active: true, created_at: '2026-01-01', updated_at: '2026-01-01' }
  ];

  // === Reservations ===
  const reservations = [
    { id: 'RES-2026-001', shopId: 'r1', shopName: 'The Glass Pavilion', shopName_mm: 'မှန်ခန်းမ', date: '2026-07-20', time: '19:00', guests: 4, status: 'confirmed', name: 'ဦးကျော်ဇေယျ', phone: '+95 9 123 456 789', payment: 'at_store', amount: 180000, notes: 'Birthday celebration', createdAt: '2026-07-15' },
    { id: 'RES-2026-002', shopId: 'r2', shopName: 'Golden Mandalay', shopName_mm: 'ရွှေမန္တလေး', date: '2026-07-18', time: '12:00', guests: 2, status: 'pending', name: 'ဦးကျော်ဇေယျ', phone: '+95 9 123 456 789', payment: 'at_store', amount: 40000, notes: '', createdAt: '2026-07-14' },
    { id: 'RES-2026-003', shopId: 'r3', shopName: 'Sakura Garden', shopName_mm: 'ချယ်ရီပန်းခြံ', date: '2026-07-10', time: '19:30', guests: 6, status: 'completed', name: 'ဦးကျော်ဇေယျ', phone: '+95 9 123 456 789', payment: 'kbzpay', amount: 300000, notes: 'Business dinner', createdAt: '2026-07-05' },
    { id: 'RES-2026-004', shopId: 'r5', shopName: 'Lakeview Terrace', shopName_mm: 'ရေကန်ရှုခင်း', date: '2026-07-05', time: '18:00', guests: 2, status: 'cancelled', name: 'ဦးကျော်ဇေယျ', phone: '+95 9 123 456 789', payment: 'at_store', amount: 80000, notes: '', createdAt: '2026-07-01' },
    { id: 'RES-2026-005', shopId: 'r4', shopName: 'Spice Route', shopName_mm: 'အမွှေးအကြိုင်လမ်းကြောင်း', date: '2026-06-28', time: '20:00', guests: 3, status: 'completed', name: 'ဦးကျော်ဇေယျ', phone: '+95 9 123 456 789', payment: 'at_store', amount: 60000, notes: '', createdAt: '2026-06-25' }
  ];

  // === Shop Reservations (for shop admin) ===
  const shopReservations = [
    // --- Detailed Scenarios (SR-ENT-20260720-001 to 013) for Today (2026-07-20 & 2026-07-15) ---
    { id: 'SR-ENT-20260720-001', name: 'ဦးကျော်ဇေယျ', phone: '+95 9 123 456 789', date: '2026-07-20', time: '12:00', guests: 4, table: 'T-01', status: 'completed', source: 'online', user_id: 'usr-101', preferred_seat_tags: ['Main Hall'], notes: 'Lunch meeting' },
    { id: 'SR-ENT-20260720-002', name: 'ဒေါ်သန်းသန်းမြင့်', phone: '+95 9 234 567 890', date: '2026-07-20', time: '18:30', guests: 3, table: 'T-02', status: 'checked_in', source: 'phone', user_id: null, preferred_seat_tags: ['Main Hall'], notes: 'High chair / ကလေးထိုင်ခုံ တောင်းဆိုထားသည်' },
    { id: 'SR-ENT-20260720-003', name: 'ဦးစိုးမင်းထွန်း', phone: '+95 9 345 678 901', date: '2026-07-20', time: '19:00', guests: 2, table: 'W-01', status: 'checked_in', source: 'online', user_id: 'usr-103', preferred_seat_tags: ['Window View'], notes: 'Window view anniversary' },
    { id: 'SR-ENT-20260720-004', name: 'မေသူကျော်', phone: '+95 9 456 789 012', date: '2026-07-20', time: '19:30', guests: 6, table: 'B-01', status: 'confirmed', source: 'online', user_id: 'usr-104', preferred_seat_tags: ['Booth'], notes: '' },
    { id: 'SR-ENT-20260720-005', name: 'ဦးအေးလွင်', phone: '+95 9 567 890 123', date: '2026-07-20', time: '19:30', guests: 8, table: 'VIP-01', status: 'confirmed', source: 'phone', user_id: null, preferred_seat_tags: ['VIP Room'], notes: 'Executive dinner' },
    { id: 'SR-ENT-20260720-006', name: 'ဒေါ်မြနဒီ', phone: '+95 9 678 901 234', date: '2026-07-20', time: '20:00', guests: 4, table: 'T-05', status: 'pending', source: 'online', user_id: 'usr-107', preferred_seat_tags: ['Main Hall'], notes: 'Needs phone confirmation' },
    { id: 'SR-ENT-20260720-007', name: 'မောင်ဆန်းလင်း', phone: '+95 9 789 012 345', date: '2026-07-20', time: '19:30', guests: 2, table: 'G-01', status: 'confirmed', source: 'online', user_id: 'usr-108', preferred_seat_tags: ['Garden Terrace'], notes: '' },
    { id: 'SR-ENT-20260720-008', name: 'ဦးကျော်သူ', phone: '+95 9 890 123 456', date: '2026-07-20', time: '19:30', guests: 1, table: 'BAR-01', status: 'confirmed', source: 'walk_in', user_id: null, preferred_seat_tags: ['Bar Counter'], notes: '' },
    { id: 'SR-ENT-20260720-009', name: 'ဒေါ်လှလှဝင်း', phone: '+95 9 901 234 567', date: '2026-07-20', time: '20:30', guests: 5, table: 'T-09', status: 'pending', source: 'phone', user_id: null, preferred_seat_tags: ['Main Hall'], notes: 'Wheelchair access / ဘီးတပ်ကုလားထိုင် ဝင်ထွက်ရလွယ်ကူသောနေရာ' },
    { id: 'SR-ENT-20260720-010', name: 'ဦးရဲထွန်း', phone: '+95 9 012 345 678', date: '2026-07-20', time: '21:00', guests: 4, table: 'T-12', status: 'confirmed', source: 'online', user_id: 'usr-111', preferred_seat_tags: ['Main Hall'], notes: '' },
    { id: 'SR-ENT-20260720-011', name: 'ဦးဇော်ဝင်း (Double Booked)', phone: '+95 9 111 000 999', date: '2026-07-20', time: '19:30', guests: 4, table: 'T-14', status: 'pending', is_conflict: true, source: 'offline_sync', user_id: null, preferred_seat_tags: ['Main Hall'], notes: '⚠️ Sync Conflict: Double booking detected during offline sync' },
    { id: 'SR-ENT-20260720-012', name: 'မစန်းစန်း', phone: '+95 9 222 111 000', date: '2026-07-20', time: '18:00', guests: 2, table: 'T-03', status: 'no_show', source: 'online', user_id: 'usr-114', preferred_seat_tags: ['Main Hall'], notes: 'No show after 30 mins' },
    { id: 'SR-ENT-20260720-013', name: 'ဦးသန်းအောင်', phone: '+95 9 333 222 111', date: '2026-07-20', time: '19:00', guests: 3, table: 'W-02', status: 'cancelled', source: 'phone', user_id: null, preferred_seat_tags: ['Window View'], notes: 'Customer cancelled by phone' },

    // --- Direct Manual Booking & Quick Booking Test Date (2026-10-24) ---
    { id: 'SR-ENT-20261024-001', name: 'ဦးမျိုးမင်းအောင်', phone: '+95 9 450 111 222', date: '2026-10-24', time: '12:00', guests: 4, table: 'T-01', status: 'confirmed', source: 'phone', user_id: null, preferred_seat_tags: ['Main Hall'], notes: 'Direct test for S09 / S03B' },
    { id: 'SR-ENT-20261024-002', name: 'ဒေါ်နန်းမို့မို့', phone: '+95 9 450 222 333', date: '2026-10-24', time: '12:30', guests: 2, table: 'W-03', status: 'confirmed', source: 'online', user_id: 'usr-oct-2', preferred_seat_tags: ['Window View'], notes: '' },
    { id: 'SR-ENT-20261024-003', name: 'ဦးအောင်ကိုလတ်', phone: '+95 9 450 333 444', date: '2026-10-24', time: '18:30', guests: 6, table: 'B-02', status: 'pending', source: 'phone', user_id: null, preferred_seat_tags: ['Booth'], notes: 'Birthday party' },
    { id: 'SR-ENT-20261024-004', name: 'မချိုချိုထွေး', phone: '+95 9 450 444 555', date: '2026-10-24', time: '19:00', guests: 10, table: 'VIP-05', status: 'confirmed', source: 'online', user_id: 'usr-oct-4', preferred_seat_tags: ['VIP Room'], notes: 'Private dinner' },
    { id: 'SR-ENT-20261024-005', name: 'ဦးဟန်စိုး', phone: '+95 9 450 555 666', date: '2026-10-24', time: '19:30', guests: 4, table: 'G-03', status: 'checked_in', source: 'walk_in', user_id: null, preferred_seat_tags: ['Garden Terrace'], notes: '' },
    { id: 'SR-ENT-20261024-006', name: 'မောင်နိုင်ဝင်း', phone: '+95 9 450 666 777', date: '2026-10-24', time: '20:00', guests: 1, table: 'BAR-02', status: 'confirmed', source: 'online', user_id: 'usr-oct-6', preferred_seat_tags: ['Bar Counter'], notes: '' }
  ];


  // === Staff ===
  const staffMembers = [
    { 
      id: 'stf-1', 
      name: 'Aung Ko', 
      job_title: 'Head Chef', 
      role: 'Chef', 
      shift: 'Morning', 
      phone: '+95 9 111 000 001', 
      bio: 'Asian fusion cuisine specialist with 8 years of kitchen operations experience.',
      avatar_url: '../shared/images/avatar-user.svg',
      avatar: 'AK',
      accepts_booking: false,
      account_username: 'aungko_chef',
      account_status: 'active'
    },
    { 
      id: 'stf-2', 
      name: 'Mi Mi Aye', 
      job_title: 'Senior Server & Hostess', 
      role: 'Server', 
      shift: 'Evening', 
      phone: '+95 9 111 000 002', 
      bio: 'Dedicated to warm hospitality, customer service, and reservation assignments.',
      avatar_url: '../shared/images/avatar-user.svg',
      avatar: 'MA',
      accepts_booking: true,
      account_username: 'mimi_server',
      account_status: 'active'
    },
    { 
      id: 'stf-3', 
      name: 'Zaw Win', 
      job_title: 'Floor Manager', 
      role: 'Manager', 
      shift: 'Full Day', 
      phone: '+95 9 111 000 003', 
      bio: 'Manages shop staff scheduling, seating layouts, and VIP guest relations.',
      avatar_url: '../shared/images/avatar-user.svg',
      avatar: 'ZW',
      accepts_booking: true,
      account_username: 'zawwin_mgr',
      account_status: 'active'
    },
    { 
      id: 'stf-4', 
      name: 'Thida Soe', 
      job_title: 'VIP Lounge Hostess', 
      role: 'Server', 
      shift: 'Morning', 
      phone: '+95 9 111 000 004', 
      bio: 'Specializes in VIP table assignments and private dining requests.',
      avatar_url: '../shared/images/avatar-user.svg',
      avatar: 'TS',
      accepts_booking: true,
      account_username: 'thidasoe_host',
      account_status: 'active'
    },
    { 
      id: 'stf-5', 
      name: 'Kyaw Zin', 
      job_title: 'Head Bartender', 
      role: 'Bartender', 
      shift: 'Evening', 
      phone: '+95 9 111 000 005', 
      bio: 'Craft cocktail specialist managing counter seating and beverage service.',
      avatar_url: '../shared/images/avatar-user.svg',
      avatar: 'KZ',
      accepts_booking: false,
      account_username: 'kyawzin_bar',
      account_status: 'inactive'
    }
  ];

  // === Tables (100 Enterprise Restaurant Tables Master Data ~ 380 Total Seats) ===
  const tables = [];

  // 1. Main Dining Hall: T-01 to T-40 (40 tables, 120 seats)
  for (let i = 1; i <= 40; i++) {
    tables.push({
      id: `tbl-t-${i}`,
      name: `T-${String(i).padStart(2, '0')}`,
      seats: i <= 20 ? 2 : 4,
      type: 'Main Hall',
      seat_tags: i <= 10 ? ['tv_front', 'near_entrance'] : (i <= 25 ? ['tv_front', 'quiet'] : ['stage_front'])
    });
  }

  // 2. Window View Section: W-01 to W-20 (20 tables, 60 seats)
  for (let i = 1; i <= 20; i++) {
    tables.push({
      id: `tbl-w-${i}`,
      name: `W-${String(i).padStart(2, '0')}`,
      seats: i <= 10 ? 2 : 4,
      type: 'Window View',
      seat_tags: ['window', 'quiet']
    });
  }

  // 3. Sofa & Booth Section: B-01 to B-15 (15 tables, 70 seats)
  for (let i = 1; i <= 15; i++) {
    tables.push({
      id: `tbl-b-${i}`,
      name: `B-${String(i).padStart(2, '0')}`,
      seats: i <= 10 ? 4 : 6,
      type: 'Booth',
      seat_tags: ['quiet', 'stage_front']
    });
  }

  // 4. VIP Private Rooms: VIP-01 to VIP-10 (10 tables, 88 seats)
  for (let i = 1; i <= 10; i++) {
    tables.push({
      id: `tbl-vip-${i}`,
      name: `VIP-${String(i).padStart(2, '0')}`,
      seats: i <= 6 ? 8 : 10,
      type: 'VIP Room',
      seat_tags: ['private_room', 'quiet']
    });
  }

  // 5. Garden / Outdoor Terrace: G-01 to G-10 (10 tables, 37 seats)
  for (let i = 1; i <= 10; i++) {
    tables.push({
      id: `tbl-g-${i}`,
      name: `G-${String(i).padStart(2, '0')}`,
      seats: i <= 3 ? 3 : 4,
      type: 'Garden Terrace',
      seat_tags: ['outdoor', 'quiet']
    });
  }

  // 6. Bar Counter Seating: BAR-01 to BAR-05 (5 tables, 5 seats)
  for (let i = 1; i <= 5; i++) {
    tables.push({
      id: `tbl-bar-${i}`,
      name: `BAR-${String(i).padStart(2, '0')}`,
      seats: 1,
      type: 'Bar Counter',
      seat_tags: ['counter', 'tv_front']
    });
  }

  // Programmatically populate simultaneous multi-status bookings across ALL 100 enterprise tables for Today (2026-07-20 & 2026-07-15)
  const namesMM = [
    'ဦးကျော်ကျော်', 'ဒေါ်သီတာ', 'ဦးအောင်မင်း', 'မစန္ဒာ', 'ဦးကိုကိုလတ်', 
    'ဒေါ်ခင်စိုး', 'ဦးစိုးဝင်း', 'မောင်မင်းဟိန်း', 'ဦးမြတ်သူ', 'မစုစုလှိုင်', 
    'ဦးဇော်လင်း', 'ဒေါ်နန်းရီ', 'ဦးလှဟန်', 'မသင်းဇာ', 'ဦးရဲမင်း', 
    'ဒေါ်မေသူ', 'ဦးအောင်ကိုကို', 'မဝင်းဝင်း', 'ဦးဇော်ဝင်း', 'ဒေါ်မြင့်မြင့်', 
    'ဦးအေးမောင်', 'မလှလှဝင်း', 'ဦးမင်းသန့်', 'ဒေါ်နီနီထွေး', 'ဦးစိုးမြင့်', 
    'မဖြူဖြူ', 'ဦးကျော်သူ', 'ဒေါ်သန်းသန်း', 'မောင်ဆန်း', 'မအေးအေးမော်'
  ];

  const targetDates = [
    '2026-07-01', '2026-07-02', '2026-07-03', '2026-07-04', '2026-07-05',
    '2026-07-06', '2026-07-07', '2026-07-08', '2026-07-09', '2026-07-10',
    '2026-07-11', '2026-07-12', '2026-07-13', '2026-07-14', '2026-07-15',
    '2026-07-16', '2026-07-17', '2026-07-18', '2026-07-19', '2026-07-20',
    '2026-07-21', '2026-07-22', '2026-07-23', '2026-07-24', '2026-07-25',
    '2026-07-26', '2026-07-27', '2026-07-28', '2026-07-29', '2026-07-30',
    '2026-07-31'
  ];

  targetDates.forEach(targetDate => {
    tables.forEach((t, idx) => {
      let st = 'confirmed';
      if (idx % 6 === 0) st = 'checked_in';
      else if (idx % 6 === 1) st = 'confirmed';
      else if (idx % 6 === 2) st = 'pending';
      else if (idx % 6 === 3) st = 'completed';
      else if (idx % 6 === 4) st = 'no_show';
      else st = 'cancelled';

      let tm = '19:30';
      if (idx % 4 === 0) tm = '19:30';
      else if (idx % 4 === 1) tm = '12:00';
      else if (idx % 4 === 2) tm = '18:30';
      else tm = '20:00';

      const dateHash = targetDate.split('-').reduce((a, b) => a + parseInt(b), 0);
      const customerName = namesMM[(idx + dateHash) % namesMM.length];
      const phoneNum = `+95 9 ${String(100 + (idx * 7) % 900).padStart(3, '0')} ${String(200 + (idx * 13) % 900).padStart(3, '0')} ${String(300 + (idx * 17) % 900).padStart(3, '0')}`;

      const existing = shopReservations.find(r => r.table === t.name && r.date === targetDate);
      if (!existing) {
        shopReservations.push({
          id: `SR-ENT-${targetDate.replace(/-/g, '')}-${String(idx + 1).padStart(3, '0')}`,
          name: customerName,
          phone: phoneNum,
          date: targetDate,
          time: tm,
          guests: t.seats,
          table: t.name,
          status: st,
          source: idx % 2 === 0 ? 'online' : 'phone',
          user_id: idx % 2 === 0 ? `usr-${idx}` : null,
          preferred_seat_tags: [t.type],
          notes: st === 'checked_in' ? 'Seated and currently dining' : st === 'pending' ? 'Awaiting phone confirmation' : ''
        });
      }
    });
  });

  // === Reviews ===
  const reviews = [
    { id: 'rev-1', shopId: 'r1', userName: 'မစန္ဒာဦး', rating: 5, comment: 'Absolutely amazing dining experience! The Wagyu steak was cooked to perfection.', date: '2026-07-10', reply: 'Thank you so much for your kind words! We look forward to welcoming you again.', repliedAt: '2026-07-11' },
    { id: 'rev-2', shopId: 'r1', userName: 'မောင်ကိုကို', rating: 4, comment: 'Great ambiance and food. Service was a bit slow during peak hours.', date: '2026-07-08', reply: null, repliedAt: null },
    { id: 'rev-3', shopId: 'r1', userName: 'Lin Htwe', rating: 5, comment: 'Best fine dining in Yangon. The seafood platter is a must-try!', date: '2026-07-05', reply: null, repliedAt: null },
    { id: 'rev-4', shopId: 'r2', userName: 'မောင်ထွန်းထွန်း', rating: 4, comment: 'Authentic Myanmar food. The mohinga reminded me of my grandmother\'s cooking.', date: '2026-06-28', reply: null, repliedAt: null }
  ];

  // === Notifications ===
  const notifications = [
    { id: 'n1', type: 'reservation_confirmed', title: 'Reservation Confirmed', title_mm: 'ကြိုတင်မှာယူမှု အတည်ပြုပြီး', body: 'Your reservation at The Glass Pavilion on Jul 20 at 7:00 PM has been confirmed.', body_mm: 'မှန်ခန်းမ တွင် ဇူလိုင် ၂၀ ရက် ညနေ ၇ နာရီ ကြိုတင်မှာယူမှု အတည်ပြုပြီးပါပြီ။', readAt: null, createdAt: '2026-07-15T08:30:00', link: '#/user/booking/RES-2026-001' },
    { id: 'n2', type: 'reminder', title: 'Booking Reminder', title_mm: 'ကြိုတင်မှာယူမှု သတိပေးချက်', body: 'Reminder: Your reservation at Golden Mandalay is tomorrow at 12:00 PM.', body_mm: 'သတိပေးချက်: ရွှေမန္တလေး တွင် မနက်ဖြန် နေ့လည် ၁၂ နာရီ ကြိုတင်မှာယူမှု ရှိပါသည်။', readAt: null, createdAt: '2026-07-14T18:00:00', link: '#/user/booking/RES-2026-002' },
    { id: 'n3', type: 'review_reply', title: 'Review Reply', title_mm: 'သုံးသပ်ချက် ပြန်ကြားချက်', body: 'The Glass Pavilion replied to your review.', body_mm: 'မှန်ခန်းမ မှ သင့်သုံးသပ်ချက်ကို ပြန်ကြားပါပြီ။', readAt: '2026-07-13T10:00:00', createdAt: '2026-07-12T15:00:00', link: '#/user/shop/r1' },
    { id: 'n4', type: 'announcement', title: 'System Update', title_mm: 'စနစ်အပ်ဒိတ်', body: 'EzBookNow will undergo maintenance on Jul 25 from 2:00 AM to 4:00 AM.', body_mm: 'EzBookNow ကို ဇူလိုင် ၂၅ ရက် မနက် ၂ နာရီမှ ၄ နာရီထိ ပြုပြင်ထိန်းသိမ်းမည်။', readAt: '2026-07-10T09:00:00', createdAt: '2026-07-10T08:00:00', link: '#/user/announcements' }
  ];

  // === Shop Notifications (S-20) — reservation_notifications table mock ===
  // channel = 'in_app', scoped to current shop_id
  const shopNotifications = [
    // --- Bookings ---
    {
      id: 'sn-01', type: 'shop_new_booking',
      title: 'New Booking Received',
      title_mm: 'ဘွတ်ကင်အသစ် ရောက်ရှိနေပြီ',
      body: 'ဦးကျော်ကျော် made a new reservation (RES-2026-016) for 4 guests on Jul 17 at 7:00 PM.',
      body_mm: 'ဦးကျော်ကျော် မှ ဇူလိုင် ၁၇ ညနေ ၇:၀၀ ဧည့်သည် ၄ ဦးအတွက် ဘွတ်ကင် (RES-2026-016) ဝင်ရောက်လာပြီ',
      readAt: null, createdAt: '2026-07-17T10:30:00',
      meta: { reservationId: 'RES-2026-016' }
    },
    {
      id: 'sn-02', type: 'shop_new_booking',
      title: 'New Booking Received',
      title_mm: 'ဘွတ်ကင်အသစ် ရောက်ရှိနေပြီ',
      body: 'ဒေါ်သီတာ made a new reservation (RES-2026-015) for 2 guests on Jul 17 at 12:30 PM.',
      body_mm: 'ဒေါ်သီတာ မှ ဇူလိုင် ၁၇ နေ့လည် ၁၂:၃၀ ဧည့်သည် ၂ ဦးအတွက် ဘွတ်ကင် (RES-2026-015) ဝင်ရောက်လာပြီ',
      readAt: null, createdAt: '2026-07-17T08:15:00',
      meta: { reservationId: 'RES-2026-015' }
    },
    {
      id: 'sn-03', type: 'booking_cancelled',
      title: 'Booking Cancelled by Guest',
      title_mm: 'ဧည့်သည်မှ ဘွတ်ကင် ဖျက်သိမ်းလိုက်ပြီ',
      body: 'ကိုမျိုးထွဋ် cancelled their reservation (RES-2026-014) for Jul 16 at 8:00 PM. (4 guests)',
      body_mm: 'ကိုမျိုးထွဋ် မှ ဇူလိုင် ၁၆ ညနေ ၈:၀၀ ဘွတ်ကင် (RES-2026-014) ကို ဖျက်သိမ်းလိုက်ပြီ (ဧည့်သည် ၄ ဦး)',
      readAt: null, createdAt: '2026-07-16T18:44:00',
      meta: { reservationId: 'RES-2026-014' }
    },
    {
      id: 'sn-04', type: 'booking_confirmed',
      title: 'Booking Auto-Confirmed',
      title_mm: 'ဘွတ်ကင် အလိုအလျောက် အတည်ပြုပြီ',
      body: 'Reservation (RES-2026-013) for မမြတ်သူဇာ (3 guests, Jul 15 at 7:30 PM) has been auto-confirmed.',
      body_mm: 'မမြတ်သူဇာ ၏ ဘွတ်ကင် (RES-2026-013) ဧည့်သည် ၃ ဦး ဇူလိုင် ၁၅ ညနေ ၇:၃၀ သည် အလိုအလျောက် အတည်ပြုပြီ',
      readAt: '2026-07-15T14:00:00', createdAt: '2026-07-15T12:00:00',
      meta: { reservationId: 'RES-2026-013' }
    },
    {
      id: 'sn-05', type: 'booking_reminder',
      title: 'Tomorrow\'s Booking Reminder',
      title_mm: 'မနက်ဖြန် ဘွတ်ကင် သတိပေးချက်',
      body: 'You have 5 reservations tomorrow (Jul 16). Earliest booking is ဦးကျော်ဇေယျ at 12:00 PM.',
      body_mm: 'မနက်ဖြန် (ဇူလိုင် ၁၆) ဘွတ်ကင် ၅ ခု ရှိပါသည်။ အစောဆုံး ဦးကျော်ဇေယျ နေ့လည် ၁၂:၀၀',
      readAt: '2026-07-15T08:00:00', createdAt: '2026-07-15T07:00:00',
      meta: {}
    },
    {
      id: 'sn-06', type: 'shop_new_booking',
      title: 'New Booking Received',
      title_mm: 'ဘွတ်ကင်အသစ် ရောက်ရှိနေပြီ',
      body: 'ဒေါ်ဝင်းမြဝင်း made a reservation (RES-2026-012) for 6 guests on Jul 20 at 6:00 PM. VIP table requested.',
      body_mm: 'ဒေါ်ဝင်းမြဝင်း မှ ဇူလိုင် ၂၀ ညနေ ၆:၀၀ ဧည့်သည် ၆ ဦး (VIP ဆောင် တောင်းဆို) ဘွတ်ကင် (RES-2026-012) ဝင်ရောက်လာပြီ',
      readAt: '2026-07-14T20:00:00', createdAt: '2026-07-14T19:45:00',
      meta: { reservationId: 'RES-2026-012' }
    },

    // --- Billing & Reports ---
    {
      id: 'sn-07', type: 'monthly_report',
      title: 'June 2026 Monthly Report Ready',
      title_mm: '၂၀၂၆ ဇွန်လ လစဉ်အစီရင်ခံစာ ထွက်ရှိပြီ',
      body: 'Your June 2026 performance report is ready. Total revenue: 4,250,000 MMK. Booking count: 87.',
      body_mm: '၂၀၂၆ ဇွန်လ စွမ်းဆောင်ရည်အစီရင်ခံစာ ထွက်ရှိပြီ။ စုစုပေါင်းဝင်ငွေ ၄,၂၅၀,၀၀၀ ကျပ်။ ဘွတ်ကင် ၈၇ ခု',
      readAt: null, createdAt: '2026-07-01T09:00:00',
      meta: {}
    },
    {
      id: 'sn-08', type: 'invoice_issued',
      title: 'Invoice Issued — July 2026',
      title_mm: 'ပြေစာ ထုတ်ပေးပြီ — ၂၀၂၆ ဇူလိုင်',
      body: 'Invoice #INV-2026-07 for 100,000 MMK (Core Plan) has been issued. Due: Jul 31, 2026.',
      body_mm: 'ပြေစာ #INV-2026-07 ၁၀၀,၀၀၀ ကျပ် (Core Plan) ထုတ်ပေးပြီ။ ပေးဆပ်ရမည့်ရက်: ဇူလိုင် ၃၁',
      readAt: null, createdAt: '2026-07-01T08:30:00',
      meta: {}
    },
    {
      id: 'sn-09', type: 'payout_completed',
      title: 'Payout Completed',
      title_mm: 'ငွေပေးချေမှု ပြီးစီးပြီ',
      body: 'Payout of 3,825,000 MMK (June earnings after 10% commission) has been transferred to your KBZPay account.',
      body_mm: 'ဇွန်လဝင်ငွေ ကော်မရှင် ၁၀% နုတ်ပြီး ၃,၈၂၅,၀၀၀ ကျပ် သင့် KBZPay အကောင့်သို့ လွှဲပြောင်းပြီး',
      readAt: '2026-07-05T14:00:00', createdAt: '2026-07-05T13:30:00',
      meta: {}
    },

    // --- Reviews ---
    {
      id: 'sn-10', type: 'review_new',
      title: 'New Customer Review (★★★★★)',
      title_mm: 'ဧည့်သည် သုံးသပ်ချက်အသစ် (★★★★★)',
      body: 'ဦးကျော်ဇေယျ left a 5-star review: "Outstanding service and ambiance. Will definitely return!"',
      body_mm: 'ဦးကျော်ဇေယျ မှ ★★★★★ သုံးသပ်ချက်: "ဝန်ဆောင်မှုနှင့် ပတ်ဝန်းကျင် ကောင်းလှပါ၏"',
      readAt: null, createdAt: '2026-07-16T21:00:00',
      meta: {}
    },
    {
      id: 'sn-11', type: 'review_new',
      title: 'New Customer Review (★★★)',
      title_mm: 'ဧည့်သည် သုံးသပ်ချက်အသစ် (★★★)',
      body: 'ဒေါ်ဖြူဖြူ left a 3-star review: "Food was good but service was a bit slow."',
      body_mm: 'ဒေါ်ဖြူဖြူ မှ ★★★ သုံးသပ်ချက်: "အစားအစာ ကောင်းပေမယ့် ဝန်ဆောင်မှု နည်းနည်းနှေး"',
      readAt: '2026-07-15T10:00:00', createdAt: '2026-07-14T19:30:00',
      meta: {}
    },

    // --- System ---
    {
      id: 'sn-12', type: 'system_maintenance',
      title: 'Scheduled Maintenance — Jul 25',
      title_mm: 'စီစဉ်ထားသော ပြုပြင်ထိန်းသိမ်းမှု — ဇူလိုင် ၂၅',
      body: 'EzBookNow will undergo scheduled maintenance on Jul 25, 2026 from 2:00–4:00 AM MMT. Some features may be temporarily unavailable.',
      body_mm: '၂၀၂၆ ဇူလိုင် ၂၅ မနက် ၂:၀၀–၄:၀၀ (MMT) ပြုပြင်ထိန်းသိမ်းမှု ပြုလုပ်မည်။ ဝန်ဆောင်မှုအချို့ ယာယီ ရပ်ဆိုင်းသွားနိုင်ပါသည်',
      readAt: null, createdAt: '2026-07-13T09:00:00',
      meta: {}
    },
    {
      id: 'sn-13', type: 'feature_update',
      title: 'New Feature: S-20 Notification Center',
      title_mm: 'လုပ်ဆောင်ချက်အသစ်: S-20 အကြောင်းကြားစာ ဗဟိုဌာန',
      body: 'The Shop Notification Center (S-20) is now available in your dashboard. Manage all booking, billing, and review alerts in one place.',
      body_mm: 'ဆိုင် အကြောင်းကြားစာ ဗဟိုဌာန (S-20) ကို dashboard မှ ဝင်ရောက်နိုင်ပြီ။ ဘွတ်ကင်၊ ငွေကြေးနှင့် သုံးသပ်ချက် အကြောင်းကြားချက်များ တစ်နေရာတည်းမှ စီမံပါ',
      readAt: null, createdAt: '2026-07-17T07:00:00',
      meta: {}
    },
    {
      id: 'sn-14', type: 'announcement',
      title: 'System Announcement from EzBookNow',
      title_mm: 'EzBookNow မှ စနစ်ကြေညာချက်',
      body: 'Ramadan special booking hours support is now available. Enable extended hours in your Availability settings.',
      body_mm: 'ရမ်ဇာန် အထူးဘွတ်ကင်အချိန်ဆိုင်ရာ ပံ့ပိုးမှု ရရှိနိုင်ပြီ။ Availability ဆက်တင်တွင် ချဲ့ထွင်ထားသောအချိန်ကို ဖွင့်ပါ',
      readAt: '2026-07-10T10:00:00', createdAt: '2026-07-10T08:00:00',
      meta: {}
    },
  ];

  // === Coupons ===
  const coupons = [
    { id: 'c1', code: 'WELCOME20', name: 'Welcome Discount', name_mm: 'ကြိုဆိုလျှော့ဈေး', type: 'percentage', value: 20, minOrder: 20000, validUntil: '2026-08-31', claimed: false },
    { id: 'c2', code: 'LUNCH10', name: 'Lunch Special', name_mm: 'နေ့လည်စာအထူး', type: 'percentage', value: 10, minOrder: 10000, validUntil: '2026-07-31', claimed: true },
    { id: 'c3', code: 'BDAY5000', name: 'Birthday Treat', name_mm: 'မွေးနေ့လက်ဆောင်', type: 'fixed', value: 5000, minOrder: 15000, validUntil: '2026-12-31', claimed: false }
  ];

  // === Waitlist ===
  const waitlistEntries = [
    { id: 'wl-1', shopId: 'r1', shopName: 'The Glass Pavilion', date: '2026-07-22', timeSlot: '19:00', guests: 4, status: 'waiting', createdAt: '2026-07-14' },
    { id: 'wl-2', shopId: 'r5', shopName: 'Lakeview Terrace', date: '2026-07-25', timeSlot: '20:00', guests: 2, status: 'notified', claimExpiry: '2026-07-15T23:59:00', createdAt: '2026-07-12' }
  ];

  // === Announcements ===
  const announcements = [
    { id: 'ann-1', title: 'System Maintenance Notice', title_mm: 'စနစ်ပြုပြင်ထိန်းသိမ်းမှုအကြောင်းကြားစာ', body: 'EzBookNow will undergo scheduled maintenance on July 25, 2026 from 2:00 AM to 4:00 AM MMT. During this time, the platform may be temporarily unavailable.', body_mm: 'EzBookNow ကို ၂၀၂၆ ခုနှစ် ဇူလိုင်လ ၂၅ ရက်နေ့ မနက် ၂ နာရီမှ ၄ နာရီ (MMT) အထိ စီစဉ်ထားသော ပြုပြင်ထိန်းသိမ်းမှု ပြုလုပ်ပါမည်။', date: '2026-07-10' },
    { id: 'ann-2', title: 'New Feature: Waitlist Now Available', title_mm: 'လုပ်ဆောင်ချက်အသစ်: စောင့်ဆိုင်းစာရင်းရရှိနိုင်ပါပြီ', body: 'You can now join waitlists for fully booked restaurants. When a spot opens up, you will be notified immediately.', body_mm: 'ကြိုတင်မှာယူမှုပြည့်သော စားသောက်ဆိုင်များတွင် စောင့်ဆိုင်းစာရင်းဝင်နိုင်ပါပြီ။ နေရာလွတ်ရှိလာပါက ချက်ခြင်းအကြောင်းကြားပါမည်။', date: '2026-07-01' }
  ];

  // === Admin — Shop Applications ===
  const shopApplications = [
    { id: 'app-1', shopName: 'Monsoon Restaurant', shopName_mm: 'မွန်ဆွန်း စားသောက်ဆိုင်', area: 'Yangon', applicant: 'Ko Htet', email: 'kohtet@monsoon.com', phone: '+95 9 888 111 222', status: 'pending', submittedAt: '2026-07-14T10:00:00' },
    { id: 'app-2', shopName: 'Blue Mountain Coffee', shopName_mm: 'ဘလူးတောင်ကော်ဖီ', area: 'Mandalay', applicant: 'Ma Thin', email: 'mathin@bmc.com', phone: '+95 9 888 333 444', status: 'pending', submittedAt: '2026-07-13T14:00:00' },
    { id: 'app-3', shopName: 'River Breeze Restaurant', shopName_mm: 'မြစ်လေညှင်းစားသောက်ဆိုင်', area: 'Yangon', applicant: 'U Win', email: 'uwin@riverbreeze.com', phone: '+95 9 888 555 666', status: 'rejected', submittedAt: '2026-07-10T09:00:00' }
  ];

  // === Admin — Users ===
  const adminUsers = [
    { id: 'usr-1', name: 'ဦးကျော်ဇေယျ', email: 'alex@example.com', phone: '+95 9 123 456 789', status: 'active', registeredAt: '2026-01-15', lastLogin: '2026-07-15T08:30:00', auth_provider: 'email', no_show_count: 0, active_bookings: 2 },
    { id: 'usr-2', name: 'May Thet Hnin', email: 'maythet@gmail.com', phone: '+95 9 234 567 890', status: 'active', registeredAt: '2026-02-20', lastLogin: '2026-07-14T19:00:00', auth_provider: 'google', no_show_count: 1, active_bookings: 0 },
    { id: 'usr-3', name: 'Ko Zaw', email: 'kozaw@outlook.com', phone: '+95 9 345 678 901', status: 'suspended', registeredAt: '2026-03-10', lastLogin: '2026-06-01T12:00:00', auth_provider: 'email', no_show_count: 5, active_bookings: 0, suspend_reason: 'Frequent no-shows (5 times without prior notice)' },
    { id: 'usr-4', name: 'Su Su Lwin', email: 'susu@yahoo.com', phone: '+95 9 456 789 012', status: 'active', registeredAt: '2026-04-05', lastLogin: '2026-07-15T07:45:00', auth_provider: 'facebook', no_show_count: 0, active_bookings: 3 },
    { id: 'usr-5', name: 'Thiha Aung', email: 'thiha@gmail.com', phone: '+95 9 567 890 123', status: 'active', registeredAt: '2026-05-12', lastLogin: '2026-07-13T22:15:00', auth_provider: 'email', no_show_count: 2, active_bookings: 1 },
    { id: 'usr-6', name: 'Nandar Htay', email: 'nandar@outlook.com', phone: '+95 9 678 901 234', status: 'active', registeredAt: '2026-06-01', lastLogin: '2026-07-15T10:00:00', auth_provider: 'google', no_show_count: 0, active_bookings: 0 },
    { id: 'usr-7', name: 'Kyaw Swar', email: 'kyawswar@gmail.com', phone: '+95 9 789 012 345', status: 'deleted', registeredAt: '2026-01-20', lastLogin: '2026-05-10T14:00:00', auth_provider: 'email', no_show_count: 3, active_bookings: 0, deleted_at: '2026-06-15T09:00:00' },
    { id: 'usr-8', name: 'Htet Myat', email: 'htetmyat@yahoo.com', phone: '+95 9 890 123 456', status: 'active', registeredAt: '2026-03-25', lastLogin: '2026-07-12T18:30:00', auth_provider: 'facebook', no_show_count: 1, active_bookings: 1 }
  ];

  // === Admin — Audit Log ===
  const auditLogs = [
    {
      id: 'OPLOG-20260715-001',
      created_at: '2026-07-15T14:24:00',
      partition_name: 'operation_logs_y2026m07',
      actor_type: 'super_admin',
      actor_id: 'op-1',
      actor_name: 'ဒေါ်ဖြူဖြူသန်း',
      action: 'payout_processed',
      target_type: 'shops',
      target_id: 'r1',
      target_name: 'The Glass Pavilion (#44892)',
      request_id: 'req_9f8a7b6c5d4e',
      ip_address: '203.81.72.10',
      user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/126.0.0.0',
      status: 'completed',
      type: 'payout_processed',
      operator: 'ဒေါ်ဖြူဖြူသန်း',
      target: 'The Glass Pavilion (#44892)',
      timestamp: '2026-07-15T14:24:00',
      request_body: {
        shop_id: 'r1',
        shop_name: 'The Glass Pavilion',
        payout_amount_mmk: 4500000,
        bank_account: 'CB Bank **** 8821',
        payout_reference: 'PAY-2026-0715-992',
        approval_flow: {
          checked_by: 'Min Thu (Operator)',
          approved_by: 'ဒေါ်ဖြူဖြူသန်း (Super Admin)',
          compliance_passed: true
        }
      }
    },
    {
      id: 'OPLOG-20260715-002',
      created_at: '2026-07-15T11:05:00',
      partition_name: 'operation_logs_y2026m07',
      actor_type: 'operator',
      actor_id: 'op-2',
      actor_name: 'Min Thu',
      action: 'approve_shop',
      target_type: 'shops',
      target_id: 'app-1',
      target_name: 'Monsoon Restaurant (app-1)',
      request_id: 'req_3a4b5c6d7e8f',
      ip_address: '203.81.72.11',
      user_agent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
      status: 'completed',
      type: 'approve_shop',
      operator: 'Min Thu',
      target: 'Monsoon Restaurant (app-1)',
      timestamp: '2026-07-15T11:05:00',
      request_body: {
        application_id: 'app-1',
        shop_name: 'Monsoon Restaurant',
        applicant_name: 'Ko Htet',
        license_number: 'YGN-REST-2026-88',
        assigned_plan: 'Growth',
        commission_rate: '8%',
        approved_at: '2026-07-15T11:05:00Z'
      }
    },
    {
      id: 'OPLOG-20260714-003',
      created_at: '2026-07-14T16:30:00',
      partition_name: 'operation_logs_y2026m07',
      actor_type: 'system',
      actor_id: 'sys-cron',
      actor_name: 'System Worker',
      action: 'suspend_user',
      target_type: 'users',
      target_id: 'usr-3',
      target_name: 'Ko Zaw (usr-3)',
      request_id: 'req_8b9c0d1e2f3a',
      ip_address: '10.0.4.12',
      user_agent: 'EzBookNow-Worker/2.4.0 (Linux x86_64)',
      status: 'completed',
      type: 'suspend_user',
      operator: 'System Worker',
      target: 'Ko Zaw (usr-3)',
      timestamp: '2026-07-14T16:30:00',
      request_body: {
        user_id: 'usr-3',
        user_name: 'Ko Zaw',
        trigger_rule: 'NFR-AUTO-SUSPEND-05',
        no_show_count: 5,
        recent_no_shows: ['RES-2026-031', 'RES-2026-044', 'RES-2026-049', 'RES-2026-052', 'RES-2026-060'],
        action_taken: 'Account suspended for 30 days',
        notify_user_sent: true
      }
    },
    {
      id: 'OPLOG-20260714-004',
      created_at: '2026-07-14T10:00:00',
      partition_name: 'operation_logs_y2026m07',
      actor_type: 'super_admin',
      actor_id: 'op-1',
      actor_name: 'ဒေါ်ဖြူဖြူသန်း',
      action: 'refund_booking',
      target_type: 'refunds',
      target_id: 'RES-2026-099',
      target_name: 'Reservation: RES-2026-099',
      request_id: 'req_7e8f9a0b1c2d',
      ip_address: '203.81.72.10',
      user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/126.0.0.0',
      status: 'completed',
      type: 'refund_booking',
      operator: 'ဒေါ်ဖြူဖြူသန်း',
      target: 'Reservation: RES-2026-099',
      timestamp: '2026-07-14T10:00:00',
      request_body: {
        reservation_id: 'RES-2026-099',
        refund_id: 'ref-1',
        amount_mmk: 45000,
        gateway: 'KPay Instant Refund API',
        reason: 'Customer cancelled > 24 hours prior to booking time',
        gateway_transaction_id: 'KP-REF-20260714-9981'
      }
    },
    {
      id: 'OPLOG-20260713-005',
      created_at: '2026-07-13T09:15:00',
      partition_name: 'operation_logs_y2026m07',
      actor_type: 'operator',
      actor_id: 'op-3',
      actor_name: 'Phyu Phyu',
      action: 'update_master',
      target_type: 'master',
      target_id: 'area-04',
      target_name: 'Area: New Mandalay Zone',
      request_id: 'req_4d5e6f7a8b9c',
      ip_address: '103.25.241.88',
      user_agent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)',
      status: 'completed',
      type: 'update_master',
      operator: 'Phyu Phyu',
      target: 'Area: New Mandalay Zone',
      timestamp: '2026-07-13T09:15:00',
      request_body: {
        master_table: 'mst_areas',
        target_code: 'MDY-NEW-04',
        changes: {
          name_mm: { old: 'မန္တလေး တောင်ပိုင်း', new: 'မန္တလေး မြို့သစ်ဇုန်' },
          delivery_charge_mmk: { old: 1500, new: 2000 }
        }
      }
    },
    {
      id: 'OPLOG-20260712-006',
      created_at: '2026-07-12T08:30:00',
      partition_name: 'operation_logs_y2026m07',
      actor_type: 'super_admin',
      actor_id: 'op-1',
      actor_name: 'ဒေါ်ဖြူဖြူသန်း',
      action: 'export_rpt10',
      target_type: 'reports',
      target_id: 'RPT-10',
      target_name: 'RPT-10 Operation Log CSV',
      request_id: 'req_1a2b3c4d5e6f',
      ip_address: '203.81.72.10',
      user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/126.0.0.0',
      status: 'completed',
      type: 'export_rpt10',
      operator: 'ဒေါ်ဖြူဖြူသန်း',
      target: 'RPT-10 Operation Log CSV',
      timestamp: '2026-07-12T08:30:00',
      request_body: {
        report_code: 'RPT-10',
        report_name: 'Audit Trail Operation Log Export',
        filter_date_start: '2026-07-01',
        filter_date_end: '2026-07-12',
        actor_filter: 'all',
        total_rows_exported: 1240,
        async_job_id: 'JOB-RPT10-20260712-09',
        audit_note: 'Audit the Auditor: Export recorded in operation_logs per PDPA security policy.'
      }
    },
    {
      id: 'OPLOG-20260625-007',
      created_at: '2026-06-25T15:10:00',
      partition_name: 'operation_logs_y2026m06',
      actor_type: 'user',
      actor_id: 'usr-1',
      actor_name: 'ဦးကျော်ဇေယျ',
      action: 'cancel_reservation',
      target_type: 'reservations',
      target_id: 'RES-2026-050',
      target_name: 'Sakura Garden (#RES-2026-050)',
      request_id: 'req_5e6f7a8b9c0d',
      ip_address: '103.81.75.12',
      user_agent: 'EzBookNow-iOSApp/3.1.0 (iPhone 15 Pro)',
      status: 'completed',
      type: 'cancel_reservation',
      operator: 'ဦးကျော်ဇေယျ',
      target: 'Sakura Garden (#RES-2026-050)',
      timestamp: '2026-06-25T15:10:00',
      request_body: {
        reservation_id: 'RES-2026-050',
        shop_id: 'r3',
        guests: 4,
        cancel_reason: 'Schedule conflict',
        cancellation_fee_applied: 0
      }
    },
    {
      id: 'OPLOG-20260518-008',
      created_at: '2026-05-18T10:00:00',
      partition_name: 'operation_logs_y2026m05',
      actor_type: 'system',
      actor_id: 'bat-10',
      actor_name: 'BAT-10 Archiver',
      action: 'archive_logs',
      target_type: 'system',
      target_id: 'operation_logs_y2023m05',
      target_name: 'Partition: operation_logs_y2023m05',
      request_id: 'req_6f7a8b9c0d1e',
      ip_address: '10.0.4.10',
      user_agent: 'EzBookNow-BatchRunner/1.0.0',
      status: 'completed',
      type: 'archive_logs',
      operator: 'BAT-10 Archiver',
      target: 'Partition: operation_logs_y2023m05',
      timestamp: '2026-05-18T10:00:00',
      request_body: {
        batch_job: 'BAT-10',
        action: 'cold_storage_archive_and_prune',
        target_partition: 'operation_logs_y2023m05',
        archived_rows: 542910,
        destination_bucket: 's3://ezbooknow-audit-archive-bucket/2023/m05.parquet',
        pruned_from_db: true,
        execution_time_seconds: 142.5
      }
    }
  ];

  // === Admin — Operators ===
  const operators = [
    { id: 'op-1', name: 'ဒေါ်ဖြူဖြူသန်း', email: 'phyuphyuthan@ezbooknow.com', role: 'super_admin', status: 'active', createdAt: '2025-06-01', lastLogin: '2026-07-15T09:00:00' },
    { id: 'op-2', name: 'Min Thu', email: 'minthu@ezbooknow.com', role: 'operator', status: 'active', createdAt: '2025-08-15', lastLogin: '2026-07-15T08:30:00' },
    { id: 'op-3', name: 'Phyu Phyu', email: 'phyuphyu@ezbooknow.com', role: 'operator', status: 'active', createdAt: '2026-01-10', lastLogin: '2026-07-14T18:00:00' }
  ];

  // === Plans ===
  const plans = [
    { code: 'core', name: 'Core', name_mm: 'Core', price_mmk: 50000, price_usd: null, max_menus: 20, max_staff: 3, features: { online_booking: true, manual_booking: true, basic_dashboard: true, coupons: false, analytics: false, online_payment: false, reviews: false, crm: false, viber_broadcast: false, sns: false, loyalty: false }, sort_order: 1, is_active: true, created_at: '2026-01-01', updated_at: '2026-01-01' },
    { code: 'growth', name: 'Growth', name_mm: 'Growth', price_mmk: 100000, price_usd: null, max_menus: 50, max_staff: 10, features: { online_booking: true, manual_booking: true, basic_dashboard: true, coupons: true, analytics: true, online_payment: true, reviews: true, crm: false, viber_broadcast: false, sns: false, loyalty: false }, sort_order: 2, is_active: true, created_at: '2026-01-01', updated_at: '2026-01-01' },
    { code: 'enterprise', name: 'Enterprise', name_mm: 'Enterprise', price_mmk: 200000, price_usd: null, max_menus: 999, max_staff: 999, features: { online_booking: true, manual_booking: true, basic_dashboard: true, coupons: true, analytics: true, online_payment: true, reviews: true, crm: true, viber_broadcast: true, sns: true, loyalty: true }, sort_order: 3, is_active: true, created_at: '2026-01-01', updated_at: '2026-01-01' }
  ];

  // === Time Slots ===
  function getTimeSlots() {
    return {
      lunch: [
        { time: '11:30 AM', available: 4 },
        { time: '12:00 PM', available: 2 },
        { time: '12:30 PM', available: 0 },
        { time: '1:00 PM', available: 3 },
        { time: '1:30 PM', available: 5 },
        { time: '2:00 PM', available: 1 }
      ],
      dinner: [
        { time: '6:00 PM', available: 6 },
        { time: '6:30 PM', available: 3 },
        { time: '7:00 PM', available: 2 },
        { time: '7:30 PM', available: 4 },
        { time: '8:00 PM', available: 1 },
        { time: '8:30 PM', available: 0 },
        { time: '9:00 PM', available: 2 },
        { time: '9:30 PM', available: 5 },
        { time: '10:00 PM', available: 0 }
      ]
    };
  }

  // === Business Hours ===
  const businessHours = [
    { day: 'monday', open: '10:00', close: '22:00', lastOrder: '21:00', isOpen: true },
    { day: 'tuesday', open: '10:00', close: '22:00', lastOrder: '21:00', isOpen: true },
    { day: 'wednesday', open: '10:00', close: '22:00', lastOrder: '21:00', isOpen: true },
    { day: 'thursday', open: '10:00', close: '22:00', lastOrder: '21:00', isOpen: true },
    { day: 'friday', open: '10:00', close: '23:00', lastOrder: '22:00', isOpen: true },
    { day: 'saturday', open: '11:00', close: '23:00', lastOrder: '22:00', isOpen: true },
    { day: 'sunday', open: '11:00', close: '21:00', lastOrder: '20:00', isOpen: true }
  ];

  // === Refunds ===
  const refunds = [
    { id: 'ref-1', reservationId: 'RES-2026-050', shopName: 'Sakura Garden', userName: 'Ko Myat', amount: 45000, status: 'requested', requestedAt: '2026-07-14' },
    { id: 'ref-2', reservationId: 'RES-2026-048', shopName: 'Lakeview Terrace', userName: 'Ma Hla', amount: 80000, status: 'approved', requestedAt: '2026-07-13' },
    { id: 'ref-3', reservationId: 'RES-2026-042', shopName: 'The Glass Pavilion', userName: 'U Tin', amount: 120000, status: 'processing', requestedAt: '2026-07-12' }
  ];

  // Helper: format MMK
  function formatMMK(amount) {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' MMK';
  }

  // Helper: format date
  function formatDate(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  }

  // Helper: time ago
  function timeAgo(dateStr) {
    const now = new Date();
    const past = new Date(dateStr);
    const diffMs = now - past;
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 60) return `${diffMins}m ${I18n.t('ago')}`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ${I18n.t('ago')}`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ${I18n.t('ago')}`;
  }

  return {
    restaurants, areas, cuisines, reservations, shopReservations,
    staffMembers, tables, reviews, notifications, shopNotifications, coupons,
    waitlistEntries, announcements, shopApplications, adminUsers,
    auditLogs, operators, plans, refunds, businessHours,
    getTimeSlots, formatMMK, formatDate, timeAgo
  };
})();

if (typeof window !== 'undefined') {
  window.MockData = MockData;
}
