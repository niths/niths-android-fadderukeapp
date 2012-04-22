
$("#admin-create-event-page").live('pageshow', function() {
	$('#createeventdiv input').val('');
	
});

$("#admin-create-event-page").live('pageinit', function() {	
	var restClient = new RestHandler(); //REST CLIENT
	var privacyDisplay = 
		'<label for="select-privacy" class="select">Velg:</label>'+
		'<select name="select-privacy" id="select-privacy-choice2">'+
	   '<option value="public">Public</option>';
		for (var i = 0; i < student.groupLeaders.length; i++){
			privacyDisplay += '<option value="'+student.groupLeaders[i].groupNumber+'">For gruppe: '+student.groupLeaders[i].groupNumber+'</option>';
		}
	   privacyDisplay += '</select>';
	$('#privacy2').html(privacyDisplay);
	$('#select-privacy-choice2').selectmenu();
	
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
	json += ', "tags": "fadderuke12';
	var priv = $('#select-privacy-choice2').val();
	if(priv == "public"){
		json += ',public"';
	}else{
		json += ',gruppe' + priv +'"';			
	}
//	if($('#tags2').val() != ''){
//		json += ', "tags": "'+$('#tags2').val()+'"';
//	}
	
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
