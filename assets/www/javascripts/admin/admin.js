$("#admin-page").live('pageshow', function() {
	
	var restClient = new RestHandler(); //REST CLIENT
	
	showLeaderGroups();
	loadEvents();
	loadLeaderGroupEvents();
	
	$('#refreshallbtn').click(function() {
		$('#loadinforallevents').css('display', 'block');
		$('#alleventlist').css('display', 'none');
		$('#allGroupsEventsList').css('display', 'none');
		$('#loadigForAllGroupsEventsList').css('display', 'block');
		
		showLeaderGroups();
		loadEvents();
		loadLeaderGroupEvents();
	});


function showEvents(){
	$('#alleventlist').css('display', 'block');
	$('#loadinforallevents').css('display', 'none');
	
}
function showGroupsEvents(){
	$('#allGroupsEventsList').css('display', 'block');
	$('#loadigForAllGroupsEventsList').css('display', 'none');
	
}


function showLeaderGroups(){
	theHTML = '';
	for (var i = 0; i < student.groupLeaders.length; i++){
		theHTML += '<li class="li-first" id="'+student.groupLeaders[i].id+'"><a href="#"><h3>Gruppenr: '+student.groupLeaders[i].groupNumber+'</h3></a>'+
		'</li>';
	}
	 $('#leadergrouplist').html(theHTML);
	 $('#leadergrouplist').listview('refresh');
}

function getDatesBetweenUrlParam(isPrivate){
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
	var today = dd+'/'+mm+'/'+yyyy + '-00:00';
	var inFiveDays = (dd + 4) + '/'+mm+'/'+yyyy + '-23:59';
	//var param = '?startTime='+today; //+ '&endTime=' + inFiveDays;
	var param = '';
	if (isPrivate){	
		var temp = '';
		for (var i = 0; i < student.groupLeaders.length; i++){
			temp+= 'gruppe' + student.groupLeaders[i].groupNumber;
			if(i != student.groupLeaders.length - 1){
				temp +=',';
			}
		}
		param = '?tag=fadderuka12,'+temp+'&startTime='+today + '&endTime=' + inFiveDays;
	}else{
		param = '?tag=fadderuka12,public&startTime='+today + '&endTime=' + inFiveDays;
		
	}
	return param;
}

$('#leadergrouplist li').live('click', function(event) {
    sessionStorage.setItem('fadder_group_id', $(this).attr('id'));
    $.mobile.changePage('#fadderchildren-pagen');
  });


function loadEvents(){
	restClient.find('events/tags-and-dates' + getDatesBetweenUrlParam(false),  function(data, status, e) {  
		var theHTML = '';
		if(status == 'success') {
			if(data.length > 0){
				for (var i = 0; i < data.length; i++){
   					theHTML += '<li class="li-first" id="'+data[i].id+'"><a href="#admin-edit-event-page?edit-event-id='+data[i].id+'"><h3>'+data[i].id + ' - '+data[i].name+'</h3></a>'+
   					'</li>';
   			  	}
   		  	}else{
   		  		theHTML = '<li class="li-first"><h3>Ingen events de neste fem dagene...</h3></li>';
   		  	}
		}else{
			theHTML = '<li class="li-first"><h3>Greide ikke hente events</h3></li>';
		}
		$('#alleventlist').html(theHTML);
  	  	$('#alleventlist').listview('refresh');
  	  	showEvents();
	}, function(req, status, ex) { //ERROR!
		 var theHTML = '<li class="li-first"><h3>Ikke kontakt med server...</h3></li>';
   	  	$('#alleventlist').html(theHTML);
   	  	$('#alleventlist').listview('refresh');
   	  	showEvents();
	}); 
}
function loadLeaderGroupEvents(){
	restClient.find('events/tags-and-dates' + getDatesBetweenUrlParam(true),  function(data, status, e) {  
		var theHTML = '';
		if(status == 'success') {
			if(data.length > 0){
				for (var i = 0; i < data.length; i++){
					theHTML += '<li class="li-first" id="'+data[i].id+'"><a href="#admin-edit-event-page?edit-event-id='+data[i].id+'"><h3>'+data[i].id + ' - '+data[i].name+'</h3></a>'+
					'</li>';
				}
			}else{
				theHTML = '<li class="li-first"><h3>Ingen events de neste fem dagene...</h3></li>';
			}
		}else{
			theHTML = '<li class="li-first"><h3>Greide ikke hente events</h3></li>';
		}
		$('#allGroupsEventsList').html(theHTML);
		$('#allGroupsEventsList').listview('refresh');
		showGroupsEvents();
	}, function(req, status, ex) { //ERROR!
		var theHTML = '<li class="li-first"><h3>Ikke kontakt med server...</h3></li>';
		$('#allGroupsEventsList').html(theHTML);
		$('#allGroupsEventsList').listview('refresh');
		showGroupsEvents();
	}); 
}

});//end pageinit

