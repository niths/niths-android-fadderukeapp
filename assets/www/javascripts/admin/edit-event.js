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
				loadEventToEdit(id);
			}
		}
	}
});

function showEvent() {
	$('#updateeventinfodiv').css('display', 'block');
	$('#loadinforupdateventdiv').css('display', 'none');
}

$("#admin-edit-event-page").live('pageshow', function() {
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
    cache: false,
    success: function(data) {
    	showData(data);
    },
    error: function(xhr) {
      alert(JSON.stringify(xhr));
    }
  }); 

}

function showData(event){
	$('#id').val(event.id);
	$('#name').val(event.name);
	$('#description').val(event.description);
	$('#startTime').val(event.startTime);
	$('#endTime').val(event.endTime);
	$('#tags').val(event.tags);
	$('#place').val(event.location.place);
	$('#latitude').val(event.location.latitude);
	$('#longitude').val(event.location.longitude);
	showEvent();
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
