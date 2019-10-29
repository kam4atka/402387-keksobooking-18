'use strict';

(function () {
  var typeName = {
    any: 'any',
    palace: 'palace',
    flat: 'flat',
    house: 'house',
    bungalo: 'bungalo'
  };
  var namePrice = {
    low: 10000,
    high: 50000
  };
  var priceName = {
    low: 'low',
    high: 'high',
    middle: 'middle'
  };
  var filterBlock = document.querySelector('.map__filters-container');
  var filterTypeElement = filterBlock.querySelector('#housing-type');
  var filterPriceElement = filterBlock.querySelector('#housing-price');
  var filterRoomElement = filterBlock.querySelector('#housing-rooms');
  var filterGuestElement = filterBlock.querySelector('#housing-guests');

  var types = function (item) {
    var typeValue = filterTypeElement.value;
    if (item.offer.type === typeValue || typeValue === typeName.any) {
      return true;
    }
    return false;
  };

  var prices = function (item) {
    var priceValue = filterPriceElement.value;
    if (priceValue === typeName.any) {
      return true;
    }
    if (priceValue === priceName.low) {
      if (item.offer.price < namePrice.low) {
        return true;
      }
    }
    if (priceValue === priceName.high) {
      if (item.offer.price > namePrice.high) {
        return true;
      }
    }
    if (priceValue === priceName.middle) {
      if (item.offer.price >= namePrice.low && item.offer.price <= namePrice.high) {
        return true;
      }
    }
    return false;
  };

  var rooms = function (item) {
    var roomValue = filterRoomElement.value;
    if (item.offer.rooms === Number(roomValue) || roomValue === typeName.any) {
      return true;
    }
    return false;
  };

  var guests = function (item) {
    var guestValue = filterGuestElement.value;
    if (item.offer.guests === Number(guestValue) || guestValue === typeName.any) {
      return true;
    }
    return false;
  };

  var features = function (arr) {
    var inputs = filterBlock.querySelectorAll('input[name="features"]');
    inputs.forEach(function (input) {
      if (input.checked) {
        arr = arr.filter(function (item) {
          if (item.offer.features.includes(input.value)) {
            return true;
          }
          return false;
        });
      }
    });
    return arr;
  };

  var update = function (arr, type) {
    if (type) {
      arr = arr.filter(types).filter(prices).filter(rooms).filter(guests);
      arr = features(arr);
    }

    if (arr.length > 0) {
      window.map.pinBlock.appendChild(window.card.getObjectsList(arr.slice(0, 5)));
      window.map.filterBlock.before(window.card.getCardModal(arr[0]));
      window.card.hideCurrentCard();
    }
  };

  window.filter = {
    block: filterBlock,
    features: features,
    update: update
  };
})();
