$("#admin-page").live('pageshow', function() {
	loadEvents();
	$('#refreshallbtn').click(function() {
		$('#loadinforallevents').css('display', 'block');
		$('#alleventlist').css('display', 'none');
		
		loadEvents();
	});
});

function showEvents(){
	$('#alleventlist').css('display', 'block');
	$('#loadinforallevents').css('display', 'none');
	
}



function getDatesBetweenUrlParam(){
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
	var param = '?startTime='+today; //+ '&endTime=' + inFiveDays;
	return param;
}

/**
 * REMEMBER TO CHANGE LINK!
 * address + 'events/dates' + getDatesBetweenUrlParam(),
 */
function loadEvents(){
	var response;
	response = $.ajax({
	      url: address + 'events/dates' + getDatesBetweenUrlParam(),
	      type: 'get',
	      cache: false,
	      timeout: 3000,
	      success: function(data) {
	    	  if(response.status == 200){
	    		  var theHTML = '';
	    		  if(data.length > 0){
	    			  for (var i = 0; i < data.length; i++){
	    					theHTML += '<li class="li-first" id="'+data[i].id+'"><a href="#admin-edit-event-page?edit-event-id='+data[i].id+'"><h3>'+data[i].id + ' - '+data[i].name+'</h3></a>'+
	    					'</li>';
	    			  }
	    		  }
	    	  }else{
	    		  theHTML = '<li class="li-first"><h3>Ingen events funnet...</h3></li>';
	    	  }
	    	  $('#alleventlist').html(theHTML);
	    	  $('#alleventlist').listview('refresh');
	    	  showEvents();
	      },
	      error: function(xhr) {
	    	  var theHTML = '<li class="li-first"><h3>Ikke kontakt med server...</h3></li>';
	    	  $('#alleventlist').html(theHTML);
	    	  $('#alleventlist').listview('refresh');
	    	  showEvents();
	      }
	    });
}

