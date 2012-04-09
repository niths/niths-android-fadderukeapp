// Listen for any attempts to call changePage().
$(document).bind( "pagebeforechange", function( e, data ) {
	// We only want to handle changePage() calls where the caller is
	// asking us to load a page by URL.
	if ( typeof data.toPage === "string" ) {

		var term = 'event-id';
		var index = data.toPage.indexOf(term);
		if(index !=  -1){
			var split = data.toPage.substring(index).split("=");
			if(split.length == 2){
				var id = split[1];
				loadEvents(id);
			}
		}
		
	}
});

function loadEvents(eventId){
	var response;
	 response = $.ajax({
	      url: address + 'events/' + eventId,
	      type: 'get',
	      cache: false,
	      timeout: 2000,
	      success: function(data) {

		        $('#eventname').html(data.name);
		        $('#eventdesc').html(data.description);
		        $('#eventtime').html('<strong>' + data.startTime.substring(0,5) + ' ' + data.startTime.substring(11,16)+' - ' + data.endTime.substring(11,16) +'</strong>');
		        
		        var url = 'http://maps.googleapis.com/maps/api/staticmap?center='+data.location.latitude+','+data.location.longitude+'&maptype=roadmap&markers=color:blue%7Clabel:X%7C'+data.location.latitude+','+data.location.longitude+'&amp;zoom=6&amp;size='+($(window).width()-30)+'x150&amp;sensor=false';
		        $('#map').html('<img alt="" src="' + url + '"/>');
 
	      },
	      error: function(xhr) {
	    	  $('#eventinfo').html('Fikk ikke kontakt med serveren');
	      }
	    });
	 
}
