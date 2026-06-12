/**
  AETHERIS SYS v3.0 INTERACTIVE RADAR ENGINE
  Operates the Tech-Brutalist console systems, slide registers, services accordions, 
  and real-time oscilloscope micro-fluctuations.
*/

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initMobileNav();
  initHeroSlider();
  initServicesAccordions();
  initPortfolioFilter();
  initLanguageSelector();
  initScrollProgress();
  initScrollReveals();
  initOscilloscopeData();
});

/* ==========================================
   1. HEADER SCROLL & SECTION OBSERVATION
   ========================================== */
function initHeaderScroll() {
  const header = document.getElementById('main-header');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!header) return;

  // Shrink/expand terminal header framing
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('shrunk');
    } else {
      header.classList.remove('shrunk');
    }
  });

  // Highlight bracketed section menu links as they pass focal zone
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
   2. MOBILE PANEL CONTROLLER
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

  // Shutdown panel on click of link registers
  links.forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('active');
      nav.classList.remove('active');
    });
  });
}

/* ==========================================
   3. HERO RADAR OSCILLOSCOPE BANNER SLIDER
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
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');

    // Sync dots
    const activeDot = document.querySelector(`.slider-dot[data-index="${currentSlide}"]`);
    if (activeDot) activeDot.classList.add('active');

    // Inject temporary voltage flare overlay when data shifts
    triggerVoltageSpike();
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
    slideInterval = setInterval(nextSlide, 7000);
  }

  function resetAutoplay() {
    clearInterval(slideInterval);
    startAutoplay();
  }

  startAutoplay();
}

function triggerVoltageSpike() {
  const voltTag = document.querySelector('.terminal-coord-tag.bottom-left');
  if (!voltTag) return;
  
  // Flash high-voltage read-out
  voltTag.innerText = `[SYS_VOLTAGE: ${Math.floor(Math.random() * 40) + 130}V_SPIKE]`;
  voltTag.style.color = 'var(--color-tertiary)';
  voltTag.style.borderColor = 'var(--color-tertiary)';
  
  setTimeout(() => {
    voltTag.innerText = `[SYS_VOLTAGE: 120V]`;
    voltTag.style.color = '';
    voltTag.style.borderColor = '';
  }, 1200);
}

/* ==========================================
   4. TECHNICAL DIVISIONS SPECIFICATION ACCORDIONS
   ========================================== */
function initServicesAccordions() {
  const accordionItems = document.querySelectorAll('.accordion-item');
  const visualWrapper = document.getElementById('services-visual-wrap');

  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    if (!header) return;

    header.addEventListener('click', () => {
      const isCurrentlyActive = item.classList.contains('active');

      // Collapse all other divisions to behave like a true single-expanding terminal list
      accordionItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        const otherBtn = otherItem.querySelector('.accordion-header');
        if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
      });

      if (!isCurrentlyActive) {
        item.classList.add('active');
        header.setAttribute('aria-expanded', 'true');

        // Apply specific neon accents & pulse left visual frame
        const service = item.getAttribute('data-service');
        if (visualWrapper) {
          visualWrapper.classList.add('switching');
          
          let accentColor = '#00ff66'; // Default green
          if (service === 'animation') {
            accentColor = '#00ff66'; // Animation -> Phosphor green
          } else if (service === 'design') {
            accentColor = '#ff0055'; // Design -> Laser Crimson
          } else if (service === 'ai-tools') {
            accentColor = '#fff500'; // AI Tools -> Cyber Yellow
          }
          
          visualWrapper.style.setProperty('--service-accent', accentColor);

          setTimeout(() => {
            visualWrapper.classList.remove('switching');
          }, 450);
        }
      }
    });
  });
}

/* ==========================================
   5. ASYMMETRIC SYSTEM PORTFOLIO GRID FILTERS
   ========================================== */
function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioGrid = document.getElementById('portfolio-grid');
  const cards = document.querySelectorAll('.portfolio-card');

  if (!portfolioGrid || cards.length === 0) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle button highlights
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      // Soft scan fade glitch
      portfolioGrid.classList.add('filtering');
      portfolioGrid.style.opacity = '0.3';
      portfolioGrid.style.transform = 'scale(0.99)';

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

        portfolioGrid.classList.remove('filtering');
        portfolioGrid.style.opacity = '1';
        portfolioGrid.style.transform = 'scale(1)';
      }, 350);
    });
  });
}

/* ==========================================
   6. LANGUAGE TOGGLE REGISTRY
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
   7. PHOSPHOR DUAL-GLOW SCROLL PROGRESS
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
   8. SYSTEM CONSOLE SCROLL REVEALS
   ========================================== */
function initScrollReveals() {
  const items = document.querySelectorAll('.reveal');

  const options = {
    root: null,
    rootMargin: '0px 0px -10% 0px', // trigger when 10% in viewport
    threshold: 0.05
  };

  const observer = new IntersectionObserver((entries, selfObserver) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        selfObserver.unobserve(entry.target); // Reveal once only
      }
    });
  }, options);

  items.forEach(item => observer.observe(item));
}

/* ==========================================
   9. MICROSCOPIC OSCILLOSCOPE REAL-TIME DATA TELEMETRY
   ========================================== */
function initOscilloscopeData() {
  const locTag = document.querySelector('.terminal-coord-tag.top-left');
  const bufferTag = document.querySelector('.terminal-coord-tag.bottom-right');
  const checksums = document.querySelectorAll('.system-packet-checksum span');

  if (!locTag && !bufferTag && checksums.length === 0) return;

  // Intermittent flicker rate calculations
  setInterval(() => {
    // 1. Coordinates drift slightly to simulate an active radar positioning sweep
    if (locTag) {
      const driftX = (102 + Math.floor(Math.random() * 8) - 4);
      const driftY = (409 + Math.floor(Math.random() * 8) - 4);
      locTag.innerText = `[LOC:X_${driftX}.Y_${driftY}]`;
    }

    // 2. Refresh Rate fluctuates with mock render loads
    if (bufferTag) {
      const rate = Math.random() > 0.85 ? (Math.random() > 0.5 ? '59.8' : '60.2') : '60.0';
      bufferTag.innerText = `[FRAME_BUF: ${rate}FPS]`;
    }
    
    // 3. Fluctuate checksum hashes slightly on live transmission packets
    if (checksums.length > 0 && Math.random() > 0.9) {
      const randomPkt = checksums[Math.floor(Math.random() * checksums.length)];
      const prefix = randomPkt.innerText.split(' ')[0] || '[HASH_MD5:';
      const randomHex1 = Math.floor(Math.random() * 65535).toString(16).toUpperCase().padStart(4, '0');
      const randomHex2 = Math.floor(Math.random() * 65535).toString(16).toUpperCase().padStart(4, '0');
      const randomHex3 = Math.floor(Math.random() * 65535).toString(16).toUpperCase().padStart(4, '0');
      randomPkt.innerText = `${prefix} ${randomHex1}_${randomHex2}_${randomHex3}]`;
    }
  }, 2500);
}
