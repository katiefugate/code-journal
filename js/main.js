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

function addEntry(entry) {
  var ul = document.querySelector('.entries');
  var entryLi = document.createElement('li');
  var row = document.createElement('div');
  var columnHalf = document.createElement('div');
  var img = document.createElement('img');
  var columnHalf2 = document.createElement('div');
  var titleH2 = document.createElement('h2');
  var notesP = document.createElement('p');
  ul.appendChild(entryLi);
  entryLi.appendChild(row);
  row.appendChild(columnHalf);
  columnHalf.appendChild(img);
  row.appendChild(columnHalf2);
  columnHalf2.appendChild(titleH2);
  columnHalf2.appendChild(notesP);
  ul.className = 'entries';
  entryLi.className = 'entry';
  row.className = 'row';
  columnHalf.className = 'column-half';
  columnHalf2.className = 'column-half';
  titleH2.className = 'title-h2';
  notesP.className = 'notes-p';
  img.setAttribute('src', entry.url);
  titleH2.textContent = entry.title;
  notesP.textContent = entry.notes;
}

function contentLoadHandler(event) {
  for (var i = 0; i < data.entries.length; i++) {
    addEntry(data.entries[i]);
  }
}

window.addEventListener('DOMContentLoaded', contentLoadHandler);
