/* global data */
/* exported data */

var form = document.querySelector('form');
var photoUrl = document.querySelector('#url');
var img = document.querySelector('.form-img');
var ul = document.querySelector('.entries');

function photoUrlHandler(event) {
  img.setAttribute('src', photoUrl.value);
}

function saveButtonHandler(event) {
  event.preventDefault();
  var title = form.elements.title.value;
  var url = form.elements.url.value;
  var notes = form.elements.notes.value;
  var entryId;
  var entriesObj = { title, url, notes, entryId };
  var liList = document.querySelectorAll('.entry');
  if (data.editing !== null) {
    var currentEditId = data.editing.entryId;
    for (var i = 0; i < data.entries.length; i++) {
      if (currentEditId === data.entries[i].entryId) {
        data.entries[i].title = title;
        data.entries[i].url = url;
        data.entries[i].notes = notes;
        entriesObj.entryId = currentEditId;
        liList[i].replaceWith(addEntry(entriesObj));
        entriesContainer.className = 'container current';
        formContainer.className = 'container hidden';
      }
    }
  } else {
    entriesObj.entryId = data.nextEntryId;
    data.nextEntryId++;
    data.entries.unshift(entriesObj);
    img.setAttribute('src', 'images/placeholder-image-square.jpg');
    form.reset();
    entriesContainer.className = 'container';
    formContainer.className = 'container hidden';
    ul.prepend(addEntry(entriesObj));
  }
  data.editing = null;
  data.view = 'entries';
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
  var icon = document.createElement('i');
  entryLi.appendChild(row);
  row.appendChild(columnHalf);
  columnHalf.appendChild(img);
  row.appendChild(columnHalf2);
  columnHalf2.appendChild(titleH2);
  columnHalf2.appendChild(icon);
  columnHalf2.appendChild(notesP);
  entryLi.className = 'entry';
  row.className = 'row';
  columnHalf.className = 'column-half';
  columnHalf2.className = 'column-half';
  titleH2.className = 'title-h2';
  notesP.className = 'notes-p';
  icon.className = 'fas fa-pen';
  img.setAttribute('src', entry.url);
  titleH2.textContent = entry.title;
  notesP.textContent = entry.notes;
  entryLi.setAttribute('data-entry-id', entry.entryId);
  return entryLi;
}

function contentLoadHandler(event) {
  for (var i = 0; i < data.entries.length; i++) {
    if (data.entries[i] !== null) {
      ul.appendChild(addEntry(data.entries[i]));
    }
  }

  if (data.view === 'entries') {
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
  data.view = 'entries';
}

entriesLink.addEventListener('click', entriesLinkHandler);

var newButton = document.querySelector('.newEntry');

function newButtonHandler(event) {
  entriesContainer.className = 'container hidden';
  formContainer.className = 'container current';
  data.view = 'entry-form';
  pageTitle.textContent = 'Entry';
  form.elements.title.value = '';
  form.elements.url.value = '';
  form.elements.notes.value = '';
  img.setAttribute('src', 'images/placeholder-image-square.jpg');
  deleteButton.className = 'hidden';
  modal.className = 'modalContainer hidden';
}

newButton.addEventListener('click', newButtonHandler);

var pageTitle = document.querySelector('.pageTitle');
var deleteButton = document.querySelector('.delete');

function editHandler(event) {
  if (event.target.className === 'fas fa-pen') {
    entriesContainer.className = 'container hidden';
    formContainer.className = 'container current';
    pageTitle.textContent = 'Edit Entry';
    deleteButton.className = 'delete';
    data.view = 'entry-form';
  }
  var currentEntryId = event.target.parentNode.parentNode.parentNode.getAttribute('data-entry-id');
  for (var i = 0; i < data.entries.length; i++) {
    var stringDataEntryId = data.entries[i].entryId.toString();
    if (currentEntryId === stringDataEntryId) {

      data.editing = data.entries[i];
      form.elements.title.value = data.entries[i].title;
      form.elements.url.value = data.entries[i].url;
      form.elements.notes.value = data.entries[i].notes;
      img.setAttribute('src', data.entries[i].url);
    }
  }
}

ul.addEventListener('click', editHandler);

var overlay = document.querySelector('.overlay');
var modal = document.querySelector('.modalContainer');

function deleteHandler(event) {
  modal.className = 'modalContainer';
  overlay.className = 'overlay';
  deleteButton.className = 'delete clicked';
}

deleteButton.addEventListener('click', deleteHandler);

var cancelButton = document.querySelector('.cancelButton');

function cancelHandler(event) {
  modal.className = 'modalContainer';
  overlay.className = 'overlay hidden';

}

cancelButton.addEventListener('click', cancelHandler);

var confirmButton = document.querySelector('.confirmButton');

function confirmHandler(event) {
  var currentEditId = data.editing.entryId;
  data.view = 'entries';
  overlay.className = 'overlay hidden';
  modal.className = 'modalContainer';
  entriesContainer.className = 'container current';
  formContainer.className = 'container hidden';
  var liList = document.querySelectorAll('.entry');
  for (var i = 0; i < data.entries.length; i++) {
    if (currentEditId === data.entries[i].entryId) {
      data.entries.splice(i, 1);
      liList[i].replaceWith('');
    }
  }

}

confirmButton.addEventListener('click', confirmHandler);
