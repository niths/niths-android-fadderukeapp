// Listen for any attempts to call changePage().
$(document).bind("pagebeforechange", function(e, data) {

  if (typeof data.toPage === "string") {
    var term  = 'edit-event-id';
    var index = data.toPage.indexOf(term);
    if(index !=  -1){
      var split = data.toPage.substring(index).split("=");
      if(split.length == 2){
        var id = split[1];
        hideTheEvent2();
        loadEventToEdit(id);
      }
    }
  }
});

$(document).delegate('#opendialog', 'click', function() {
    $('<div>').simpledialog2({
      mode:         'button',
      headerText:   'Slett event',
      headerClose:  true,
      buttonPrompt: 'Er du sikker?',
      buttons : {
        'OK': {
          click:    function () { 
            $('#buttonoutput').text('OK');
            deleteAnEvent();
          }
        },
        'Cancel': {
          click:    function () { 
            $('#buttonoutput').text('Cancel');
          },
          icon:     "delete",
          theme:    "c"
        }
      }
    });
});

function deleteAnEvent(){
  var restClient = new RestHandler(); //REST CLIENT
  restClient.remove('events/' + $('#idE').val(),  function(data) {  
    showMsg('Sletting vellykket', function() {
      $.mobile.hidePageLoadingMsg();
      history.back();
    });
  }); 

  $('form').die('submit');
  return false;
}

$("#admin-edit-event-page").live('pageshow', function() {  
  $('#editeventsubmit').click(function() {
    var restClient = new RestHandler(); //REST CLIENT
    restClient.update(
        'events/', getDataFromForm(),
        function(data, textStatus, jqXHR) {
          function onDismissed() {
            $.mobile.hidePageLoadingMsg();
          }

          if(textStatus == "success"){
            showMsg('Oppdatering vellykket', onDismissed);  
          } else {
            showErr('Oppdatering feilet', onDismissed);
          }
        }
    );

    $('form').die('submit');
    return false;
  });
});

function loadEventToEdit(id){
  var restClient = new RestHandler(); //REST CLIENT
  restClient.find('events/'+ id,
      function(data) {  
        showData(data);
        showTheEvent2();    
      },
      function(req, status, ex) {
        showErr(JSON.stringify(xhr), function() {
          $('#updateeventinfodiv').html('<h3>Ingen kontakt med server...</h3>');
          showTheEvent2();
        });
      }
  ); 
}

function showTheEvent2() {
  $('#updateeventinfodiv').css('display', 'block');
  $('#loadinforupdateventdiv').css('display', 'none');
}
function hideTheEvent2() {
  $('#updateeventinfodiv').css('display', 'none');
  $('#loadinforupdateventdiv').css('display', 'block');
}


function showData(event){
  $('#updateeventinfodiv input').val('');
  $('#idE').val(event.id);
  $('#name').val(event.name);
  $('#description').val(event.description);
  $('#startTime').val(event.startTime.replace('-', ' '));
  $('#endTime').val(event.endTime.replace('-', ' '));
//  $('#tags').val(event.tags);
  if(event.location != null){
    $('#place').val(event.location.place);
    $('#latitude').val(event.location.latitude);
    $('#longitude').val(event.location.longitude);    
  }
  var privacyDisplay = 
    '<label for="select-privacy" class="select">Velg:</label>'+
    '<select name="select-privacy" id="select-privacy-choice">'+
     '<option value="public">Public</option>';
    for (var i = 0; i < student.groupLeaders.length; i++){
      privacyDisplay += '<option value="'+student.groupLeaders[i].groupNumber+'">For gruppe: '+student.groupLeaders[i].groupNumber+'</option>';
    }
     privacyDisplay += '</select>';
  $('#privacy').html(privacyDisplay);
  $('#select-privacy-choice').selectmenu();
}

function getDataFromForm(){
  var json = '{'+
    '"id":'+ $('#idE').val() +','
    +'"name": "'+htmlEncode($('#name').val())+'",'+
    '"description": "'+ htmlEncode($('#description').val())+ '",'+
    '"startTime": "'+$('#startTime').val().replace(' ', '-')+'",'+
    '"endTime": "'+$('#endTime').val().replace(' ', '-')+'",'+
    '"tags": "fadderuka12';
    var priv = $('#select-privacy-choice').val();
    if(priv == "public"){
      json += ', public"';
    }else{
      json += ', gruppe' + priv +'"';      
    }
  if($('#place').val() != ''){
    json += 
      ', "location": {'+
      '"place": "' + htmlEncode($('#place').val()) + '",'+
      '"latitude": '+htmlEncode($('#latitude').val())+','+
      '"longitude": ' + htmlEncode($('#longitude').val()) +
      '}';
  }
  return json + '}';
}