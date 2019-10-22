'use strict';

(function () {
  var pinMapHandler = function (evt) {
    if (evt.type === 'mousedown' || evt.keyCode === window.util.KeyCode.ENTER) {
      window.map.mapBlock.classList.remove('map--faded');

      window.form.show();
      window.form.enable();
      window.form.setAddressCoords(window.pin.getCoordPin(window.map.pinMapMain));

      var loadError = function (error) {
        var errorTemplate = document.querySelector('#error').content;
        var errorNode = errorTemplate.cloneNode(true);
        errorNode.querySelector('.error__message').textContent = error;
        window.map.mapBlock.before(errorNode);
      };

      window.data.load(function (data) {
        window.map.pinBlock.appendChild(window.card.getObjectsList(data));
        window.map.filterBlock.before(window.card.getCardModal(data[0]));
        window.card.hideCurrentCard();
      }, loadError);

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
