var locations = '';
var currentLocationIndex = 0;

$("#admin-create-event-page").live('pageshow', function() {
  $('#name2').val('');
  $('#description2').val('');
  var dateToday = getDateTodayAsString();
  $('#startTime2').val(dateToday);
  $('#endTime2').val(dateToday);
  $('#place2').val('Schweigaards gate 14');
  searchOnLocation();
});

function getDateTodayAsString(){
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0!
  var yyyy = today.getFullYear();
  if(dd<10){
    dd='0'+dd
  } 
  if(mm<10){
    mm='0'+mm
  } 
  var today = dd+'/'+mm+'/'+yyyy + ' 12:00';

  return today;
}

function searchOnLocation(){
    $.getJSON('http://maps.googleapis.com/maps/api/geocode/json?address=' +
        $('#place2').val() + '&sensor=true',
      function(data) {
        locations = data.results;
        $.each(locations, function(key, location) {

          // Extract the country from the formatted address
          var address = location.formatted_address.split(/,/g);
          var country = $.trim(address[address.length - 1]);

          // Only include locations that are in Norway
          if (location.formatted_address != 'undefined'
              && (country == 'Norge' || country == 'Norway')) {
            $('#create-event-location-selection').append(
                '<option id="location-' +key +
                  '" value="' + location.formatted_address + '">' +
                      location.formatted_address +
                '</option>');
          }
        });
      });
}

$("#admin-create-event-page").live('pageinit', function() {

  var restClient = new RestHandler(); //REST CLIENT
  var privacyDisplay = 
    '<label for="select-privacy" class="select">Velg:</label>'+
    '<select name="select-privacy" id="select-privacy-choice2">'+
    '<option value="public">Public</option>';
    for (var i = 0; i < student.groupLeaders.length; i++){
      privacyDisplay +=
        '<option value="' + student.groupLeaders[i].groupNumber+'">' +
          'For gruppe: ' + student.groupLeaders[i].groupNumber+
        '</option>';
    }
     privacyDisplay += '</select>';
  $('#privacy2').html(privacyDisplay);
  $('#select-privacy-choice2').selectmenu();

  // Handle location searching
  $('#create-event-place-search').click(function() {
    $('#create-event-location-selection').empty();
    searchOnLocation();
  });
  $('#create-event-location-selection').selectmenu();

  $('#create-event-location-selection').change(function() {

    // Extract the current index of the location
    currentLocationIndex = /location-(\d+)/.exec(
        $('#create-event-location-selection option:selected').attr('id'))[1];
  });

  $('#createeventsubmit').click(function() {
    
    restClient.create(
        'events/',
        getDataFromCreateForm(),
        function(data, textStatus, jqXHR) {
          $.mobile.hidePageLoadingMsg();
          if (jqXHR.status == 201) {
            showMsg('Event opprettet', function() {
              history.back();
            });
          } else {
            showErr('Noe gikk galt', null);
          }
        }
    ); 

    $('form').die('submit');
    return false;
  });
});

function getDataFromCreateForm() {
  var json = '{' +
    '"name": "'+htmlEncode($('#name2').val()) + '"';
  if ($('#description2').val() != '') {
    json += ', "description": "'+ htmlEncode($('#description2').val())+ '"';
  }
  if($('#startTime2').val() != ''){
    json += ', "startTime": "'+$('#startTime2').val().replace(' ', '-')+'"';
  }
  if($('#endTime2').val() != ''){
    json += ', "endTime": "'+$('#endTime2').val().replace(' ', '-')+'"';
  }
  json += ', "tags": "fadderuka12';
  var priv = $('#select-privacy-choice2').val();
  if(priv == "public"){
    json += ', public"';
  }else{
    json += ', gruppe' + priv +'"';      
  }

  var currentLocation = locations[currentLocationIndex];
  json += ', "location": {'+
    '"place": "'    + currentLocation.formatted_address + '",' +
    '"latitude": '  + currentLocation.geometry.location.lat + ',' +
    '"longitude": ' + currentLocation.geometry.location.lng +
    '}';

  json += '}';
  return json;
}