$(document).ready(function() {
  var selectedEventSub = sessionStorage.getItem('selected_sub');

  function displayEditSubAttributes() {
    for (var attribute in selectedEventSub) {
      if (typeof (selectedEventSub[attribute]) == 'object') {
        $('#edit-events-sub').append('<li>' + attribute + '</li>');
      } else {
        displayEditSubAttributes(attribute, selectedEventSub[attribute]);
      }

      //$('#edit-event')
    }

    function displayEditSubAttribute(key, val) {
      $('#edit-event-sub-attributes').append('<li>' + key + val + '</li>');
    }
  }
});