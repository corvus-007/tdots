window.mainNav = (function() {
  'use strict';

  var mainNav = document.querySelector('.main-nav');
  var mainNavLinks = document.querySelectorAll('.main-nav a[href^="#"]');

  function removeActiveClassNavItem() {
    Array.from(mainNavLinks).forEach(function(link) {
      link.parentElement.classList.remove('active');
    });
  }

  Array.from(mainNavLinks).forEach(function(link) {
    link.addEventListener('click', function(event) {
      event.preventDefault();
      var target = document.querySelector(this.hash);
      removeActiveClassNavItem();
      this.parentElement.classList.add('active');
      $('html, body').animate(
        {
          scrollTop:
            $(target).offset().top -
            window.mainHeader.wrapper.firstElementChild.offsetHeight
        },
        400,
        window.outCover.hide
      );
    });
  });
})();
