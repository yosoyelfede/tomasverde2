/**
 * Loading Fix Script
 * This script ensures the page is marked as loaded and stops the continuous loading indicator
 */

(function() {
  // Force the page to be marked as loaded
  function forcePageLoaded() {
    // Add loaded class to body
    document.body.classList.add('loaded');
    
    // Remove any remaining loading indicators
    document.querySelectorAll('#simple-preloader, .preloader').forEach(el => {
      if (el && el.parentNode) {
        el.style.opacity = '0';
        setTimeout(() => {
          el.parentNode.removeChild(el);
        }, 300);
      }
    });
  }
  
  // Force loaded state on various events
  window.addEventListener('load', forcePageLoaded);
  
  // Backup: force loaded state after 3 seconds
  setTimeout(forcePageLoaded, 3000);
  
  // Force loaded state if document is already interactive or complete
  if (document.readyState === 'interactive' || document.readyState === 'complete') {
    forcePageLoaded();
  }
})(); 