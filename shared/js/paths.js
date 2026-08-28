/* ============================================================
   EzBookNow Paths — shared/js/paths.js
   Host-agnostic asset-path helper. The prototype must work when
   opened directly from disk (file://) AND when served over HTTP,
   from the Hub (repo root) and from the three app shells that
   live one level down (user/, shop/, admin/).

   Exposes:
     Paths.root   — '../' from an app shell, '' from the Hub root
     Paths.image  — full relative URL for an image in shared/images/
   ============================================================ */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.Paths = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  function detectRootPrefix() {
    try {
      const dir = (window.location.pathname || '/').replace(/[^/]*$/, '');
      return /(^|\/)(user|shop|admin)\/$/.test(dir) ? '../' : '';
    } catch (e) {
      return '';
    }
  }

  const rootPrefix = detectRootPrefix();

  return {
    root: rootPrefix,
    image: function (name) {
      return rootPrefix + 'shared/images/' + String(name || '');
    }
  };
});
