// Context7-Based Performance Optimizations

// Optimized scroll handling with requestAnimationFrame
let ticking = false;

function updateHeader() {
  const header = document.querySelector('.header');
  const scrollY = window.pageYOffset;
  
  if (scrollY > 50) {
    header.classList.add('header--scrolled');
  } else {
    header.classList.remove('header--scrolled');
  }
  
  ticking = false;
}

function onScroll() {
  if (!ticking) {
    requestAnimationFrame(updateHeader);
    ticking = true;
  }
}

// Optimized font loading with Font Loading API
async function loadFonts() {
  if ('fonts' in document) {
    document.documentElement.classList.add('fonts-loading');
    
    try {
      await document.fonts.load('700 1em "Bread Forest"');
      document.documentElement.classList.remove('fonts-loading');
      document.documentElement.classList.add('fonts-loaded');
    } catch (error) {
      console.warn('Font loading failed:', error);
      document.documentElement.classList.remove('fonts-loading');
    }
  }
}

// Efficient intersection observer for animations
const animationObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        animationObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
);

// Mobile optimization
function optimizeForMobile() {
  if (window.innerWidth <= 768) {
    // Reduce animation complexity on mobile
    document.documentElement.classList.add('mobile-optimized');
    
    // Optimize video performance
    const video = document.getElementById('background-video');
    if (video) {
      video.setAttribute('playsinline', '');
      video.setAttribute('muted', '');
    }
  }
}

// Critical resource prioritization
function prioritizeResources() {
  // Preload critical resources
  const criticalImages = [
    '/img/hero.webp',
    '/img/logo.svg'
  ];
  
  criticalImages.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
}

// Performance monitoring
function initPerformanceMonitoring() {
  if ('PerformanceObserver' in window) {
    // Monitor Largest Contentful Paint
    const lcpObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const lastEntry = entries[entries.length - 1];
      console.log('LCP:', lastEntry.startTime);
    });
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    
    // Monitor First Input Delay
    const fidObserver = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach(entry => {
        console.log('FID:', entry.processingStart - entry.startTime);
      });
    });
    fidObserver.observe({ entryTypes: ['first-input'] });
  }
}

// Initialize optimizations
document.addEventListener('DOMContentLoaded', () => {
  loadFonts();
  optimizeForMobile();
  prioritizeResources();
  initPerformanceMonitoring();
  
  // Add efficient scroll listener
  window.addEventListener('scroll', onScroll, { passive: true });
  
  // Initialize animation observer
  document.querySelectorAll('.service, .timeline__item, .benefit').forEach(el => {
    animationObserver.observe(el);
  });
});

// Optimize image loading
document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('img[loading="lazy"]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          img.classList.add('loaded');
          imageObserver.unobserve(img);
        }
      });
    });
    
    images.forEach(img => imageObserver.observe(img));
  }
});

// Service Worker registration for better caching
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('ServiceWorker registered:', registration.scope);
      })
      .catch(error => {
        console.log('ServiceWorker registration failed:', error);
      });
  });
} 