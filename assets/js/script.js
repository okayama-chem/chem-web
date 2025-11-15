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

  // About Image Slideshow
  $(document).ready(function () {
    var slideshow = $('.about-image-slideshow[data-labs-images]');
    if (slideshow.length > 0) {
      var images = slideshow.find('.about-slide-image');
      var totalImages = images.length;
      
      if (totalImages > 0) {
        // 画像の配列を作成（srcsetも含む）
        var imageArray = [];
        images.each(function() {
          var $img = $(this);
          imageArray.push({
            src: $img.attr('data-image-src'),
            srcset: $img.attr('data-image-srcset') || $img.attr('srcset') || '',
            element: $img
          });
        });
        
        // ランダムにシャッフル（Fisher-Yatesアルゴリズム）
        function shuffleArray(array) {
          for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
          }
          return array;
        }
        
        // 画像をランダムにシャッフル
        var shuffledImages = shuffleArray(imageArray.slice());
        var currentIndex = 0;
        
        // 最初の画像を表示
        function showImage(index) {
          images.css('display', 'none').removeClass('active');
          var imageData = shuffledImages[index];
          var imageElement = imageData.element;
          imageElement.css('display', 'block');
          setTimeout(function() {
            imageElement.addClass('active');
          }, 50);
        }
        
        // 最初の画像を表示
        showImage(0);
        
        // 5秒ごとに画像を切り替え
        setInterval(function() {
          currentIndex = (currentIndex + 1) % shuffledImages.length;
          showImage(currentIndex);
        }, 5000);
      }
    } else {
      // 通常のスライドショー（images配列を使用する場合）
      slideshow = $('.about-image-slideshow');
      if (slideshow.length > 0) {
        var images = slideshow.find('.about-slide-image');
        var currentIndex = 0;
        var totalImages = images.length;
        
        if (totalImages > 1) {
          function showNextImage() {
            // 現在の画像をフェードアウト
            var currentImage = images.eq(currentIndex);
            currentImage.removeClass('active');
            
            // 次の画像のインデックスを計算
            currentIndex = (currentIndex + 1) % totalImages;
            
            // 次の画像をフェードイン
            var nextImage = images.eq(currentIndex);
            // 次のフレームでactiveクラスを追加してフェードイン
            setTimeout(function() {
              nextImage.addClass('active');
            }, 50);
          }
          
          // 5秒ごとに画像を切り替え
          setInterval(showNextImage, 5000);
        }
      }
    }
  });


})(jQuery);