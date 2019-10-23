'use strict';

(function () {
  var Url = {
    SERVER: 'https://js.dump.academy/keksobooking',
    DATA: 'https://js.dump.academy/keksobooking/data'
  };
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
    xhr.open('GET', Url.DATA);
    xhr.send();
  };

  var send = function (data, onLoad, onError) {
    var xhr = xhrObject(onLoad, onError);
    xhr.open('POST', Url.SERVER);
    xhr.send(data);
  };

  window.data = {
    load: load,
    send: send
  };
})();
