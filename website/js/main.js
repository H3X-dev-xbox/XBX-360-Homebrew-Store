/* ═══════════════════════════════════════════════════════════════════
   XBX 360 HOMEBREW STORE — Main JavaScript
   ═══════════════════════════════════════════════════════════════════ */

(function () {
    'use strict';

    /* ─── Header shrink on scroll ─── */
    const header = document.getElementById('header');
    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 40);
        }, { passive: true });
    }

    /* ─── Mobile nav toggle ─── */
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            const open = navLinks.classList.toggle('open');
            navToggle.setAttribute('aria-expanded', open);
            navToggle.textContent = open ? '✕' : '☰';
        });
        navLinks.querySelectorAll('a').forEach(l => {
            l.addEventListener('click', () => {
                navLinks.classList.remove('open');
                navToggle.textContent = '☰';
            });
        });
    }

    /* ─── Scroll reveal ─── */
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    /* ─── FAQ accordion ─── */
    document.querySelectorAll('.faq-q').forEach(btn => {
        btn.addEventListener('click', () => {
            const item = btn.closest('.faq-item');
            const isOpen = item.classList.contains('open');
            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
            if (!isOpen) item.classList.add('open');
        });
    });

    /* ─── Feature card glow ─── */
    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            card.style.setProperty('--mouse-x', x + '%');
            card.style.setProperty('--mouse-y', y + '%');
        });
    });

    /* ─── Cursor glow ─── */
    const cursorGlow = document.getElementById('cursorGlow');
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (!isTouch && cursorGlow) {
        let mx = window.innerWidth / 2, my = window.innerHeight / 2;
        let gx = mx, gy = my;
        document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
        (function loop() {
            gx += (mx - gx) * 0.08;
            gy += (my - gy) * 0.08;
            cursorGlow.style.transform = `translate(${gx}px, ${gy}px) translate(-50%, -50%)`;
            requestAnimationFrame(loop);
        })();
    }

    /* ─── Copy buttons ─── */
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            const text = btn.getAttribute('data-copy');
            try {
                await navigator.clipboard.writeText(text);
                btn.textContent = 'Copied!';
                btn.classList.add('copied');
                setTimeout(() => { btn.textContent = 'Copy'; btn.classList.remove('copied'); }, 1800);
            } catch (e) { /* silent */ }
        });
    });

    /* ─── Smooth anchor scroll ─── */
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', function (e) {
            const id = this.getAttribute('href');
            if (id.length < 2) return;
            const target = document.querySelector(id);
            if (!target) return;
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

})();
