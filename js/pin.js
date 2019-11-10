'use strict';

(function () {
  var PinSetting = {
    PIN_INITIAL_X: 570,
    PIN_INITIAL_Y: 375,
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
    width: window.map.block.clientWidth,
    margin: (document.documentElement.clientWidth - window.map.block.clientWidth) / 2
  };

  var searchPattern = '.map__pin:not(.map__pin--main)';

  var getCoordPin = function (object) {
    var objCoord = object.getBoundingClientRect();
    var left = objCoord.left + pageXOffset;
    var top = objCoord.top + pageYOffset;
    var pinPosition = {
      x: Math.ceil((left - map.margin) + (PinSetting.PIN_MAIN_WIDTH / 2)),
      y: Math.ceil(top + (window.map.block.classList.contains('map--faded') ? (PinSetting.PIN_MAIN_WIDTH / 2) : (PinSetting.PIN_MAIN_HEIGHT)))
    };
    return pinPosition;
  };

  var setPinMainCoords = function (x, y) {
    window.map.pinMain.style.left = x + 'px';
    window.map.pinMain.style.top = y + 'px';
  };

  var clearActiveStatus = function () {
    window.map.block.querySelectorAll(searchPattern).forEach(function (pin) {
      pin.classList.remove('map__pin--active');
    });
  };

  var pinMapDownHandler = function (dEvt) {
    dEvt.preventDefault();
    window.map.pinMain.style.zIndex = 2;

    var pinMapMoveHandler = function (mEvt) {
      var position = {
        left: Math.max(0 - (PinSetting.PIN_MAIN_WIDTH / 2), Math.min(mEvt.pageX - map.margin - (PinSetting.PIN_MAIN_WIDTH / 2), map.width - (PinSetting.PIN_MAIN_WIDTH / 2))),
        top: Math.max(MapHeight.Y_MIN - PinSetting.PIN_MAIN_HEIGHT, Math.min(mEvt.pageY - (PinSetting.PIN_MAIN_HEIGHT / 2), MapHeight.Y_MAX - PinSetting.PIN_MAIN_HEIGHT))
      };

      setPinMainCoords(position.left, position.top);
      window.form.setAddressCoords(getCoordPin(window.map.pinMain));
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
    searchPattern: searchPattern,
    setting: PinSetting,
    getCoord: getCoordPin,
    setMainCoords: setPinMainCoords,
    clearActiveStatus: clearActiveStatus,
    downHandler: pinMapDownHandler
  };
})();
