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
		}else{
			//e.preventDefault();
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
		        $('#eventdesc').html('<strong>Hva: </strong>' + data.description);
		        $('#starttime').html('<strong>Start: </strong>' + data.startTime);
		        $('#endtime').html('<strong>Slutt: </strong>' + data.endTime);
 
	      },
	      error: function(xhr) {
	    	  $('#eventinfo').html('Fikk ikke kontakt med serveren');
	      }
	    });
}