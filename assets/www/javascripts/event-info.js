$(document).ready(function() {

  if (role == 'foo') {
    $('#edit').css('visibility', 'visible');
    $('#delete').css('visibility', 'visible');
  }

  $('#edit').click(function() {
    $.mobile.changePage('edit-event.html');
  });

  $('#delete').click(function() {
    
  });

  displayAttributes(JSON.parse(sessionStorage.getItem('selected_event')));

  function displayAttributes(selectedEvent) {
    for (var key in selectedEvent) {
      displayAttribute(key, selectedEvent[key]);
    }
    $('#event-attributes').listview('refresh');
  }

  function displayAttribute(key, val) {
    $('#event-attributes').append('<li><span class="key">' + key
        + '</span><span class="val">' + val + '</span></li>');
  }
});