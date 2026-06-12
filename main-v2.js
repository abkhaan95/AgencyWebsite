/**
  AETHERIS STUDIO INTERACTIVE ENGINE - VARIATION 2 (SWISS EDITORIAL)
  Provides clean, high-contrast, kinetic interactive behaviors with zero layout shift.
*/

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initMobileNav();
  initHeroSlider();
  initServicesAccordions();
  initPortfolioFilter();
  initLanguageSelector();
  initScrollReveals();
  initScrollProgress();
});

/* ==========================================
   1. HEADER SCROLL & SECTION HIGHLIGHTS
   ========================================== */
function initHeaderScroll() {
  const header = document.getElementById('main-header');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('shrunk');
    } else {
      header.classList.remove('shrunk');
    }
  });

  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -60% 0px',
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
   2. MOBILE NAV TOGGLE
   ========================================== */
function initMobileNav() {
  const toggle = document.getElementById('mobile-toggle');
  const nav = document.getElementById('nav-links');
  const links = document.querySelectorAll('.nav-link');

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
   3. HERO BANNER SLIDER
   ========================================== */
function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.slider-dot');
  const prevBtn = document.getElementById('slider-prev');
  const nextBtn = document.getElementById('slider-next');
  let currentSlide = 0;
  let slideInterval;

  function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    currentSlide = (index + slides.length) % slides.length;
    
    slides[currentSlide].classList.add('active');
    
    const activeDot = document.querySelector(`.slider-dot[data-index="${currentSlide}"]`);
    if (activeDot) activeDot.classList.add('active');
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  function prevSlide() {
    showSlide(currentSlide - 1);
  }

  prevBtn.addEventListener('click', () => {
    prevSlide();
    resetAutoplay();
  });

  nextBtn.addEventListener('click', () => {
    nextSlide();
    resetAutoplay();
  });

  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      const targetIndex = parseInt(e.target.getAttribute('data-index'));
      showSlide(targetIndex);
      resetAutoplay();
    });
  });

  function startAutoplay() {
    slideInterval = setInterval(nextSlide, 6000);
  }

  function resetAutoplay() {
    clearInterval(slideInterval);
    startAutoplay();
  }

  startAutoplay();
}

/* ==========================================
   4. SERVICES ACCORDION ENGINE (DYNAMIC BLOCK COLORS)
   ========================================== */
function initServicesAccordions() {
  const accordionItems = document.querySelectorAll('.accordion-item');
  const visualWrapper = document.getElementById('services-visual-wrap');

  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    
    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Collapse all accordion items
      accordionItems.forEach(acc => {
        acc.classList.remove('active');
        acc.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
      });

      if (!isActive) {
        // Expand clicked item
        item.classList.add('active');
        header.setAttribute('aria-expanded', 'true');

        // Flash/pulse animation on left visual frame
        visualWrapper.classList.add('switching');

        // Dynamic spectral outline color injection based on service data-attribute
        const service = item.getAttribute('data-service');
        if (service === 'animation') {
          visualWrapper.style.setProperty('--service-accent', '#ff3366'); // Coral
        } else if (service === 'design') {
          visualWrapper.style.setProperty('--service-accent', '#7c3aed'); // Violet
        } else if (service === 'ai-tools') {
          visualWrapper.style.setProperty('--service-accent', '#2563eb'); // Royal Blue
        }

        setTimeout(() => {
          visualWrapper.classList.remove('switching');
        }, 500);
      }
    });
  });
}

/* ==========================================
   5. PORTFOLIO FILTER SYSTEM
   ========================================== */
function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const portfolioGrid = document.getElementById('portfolio-grid');
  const cards = document.querySelectorAll('.portfolio-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      // Trigger grid filtering animation
      portfolioGrid.classList.add('filtering');

      setTimeout(() => {
        cards.forEach(card => {
          const category = card.getAttribute('data-category');
          
          if (filterValue === 'all' || category === filterValue) {
            card.style.display = 'block'; // Block display matching masonry requirements
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0) scale(1)';
            }, 50);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(15px) scale(0.97)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 300);
          }
        });

        portfolioGrid.classList.remove('filtering');
      }, 300);
    });
  });
}

/* ==========================================
   6. LANGUAGE SELECTOR
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
   7. SCROLL-REVEAL OBSERVATION
   ========================================== */
function initScrollReveals() {
  const revealElements = document.querySelectorAll('.reveal');
  
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -12% 0px',
    threshold: 0.08
  };
  
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  revealElements.forEach(el => observer.observe(el));
}

/* ==========================================
   8. SCROLL PROGRESS INDICATOR (RAINBOW)
   ========================================== */
function initScrollProgress() {
  const progressBar = document.getElementById('scroll-progress');
  if (!progressBar) return;
  
  window.addEventListener('scroll', () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollHeight > 0) {
      const scrolled = (window.scrollY / scrollHeight) * 100;
      progressBar.style.width = scrolled + '%';
    }
  });
}
