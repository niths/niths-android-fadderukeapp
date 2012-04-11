$("#program-page").live('pageinit', function() {
	//getDatesBetweenUrlParam();
	loadEvents();
});

	function getDayName(day){
		var weekday=new Array(7);
		weekday[0]="S&Oslash;ndag";
		weekday[1]="Mandag";
		weekday[2]="Tirsdag";
		weekday[3]="Onsdag";
		weekday[4]="Torsdag";
		weekday[5]="Fredag";
		weekday[6]="L&Oslash;rdag";
		return weekday[day];
	}
	

	function getDatesBetweenUrlParam(){
		
		var today = new Date();
		
		todaysDay = today.getDay();
		todaysDate = today.getDate();
		
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
		var param = '?startTime='+today + '&endTime=' + inFiveDays;
		return param;
		//events/dates?startTime=09/04/2010-10:55&endTime=09/04/2010-10:55
	}

	function loadEvents(){
		var response;
		response = $.ajax({
		      url: address + 'events/dates' + getDatesBetweenUrlParam(),
		      type: 'get',
		      cache: false,
		      timeout: 3000,
		      success: function(data) {
		    	  var list = '<ul id="programlist" data-role="listview" class="ui-listview" data-inset="true"></ul>';
		    	  var theHTML = '<li class="li-first" id="eventloader"><h3>Ingen events funnet for de neste fem dagene...</h3></li>';
		    	  if(response.status == 200){
		    		  handleData(data);
		    	  }
			      //alert('succ ' + response.status);
//			      $('#programlist').html(theHTML);
//			      $('#programlist').listview();
////			      $('#programlist').listview('refresh');
//		    	  $('#loadingmsg').hide();
//		    	  $('#programinfo').css('visibility', 'visible');
		      },
		      error: function(xhr) {
		    	  alert('err ' + response.status);
		    	  var theHTML = '<li class="li-first" id="eventloader"><h3>Ikke kontakt med server...</h3></li>';
//		    	  $('#programlist').html(theHTML);
//		    	  $('#programlist').listview('refresh');
//		    	  $('#loadingmsg').hide();
//		    	  $('#programinfo').css('visibility', 'visible');
		
		      }
		    });
	}
	
	function handleData(data){
		var firstEventDate = new Date();
		var eventDate = new Date();
		var html = '';
		var current = 1;
		for(var i=0;i<data.length;i++){
			if(i == 0){
				firstEventDate.setFullYear(data[i].startTime.substring(6,10), (data[i].startTime.substring(3,5)-1), data[i].startTime.substring(0,2));
				$('#programlist').html('<h1 class="withborder">'+getDayName(firstEventDate.getDay())+' '+firstEventDate.getDate()+'/'+(firstEventDate.getMonth()+1)+'</h1>');
				$('#programlist').append('<ul id="list'+current+'" data-role="listview" class="ui-listview" data-inset="true">');
//				html += '<h1 class="withborder">'+getDayName(firstEventDate.getDay())+' '+firstEventDate.getDate()+'/'+(firstEventDate.getMonth()+1)+'</h1>';
//				html += '<ul data-role="listview" class="ui-listview" data-inset="true">';
			}
		      
			eventDate.setFullYear(data[i].startTime.substring(6,10), (data[i].startTime.substring(3,5)), data[i].startTime.substring(0,2));
			if(firstEventDate.getDate() != eventDate.getDate()){
				$('#programlist').append('</ul>');
//				$('#list'+current).listview();
//				$('#list'+current).listview('refresh');
				current++;
				firstEventDate.setFullYear(eventDate.getFullYear(), (eventDate.getMonth()-1), eventDate.getDate());
				$('#programlist').append('<h1 class="withborder">'+getDayName(firstEventDate.getDay())+' '+firstEventDate.getDate()+'/'+(firstEventDate.getMonth()+1)+'</h1>');
				$('#programlist').append('<ul id="list'+current+'" data-role="listview" class="ui-listview" data-inset="true">');
			}
			
			$('#programlist').append('<a href="#event-page?event-id='+data[i].id+'"><li class="li-first" id="eventloader"><p>'+data[i].id + ' - '+ data[i].name+'</p></li></a>');
		}
		$('#programlist').append('</ul>');
//		$('#list'+current).listview();
//		$('#list'+current).listview('refresh');
		for (var i = 1; i <= current; i++){
			$('#list'+i).listview();
			$('#list'+i).listview('refresh');
		}
		$("#program-page").trigger("create");
	}
	
	function showAList(listName){
		var list = '<ul id="'+listName+'" data-role="listview" class="ui-listview" data-inset="true"></ul>';
  	  	var theHTML = '<li class="li-first" id="eventloader"><h3>Ingen events funnet for de neste fem dagene...</h3></li>';
	}
