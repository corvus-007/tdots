window.mainHeader = (function() {
  'use strict';

  var mainHeader = document.querySelector('.main-header');
  var wrapperMainHeader = document.createElement('div');
  var mainHeaderOffsetTop = 0;

  wrapperMainHeader.classList.add('main-header__wrapper');
  mainHeader.insertAdjacentElement('beforeBegin', wrapperMainHeader);
  wrapperMainHeader.appendChild(mainHeader);
  mainHeaderOffsetTop = mainHeader.offsetTop;
  wrapperMainHeader.style.height = mainHeader.offsetHeight + 'px';

  var stickmainHeader = function() {
    mainHeader.classList.add('main-header--sticky');
  };

  var unstickmainHeader = function() {
    mainHeader.classList.remove('main-header--sticky');
  };

  var updateScroll = window.util.debounce(function() {
    if (window.pageYOffset > mainHeaderOffsetTop) {
      stickmainHeader();
    } else {
      unstickmainHeader();
    }
  }, 16);

  updateScroll();
  window.addEventListener('scroll', updateScroll);

  return {
    wrapper: wrapperMainHeader,
    stick: stickmainHeader,
    unstick: unstickmainHeader
  };
})();
