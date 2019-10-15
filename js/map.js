'use strict';

(function () {
  var mapBlock = document.querySelector('.map');
  var pinBlock = mapBlock.querySelector('.map__pins');
  var pinMapMain = mapBlock.querySelector('.map__pin--main');
  var filterBlock = document.querySelector('.map__filters-container');

  window.map = {
    mapBlock: mapBlock,
    pinBlock: pinBlock,
    pinMapMain: pinMapMain,
    filterBlock: filterBlock
  };
})();
