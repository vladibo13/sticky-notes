// function helloWorld() {
//   alert('Hello World');
// }

//------------------------------------
//----------HELPER FUNCTIONS------------
//------------------------------------
// sort data based on selected input
function sortData(data, searchTerm) {
  let result = [];
  if (!Array.isArray(data) || !searchTerm || searchTerm === 'all') return data;
  switch (searchTerm) {
    case 'selected':
      result = data.filter(function(note) {
        return note.note_selected;
      });
      break;
    case 'notselected':
      result = data.filter(function(note) {
        return !note.note_selected;
      });
      break;
  }

  return result;
}
// toggle Selected
function toggleSelected() {
  const noteIndex = findIndex(arrayOfData, this.parentElement.parentElement.id);
  if (noteIndex === undefined) return;
  arrayOfData[noteIndex].note_selected = !arrayOfData[noteIndex].note_selected;
  saveToLocalStorage('notesData', arrayOfData);
  draw(arrayOfData);
}
// Delete note function
function deleteNote() {
  // Find Note to delete
  const noteIndex = findIndex(arrayOfData, this.parentElement.parentElement.id);
  if (noteIndex === undefined) return;
  // Delete from found index
  arrayOfData.splice(noteIndex, 1);
  saveToLocalStorage('notesData', arrayOfData);
  draw(arrayOfData);
}

// find index in the array of data
function findIndex(data, id) {
  for (let i = 0; i < data.length; i++) {
    if (data[i].note_id === id) {
      return i;
    }
  }
}

// Save to local storage
function saveToLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
//clear data
function clearData() {
  const { notes_insert } = NOTES_DOM;
  notes_insert.innerHTML = '';
}
function alertError(str) {
  return `  <div
    class="alert alert-danger alert-dismissible fade show w-75"
    role="alert"
  >
    <strong>Wrong Input!</strong> You should check in on some of those
    fields in form. <strong>${str}</strong>
    <button
      type="button"
      class="close"
      data-dismiss="alert"
      aria-label="Close"
    >
      <span aria-hidden="true">&times;</span>
    </button>
  </div>`;
}

// turn yyyy-dd-mm to dd-mm-yyyy from stackoverflow using regexp
function formatDate(input) {
  var datePart = input.match(/\d+/g),
    year = datePart[0].substring(2), // get only two digits
    month = datePart[1],
    day = datePart[2];

  return day + '/' + month + '/' + year;
}
// return current date
function getCurrentDate() {
  let today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = today.getFullYear();

  today = mm + '/' + dd + '/' + yyyy;
  return today;
}
// comparing two dates and returns if user date bigger than current
function compareDates(userDate) {
  const current = Date.parse(getCurrentDate());
  const user = Date.parse(userDate);
  if (user < current) {
    return false;
  }
  return true;
}
