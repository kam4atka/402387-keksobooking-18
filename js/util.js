'use strict';

(function () {
  var KeyCode = {
    ESC: 27,
    ENTER: 13
  };
  var getRandomCount = function (min, max) {
    return Math.ceil(Math.random() * (max - min) + min);
  };
  window.util = {
    KeyCode: KeyCode,
    getRandomCount: getRandomCount
  };
})();
