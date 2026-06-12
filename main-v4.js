/**
  AETHERIS LIQUID VAPORWAVE INTERACTIVE ENGINE (v4.0)
  Manages floating glass bubbles, liquid slider transitions, responsive menus,
  dynamic chameleon dividers, and filter chips.
*/

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initMobileNav();
  initHeroSlider();
  initServicesTabs();
  initPortfolioFilter();
  initLanguageSelector();
  initScrollProgress();
  initScrollReveals();
  initCursorTracker();
});

/* ==========================================
   1. HEADER SCROLL & ACTIVE TRACKING
   ========================================== */
function initHeaderScroll() {
  const header = document.getElementById('main-header');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('shrunk');
    } else {
      header.classList.remove('shrunk');
    }
  });

  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -55% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

/* ==========================================
   2. MOBILE NAV PANEL
   ========================================== */
function initMobileNav() {
  const toggle = document.getElementById('mobile-toggle');
  const nav = document.getElementById('nav-links');
  const links = document.querySelectorAll('.nav-link');

  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    nav.classList.toggle('active');
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      nav.classList.remove('active');
    });
  });
}

/* ==========================================
   3. HERO LIQUID SLIDER
   ========================================== */
function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.slider-dot');
  const prevBtn = document.getElementById('slider-prev');
  const nextBtn = document.getElementById('slider-next');
  let currentSlide = 0;
  let slideInterval;

  if (slides.length === 0) return;

  function showSlide(index) {
    slides.forEach(slide => {
      slide.classList.remove('active');
      slide.style.transform = 'scale(1.05) rotate(1.5deg)';
    });
    dots.forEach(dot => dot.classList.remove('active'));

    currentSlide = (index + slides.length) % slides.length;
    
    slides[currentSlide].classList.add('active');
    slides[currentSlide].style.transform = 'scale(1) rotate(0deg)';

    const activeDot = document.querySelector(`.slider-dot[data-index="${currentSlide}"]`);
    if (activeDot) activeDot.classList.add('active');
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  function prevSlide() {
    showSlide(currentSlide - 1);
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      resetAutoplay();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      resetAutoplay();
    });
  }

  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      const idx = parseInt(e.target.getAttribute('data-index'));
      showSlide(idx);
      resetAutoplay();
    });
  });

  function startAutoplay() {
    slideInterval = setInterval(nextSlide, 6500);
  }

  function resetAutoplay() {
    clearInterval(slideInterval);
    startAutoplay();
  }

  startAutoplay();
}

/* ==========================================
   4. CHAMELEON TABS INJECTION
   ========================================== */
function initServicesTabs() {
  const tabItems = document.querySelectorAll('.services-tab-item');
  const visualWrapper = document.getElementById('services-visual-wrap');

  tabItems.forEach(tab => {
    tab.addEventListener('click', () => {
      tabItems.forEach(item => item.classList.remove('active'));
      tab.classList.add('active');

      if (visualWrapper) {
        visualWrapper.classList.add('switching');
        
        const service = tab.getAttribute('data-service');
        let accentColor = '#CBFF00'; // Default Lime

        if (service === 'animation') {
          accentColor = '#CBFF00'; // Acid Lime
        } else if (service === 'design') {
          accentColor = '#FF007F'; // Hot Pink
        } else if (service === 'ai-tools') {
          accentColor = '#00F0FF'; // Electric Cyan
        }

        visualWrapper.style.setProperty('--service-accent', accentColor);

        setTimeout(() => {
          visualWrapper.classList.remove('switching');
        }, 500);
      }
    });
  });
}

/* ==========================================
   5. PORTFOLIO FILTER CHIPS
   ========================================== */
function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioGrid = document.getElementById('portfolio-grid');
  const cards = document.querySelectorAll('.portfolio-card');

  if (!portfolioGrid || cards.length === 0) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      portfolioGrid.style.opacity = '0.4';
      portfolioGrid.style.transform = 'translateY(10px) scale(0.99)';

      setTimeout(() => {
        cards.forEach(card => {
          const cat = card.getAttribute('data-category');
          if (filterValue === 'all' || cat === filterValue) {
            card.style.display = 'flex';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'scale(1)';
            }, 30);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.96)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 250);
          }
        });

        portfolioGrid.style.opacity = '1';
        portfolioGrid.style.transform = 'translateY(0) scale(1)';
      }, 300);
    });
  });
}

/* ==========================================
   6. LANGUAGE TABS
   ========================================== */
function initLanguageSelector() {
  const langSelector = document.getElementById('lang-selector');
  if (!langSelector) return;

  const options = langSelector.querySelectorAll('.lang-option');

  options.forEach(opt => {
    opt.addEventListener('click', () => {
      options.forEach(o => o.classList.remove('active'));
      opt.classList.add('active');
    });
  });
}

/* ==========================================
   7. SCROLL PROGRESS
   ========================================== */
function initScrollProgress() {
  const progress = document.getElementById('scroll-progress');
  if (!progress) return;

  window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight > 0) {
      const scrolled = (window.scrollY / totalHeight) * 100;
      progress.style.width = `${scrolled}%`;
    }
  });
}

/* ==========================================
   8. SCROLL REVEALS
   ========================================== */
function initScrollReveals() {
  const items = document.querySelectorAll('.reveal');

  const options = {
    root: null,
    rootMargin: '0px 0px -10% 0px',
    threshold: 0.05
  };

  const observer = new IntersectionObserver((entries, selfObserver) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        selfObserver.unobserve(entry.target);
      }
    });
  }, options);

  items.forEach(item => observer.observe(item));
}

/* ==========================================
   9. INTERACTIVE CURSOR ACCID GLOW TRACKER
   ========================================== */
function initCursorTracker() {
  const orbs = document.querySelectorAll('.glow-orb');
  if (orbs.length === 0) return;

  window.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    // Shift glow-orbs slightly based on cursor to simulate liquid fluid displacement
    orbs.forEach((orb, index) => {
      const factor = (index + 1) * 20;
      const dx = (x - 0.5) * factor;
      const dy = (y - 0.5) * factor;
      orb.style.transform = `translate(${dx}px, ${dy}px)`;
    });
  });
}
