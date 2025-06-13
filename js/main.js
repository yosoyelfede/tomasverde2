// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize GSAP if available
  if (window.gsap) {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
  }
  
  // El preloader ahora se maneja directamente en el HTML con scripts inline
  
  // Initialize mobile navigation
  initMobileNav();
  
  // Initialize scroll animations - excepto para secciones con problemas
  initScrollAnimations({
    excludeSections: ['#servicios'] // Excluir sección de servicios de las animaciones
  });
  
  // Initialize GLightbox if available
  if (window.GLightbox) {
    initLightbox();
  }
  
  // Initialize stats counter
  initStatsCounter();
  
  // Initialize back to top button
  initBackToTop();
  
  // Initialize contact form
  initContactForm();
  
  // Initialize background video
  initBackgroundVideo();
  
  // Initialize AOS if available
  if (window.AOS) {
    AOS.init({
      duration: 1000,
      easing: 'ease-out-back',
      once: true,
      offset: 50
    });
  }
  
  // No usar Locomotive Scroll por ahora ya que puede causar problemas de rendimiento
  // if (window.LocomotiveScroll) {
  //   try {
  //     const scroll = new LocomotiveScroll({
  //       el: document.querySelector('[data-scroll-container]'),
  //       smooth: true,
  //       multiplier: 1,
  //       lerp: 0.05
  //     });
  //   } catch (err) {
  //     console.log('Locomotive Scroll initialization error:', err);
  //   }
  // }
  
  // Deshabilitar cursor personalizado para evitar problemas de rendimiento
  // const cursor = document.querySelector('.cursor');
  // const cursorFollower = document.querySelector('.cursor-follower');
  
  // if (cursor && cursorFollower) {
  //   document.addEventListener('mousemove', (e) => {
  //     if (window.gsap) {
  //       gsap.to(cursor, {
  //         x: e.clientX,
  //         y: e.clientY,
  //         duration: 0.1
  //       });
  //       
  //       gsap.to(cursorFollower, {
  //         x: e.clientX,
  //         y: e.clientY,
  //         duration: 0.3
  //       });
  //     }
  //   });
  // }
  
  // Magnetic buttons
  const magneticButtons = document.querySelectorAll('.magnetic');
  
  if (window.gsap) {
    magneticButtons.forEach(button => {
      button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(button, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 0.3
        });
      });
      
      button.addEventListener('mouseleave', () => {
        gsap.to(button, {
          x: 0,
          y: 0,
          duration: 0.3
        });
      });
    });
  }
  
  // Split text animation if available
  if (window.SplitType) {
    const splitTextElements = document.querySelectorAll('.split-text');
    
    splitTextElements.forEach(element => {
      const text = new SplitType(element, { types: 'chars' });
      
      if (window.gsap) {
        gsap.from(text.chars, {
          opacity: 0,
          y: 20,
          duration: 0.5,
          stagger: 0.02,
          ease: 'back.out'
        });
      }
    });
  }
  
  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const target = document.querySelector(targetId);
      
      if (target) {
        if (window.gsap && window.ScrollToPlugin) {
          gsap.to(window, {
            duration: 1,
            scrollTo: {
              y: target,
              offsetY: 70
            },
            ease: "power2.inOut"
          });
        } else {
          // Fallback smooth scroll
          window.scrollTo({
            top: target.offsetTop - 70,
            behavior: 'smooth'
          });
        }
      }
    });
  });
  
  // Header scroll effect
  let lastScroll = 0;
  const header = document.querySelector('.header');
  
  if (header) {
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll <= 0) {
        header.classList.remove('header--hidden');
        return;
      }
      
      if (currentScroll > lastScroll && !header.classList.contains('header--hidden')) {
        header.classList.add('header--hidden');
      } else if (currentScroll < lastScroll && header.classList.contains('header--hidden')) {
        header.classList.remove('header--hidden');
      }
      
      lastScroll = currentScroll;
    });
  }
  
  // Mobile menu
  const menuToggle = document.querySelector('.nav__toggle');
  const navMenu = document.querySelector('.nav__menu');
  
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      const isOpen = menuToggle.classList.contains('active');
      
      if (!isOpen) {
        menuToggle.classList.add('active');
        if (window.gsap) {
          gsap.to(navMenu, {
            x: 0,
            duration: 0.5,
            ease: "power2.out"
          });
          
          // Animar items del menú
          gsap.from('.nav__menu li', {
            x: 50,
            opacity: 0,
            duration: 0.3,
            stagger: 0.1,
            ease: "power2.out"
          });
        } else {
          // Fallback
          navMenu.style.transform = 'translateX(0)';
          navMenu.classList.add('active');
        }
      } else {
        menuToggle.classList.remove('active');
        if (window.gsap) {
          gsap.to(navMenu, {
            x: '100%',
            duration: 0.5,
            ease: "power2.in"
          });
        } else {
          // Fallback
          navMenu.style.transform = 'translateX(100%)';
          navMenu.classList.remove('active');
        }
      }
    });
  }
  
  // Initialize GLightbox if available
  if (window.GLightbox) {
    const lightbox = GLightbox({
      selector: '[data-gallery]',
      touchNavigation: true,
      loop: true
    });
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

  // Deshabilitar falling leaves animation por problemas de rendimiento
  // setTimeout(() => {
  //   createFallingLeaves();
  // }, 1000);
});

// Initialize Mobile Nav
function initMobileNav() {
  try {
    const navToggle = document.querySelector('.nav__toggle');
    const navMenu = document.querySelector('.nav__menu');
    
    if (!navToggle || !navMenu) return;
    
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('nav__menu--active');
    });
    
    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav__link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('nav__menu--active');
      });
    });
  } catch (error) {
    console.error('Error initializing mobile nav:', error);
  }
}

// Initialize Scroll Animations
function initScrollAnimations(options = {}) {
  try {
    if (!window.gsap || !window.ScrollTrigger) return;
    
    // Extract options
    const excludeSections = options.excludeSections || [];
    
    // Función para verificar si un elemento está en una sección excluida
    function isInExcludedSection(element) {
      if (!excludeSections.length) return false;
      
      for (const selector of excludeSections) {
        const excludedSection = document.querySelector(selector);
        if (excludedSection && excludedSection.contains(element)) {
          return true;
        }
      }
      return false;
    }
    
    // Fade in animations
    gsap.utils.toArray('.fade-in').forEach(element => {
      // Skip if in excluded section
      if (isInExcludedSection(element)) return;
      gsap.from(element, {
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      });
    });
    
    // Slide up animations
    gsap.utils.toArray('.slide-up').forEach(element => {
      // Skip if in excluded section
      if (isInExcludedSection(element)) return;
      gsap.from(element, {
        y: 50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      });
    });
    
    // Slide left animations
    gsap.utils.toArray('.slide-left').forEach(element => {
      // Skip if in excluded section
      if (isInExcludedSection(element)) return;
      gsap.from(element, {
        x: -50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      });
    });
    
    // Slide right animations
    gsap.utils.toArray('.slide-right').forEach(element => {
      // Skip if in excluded section
      if (isInExcludedSection(element)) return;
      gsap.from(element, {
        x: 50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      });
    });
    
    // Scale in animations
    gsap.utils.toArray('.scale-in').forEach(element => {
      // Skip if in excluded section
      if (isInExcludedSection(element)) return;
      gsap.from(element, {
        scale: 0.8,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      });
    });
  } catch (error) {
    console.error('Error initializing scroll animations:', error);
  }
}

// Lightbox initialization
function initLightbox() {
  try {
    if (typeof GLightbox === 'undefined') return;
    
    GLightbox({
      selector: '.gallery__item',
      touchNavigation: true,
      loop: true
    });
  } catch (error) {
    console.error('Error initializing lightbox:', error);
  }
}

// Stats counter
function initStatsCounter() {
  try {
    if (!window.gsap || !window.ScrollTrigger) return;
    
    const statsElements = document.querySelectorAll('.impact-number__value');
    
    statsElements.forEach(stat => {
      const value = parseFloat(stat.innerText.replace(/[^\d.-]/g, ''));
      let suffix = stat.innerText.replace(/[\d.-]/g, '');
      
      gsap.to(stat, {
        innerHTML: 0,
        duration: 0,
        onComplete: function() {
          gsap.to(stat, {
            innerHTML: value,
            duration: 2,
            ease: 'power2.out',
            snap: { innerHTML: 1 },
            onUpdate: function() {
              stat.innerHTML = Math.round(parseFloat(stat.innerHTML)) + suffix;
            },
            scrollTrigger: {
              trigger: stat,
              start: 'top 80%',
              once: true
            }
          });
        }
      });
    });
  } catch (error) {
    console.error('Error initializing stats counter:', error);
  }
}

// Back to top button
function initBackToTop() {
  try {
    const backToTop = document.querySelector('.back-to-top');
    
    if (!backToTop) {
      // Create back to top button if it doesn't exist
      const btn = document.createElement('button');
      btn.classList.add('back-to-top');
      btn.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24"><path d="M12 3l7 7-1.41 1.41L13 6.83v14.17h-2V6.83L6.41 11.41 5 10l7-7z"/></svg>';
      document.body.appendChild(btn);
      
      window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
          btn.classList.add('show');
        } else {
          btn.classList.remove('show');
        }
      });
      
      btn.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }
  } catch (error) {
    console.error('Error initializing back to top button:', error);
  }
}

// Contact form
function initContactForm() {
  try {
    const contactForm = document.querySelector('.contact-form');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(event) {
      event.preventDefault();
      
      const nameInput = contactForm.querySelector('#nombre');
      const emailInput = contactForm.querySelector('#email');
      const messageInput = contactForm.querySelector('#mensaje');
      
      if (!nameInput || !emailInput || !messageInput) return;
      
      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const message = messageInput.value.trim();
      
      if (!name) {
        showFormError('Por favor, introduce tu nombre');
        return;
      }
      
      if (!email || !isValidEmail(email)) {
        showFormError('Por favor, introduce un email válido');
        return;
      }
      
      if (!message) {
        showFormError('Por favor, introduce un mensaje');
        return;
      }
      
      // Simulación de envío del formulario
      const submitButton = contactForm.querySelector('button[type="submit"]');
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.innerText = 'Enviando...';
      }
      
      setTimeout(() => {
        alert('¡Mensaje enviado con éxito! Gracias por contactar con nosotros.');
        contactForm.reset();
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.innerText = 'Enviar mensaje';
        }
      }, 1500);
    });
  } catch (error) {
    console.error('Error initializing contact form:', error);
  }
}

// Validate email format
function isValidEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

// Show form error
function showFormError(message) {
  try {
    let errorDiv = document.querySelector('.form-error');
    
    if (!errorDiv) {
      errorDiv = document.createElement('div');
      errorDiv.classList.add('form-error');
      document.querySelector('.contact-form').prepend(errorDiv);
    }
    
    errorDiv.textContent = message;
    errorDiv.style.color = 'red';
    errorDiv.style.marginBottom = '20px';
    errorDiv.style.padding = '10px';
    errorDiv.style.backgroundColor = 'rgba(255, 0, 0, 0.1)';
    
    setTimeout(() => {
      errorDiv.remove();
    }, 5000);
  } catch (error) {
    console.error('Error showing form error:', error);
    alert(message);
  }
}

// Create falling leaves animation
function createFallingLeaves() {
  try {
    // Check if container already exists
    let leavesContainer = document.querySelector('.falling-leaves');
    
    if (!leavesContainer) {
      leavesContainer = document.createElement('div');
      leavesContainer.classList.add('falling-leaves');
      document.body.appendChild(leavesContainer);
    }
    
    // Clear existing leaves
    leavesContainer.innerHTML = '';
    
    // Number of leaves based on screen size
    const numberOfLeaves = window.innerWidth < 768 ? 6 : 12;
    
    // Create leaves
    for (let i = 0; i < numberOfLeaves; i++) {
      createLeaf(leavesContainer);
    }
  } catch (error) {
    console.error('Error creating falling leaves:', error);
  }
}

// Create a single leaf
function createLeaf(container) {
  try {
    const leaf = document.createElement('div');
    leaf.classList.add('leaf');
    
    // Random position, size and animation properties
    const size = Math.random() * 15 + 15; // 15-30px
    const left = Math.random() * 100; // 0-100%
    const animationDuration = Math.random() * 10 + 10; // 10-20s
    const animationDelay = Math.random() * 10; // 0-10s
    
    // Apply styles
    leaf.style.width = `${size}px`;
    leaf.style.height = `${size}px`;
    leaf.style.left = `${left}%`;
    leaf.style.top = '-50px';
    leaf.style.opacity = Math.random() * 0.5 + 0.3; // 0.3-0.8
    leaf.style.transform = `rotate(${Math.random() * 360}deg)`;
    
    // Add animation
    leaf.style.animation = `falling ${animationDuration}s linear ${animationDelay}s infinite`;
    
    // Append to container
    container.appendChild(leaf);
    
    // Create animation keyframes if they don't exist yet
    if (!document.querySelector('#leaf-animation')) {
      const style = document.createElement('style');
      style.id = 'leaf-animation';
      style.textContent = `
        @keyframes falling {
          0% {
            top: -50px;
            transform: translateX(0) rotate(0deg) scale(1);
          }
          
          25% {
            transform: translateX(100px) rotate(90deg) scale(0.9);
          }
          
          50% {
            transform: translateX(-100px) rotate(180deg) scale(1.1);
          }
          
          75% {
            transform: translateX(50px) rotate(270deg) scale(0.9);
          }
          
          100% {
            top: calc(100% + 50px);
            transform: translateX(-50px) rotate(360deg) scale(1);
          }
        }
      `;
      document.head.appendChild(style);
    }
  } catch (error) {
    console.error('Error creating leaf element:', error);
  }
}

// Función para manejar el fondo con GIF
function initBackgroundVideo() {
  const backgroundGif = document.getElementById('background-gif');
  
  if (backgroundGif) {
    console.log('Inicializando fondo con GIF');
    
    // Verificar si el GIF se carga correctamente
    const img = new Image();
    img.onload = () => {
      console.log('GIF de fondo cargado correctamente');
      backgroundGif.style.opacity = '1';
    };
    
    img.onerror = () => {
      console.error('Error al cargar el GIF de fondo');
      // Fallback a una imagen en caso de error
      document.body.style.backgroundImage = 'url("img/hero.jpg")';
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundPosition = 'center';
      document.body.style.backgroundAttachment = 'fixed';
    };
    
    // Intentar cargar el GIF
    img.src = 'img/tomasverde.gif';
    
    // Optimización para dispositivos móviles
    if (window.matchMedia('(max-width: 768px)').matches) {
      // En móviles, podemos ajustar la calidad o tamaño del GIF para mejorar rendimiento
      backgroundGif.style.backgroundSize = 'auto';
    }
  }
}