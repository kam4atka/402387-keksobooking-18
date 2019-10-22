'use strict';

(function () {
  var URL_SERV = 'https://js.dump.academy/keksobooking/data';
  var STATUS_SUCCESS = 200;
  var TIMEOUT = 10000;

  var xhrObject = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT;
    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_SUCCESS) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status);
      }
    });
    return xhr;
  };

  var load = function (onLoad, onError) {
    var xhr = xhrObject(onLoad, onError);
    xhr.addEventListener('error', function () {
      onError('Ошибка соединения..');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.open('GET', URL_SERV);
    xhr.send();
  };

  window.data = {
    load: load
  };
})();
