/**
  AETHERIS STUDIO INTERACTIVE ENGINE - COMICAL MEME-CORE EDITION (V15)
  Provides goofy, hilarious, and playful comic interactions!
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
  initComicalEasterEggs();
});

/* ==========================================
   COMICAL EASTER EGGS & MEME INTERACTION
   ========================================== */
function initComicalEasterEggs() {
  const jokes = [
    "Warning: Initiating partnership will cause extreme spikes in aesthetic coolness. Proceed with caution!",
    "Your project vision is so epic, our AI servers just started giggling!",
    "Inquiry initialized! We've dispatched our creative carrier pigeons to locate you.",
    "Fusing cinema with code is known to cause spontaneous high-fives and visual joy!",
    "Congratulations! You just clicked a button. Here is your virtual cookie: 🍪",
    "Loading visual artistry... Please hold your breath for maximum rendering quality!",
    "Our design pipelines are currently operating at 120% pure imagination. Stand back!"
  ];

  // comically shake cards on hover
  const funnyCards = document.querySelectorAll('.process-card, .portfolio-card, .testimonial-item');
  funnyCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      // randomly do a small goofy tilt or wobble
      const angle = (Math.random() * 6 - 3).toFixed(1);
      card.style.transform = `scale(1.03) rotate(${angle}deg)`;
      card.style.transition = 'transform 0.15s cubic-bezier(0.18, 0.89, 0.32, 1.28)';
    });
    card.style.transition = 'transform 0.3s ease';
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'scale(1) rotate(0deg)';
    });
  });

  // Fun alerts on CTAs
  const ctas = document.querySelectorAll('.btn, .nav-cta, .lang-option');
  ctas.forEach(cta => {
    cta.addEventListener('click', (e) => {
      const isSubmit = cta.id === 'btn-submit-form' || cta.type === 'submit';
      if (!isSubmit) {
        e.preventDefault();
        const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
        alert(`🎉 MEME-BOT INCOMING: \n\n${randomJoke}`);
      }
    });
  });

  // Add random funny credits in the console log
  console.log("%c🤖 MEME-CORE MAINFRAME LOADED successfully!", "color: #39ff14; font-size: 16px; font-weight: bold;");
  console.log("%cIf you see this, we officially recruit you into the Guild of High-Fives.", "color: #ff007f; font-style: italic;");
}

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
    dots.forEach(d => d.classList.remove('active'));

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
    slideInterval = setInterval(nextSlide, 5000); // Speed up for comical vibe
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
      tabItems.forEach(item => item.classList.remove('active'));
      tab.classList.add('active');
      visualWrapper.classList.add('switching');
      
      const service = tab.getAttribute('data-service');
      if (service === 'animation') {
        visualWrapper.style.setProperty('--service-accent', '#39ff14');
      } else if (service === 'design') {
        visualWrapper.style.setProperty('--service-accent', '#ff007f');
      } else if (service === 'ai-tools') {
        visualWrapper.style.setProperty('--service-accent', '#00ffff');
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
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');
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
            card.style.transform = 'scale(0.9)';
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
    rootMargin: '0px 0px -10% 0px',
    threshold: 0.05
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
