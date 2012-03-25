$(document).ready(function() {
  getAPIEvents();

  function getAPIEvents() {
    $.ajax({
      url: 'http://146.247.155.74:8080/niths/api_events',
      type: 'get',
      success: function(data) {
        alert(JSON.stringify(data));
        traverseAPIEvents(data);
      },
      error: function(xhr) {
        alert(JSON.stringify(xhr));
      }
    });
  }

  function traverseAPIEvents(events) {
    for (i in events) {
      if (typeof (events[i]) == 'object') {
        traverseAPIEvents(events[i]);
      } else {
        displayAPIEvent(i, events[i]);
      }
    }
  }

  function displayAPIEvent(key, val) {
    $('#events').append('<li><p>' + key + ' : ' + val + '</p></li>');
    $('#events').listview('refresh'); 
  }
});