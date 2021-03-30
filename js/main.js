/* global data */
/* exported data */

var form = document.querySelector('form');
var photoUrl = document.querySelector('#url');
var img = document.querySelector('.placeholder');

function photoUrlHandler(event) {
  img.setAttribute('src', photoUrl.value);
}

function saveButtonHandler(event) {
  event.preventDefault();
  var title = form.elements.title.value;
  var url = form.elements.url.value;
  var notes = form.elements.notes.value;
  var entriesObj = { title, url, notes };
  entriesObj.entryId = data.nextEntryId;
  data.nextEntryId++;
  data.entries.unshift(entriesObj);
  img.setAttribute('src', 'images/placeholder-image-square.jpg');
  form.reset();
}

photoUrl.addEventListener('input', photoUrlHandler);

form.addEventListener('submit', saveButtonHandler);
