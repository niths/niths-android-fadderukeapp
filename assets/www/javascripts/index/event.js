// Listen for any attempts to call changePage().
$(document).bind( "pagebeforechange", function( e, data ) {
	if ( typeof data.toPage === "string" ) {
		var term = 'event-id';
		var index = data.toPage.indexOf(term);
		if(index !=  -1){
			var split = data.toPage.substring(index).split("=");
			if(split.length == 2){
				var id = split[1];
				loadEvent(id);
			}
		}
	}
});

/**
 * Loads an event and shows info to user
 * 
 * @param eventId id of the event
 */
function loadEvent(eventId){
	var restClient = new RestHandler(); //REST CLIENT
	restClient.find('events/' + eventId,  function(data) {
		$('#eventname').html(data.name);
		$('#eventdesc').html(data.description);
  	  	$('#eventtime').html('<strong>' + data.startTime.substring(0,5) + ' ' + data.startTime.substring(11,16)+' - ' + data.endTime.substring(11,16) +'</strong>');
  	  	if (data.location != null){
  		  	var url = 'http://maps.googleapis.com/maps/api/staticmap?center='+data.location.latitude+','+data.location.longitude+'&maptype=roadmap&markers=color:blue%7Clabel:X%7C'+data.location.latitude+','+data.location.longitude+'&amp;zoom=15&amp;size='+($(window).width()-30)+'x180&amp;sensor=false';
  	  		$('#map').html('<img alt="" src="' + url + '"/>');
  	  	}else{
  	  		$('#map').html("Kan ikke vise kart, plass er ikke registrert");
  	  	}
  	  	$('#loadingmsg').hide();
  	  	$('#eventinfo').css('visibility', 'visible');
	}, function(xhr){
		$('#eventinfo').html('Fikk ikke kontakt med serveren');
  	  	$('#loadingmsg').hide();
	    $('#eventinfo').css('visibility', 'visible');
	});

}
