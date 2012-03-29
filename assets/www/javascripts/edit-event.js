$(document).ready(function() {
  var recursionLevel = 0;

  $.ajax({
      url: 'http://146.247.157.119:8080/niths/events/' +
          JSON.parse(sessionStorage.getItem('event_id')),
      type: 'get',
      cache: false,
      success: function(data) {
        displayEditAttributes(data);
      },
      error: function(xhr) {
        alert(JSON.stringify(xhr));
      }
    });

  $('form').submit(function() {
    var obj = $('form').toJSON();
    $.ajax({
      url: 'http://146.247.157.119:8080/niths/events',
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

  function displayEditAttributes(selectedEvent) {
    for (var attribute in selectedEvent) {
      if (typeof (selectedEvent[attribute]) == 'object') {
        displayEditAttribute(attribute, null);
        recursionLevel++;
        displayEditAttributes(selectedEvent[attribute]);
      } else {
        displayEditAttribute(attribute, selectedEvent[attribute]);
      }
    }

   $('#edit-event-attributes').listview('refresh');
   $('#edit-event').trigger('create');
  }

  function displayEditAttribute(key, val) {
    var indentStyling = 'style="margin-left: ' + recursionLevel * 15 + 'px;"';
    var textVal = '';

    // If the attribute is the id, do not make it editable
    if (val != null) {
      textVal = '<input type="text" class="val" name="' + key + '" value="'
          + val + '" ' + indentStyling
          + ((key == 'id') ? ' readonly="readonly"' : '') + ' />';
    }
    

    $('#edit-event-attributes').append(
        '<li><span class="key" ' + indentStyling + '>' + key
        + '</span>' + textVal + '</li>');
  }
});