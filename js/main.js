'use strict';

var OBJECTS_COUNT = 8;
var PIN_MAIN_WIDTH = 62;
var PIN_MAIN_HEIGHT = 72;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var ARRAY_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var ARRAY_TIMES = ['12:00', '13:00', '14:00'];
var ARRAY_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var ERROR_MESSAGE_CAPACITY = 'Допустимые значения: ';
var ArrayFormElements = ['input', 'select', 'textarea', 'button'];
var ArrayTypes = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};
var KeyCodes = {
  esc: 27,
  enter: 13
};

var mapBlock = document.querySelector('.map');
var pinsBlock = mapBlock.querySelector('.map__pins');
var pinsBlockWidth = pinsBlock.offsetWidth;
var pinMapMain = mapBlock.querySelector('.map__pin--main');
var mapFilters = document.querySelector('.map__filters-container');

var adForm = document.querySelector('.ad-form');
var mapForm = document.querySelector('.map__filters');
var adFormAddress = adForm.querySelector('#address');
var adFormRoom = adForm.querySelector('#room_number');
var adFormCapacity = adForm.querySelector('#capacity');

var getRandomCount = function (min, max) {
  return Math.ceil(Math.random() * (max - min) + min);
};

var generateFeatureArray = function (arr) {
  var featureArray = [];
  var lengthFeatureArray = getRandomCount(1, arr.length);
  for (var i = 0; i < lengthFeatureArray; i++) {
    featureArray[i] = arr[i];
  }
  return featureArray;
};

var generatePhotoArray = function () {
  var photoArray = [];
  var lengthPhotoArray = getRandomCount(1, 10);
  var templateLinkUrl = 'http://o0.github.io/assets/images/tokyo/hotel';
  var templateLinkType = '.jpg';
  for (var i = 1; i <= lengthPhotoArray; i++) {
    photoArray.push(templateLinkUrl + i + templateLinkType);
  }
  return photoArray;
};

var generateObjectsList = function () {
  var objects = [];
  for (var i = 1; i <= OBJECTS_COUNT; i++) {
    objects.push({
      'author': {
        'avatar': 'img/avatars/user0' + i + '.png',
      },
      'location': {
        'x': getRandomCount(PIN_WIDTH / 2, pinsBlockWidth - (PIN_WIDTH / 2)),
        'y': getRandomCount(130 + PIN_HEIGHT, 630),
      },
      'offer': {
        'title': 'Заголовок 0' + i,
        'price': getRandomCount(1000, 5000),
        'address': '',
        'type': ARRAY_TYPES[getRandomCount(0, ARRAY_TYPES.length - 1)],
        'rooms': getRandomCount(1, 5),
        'guests': getRandomCount(1, 7),
        'checkin': ARRAY_TIMES[getRandomCount(0, ARRAY_TIMES.length - 1)],
        'checkout': ARRAY_TIMES[getRandomCount(0, ARRAY_TIMES.length - 1)],
        'features': generateFeatureArray(ARRAY_FEATURES),
        'description': 'Описание для 0' + i,
        'photos': generatePhotoArray(),
      },
    });
    objects[objects.length - 1].offer.address = objects[objects.length - 1].location.x + ', ' + objects[objects.length - 1].location.y;
  }
  return objects;
};

var getObjectsList = function (arr) {
  var fragment = document.createDocumentFragment();
  var objectTemplate = document.querySelector('#pin').content;
  arr.forEach(function (item) {
    var objectNode = objectTemplate.cloneNode(true);
    var coordX = item.location.x - (PIN_WIDTH / 2);
    var coordY = item.location.y - PIN_HEIGHT;
    var pinElement = objectNode.querySelector('.map__pin');
    pinElement.style.left = coordX + 'px';
    pinElement.style.top = coordY + 'px';
    var image = objectNode.querySelector('img');
    image.src = item.author.avatar;
    image.alt = item.offer.title;
    pinElement.addEventListener('click', function (evt) {
      mapBlock.querySelector('.map__card').remove();
      mapFilters.before(getCardModal(item));
      hideCurrentCard();
    });
    pinElement.addEventListener('keydown', function (evt) {
      if (evt.keyCode === KeyCodes.enter) {
        evt.preventDefault();
        mapBlock.querySelector('.map__card').remove();
        mapFilters.before(getCardModal(item));
        hideCurrentCard();
      }
    });
    fragment.appendChild(objectNode);
  });
  return fragment;
};

var insertPhoto = function (parent, arr) {
  if (parent.children.length > 0) {
    var photo = parent.querySelector('.popup__photo');
    photo.src = arr[0];
    if (arr.length === 1) {
      return;
    }
    for (var i = 1; i < arr.length; i++) {
      var photoNode = photo.cloneNode(true);
      photoNode.src = arr[i];
      parent.appendChild(photoNode);
    }
  }
};

var insertFeatures = function (parent, arr) {
  var listElement = parent.querySelectorAll('li');
  for (var i = 0; i < listElement.length; i++) {
    parent.removeChild(listElement[i]);
  }
  var classElement = 'popup__feature';
  for (var j = 0; j < arr.length; j++) {
    var element = '<li class="' + classElement + ' ' + classElement + '--' + arr[j] + '"></li>';
    parent.insertAdjacentHTML('beforebegin', element);
  }
};

var getCardModal = function (obj) {
  var cardTemplate = document.querySelector('#card').content;
  var cardNode = cardTemplate.cloneNode(true);
  cardNode.querySelector('.popup__title').textContent = obj.offer.title;
  cardNode.querySelector('.popup__text--address').textContent = obj.offer.address;
  cardNode.querySelector('.popup__text--price').textContent = obj.offer.price + ' ₽/ночь';
  cardNode.querySelector('.popup__type').textContent = ArrayTypes[obj.offer.type];
  cardNode.querySelector('.popup__text--capacity').textContent = obj.offer.rooms + ' комнаты для ' + obj.offer.guests + ' гостей';
  cardNode.querySelector('.popup__text--time').textContent = 'Заезд после ' + obj.offer.checkin + ', выезд до ' + obj.offer.checkout;
  insertFeatures(cardNode.querySelector('.popup__features'), obj.offer.features);
  cardNode.querySelector('.popup__description').textContent = obj.offer.description;
  cardNode.querySelector('.popup__avatar').src = obj.author.avatar;
  insertPhoto(cardNode.querySelector('.popup__photos'), obj.offer.photos);
  return cardNode;
};

var clickCloseCardHandler = function (evt) {
  evt.preventDefault();
  evt.target.parentElement.classList.add('hidden');
};

var tabEscCardHandler = function (evt) {
  evt.preventDefault();
  evt.stopPropagation();
  var cardMapBlock = mapBlock.querySelector('.map__card');
  if (evt.keyCode === KeyCodes.esc) {
    cardMapBlock.classList.add('hidden');
    cardMapBlock.removeEventListener('keydown', tabEscCardHandler);
  }
};

var openCurentCard = function () {
  // ...
};

var disableForm = function () {
  var elementArr = document.querySelectorAll('.ad-form fieldset, .map__filters input, .map__filters select');
  elementArr.forEach(function(item, i, arr) {
    if (!item.hasAttribute('disabled')) {
      item.setAttribute('disabled', '');
    }
  });
};

var enableForm = function () {
  var elementArr = document.querySelectorAll('.ad-form fieldset, .map__filters input, .map__filters select');
  elementArr.forEach(function(item, i, arr) {
    if (item.hasAttribute('disabled')) {
      item.removeAttribute('disabled');
    }
  });
};

var getCoordPin = function (obj) {
  var objData = obj.getBoundingClientRect();
  if (mapBlock.classList.contains('map--faded')) {
    var pinPosition = {
      x: objData.left - PIN_MAIN_WIDTH / 2,
      y: objData.top + PIN_MAIN_WIDTH / 2
    };
  } else {
    var   pinPosition = {
      x: objData.left - PIN_MAIN_WIDTH / 2,
      y: objData.top + PIN_MAIN_HEIGHT / 2
    };
  }
  return pinPosition;
};

var compareCapacityRoom = function () {

  var valueRoom = +adFormRoom.value;
  var valuesCapacity = adFormCapacity.options;
  var valueCapacity = +adFormCapacity.value;
  var allowValues = [];

  if (valueRoom < valueCapacity) {
    allowValues.push(valueRoom);
    for (var i = 0; i < valuesCapacity.length; i++) {
      if (valueRoom > +valuesCapacity[i].value && +valuesCapacity[i].value !== 0) {
        allowValues.push(+valuesCapacity[i].value);
      }
    }
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
  adFormRoom.setCustomValidity('');
  adFormCapacity.setCustomValidity('');

  if (allowArrayValue[0] === 0) {
    adFormCapacity.setCustomValidity(ERROR_MESSAGE_CAPACITY + allowArrayValue[0]);
    return;
  }

  if (allowArrayValue[0] === 100) {
    adFormRoom.setCustomValidity(ERROR_MESSAGE_CAPACITY + allowArrayValue[0]);
    return;
  }

  if (allowArrayValue.length >= 1) {
    adFormCapacity.setCustomValidity(ERROR_MESSAGE_CAPACITY + allowArrayValue);
    return;
  }
};

var checkRoomHandler = function () {
  validateCapacityValue();
};

var hideCurrentCard = function () {
  if (mapBlock.querySelector('.map__card')) {
    var cardMapBlock = mapBlock.querySelector('.map__card');
    cardMapBlock.addEventListener('keydown', tabEscCardHandler);
    var cardCloseMapBlock = cardMapBlock.querySelector('.popup__close');
    cardCloseMapBlock.addEventListener('click', clickCloseCardHandler);
  }
};

var pinMapHandler = function (evt) {
  if (evt.type === 'mousedown' || evt.keyCode === KeyCodes.enter) {
    mapBlock.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');

    enableForm();
    var mainPinCoord = getCoordPin(pinMapMain);
    adFormAddress.value = mainPinCoord.x + ', ' + mainPinCoord.y;

    var objectList = generateObjectsList();
    pinsBlock.appendChild(getObjectsList(objectList));
    mapFilters.before(getCardModal(objectList[0]));

    hideCurrentCard();

    adFormRoom.addEventListener('change', checkRoomHandler);
    adFormCapacity.addEventListener('change', checkRoomHandler);
    checkRoomHandler();

    pinMapMain.removeEventListener('mousedown', pinMapHandler);
    pinMapMain.removeEventListener('keydown', pinMapHandler);
  }
};

var initiationPage = function () {
  disableForm();
  var mainPinCoord = getCoordPin(pinMapMain);
  adFormAddress.value = mainPinCoord.x + ', ' + mainPinCoord.y;
  pinMapMain.addEventListener('mousedown', pinMapHandler);
  pinMapMain.addEventListener('keydown', pinMapHandler);
};

window.addEventListener('load', initiationPage);
