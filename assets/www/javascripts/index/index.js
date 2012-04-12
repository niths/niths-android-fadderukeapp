$("#dashboard-page").live('pageinit', function() {

					var numTweets = 3;
					init();
					
					function init(){
						loadTweets(); 
						loadEvents();
					}
					
					 $('#resfresheventsbtn').click(function() {
						 showEventsLoading();
						 loadEvents();
					 });
					 
//					 $('#myGroupBtn').click(function(data) {
//						 if(groupNumber != 0){
//							 $.mobile.changePage('fadder-groups/fadder-group-info.html');							 
//						 }else{
//							 alert("Du har ingen faddergruppe");
//						 }
//					 });

					 $('#refreshtweetbtn').click(function(data) {
						 showTweetLoading();
						 loadTweets();
					 });
					 $('#expandtweetbtn').click(function() {
						 if(numTweets == 3){
							 numTweets = 10;
						 }else{
							 numTweets = 3;
						 }
						 showTweetLoading();
						 loadTweets();
					 });
					 
						/**
						 * Shows a loading message
						 */
						function showEventsLoading(){
							var theHTML = '<li class="li-first" id="eventloader"><h3>Laster events...</h3></li>';
							$('#eventlist').html(theHTML);
					        $('#eventlist').listview('refresh');
							
						}
				        
					 
					 /**
					  * Shows a loading message
					  */
					function showTweetLoading(){
						var html = '<li class="li-first" id="loader"><h3>Laster tweets</h3></li></ul>';
					     $('#tweetlist').html(html);
					     $('#tweetlist').listview('refresh');
					}
					/**
					 * Loader tweets, enten 3 eller 10 (numTweets)
					 * og kaller p� printTweets
					 */
					function loadTweets(){
						var response;
						response = $.ajax({
							url : 'http://search.twitter.com/search.json?q=from%3Anithutdanning&rpp=' + numTweets,
//							url : 'http://search.twitter.com/search.json?q=to%3Anithutdanning&rpp=' + numTweets,
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
					 * Loader og skriver ut de to f�rste events
					 */
					function loadEvents(){
						 $.ajax({
						      url: address + 'events/paginated/0/2',
						      type: 'get',
						      cache: false,
						      timeout: 2000,
						      success: function(data) {
//						    	  var theResults = data.results;
							        var theHTML = '';
							        for(var i=0;i<data.length;i++){	
							        	theHTML += ['<li class="li-first"><a href="#event-page?event-id='+data[i].id+'">',
							      		            '<h3>'+data[i].name+'</h3>',
							      		            '<p><strong>Beskrivelse: </strong>'+data[i].description+'</p>',
							      		            '<p><strong>Start: </strong>'+data[i].startTime+'</p>',
							      		            '</a></li>'].join('');

							        }
							        $('#eventlist').html(theHTML);
							        $('#eventlist').listview('refresh');
						      },
						      error: function(xhr) {
							        var theHTML = '<li class="li-first" id="eventloader"><h3>Ikke kontakt med server...</h3></li>';
									$('#eventlist').html(theHTML);
							        $('#eventlist').listview('refresh');
						      }
						    });
					}
					/**
					 * Skriver ut liste med tweets
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
					
					/**
					 * Skriver ut feilmelding og at twitter ikke kunne n�s
					 */
					function printErrorTweet(){
						var html = '<li class="li-first" id="loader"><h3>Ikke kontakt med twitter</h3></li></ul>';
					     $('#tweetlist').html(html);
				        $('#tweetlist').listview('refresh');
					}
				});