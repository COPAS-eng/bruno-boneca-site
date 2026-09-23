document.addEventListener('DOMContentLoaded', () => {

  // ── Mobile nav toggle ───────────────────────────────────────────────────
  const navToggle = document.getElementById('nav-toggle');
  const navUl = document.querySelector('nav ul');

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navUl.classList.toggle('open');
      navToggle.textContent = navUl.classList.contains('open') ? '✕' : '☰';
    });

    navUl.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navUl.classList.remove('open');
        navToggle.textContent = '☰';
      });
    });
  }

  // ── Navbar solid background on scroll ────────────────────────────────────
  const nav = document.querySelector('nav');

  const handleNav = () => {
    if (window.scrollY > 80) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleNav, { passive: true });
  handleNav();

  // ── Scroll-reveal (Intersection Observer) ────────────────────────────────
  const reveals = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && reveals.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    reveals.forEach(el => io.observe(el));
  }

  // ── Depoimentos carousel ────────────────────────────────────────────────
  const track = document.querySelector('.carousel-track');
  const cards = document.querySelectorAll('.carousel-track .testimonial-card');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');

  if (track && cards.length && prevBtn && nextBtn) {
    let current = 0;

    const goTo = (idx) => {
      current = (idx + cards.length) % cards.length;
      track.style.transform = `translateX(-${current * 100}%)`;
    };

    prevBtn.addEventListener('click', () => goTo(current - 1));
    nextBtn.addEventListener('click', () => goTo(current + 1));

    // Auto-rotate every 5s
    let timer = setInterval(() => goTo(current + 1), 5000);

    track.addEventListener('mouseenter', () => clearInterval(timer));
    track.addEventListener('mouseleave', () => {
      timer = setInterval(() => goTo(current + 1), 5000);
    });
  }

  // ── Smooth scroll for anchor links ───────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
