document.addEventListener("DOMContentLoaded", function() {
  console.log("Cache busting script loaded");
  
  // Force browser to reload cached resources
  const version = 'v=5';
  const links = document.querySelectorAll('link[rel="stylesheet"]');
  const scripts = document.querySelectorAll('script[src]');
  const images = document.querySelectorAll('img[src]');
  
  // Update stylesheet links
  links.forEach(link => {
    if (link.href && !link.href.includes('googleapis') && !link.href.includes('unpkg.com') && !link.href.includes('cdn')) {
      link.href = updateQueryParam(link.href, version);
    }
  });
  
  // Update script sources
  scripts.forEach(script => {
    if (script.src && !script.src.includes('googleapis') && !script.src.includes('unpkg.com') && !script.src.includes('cdn')) {
      script.src = updateQueryParam(script.src, version);
    }
  });
  
  // Update image sources
  images.forEach(img => {
    if (img.src) {
      img.src = updateQueryParam(img.src, version);
    }
  });
  
  // Font loading detection
  const fontLoader = new FontFace('Bread Forest', 'url(fonts/bread-forest.otf?v=5)');
  
  fontLoader.load().then(function(loadedFace) {
    document.fonts.add(loadedFace);
    document.documentElement.classList.add('font-loaded');
    console.log('Bread Forest font loaded successfully');
  }).catch(function(error) {
    console.error('Font loading failed:', error);
  });
  
  // Helper function to update query parameters
  function updateQueryParam(url, param) {
    // If URL already has query parameters
    if (url.includes('?')) {
      // If URL already has v= parameter, replace it
      if (url.includes('v=')) {
        return url.replace(/v=\d+/, param);
      } else {
        // Otherwise add the v= parameter
        return url + '&' + param;
      }
    } else {
      // If URL has no query parameters, add v= parameter
      return url + '?' + param;
    }
  }
});
