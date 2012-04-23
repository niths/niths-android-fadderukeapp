
$("#admin-create-event-page").live('pageshow', function() {
	$('#name2').val('');
	$('#description2').val('');
	var dateToday = getDateTodayAsString();
	$('#startTime2').val(dateToday);
	$('#endTime2').val(dateToday);
	$('#place2').val('NITH');
	$('#latitude2').val('59.908671');
	$('#longitude2').val('10.768166');
	
});

function getDateTodayAsString(){
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
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
