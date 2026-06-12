/**
  AETHERIS STUDIO INTERACTIVE SCRIPT (GLITCH-CORE ASCII ARCADE)
  Theme: Glitch-Core ASCII Arcade & Low-Fi Terminal
  File: main-v8.js
*/

document.addEventListener('DOMContentLoaded', () => {
  setupTextScramble();
  setupScrollProgress();
  setupHeaderTransition();
  setupMobileNav();
  setupHeroSlider();
  setupServicesAccordion();
  setupPortfolioFilters();
  setupLanguageSelector();
  setupRevealOnScroll();
});

/* ==========================================================================
   1. TEXT SCRAMBLE MATRIX ENGINE (CRT TERMINAL DECRYPTION DECODER)
   ========================================================================== */
class TextScrambler {
  constructor(el) {
    this.el = el;
    this.chars = '!<>-_\\/[]{}—=+*^?#________%&@$*+?0123456789X█▓▒░';
    this.originalText = this.el.innerText;
    this.queue = [];
    this.frame = 0;
    this.frameRequest = null;
    this.resolve = null;
  }

  setText(newText) {
    this.originalText = newText;
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise((resolve) => this.resolve = resolve);
    this.queue = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * 15); // frames to start scrambling
      const end = start + Math.floor(Math.random() * 20) + 5; // frames to decode
      this.queue.push({ from, to, start, end, char: '' });
    }
    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.tick();
    return promise;
  }

  tick() {
    let complete = true;
    let output = '';
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];
      if (this.frame >= end) {
        complete = complete && true;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.3) {
          char = this.randomChar();
          this.queue[i].char = char;
        }
        complete = false;
        output += char;
      } else {
        complete = false;
        output += from;
      }
    }
    this.el.innerText = output;
    if (complete) {
      if (this.resolve) this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(() => this.tick());
      this.frame++;
    }
  }

  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }

  scramble() {
    return this.setText(this.originalText);
  }
}

function setupTextScramble() {
  const scrambleElements = document.querySelectorAll('[data-scramble]');
  scrambleElements.forEach(el => {
    const scrambler = new TextScrambler(el);
    el._scrambler = scrambler;

    el.addEventListener('mouseenter', () => {
      scrambler.scramble();
    });
  });
}

/* ==========================================================================
   2. SCROLL PROGRESS (PHOSPHOR CYAN BAR)
   ========================================================================== */
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

/* ==========================================================================
   3. HEADER TRANSITION
   ========================================================================== */
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

/* ==========================================================================
   4. MOBILE VIEWPORT NAVIGATION OVERRIDES
   ========================================================================== */
function setupMobileNav() {
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');

  if (!mobileToggle || !navLinks) return;

  mobileToggle.addEventListener('click', () => {
    const isActive = mobileToggle.classList.toggle('mobile-active');
    navLinks.classList.toggle('mobile-active');
    mobileToggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
  });

  // Close when nav links are clicked
  const links = navLinks.querySelectorAll('.nav-link');
  links.forEach(link => {
    link.addEventListener('click', () => {
      mobileToggle.classList.remove('mobile-active');
      navLinks.classList.remove('mobile-active');
      mobileToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ==========================================================================
   5. HARD-STEP RETRO HERO SLIDER (CRT RENDER ENGINE)
   ========================================================================== */
function setupHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.slider-dot');
  const prevBtn = document.getElementById('slider-prev');
  const nextBtn = document.getElementById('slider-next');

  if (slides.length === 0) return;

  let currentIndex = 0;
  let autoplayTimer = null;
  const autoplayDuration = 6000;

  function goToSlide(index) {
    slides[currentIndex].classList.remove('active');
    dots[currentIndex].classList.remove('active');

    currentIndex = (index + slides.length) % slides.length;

    slides[currentIndex].classList.add('active');
    dots[currentIndex].classList.add('active');

    // Scramble the current slide overlay title!
    const activeSlideTitle = slides[currentIndex].querySelector('.hero-slide-title[data-scramble]');
    if (activeSlideTitle && activeSlideTitle._scrambler) {
      activeSlideTitle._scrambler.scramble();
    }

    resetAutoplay();
  }

  function nextSlide() {
    goToSlide(currentIndex + 1);
  }

  function prevSlide() {
    goToSlide(currentIndex - 1);
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
    });
  }

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      goToSlide(index);
    });
  });

  function startAutoplay() {
    autoplayTimer = setInterval(nextSlide, autoplayDuration);
  }

  function resetAutoplay() {
    clearInterval(autoplayTimer);
    startAutoplay();
  }

  startAutoplay();
}

/* ==========================================================================
   6. SERVICES HARWARE DRAWER ACCORDION & FAST SCREEN SWAP
   ========================================================================== */
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
    if (!header) return;

    header.addEventListener('click', () => {
      const isAlreadyActive = item.classList.contains('active');

      // Close all accordions
      accordionItems.forEach(inner => {
        inner.classList.remove('active');
        const h = inner.querySelector('.accordion-header');
        if (h) h.setAttribute('aria-expanded', 'false');
      });

      if (!isAlreadyActive) {
        item.classList.add('active');
        header.setAttribute('aria-expanded', 'true');

        // Scramble the drawer title when selected
        const title = item.querySelector('.accordion-title[data-scramble]');
        if (title && title._scrambler) {
          title._scrambler.scramble();
        }

        // Swap visual image with screen-switch opacity cut
        const targetCategory = item.getAttribute('data-service');
        if (serviceVisualImg && assetsMap[targetCategory]) {
          serviceVisualImg.style.opacity = '0';
          setTimeout(() => {
            serviceVisualImg.src = assetsMap[targetCategory];
            serviceVisualImg.style.opacity = '1';
          }, 100);
        }
      }
    });
  });
}

/* ==========================================================================
   7. INSTANT STEP PORTFOLIO FILTERS
   ========================================================================== */
function setupPortfolioFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.portfolio-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      cards.forEach(card => {
        const category = card.getAttribute('data-category');

        // Retro jump cut (hard visibility swap)
        card.style.opacity = '0';
        card.style.transform = 'translateY(15px) scale(0.95)';

        setTimeout(() => {
          if (filterValue === 'all' || category === filterValue) {
            card.style.display = 'block';
            card.offsetHeight; // Force reflow
            card.style.opacity = '1';
            card.style.transform = 'translateY(0) scale(1)';
          } else {
            card.style.display = 'none';
          }
        }, 120);
      });
    });
  });
}

/* ==========================================================================
   8. SYSTEM LANGUAGE SELECTOR (WITH SYSTEM-WIDE FEEDBACK GLITCH)
   ========================================================================== */
function setupLanguageSelector() {
  const langSelector = document.getElementById('lang-selector');
  if (!langSelector) return;

  const options = langSelector.querySelectorAll('.lang-option');

  options.forEach(opt => {
    opt.addEventListener('click', () => {
      if (opt.classList.contains('active')) return;

      options.forEach(o => o.classList.remove('active'));
      opt.classList.add('active');

      // Glitch critical system nodes for language shift feedback!
      const scrambleTargets = document.querySelectorAll('.logo-text[data-scramble], .nav-cta[data-scramble], .hero-title[data-scramble]');
      scrambleTargets.forEach(el => {
        if (el._scrambler) {
          el._scrambler.scramble();
        }
      });
    });
  });
}

/* ==========================================================================
   9. INTERSECTION OBSERVATION REVEALS & SCROLL NAV TRACKER
   ========================================================================== */
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

        // Scramble child components on dynamic scroll reveal!
        const scrambledChildren = entry.target.querySelectorAll('[data-scramble]');
        scrambledChildren.forEach(el => {
          if (el._scrambler) {
            el._scrambler.scramble();
          }
        });
        if (entry.target.hasAttribute('data-scramble') && entry.target._scrambler) {
          entry.target._scrambler.scramble();
        }

        self.unobserve(entry.target);
      }
    });
  }, observerOptions);

  elements.forEach(element => {
    observer.observe(element);
  });

  // Track active section and update menu highlighted block
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
