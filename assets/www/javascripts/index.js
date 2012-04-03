$(document).ready(function() {
  var callbackURL      = 'http://niths.no/callback';
  var stateURLFragment = 'state=/profile';
  var isNITHMail       = false;
  
  $('#error').empty();
  toggleBtnText();

  $('#loginbtn').click(function() {
	  $.mobile.showPageLoadingMsg();
	  if(sessionToken == ""){
		  sessionToken = "";
		  studentId = 0;
		  // TODO Remove
		  //role = 'foo';
		  //$.mobile.changePage('main-menu.html');
		  signIn(); 		  
	  }else {
		  studentId = 0;
		  sessionToken = "";
	      window.plugins.childBrowser.showWebPage(
	      'https://accounts.google.com/Logout');
	  }
  });

  /**
   * Opens childbrowser with the Google login site
   */
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

  /**
   * This method runs every time Childbrowser changes page
   */
  function configureLocationChanged() {
    window.plugins.childBrowser.onLocationChange = function(url) {
      console.log(url);

      var receiveTokenURL = new RegExp('^' + callbackURL + '#' +
        stateURLFragment + '&access_token=..*$');

      // Triggered if the app is denied access
      if (url == callbackURL + '#error=access_denied' + stateURLFragment) {
        displayError('Kunne ikke få tilgang');
        window.plugins.childBrowser.close();
        sessionToken = "";
        studentId = "";
        role = "";
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
        role = "";
        $('#error').empty();
        toggleBtnText();
      } else{
    	  sessionToken = "";
          studentId = "";
          role = "";
          toggleBtnText();
    	$.mobile.hidePageLoadingMsg();
      }
    };
  };
  
  function toggleBtnText(){
	  if(sessionToken == ""){
			$("#loginbtn .ui-btn-text").text("Logg inn");
			$('#menubtn').css('visibility', 'hidden');
		}else{
			$("#loginbtn .ui-btn-text").text("Logg ut");
			if(sessionToken != "-1"){
				$('#menubtn').css('visibility', 'visible');				
			}
			
		}
  }

  function displayError(error) {
    $('#logo').after('<p id="error">' + error + '</p>');
  }
  
  /**
   * Check if a student logging has the role fadder leader
   * and sets the global variable role
   */
  
  function checkIfLeader(){
	  $.mobile.showPageLoadingMsg();
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
	  $.mobile.hidePageLoadingMsg();
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
    	  
    	  sessionToken = loginResponse.getResponseHeader('session-token');
    	  studentId = loginResponse.getResponseHeader('student-id');
    	  
    	  checkIfLeader();
    	  toggleBtnText();
    	  
    	  $.mobile.hidePageLoadingMsg();
    	  $.mobile.changePage('main-menu.html');
      },
      error: function(xhr, status) { // Signed in failed
    	sessionToken = "";
    	alert('Error: ' + loginResponse.status)
    	var resError = loginResponse.getResponseHeader('error');
    	sessionToken = "";
    	studentId = 0;
    	role = "";
    	$('#error').empty();
    	$.mobile.hidePageLoadingMsg();
    	if(resError == 'Email not valid'){
    		sessionToken = "-1";
    		displayError('Bruker har ikke @nith.no mail, logg ut og inn igjen');    		
    		
    	} else {
    		displayError('Vennligst logg inn med en NITH e-postadresse');    		
    		
    	}
//    	hideGui();
    	toggleBtnText();
      }
    });
  }

});