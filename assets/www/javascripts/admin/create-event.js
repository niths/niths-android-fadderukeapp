
$("#admin-create-event-page").live('pageshow', function() {
	$('#createeventdiv input').val('');
});

$("#admin-create-event-page").live('pageinit', function() {	
	var restClient = new RestHandler(); //REST CLIENT
	
	$('#createeventsubmit').click(function() {
		
		restClient.create('events/', getDataFromCreateForm(), function(data, textStatus, jqXHR) {
			$.mobile.hidePageLoadingMsg();
			if(jqXHR.status == 201){
				alert('Event opprettet');				
				history.back();
			}else{
				alert('Noe gikk galt');
			}
		}); 
		
		
//		$.mobile.showPageLoadingMsg();
//		  var response;
//		  response = $.ajax({
//		      url: address + 'events',
//		      type: 'POST',
//		      cache: false,
//		      contentType: 'application/json',
//		      beforeSend: function(xhr) {
//		        xhr.setRequestHeader("Application-key", applicationKey);
//		        xhr.setRequestHeader("Application-token", applicationToken);
//		        xhr.setRequestHeader("Developer-key", developerKey);
//		        xhr.setRequestHeader("Developer-token", developerToken);
//		        xhr.setRequestHeader("Session-token", sessionToken);
//		      },
//		      data:  getDataFromCreateForm(),
//		      success : function(data){
//		    	  if(response.status == 201){
//		    		  alert("Event lagt til");
//		    	  }else{
//		    		  alert("Beklager, innlegging av event feilet...");
//		    	  } 
//		    	  $.mobile.hidePageLoadingMsg();
//		    	  
//		      },
//		      error: function(xhr) {
//		    	  $.mobile.hidePageLoadingMsg();
//		    	  if(response.status == 401){
//		    		  alert('Beklager, du har vært inaktiv for lenge, logg inn igjen');
//		    		  sessionToken = '';
//		    		  $.mobile.changePage('index.html');
//		    	  }else{
//		    		  alert("Beklager, en feil oppsto: " + response.getResponseHeader('error'));		    		  
//		    	  }
////		    	  alert("Beklager, en feil oppsto: " + response.getResponseHeader('error'));
//		      }
//		    });

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
