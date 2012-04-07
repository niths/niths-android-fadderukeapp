

$(document).ready(function() {

					//alert("startS");
					var numTweets = 3;
					init();
					
					function init(){
						loadTweets();
						loadEvents();
//						printTweetHeader();
					}
					
					 $('#resfresheventsbtn').click(function() {
						 showEventsLoading();
						 loadEvents();
					 });
					 
					 $('#eventlist').click(function() {
						 alert('eventlist');
					 });

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
							var theHTML = '<li data-role="list-divider" id ="eventdivider" data-theme="b">Neste events</li>'+
							'<li class="li-first" id="eventloader">Laster events...</li>';
							$('#eventlist').html(theHTML);
					        $('#eventlist').listview('refresh');
							
						}
				        
					 
					 /**
					  * Shows a loading message
					  */
					function showTweetLoading(){
						var html = '<li data-role="list-divider" id ="tweetdivider" data-theme="b">Siste tweets</li>'
		            		+'<li class="li-first" id="loader"><h3>Laster tweets</h3></li></ul>';
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
							url : 'http://search.twitter.com/search.json?q=to%3Anithutdanning&rpp=' + numTweets,
							type : 'get',
							cache : false,
							contentType : 'application/json',
							timeout : 2000,
							success : function(data) {
								printTweets(data);
							},
							error : function(xhr, status) {
//								printTweets2();
								printErrorTweet();
							}
						});
					}
					/**
					 * Loader og skriver ut de tre f�rste events
					 */
					function loadEvents(){
						 $.ajax({
						      url: address + 'events/paginated/0/3',
						      type: 'get',
						      cache: false,
						      timeout: 2000,
						      success: function(data) {
//						    	  var theResults = data.results;
							        var theHTML = '';
							        for(var i=0;i<data.length;i++){	
							        	theHTML += ['<li class="li-first"><a href="">',
							      		            '<h3>'+data[i].name+'</h3>',
							      		            '<p><strong>Beskrivelse: </strong>'+data[i].description+'</p>',
							      		            '<p><strong>Start: </strong>'+data[i].startTime+'</p>',
							      		            '</a></li>'].join('');

							        }
							        document.getElementById('eventloader').outerHTML = theHTML;
							        $('#eventlist').listview('refresh');
						      },
						      error: function(xhr) {
//						    	  var theHTML = '<li class="li-first"><h3>Ikke kontakt med server</h3></li>';
//									document.getElementById('eventloader').outerHTML = theHTML;
//							        $('#eventlist').listview('refresh');
							        var theHTML = '<li data-role="list-divider" id ="eventdivider" data-theme="b">Neste events</li>'+
									'<li class="li-first" id="eventloader">Ikke kontakt med server...</li>';
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
				        document.getElementById('loader').outerHTML = theHTML;
				        $('#tweetlist').listview('refresh');
				        if(numTweets == 3){
				        	$("#expandtweetbtn .ui-btn-text").text("Flere");				        	
				        }else{
				        	$("#expandtweetbtn .ui-btn-text").text("F�rre");				        	
				        	
				        }
					}
					
					/**
					 * Skriver ut feilmelding og at twitter ikke kunne n�s
					 */
					function printErrorTweet(){
//						var theHTML = '<li class="li-first"><a href=""><h3>Ikke kontakt med twitter</h3></a></li>';
//						document.getElementById('loader').outerHTML = theHTML;
//						var theHTML = '<h3>Ikke kontakt med twitter</h3>';
//						$('#loader').html(theHTML);
//					     $('#tweetlist').listview('refresh');
						var html = '<li data-role="list-divider" id ="tweetdivider" data-theme="b">Siste tweets</li>'
		            		+'<li class="li-first" id="loader"><h3>Ikke kontakt med twitter</h3></li></ul>';
					     $('#tweetlist').html(html);
				        $('#tweetlist').listview('refresh');
					}
				});