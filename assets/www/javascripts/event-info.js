$(document).ready(function() {

  if (role == 'foo') {
    $('#edit').css('visibility', 'visible');
    $('#delete').css('visibility', 'visible');
  }

  // Marshal the object
  var selectedEvent = JSON.parse(sessionStorage.getItem('selected_event'));

  $('#edit').click(function() {
    $.mobile.changePage('edit-event.html');
  });

  $('#delete').click(function() {
    $.ajax({
      url: 'http://146.247.156.90:8080/niths/events/'
          + selectedEvent.id,
      type: 'delete',
      beforeSend: function(xhr) {
        xhr.setRequestHeader("Authorization", "Basic YWRtaW46bml0aHNfYWRtaW4=");
      },
      success: function(data, status) {
        alert("S: " + data + status);
      },
      error: function(xhr) {
        alert(JSON.stringify(xhr));
      }
    });
  });

  displayAttributes(selectedEvent);

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