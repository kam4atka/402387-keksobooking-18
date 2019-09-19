'use strict';

var OBJECTS_COUNT = 8;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

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
  var templateLinkUrl = ['http://o0.github.io/assets/images/tokyo/hotel'];
  var templateLinkType = ['.jpg'];
  var count = 1;
  for (var i = 0; i < lengthPhotoArray; i++) {
    photoArray[i] = templateLinkUrl[0] + count + templateLinkType[0];
    count += 1;
  }
  return photoArray;
};

var generateObjectsList = function () {
  var objects = [];
  var types = ['palace', 'flat', 'house', 'bungalo'];
  var times = ['12:00', '13:00', '14:00'];
  var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var count = 0;
  for (var i = 0; i < OBJECTS_COUNT; i++) {
    count += 1;
    objects[i] = {};
    objects[i].author = {};
    objects[i].author.avatar = 'img/avatars/user0' + count + '.png';
    objects[i].offer = {};
    objects[i].offer.title = 'Заголовок 0' + count;
    objects[i].offer.price = getRandomCount(1000, 5000);
    objects[i].offer.type = types[getRandomCount(0, types.length - 1)];
    objects[i].offer.rooms = getRandomCount(1, 5);
    objects[i].offer.guests = getRandomCount(1, 7);
    objects[i].offer.checkin = times[getRandomCount(0, times.length - 1)];
    objects[i].offer.checkout = times[getRandomCount(0, times.length - 1)];
    objects[i].offer.features = generateFeatureArray(features);
    objects[i].offer.description = 'Описание для 0' + count;
    objects[i].offer.photos = generatePhotoArray();
    objects[i].location = {};
    objects[i].location.x = getRandomCount(PIN_WIDTH / 2, pinsBlockWidth - (PIN_WIDTH / 2));
    objects[i].location.y = getRandomCount(130 + PIN_HEIGHT, 630);
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
    objectNode.querySelector('.map__pin').setAttribute('style', 'left: ' + coordX + 'px; top: ' + coordY + 'px;');
    var image = objectNode.querySelector('img');
    image.setAttribute('src', arr[i].author.avatar);
    image.setAttribute('alt', arr[i].offer.title);
    fragment.appendChild(objectNode);
  }
  return fragment;
};

pinsBlock.appendChild(getObjectsList(generateObjectsList()));
