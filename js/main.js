'use strict';

var OBJECTS_COUNT = 8;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var ARRAY_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var ARRAY_TIMES = ['12:00', '13:00', '14:00'];
var ARRAY_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

var mapBlock = document.querySelector('.map');
mapBlock.classList.remove('map--faded');
var pinsBlock = mapBlock.querySelector('.map__pins');
var pinsBlockWidth = pinsBlock.offsetWidth;

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
  for (var i = 0; i < arr.length; i++) {
    var objectNode = objectTemplate.cloneNode(true);
    var coordX = arr[i].location.x - (PIN_WIDTH / 2);
    var coordY = arr[i].location.y - PIN_HEIGHT;
    var pinElement = objectNode.querySelector('.map__pin');
    pinElement.style.left = coordX + 'px';
    pinElement.style.top = coordY + 'px';
    var image = objectNode.querySelector('img');
    image.src = arr[i].author.avatar;
    image.alt = arr[i].offer.title;
    fragment.appendChild(objectNode);
  }
  return fragment;
};

pinsBlock.appendChild(getObjectsList(generateObjectsList()));
