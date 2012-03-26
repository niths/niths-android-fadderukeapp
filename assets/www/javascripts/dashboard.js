$(document).ready(function() {

  // Removed previous API events from the storage, if any
  sessionStorage.clear();

  getAPIEvents();

  function getAPIEvents() {
    $.ajax({
      url: 'http://ec2-46-137-44-111.eu-west-1.compute.amazonaws.com:8181/niths/api_events',
      type: 'get',
      success: function(data) {
        traverseAPIEvents(data);
      },
      error: function(xhr) {
        alert(JSON.stringify(xhr));
      }
    });
  }

  function traverseAPIEvents(apiEvents) {
    $.each(apiEvents, function(i, apiEvent) {

      // Stores each API event in the storage
      sessionStorage.setItem(
          'api_event#' + apiEvent.id,
          JSON.stringify(apiEvent));

      displayAPIEvent(apiEvent);
    });
  }

  function displayAPIEvent(apiEvent) {
    $('#events').append('<li><a id="' + apiEvent.id + '">' + apiEvent.title
        + '</a></li>');
    $('#events').listview('refresh');
  }

  $('#events a').live('click', function(event) {

    // Find and sets only the clicked API event in the storage.
    var apiEvent= sessionStorage.getItem('api_event#' + event.target.id);
    sessionStorage.setItem('selected_api_event', apiEvent);

    $.mobile.changePage('event-info.html');
  })
});