/**
  AETHERIS STUDIO INTERACTIVE SCRIPT (WABI-SABI ORGANIC MINIMALIST)
  Theme: Wabi-Sabi Organic Minimalist & Quiet Craft Slate
  File: main-v5.js
*/

document.addEventListener('DOMContentLoaded', () => {
  setupScrollProgress();
  setupHeaderBackground();
  setupMobileNav();
  setupHeroSlider();
  setupServicesDrawer();
  setupPortfolioFilter();
  setupRevealOnScroll();
});

/**
 * Update the scroll progress indicator dynamically based on screen read percentage.
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
 * Handles subtle header transitions on scroll.
 */
function setupHeaderBackground() {
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
 * Simple slide out Drawer for mobile nav.
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
 * Clean & slow cross-fade hero slider.
 */
function setupHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.slider-dot');
  const prevBtn = document.getElementById('slider-prev');
  const nextBtn = document.getElementById('slider-next');

  if (slides.length === 0) return;

  let currentSlideIndex = 0;
  let autoPlayTimer = null;

  function goToSlide(index) {
    slides[currentSlideIndex].classList.remove('active');
    dots[currentSlideIndex].classList.remove('active');
    
    currentSlideIndex = (index + slides.length) % slides.length;
    
    slides[currentSlideIndex].classList.add('active');
    dots[currentSlideIndex].classList.add('active');
  }

  function handleNext() {
    goToSlide(currentSlideIndex + 1);
    restartAutoplay();
  }

  function handlePrev() {
    goToSlide(currentSlideIndex - 1);
    restartAutoplay();
  }

  if (prevBtn) prevBtn.addEventListener('click', handlePrev);
  if (nextBtn) nextBtn.addEventListener('click', handleNext);

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      goToSlide(index);
      restartAutoplay();
    });
  });

  function startAutoplay() {
    autoPlayTimer = setInterval(() => {
      goToSlide(currentSlideIndex + 1);
    }, 7000); // Meticulously slow auto-transition
  }

  function restartAutoplay() {
    clearInterval(autoPlayTimer);
    startAutoplay();
  }

  startAutoplay();
}

/**
 * Accordion drawers detailing agency division capabilities.
 * Incorporates a soft sepia scaling hover overlay shift in the visual window.
 */
function setupServicesDrawer() {
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

        // Quietly fade image out and swap source
        const targetCategory = item.getAttribute('data-service');
        if (serviceVisualImg && assetsMap[targetCategory]) {
          serviceVisualImg.style.opacity = '0.3';
          setTimeout(() => {
            serviceVisualImg.src = assetsMap[targetCategory];
            serviceVisualImg.style.opacity = '1';
          }, 350);
        }
      }
    });
  });
}

/**
 * Sandstone category filters with quiet fading.
 */
function setupPortfolioFilter() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioGrid = document.getElementById('portfolio-grid');
  if (!portfolioGrid) return;
  
  const cards = portfolioGrid.querySelectorAll('.portfolio-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle button active state
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        
        // Dissolve animation transition
        card.style.opacity = '0';
        card.style.transform = 'scale(0.95) translateY(10px)';

        setTimeout(() => {
          if (filterValue === 'all' || category === filterValue) {
            card.style.display = 'block';
            // Force redraw for browser layout tracking
            card.offsetHeight; 
            card.style.opacity = '1';
            card.style.transform = 'scale(1) translateY(0)';
          } else {
            card.style.display = 'none';
          }
        }, 300);
      });
    });
  });
}

/**
 * Scroll reveal mechanics featuring soft inertia-ease reveals.
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

  // Track active navigation link on scroll
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
