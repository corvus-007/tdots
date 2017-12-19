(function ($) {
  document.addEventListener('DOMContentLoaded', function () {
    svg4everybody();
    $.fancybox.defaults.animationEffect = 'zoom-in-out';

    var clientReviewsSlider = document.querySelector('.client-reviews-slider');

    if (clientReviewsSlider && window.matchMedia('(max-width: 615px)').matches) {
      $(clientReviewsSlider).slick({
        accessibility: false,
        dots: true,
        arrows: false
      });
    }

    $('input[type="tel"]').mask('+7 (999) 999-99-99', {});
  });
})(jQuery);
