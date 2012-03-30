$(document).ready(function() {
  var selectedEvent;

  $.ajax({
      url: address + '/niths/events/'
          + JSON.parse(sessionStorage.getItem('event_id')),
      type: 'get',
      cache: false,
      success: function(data) {
        selectedEvent = data;
        displayEditAttributes();
      },
      error: function(xhr) {
        alert(JSON.stringify(xhr));
      }
    });

  $('form').submit(function() {
    var obj = $('form').toJSON();
    alert(JSON.stringify(obj));
    $.ajax({
      url: address + '/niths/events',
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
        alert(JSON.stringify(xhr));
      }
    });

    return false;
  });

  function displayEditAttributes() {
    for (var attribute in selectedEvent) {
      if (typeof (selectedEvent[attribute]) == 'object') {
        $('#edit-event-attributes').append('<li><a href="#" id="' + attribute
            + '" class="obj" data-role="button">' + attribute + '</a></li>');
      } else {
        displayEditAttribute(attribute, selectedEvent[attribute]);
      }
    }

   $('#edit-event-attributes').listview('refresh');
   $('#edit-event').trigger('create');
  }

  function displayEditAttribute(key, val) {

    // If the attribute is the id, do not make it editable
    var textVal = '<input type="text" class="val" name="' + key + '" value="'
        + val + '" '+ checkIdConstraint(key) + ' />';

    $('#edit-event-attributes').append(
        '<li><span class="key">' + key + '</span>' + textVal + '</li>');
  }

  function checkIdConstraint(key) {
    return (key == 'id') ? 'readonly="readonly"' : '';
  }

  $('.obj').live('click', function() {
    sessionStorage.setItem('selectedSub',
        JSON.stringify(selectedEvent[$(this).attr('id')]));
    $.mobile.changePage('edit-event-sub.html');
  });
});