'use strict';

(function () {
  var mapBlock = document.querySelector('.map');
  var pinBlock = mapBlock.querySelector('.map__pins');
  var pinMapMain = mapBlock.querySelector('.map__pin--main');
  var filterBlock = document.querySelector('.map__filters-container');

  var showMap = function () {
    mapBlock.classList.remove('map--faded');
  };

  var hideMap = function () {
    mapBlock.classList.add('map--faded');
  };

  var removeCard = function () {
    if (mapBlock.querySelector('.map__card')) {
      mapBlock.querySelector('.map__card').remove();
    }
  };

  var clearMap = function () {
    mapBlock.querySelectorAll('.map__pin').forEach(function (item) {
      if (!item.classList.contains('map__pin--main')) {
        item.remove();
      }
    });
  };

  window.map = {
    mapBlock: mapBlock,
    pinBlock: pinBlock,
    pinMapMain: pinMapMain,
    filterBlock: filterBlock,
    show: showMap,
    hide: hideMap,
    clear: clearMap,
    removeCard: removeCard
  };
})();
