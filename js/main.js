'use strict';

(function () {
  var pinMapHandler = function (evt) {
    if (evt.type === 'mousedown' || evt.keyCode === window.util.KeyCode.ENTER) {
      window.map.show();

      window.form.show();
      window.form.enable();
      window.form.setAddressCoords(window.pin.getCoordPin(window.map.pinMapMain));

      var successHandler = function (successEvt) {
        if (successEvt.type === 'click' || successEvt.keyCode === window.util.KeyCode.ESC) {
          document.querySelector('.success').remove();
          document.removeEventListener('click', successHandler);
          document.removeEventListener('keydown', successHandler);
        }
      };

      var setSuccess = function () {
        var successTemplate = document.querySelector('#success').content;
        var successNode = successTemplate.cloneNode(true);
        successNode.querySelector('.success').style.zIndex = 5;
        window.map.mapBlock.before(successNode);
        document.addEventListener('click', successHandler);
        document.addEventListener('keydown', successHandler);
      };

      var errorHandler = function (errorEvt) {
        if (errorEvt.type === 'click' || errorEvt.keyCode === window.util.KeyCode.ESC) {
          document.querySelector('.error').remove();
          document.removeEventListener('keydown', errorHandler);
        }
      };

      var setError = function (error) {
        var errorTemplate = document.querySelector('#error').content;
        var errorNode = errorTemplate.cloneNode(true);
        errorNode.querySelector('.error').style.zIndex = 5;
        errorNode.querySelector('.error__message').textContent = error;
        errorNode.querySelector('.error__button').addEventListener('click', errorHandler);
        window.map.mapBlock.before(errorNode);
        document.addEventListener('keydown', errorHandler);
      };

      var sendHandler = function (sendEvt) {
        sendEvt.preventDefault();
        window.data.send(new FormData(window.form.adForm), function () {
          disablePage();
          setSuccess();
          window.form.adForm.removeEventListener('submit', sendHandler, setError);
        }, setError);
      };

      window.data.load(function (data) {
        window.map.pinBlock.appendChild(window.card.getObjectsList(data));
        window.map.filterBlock.before(window.card.getCardModal(data[0]));
        window.card.hideCurrentCard();
      }, setError);

      window.form.setPriceParameter();
      window.form.adFormType.addEventListener('change', window.form.setPriceParameter);
      window.form.adFormTimeIn.addEventListener('change', window.form.timeInHandler);
      window.form.adFormTimeOut.addEventListener('change', window.form.timeOutHandler);
      window.form.adFormSubmit.addEventListener('click', window.form.validateCapacityValue);

      window.form.adForm.addEventListener('submit', sendHandler, setError);

      window.map.pinMapMain.removeEventListener('mousedown', pinMapHandler);
      window.map.pinMapMain.removeEventListener('keydown', pinMapHandler);

      window.map.pinMapMain.addEventListener('mousedown', window.pin.pinMapDownHandler);
    }
  };

  var disablePage = function () {
    window.form.adForm.reset();
    window.form.disable();
    window.form.hide();

    window.map.mapBlock.querySelectorAll('.map__pin').forEach(function (item) {
      if (!item.classList.contains('map__pin--main')) {
        item.remove();
      }
    });
    window.map.mapBlock.querySelector('.map__card').remove();
    window.map.hide();

    window.pin.setPinMainCoords(window.pin.PinSetting.PIN_INITIAL_X, window.pin.PinSetting.PIN_INITIAL_Y);
    window.form.setAddressCoords(window.pin.getCoordPin(window.map.pinMapMain));

    window.map.pinMapMain.removeEventListener('mousedown', window.pin.pinMapDownHandler);

    window.map.pinMapMain.addEventListener('mousedown', pinMapHandler);
    window.map.pinMapMain.addEventListener('keydown', pinMapHandler);

  };

  var initiationPage = function () {
    window.form.disable();
    window.form.setAddressCoords(window.pin.getCoordPin(window.map.pinMapMain));
    window.map.pinMapMain.addEventListener('mousedown', pinMapHandler);
    window.map.pinMapMain.addEventListener('keydown', pinMapHandler);
  };

  window.addEventListener('load', initiationPage);
})();
