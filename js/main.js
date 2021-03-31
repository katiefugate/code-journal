/* global data */
/* exported data */

var form = document.querySelector('form');
var photoUrl = document.querySelector('#url');
var img = document.querySelector('.placeholder');
var ul = document.querySelector('.entries');

function photoUrlHandler(event) {
  img.setAttribute('src', photoUrl.value);
}
var entriesObj;

function saveButtonHandler(event) {
  event.preventDefault();
  var title = form.elements.title.value;
  var url = form.elements.url.value;
  var notes = form.elements.notes.value;
  entriesObj = { title, url, notes };
  entriesObj.entryId = data.nextEntryId;
  data.nextEntryId++;
  data.entries.unshift(entriesObj);
  img.setAttribute('src', 'images/placeholder-image-square.jpg');
  form.reset();
  entriesContainer.className = 'container';
  formContainer.className = 'container hidden';
  addEntry(entriesObj);
}

photoUrl.addEventListener('input', photoUrlHandler);

form.addEventListener('submit', saveButtonHandler);

function addEntry(entry) {
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
  if (entry === entriesObj) {
    ul.prepend(entryLi);
  }
}

function contentLoadHandler(event) {
  for (var i = 0; i < data.entries.length; i++) {
    addEntry(data.entries[i]);
  }
  var currentPage = localStorage.getItem('current');
  if (currentPage === 'entries-current') {
    entriesContainer.className = 'container current';
    formContainer.className = 'container hidden';
  } else {
    entriesContainer.className = 'container hidden';
    formContainer.className = 'container current';
  }
}

window.addEventListener('DOMContentLoaded', contentLoadHandler);

var entriesLink = document.querySelector('.entries-link');
var entriesContainer = document.querySelector('#entriesContainer');
var formContainer = document.querySelector('#formContainer');

function entriesLinkHandler(event) {
  entriesContainer.className = 'container current';
  formContainer.className = 'container hidden';
  localStorage.setItem('current', 'entries-current');
}

entriesLink.addEventListener('click', entriesLinkHandler);

var newButton = document.querySelector('.newEntry');

function newButtonHandler(event) {
  entriesContainer.className = 'container hidden';
  formContainer.className = 'container current';
  localStorage.setItem('current', 'form-current');
}

newButton.addEventListener('click', newButtonHandler);
