window.welcome = (function() {
  'use strict';

  var welcome = document.querySelector('.welcome');

  if (welcome) {
    welcome.style.minHeight =
      'calc(100% - ' + window.mainHeader.wrapper.offsetHeight + 'px)';
  }
})();
