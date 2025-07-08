(function() {
  // Log all mobile menu elements for debugging
  document.addEventListener('DOMContentLoaded', function() {
    console.log('Debug script loaded');
    
    // Check mobile menu elements
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    console.log('Mobile menu toggle:', mobileMenuToggle);
    console.log('Mobile menu:', mobileMenu);
    
    if (mobileMenuToggle) {
      // Manually add click handler
      console.log('Adding direct click handler to mobile menu toggle');
      mobileMenuToggle.addEventListener('click', function(e) {
        console.log('Mobile menu toggle clicked directly');
        e.preventDefault();
        
        if (mobileMenu) {
          const isActive = mobileMenu.classList.contains('active');
          
          if (isActive) {
            // Close menu
            mobileMenuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
            mobileMenuToggle.setAttribute('aria-label', 'Abrir menú');
            console.log('Mobile menu closed');
          } else {
            // Open menu
            mobileMenuToggle.classList.add('active');
            mobileMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
            mobileMenuToggle.setAttribute('aria-label', 'Cerrar menú');
            console.log('Mobile menu opened');
          }
        }
      });
    } else {
      console.error('Mobile menu toggle not found!');
    }
    
    // Log all click events on body
    document.body.addEventListener('click', function(e) {
      console.log('Click event on:', e.target);
    }, true);
  });
})(); 