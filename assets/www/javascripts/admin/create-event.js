
$("#admin-create-event-page").live('pageinit', function() {	
	
	$('#createeventsubmit').click(function() {
		$.mobile.showPageLoadingMsg();
		  var response;
		  response = $.ajax({
		      url: address + 'events',
		      type: 'POST',
		      cache: false,
		      contentType: 'application/json',
		      beforeSend: function(xhr) {
		        xhr.setRequestHeader("Application-key", applicationKey);
		        xhr.setRequestHeader("Application-token", applicationToken);
		        xhr.setRequestHeader("Developer-key", developerKey);
		        xhr.setRequestHeader("Developer-token", developerToken);
		        xhr.setRequestHeader("Session-token", sessionToken);
		      },
		      data:  getDataFromCreateForm(),
		      success : function(data){
		    	  if(response.status == 201){
		    		  alert("Event lagt til");
		    	  }else{
		    		  alert("Beklager, innlegging av event feilet...");
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

function getDataFromCreateForm(){
	var json = '{'
		+'"name": "'+$('#name2').val()+'"';
	if ($('#description2').val() != ''){
		json += ', "description": "'+ $('#description2').val()+ '"';
	}
	if($('#startTime2').val() != ''){
		json += ', "startTime": "'+$('#startTime2').val()+'"';
	}
	if($('#endTime2').val() != ''){
		json += ', "endTime": "'+$('#endTime2').val()+'"';
	}
	if($('#tags2').val() != ''){
		json += ', "tags": "'+$('#tags2').val()+'"';
	}
	if($('#place2').val() != '' && $('#latitude2').val() != '' && $('#longitude2').val() != ''){
		json += ', "location": {'+
		'"place": "' + $('#place2').val() + '",'+
		'"latitude": '+$('#latitude2').val()+','+
		'"longitude": ' + $('#longitude2').val() +
		'}';
	}
	json += '}';
	return json;
}
