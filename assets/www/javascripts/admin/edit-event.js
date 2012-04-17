// Listen for any attempts to call changePage().
$(document).bind( "pagebeforechange", function( e, data ) {
	
	if ( typeof data.toPage === "string" ) {
		var term = 'edit-event-id';
		var index = data.toPage.indexOf(term);
		if(index !=  -1){
			var split = data.toPage.substring(index).split("=");
			if(split.length == 2){
				var id = split[1];
				//alert(id);
				hideTheEvent2();
				loadEventToEdit(id);
			}
		}
	}
});

$(document).delegate('#opendialog', 'click', function() {
	  $('<div>').simpledialog2({
	    mode: 'button',
	    headerText: 'Slett event',
	    headerClose: true,
	    buttonPrompt: 'Er du sikker?',
	    buttons : {
	      'OK': {
	        click: function () { 
	          $('#buttonoutput').text('OK');
	          deleteAnEvent();
	        }
	      },
	      'Cancel': {
	        click: function () { 
	          $('#buttonoutput').text('Cancel');
	        },
	        icon: "delete",
	        theme: "c"
	      }
	    }
	  });
	});

function deleteAnEvent(){
	$.mobile.showPageLoadingMsg();
	$.ajax({
	      url: address + 'events/' + $('#id').val(),
	      type: 'DELETE',
	      cache: false,
	      timeout: 3000,
	      beforeSend: function(xhr) {
	    	  	xhr.setRequestHeader("Application-key", applicationKey);
		        xhr.setRequestHeader("Application-token", applicationToken);
		        xhr.setRequestHeader("Developer-key", developerKey);
		        xhr.setRequestHeader("Developer-token", developerToken);
		        xhr.setRequestHeader("Session-token", sessionToken);
	      },
	      success: function(data, status) {
	    	  alert('Oppdatering vellykket');
	    	  $.mobile.hidePageLoadingMsg();
	    	  history.back();
	      },
	      error: function(xhr) {
	        alert(JSON.stringify(xhr)); 
	        $.mobile.hidePageLoadingMsg();
	      }
	    });
	$('form').die('submit');
  return false;
}

$("#admin-edit-event-page").live('pageshow', function() {	

	
//	$('#deleteeventsubmit').click(function() {
//			
//	});
	
	$('#editeventsubmit').click(function() {
		$.mobile.showPageLoadingMsg();
		  var response;
		  response = $.ajax({
		      url: address + 'events',
		      type: 'PUT',
		      cache: false,
		      contentType: 'application/json',
		      beforeSend: function(xhr) {
		        xhr.setRequestHeader("Application-key", applicationKey);
		        xhr.setRequestHeader("Application-token", applicationToken);
		        xhr.setRequestHeader("Developer-key", developerKey);
		        xhr.setRequestHeader("Developer-token", developerToken);
		        xhr.setRequestHeader("Session-token", sessionToken);
		      },
		      data:  getDataFromForm(),
		      success : function(data){
		    	  if(response.status == 200){
		    		  alert("Oppdatering vellykket");
		    	  }else{
		    		  alert("Beklager, oppdatering feilet. Prøv igjen");
		    	  } 
		    	  $.mobile.hidePageLoadingMsg();
		    	  
		      },
		      error: function(xhr) {
		    	  alert("Beklager, en feil oppsto: " + response.getResponseHeader('error'));
		    	  $.mobile.hidePageLoadingMsg();
		      }
		    });

		    $('form').die('submit');
		    return false;
		  });
});

function loadEventToEdit(id){
	
$.ajax({
    url: address + 'events/'+ id,
    type: 'GET',
    timeout: 3000,
    cache: false,
    success: function(data) {
    	showData(data);
    	showTheEvent2();
    },
    error: function(xhr) {
    	alert(JSON.stringify(xhr));
    	$('#updateeventinfodiv').html('<h3>Ingen kontakt med server...</h3>');
    	showTheEvent2();
    }
  }); 

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
	$('#id').val(event.id);
	$('#name').val(event.name);
	$('#description').val(event.description);
	$('#startTime').val(event.startTime);
	$('#endTime').val(event.endTime);
	$('#tags').val(event.tags);
	if(event.location != null){
		$('#place').val(event.location.place);
		$('#latitude').val(event.location.latitude);
		$('#longitude').val(event.location.longitude);		
	}

}

function getDataFromForm(){
	var json = '{'+
		'"id":'+ $('#id').val() +','
		+'"name": "'+$('#name').val()+'",'+
		'"description": "'+ $('#description').val()+ '",'+
		'"startTime": "'+$('#startTime').val()+'",'+
		'"endTime": "'+$('#endTime').val()+'",'+
		'"tags": "'+$('#tags').val()+'",'+
		'"location": {'+
		'"place": "' + $('#place').val() + '",'+
		'"latitude": '+$('#latitude').val()+','+
		'"longitude": ' + $('#longitude').val() +
		'}}';
	return json;
}
