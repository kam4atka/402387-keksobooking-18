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
    var cardBlock = mapBlock.querySelector('.map__card');
    if (cardBlock) {
      cardBlock.remove();
    }
  };

  var clearMap = function () {
    mapBlock.querySelectorAll(window.pin.searchPattern).forEach(function (item) {
      item.remove();
    });
  };

  window.map = {
    block: mapBlock,
    pinBlock: pinBlock,
    pinMain: pinMapMain,
    filterBlock: filterBlock,
    show: showMap,
    hide: hideMap,
    clear: clearMap,
    removeCard: removeCard
  };
})();
