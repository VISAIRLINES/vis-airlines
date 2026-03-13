/* ============================================
   VIS AIRLINES — Wspólny JavaScript
   Nawigacja, animacje scroll, utilities
   ============================================ */

// === NAWIGACJA — efekt scroll ===
(function initNav() {
    const nav = document.querySelector('.nav');
    if (!nav) return;

    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const y = window.scrollY;

        // Klasa .scrolled po 60px
        if (y > 60) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        lastScroll = y;
    }, { passive: true });
})();


// === AKTYWNY LINK w nawigacji ===
(function initActiveLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const links = document.querySelectorAll('.nav-link');

    links.forEach(link => {
        const href = link.getAttribute('href');
        if (href && (href === currentPage || (currentPage === '' && href === 'index.html'))) {
            link.classList.add('active');
        }
    });
})();


// === SCROLL REVEAL — animacja elementów przy scroll ===
(function initReveal() {
    const elements = document.querySelectorAll('.reveal');
    if (elements.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px'
    });

    elements.forEach(el => observer.observe(el));
})();


// === SMOOTH SCROLL do sekcji ===
document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a[href^="#"]');
    if (!anchor) return;

    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
});


// === UTILITY: formatowanie liczb ===
function formatPrice(num) {
    return num.toLocaleString('pl-PL');
}

// === UTILITY: obecny rok do stopki ===
(function initYear() {
    const el = document.getElementById('footer-year');
    if (el) el.textContent = new Date().getFullYear();
})();
