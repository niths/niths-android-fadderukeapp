$(document).ready(function() {
  var callbackURL      = 'http://niths.no/callback';
  var stateURLFragment = 'state=/profile';
  var isNITHMail       = false;
  
  $('#error').empty();
  if (sessionToken == ""){
	 hideGui();
  }else{
	showGui();
  }

  $('#login').click(function() {
	  $.mobile.showPageLoadingMsg();
    sessionToken = "";
    studentId = 0;
	  // TODO Remove
    //role = 'foo';
    //$.mobile.changePage('main-menu.html');
    signIn(); 
  });

  function signIn() {
    configureLocationChanged(); //https://voyager.nith.no/sso/signon.php?
    window.plugins.childBrowser.showWebPage(
      'https://accounts.google.com/o/oauth2/auth'
      + '?scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email'
      + '&' + stateURLFragment
      + '&redirect_uri=' + encodeURIComponent(callbackURL)
      + '&response_type=token'
      + '&client_id=1064171706637-f9efklqg3tbrmu7fctvk8khvc0dqmh5i.apps.googleusercontent.com',
      { showLocationBar: false});
  };

  function configureLocationChanged() {
    window.plugins.childBrowser.onLocationChange = function(url) {
      console.log(url);

      var receiveTokenURL = new RegExp('^' + callbackURL + '#' +
        stateURLFragment + '&access_token=..*$');

      // Triggered if the app is denied access
      if (url == callbackURL + '#error=access_denied' + stateURLFragment) {
        displayError('Kunne ikke få tilgang');
        window.plugins.childBrowser.close();

      // Triggered if a token is received
      } else if (receiveTokenURL.test(url)) {

          //$.mobile.showPageLoadingMsg();
          window.plugins.childBrowser.close();
          onLoggedIn(url.split('=').splice(2, 1)[0].replace('&token_type', ''));
      // Triggered when a user logs out
      } else if (url == 'https://accounts.google.com/Login') {
        window.plugins.childBrowser.close();
        sessionToken = "";
        studentId = "";
        $('#error').empty();
       hideGui();
        $.mobile.hidePageLoadingMsg();
      } else{
    	  $.mobile.hidePageLoadingMsg();
      }
    };
  };
  
  function hideGui(){
      $('#logout').css('visibility', 'hidden');
      $('#login').css('visibility', 'visible');
      $('#menubtn').css('visibility', 'hidden');
	//  $('#profilebtn').css('visibility', 'hidden');  
  }
  function showGui(){
	  $('#logout').css('visibility', 'visible');
	  $('#login').css('visibility', 'hidden');
	  $('#menubtn').css('visibility', 'visible');
	 // $('#profilebtn').css('visibility', 'visible');
  }

  function displayError(error) {
    $('#logo').after('<p id="error">' + error + '</p>');
  }
  
  /**
   * Check if a student logging has the role fadder leader
   * and sets the global variable role
   */
  
  function checkIfLeader(){
	  var response;
	  response = $.ajax({
			url : address + 'roles/isStudent/'+studentId+'/ROLE_FADDER_LEADER',
			type : 'get',
			cache : false,
			success : function() {
				alert(response.status + '--' +response.getResponseHeader('error'));
				if(response.status == 200){
					role = 'ROLE_FADDER_LEADER';
				}else if (response.status == 204){
					role = "";
				}
			},
			error : function(xhr) {
				alert(response.getResponseHeader('error'));
				
				alert(JSON
						.stringify(xhr));
			}
		});
  }

  function onLoggedIn(token) {
	  
    // TODO Remove before launch
    //alert(token);
    console.log(token);

    
    
    // Send the token to the server
    // We get the session token in the response header
    // If any error occurred, show error.
    var loginResponse;
    loginResponse = $.ajax({
      url: address + '/auth/login/',
      type: 'post',
      contentType:"application/json",
      data: '{"token":"'+token+'"}',
      success: function() { //Signed in!
    	 showGui();
    	  signedIn = true;
    	  sessionToken = loginResponse.getResponseHeader('session-token');
    	  studentId = loginResponse.getResponseHeader('student-id');
    	  //alert(studentId);
    	  //alert(sessionToken);
    	  checkIfLeader();
    	  $.mobile.hidePageLoadingMsg();
        $.mobile.changePage('main-menu.html');
      },
      error: function(xhr, status) { // Signed in failed
    	  sessionToken = "";
    	var resError = loginResponse.getResponseHeader('error');
    	sessionToken = "";
    	studentId = 0;
    	//alert(resError);
    	$('#error').empty();
    	$.mobile.hidePageLoadingMsg();
    	if(resError == 'Email not valid'){
    		displayError('Bruker har ikke @nith.no mail');    		
    		
    	} else {
    		displayError('Vennligst logg inn med en NITH e-postadresse');    		
    		
    	}
    	hideGui();
      }
    });
  }

  $('#logout').click(function(event) {
	  $.mobile.showPageLoadingMsg();
	  studentId = 0;
	  sessionToken = "";
      window.plugins.childBrowser.showWebPage(
      'https://accounts.google.com/Logout');
  });
});