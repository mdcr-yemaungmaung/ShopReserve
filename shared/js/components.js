/* ============================================================
   EzBookNow Components — Shared UI Component Factories
   ============================================================ */

var Components = (() => {
  // === SVG Icons (inline, consistent style) ===
  const icons = {
    home: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>',
    search: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
    calendar: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>',
    bell: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>',
    user: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
    users: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    settings: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
    logout: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>',
    menu: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>',
    x: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
    chevronLeft: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>',
    chevronRight: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>',
    chevronDown: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>',
    star: '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
    starEmpty: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
    heart: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',
    heartFilled: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',
    mapPin: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
    clock: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>',
    phone: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
    plus: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>',
    minus: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>',
    check: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
    alertCircle: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',
    info: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>',
    upload: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/></svg>',
    download: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>',
    filter: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>',
    grid: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>',
    list: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>',
    map: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></svg>',
    eye: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
    eyeOff: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>',
    shield: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
    utensils: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/></svg>',
    clipboard: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>',
    barChart: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>',
    store: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>',
    creditCard: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>',
    tag: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>',
    globe: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>',
    lock: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
    mail: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>',
    image: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>',
    moreVertical: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/></svg>',
    arrowRight: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>',
    qrCode: '<svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor"><path d="M3 3h8v8H3V3zm2 2v4h4V5H5zm8-2h8v8h-8V3zm2 2v4h4V5h-4zM3 13h8v8H3v-8zm2 2v4h4v-4H5zm13-2h3v2h-3v-2zm-5 0h2v3h-2v-3zm2 3h3v2h-3v-2zm3 2v3h-3v-3h3zm-5 0h2v3h-2v-3z"/></svg>',
    facebook: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>',
    trending: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>',
    dollarSign: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>',
    fileText: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>',
    messageSquare: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
    award: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>',
    share: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>',
    externalLink: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>',
    target: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>',
    send: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>',
    refresh: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>',
  };

  function icon(name, size) {
    const svg = icons[name] || '';
    if (size) {
      return svg.replace(/width="20"/, `width="${size}"`).replace(/height="20"/, `height="${size}"`);
    }
    return svg;
  }

  // === Language Switcher ===
  function langSwitcher() {
    const lang = I18n.getLang();
    return `<div class="lang-switcher">
      <button class="lang-switcher__btn ${lang === 'en' ? 'active' : ''}" onclick="I18n.setLang('en'); App.render();">${I18n.t('lang_en')}</button>
      <button class="lang-switcher__btn ${lang === 'mm' ? 'active' : ''}" onclick="I18n.setLang('mm'); App.render();">${I18n.t('lang_mm')}</button>
    </div>`;
  }

  // === Global SEV1 Emergency Announcement Banner (Point 3 of Spec) ===
  function globalEmergencyBanner() {
    const activeSev1 = (typeof MockData !== 'undefined' && MockData.announcements) ? 
      MockData.announcements.find(a => a.severity === 'SEV1_CRITICAL' && a.is_published) : null;

    if (!activeSev1) return '';

    const lang = I18n.getLang();
    const title = lang === 'mm' && activeSev1.title_mm ? activeSev1.title_mm : activeSev1.title;
    const body = lang === 'mm' && activeSev1.body_mm ? activeSev1.body_mm : activeSev1.body;

    return `
      <div style="background:linear-gradient(135deg, #ef4444 0%, #dc2626 100%); color:white; padding:10px 16px; font-size:12.5px; font-weight:700; font-family:'Inter', sans-serif; display:flex; align-items:center; justify-content:center; gap:10px; box-shadow:0 4px 14px rgba(239,68,68,0.25); cursor:pointer; width:100%; text-align:center; position:sticky; top:0; z-index:9999;" onclick="Router.navigate('/user/announcements')">
        <span style="font-size:16px;">🚨</span>
        <span><strong>[SEV1 CRITICAL SYSTEM NOTICE]</strong> ${title}: ${body}</span>
        <span style="text-decoration:underline; font-size:11.5px; opacity:0.95; margin-left:6px;">${lang === 'mm' ? 'U-19 တွင် အသေးစိတ် ကြည့်မည် →' : 'View Details in U-19 →'}</span>
      </div>
    `;
  }

  // === User Header ===
  function userHeader() {
    const auth = Router.getAuth();
    const lang = I18n.getLang();
    const userNotifs = (typeof MockData !== 'undefined' && MockData.notifications) ? MockData.notifications : [];
    const unreadCount = userNotifs.filter(n => !n.readAt).length;

    return `
      ${globalEmergencyBanner()}
      <header class="user-header" id="user-header">
      <a class="user-header__logo" onclick="Router.navigate('/user/home')">${I18n.t('app_name')}</a>
      <div class="user-header__search hide-mobile">
        <span class="search-icon">${icon('search', 16)}</span>
        <input type="text" placeholder="${I18n.t('search_placeholder')}" onfocus="Router.navigate('/user/search')" id="header-search">
      </div>
      <div class="user-header__actions">
        ${langSwitcher()}
        ${auth.isLoggedIn ? `
          <div class="dropdown">
            <button class="header-btn" onclick="this.parentElement.querySelector('.dropdown__menu').classList.toggle('open')" title="${I18n.t('menu_notifications')}">
              ${icon('bell')}
              ${unreadCount > 0 ? `<span class="notification-badge">${unreadCount}</span>` : ''}
            </button>
            <div class="dropdown__menu dropdown__menu--right dropdown__menu--notifications">
              <div class="dropdown-notif-header">
                <span class="dropdown-notif-title">${I18n.t('menu_notifications')}</span>
                ${unreadCount > 0 ? `<button class="btn btn-ghost btn-xs text-primary" style="font-size:11px;padding:2px 6px;" onclick="MockData.notifications.forEach(n=>n.readAt=new Date().toISOString()); App.render();">${lang === 'mm' ? 'အားလုံးဖတ်ပြီး' : 'Mark all read'}</button>` : ''}
              </div>
              <div class="dropdown-notif-list">
                ${userNotifs.length === 0 ? `
                  <div style="padding:20px;text-align:center;color:var(--color-outline);font-size:13px;">${lang === 'mm' ? 'အကြောင်းကြားချက် မရှိပါ' : 'No notifications'}</div>
                ` : userNotifs.slice(0, 5).map(n => `
                  <div class="dropdown-notif-item ${!n.readAt ? 'unread' : ''}" onclick="Router.navigate('/user/notifications');">
                    <div style="flex:1;">
                      <div class="dropdown-notif-item__title">${lang === 'mm' ? (n.title_mm || n.title) : n.title}</div>
                      <div class="dropdown-notif-item__body">${lang === 'mm' ? (n.body_mm || n.body) : n.body}</div>
                      <div class="dropdown-notif-item__time">${MockData.timeAgo ? MockData.timeAgo(n.createdAt) : n.createdAt}</div>
                    </div>
                  </div>
                `).join('')}
              </div>
              <div class="dropdown-notif-footer">
                <button onclick="Router.navigate('/user/notifications');">${lang === 'mm' ? 'အကြောင်းကြားချက်အားလုံး ကြည့်မည် →' : 'View all notifications →'}</button>
              </div>
            </div>
          </div>
          <div class="dropdown">
            <div class="user-header__avatar" onclick="this.parentElement.querySelector('.dropdown__menu').classList.toggle('open')">
              ${auth.name.charAt(0)}
            </div>
            <div class="dropdown__menu" id="user-dropdown">
              <div style="padding:8px 12px;font-weight:600;font-size:14px;">${auth.name}</div>
              <div style="padding:2px 12px 8px;font-size:12px;color:var(--color-outline);">${auth.email}</div>
              <div class="dropdown__divider"></div>
              <button class="dropdown__item" onclick="Router.navigate('/user/mypage')">${icon('user')} ${I18n.t('my_page')}</button>
              <button class="dropdown__item" onclick="Router.navigate('/user/account-settings')">${icon('settings')} ${I18n.t('settings')}</button>
              <div class="dropdown__divider"></div>
              <button class="dropdown__item" onclick="Router.authState.user.isLoggedIn = false; Router.authState.user.isGuestBooking = false; sessionStorage.clear(); showToast('info', 'Logged Out', 'Successfully logged out.'); App.render(); Router.navigate('/user/login');">${icon('logout')} ${I18n.t('logout')}</button>
            </div>
          </div>
        ` : `
          <button class="btn btn-ghost btn-sm hide-mobile" onclick="Router.navigate('/user/login')">${I18n.t('login')}</button>
          <button class="btn btn-primary btn-sm hide-mobile" onclick="Router.navigate('/user/register')" style="white-space:nowrap;padding:6px 10px;font-size:12px;">${I18n.t('register')}</button>
          <button class="header-btn hide-desktop" onclick="Router.navigate('/user/login')" title="${I18n.t('login')}">${icon('user')}</button>
        `}
      </div>
    </header>`;
  }

  // === User Mobile Nav ===
  function userMobileNav() {
    const route = window.location.hash.slice(1);
    const items = [
      { key: 'home', icon: 'home', label: I18n.t('home'), path: '/user/home' },
      { key: 'search', icon: 'search', label: I18n.t('search_nav'), path: '/user/search' },
      { key: 'bookings', icon: 'calendar', label: I18n.t('bookings'), path: '/user/mypage' },
      { key: 'alerts', icon: 'bell', label: I18n.t('alerts'), path: '/user/notifications', badge: true }
    ];
    return `<nav class="user-mobile-nav">
      <div class="user-mobile-nav__items">
        ${items.map(item => `
          <a class="user-mobile-nav__item ${route.includes(item.key) || (item.key === 'home' && route === '/user/home') ? 'active' : ''}" onclick="Router.navigate('${item.path}')">
            <span class="nav-icon">${icon(item.icon)}</span>
            <span>${item.label}</span>
            ${item.badge ? '<span class="nav-badge"></span>' : ''}
          </a>
        `).join('')}
      </div>
    </nav>`;
  }

  // === User Footer ===
  function userFooter() {
    return `<footer class="user-footer">
      <div class="user-footer__grid">
        <div class="user-footer__col">
          <h4>${I18n.t('app_name')}</h4>
          <a href="#">${I18n.t('footer_about')}</a>
          <a href="#">${I18n.t('footer_contact')}</a>
          <a href="#">${I18n.t('footer_terms')}</a>
          <a href="#">${I18n.t('footer_privacy')}</a>
        </div>
        <div class="user-footer__col">
          <h4>${I18n.t('footer_for_restaurants')}</h4>
          <a onclick="Router.navigate('/shop/application')">${I18n.t('footer_partner')}</a>
          <a onclick="Router.navigate('/shop/login')">${I18n.t('shop_admin')}</a>
        </div>
        <div class="user-footer__col">
          <h4>${I18n.t('footer_support')}</h4>
          <a href="#">${I18n.t('footer_help')}</a>
          <a href="#">${I18n.t('footer_faq')}</a>
        </div>
        <div class="user-footer__col">
          <h4>${I18n.t('categories')}</h4>
          <a href="#">${I18n.t('fine_dining')}</a>
          <a href="#">${I18n.t('casual_dining')}</a>
        </div>
      </div>
      <div class="user-footer__bottom">${I18n.t('footer_copyright')}</div>
    </footer>`;
  }

  // === Admin Sidebar ===
  function adminSidebar(portal) {
    const route = window.location.hash.slice(1);
    const auth = Router.getAuth();

    let menuItems = [];
    let brandName = '';
    let brandSub = '';

    if (portal === 'shop') {
      brandName = I18n.t('app_name');
      brandSub = auth.shopName || I18n.t('shop_portal');
      menuItems = [
        { section: null, items: [
          { icon: 'home', label: I18n.t('sidebar_dashboard'), path: '/shop/dashboard' },
          { icon: 'calendar', label: I18n.t('sidebar_booking_ledger'), path: '/shop/ledger' },
          { icon: 'plus', label: I18n.t('sidebar_manual_booking'), path: '/shop/manual-booking' },
        ]},
        { section: 'SETTINGS', items: [
          { icon: 'clock', label: I18n.t('sidebar_availability'), path: '/shop/availability' },
          { icon: 'store', label: I18n.t('sidebar_shop_info'), path: '/shop/shop-info' },
          { icon: 'users', label: I18n.t('sidebar_staff_tables'), path: '/shop/staff-tables' },
        ]},
        { section: 'GROWTH', items: [
          { icon: 'tag', label: I18n.t('sidebar_coupons'), path: '/shop/coupons' },
          { icon: 'barChart', label: I18n.t('sidebar_analytics'), path: '/shop/analytics' },
          { icon: 'messageSquare', label: I18n.t('sidebar_reviews'), path: '/shop/reviews' },
          { icon: 'bell', label: I18n.t('sidebar_shop_notifications'), path: '/shop/notifications', badge: MockData.shopNotifications.filter(n => !n.readAt).length || null },
          { icon: 'creditCard', label: I18n.t('sidebar_billing'), path: '/shop/billing' },
        ]},
        { section: 'ENTERPRISE', items: [
          { icon: 'users', label: I18n.t('sidebar_customers'), path: '/shop/customers' },
          { icon: 'send', label: I18n.t('sidebar_follow_up'), path: '/shop/follow-up' },
          { icon: 'send', label: I18n.t('sidebar_viber'), path: '/shop/viber-broadcast' },
          { icon: 'globe', label: I18n.t('sidebar_sns'), path: '/shop/sns' },
          { icon: 'award', label: I18n.t('sidebar_loyalty'), path: '/shop/loyalty' },
        ]},
        { section: null, items: [
          { icon: 'lock', label: I18n.t('sidebar_security'), path: '/shop/security' },
        ]}
      ];
    } else {
      brandName = I18n.t('app_name');
      brandSub = I18n.t('system_operator');
      const pendingCount = MockData.shopApplications.filter(a => a.status === 'pending').length;
      menuItems = [
        { section: null, items: [
          { icon: 'home', label: I18n.t('sidebar_dashboard'), path: '/admin/dashboard' },
        ]},
        { section: 'CORE', items: [
          { icon: 'store', label: I18n.t('sidebar_shop_approvals'), path: '/admin/shop-review', badge: pendingCount },
          { icon: 'users', label: I18n.t('sidebar_users'), path: '/admin/users' },
          { icon: 'barChart', label: I18n.t('sidebar_reports'), path: '/admin/reports' },
          { icon: 'fileText', label: I18n.t('sidebar_audit_log'), path: '/admin/audit-log' },
        ]},
        { section: 'GROWTH', items: [
          { icon: 'tag', label: I18n.t('sidebar_coupons'), path: '/admin/coupons' },
          { icon: 'creditCard', label: I18n.t('sidebar_billing_plans'), path: '/admin/billing' },
          { icon: 'send', label: I18n.t('sidebar_announcements'), path: '/admin/announcements' },
          { icon: 'dollarSign', label: I18n.t('sidebar_refunds'), path: '/admin/refunds' },
          { icon: 'target', label: I18n.t('sidebar_ranking'), path: '/admin/ranking' },
        ]},
        { section: 'ADMIN', items: [
          { icon: 'users', label: I18n.t('sidebar_operators'), path: '/admin/operators' },
          { icon: 'grid', label: I18n.t('sidebar_master'), path: '/admin/master' },
        ]},
        { section: 'ENTERPRISE', items: [
          { icon: 'fileText', label: I18n.t('sidebar_invoices'), path: '/admin/invoices' },
          { icon: 'barChart', label: I18n.t('sidebar_access_analytics'), path: '/admin/analytics' },
          { icon: 'award', label: I18n.t('sidebar_points'), path: '/admin/points' },
        ]}
      ];
    }

    return `<aside class="admin-sidebar" id="admin-sidebar">
      <div class="admin-sidebar__brand" style="display:flex; align-items:center; justify-content:space-between; gap:12px;">
        <div style="flex:1; min-width:0;">
          <div class="admin-sidebar__brand-logo" style="white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${brandName}</div>
          <div class="admin-sidebar__brand-sub" style="white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${brandSub}</div>
        </div>
        <button class="admin-sidebar__close-btn" onclick="Components.closeSidebar()" title="Close Menu" style="background:#1E293B; border:1px solid #334155; color:#94A3B8; cursor:pointer; width:32px; height:32px; border-radius:8px; display:flex; align-items:center; justify-content:center; transition:all 0.15s; flex-shrink:0;">
          ${icon('x', 16)}
        </button>
      </div>
      <nav class="admin-sidebar__nav">
        ${menuItems.map(group => `
          ${group.section ? `<div class="admin-sidebar__section-title">${group.section}</div>` : ''}
          ${group.items.map(item => `
            <a class="admin-sidebar__item ${route === item.path ? 'active' : ''}" onclick="Router.navigate('${item.path}'); Components.closeSidebar();">
              <span class="nav-icon">${icon(item.icon)}</span>
              <span>${item.label}</span>
              ${item.badge ? `<span class="nav-badge">${item.badge}</span>` : ''}
            </a>
          `).join('')}
        `).join('')}
      </nav>
      <div class="admin-sidebar__footer">
        <a class="admin-sidebar__item" onclick="Router.navigate('/${portal}/login'); Components.closeSidebar();">
          <span class="nav-icon">${icon('logout')}</span>
          <span>${I18n.t('logout')}</span>
        </a>
      </div>
    </aside>`;
  }

  // === Admin Header ===
  function adminHeader(title, portal) {
    const auth = Router.getAuth();
    const lang = I18n.getLang();
    const shopNotifs = (typeof MockData !== 'undefined' && MockData.shopNotifications) ? MockData.shopNotifications : [];
    const unreadCount = shopNotifs.filter(n => !n.readAt).length;
    const hubTitle = portal === 'admin' ? 'Operations Hub' : 'Merchant Hub';

    return `
      ${globalEmergencyBanner()}
      <header class="admin-header">
      <div class="admin-header__left">
        <button class="admin-header__hamburger" onclick="Components.toggleSidebar()" title="Toggle Navigation Menu">
          ${icon('menu')}
        </button>
        <div class="admin-header__brand-title">${hubTitle}</div>
        <div class="admin-header__search-container">
          <span class="admin-header__search-icon">${icon('search')}</span>
          <input type="text" class="admin-header__search-input" placeholder="Search..." onkeydown="Components.handleHeaderSearch(event, this)" id="header-search-input" />
        </div>
      </div>
      <div class="admin-header__right">
        ${portal === 'admin' ? `
          <span class="badge badge--info" style="font-size:11px;">● ${I18n.t('ip_address')}: ${auth.ip}</span>
          <span class="badge badge--success" style="font-size:11px;">● ${I18n.t('twofa_enabled')}</span>
        ` : ''}
        ${langSwitcher()}
        <div class="dropdown">
          <button class="header-btn" onclick="this.parentElement.querySelector('.dropdown__menu').classList.toggle('open')" title="${I18n.t('menu_notifications')}">
            ${icon('bell')}
            ${unreadCount > 0 ? `<span class="notification-badge">${unreadCount}</span>` : ''}
          </button>
          <div class="dropdown__menu dropdown__menu--right dropdown__menu--notifications">
            <div class="dropdown-notif-header">
              <span class="dropdown-notif-title">${I18n.t('menu_notifications')}</span>
              ${unreadCount > 0 ? `<button class="btn btn-ghost btn-xs text-primary" style="font-size:11px;padding:2px 6px;" onclick="MockData.shopNotifications.forEach(n=>n.readAt=new Date().toISOString()); App.render();">${lang === 'mm' ? 'အားလုံးဖတ်ပြီး' : 'Mark all read'}</button>` : ''}
            </div>
            <div class="dropdown-notif-list">
              ${shopNotifs.length === 0 ? `
                <div style="padding:20px;text-align:center;color:var(--color-outline);font-size:13px;">${lang === 'mm' ? 'အကြောင်းကြားချက် မရှိပါ' : 'No notifications'}</div>
              ` : shopNotifs.slice(0, 5).map(n => `
                <div class="dropdown-notif-item ${!n.readAt ? 'unread' : ''}" onclick="Router.navigate('/shop/notifications');">
                  <div style="flex:1;">
                    <div class="dropdown-notif-item__title">${lang === 'mm' ? (n.title_mm || n.title) : n.title}</div>
                    <div class="dropdown-notif-item__body">${lang === 'mm' ? (n.body_mm || n.body) : n.body}</div>
                    <div class="dropdown-notif-item__time">${MockData.timeAgo ? MockData.timeAgo(n.createdAt) : n.createdAt}</div>
                  </div>
                </div>
              `).join('')}
            </div>
            <div class="dropdown-notif-footer">
              <button onclick="Router.navigate('/shop/notifications');">${lang === 'mm' ? 'အကြောင်းကြားချက်အားလုံး ကြည့်မည် →' : 'View all notifications →'}</button>
            </div>
          </div>
        </div>
        <div class="dropdown">
          <div class="user-header__avatar" onclick="this.parentElement.querySelector('.dropdown__menu').classList.toggle('open')">
            ${auth.name.charAt(0)}
          </div>
          <div class="dropdown__menu">
            <div style="padding:8px 12px;font-weight:600;font-size:14px;">${auth.name}</div>
            <div style="padding:2px 12px 8px;font-size:12px;color:var(--color-outline);">${auth.role}</div>
            <div class="dropdown__divider"></div>
            <button class="dropdown__item" onclick="Router.navigate('/${portal}/security')">${icon('lock')} ${I18n.t('security_settings')}</button>
            <button class="dropdown__item" onclick="Router.navigate('/${portal}/login')">${icon('logout')} ${I18n.t('logout')}</button>
          </div>
        </div>
      </div>
    </header>`;
  }

  // === Sidebar Toggle ===
  function toggleSidebar() {
    const sidebar = document.getElementById('admin-sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    if (sidebar) sidebar.classList.toggle('open');
    if (overlay) overlay.classList.toggle('active');
  }

  function closeSidebar() {
    const sidebar = document.getElementById('admin-sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    if (sidebar) sidebar.classList.remove('open');
    if (overlay) overlay.classList.remove('active');
  }

  // Global keydown handler for Escape key closing drawer
  if (typeof window !== 'undefined' && !window._sidebarEscapeBound) {
    window._sidebarEscapeBound = true;
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeSidebar();
      }
    });
  }

  // === Status Badge ===
  function statusBadge(status) {
    const statusMap = {
      confirmed: 'confirmed', active: 'active', completed: 'completed', success: 'success',
      pending: 'pending', waiting: 'waiting',
      cancelled: 'cancelled', rejected: 'rejected', error: 'error',
      no_show: 'no-show', 'no-show': 'no-show',
      checked_in: 'checked-in', 'checked-in': 'checked-in',
      expired: 'expired',
      notified: 'notified',
      reviewing: 'reviewing',
      paid: 'success', unpaid: 'pending', overdue: 'error',
      requested: 'pending', approved: 'confirmed', processing: 'info',
      suspended: 'cancelled',
      pending_sync: 'pending',
      sync_conflict: 'error'
    };
    const key = `status_${status}`;
    const label = I18n.t(key) !== key ? I18n.t(key) : status.charAt(0).toUpperCase() + status.slice(1).replace(/_/g, ' ');
    return `<span class="badge badge--${statusMap[status] || 'info'}"><span class="badge-dot"></span> ${label}</span>`;
  }

  // === Star Rating Display ===
  function starRating(rating, interactive = false) {
    let html = '<div class="star-rating' + (interactive ? '' : ' star-rating--readonly') + '">';
    for (let i = 1; i <= 5; i++) {
      html += `<span class="star-rating__star ${i <= rating ? 'filled' : ''}" ${interactive ? `onclick="setRating(${i})"` : ''}>★</span>`;
    }
    html += '</div>';
    return html;
  }

  // === Empty State ===
  function emptyState(iconName, title, desc, action) {
    return `<div class="empty-state animate-fade-in">
      <div class="empty-state__icon">${icon(iconName, 48) || '📭'}</div>
      <h3 class="empty-state__title">${title}</h3>
      <p class="empty-state__desc">${desc}</p>
      ${action ? `<button class="btn btn-primary" onclick="${action.onclick}">${action.label}</button>` : ''}
    </div>`;
  }

  // === Loading Skeleton ===
  function skeleton(type = 'card', count = 3) {
    if (type === 'card') {
      return Array(count).fill('').map(() =>
        `<div class="card" style="padding:0;overflow:hidden;">
          <div class="skeleton" style="height:180px;border-radius:0;"></div>
          <div style="padding:16px;">
            <div class="skeleton skeleton--title"></div>
            <div class="skeleton skeleton--text" style="width:80%;"></div>
            <div class="skeleton skeleton--text" style="width:60%;"></div>
          </div>
        </div>`
      ).join('');
    }
    if (type === 'table') {
      return Array(count).fill('').map(() =>
        `<tr><td colspan="10"><div class="skeleton skeleton--text" style="margin:8px 0;"></div></td></tr>`
      ).join('');
    }
    return '';
  }

  // === Toast Notification ===
  // (Will be managed by global functions in app.js)

  // === Confirmation Modal ===
  function confirmModal(title, message, onConfirm, confirmLabel, isDanger = false) {
    return `<div class="modal-backdrop" id="confirm-modal" onclick="if(event.target===this)this.remove()">
      <div class="modal modal--sm animate-scale-in">
        <div class="modal__header">
          <h3 class="modal__title">${title}</h3>
          <button class="modal__close" onclick="document.getElementById('confirm-modal').remove()">${icon('x')}</button>
        </div>
        <div class="modal__body">
          <p class="text-body-sm">${message}</p>
        </div>
        <div class="modal__footer">
          <button class="btn btn-ghost" onclick="document.getElementById('confirm-modal').remove()">${I18n.t('cancel')}</button>
          <button class="btn ${isDanger ? 'btn-danger' : 'btn-primary'}" onclick="${onConfirm}; document.getElementById('confirm-modal').remove()">${confirmLabel || I18n.t('confirm')}</button>
        </div>
      </div>
    </div>`;
  }

  // === Restaurant Card ===
  function restaurantCard(restaurant) {
    const lang = I18n.getLang();
    const name = lang === 'mm' ? (restaurant.name_mm || restaurant.name) : restaurant.name;
    const cuisine = lang === 'mm' ? (restaurant.cuisine_mm || restaurant.cuisine) : restaurant.cuisine;
    const area = lang === 'mm' ? (restaurant.area_mm || restaurant.area) : restaurant.area;

    // Calculate Rank dynamically based on rating
    const sorted = [...MockData.restaurants].sort((a, b) => b.rating - a.rating);
    const rankIndex = sorted.findIndex(r => r.id === restaurant.id);
    const rankBadgeHtml = rankIndex !== -1 ? `<span style="font-size:10px; font-weight:700; color:var(--color-primary); background:rgba(19, 21, 70, 0.08); padding:1px 6px; border-radius:4px; margin-left:4px;">Rank #${rankIndex + 1}</span>` : '';

    // Calculate USD price reference (3,000 MMK = 1 USD mock rate)
    const usdPriceRange = restaurant.priceRange.split('-').map(p => {
      const num = parseInt(p.replace(/,/g, '').trim());
      return isNaN(num) ? '' : `$${Math.round(num / 3000)}`;
    }).join(' - ');

    return `<div class="restaurant-card" onclick="Router.navigate('/user/shop/${restaurant.id}')">
      <div class="restaurant-card__image">
        <img src="${restaurant.image}" alt="${name}" loading="lazy" onerror="this.style.display='none'">
        ${restaurant.rating >= 4.5 ? `<span class="restaurant-card__badge">${I18n.t('trending')}</span>` : ''}
        <span class="restaurant-card__fav" onclick="event.stopPropagation();">${icon('heart', 16)}</span>
      </div>
      <div class="restaurant-card__body">
        <div class="restaurant-card__name">${name}</div>
        <div class="restaurant-card__meta">
          <span class="restaurant-card__rating">${icon('star', 14)} ${restaurant.rating}</span>
          <span>(${restaurant.reviewCount})</span>
          <span>·</span>
          <span>${cuisine}</span>
          ${rankBadgeHtml}
        </div>
        <div class="restaurant-card__meta">
          <span>${icon('mapPin', 14)} ${area}</span>
          <span>·</span>
          <span class="restaurant-card__price">${restaurant.priceRange} ${I18n.t('currency')} <span style="font-size:11px;color:var(--color-outline);font-weight:normal;">(${usdPriceRange} USD)</span></span>
        </div>
      </div>
    </div>`;
  }

  // === Page Header ===
  function pageHeader(title, subtitle, actions) {
    return `<div class="page-header ${actions ? 'page-header--row' : ''}">
      <div>
        <h1 class="page-header__title">${title}</h1>
        ${subtitle ? `<p class="page-header__subtitle">${subtitle}</p>` : ''}
      </div>
      ${actions ? `<div class="page-header__actions">${actions}</div>` : ''}
    </div>`;
  }

  // === Data Table ===
  function dataTable(config) {
    const { columns, rows, searchPlaceholder, actions, pagination } = config;
    const rowCount = (rows.match(/<tr/gi) || []).length;
    const showingCount = Math.min(rowCount, 10);
    const showingText = rowCount > 0 ? `1-${showingCount}` : '0';
    const totalPages = Math.ceil(rowCount / 10) || 1;
    let pageButtons = '';
    for (let p = 1; p <= Math.min(totalPages, 5); p++) {
      pageButtons += `<button class="${p === 1 ? 'active' : ''}">${p}</button>`;
    }

    return `<div class="data-table-wrapper">
      <div class="data-table-toolbar">
        <div class="data-table-toolbar__search">
          <span class="search-icon">${icon('search', 14)}</span>
          <input type="text" placeholder="${searchPlaceholder || I18n.t('search') + '...'}">
        </div>
        ${actions || ''}
      </div>
      <div class="data-table-responsive">
        <table class="data-table">
          <thead><tr>${columns.map(col => `<th>${col}</th>`).join('')}</tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>
      ${pagination !== false ? `
      <div class="data-table__pagination">
        <span>${I18n.t('showing')} ${showingText} ${I18n.t('of')} ${rowCount} ${I18n.t('results')}</span>
        <div class="data-table__pagination-btns">
          <button ${totalPages === 1 ? 'disabled' : ''}>${I18n.t('prev')}</button>
          ${pageButtons}
          <button ${totalPages === 1 ? 'disabled' : ''}>${I18n.t('next')}</button>
        </div>
      </div>` : ''}
    </div>`;
  }

  // === KPI Card ===
  function kpiCard(iconName, label, value, trend, trendDirection = 'up', colorClass = 'primary') {
    return `<div class="kpi-card kpi-card--${colorClass}">
      <div class="kpi-card__icon kpi-card__icon--${colorClass}">${icon(iconName)}</div>
      <div class="kpi-card__label">${label}</div>
      <div class="kpi-card__value">${value}</div>
      ${trend ? `<div class="kpi-card__trend kpi-card__trend--${trendDirection}">${trendDirection === 'up' ? '↑' : trendDirection === 'down' ? '↓' : '→'} ${trend}</div>` : ''}
    </div>`;
  }

  // === Myanmar Phone Input Component ===
  function phoneInput(config) {
    const { id, value, placeholder, required, disabled } = config;
    const val = value || '';
    const reqAttr = required ? 'required' : '';
    const disAttr = disabled ? 'disabled' : '';
    const lang = I18n.getLang();
    
    // Help hint text
    const hint = lang === 'mm' 
      ? 'မြန်မာဖုန်းနံပါတ်ကို ၀၉၊ ၉၊ ၉၅၉ သို့မဟုတ် +၉၅၉ ဖြင့် ထည့်သွင်းနိုင်သည်'
      : 'Enter Myanmar number starting with 09, 9, 959, or +959';

    // Normalize display value to standard local format (09xxxxxxxxx) on load
    let displayVal = val.trim().replace(/[\s\-\(\)]/g, '');
    if (displayVal) {
      if (displayVal.startsWith('+959')) {
        displayVal = '09' + displayVal.substring(4);
      } else if (displayVal.startsWith('+95')) {
        displayVal = '0' + displayVal.substring(3);
      } else if (displayVal.startsWith('959')) {
        displayVal = '09' + displayVal.substring(3);
      } else if (displayVal.startsWith('9') && displayVal.length >= 8 && displayVal.length <= 10) {
        displayVal = '0' + displayVal;
      }
    }

    return `
      <div class="phone-input-wrapper" style="position:relative; width:100%;">
        <div style="position:relative; display:flex; align-items:center;">
          <span style="position:absolute; left:12px; font-size:13px; font-weight:600; color:#46464f; display:flex; align-items:center; gap:4px; pointer-events:none; z-index:2;">
            🇲🇲 +95
          </span>
          <input type="tel" class="form-input" id="${id}" value="${displayVal}" placeholder="${placeholder || '09450000000'}" ${reqAttr} ${disAttr} 
                 style="width:100%; height:44px; padding-left:74px; padding-right:14px; font-size:14px; border:1px solid #c7c5d0; border-radius:10px; background:#ffffff; color:#191c1d; outline:none;"
                 oninput="Components.handlePhoneInput(this)">
        </div>
        <div id="${id}-hint" style="font-size:11px; color:#777680; margin-top:4px; line-height:1.3;">
          ${hint}
        </div>
      </div>
    `;
  }

  function handlePhoneInput(el) {
    // Only allow digits, plus sign, hyphens, and spaces
    el.value = el.value.replace(/[^\d\+\-\s]/g, '');
  }

  function getRawPhoneNumber(id) {
    const el = document.getElementById(id);
    if (!el) return '';
    let val = el.value.trim().replace(/[\s\-\(\)]/g, '');
    if (!val) return '';
    
    // Standardize to database format (+95 9 xxxxxxx)
    if (val.startsWith('+959')) {
      return '+95 9 ' + val.substring(4);
    }
    if (val.startsWith('959')) {
      return '+95 9 ' + val.substring(3);
    }
    if (val.startsWith('09')) {
      return '+95 9 ' + val.substring(2);
    }
    if (val.startsWith('9')) {
      return '+95 9 ' + val.substring(1);
    }
    return val;
  }

  function validatePhoneNumber(id) {
    const el = document.getElementById(id);
    if (!el) return false;
    let val = el.value.trim().replace(/[\s\-\(\)]/g, '');
    // Validate if it is a valid Myanmar mobile number (starts with 09, 9, 959, or +959 followed by 7 to 9 digits)
    return /^(\+959|959|09|9)\d{7,9}$/.test(val);
  }

  function handleHeaderSearch(e, inputEl) {
    if (e.key === 'Enter') {
      const q = (inputEl.value || '').trim().toLowerCase();
      if (!q) return;
      if (q.includes('ledger') || q.includes('book') || q.includes('reserv')) {
        Router.navigate('/shop/ledger');
      } else if (q.includes('avail') || q.includes('slot') || q.includes('hour') || q.includes('time')) {
        Router.navigate('/shop/availability');
      } else if (q.includes('dash') || q.includes('home')) {
        Router.navigate('/shop/dashboard');
      } else if (q.includes('staff') || q.includes('account')) {
        Router.navigate('/shop/staff-accounts');
      } else if (q.includes('table') || q.includes('seat')) {
        Router.navigate('/shop/tables');
      } else if (q.includes('crm') || q.includes('custom') || q.includes('guest')) {
        Router.navigate('/shop/customers');
      } else if (q.includes('coupon') || q.includes('promo')) {
        Router.navigate('/shop/coupons');
      } else if (q.includes('notif') || q.includes('alert')) {
        Router.navigate('/shop/notifications');
      } else if (q.includes('analyt') || q.includes('report')) {
        Router.navigate('/shop/analytics');
      } else if (q.includes('review')) {
        Router.navigate('/shop/reviews');
      } else if (q.includes('sett') || q.includes('info')) {
        Router.navigate('/shop/shop-info');
      } else {
        Router.navigate('/shop/ledger');
        setTimeout(() => {
          const filterInput = document.getElementById('s02-search-input');
          if (filterInput) {
            filterInput.value = q;
            filterInput.dispatchEvent(new Event('input'));
          }
        }, 120);
      }
    }
  }

  return {
    icon, icons, langSwitcher, userHeader, userMobileNav, userFooter,
    adminSidebar, adminHeader, toggleSidebar, closeSidebar,
    statusBadge, starRating, emptyState, skeleton, confirmModal,
    restaurantCard, pageHeader, dataTable, kpiCard, phoneInput,
    handlePhoneInput, getRawPhoneNumber, validatePhoneNumber, handleHeaderSearch
  };
})();

// === Global Toast System ===
function showToast(type, title, message) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const iconMap = { success: '✓', error: '✕', warning: '⚠', info: 'ℹ' };
  const toast = document.createElement('div');
  toast.className = `toast toast--${type}`;
  toast.innerHTML = `
    <span class="toast__icon">${iconMap[type] || 'ℹ'}</span>
    <div class="toast__content">
      <div class="toast__title">${title}</div>
      <div class="toast__message">${message}</div>
    </div>
    <button class="toast__close" onclick="this.parentElement.classList.add('removing'); setTimeout(()=>this.parentElement.remove(), 300)">✕</button>
  `;
  container.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('removing');
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// === Global Click Handler (close dropdowns) ===
document.addEventListener('click', (e) => {
  if (!e.target.closest('.dropdown')) {
    document.querySelectorAll('.dropdown__menu.open').forEach(m => m.classList.remove('open'));
  }
});
