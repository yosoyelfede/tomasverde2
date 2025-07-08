/**
 * Performance Monitoring Script for TomasVerde
 * Lightweight version that only tracks critical metrics
 */

(function() {
  // Only run in development mode or when explicitly enabled
  const isDevMode = window.location.hostname === 'localhost' || 
                    window.location.hostname === '127.0.0.1' ||
                    window.location.search.includes('debug=true');
                    
  if (!isDevMode) return;
  
  // Track page load performance
  window.addEventListener('load', () => {
    if (performance.timing) {
      const perfData = performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
      const domReadyTime = perfData.domComplete - perfData.domLoading;
      
      console.log('Page load performance:');
      console.log('- Total load time:', pageLoadTime, 'ms');
      console.log('- DOM ready time:', domReadyTime, 'ms');
    }
    
    // Check for resource load errors
    if (performance.getEntriesByType) {
      const resources = performance.getEntriesByType('resource');
      const failedResources = resources.filter(r => r.transferSize === 0 && !r.name.includes('data:'));
      
      if (failedResources.length > 0) {
        console.warn('Potentially failed resource loads:', failedResources.map(r => r.name));
      }
    }
  });
  
  // Error tracking
  window.addEventListener('error', (event) => {
    console.error('Global error:', event.message);
  });
})(); 