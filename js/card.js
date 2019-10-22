'use strict';

(function () {
  var ObjectType = {
    PALACE: 'Дворец',
    FLAT: 'Квартира',
    HOUSE: 'Дом',
    BUNGALO: 'Бунгало'
  };

  var errorImages = ['https://placehold.it/517x500'];

  var insertPhoto = function (parent, arr) {
    if (parent.children.length > 0) {
      var photo = parent.querySelector('.popup__photo');
      photo.src = arr[0];
      for (var i = 1; i < arr.length; i++) {
        var photoNode = photo.cloneNode(true);
        photoNode.src = arr[i];
        parent.appendChild(photoNode);
      }
    }
  };

  var insertFeatures = function (parent, arr) {
    var listElement = parent.querySelectorAll('li');
    for (var i = 0; i < listElement.length; i++) {
      parent.removeChild(listElement[i]);
    }
    var classElement = 'popup__feature';
    for (var j = 0; j < arr.length; j++) {
      var element = '<li class="' + classElement + ' ' + classElement + '--' + arr[j] + '"></li>';
      parent.insertAdjacentHTML('beforebegin', element);
    }
  };

  var getCardModal = function (obj) {
    var cardTemplate = document.querySelector('#card').content;
    var cardNode = cardTemplate.cloneNode(true);
    cardNode.querySelector('.popup__title').textContent = obj.offer.title;
    cardNode.querySelector('.popup__text--address').textContent = obj.offer.address;
    cardNode.querySelector('.popup__text--price').textContent = obj.offer.price + ' ₽/ночь';
    cardNode.querySelector('.popup__type').textContent = ObjectType[obj.offer.type.toUpperCase()];
    cardNode.querySelector('.popup__text--capacity').textContent = obj.offer.rooms + ' комнаты для ' + obj.offer.guests + ' гостей';
    cardNode.querySelector('.popup__text--time').textContent = 'Заезд после ' + obj.offer.checkin + ', выезд до ' + obj.offer.checkout;
    insertFeatures(cardNode.querySelector('.popup__features'), obj.offer.features);
    cardNode.querySelector('.popup__description').textContent = obj.offer.description;
    cardNode.querySelector('.popup__avatar').src = obj.author.avatar;
    insertPhoto(cardNode.querySelector('.popup__photos'), (obj.offer.photos.length > 0) ? obj.offer.photos : errorImages);
    return cardNode;
  };

  var getObjectsList = function (arr) {
    var fragment = document.createDocumentFragment();
    var objectTemplate = document.querySelector('#pin').content;
    arr.forEach(function (item) {
      var objectNode = objectTemplate.cloneNode(true);
      var coordX = item.location.x - (window.pin.PinSize.PIN_WIDTH / 2);
      var coordY = item.location.y - window.pin.PinSize.PIN_HEIGHT;
      var pinElement = objectNode.querySelector('.map__pin');
      pinElement.style.left = coordX + 'px';
      pinElement.style.top = coordY + 'px';
      var image = objectNode.querySelector('img');
      image.src = item.author.avatar;
      image.alt = item.offer.title;
      pinElement.addEventListener('click', function () {
        window.map.mapBlock.querySelector('.map__card').remove();
        window.map.filterBlock.before(getCardModal(item));
        hideCurrentCard();
      });
      pinElement.addEventListener('keydown', function (evt) {
        if (evt.keyCode === window.util.KeyCode.ENTER) {
          evt.preventDefault();
          window.map.mapBlock.querySelector('.map__card').remove();
          window.map.filterBlock.before(getCardModal(item));
          hideCurrentCard();
        }
      });
      fragment.appendChild(objectNode);
    });
    return fragment;
  };

  var clickCloseCardHandler = function (evt) {
    evt.preventDefault();
    evt.target.parentElement.classList.add('hidden');
  };

  var tabEscCardHandler = function (evt) {
    var cardMapBlock = window.map.mapBlock.querySelector('.map__card');
    if (evt.keyCode === window.util.KeyCode.ESC) {
      evt.preventDefault();
      evt.stopPropagation();
      cardMapBlock.classList.add('hidden');
      cardMapBlock.removeEventListener('keydown', tabEscCardHandler);
    }
  };

  var hideCurrentCard = function () {
    if (window.map.mapBlock.querySelector('.map__card')) {
      var cardMapBlock = window.map.mapBlock.querySelector('.map__card');
      cardMapBlock.addEventListener('keydown', tabEscCardHandler);
      var cardCloseMapBlock = cardMapBlock.querySelector('.popup__close');
      cardCloseMapBlock.addEventListener('click', clickCloseCardHandler);
    }
  };

  window.card = {
    getObjectsList: getObjectsList,
    hideCurrentCard: hideCurrentCard,
    getCardModal: getCardModal
  };
})();
