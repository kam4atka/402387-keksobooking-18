'use strict';

(function () {
  var PinSize = {
    PIN_MAIN_WIDTH: 62,
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

    var startCoords = {
      x: dEvt.pageX,
      y: dEvt.pageY
    };

    var rightBorderMap = map.margin + map.width - (PinSize.PIN_MAIN_WIDTH / 2);

    var pinMapMoveHandler = function (mEvt) {
      mEvt.preventDefault();

      var shift = {
        x: startCoords.x - mEvt.pageX,
        y: startCoords.y - mEvt.pageY
      };

      startCoords = {
        x: mEvt.pageX,
        y: mEvt.pageY
      };

      var position = {
        left: window.map.pinMapMain.offsetLeft - shift.x,
        top: window.map.pinMapMain.offsetTop - shift.y
      };

      setPinMainCoords(position.left, position.top);

      if (startCoords.y < MapHeight.Y_MIN || startCoords.y > MapHeight.Y_MAX) {
        removeTrackPinMapMain();
        if (startCoords.y < MapHeight.Y_MIN) {
          setPinMainCoords(position.left, MapHeight.Y_MIN);
        }
        if (startCoords.y > MapHeight.Y_MAX) {
          setPinMainCoords(position.left, MapHeight.Y_MAX - PinSize.PIN_MAIN_HEIGHT);
        }
      }

      if (startCoords.x < map.margin + PinSize.PIN_MAIN_WIDTH / 2 || startCoords.x > rightBorderMap) {
        removeTrackPinMapMain();
        if (startCoords.x < map.margin + PinSize.PIN_MAIN_WIDTH / 2) {
          setPinMainCoords(0, position.top);
        }
        if (startCoords.x > rightBorderMap) {
          setPinMainCoords(map.width - PinSize.PIN_MAIN_WIDTH, position.top);
        }
      }
      window.form.setAddressCoords(getCoordPin(window.map.pinMapMain));
    };

    var pinMapUpHandler = function (uEvt) {
      uEvt.preventDefault();
      removeTrackPinMapMain();
    };

    var removeTrackPinMapMain = function () {
      window.map.pinMapMain.removeEventListener('mousemove', pinMapMoveHandler);
      window.map.pinMapMain.removeEventListener('mouseup', pinMapUpHandler);
    };

    window.map.pinMapMain.addEventListener('mousemove', pinMapMoveHandler);
    window.map.pinMapMain.addEventListener('mouseup', pinMapUpHandler);
  };

  window.pin = {
    PinSize: PinSize,
    getCoordPin: getCoordPin,
    pinMapDownHandler: pinMapDownHandler
  };
})();
