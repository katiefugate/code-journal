/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var myStorage = window.localStorage;
var previousDataJSON = myStorage.getItem('cj-entry-form');
if (previousDataJSON !== null) {
  data = JSON.parse(previousDataJSON);
}

function store(event) {
  var dataJSON = JSON.stringify(data);
  myStorage.setItem('cj-entry-form', dataJSON);
}

window.addEventListener('beforeunload', store);
