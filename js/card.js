'use strict';

(function () {
  var ObjectType = {
    PALACE: 'Дворец',
    FLAT: 'Квартира',
    HOUSE: 'Дом',
    BUNGALO: 'Бунгало'
  };

  var insertPhoto = function (parent, photos) {
    if (parent.children.length > 0) {
      var photo = parent.querySelector('.popup__photo');
      photo.src = photos[0];
      photos.forEach(function (photoItem) {
        var photoNode = photo.cloneNode(true);
        photoNode.src = photoItem;
        parent.appendChild(photoNode);
      });
    }
  };

  var insertFeatures = function (parent, features) {
    var listElements = parent.querySelectorAll('li');
    listElements.forEach(function (listElement) {
      parent.removeChild(listElement);
    });
    var classElement = 'popup__feature';
    features.forEach(function (feature) {
      var element = '<li class="' + classElement + ' ' + classElement + '--' + feature + '"></li>';
      parent.insertAdjacentHTML('beforebegin', element);
    });
  };

  var getCardModal = function (obj) {
    if (!obj) {
      return false;
    }
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
    if (obj.offer.photos.length !== 0) {
      insertPhoto(cardNode.querySelector('.popup__photos'), obj.offer.photos);
    } else {
      cardNode.querySelector('.popup__photos').remove();
    }
    return cardNode;
  };

  var getObjectsList = function (objects) {
    var fragment = document.createDocumentFragment();
    var objectTemplate = document.querySelector('#pin').content;
    objects.forEach(function (item) {
      var objectNode = objectTemplate.cloneNode(true);
      var coordX = item.location.x - (window.pin.setting.PIN_WIDTH / 2);
      var coordY = item.location.y - window.pin.setting.PIN_HEIGHT;
      var pinElement = objectNode.querySelector('.map__pin');
      pinElement.style.left = coordX + 'px';
      pinElement.style.top = coordY + 'px';
      var image = objectNode.querySelector('img');
      image.src = item.author.avatar;
      image.alt = item.offer.title;
      pinElement.addEventListener('click', function () {
        window.map.removeCard();
        window.map.filterBlock.before(getCardModal(item));
        window.pin.clearActiveStatus();
        pinElement.classList.add('map__pin--active');
        hideCurrentCard();
      });
      pinElement.addEventListener('keydown', function (pinEvt) {
        if (pinEvt.keyCode === window.util.KeyCode.ENTER) {
          pinEvt.preventDefault();
          window.map.removeCard();
          window.map.filterBlock.before(getCardModal(item));
          window.pin.clearActiveStatus();
          pinElement.classList.add('map__pin--active');
          hideCurrentCard();
        }
      });
      fragment.appendChild(objectNode);
    });
    return fragment;
  };

  var clickCloseCardHandler = function (clickEvt) {
    clickEvt.preventDefault();
    clickEvt.target.parentElement.classList.add('hidden');
    document.removeEventListener('keydown', tabEscCardHandler);
  };

  var tabEscCardHandler = function (tabEvt) {
    var cardMapBlock = window.map.block.querySelector('.map__card');
    if (tabEvt.keyCode === window.util.KeyCode.ESC) {
      tabEvt.preventDefault();
      tabEvt.stopPropagation();
      cardMapBlock.classList.add('hidden');
      document.removeEventListener('keydown', tabEscCardHandler);
    }
  };

  var hideCurrentCard = function () {
    var cardMapBlock = window.map.block.querySelector('.map__card');
    if (window.map.block.querySelector('.map__card')) {
      document.addEventListener('keydown', tabEscCardHandler);
      var cardCloseMapBlock = cardMapBlock.querySelector('.popup__close');
      cardCloseMapBlock.addEventListener('click', clickCloseCardHandler);
    }
  };

  window.card = {
    getObjectsList: getObjectsList,
    hideCurrent: hideCurrentCard,
    getModal: getCardModal
  };
})();
