'use strict';

(function () {
  var PinSize = {
    PIN_MAIN_WIDTH: 62,
    PIN_MAIN_HEIGHT: 72,
    PIN_WIDTH: 50,
    PIN_HEIGHT: 70
  };

  var getCoordPin = function (obj) {
    var marginLeft = (document.documentElement.clientWidth - window.map.mapBlock.clientWidth) / 2;
    var objCoord = obj.getBoundingClientRect();
    var left = objCoord.left + pageXOffset;
    var top = objCoord.top + pageYOffset;
    var pinPosition = {
      x: (left - marginLeft) + (PinSize.PIN_MAIN_WIDTH / 2),
      y: top + (window.map.mapBlock.classList.contains('map--faded') ? (PinSize.PIN_MAIN_WIDTH / 2) : (PinSize.PIN_MAIN_HEIGHT))
    };
    return pinPosition;
  };

  window.pin = {
    PinSize: PinSize,
    getCoordPin: getCoordPin
  };
})();
