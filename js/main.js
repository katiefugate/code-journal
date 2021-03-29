/* global data */
/* exported data */

var photoUrl = document.querySelector('#url');
var img = document.querySelector('.placeholder');

function photoUrlHandler(event) {
  img.setAttribute('src', photoUrl.value);
}

photoUrl.addEventListener('input', photoUrlHandler);
