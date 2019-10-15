'use strict';

(function () {
  var OBJECTS_COUNT = 8;
  var ARRAY_TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var ARRAY_TIMES = ['12:00', '13:00', '14:00'];
  var ARRAY_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

  var generateFeatureArray = function (arr) {
    var featureArray = [];
    var lengthFeatureArray = window.util.getRandomCount(1, arr.length);
    for (var i = 0; i < lengthFeatureArray; i++) {
      featureArray[i] = arr[i];
    }
    return featureArray;
  };

  var generatePhotoArray = function () {
    var photoArray = [];
    var lengthPhotoArray = window.util.getRandomCount(1, 3);
    var templateLinkUrl = 'http://o0.github.io/assets/images/tokyo/hotel';
    var templateLinkType = '.jpg';
    for (var i = 1; i <= lengthPhotoArray; i++) {
      photoArray.push(templateLinkUrl + i + templateLinkType);
    }
    return photoArray;
  };

  var generateObjectsList = function (pinWidth, pinHeight) {
    var objects = [];
    for (var i = 1; i <= OBJECTS_COUNT; i++) {
      objects.push({
        'author': {
          'avatar': 'img/avatars/user0' + i + '.png',
        },
        'location': {
          'x': window.util.getRandomCount(pinWidth / 2, window.map.pinBlock.offsetWidth - (pinWidth / 2)),
          'y': window.util.getRandomCount(130 + pinHeight, 630),
        },
        'offer': {
          'title': 'Заголовок 0' + i,
          'price': window.util.getRandomCount(1000, 5000),
          'address': '',
          'type': ARRAY_TYPES[window.util.getRandomCount(0, ARRAY_TYPES.length - 1)],
          'rooms': window.util.getRandomCount(1, 5),
          'guests': window.util.getRandomCount(1, 7),
          'checkin': ARRAY_TIMES[window.util.getRandomCount(0, ARRAY_TIMES.length - 1)],
          'checkout': ARRAY_TIMES[window.util.getRandomCount(0, ARRAY_TIMES.length - 1)],
          'features': generateFeatureArray(ARRAY_FEATURES),
          'description': 'Описание для 0' + i,
          'photos': generatePhotoArray(),
        },
      });
      objects[objects.length - 1].offer.address = objects[objects.length - 1].location.x + ', ' + objects[objects.length - 1].location.y;
    }
    return objects;
  };

  window.dataTest = {
    generateObjectsList: generateObjectsList
  };
})();
