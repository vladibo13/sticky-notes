// ------------------------------
//-------EVENT LISTENERS---------
// ------------------------------
// Create a note from the input
NOTES_DOM.note_submit.addEventListener('click', function() {
  const {
    note_mission,
    note_date,
    note_time,
    note_form,
    note_error
  } = NOTES_DOM;
  //validation
  note_error.innerHTML = '';
  // Regex
  const dateRegExp = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
  const timeRegExp = /^(0[0-9]|1[0-9]|2[0-3]|[0-9]):[0-5][0-9]$/;
  // check note mission field
  if (!note_mission.value) {
    note_error.innerHTML = alertError('You cannot leave mission field empty.');
    return;
  }
  // check note date field not less than today
  if (!compareDates(note_date.value)) {
    note_error.innerHTML = alertError('Date cannot be less than today.');
    return;
  }
  //check note date and time fields
  if (!dateRegExp.test(note_date.value) || !timeRegExp.test(note_time.value)) {
    note_error.innerHTML = alertError('Date or Time Fields are incorrect.');
    return;
  }

  //push to data using function constructor
  const newNote = new Note(
    note_mission.value,
    note_date.value,
    note_time.value
  );
  arrayOfData.unshift(newNote);
  //save to local storage new note
  saveToLocalStorage('notesData', arrayOfData);
  //draw with new data
  draw(arrayOfData);
  // Add fade in effect
  const fadeInElement = document.getElementById(newNote.note_id);
  fadeInElement.classList.add('fade-in');
  //reset the form after submit
  note_form.reset();
});

// Clear all input fields
NOTES_DOM.note_clear.addEventListener('click', function() {
  const { note_form } = NOTES_DOM;
  note_form.reset();
});

// Filter notes based on selected input
NOTES_DOM.note_filter.addEventListener('change', function() {
  const { note_filter } = NOTES_DOM;
  const result = sortData(arrayOfData, note_filter.value);
  draw(result);
});
