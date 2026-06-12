/**
  AETHERIS STUDIO INTERACTIVE SCRIPT (HAUTE-COUTURE NOIR GOLD)
  Theme: Haute-Couture Noir Gold & Silent Cinematic Panels
  File: main-v7.js
*/

document.addEventListener('DOMContentLoaded', () => {
  setupScrollProgress();
  setupHeaderTransition();
  setupMobileNav();
  setupCircularSweepSlider();
  setupServicesAccordion();
  setupPortfolioFilters();
  setupRevealOnScroll();
});

/**
 * Scroll progress melting gold bar computation.
 */
function setupScrollProgress() {
  const progressBar = document.getElementById('scroll-progress');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (totalScroll <= 0) {
      progressBar.style.width = '0%';
      return;
    }
    const scrolledPercent = (window.pageYOffset / totalScroll) * 100;
    progressBar.style.width = `${scrolledPercent}%`;
  }, { passive: true });
}

/**
 * Handle headers scrolled state.
 */
function setupHeaderTransition() {
  const header = document.getElementById('main-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });
}

/**
 * Handles mobile hamburger navigation trigger.
 */
function setupMobileNav() {
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');
  
  if (!mobileToggle || !navLinks) return;

  mobileToggle.addEventListener('click', () => {
    const isActive = mobileToggle.classList.toggle('mobile-active');
    navLinks.classList.toggle('mobile-active');
    mobileToggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
  });

  // Close when link is clicked
  const individualLinks = navLinks.querySelectorAll('.nav-link');
  individualLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileToggle.classList.remove('mobile-active');
      navLinks.classList.remove('mobile-active');
      mobileToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/**
 * Premium Circular Sweep Slider Timer controls.
 * Integrates an SVG progress path updating dynamically in real-time.
 */
function setupCircularSweepSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.slider-dot');
  const prevBtn = document.getElementById('slider-prev');
  const nextBtn = document.getElementById('slider-next');
  const progressRing = document.getElementById('timer-progress-ring');

  if (slides.length === 0) return;

  let currentSlideIndex = 0;
  let sweepTimer = null;
  const slideDuration = 6000; // 6 seconds per slide
  const fpsInterval = 16.7; // ~60fps updates
  let elapsed = 0;

  function goToSlide(index) {
    slides[currentSlideIndex].classList.remove('active');
    dots[currentSlideIndex].classList.remove('active');
    
    currentSlideIndex = (index + slides.length) % slides.length;
    
    slides[currentSlideIndex].classList.add('active');
    dots[currentSlideIndex].classList.add('active');
    resetSweep();
  }

  function handleNext() {
    goToSlide(currentSlideIndex + 1);
  }

  function handlePrev() {
    goToSlide(currentSlideIndex - 1);
  }

  if (prevBtn) prevBtn.addEventListener('click', handlePrev);
  if (nextBtn) nextBtn.addEventListener('click', handleNext);

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      goToSlide(index);
    });
  });

  function startSweep() {
    sweepTimer = setInterval(() => {
      elapsed += fpsInterval;
      const progressPercent = Math.min((elapsed / slideDuration) * 100, 100);
      
      if (progressRing) {
        // SVG circle path length is 100 units based on the dasharray system used
        progressRing.setAttribute('stroke-dasharray', `${progressPercent}, 100`);
      }

      if (elapsed >= slideDuration) {
        goToSlide(currentSlideIndex + 1);
      }
    }, fpsInterval);
  }

  function resetSweep() {
    clearInterval(sweepTimer);
    elapsed = 0;
    if (progressRing) {
      progressRing.setAttribute('stroke-dasharray', '0, 100');
    }
    startSweep();
  }

  startSweep();
}

/**
 * Handle services accordion switching and image swapping.
 */
function setupServicesAccordion() {
  const accordionItems = document.querySelectorAll('.accordion-item');
  const serviceVisualImg = document.querySelector('.services-visual-img');

  const assetsMap = {
    'animation': '/assets/services_visual.png',
    'design': '/assets/portfolio_brand.png',
    'ai-tools': '/assets/portfolio_ai_tools.png'
  };

  accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    
    header.addEventListener('click', () => {
      const isAlreadyActive = item.classList.contains('active');
      
      // Close all accordions
      accordionItems.forEach(inner => {
        inner.classList.remove('active');
        inner.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
      });

      if (!isAlreadyActive) {
        item.classList.add('active');
        header.setAttribute('aria-expanded', 'true');

        // Swap visual image with luxury cross fade
        const targetCategory = item.getAttribute('data-service');
        if (serviceVisualImg && assetsMap[targetCategory]) {
          serviceVisualImg.style.opacity = '0.1';
          setTimeout(() => {
            serviceVisualImg.src = assetsMap[targetCategory];
            serviceVisualImg.style.opacity = '1';
          }, 450);
        }
      }
    });
  });
}

/**
 * Cross-fading luxury filters.
 */
function setupPortfolioFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioGrid = document.getElementById('portfolio-grid');
  if (!portfolioGrid) return;
  
  const cards = portfolioGrid.querySelectorAll('.portfolio-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        card.style.opacity = '0';
        card.style.transform = 'translateY(12px)';

        setTimeout(() => {
          if (filterValue === 'all' || category === filterValue) {
            card.style.display = 'block';
            card.offsetHeight; // force paint
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          } else {
            card.style.display = 'none';
          }
        }, 450);
      });
    });
  });
}

/**
 * Handle IntersectionObserver to reveal sections on scroll.
 */
function setupRevealOnScroll() {
  const elements = document.querySelectorAll('.reveal');
  if (elements.length === 0) return;

  const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries, self) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        self.unobserve(entry.target);
      }
    });
  }, observerOptions);

  elements.forEach(element => {
    observer.observe(element);
  });

  // Highlight current nav section on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links .nav-link');

  window.addEventListener('scroll', () => {
    let currentActiveId = '';
    const scrollPosition = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentActiveId = section.getAttribute('id');
      }
    });

    if (currentActiveId) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentActiveId}`) {
          link.classList.add('active');
        }
      });
    }
  }, { passive: true });
}
