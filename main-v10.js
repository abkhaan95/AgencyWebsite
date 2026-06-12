/**
  AETHERIS STUDIO INTERACTIVE ENGINE
  Provides smooth, premium, interactive behaviors with zero layout shift.
*/

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initMobileNav();
  initHeroSlider();
  initServicesTabs();
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

  // Shrink and blur header on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('shrunk');
    } else {
      header.classList.remove('shrunk');
    }
  });

  // IntersectionObserver to highlight active nav links
  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -60% 0px', // focused in center of view
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

  // Close nav on click of any link
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
    dots.forEach(dot => dots.forEach(d => d.classList.remove('active')));

    currentSlide = (index + slides.length) % slides.length;
    
    slides[currentSlide].classList.add('active');
    
    // Find matching dot and activate it
    const activeDot = document.querySelector(`.slider-dot[data-index="${currentSlide}"]`);
    if (activeDot) activeDot.classList.add('active');
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  function prevSlide() {
    showSlide(currentSlide - 1);
  }

  // Event Listeners
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

  // Autoplay functionality
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
   4. SERVICES VERTICAL GLOW TABS
   ========================================== */
function initServicesTabs() {
  const tabItems = document.querySelectorAll('.services-tab-item');
  const visualWrapper = document.getElementById('services-visual-wrap');

  tabItems.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active class from all tabs
      tabItems.forEach(item => item.classList.remove('active'));
      
      // Add active to clicked tab
      tab.classList.add('active');

      // Add a brief subtle pulsing transition to the left-side visual
      visualWrapper.classList.add('switching');
      
      // Modify custom background glow properties on left column based on service type
      const service = tab.getAttribute('data-service');
      if (service === 'animation') {
        visualWrapper.style.setProperty('--service-accent', '#7b2cbf'); // Violet glow
      } else if (service === 'design') {
        visualWrapper.style.setProperty('--service-accent', '#ff2a5f'); // Crimson glow
      } else if (service === 'ai-tools') {
        visualWrapper.style.setProperty('--service-accent', '#00f5d4'); // Teal glow
      }

      setTimeout(() => {
        visualWrapper.classList.remove('switching');
      }, 500);
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
    btn.addEventListener('click', (e) => {
      // Toggle active class on buttons
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      // Trigger grid fade out
      portfolioGrid.classList.add('filtering');

      setTimeout(() => {
        cards.forEach(card => {
          const category = card.getAttribute('data-category');
          
          if (filterValue === 'all' || category === filterValue) {
            card.style.display = 'flex';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'scale(1)';
            }, 50);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.95)';
            // Wait for transform animation to finish, then hide
            setTimeout(() => {
              card.style.display = 'none';
            }, 300);
          }
        });

        // Trigger grid fade in
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
    rootMargin: '0px 0px -12% 0px', // trigger when 12% in view
    threshold: 0.08
  };
  
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        obs.unobserve(entry.target); // observe only once
      }
    });
  }, observerOptions);
  
  revealElements.forEach(el => observer.observe(el));
}

/* ==========================================
   8. SCROLL PROGRESS INDICATOR
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
