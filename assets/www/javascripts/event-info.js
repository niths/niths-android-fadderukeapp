$(document).ready(function() {

  if (role == 'foo') {
    $('#edit').css('visibility', 'visible');
    $('#delete').css('visibility', 'visible');
  }

  $('#edit').click(function() {
    alert("page chgan");
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
    $('#event-attributes').append(
        '<li><div class="ui-block-a"><p class="key">' + key
            + '</p></div><div class="ui-block-b"><p class="val">'
            + val + '</p></div></li>');
  }
});