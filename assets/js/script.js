/*
 * Author: Eugene Tsurcan 
 * Front End Developer 
 * [http://twitter.com/eugenetsurcan]
 * 
 */

$.noConflict();

var eoi = eoi || {};

(function($) {
  
  // Init JS
  eoi.init = function() {
    
    // Init Foundation
    $(document).foundation();
    
    // Init Fancybox
    $("[data-fancybox] a, a[data-fancybox]").fancybox({
      openEffect    : 'elastic',
      closeEffect   : 'elastic',
      scrolling     : 'no',
      helpers       : {
        title : {
          type : 'outside'        
        },
        media : true
      }
    });
    
    // Navigation Events
    $(document).on('click', '.nav-open', function(e) {
      e.preventDefault();
      
      if(!$('body').hasClass('navigation-open')) $('body').addClass('navigation-open');
    });
    
    $(document).on('click', '.nav-close', function(e) {
      e.preventDefault();
      
      if($('body').hasClass('navigation-open')) $('body').removeClass('navigation-open');
    });
    
    $(document).on('click', '#content', function(e) {
      if($('body').hasClass('navigation-open')) $('body').removeClass('navigation-open');
    });   
    
    // Init Testiomonials
    eoi.testimonials(); 
    
    // Init Validate
    $('form').each(function() {
      $(this).validate({
        errorElement: "small"
      });
    });
    
    // Init Polaroid Photobar Gallery
    eoi.polaroidPhotobarGallery();
    
    
    /*
     * View Full Site for Responsive Web Design
     */
    
    // viewport stuff
    var targetWidth = 768;
    var deviceWidth = 'device-width';
    var viewport = $('meta[name="viewport"]');
    
    // check to see if local storage value is set on page load
    localStorage.isResponsive = (localStorage.isResponsive == undefined) ? 'true' : localStorage.isResponsive;
    
    var showFullSite = function() {    
      viewport.attr('content', 'width=' + targetWidth);  
      
      htmlButtonOptimized = ''+
        '<p class="text-center show-for-medium-up">'+
          '<button id="view-full" class="button medium radius alert">View Mobile Optimized</button>'+
        '</p>';
        
      $('#view-options').append(htmlButtonOptimized);
      
      localStorage.isResponsive = 'false';
    }
    
    var showMobileOptimized = function() {
      localStorage.isResponsive = 'true';
      viewport.attr('content', 'width=' + deviceWidth);
    }
    
    // if the user previously chose to view full site, change the viewport
    if(Modernizr.localstorage) {
      if(localStorage.isResponsive == 'false') {
        showFullSite();
      }
    }    
    
    $('#view-full').on('click', function() {
      showFullSite();
    });
    
    $('#view-options').on('click', '#view-responsive', function() {
      showMobileOptimized();
    });
    
  };
  
  
  /**
   * Testiomonials
   * 
   * @param class/id (str) Wrapper element (parent)
   * @param int Delay (ms)
   */ 
  eoi.testimonials = function(options) {
    var options             = options || {},
        wrapper             = options.wrapper || '#testimonials',
        delay               = options.delay || 4000, // = 4s
        currentTestimonial  = $(wrapper).find('> li.active'),
        newTestimonial      = '';
        
    if(currentTestimonial.next('li').length) { 
      newTestimonial = currentTestimonial.next('li');
    }
    else {
      newTestimonial = $(wrapper).find('> li').eq(0);
    }
    
    currentTestimonial.removeClass('active');
    newTestimonial.addClass('active');
    
    // Delay
    setTimeout(function(){
      eoi.testimonials({wrapper: wrapper, delay: delay});
    }, delay);  
  };
  
  
  /**
   * Polaroid Photobar Gallery
   * 
   * @param class/id (str) Wrapper element (parent)
   */
  eoi.polaroidPhotobarGallery = function(options) {
    var options   = options || {},
        wrapper   = options.wrapper || '#polaroid-photobar-gallery';
    
    $(wrapper).find('img').each(function() {
      var image = $(this);
      
      // Set Random - rotate
      r = getRandomInt(-4, 4);
      image.css('transform', 'rotate('+ r +'deg)');
      
      // Set Random - position top
      r = getRandomInt(-10, 10) / 16;
      image.css('top', r +'em');
      
      // Set Random - position left
      r = getRandomInt(-3, 3) / 16;
      image.css('left', r +'em');
      
      // Set Random - padding
      r = getRandomInt(3, 7) / 16;
      image.css('padding', r +'em');
      
      // Set Random - z-index
      r = getRandomInt(1, 2);
      image.css('z-index', r);
    });
  };
  
  // get Random Int between Min and Max
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  
  /**
   * Restaurant Logos
   * 
   * @param class/id (str) Wrapper element (parent)
   * @param int Delay (ms)
   */ 
  eoi.restaurantLogos = function(options) {
    var options   = options || {},
        wrapper   = options.wrapper || '#restourant-logos',
        delay     = options.delay || 5000; // = 5s
    
    timer = setInterval(function() {
      eoi.restaurantLogos.changeLogo({
        wrapper: wrapper
      });
    }, delay);
    
    $(wrapper).find('> li').each(function() {
      $(this).find('> ul > li').each(function() {
        // IF Image not exist src
        img = $(this).find('img');
        
        if(img.attr('src') == '') {
          img.attr('src', img.data('src'));
        }
      })
    });
  };
  
  eoi.restaurantLogos.changeLogo = function(options) {
    var options   = options || {},
        wrapper   = options.wrapper;
    
    $(wrapper).find('> li').each(function(i) {
      var self = this;
      
      setTimeout(function() {        
        currentLogo = $(self).find('> ul > li.active');
      
        if(currentLogo.next('li').html() !== undefined) {
          newLogo = currentLogo.next('li');
        }
        else {
          newLogo = $(self).find('> ul > li').eq(0);
        }
        
        currentLogo.removeClass('active');
        newLogo.addClass('active');        
      }, 300 * i);      
    });
  };
  
  
  // Document is fully loaded including graphics
  $(window).load(function () {
    
    // Restaurant Logos Init
    eoi.restaurantLogos();
    
  });
  
  
  // Document Ready
  $(function($) {
    eoi.init();
  });

})(jQuery);

