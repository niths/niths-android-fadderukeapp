$(document).ready(function() {
  var recursionLevel = 0;

  if (role == '') {
    $('#edit').css('visibility', 'visible');
    $('#delete').css('visibility', 'visible');
  }

  var eventId = JSON.parse(sessionStorage.getItem('event_id'));

  $.ajax({
    url: address + 'events/' + eventId,
    type: 'GET',
    cache: false,
    success: function(data) {
      displayAttributes(data);
    },
    error: function(xhr) {
      alert(JSON.stringify(xhr));
    }
  });

  $('#edit').click(function() {
    $.mobile.changePage('edit-event.html');
  });

  $('#delete').click(function() {
    $.ajax({
      url: address + 'events/' + eventId,
      type: 'DELETE',
      cache: false,
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

  function displayAttributes(selectedEvent) {
    for (attribute in selectedEvent) {
      if (typeof (selectedEvent[attribute]) == 'object') {
        displayAttribute(attribute, '');
        recursionLevel++;
        displayAttributes(selectedEvent[attribute]);
      } else {
        displayAttribute(attribute, selectedEvent[attribute]);
      }
    }
    $('#event-attributes').listview('refresh');
  }

  function displayAttribute(key, val) {
    $('#event-attributes').append('<li><span class="key" style="margin-left: '
        + recursionLevel * 15 + 'px;">' + key
        + '</span><span class="val">' + val + '</span></li>');
  }
});