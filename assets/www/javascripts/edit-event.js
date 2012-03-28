$(document).ready(function() {
  $('#update').click(function() {
  });

  $('form').submit(function() {
    var obj = $('form').toJSON();
    $.ajax({
      url: 'http://146.247.156.90:8080/niths/events',
      type: 'put',
      cache: false,
      contentType: 'application/json',
      beforeSend: function(xhr) {
        xhr.setRequestHeader("Authorization", "Basic YWRtaW46bml0aHNfYWRtaW4=");
      },
      data :  JSON.stringify(obj),
      success: function(data, status) {
        history.back();
      },
      error: function(xhr) {
        alert('F: ' + JSON.stringify(xhr));
      }
    });

    return false;
  });

  displayEditAttributes(JSON.parse(sessionStorage.getItem('selected_event')));

  function displayEditAttributes(selectedEvent) {
    for (var key in selectedEvent) {
        displayEditAttribute(key, selectedEvent[key]);
    }
   $('#edit-event-attributes').listview('refresh');
  }

  function displayEditAttribute(key, val) {

    // If the attribute is the id, do not make it editable
    var textVal = '<input type="text" name="' + key + '" value="' + val + '"'
        + ((key == 'id') ? ' readonly="readonly"' : '') + ' />';
    

    $('#edit-event-attributes').append(
        '<li><span class="key">' + key
        + '</span>' + textVal + '</li>');
  }
})