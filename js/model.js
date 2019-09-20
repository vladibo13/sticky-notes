const NOTES_DOM = {
  note_mission: document.getElementById('note_mission'),
  note_date: document.getElementById('note_date'),
  note_time: document.getElementById('note_time'),
  note_form: document.getElementById('note_form'),
  note_submit: document.getElementById('note_submit'),
  note_clear: document.getElementById('note_clear'),
  notes_insert: document.getElementById('notes'),
  note_filter: document.getElementById('note_filter'),
  notes_container: document.getElementById('notes-container'),
  note_error: document.getElementById('note_error')
};
// Array of data => 'source of truth'
let arrayOfData;
// Notes function constructor
function Note(_mission, _date, _time) {
  this.note_mission = _mission;
  this.note_date = _date;
  this.note_time = _time;
  this.note_id = 'note_' + Date.now();
  this.note_selected = false;
}
