/* ============================================
   DARMONA BUGFIX JS - v1.1 - 2026
   ============================================ */

// Auto-update copyright jaar naar huidig jaar
document.addEventListener('DOMContentLoaded', function() {
    const year = new Date().getFullYear();
    document.querySelectorAll('.footer-bottom p, [class*="footer-bottom"] p').forEach(function(el) {
        el.innerHTML = el.innerHTML.replace(/© \d{4}/, '© ' + year);
    });
    // Ook inline footer tekst updaten
    document.querySelectorAll('footer p').forEach(function(el) {
        if (el.textContent.includes('Alle rechten voorbehouden')) {
            el.innerHTML = el.innerHTML.replace(/© \d{4}/, '© ' + year);
        }
    });
});
