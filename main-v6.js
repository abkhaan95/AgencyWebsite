/**
  AETHERIS STUDIO INTERACTIVE SCRIPT (NEO-CONSTRUCTIVIST BAUHAUS)
  Theme: Neo-Constructivist Bauhaus & Intersecting Structural Frames
  File: main-v6.js
*/

document.addEventListener('DOMContentLoaded', () => {
  setupScrollProgress();
  setupHeaderTransition();
  setupMobileNav();
  setupHeroSlider();
  setupServicesTabs();
  setupPortfolioFilter();
  setup3DTiltEffect();
  setupRevealOnScroll();
});

/**
 * Handle scroll progress bar calculation.
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
 * Mechanical, sudden snap slider transitions.
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
    }, 6000); // Mechanical mechanical rhythm
  }

  function restartAutoplay() {
    clearInterval(autoPlayTimer);
    startAutoplay();
  }

  startAutoplay();
}

/**
 * Handle services accordion switching and image swapping.
 */
function setupServicesTabs() {
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

        // Swap visual image with sudden step transition
        const targetCategory = item.getAttribute('data-service');
        if (serviceVisualImg && assetsMap[targetCategory]) {
          serviceVisualImg.style.opacity = '0';
          setTimeout(() => {
            serviceVisualImg.src = assetsMap[targetCategory];
            serviceVisualImg.style.opacity = '1';
          }, 150);
        }
      }
    });
  });
}

/**
 * Hard-cut mechanical grid filters.
 */
function setupPortfolioFilter() {
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
        card.style.transform = 'translateY(15px)';

        setTimeout(() => {
          if (filterValue === 'all' || category === filterValue) {
            card.style.display = 'block';
            card.offsetHeight; // force paint
            card.style.opacity = '1';
            card.style.transform = 'translate(0)';
          } else {
            card.style.display = 'none';
          }
        }, 150);
      });
    });
  });
}

/**
 * Premium 3D tilt tracking axes coordinates for Bauhaus geometric cards.
 * Applied on: .card-interior, .process-card, .testimonial-card, .hero-banner-wrapper
 */
function setup3DTiltEffect() {
  const tiltElements = document.querySelectorAll('.card-interior, .process-card, .testimonial-card, .hero-banner-wrapper');
  
  // Disable 3D tilt on touch devices for performance
  if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

  tiltElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left; // x position within element
      const y = e.clientY - rect.top;  // y position within element
      
      const width = rect.width;
      const height = rect.height;
      
      // Calculate normalized tilt (-10 to 10 degrees)
      const tiltX = ((y / height) - 0.5) * -12;
      const tiltY = ((x / width) - 0.5) * 12;
      
      el.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateZ(5px)`;
    });

    el.addEventListener('mouseleave', () => {
      el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)';
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
