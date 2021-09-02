(function ($) {
  'use strict';

  // ===== 04. Banner Slider
  function bannerSlider() {
    var banner = $('.banner-slider');
    var bannerFirst = $('.sinlge-banner:first-child');

    banner.on('init', function (e, slick) {
      var firstAnimatingElements = bannerFirst.find(
        '[data-animation]'
      );
      slideanimate(firstAnimatingElements);
    });

    banner.on('beforeChange', function (
      e,
      slick,
      currentSlide,
      nextSlide
    ) {
      var animatingElements = $(
        'div.slick-slide[data-slick-index="' + nextSlide + '"]'
      ).find('[data-animation]');
      slideanimate(animatingElements);
    });

    banner.slick({
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: false,
      autoplaySpeed: 5000,
      speed: 500,
      arrows: true,
      fade: true,
      dots: false,
      swipe: true,
      nextArrow: '<button class="slick-arrow next-arrow"><i class="far fa-angle-right"></i></button>',
      prevArrow: '<button class="slick-arrow prev-arrow"><i class="far fa-angle-left"></i></button>',
      appendArrows: $('.banner-nav'),
    });
  }

  // ===== 05. Slider Animation
  function slideanimate(elements) {
    var animationEndEvents =
      'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
    elements.each(function () {
      var $this = $(this);
      var animationDelay = $this.data('delay');
      var animationType = 'animated ' + $this.data('animation');
      $this.css({
        'animation-delay': animationDelay,
        '-webkit-animation-delay': animationDelay,
      });
      $this
        .addClass(animationType)
        .one(animationEndEvents, function () {
          $this.removeClass(animationType);
        });
    });
  }

  /*---------------------
  === DOCUMENT READY  ===
  ----------------------*/
  bannerSlider();

})(jQuery);
