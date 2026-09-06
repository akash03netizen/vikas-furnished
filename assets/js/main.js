/**
 * Vikas Furnished — Main JavaScript
 * Handles: mobile nav, sticky header, scroll reveal, back-to-top,
 * product gallery, smooth interactions, and form validation.
 */

(function () {
    'use strict';

    // ----------------------------------------------------------------------
    // 1. Mobile Navigation Toggle
    // ----------------------------------------------------------------------
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function () {
            const isOpen = mainNav.classList.toggle('open');
            menuToggle.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', isOpen);
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });

        // Close menu when clicking a nav link
        mainNav.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                mainNav.classList.remove('open');
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });

        // Close menu on outside click
        document.addEventListener('click', function (e) {
            if (!mainNav.contains(e.target) && !menuToggle.contains(e.target) && mainNav.classList.contains('open')) {
                mainNav.classList.remove('open');
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });

        // Close on Escape
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && mainNav.classList.contains('open')) {
                mainNav.classList.remove('open');
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
    }

    // ----------------------------------------------------------------------
    // 2. Sticky Header Shadow
    // ----------------------------------------------------------------------
    const header = document.getElementById('siteHeader');
    if (header) {
        let ticking = false;
        window.addEventListener('scroll', function () {
            if (!ticking) {
                requestAnimationFrame(function () {
                    header.classList.toggle('scrolled', window.scrollY > 20);
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    // ----------------------------------------------------------------------
    // 3. Scroll Reveal Animations
    // ----------------------------------------------------------------------
    const revealElements = document.querySelectorAll('.reveal');

    if ('IntersectionObserver' in window && revealElements.length > 0) {
        const revealObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

        revealElements.forEach(function (el) { revealObserver.observe(el); });
    } else {
        // Fallback: show all
        revealElements.forEach(function (el) { el.classList.add('visible'); });
    }

    // ----------------------------------------------------------------------
    // 4. Back to Top Button
    // ----------------------------------------------------------------------
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        let tickingBT = false;
        window.addEventListener('scroll', function () {
            if (!tickingBT) {
                requestAnimationFrame(function () {
                    backToTop.classList.toggle('visible', window.scrollY > 600);
                    tickingBT = false;
                });
                tickingBT = true;
            }
        });

        backToTop.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ----------------------------------------------------------------------
    // 5. Product Gallery (Product Detail Page)
    // ----------------------------------------------------------------------
    const mainImage = document.getElementById('mainProductImage');
    const thumbs = document.querySelectorAll('.product-thumb');

    if (mainImage && thumbs.length > 0) {
        thumbs.forEach(function (thumb) {
            thumb.addEventListener('click', function () {
                const newSrc = this.getAttribute('data-image');
                if (newSrc) {
                    mainImage.src = newSrc;
                    mainImage.alt = this.getAttribute('data-alt') || '';
                }
                thumbs.forEach(function (t) { t.classList.remove('active'); });
                this.classList.add('active');
            });
        });
    }

    // ----------------------------------------------------------------------
    // 6. Quantity Selector
    // ----------------------------------------------------------------------
    document.querySelectorAll('.qty-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
            const input = this.parentElement.querySelector('.qty-input');
            if (!input) return;
            let val = parseInt(input.value, 10) || 1;
            if (this.dataset.action === 'increase') val++;
            else val = Math.max(1, val - 1);
            input.value = val;
        });
    });

    // ----------------------------------------------------------------------
    // 7. Contact Form Validation
    // ----------------------------------------------------------------------
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            var name = contactForm.querySelector('[name="name"]');
            var email = contactForm.querySelector('[name="email"]');
            var message = contactForm.querySelector('[name="message"]');
            var errors = [];

            if (!name || !name.value.trim()) errors.push('Please enter your name.');
            if (!email || !email.value.trim()) {
                errors.push('Please enter your email.');
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
                errors.push('Please enter a valid email address.');
            }
            if (!message || !message.value.trim()) errors.push('Please enter your message.');

            var msgEl = document.getElementById('formMessage');
            if (!msgEl) {
                msgEl = document.createElement('div');
                msgEl.id = 'formMessage';
                contactForm.insertBefore(msgEl, contactForm.firstChild);
            }

            if (errors.length > 0) {
                msgEl.className = 'form-message error';
                msgEl.innerHTML = errors.join('<br>');
                return;
            }

            msgEl.className = 'form-message success';
            msgEl.textContent = 'Thank you! Your message has been received. We will get back to you within 24 hours.';
            contactForm.reset();
        });
    }

    // ----------------------------------------------------------------------
    // 8. Smooth Anchor Scrolling
    // ----------------------------------------------------------------------
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var target = this.getAttribute('href');
            if (target === '#' || target === '') return;
            var el = document.querySelector(target);
            if (el) {
                e.preventDefault();
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ----------------------------------------------------------------------
    // 9. Active filter highlight (Products page)
    // ----------------------------------------------------------------------
    const urlParams = new URLSearchParams(window.location.search);
    const activeCategory = urlParams.get('category');
    if (activeCategory) {
        document.querySelectorAll('.filter-list a').forEach(function (link) {
            var href = link.getAttribute('href') || '';
            if (href.includes('category=' + activeCategory)) {
                link.classList.add('active');
            }
        });
    }

})();
