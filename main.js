/**
 * Dexcarte - Shared JavaScript
 * Mobile menu, cookie consent, lazy loading, and feather icons initialization
 */

document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
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

        // Close on click outside
        document.addEventListener('click', (e) => {
            if (!mobileMenu.contains(e.target) && !mobileMenuButton.contains(e.target)) {
                if (!mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.remove('translate-y-0', 'opacity-100');
                    mobileMenu.classList.add('-translate-y-2', 'opacity-0');
                    setTimeout(() => {
                        mobileMenu.classList.add('hidden');
                    }, 300);
                    mobileMenuButton.setAttribute('aria-expanded', 'false');
                }
            }
        });
    }

    // Cookie consent
    const cookieConsent = document.getElementById('cookieConsent');
    const cookieAccept = document.getElementById('cookieAccept');
    const cookieDeny = document.getElementById('cookieDeny');

    if (cookieConsent && cookieAccept && cookieDeny) {
        if (!localStorage.getItem('cookieConsent')) {
            setTimeout(() => {
                cookieConsent.classList.remove('hidden');
                setTimeout(() => {
                    cookieConsent.classList.remove('translate-y-full');
                }, 100);
            }, 1000);
        }

        cookieAccept.addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'accepted');
            cookieConsent.classList.add('translate-y-full');
            setTimeout(() => {
                cookieConsent.classList.add('hidden');
            }, 300);
        });

        cookieDeny.addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'denied');
            cookieConsent.classList.add('translate-y-full');
            setTimeout(() => {
                cookieConsent.classList.add('hidden');
            }, 300);
        });
    }

    // Lazy loading for images
    const lazyImages = document.querySelectorAll('.lazy-load');

    if (lazyImages.length > 0) {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.classList.add('lazy-loaded');
                        imageObserver.unobserve(img);
                    }
                });
            });
            lazyImages.forEach(img => imageObserver.observe(img));
        } else {
            lazyImages.forEach(img => img.classList.add('lazy-loaded'));
        }
    }

    // Initialize feather icons if available
    if (typeof feather !== 'undefined') {
        feather.replace();
    }
});
