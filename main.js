/**
 * Dexcarte - Shared JavaScript
 * Mobile menu, language switcher, cookie consent, lazy loading, and feather icons
 */

document.addEventListener('DOMContentLoaded', () => {
    // ─── Mobile menu toggle ──────────────────────────────────────────────────
    const mobileMenuButton = document.getElementById('mobileMenuButton');
    const mobileMenu = document.getElementById('mobileMenu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
            mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
            if (mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.remove('hidden');
                setTimeout(() => {
                    mobileMenu.classList.remove('-translate-y-2', 'opacity-0');
                    mobileMenu.classList.add('translate-y-0', 'opacity-100');
                }, 10);
            } else {
                mobileMenu.classList.remove('translate-y-0', 'opacity-100');
                mobileMenu.classList.add('-translate-y-2', 'opacity-0');
                setTimeout(() => {
                    mobileMenu.classList.add('hidden');
                }, 300);
            }
            if (typeof feather !== 'undefined') feather.replace();
        });

        document.addEventListener('click', (e) => {
            if (!mobileMenu.contains(e.target) && !mobileMenuButton.contains(e.target)) {
                if (!mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.remove('translate-y-0', 'opacity-100');
                    mobileMenu.classList.add('-translate-y-2', 'opacity-0');
                    setTimeout(() => { mobileMenu.classList.add('hidden'); }, 300);
                    mobileMenuButton.setAttribute('aria-expanded', 'false');
                }
            }
        });
    }

    // ─── Language switcher ───────────────────────────────────────────────────
    function getBrowserLang() {
        const lang = navigator.language || navigator.userLanguage || 'pt';
        return lang.toLowerCase().startsWith('pt') ? 'pt' : 'en';
    }

    function setI18nText(el, text) {
        if (el.children.length === 0) {
            el.textContent = text;
        } else {
            // preserve icon children, update only text nodes
            const textNodes = [...el.childNodes].filter(n => n.nodeType === Node.TEXT_NODE);
            if (textNodes.length > 0) {
                textNodes[0].textContent = text;
                for (let i = 1; i < textNodes.length; i++) textNodes[i].textContent = '';
            } else {
                el.insertBefore(document.createTextNode(text), el.firstChild);
            }
        }
    }

    function applyTranslations(lang) {
        if (!window.translations || !window.translations[lang]) return;

        const t = window.translations[lang];

        // Text content
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (t[key] !== undefined) setI18nText(el, t[key]);
        });

        // Placeholder attributes
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (t[key] !== undefined) el.setAttribute('placeholder', t[key]);
        });

        // Update html lang attribute
        document.documentElement.lang = lang;

        // Update dropdown label
        const label = document.getElementById('langDropdownLabel');
        if (label) label.textContent = lang.toUpperCase();

        // Update mobile select
        const mobileSelect = document.getElementById('langMobileSelect');
        if (mobileSelect) mobileSelect.value = lang;

        // Highlight active option in dropdown
        document.querySelectorAll('.lang-option').forEach(opt => {
            const isActive = opt.getAttribute('data-lang') === lang;
            opt.classList.toggle('bg-yellow-50', isActive);
            opt.classList.toggle('text-yellow-600', isActive);
            opt.classList.toggle('font-medium', isActive);
        });
    }

    function switchLang(lang) {
        localStorage.setItem('dexcarte-lang', lang);
        applyTranslations(lang);
        // Close dropdown
        const menu = document.getElementById('langDropdownMenu');
        if (menu) menu.classList.add('hidden');
    }

    function initI18n() {
        const saved = localStorage.getItem('dexcarte-lang');
        const lang = saved || getBrowserLang();
        localStorage.setItem('dexcarte-lang', lang);
        applyTranslations(lang);

        // Desktop dropdown toggle
        const dropBtn = document.getElementById('langDropdownBtn');
        const dropMenu = document.getElementById('langDropdownMenu');
        if (dropBtn && dropMenu) {
            dropBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                dropMenu.classList.toggle('hidden');
                dropBtn.setAttribute('aria-expanded', !dropMenu.classList.contains('hidden'));
            });

            // Close dropdown on click outside
            document.addEventListener('click', (e) => {
                if (!dropBtn.contains(e.target) && !dropMenu.contains(e.target)) {
                    dropMenu.classList.add('hidden');
                    dropBtn.setAttribute('aria-expanded', 'false');
                }
            });
        }

        // Desktop dropdown options
        document.querySelectorAll('.lang-option').forEach(opt => {
            opt.addEventListener('click', () => {
                const lang = opt.getAttribute('data-lang');
                switchLang(lang);
            });
        });

        // Mobile select
        const mobileSelect = document.getElementById('langMobileSelect');
        if (mobileSelect) {
            mobileSelect.value = lang;
            mobileSelect.addEventListener('change', () => {
                switchLang(mobileSelect.value);
            });
        }
    }

    // Init i18n after translations are available (i18n.js loads before main.js)
    initI18n();

    // ─── Cookie consent ──────────────────────────────────────────────────────
    const cookieConsent = document.getElementById('cookieConsent');
    const cookieAccept = document.getElementById('cookieAccept');
    const cookieDeny = document.getElementById('cookieDeny');

    if (cookieConsent && cookieAccept && cookieDeny) {
        if (!localStorage.getItem('cookieConsent')) {
            setTimeout(() => {
                cookieConsent.classList.remove('hidden');
                setTimeout(() => { cookieConsent.classList.remove('translate-y-full'); }, 100);
            }, 1000);
        }

        cookieAccept.addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'accepted');
            cookieConsent.classList.add('translate-y-full');
            setTimeout(() => { cookieConsent.classList.add('hidden'); }, 300);
        });

        cookieDeny.addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'denied');
            cookieConsent.classList.add('translate-y-full');
            setTimeout(() => { cookieConsent.classList.add('hidden'); }, 300);
        });
    }

    // ─── Lazy loading ────────────────────────────────────────────────────────
    const lazyImages = document.querySelectorAll('.lazy-load');
    if (lazyImages.length > 0) {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('lazy-loaded');
                        imageObserver.unobserve(entry.target);
                    }
                });
            });
            lazyImages.forEach(img => imageObserver.observe(img));
        } else {
            lazyImages.forEach(img => img.classList.add('lazy-loaded'));
        }
    }

    // ─── Feather icons ───────────────────────────────────────────────────────
    if (typeof feather !== 'undefined') {
        feather.replace();
    }
});
