$(document).ready(function() {
  displayEditAttributes(JSON.parse(sessionStorage.getItem('selected_event')));

  function displayEditAttributes(selectedEvent) {
    for (var key in selectedEvent) {
        displayEditAttribute(key, selectedEvent[key]);
    }
   $('#edit-event-attributes').listview('refresh');
  }

  function displayEditAttribute(key, val) {

    // If the attribute is the id, do not make it editable
    valText = key == 'id' ? '<span class="val">' + val + '</span>'
        : '<input type="text" value="' + val + '" />';

    $('#edit-event-attributes').append(
        '<li><span class="key">' + key
        + '</span>' + valText + '</li>');
  }
})