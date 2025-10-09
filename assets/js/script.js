(function ($) {
  'use strict';

  // Preloader js    
  $(window).on('load', function () {
    $('.preloader').fadeOut(100);
  });

  // Sticky Menu
  $(window).scroll(function () {
    var height = $('.top-header').innerHeight();
    if ($('header').offset().top > 10) {
      $('.top-header').addClass('hide');
      $('.navigation').addClass('nav-bg');
      $('.navigation').css('margin-top','-'+height+'px');
    } else {
      $('.top-header').removeClass('hide');
      $('.navigation').removeClass('nav-bg');
      $('.navigation').css('margin-top','-'+0+'px');
    }
  });

  

  // Background-images
  $('[data-background]').each(function () {
    $(this).css({
      'background-image': 'url(' + $(this).data('background') + ')'
    });
  });

  //Hero Slider
  $('.hero-slider').slick({
    autoplay: true,
    autoplaySpeed: 7500,
    pauseOnFocus: false,
    pauseOnHover: false,
    infinite: true,
    arrows: true,
    fade: true,
    prevArrow: '<button type=\'button\' class=\'prevArrow\'><i class=\'ti-angle-left\'></i></button>',
    nextArrow: '<button type=\'button\' class=\'nextArrow\'><i class=\'ti-angle-right\'></i></button>',
    dots: true
  });
  $('.hero-slider').slickAnimation();

  // venobox popup
  $(document).ready(function () {
    $('.venobox').venobox();
  });

  // filter
  $(document).ready(function () {
    var containerEl = document.querySelector('.filtr-container');
    var filterizd;
    if (containerEl) {
      filterizd = $('.filtr-container').filterizr({
        layout: 'sameHeight',
        gutterPixels: 20
      });
    }
    //Active changer
    $('.filter-controls li').on('click', function () {
      $('.filter-controls li').removeClass('active');
      $(this).addClass('active');
    });
    // group-label filter trigger (on same page)
    $('.group-label').on('click', function (e) {
      // Only prevent default if on the faculty list page (not single page)
      if ($(this).data('filter')) {
        e.preventDefault();
        var filterValue = $(this).data('filter');
        $('.filter-controls li').removeClass('active');
        $('.filter-controls li[data-filter="' + filterValue + '"]').addClass('active');
        if (filterizd) {
          filterizd.filterizr('filter', filterValue);
        }
        // Scroll to top of faculty list
        $('html, body').animate({
          scrollTop: $('.filter-controls').offset().top - 100
        }, 500);
      }
    });
    // Apply filter from URL hash on page load
    if (containerEl && window.location.hash) {
      var hashFilter = window.location.hash.substring(1); // Remove the '#'
      $('.filter-controls li').removeClass('active');
      $('.filter-controls li[data-filter="' + hashFilter + '"]').addClass('active');
      if (filterizd) {
        setTimeout(function() {
          filterizd.filterizr('filter', hashFilter);
        }, 100);
      }
    }
  });

  //  Count Up
  function counter() {
    var oTop;
    if ($('.count').length !== 0) {
      oTop = $('.count').offset().top - window.innerHeight;
    }
    if ($(window).scrollTop() > oTop) {
      $('.count').each(function () {
        var $this = $(this),
          countTo = $this.attr('data-count');
        $({
          countNum: $this.text()
        }).animate({
          countNum: countTo
        }, {
          duration: 1000,
          easing: 'swing',
          step: function () {
            $this.text(Math.floor(this.countNum));
          },
          complete: function () {
            $this.text(this.countNum);
          }
        });
      });
    }
  }
  $(window).on('scroll', function () {
    counter();
  });

  // Animation
  $(document).ready(function () {
    $('.has-animation').each(function (index) {
      $(this).delay($(this).data('delay')).queue(function () {
        $(this).addClass('animate-in');
      });
    });
  });


})(jQuery);