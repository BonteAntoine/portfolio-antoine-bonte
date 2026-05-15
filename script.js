/* ═══════════════════════════════════════════════════════
   PORTFOLIO ANTOINE BONTE — Main JS
═══════════════════════════════════════════════════════ */

/* ── TYPING ANIMATION ─────────────────────────────── */
const typedEl = document.getElementById('typedText');
const phrases = ['Java / Spring', 'Spring Boot', 'E-Commerce', 'Microservices', 'Java / Spring'];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingTimer;

function type() {
  const current = phrases[phraseIndex];
  if (isDeleting) {
    typedEl.textContent = current.slice(0, --charIndex);
  } else {
    typedEl.textContent = current.slice(0, ++charIndex);
  }

  let delay = isDeleting ? 50 : 80;

  if (!isDeleting && charIndex === current.length) {
    delay = 2200;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    delay = 400;
  }

  typingTimer = setTimeout(type, delay);
}

type();

/* ── NAVBAR SCROLL ────────────────────────────────── */
const nav = document.getElementById('nav');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  nav.classList.toggle('scrolled', y > 20);
  backToTop.classList.toggle('visible', y > 400);
}, { passive: true });

/* ── MOBILE NAV ───────────────────────────────────── */
const burger = document.getElementById('navBurger');
const navLinks = document.getElementById('navLinks');

burger.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  burger.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    burger.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ── ACTIVE NAV HIGHLIGHT ─────────────────────────── */
const sections = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav__link');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinkEls.forEach(l => {
        l.classList.toggle('active', l.getAttribute('href') === '#' + id);
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

/* ── SCROLL REVEAL ────────────────────────────────── */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ── LANGUAGE BARS ────────────────────────────────── */
const langObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.lang-bar__fill').forEach(bar => {
        bar.classList.add('animated');
      });
      langObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const eduSection = document.getElementById('education');
if (eduSection) langObserver.observe(eduSection);

/* ── SMOOTH BACK TO TOP ───────────────────────────── */
backToTop.addEventListener('click', e => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
