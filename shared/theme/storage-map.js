/* ============================================================
   EzBookNow Shared Storage Map — shared/theme/storage-map.js
   Canonical list of localStorage keys used by all apps.
   This is a CONTRACT — naming conventions shared across the
   User, Shop, and Admin apps. Apps never read each other's keys.
   ============================================================ */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.StorageMap = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  const StorageMap = {
    // App-scoped namespaces
    user: {
      prefix: 'ezu_',
      theme: 'ezu_theme',
      lang: 'ezu_lang',
      session: 'ezu_session',
      bookings: 'ezu_bookings',
      points: 'ezu_points'
    },
    shop: {
      prefix: 'ezs_',
      theme: 'ezs_theme',
      lang: 'ezs_lang',
      session: 'ezs_session',
      bookings: 'ezs_bookings',
      shopMeta: 'ezs_shop_meta',
      pendingQueue: 'ezs_pending_queue',
      tables: 'ezs_tables',
      coupons: 'ezs_coupons'
    },
    admin: {
      prefix: 'eza_',
      theme: 'eza_theme',
      lang: 'eza_lang',
      session: 'eza_session',
      operators: 'eza_operators',
      auditLog: 'eza_audit_log',
      masterCodes: 'eza_master_codes'
    },
    // Deliberate cross-app handoff: bookings created by the User App
    // are mirrored here so the Shop App can simulate seeing them.
    // This is the single future "API boundary".
    shared: {
      bookings: 'ezb_bookings'
    },
    // Booking draft (User App, survives refresh within a tab)
    session: {
      bookingDate: 'booking_date',
      bookingTime: 'booking_time',
      bookingGuests: 'booking_guests',
      bookingName: 'booking_name',
      bookingPhone: 'booking_phone',
      bookingEmail: 'booking_email',
      bookingPayment: 'booking_payment',
      bookingStatus: 'booking_status',
      lastBookingId: 'last_booking_id'
    }
  };

  return StorageMap;
});