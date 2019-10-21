'use strict';

(function () {
  var PinSize = {
    PIN_MAIN_WIDTH: 65,
    PIN_MAIN_HEIGHT: 72,
    PIN_WIDTH: 50,
    PIN_HEIGHT: 70
  };
  var MapHeight = {
    Y_MIN: 130,
    Y_MAX: 630
  };
  var map = {
    width: window.map.mapBlock.clientWidth,
    margin: (document.documentElement.clientWidth - window.map.mapBlock.clientWidth) / 2
  };

  var getCoordPin = function (obj) {
    var objCoord = obj.getBoundingClientRect();
    var left = objCoord.left + pageXOffset;
    var top = objCoord.top + pageYOffset;
    var pinPosition = {
      x: (left - map.margin) + (PinSize.PIN_MAIN_WIDTH / 2),
      y: top + (window.map.mapBlock.classList.contains('map--faded') ? (PinSize.PIN_MAIN_WIDTH / 2) : (PinSize.PIN_MAIN_HEIGHT))
    };
    return pinPosition;
  };

  var setPinMainCoords = function (x, y) {
    window.map.pinMapMain.style.left = x + 'px';
    window.map.pinMapMain.style.top = y + 'px';
  };

  var pinMapDownHandler = function (dEvt) {
    dEvt.preventDefault();
    window.map.pinMapMain.style.zIndex = 2;

    var pinMapMoveHandler = function (mEvt) {
      var position = {
        left: Math.max(0, Math.min(mEvt.pageX - map.margin - (PinSize.PIN_MAIN_WIDTH / 2), map.width - PinSize.PIN_MAIN_WIDTH)),
        top: Math.max(MapHeight.Y_MIN, Math.min(mEvt.pageY - (PinSize.PIN_MAIN_HEIGHT / 2), MapHeight.Y_MAX))
      };

      setPinMainCoords(position.left, position.top);
      window.form.setAddressCoords(getCoordPin(window.map.pinMapMain));
    };

    var pinMapUpHandler = function (uEvt) {
      uEvt.preventDefault();
      document.removeEventListener('mousemove', pinMapMoveHandler);
      document.removeEventListener('mouseup', pinMapUpHandler);
    };

    document.addEventListener('mousemove', pinMapMoveHandler);
    document.addEventListener('mouseup', pinMapUpHandler);
  };

  window.pin = {
    PinSize: PinSize,
    getCoordPin: getCoordPin,
    pinMapDownHandler: pinMapDownHandler
  };
})();
