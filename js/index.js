// ----------------------------------------
//-------CREATE ELEMENTS FUNCTIONS---------
// ----------------------------------------
// Draw Application
function draw(data) {
  // Clear the dom to prevent duplication
  clearData();

  if (!Array.isArray(data)) return;
  for (let i = 0; i < data.length; i++) {
    drawCol(data[i]);
  }
}
// Draw Col for note
function drawCol(note) {
  const { notes_insert } = NOTES_DOM;
  const notesCOL = createNoteCol(note);
  if (!notesCOL) return;
  notes_insert.append(notesCOL);
}
function createNoteCol(note) {
  const { note_mission, note_date, note_time, note_id, note_selected } = note;

  if (!note_mission || !note_date || !note_time) return;
  // Create col(bootstrap class)
  const divBody = document.createElement('div');
  divBody.classList.add('col-6', 'col-md-3', 'col-lg-2');
  // Create card(bootstrap class)
  const divCardWrapper = document.createElement('div');
  divCardWrapper.id = note_id;
  divCardWrapper.classList.add('card', 'm-auto', 'py-5', 'custom-card');
  divCardWrapper.addEventListener('mouseover', function() {
    closeIcon.classList.remove('invisible');
    // closeIcon.classList.add('fade-in');
    // fadeIn(closeIcon, 1000);
  });

  divCardWrapper.addEventListener('mouseout', function() {
    closeIcon.classList.add('invisible');
  });
  // Create div for close icon and check icon
  const divIconContainer = document.createElement('div');
  divIconContainer.classList.add('form-check-inline');

  const closeIcon = document.createElement('i');
  closeIcon.classList.add(
    'ion-md-close-circle-outline',
    'close-btn',
    'invisible'
  );
  closeIcon.addEventListener('click', deleteNote);
  // Create check icon
  const checkIcon = document.createElement('i');
  checkIcon.classList.add('check-btn', 'mx-1');
  if (note_selected) {
    checkIcon.classList.add('ion-md-checkmark-circle');
    checkIcon.classList.remove('ion-md-radio-button-off');
  } else {
    checkIcon.classList.remove('ion-md-checkmark-circle');
    checkIcon.classList.add('ion-md-radio-button-off');
  }
  checkIcon.addEventListener('click', toggleSelected);
  // Create card body
  const divCardBody = document.createElement('div');
  divCardBody.classList.add('card-body');
  // Create card text
  const pCardMission = document.createElement('p');
  pCardMission.classList.add('card-text');
  pCardMission.innerText = note_mission;

  const hr = document.createElement('hr');

  const pCardDate = document.createElement('p');
  pCardDate.classList.add('card-text', 'small');
  pCardDate.innerText = formatDate(note_date);

  const pCardTime = document.createElement('p');
  pCardTime.classList.add('card-text', 'small');
  pCardTime.innerText = note_time;

  divCardBody.append(pCardMission, hr, pCardDate, pCardTime);
  divIconContainer.append(checkIcon, closeIcon);
  divCardWrapper.append(divIconContainer, divCardBody);
  divBody.append(divCardWrapper);
  // fadeIn(divCardBody, 1500);
  return divBody;
}

// Init application
function init() {
  arrayOfData = JSON.parse(localStorage.getItem('notesData')) || [];
  draw(arrayOfData);
}
init();
