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
