'use strict';

(function () {
  var typeName = {
    any: 'any',
    palace: 'palace',
    flat: 'flat',
    house: 'house',
    bungalo: 'bungalo'
  };
  var filterBlock = document.querySelector('.map__filters-container');
  var filterTypeElement = filterBlock.querySelector('#housing-type');

  var update = function (arr, type) {
    if (type && type === typeName.any || !type) {
      return arr;
    }
    if (type) {
      arr = arr.filter(function (item) {
        return item.offer.type === typeName[type];
      });
    }
    return arr;
  };

  window.filter = {
    typeName: typeName,
    typeElement: filterTypeElement,
    update: update
  };
})();
