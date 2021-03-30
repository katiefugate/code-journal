/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var previousDataJSON = window.localStorage.getItem('cj-entry-form');
if (previousDataJSON !== null) {
  data = JSON.parse(previousDataJSON);
}

function store(event) {
  var dataJSON = JSON.stringify(data);
  window.localStorage.setItem('cj-entry-form', dataJSON);
}

window.addEventListener('beforeunload', store);
