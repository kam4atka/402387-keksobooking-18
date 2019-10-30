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

  var inputs = filterBlock.querySelectorAll('input[name="features"]');

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
      return item.offer.price < namePrice.low;
    }
    if (priceValue === priceName.high) {
      return item.offer.price > namePrice.high;
    }
    if (priceValue === priceName.middle) {
      return item.offer.price >= namePrice.low && item.offer.price <= namePrice.high;
    }
    return false;
  };

  var rooms = function (item) {
    var roomValue = filterRoomElement.value;
    return item.offer.rooms === Number(roomValue) || roomValue === typeName.any;
  };

  var guests = function (item) {
    var guestValue = filterGuestElement.value;
    return item.offer.guests === Number(guestValue) || guestValue === typeName.any;
  };

  var features = function (item) {
    var result = true;
    inputs.forEach(function (input) {
      if (input.checked) {
        result = item.offer.features.some(function (feature) {
          return feature === input.value;
        });
      }
    });
    return result;
  };

  var update = function (arr) {
    arr = arr.filter(types).filter(prices).filter(rooms).filter(guests).filter(features);

    if (arr.length > 0) {
      window.map.pinBlock.appendChild(window.card.getObjectsList(arr.slice(0, 5)));
      window.card.hideCurrentCard();
    }
  };

  window.filter = {
    block: filterBlock,
    features: features,
    update: update
  };
})();
