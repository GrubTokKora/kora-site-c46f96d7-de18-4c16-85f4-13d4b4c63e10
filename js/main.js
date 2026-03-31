/**
 * Alexa's Hair Artistry - Premium Animations
 * Buttery smooth scroll reveals, magnetic buttons, and micro-interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all animations
    initScrollReveal();
    initHeaderScroll();
    initMagneticButtons();
    initServiceCards();
    initAccordion();
    initMobileMenu();
    initSmoothScroll();
    initHeroAnimations();
    initCountUp();
  });
  
  /**
   * Scroll Reveal Animation using Intersection Observer
   * Smooth, performant reveal animations as elements enter viewport
   */
  function initScrollReveal() {
    const revealElements = document.querySelectorAll('[data-reveal]');
    
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.delay || 0;
          
          setTimeout(() => {
            entry.target.classList.add('revealed');
          }, parseInt(delay));
          
          // Unobserve after revealing
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: '0px 0px -10% 0px',
      threshold: 0.1
    });
    
    revealElements.forEach(el => revealObserver.observe(el));
  }
  
  /**
   * Header scroll effect - adds background blur and shrinks on scroll
   */
  function initHeaderScroll() {
    const header = document.getElementById('header');
    let lastScroll = 0;
    let ticking = false;
    
    const updateHeader = () => {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      
      lastScroll = currentScroll;
      ticking = false;
    };
    
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateHeader);
        ticking = true;
      }
    }, { passive: true });
  }
  
  /**
   * Magnetic Button Effect
   * Buttons subtly follow cursor movement for premium feel
   */
  function initMagneticButtons() {
    const magneticElements = document.querySelectorAll('.magnetic-btn, .magnetic-link');
    
    // Check if touch device
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;
    
    magneticElements.forEach(element => {
      element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        // Subtle movement (max 15px)
        const moveX = x * 0.3;
        const moveY = y * 0.3;
        
        element.style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
      
      element.addEventListener('mouseleave', () => {
        element.style.transform = 'translate(0, 0)';
      });
    });
  }
  
  /**
   * Service Cards - Mouse tracking glow effect
   */
  function initServiceCards() {
    const cards = document.querySelectorAll('.service-card');
    
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        
        card.style.setProperty('--mouse-x', `${x}%`);
        card.style.setProperty('--mouse-y', `${y}%`);
      });
    });
  }
  
  /**
   * Accordion functionality with smooth animations
   */
  function initAccordion() {
    const accordionItems = document.querySelectorAll('.accordion-item');
    
    accordionItems.forEach(item => {
      const trigger = item.querySelector('.accordion-trigger');
      
      trigger.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
        
        // Close all other accordions
        accordionItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('open');
            otherItem.querySelector('.accordion-trigger').setAttribute('aria-expanded', 'false');
          }
        });
        
        // Toggle current
        item.classList.toggle('open');
        trigger.setAttribute('aria-expanded', !isExpanded);
      });
    });
    
    // Open first accordion by default
    if (accordionItems.length > 0) {
      accordionItems[0].classList.add('open');
      accordionItems[0].querySelector('.accordion-trigger').setAttribute('aria-expanded', 'true');
    }
  }
  
  /**
   * Mobile Menu Toggle
   */
  function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = mobileMenu.querySelectorAll('.mobile-link');
    
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when clicking links
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }
  
  /**
   * Smooth Scroll for anchor links
   */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
          const headerOffset = 100;
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }
  
  /**
   * Hero Animations - Title reveal and parallax
   */
  function initHeroAnimations() {
    // Split title into spans for animation
    const titleLines = document.querySelectorAll('.title-line');
    titleLines.forEach(line => {
      const text = line.textContent;
      line.innerHTML = `<span>${text}</span>`;
    });
    
    // Parallax effect on hero image
    const heroImage = document.querySelector('.hero-image');
    if (heroImage && !window.matchMedia('(pointer: coarse)').matches) {
      let ticking = false;
      
      window.addEventListener('scroll', () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.4;
            heroImage.style.transform = `scale(1.1) translateY(${rate}px)`;
            ticking = false;
          });
          ticking = true;
        }
      }, { passive: true });
    }
  }
  
  /**
   * Count Up Animation for Stats
   */
  function initCountUp() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target;
          const countTo = parseInt(target.dataset.count);
          const duration = 2000;
          const startTime = performance.now();
          
          const updateCount = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function (ease-out-expo)
            const easeOutExpo = 1 - Math.pow(2, -10 * progress);
            const currentCount = Math.floor(easeOutExpo * countTo);
            
            target.textContent = currentCount;
            
            if (progress < 1) {
              requestAnimationFrame(updateCount);
            } else {
              target.textContent = countTo;
            }
          };
          
          requestAnimationFrame(updateCount);
          countObserver.unobserve(target);
        }
      });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => countObserver.observe(stat));
  }
  
  /**
   * Custom cursor effect (optional - for desktop only)
   */
  function initCustomCursor() {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });
    
    const animate = () => {
      const dx = mouseX - cursorX;
      const dy = mouseY - cursorY;
      
      cursorX += dx * 0.15;
      cursorY += dy * 0.15;
      
      cursor.style.left = cursorX + 'px';
      cursor.style.top = cursorY + 'px';
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    // Add hover states
    const interactiveElements = document.querySelectorAll('a, button, .service-card');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
    });
  }
  
  // Initialize custom cursor
  document.addEventListener('DOMContentLoaded', () => {
    initCustomCursor();
  });