// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Show page content and hide loading indicator when critical resources are loaded
  window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    const preloader = document.querySelector('.preloader');
    if (preloader) {
      preloader.style.opacity = '0';
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 500);
    }
  });

  // Set correct viewport height for mobile
  setViewportHeight();
  window.addEventListener('resize', setViewportHeight);

  // Initialize critical components first
  initBackgroundVideo();
  
  // Enable native lazy loading for images
  enableLazyLoading();

  // Initialize less critical features
  console.log('About to initialize mobile menu...');
  initMobileMenu();
  initSmoothScroll();
  initBackToTop();
  initContactForm();
  initStatsCounter();
  initHeaderScroll();
  
  // Initialize lightbox if available
  if (window.GLightbox) {
    initLightbox();
  }
  
  // Initialize Swiper for testimonials if available
  if (window.Swiper) {
    try {
      const testimonialSwiper = new Swiper('.testimonials__slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      });
    } catch (err) {
      console.log('Swiper initialization error:', err);
    }
  }
});

// Fix viewport height for mobile
function setViewportHeight() {
  // First get the viewport height and multiply it by 1% to get a value for a vh unit
  const vh = window.innerHeight * 0.01;
  // Then set the value in the --vh custom property to the root of the document
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Initialize header scroll effect
function initHeaderScroll() {
  const header = document.querySelector('.header');
  const logo = document.querySelector('.nav__logo-image');
  if (!header || !logo) return;
  
  console.log('Header scroll effect initialized');
  
  let ticking = false;
  
  // Store the initial logo position
  const logoRect = logo.getBoundingClientRect();
  const initialLogoLeft = logoRect.left;
  const initialLogoTop = logoRect.top;
  
  // Initial check in case page is loaded already scrolled
  checkHeaderScroll();
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        checkHeaderScroll();
        ticking = false;
      });
      
      ticking = true;
    }
  }, { passive: true });
  
  function checkHeaderScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Simply toggle classes and let CSS handle the smooth transitions
    if (scrollTop <= 10) {
      header.classList.remove('header--scrolled');
    } else {
      header.classList.add('header--scrolled');
    }
  }
}

// Smooth scroll initialization
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const target = document.querySelector(targetId);
      
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 70,
          behavior: 'smooth'
        });
      }
    });
  });
}

// Initialize lightbox
function initLightbox() {
  const lightbox = GLightbox({
    selector: '[data-gallery]',
    touchNavigation: true,
    loop: true
  });
}

// Initialize stats counter
function initStatsCounter() {
  const counters = document.querySelectorAll('.stats__number');
  
  if (counters.length === 0) return;
  
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.getAttribute('data-target'), 10);
        const duration = 1500;
        const startTime = performance.now();
        
        const updateCounter = () => {
          const currentTime = performance.now();
          const elapsedTime = currentTime - startTime;
          const progress = Math.min(elapsedTime / duration, 1);
          
          const currentValue = Math.floor(progress * target);
          counter.textContent = currentValue;
          
          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target;
          }
        };
        
        updateCounter();
        counterObserver.unobserve(counter);
      }
    });
  }, { threshold: 0.5 });
  
  counters.forEach(counter => {
    counterObserver.observe(counter);
  });
}

// Initialize back to top button
function initBackToTop() {
  const backToTopBtn = document.querySelector('.back-to-top');
  
  if (!backToTopBtn) return;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  }, { passive: true });
  
  backToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// Initialize contact form
function initContactForm() {
  const contactForm = document.querySelector('.contact__form form');
  
  if (!contactForm) return;
  
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const nameInput = contactForm.querySelector('input[name="name"]');
    const emailInput = contactForm.querySelector('input[name="email"]');
    const messageInput = contactForm.querySelector('textarea[name="message"]');
    
    if (!nameInput.value.trim()) {
      showFormError('Por favor, ingresa tu nombre');
      return;
    }
    
    if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
      showFormError('Por favor, ingresa un email válido');
      return;
    }
    
    if (!messageInput.value.trim()) {
      showFormError('Por favor, ingresa tu mensaje');
      return;
    }
    
    // Form is valid, submit it (replace with actual submission code)
    const formData = new FormData(contactForm);
    
    // Show success message
    const formStatus = contactForm.querySelector('.form__status');
    if (formStatus) {
      formStatus.textContent = '¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.';
      formStatus.classList.add('success');
      formStatus.classList.remove('error');
      formStatus.style.display = 'block';
    }
    
    // Clear form
    contactForm.reset();
  });
}

// Email validation helper
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Show form error helper
function showFormError(message) {
  const formStatus = document.querySelector('.form__status');
  
  if (formStatus) {
    formStatus.textContent = message;
    formStatus.classList.add('error');
    formStatus.classList.remove('success');
    formStatus.style.display = 'block';
    
    // Hide after 3 seconds
    setTimeout(() => {
      formStatus.style.display = 'none';
    }, 3000);
  }
}

// Initialize background video
function initBackgroundVideo() {
  const video = document.getElementById('background-video');
  if (!video) {
    console.log('Background video element not found');
    return;
  }
  
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  // Set up video with proper attributes for all devices
  console.log('Initializing background video for ' + (isMobile ? 'mobile' : 'desktop'));
  video.muted = true;
  video.playsInline = true;
  video.autoplay = true;
  
  // Specific handling for mobile
  if (isMobile) {
    console.log('Setting mobile-specific attributes for video');
    // Keep video visible but use optimized settings
    video.setAttribute('preload', 'metadata');
    video.setAttribute('playsinline', 'true');
    video.setAttribute('webkit-playsinline', 'true');
    video.setAttribute('muted', 'true');
  }
  
  if ('play' in HTMLMediaElement.prototype) {
    
    // Load video on demand to improve initial page load
    video.addEventListener('loadeddata', () => {
      // Play video once loaded
      video.play().catch(error => {
        console.log('Auto-play prevented:', error);
        
        // Try playing on user interaction
        const playOnTouch = () => {
          video.play().then(() => {
            document.removeEventListener('touchstart', playOnTouch);
            document.removeEventListener('click', playOnTouch);
          }).catch(() => {});
        };
        
        document.addEventListener('touchstart', playOnTouch, { once: true });
        document.addEventListener('click', playOnTouch, { once: true });
      });
      
      // Show video once it's playing
      video.addEventListener('playing', () => {
        video.style.opacity = '1';
        
        // Hide static background when video is playing
        const staticBg = document.querySelector('.background-static');
        if (staticBg) {
          staticBg.style.opacity = '0';
        }
      });
    });
    
    // Handle video loading errors
    video.addEventListener('error', () => {
      console.log('Video failed to load, showing static background');
      video.style.display = 'none';
      const staticBg = document.querySelector('.background-static');
      if (staticBg) {
        staticBg.style.opacity = '1';
        staticBg.style.zIndex = '-99';
      }
    });
    
    // Set video source - already in HTML, just load
    video.load();
    
    // Update video position on resize (but limit frequency of updates)
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(updateVideoPosition, 200);
    });
    
    // Initial position update
    updateVideoPosition();
  } else {
    // For users who prefer reduced motion, hide video and show static background
    video.style.display = 'none';
    const staticBg = document.querySelector('.background-static');
    if (staticBg) {
      staticBg.style.opacity = '1';
      staticBg.style.zIndex = '-99';
    }
  }
  
  function updateVideoPosition() {
    if (!video) return;
    
    // Only apply special positioning if needed
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const videoRatio = 16 / 9; // Assuming 16:9 video
    const windowRatio = windowWidth / windowHeight;
    
    if (windowRatio < videoRatio) {
      // Window is taller than video aspect ratio
      const videoWidth = windowHeight * videoRatio;
      video.style.width = videoWidth + 'px';
      video.style.height = '100%';
      video.style.left = (windowWidth - videoWidth) / 2 + 'px';
      video.style.top = '0';
    } else {
      // Window is wider than video aspect ratio
      const videoHeight = windowWidth / videoRatio;
      video.style.width = '100%';
      video.style.height = videoHeight + 'px';
      video.style.left = '0';
      video.style.top = (windowHeight - videoHeight) / 2 + 'px';
    }
  }
}

// Check if device is low power (for video optimization)
function isLowPowerDevice() {
  // Check for low memory
  if (navigator.deviceMemory && navigator.deviceMemory < 4) {
    return true;
  }
  
  // Check for battery API
  if (navigator.getBattery) {
    navigator.getBattery().then(battery => {
      if (battery.charging === false && battery.level < 0.15) {
        return true;
      }
    }).catch(() => {});
  }
  
  // Detect mobile device
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  return (isMobile && prefersReducedMotion);
}

// Enable native lazy loading for images
function enableLazyLoading() {
  const images = document.querySelectorAll('img[loading="lazy"]');
  
  if ('loading' in HTMLImageElement.prototype) {
    // Native lazy loading is supported
    images.forEach(img => {
      img.loading = 'lazy';
    });
  } else {
    // Fallback for browsers that don't support native lazy loading
    // You could add a polyfill here if needed
    console.log('Native lazy loading not supported, consider adding a polyfill');
  }
}

// Initialize mobile menu
function initMobileMenu() {
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileMenuLinks = document.querySelectorAll('.mobile-menu__link');
  
  console.log('Mobile menu elements:', {
    toggle: mobileMenuToggle,
    menu: mobileMenu,
    links: mobileMenuLinks.length
  });
  
  if (!mobileMenuToggle || !mobileMenu) {
    console.error('Mobile menu elements not found!');
    return;
  }
  
  // Toggle mobile menu
  mobileMenuToggle.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('Mobile menu toggle clicked!');
    const isOpen = mobileMenuToggle.classList.contains('active');
    console.log('Menu is currently:', isOpen ? 'open' : 'closed');
    
    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });
  
  // Close menu when clicking on links
  mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });
  
  // Close menu when clicking outside
  mobileMenu.addEventListener('click', (e) => {
    if (e.target === mobileMenu) {
      closeMobileMenu();
    }
  });
  
  // Close menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenuToggle.classList.contains('active')) {
      closeMobileMenu();
    }
  });
  
  function openMobileMenu() {
    console.log('Opening mobile menu...');
    mobileMenuToggle.classList.add('active');
    mobileMenu.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
    mobileMenuToggle.setAttribute('aria-label', 'Cerrar menú');
    console.log('Mobile menu opened');
  }
  
  function closeMobileMenu() {
    console.log('Closing mobile menu...');
    mobileMenuToggle.classList.remove('active');
    mobileMenu.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
    mobileMenuToggle.setAttribute('aria-label', 'Abrir menú');
    console.log('Mobile menu closed');
  }
}