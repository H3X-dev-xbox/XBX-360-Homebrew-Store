/* ═══════════════════════════════════════════════════════════════════
   XBX 360 HOMEBREW STORE — Auto-fetch Latest Release
   Uses the GitHub API to pull the latest release version.
   ═══════════════════════════════════════════════════════════════════ */

(function () {
    'use strict';

    const REPO = 'H3X-dev-xbox/xbx-360-homebrew-store';
    const versionEl = document.querySelector('.latest-version');
    const metaEl = document.querySelector('.latest-meta');

    if (!versionEl) return;

    fetch(`https://api.github.com/repos/${REPO}/releases/latest`)
        .then(r => r.ok ? r.json() : Promise.reject(r.status))
        .then(data => {
            if (data.tag_name) versionEl.textContent = data.tag_name;
            if (metaEl && data.published_at) {
                const date = new Date(data.published_at).toLocaleDateString('en-GB', {
                    year: 'numeric', month: 'short', day: 'numeric'
                });
                metaEl.innerHTML = `<strong>${data.name || 'Latest Release'}</strong> · Released ${date}`;
            }
        })
        .catch(() => {
            /* Silent fail — page falls back to static content */
        });

})();
