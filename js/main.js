'use strict';

(function () {
  var pinMapHandler = function (evt) {
    if (evt.type === 'mousedown' || evt.keyCode === window.util.KeyCode.ENTER) {
      window.map.mapBlock.classList.remove('map--faded');

      window.form.show();
      window.form.enable();
      window.form.setAddressCoords(window.pin.getCoordPin(window.map.pinMapMain));

      var objectList = window.dataTest.generateObjectsList(window.pin.PinSize.PIN_WIDTH, window.pin.PinSize.PIN_HEIGHT);

      window.map.pinBlock.appendChild(window.card.getObjectsList(objectList));
      window.map.filterBlock.before(window.card.getCardModal(objectList[0]));

      window.card.hideCurrentCard();

      window.form.setPriceParameter();

      window.form.adFormType.addEventListener('change', window.form.setPriceParameter);
      window.form.adFormTimeIn.addEventListener('change', window.form.timeInHandler);
      window.form.adFormTimeOut.addEventListener('change', window.form.timeOutHandler);
      window.form.adFormSubmit.addEventListener('click', window.form.validateCapacityValue);

      window.map.pinMapMain.removeEventListener('mousedown', pinMapHandler);
      window.map.pinMapMain.removeEventListener('keydown', pinMapHandler);
      window.map.pinMapMain.addEventListener('mousedown', window.pin.pinMapDownHandler);
    }
  };

  var initiationPage = function () {
    window.form.disable();
    window.form.setAddressCoords(window.pin.getCoordPin(window.map.pinMapMain));
    window.map.pinMapMain.addEventListener('mousedown', pinMapHandler);
    window.map.pinMapMain.addEventListener('keydown', pinMapHandler);
  };

  window.addEventListener('load', initiationPage);
})();
