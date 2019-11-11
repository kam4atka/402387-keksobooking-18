'use strict';

(function () {
  var FILE_TYPES = ['jpeg', 'jpg', 'png', 'gif'];

  var Preview = {
    WIDTH: 70,
    HEIGHT: 70,
    RADIUS: 5,
    ALT: 'Фотография объекта',
    DEFAULT_URL: 'img/muffin-grey.svg'
  };

  var createPreview = function (image) {
    var node = document.createElement('img');
    node.src = image;
    node.alt = Preview.ALT;
    node.width = Preview.WIDTH;
    node.height = Preview.HEIGHT;
    node.style.borderRadius = Preview.RADIUS + 'px';
    return node;
  };

  var updatePhoto = function (files, block) {
    var name;
    var matches;
    var preview = block.children[0];
    Array.from(files).slice(0, 9).forEach(function (file) {
      name = file.name.toLowerCase();
      matches = FILE_TYPES.some(function (it) {
        return name.endsWith(it);
      });
      if (matches) {
        var reader = new FileReader();
        reader.addEventListener('load', function () {
          if (!preview) {
            block.append(createPreview(reader.result));
          }
          if (preview && preview.nodeName === 'IMG') {
            preview.src = reader.result;
          }
        });
        reader.readAsDataURL(file);
      }
    });
  };

  var clearPhoto = function (block, status) {
    if (!status) {
      block.children[0].src = Preview.DEFAULT_URL;
    } else {
      Array.from(block.children).forEach(function (item) {
        item.remove();
      });
    }
  };

  var uploadHandler = function (evt) {
    var files = evt.target.files;
    if (files) {
      if (evt.target.id === 'avatar') {
        updatePhoto(files, window.form.avatarPreviewElement);
      }
      if (evt.target.id === 'images') {
        updatePhoto(files, window.form.photoPreviewElement);
      }
    }
  };

  window.photo = {
    upload: uploadHandler,
    clear: clearPhoto
  };
})();
