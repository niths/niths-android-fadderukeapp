$(document).ready(function() {
  // Removed previous API events from the storage, if any
  sessionStorage.clear();

  getEvents();

  function getEvents() {
    $.ajax({
      url: 'http://146.247.156.90:8080/niths/events',
      type: 'get',
      success: function(data) {
        traverseEvents(data);
      },
      error: function(xhr) {
        alert(JSON.stringify(xhr));
      }
    });
  }

  function traverseEvents(events) {
    $.each(events, function(i, event) {

      // Stores each API event in the storage
      sessionStorage.setItem(
          'event#' + event.id,
          JSON.stringify(event));

      displayEvent(event);
    });

    $('#events').listview('refresh');
  }

  function displayEvent(event) {
    $('#events').append('<li><a id="' + event.id + '">' + event.name
        + '</a></li>');
  }

  $('#events a').live('click', function(event) {

    // Find and sets only the clicked API event in the storage.
    var selectedEvent= sessionStorage.getItem('event#' + event.target.id);
    sessionStorage.setItem('selected_event', selectedEvent);

    $.mobile.changePage('event-info.html');
  })
});