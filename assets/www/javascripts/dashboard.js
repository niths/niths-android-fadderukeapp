$(document).ready(function() {
  // Removed previous API events from the storage, if any
  sessionStorage.clear();

  getEvents();

  function getEvents() {
    $.ajax({
      url: address + '/niths/events',
      type: 'get',
      cache: false,
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
      displayEvent(event);
    });

    $('#events').listview('refresh');
  }

  function displayEvent(event) {
    $('#events').append('<li><a id="' + event.id + '">' + event.name
        + '</a></li>');
  }

  $('#events a').live('click', function(event) {
    sessionStorage.setItem('event_id', event.target.id);

    $.mobile.changePage('event/event-info.html');
  })
});