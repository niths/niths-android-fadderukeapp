$("#dashboard-page").live('pageinit', function() {
	//TODO: REMOVE ON iOS AND WP7 --> Android doesnt handle transitions well
	$.mobile.defaultPageTransition = 'none';
	$.mobile.defaultDialogTransition = 'none';
	/////////////////////////////////
	
	var numTweets = 3; //Number of tweets currently showing
	init();
					
	function init(){
		loadTweets(); 
		loadEvents();
	}
					
	$('#resfresheventsbtn').click(function() {
		showEventsLoading();
		loadEvents();
	});

	$('#refreshtweetbtn').click(function(data) {
		showTweetLoading();
		loadTweets();
	});
	
	$('#expandtweetbtn').click(function() {
		if (numTweets == 3) {
			numTweets = 10;
		} else {
			numTweets = 3;
		}
		showTweetLoading();
		loadTweets();
	});
					 

	function showEventsLoading(){
		var theHTML = '<li class="li-first" id="eventloader"><h3>Laster events...</h3></li>';
		$('#eventlist').html(theHTML);
		$('#eventlist').listview('refresh');	
	}
				        
	function showTweetLoading(){
		var html = '<li class="li-first" id="loader"><h3>Laster tweets</h3></li></ul>';
		$('#tweetlist').html(html);
		$('#tweetlist').listview('refresh');
	}
	
	/**
	 * Load the tweets
	 */
	//TODO: Change url to match all with a certain hashtag, ex #fadderuka
	function loadTweets(){
		var response;
		response = $.ajax({
			url : 'http://search.twitter.com/search.json?q=from%3Anithutdanning&rpp=' + numTweets,
//			url : 'http://search.twitter.com/search.json?q=to%3Anithutdanning&rpp=' + numTweets,
			type : 'get',
			cache : false,
			contentType : 'application/json',
			timeout : 2000,
			success : function(data) {
				printTweets(data);
			},
			error : function(xhr, status) {
				printErrorTweet();
			}
		});
	}
	/**
	 * Helper function that returns the date today and the date in five days
	 * Used to limit the events from the API
	 */
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
		var param = '?startTime='+today + '&endTime=' + inFiveDays;
		
		return param;
	}
	
	/**
	 * Loads all events the next five days
	 */
	function loadEvents(){
		$.ajax({
			url: address + 'events/dates' + getDatesBetweenUrlParam(),
			type: 'get',
			cache: false,
			timeout: 3000,
			success: function(data) {
				var theHTML = '';
				var num = 0;
				if(data.length < 1){
					theHTML = '<li class="li-first" id="eventloader"><h3 style="white-space:normal">Ingen de neste 5 dagene...</h3></li>';
					$('#eventlist').html(theHTML);
					$('#eventlist').listview('refresh');
				}else{
					for(var i=0;i<data.length && num < 2;i++){
						num++;
						theHTML += ['<li class="li-first"><a href="#event-page?event-id='+data[i].id+'">',
							        		            '<h3>'+data[i].name+'</h3>',
							        		            '<p><strong>Beskrivelse: </strong>'+data[i].description+'</p>',
							        		            '<p><strong>Start: </strong>'+data[i].startTime+'</p>',
							        		            '</a></li>'].join('');
							        		
					}
					$('#eventlist').html(theHTML);
					$('#eventlist').listview('refresh');
				}
			},
			error: function(xhr) {
				var theHTML = '<li class="li-first" id="eventloader"><h3>Ikke kontakt med server...</h3></li>';
				$('#eventlist').html(theHTML);
				$('#eventlist').listview('refresh');
			}
		});
	}

	/**
	 * Prints a list of tweets
	 */
	function printTweets(data){
		var theResults = data.results;
		var theHTML = '';
		for(var i=0;i<theResults.length;i++){
			theHTML += ['<li class="li-first">',
				 '<img src="http://api.twitter.com/1/users/profile_image/'+ theResults[i].from_user +'?size=bigger" />',
				   '<h2>'+theResults[i].from_user+'</h2>',
				    '<p style="white-space:normal">'+theResults[i].text+'</p>',
				    '<p class="ui-li-aside"><strong>'+theResults[i].created_at.substring(17,22)+'</strong></p>',
				    '</li>'].join('');

		}
		$('#tweetlist').html(theHTML);
		$('#tweetlist').listview('refresh');
				        
		if(numTweets == 3){
			$('#expandtweetbtn').attr('data-icon','plus');
			$('#expandtweetbtn').children().children().next().removeClass('ui-icon-minus').addClass('ui-icon-plus');		        	
		}else{
			$('#expandtweetbtn').attr('data-icon','minus');
			$('#expandtweetbtn').children().children().next().removeClass('ui-icon-plus').addClass('ui-icon-minus');				        	
				        	
		}
	}
					
	
	function printErrorTweet(){
		var html = '<li class="li-first" id="loader"><h3>Ikke kontakt med twitter</h3></li></ul>';
		$('#tweetlist').html(html);
		$('#tweetlist').listview('refresh');
	}
});