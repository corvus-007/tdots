window.welcome = (function() {
  'use strict';

  var welcome = document.querySelector('.welcome');

  if (welcome && window.matchMedia('(min-height: 568px)').matches) {
    welcome.style.height =
      'calc(100% - ' + window.mainHeader.wrapper.offsetHeight + 'px)';
  }
})();
