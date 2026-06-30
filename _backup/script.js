/* =============================================
   SOBAN.AI — Premium Personal Website
   JavaScript — Interactions, Animations & Logic
   ============================================= */

'use strict';

/* ============================================================
   1. NAVBAR — Scroll behaviour + Mobile menu
   ============================================================ */
(function initNavbar() {
  const navbar    = document.getElementById('navbar');
  const toggle    = document.getElementById('nav-toggle');
  const navLinks  = document.getElementById('nav-links');
  const allLinks  = navLinks.querySelectorAll('.nav-link');

  // Scrolled class
  function onScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Toggle mobile menu
  function openMenu(state) {
    navLinks.classList.toggle('open', state);
    toggle.classList.toggle('open', state);
    toggle.setAttribute('aria-expanded', String(state));
    document.body.style.overflow = state ? 'hidden' : '';
  }

  toggle.addEventListener('click', () => openMenu(!navLinks.classList.contains('open')));

  // Close on link click
  allLinks.forEach(link => link.addEventListener('click', () => openMenu(false)));

  // Close on outside click
  document.addEventListener('click', e => {
    if (navLinks.classList.contains('open') && !navLinks.contains(e.target) && !toggle.contains(e.target)) {
      openMenu(false);
    }
  });

  // Highlight active link on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinkMap = {};
  allLinks.forEach(l => { navLinkMap[l.getAttribute('href')?.replace('#', '')] = l; });

  const linkObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        allLinks.forEach(l => l.classList.remove('active-nav'));
        const active = navLinkMap[entry.target.id];
        if (active) active.classList.add('active-nav');
      }
    });
  }, { rootMargin: '-40% 0px -40% 0px' });

  sections.forEach(s => linkObserver.observe(s));
})();


/* ============================================================
   2. HERO PARTICLE CANVAS
   ============================================================ */
(function initParticles() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let particles = [];
  let animFrame;
  let W, H;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function createParticle() {
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.5 + 0.3,
      alpha: Math.random() * 0.5 + 0.1,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      pulse: Math.random() * Math.PI * 2,
    };
  }

  function init() {
    resize();
    particles = Array.from({ length: 120 }, createParticle);
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    particles.forEach(p => {
      p.pulse += 0.015;
      p.alpha = 0.1 + Math.abs(Math.sin(p.pulse)) * 0.35;
      p.x += p.vx;
      p.y += p.vy;

      // Wrap around edges
      if (p.x < 0) p.x = W;
      if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H;
      if (p.y > H) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(99, 102, 241, ${p.alpha})`;
      ctx.fill();
    });

    // Draw connecting lines for nearby particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(99, 102, 241, ${0.08 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    animFrame = requestAnimationFrame(draw);
  }

  init();
  draw();

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => { resize(); }, 150);
  }, { passive: true });

  // Stop animation when hero out of view (performance)
  const heroSection = document.getElementById('hero');
  if (heroSection) {
    const visObs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (!animFrame) draw();
      } else {
        cancelAnimationFrame(animFrame);
        animFrame = null;
      }
    });
    visObs.observe(heroSection);
  }
})();


/* ============================================================
   3. ANIMATED COUNTER — Hero stats
   ============================================================ */
(function initCounters() {
  const statNums = document.querySelectorAll('.stat-num[data-target]');
  if (!statNums.length) return;

  function animateCount(el, target, duration = 1800) {
    let start = null;
    function step(ts) {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target;
    }
    requestAnimationFrame(step);
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.counted) {
        entry.target.dataset.counted = 'true';
        animateCount(entry.target, parseInt(entry.target.dataset.target, 10));
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNums.forEach(el => observer.observe(el));
})();


/* ============================================================
   4. SCROLL REVEAL — Animate elements into view
   ============================================================ */
(function initScrollReveal() {
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  revealEls.forEach(el => observer.observe(el));
})();


/* ============================================================
   5. SKILL BARS — Animate widths on scroll
   ============================================================ */
(function initSkillBars() {
  const fills = document.querySelectorAll('.skill-fill[data-width]');
  if (!fills.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target;
        fill.style.width = fill.dataset.width + '%';
        observer.unobserve(fill);
      }
    });
  }, { threshold: 0.3 });

  fills.forEach(f => observer.observe(f));
})();


/* ============================================================
   6. PORTFOLIO FILTER
   ============================================================ */
(function initPortfolioFilter() {
  const filterBtns   = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update button states
      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      const filter = btn.dataset.filter;

      projectCards.forEach(card => {
        const category = card.dataset.category;
        const show = filter === 'all' || category === filter;
        if (show) {
          card.style.display = '';
          setTimeout(() => card.classList.remove('hidden-card'), 10);
        } else {
          card.classList.add('hidden-card');
        }
      });
    });
  });
})();


/* ============================================================
   7. TESTIMONIALS CAROUSEL
   ============================================================ */
(function initCarousel() {
  const track    = document.getElementById('testimonials-track');
  const prevBtn  = document.getElementById('testimonial-prev');
  const nextBtn  = document.getElementById('testimonial-next');
  const dotsEl   = document.getElementById('carousel-dots');
  if (!track || !prevBtn || !nextBtn) return;

  const cards = track.querySelectorAll('.testimonial-card');
  const total = cards.length;
  let current = 0;
  let autoTimer = null;

  // Create dots
  cards.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', `Testimonial ${i + 1}`);
    dot.setAttribute('aria-selected', String(i === 0));
    dot.addEventListener('click', () => goTo(i));
    dotsEl.appendChild(dot);
  });

  const dots = dotsEl.querySelectorAll('.dot');

  function goTo(idx) {
    current = (idx + total) % total;
    // Move the track — each card takes full width of the wrapper
    const wrapperWidth = track.parentElement.offsetWidth;
    track.style.transform = `translateX(-${current * wrapperWidth}px)`;
    dots.forEach((d, i) => {
      d.classList.toggle('active', i === current);
      d.setAttribute('aria-selected', String(i === current));
    });
  }

  function goNext() { goTo(current + 1); }
  function goPrev() { goTo(current - 1); }

  nextBtn.addEventListener('click', () => { goNext(); resetAuto(); });
  prevBtn.addEventListener('click', () => { goPrev(); resetAuto(); });

  // Auto-play
  function startAuto() { autoTimer = setInterval(goNext, 5000); }
  function resetAuto()  { clearInterval(autoTimer); startAuto(); }

  startAuto();

  // Keyboard navigation
  track.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft')  { goPrev(); resetAuto(); }
    if (e.key === 'ArrowRight') { goNext(); resetAuto(); }
  });

  // Touch/swipe support
  let touchStartX = 0;
  track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) { diff > 0 ? goNext() : goPrev(); resetAuto(); }
  }, { passive: true });

  // Recalculate on resize
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => goTo(current), 150);
  }, { passive: true });
})();


/* ============================================================
   8. CONTACT FORM — Validation + Submission simulation
   ============================================================ */
(function initContactForm() {
  const form       = document.getElementById('contact-form');
  const submitBtn  = document.getElementById('submit-btn');
  const submitText = document.getElementById('submit-text');
  const submitArrow= document.getElementById('submit-arrow');
  const spinner    = document.getElementById('submit-spinner');
  const successMsg = document.getElementById('form-success');
  const errorMsg   = document.getElementById('form-error');
  if (!form) return;

  // Live validation feedback
  const inputs = form.querySelectorAll('input[required], textarea[required]');
  inputs.forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => {
      if (input.classList.contains('invalid')) validateField(input);
    });
  });

  function validateField(field) {
    const valid = field.value.trim() !== '' &&
      (field.type !== 'email' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim()));
    field.classList.toggle('invalid', !valid);
    field.classList.toggle('valid',   valid);
    return valid;
  }

  function setLoading(state) {
    submitBtn.disabled = state;
    spinner.classList.toggle('hidden', !state);
    submitArrow.classList.toggle('hidden', state);
    submitText.textContent = state ? 'Sending…' : 'Send My Project Brief';
  }

  form.addEventListener('submit', async e => {
    e.preventDefault();
    successMsg.classList.add('hidden');
    errorMsg.classList.add('hidden');

    // Validate all required fields
    const allValid = Array.from(inputs).map(validateField).every(Boolean);

    if (!allValid) {
      errorMsg.classList.remove('hidden');
      errorMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      return;
    }

    setLoading(true);

    try {
      // Simulate network request (replace with real API call / EmailJS / Formspree)
      await new Promise(resolve => setTimeout(resolve, 1800));
      form.reset();
      inputs.forEach(i => { i.classList.remove('valid', 'invalid'); });
      successMsg.classList.remove('hidden');
      successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } catch (err) {
      errorMsg.textContent = '❌ Something went wrong. Please try again.';
      errorMsg.classList.remove('hidden');
    } finally {
      setLoading(false);
    }
  });
})();


/* ============================================================
   9. BACK TO TOP BUTTON
   ============================================================ */
(function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 500);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();


/* ============================================================
   10. FOOTER YEAR — Auto-update copyright
   ============================================================ */
(function initFooterYear() {
  const el = document.getElementById('footer-year');
  if (el) el.textContent = new Date().getFullYear();
})();


/* ============================================================
   11. SMOOTH SCROLL — Polyfill for in-page anchor links
   ============================================================ */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 80; // navbar height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();


/* ============================================================
   12. CURSOR GLOW EFFECT (Desktop only)
   ============================================================ */
(function initCursorGlow() {
  if (window.matchMedia('(pointer: coarse)').matches) return; // skip on touch

  const glow = document.createElement('div');
  glow.style.cssText = `
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%);
    transform: translate(-50%, -50%);
    transition: opacity 0.4s;
    will-change: left, top;
  `;
  document.body.appendChild(glow);

  let mx = 0, my = 0, cx = 0, cy = 0;
  let rafId;

  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; }, { passive: true });

  function tick() {
    cx += (mx - cx) * 0.12;
    cy += (my - cy) * 0.12;
    glow.style.left = cx + 'px';
    glow.style.top  = cy + 'px';
    rafId = requestAnimationFrame(tick);
  }

  tick();
})();


/* ============================================================
   13. SERVICE CARD — Tilt effect on hover
   ============================================================ */
(function initCardTilt() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const cards = document.querySelectorAll('.service-card, .project-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect  = card.getBoundingClientRect();
      const cx    = rect.left + rect.width  / 2;
      const cy    = rect.top  + rect.height / 2;
      const dx    = (e.clientX - cx) / (rect.width  / 2);
      const dy    = (e.clientY - cy) / (rect.height / 2);
      const tiltX = dy * -5;
      const tiltY = dx *  5;
      card.style.transform = `translateY(-6px) perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();


/* ============================================================
   14. CSS VARIABLE — Scroll progress for active nav styling
   ============================================================ */
(function initScrollProgress() {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    document.documentElement.style.setProperty('--scroll-progress', scrolled.toFixed(4));
  }, { passive: true });
})();


/* ============================================================
   15. INPUT FIELD FOCUS — Add floating label class
   ============================================================ */
(function initFormEnhancements() {
  const formGroups = document.querySelectorAll('.form-group');
  formGroups.forEach(group => {
    const input  = group.querySelector('input, textarea, select');
    const label  = group.querySelector('label');
    if (!input || !label) return;

    // Add CSS for invalid state dynamically
    input.addEventListener('invalid', () => input.classList.add('invalid'));
  });

  // Add custom CSS for form validation states
  const style = document.createElement('style');
  style.textContent = `
    .form-group input.invalid,
    .form-group textarea.invalid {
      border-color: rgba(248, 113, 113, 0.6) !important;
      box-shadow: 0 0 0 3px rgba(248, 113, 113, 0.12) !important;
    }
    .form-group input.valid,
    .form-group textarea.valid {
      border-color: rgba(74, 222, 128, 0.5) !important;
    }
    .nav-link.active-nav {
      color: #f1f5f9 !important;
    }
    .nav-link.active-nav::after {
      transform: scaleX(1) !important;
    }
  `;
  document.head.appendChild(style);
})();
