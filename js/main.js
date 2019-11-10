'use strict';

(function () {

  var clickSuccessHandler = function () {
    hideSuccess();
  };

  var pressSuccessHandler = function (successEvt) {
    if (successEvt.keyCode === window.util.KeyCode.ESC) {
      hideSuccess();
    }
  };

  var hideSuccess = function () {
    document.querySelector('.success').remove();
    document.removeEventListener('click', clickSuccessHandler);
    document.removeEventListener('keydown', pressSuccessHandler);
  };

  var setSuccess = function () {
    var successTemplate = document.querySelector('#success').content;
    var successNode = successTemplate.cloneNode(true);
    successNode.querySelector('.success').style.zIndex = 5;
    window.map.block.before(successNode);
    document.addEventListener('click', clickSuccessHandler);
    document.addEventListener('keydown', pressSuccessHandler);
  };

  var clickErrorHandler = function () {
    hideError();
  };

  var pressErrorHandler = function (errorEvt) {
    if (errorEvt.keyCode === window.util.KeyCode.ESC) {
      hideError();
    }
  };

  var hideError = function () {
    document.querySelector('.error').remove();
    document.removeEventListener('keydown', pressErrorHandler);
  };

  var setError = function (error) {
    var errorTemplate = document.querySelector('#error').content;
    var errorNode = errorTemplate.cloneNode(true);
    errorNode.querySelector('.error').style.zIndex = 5;
    errorNode.querySelector('.error__message').textContent = error;
    errorNode.querySelector('.error__button').addEventListener('click', clickErrorHandler);
    window.map.block.before(errorNode);
    document.addEventListener('keydown', pressErrorHandler);
  };

  var clickPinMainHahdler = function () {
    activePage();
  };

  var pressPinMainHahdler = function (pressEvt) {
    if (pressEvt.keyCode === window.util.KeyCode.ENTER) {
      activePage();
    }
  };

  var activePage = function () {
    window.map.show();

    window.form.show();
    window.form.enable();
    window.form.setAddressCoords(window.pin.getCoord(window.map.pinMain));

    var sendHandler = function (sendEvt) {
      sendEvt.preventDefault();
      window.data.send(new FormData(window.form.block), function () {
        disablePage();
        setSuccess();
        window.form.block.removeEventListener('submit', sendHandler, setError);
        window.photo.clear(window.form.avatarPreviewElement, false);
        window.photo.clear(window.form.photoPreviewElement, true);
      }, setError);
    };

    var pinsArray = [];
    window.data.load(function (data) {
      pinsArray = data;
      filterHandler();
    }, setError);

    var updatePins = window.debounce(window.filter.update);

    var filterHandler = function () {
      window.map.clear();
      window.map.removeCard();
      updatePins(pinsArray, true);
    };

    window.form.setPriceParameter();
    window.form.typeElement.addEventListener('change', window.form.setPriceParameter);
    window.form.timeInElement.addEventListener('change', window.form.timeInHandler);
    window.form.timeOutElement.addEventListener('change', window.form.timeOutHandler);
    window.form.avatarElement.addEventListener('change', window.photo.upload);
    window.form.photoElement.addEventListener('change', window.photo.upload);
    window.form.resetElement.addEventListener('click', function (resetEvt) {
      resetEvt.preventDefault();
      window.photo.clear(window.form.avatarPreviewElement, false);
      window.photo.clear(window.form.photoPreviewElement, true);
      disablePage();
    });

    window.form.submitElement.addEventListener('click', window.form.validateCapacityValue);

    window.filter.block.addEventListener('change', filterHandler);

    window.form.block.addEventListener('submit', sendHandler, setError);
    window.map.pinMain.removeEventListener('mousedown', clickPinMainHahdler);
    window.map.pinMain.removeEventListener('keydown', pressPinMainHahdler);
    window.map.pinMain.addEventListener('mousedown', window.pin.downHandler);
  };

  var disablePage = function () {
    window.form.block.reset();
    window.filter.form.reset();
    window.form.disable();
    window.form.hide();

    window.map.clear();
    window.map.removeCard();
    window.map.hide();

    window.pin.setMainCoords(window.pin.setting.PIN_INITIAL_X, window.pin.setting.PIN_INITIAL_Y);
    window.form.setAddressCoords(window.pin.getCoord(window.map.pinMain));

    window.map.pinMain.removeEventListener('mousedown', window.pin.downHandler);

    window.map.pinMain.addEventListener('mousedown', clickPinMainHahdler);
    window.map.pinMain.addEventListener('keydown', pressPinMainHahdler);

  };

  var initiationPage = function () {
    window.form.disable();
    window.form.setAddressCoords(window.pin.getCoord(window.map.pinMain));
    window.map.pinMain.addEventListener('mousedown', clickPinMainHahdler);
    window.map.pinMain.addEventListener('keydown', pressPinMainHahdler);
  };

  window.addEventListener('load', initiationPage);
})();
