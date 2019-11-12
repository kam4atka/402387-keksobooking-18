'use strict';

(function () {
  var TypeName = {
    ANY: 'any',
    PALACE: 'palace',
    FLAT: 'flat',
    HOUSE: 'house',
    BUNGALO: 'bungalo'
  };
  var NamePrice = {
    LOW: 10000,
    HIGH: 50000
  };
  var PriceName = {
    LOW: 'low',
    HIGH: 'high',
    MIDDLE: 'middle'
  };
  var filterBlock = document.querySelector('.map__filters-container');
  var filterMap = document.querySelector('.map__filters');
  var filterTypeElement = filterBlock.querySelector('#housing-type');
  var filterPriceElement = filterBlock.querySelector('#housing-price');
  var filterRoomElement = filterBlock.querySelector('#housing-rooms');
  var filterGuestElement = filterBlock.querySelector('#housing-guests');

  var inputs = filterBlock.querySelectorAll('input[name="features"]');

  var filterType = function (item) {
    var typeValue = filterTypeElement.value;
    return item.offer.type === typeValue || typeValue === TypeName.ANY;
  };

  var filterPrice = function (item) {
    var priceValue = filterPriceElement.value;
    if (priceValue === TypeName.ANY) {
      return true;
    }
    if (priceValue === PriceName.LOW) {
      return item.offer.price < NamePrice.LOW;
    }
    if (priceValue === PriceName.HIGH) {
      return item.offer.price > NamePrice.HIGH;
    }
    if (priceValue === PriceName.MIDDLE) {
      return item.offer.price >= NamePrice.LOW && item.offer.price <= NamePrice.HIGH;
    }
    return false;
  };

  var filterRoom = function (item) {
    var roomValue = filterRoomElement.value;
    return item.offer.rooms === Number(roomValue) || roomValue === TypeName.ANY;
  };

  var filterGuest = function (item) {
    var guestValue = filterGuestElement.value;
    return item.offer.guests === Number(guestValue) || guestValue === TypeName.ANY;
  };

  var filterFeatures = function (item) {
    var checkedInputs = Array.from(inputs).filter(function (checkedInput) {
      return checkedInput.checked;
    });
    return checkedInputs.every(function (input) {
      return item.offer.features.some(function (feature) {
        return feature === input.value;
      });
    });
  };

  var update = function (objects) {
    objects = objects.filter(function (item) {
      return filterType(item) &&
      filterPrice(item) &&
      filterRoom(item) &&
      filterGuest(item) &&
      filterFeatures(item);
    });

    if (objects.length > 0) {
      window.map.pinBlock.appendChild(window.card.getObjectsList(objects.slice(0, 5)));
      window.card.hideCurrent();
    }
  };

  window.filter = {
    block: filterBlock,
    form: filterMap,
    update: update
  };
})();
