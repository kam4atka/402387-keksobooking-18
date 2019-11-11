'use strict';

(function () {
  var PriceMin = {
    PALACE: 10000,
    FLAT: 1000,
    HOUSE: 5000,
    BUNGALO: 0
  };
  var ErrorMessage = {
    CAPACITY: 'Допустимые значения: '
  };

  var adForm = document.querySelector('.ad-form');
  var adFormAddress = adForm.querySelector('#address');
  var adFormSubmit = document.querySelector('.ad-form__submit');
  var adFormRoom = adForm.querySelector('#room_number');
  var adFormCapacity = adForm.querySelector('#capacity');
  var adFormType = adForm.querySelector('#type');
  var adFormPrice = adForm.querySelector('#price');
  var adFormTimeIn = adForm.querySelector('#timein');
  var adFormTimeOut = adForm.querySelector('#timeout');
  var adFormAvatarElement = adForm.querySelector('.ad-form__field');
  var adFormAvatarPreview = adForm.querySelector('.ad-form-header__preview');
  var adFormPhotoElement = adForm.querySelector('.ad-form__upload');
  var adFormPhotoPreview = adForm.querySelector('.ad-form__photo');
  var adFormReset = adForm.querySelector('.ad-form__reset');

  var invalidMark = '1px solid red';

  var showForm = function () {
    adForm.classList.remove('ad-form--disabled');
  };

  var hideForm = function () {
    adForm.classList.add('ad-form--disabled');
  };

  var disableForm = function () {
    var elementArr = document.querySelectorAll('.ad-form fieldset, .map__filters input, .map__filters select');
    elementArr.forEach(function (item) {
      item.setAttribute('disabled', '');
    });
  };

  var enableForm = function () {
    var elementArr = document.querySelectorAll('.ad-form fieldset, .map__filters input, .map__filters select');
    elementArr.forEach(function (item) {
      item.removeAttribute('disabled');
    });
  };

  var cleanCustomValidity = function (object) {
    object.setCustomValidity('');
  };

  var setAddressCoords = function (coords) {
    adFormAddress.value = coords.x + ', ' + coords.y;
  };

  var setPriceParameter = function () {
    adFormPrice.placeholder = PriceMin[adFormType.value.toUpperCase()];
    adFormPrice.min = PriceMin[adFormType.value.toUpperCase()];
  };

  var timeInHandler = function (inEvt) {
    adFormTimeOut.value = inEvt.target.value;
  };

  var timeOutHandler = function (outEvt) {
    adFormTimeIn.value = outEvt.target.value;
  };

  var compareCapacityRoom = function () {
    var valueRoom = +adFormRoom.value;
    var valuesCapacity = adFormCapacity.options;
    var valueCapacity = +adFormCapacity.value;
    var allowValues = [];
    if (valueRoom < valueCapacity) {
      allowValues.push(valueRoom);
      Array.from(valuesCapacity).forEach(function (valueElement) {
        if (valueRoom > +valueElement.value && +valueElement.value !== 0) {
          allowValues.push(+valueElement.value);
        }
      });
      return allowValues;
    }
    if (valueRoom === 100 && valueCapacity !== 0) {
      allowValues.push(valuesCapacity[valuesCapacity.length - 1].text);
      return allowValues;
    }
    if (valueCapacity === 0 && valueRoom !== 100) {
      allowValues.push(100);
      return allowValues;
    }
    return allowValues;
  };

  var validateCapacityValue = function () {
    var allowArrayValue = compareCapacityRoom();
    cleanCustomValidity(adFormRoom);
    cleanCustomValidity(adFormCapacity);
    selectInvalidInput();
    if (allowArrayValue[0] === 0) {
      adFormCapacity.setCustomValidity(ErrorMessage.CAPACITY + allowArrayValue[0]);
      return;
    }
    if (allowArrayValue[0] === 100) {
      adFormRoom.setCustomValidity(ErrorMessage.CAPACITY + allowArrayValue[0]);
      return;
    }
    if (allowArrayValue.length >= 1) {
      adFormCapacity.setCustomValidity(ErrorMessage.CAPACITY + allowArrayValue);
      return;
    }
  };

  var selectInvalidInput = function () {
    var requirElements = adForm.querySelectorAll('input[required]');
    requirElements.forEach(function (item) {
      if (!item.validity.valid) {
        item.style.border = invalidMark;
      } else {
        item.style.border = '';
      }
    });
  };

  window.form = {
    block: adForm,
    typeElement: adFormType,
    timeInElement: adFormTimeIn,
    timeOutElement: adFormTimeOut,
    avatarElement: adFormAvatarElement,
    avatarPreviewElement: adFormAvatarPreview,
    photoElement: adFormPhotoElement,
    photoPreviewElement: adFormPhotoPreview,
    submitElement: adFormSubmit,
    resetElement: adFormReset,
    show: showForm,
    hide: hideForm,
    disable: disableForm,
    enable: enableForm,
    setAddressCoords: setAddressCoords,
    setPriceParameter: setPriceParameter,
    timeInHandler: timeInHandler,
    timeOutHandler: timeOutHandler,
    validateCapacityValue: validateCapacityValue
  };
})();
