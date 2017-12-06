window.outCover = (function() {
  'use strict';

  var outCover = document.querySelector('.out-cover');
  var outCoverCloseWrapper = outCover.querySelector(
    '.out-cover__close-wrapper'
  );
  var outCoverBody = outCover.querySelector('.out-cover__body');
  var outCoverMainNavWrapper = outCover.querySelector(
    '.out-cover__main-nav-wrapper'
  );
  var outCoverToggler = document.querySelector('.out-cover-toggler');
  var outCoverClose = outCover.querySelector('.out-cover__close');
  var scrollWidth = window.util.getScrollbarWidth();
  var scrollPageValue = 0;

  var onOutCoverEscPress = function(event) {
    if (event.keyCode === window.util.KEYCODE_ESC) {
      hideOutCover();
    }
  };

  var onOutCoverClickOut = function(event) {
    var isClickOut = true;

    if (outCover.contains(event.target)) {
      isClickOut = false;
    }

    if (isClickOut) {
      hideOutCover();
    }
  };

  var getSumHeight = function() {
    var result = 0;

    for (var i = 0; i < arguments.length; i++) {
      result += arguments[i].offsetHeight;
    }

    return result;
  };

  var showOutCover = function() {
    scrollPageValue = window.pageYOffset;
    outCoverBody.style.height =
      'calc(100% - (' + getSumHeight(outCoverCloseWrapper) + 'px))';
    document.body.classList.add('no-scroll');
    document.body.classList.add('is-out-cover-show');
    outCover.classList.add('out-cover--opened');
    document.addEventListener('keydown', onOutCoverEscPress);
    setTimeout(function() {
      document.addEventListener('click', onOutCoverClickOut);
    }, 100);
  };

  var hideOutCover = function() {
    outCover.classList.remove('out-cover--opened');
    document.body.classList.remove('no-scroll');
    document.body.classList.remove('is-out-cover-show');
    window.scrollTo(0, scrollPageValue);
    document.removeEventListener('keydown', onOutCoverEscPress);
    document.removeEventListener('click', onOutCoverClickOut);
  };

  outCoverToggler.addEventListener('click', function(event) {
    event.preventDefault();
    showOutCover();
  });

  outCoverClose.addEventListener('click', function(event) {
    event.preventDefault();
    hideOutCover();
  });

  return {
    mainNavWrapper: outCoverMainNavWrapper,
    show: showOutCover,
    hide: hideOutCover
  };
})();
