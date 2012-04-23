$("#program-page").live('pageinit', function() {
	var restClient = new RestHandler(); //REST CLIENT
	loadAllEvents();
	
	//TODO: FIX SERVICESIDE
	$("#privacyselectdiv input[type='radio']").bind( "change", function(event, ui) {
		  var value = $("#privacyselectdiv input[type='radio']:checked").val();
		  if(value =="private"){
			  if(student.fadderGroup != null){
				  $('#loadingmsg2').css('display', 'block');
					$('#programlist').css('visibility', 'hidden');
					loadAllEvents(true);
			  }else{
				  alert('Du har ingen gruppe');
				  $("input[type='radio']:first").attr("checked",true).checkboxradio("refresh");
			  }
			  //IF I HAVE A GROUP:
			 //LOAD ALL EVENTS FOR MY GROUP  
		  }else{ //PUBLIC
			  //LOAD ALL PUBLIC EVENTS
			  $('#loadingmsg2').css('display', 'block');
				$('#programlist').css('visibility', 'hidden');
				loadAllEvents(false);
		  }
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
	
	 
	

	function getUrlParam(isPrivate){
		
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
		var inFiveDays = (dd + 5) + '/'+mm+'/'+yyyy + '-23:59';
//		var param = '?startTime='+today + '&endTime=' + inFiveDays;
		var param = '';
		if(isPrivate){
			param = '?tag=fadderuka12,gruppe'+student.fadderGroup.groupNumber+'&startTime='+today + '&endTime=' + inFiveDays;
			
		}else{
			param = '?tag=fadderuka12,public&startTime='+today + '&endTime=' + inFiveDays;
			
		}
		
		return param;
		//events/tags-and-dates?tag=utvalg&startTime=10/04/2012-11:05
		//events/dates?startTime=09/04/2010-10:55&endTime=09/04/2010-10:55
	}

	function loadAllEvents(isPrivate){
		restClient.find('events/tags-and-dates' + getUrlParam(isPrivate),  function(data, status, e) {  
//			restClient.find('events/dates' + getUrlParam(),  function(data, status, e) {  
			if(status == 'success'){
	    		  if(data.length > 0){
	    			  handleData(data);		    			  
	    		  }else{
	    			  var theHTML = '<li class="li-first" id="eventloader"><h3>Ingen events funnet for de neste fem dagene...</h3></li>';
			    	  $('#programlist').html(theHTML);
			    	  $('#loadingmsg2').css('display', 'none');
			    	  $('#programlist').css('visibility', 'visible');
	    		  }
	    	  }
		}, function(req, status, ex) {
				var theHTML = '<h3>Ikke kontakt med server...</h3>';
				$('#programlist').html(theHTML);
				$('#loadingmsg2').css('display', 'none');
				$('#programlist').css('visibility', 'visible');
		}); 
	}
	
	function getHeader(date){
		return '<h1 class="withborder">'+getDayName(date.getDay())+' '+date.getDate()+'/'+(date.getMonth()+1)+'</h1>';
	}

	function getListElement(data){
		return '<li class="li-first" id="eventloader">'+
				'<a href="#event-page?event-id='+data.id+'">'+
				'<h3>'+data.name+'</h3>'+
				'<p><strong>Beskrivelse: </strong>'+ data.description+'</p>'+
				'<p><strong>Start: </strong>'+data.startTime+'</p>'+
				'</a></li>';
	}
	
	function getNewList(name){
		return '<ul id="'+name+'" data-role="listview" class="ui-listview" data-inset="true">';
	}
	
	function handleData(data){
		var currentEventDate = new Date();
		var tempEventDate = new Date();
		var html = '';
		var current = 1;
		for(var i=0;i<data.length;i++){
			//First event, set currentEventDate
			if(i == 0){
				currentEventDate.setFullYear(data[i].startTime.substring(6,10), (data[i].startTime.substring(3,5)-1), data[i].startTime.substring(0,2));
				html = getHeader(currentEventDate) + getNewList('list' + current);
			}
		    //Set the temp date to the object were iterating over 
			tempEventDate.setFullYear(data[i].startTime.substring(6,10), (data[i].startTime.substring(3,5)), data[i].startTime.substring(0,2));
			//If temp date != currentDate, we print a new header and start a new list
			if(currentEventDate.getDate() != tempEventDate.getDate()){
				html += '</ul>';
				current++;
				currentEventDate.setFullYear(tempEventDate.getFullYear(), (tempEventDate.getMonth()-1), tempEventDate.getDate());

				html += getHeader(currentEventDate) + getNewList('list' + current);
			}
			html += getListElement(data[i]);
		}
		
		html += '</ul>';
		$('#programlist').html(html);
		for (var i = 1; i <= current; i++){
			$('#list'+i).listview();
		}
		
		$('#loadingmsg2').css('display', 'none');
	    $('#programlist').css('visibility', 'visible');
	}
	
});
