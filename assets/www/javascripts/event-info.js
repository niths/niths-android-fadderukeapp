$(document).ready(function() {
  //traverseAttributes(JSON.parse(sessionStorage.getItem('selected_api_event')));
  var selectedEvent = JSON.parse(sessionStorage.getItem('selected_event'));
  for (var key in selectedEvent) {
    if (selectedEvent.hasOwnProperty(key)) {
      displayAttribute(key, selectedEvent[key]);
    }
  }
  $('#event-attributes').listview('refresh');


  function displayAttribute(key, val) {
    $('#event-attributes').append('<li><a>'  + key + ' : ' + val + '</a></li>');
  }
});