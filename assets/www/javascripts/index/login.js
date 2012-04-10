$(document).ready(function() {
  var callbackURL      = 'http://niths.no/callback';
  var stateURLFragment = 'state=/profile';
  var isNITHMail       = false;
  
//  $('#error').empty();
  toggleBtnText();

  $('#loginbtn').click(function() {
	  if(sessionToken == ""){ //Not signed in
		  ///////////////FOR TESTING:
		  // TODO Remove
//		  role = 'ROLE_FADDER_LEADER';
//		  studentId = 3;
//		  sessionToken = "test-token";
////		  $.mobile.changePage('main-page.html');
//		  $.mobile.changePage('dash-board.html');
		  ///////////////////////////
		  //alert("hei");
		  resetUserValues();
		  signIn(); 		  
	  }else {				//Already signed in
		  resetUserValues();
	      window.plugins.childBrowser.showWebPage(
	      'https://accounts.google.com/Logout');
	  }
  });
  
	 $('#profilebtn').click(function() {
		 if(sessionToken == ""){
			 alert("Vennligst logg inn");
			 resetUserValues();
			 signIn(); 
		 }
		 else if(sessionToken  != "-1"){ //Sign is succeeded, but not NITH mail: = -1;
			 $.mobile.changePage('profile.html');
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
//      console.log(url);
//    	alert("OnChange: " + url);
      var receiveTokenURL = new RegExp('^' + callbackURL + '#' +
        stateURLFragment + '&access_token=..*$');

      // Triggered if the app is denied access
      if (url == callbackURL + '#error=access_denied' + stateURLFragment) {
        alert('Kunne ikke f� tilgang');
        window.plugins.childBrowser.close();
        resetUserValues();
      // Triggered if a token is received
      } else if (receiveTokenURL.test(url)) {

          window.plugins.childBrowser.close();
          onLoggedIn(url.split('=').splice(2, 1)[0].replace('&token_type', ''));
      // Triggered when a user logs out
      } else if (url == 'https://accounts.google.com/Login') {
        window.plugins.childBrowser.close();
        resetUserValues();
        
        toggleBtnText();
      } else{
    	 // resetUserValues();
          toggleBtnText();
      }
    };
  };
  
  function toggleBtnText(){
	  if(sessionToken == ""){
			$("#loginbtn .ui-btn-text").text("Logg inn");
//			$('#menubtn').css('visibility', 'hidden');
		}else{
			$("#loginbtn .ui-btn-text").text("Logg ut");
//			if(sessionToken != "-1"){
//				$('#menubtn').css('visibility', 'visible');				
//			}
			
		}
  }

//  function displayError(error) {
//    $('#logo').after('<p id="error">' + error + '</p>');
//  }
  
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
			timeout: 2000,
			cache : false,
			success : function() { //Server responded
				alert(response.status + '--' +response.getResponseHeader('error'));
				if(response.status == 200){ //Got role!
					role = 'ROLE_FADDER_LEADER';
				}else if (response.status == 204){ //Did not have role
					role = "";
				}
				$.mobile.hidePageLoadingMsg();
			},
			error : function(xhr, status) {
				role = "";
				if(status == 'timeout'){ //No contact with server
//					$('#error').empty();
					alert('Fikk ikke kontakt med serveren'); 
				}
				$.mobile.hidePageLoadingMsg();
			}
		});
  }

  function onLoggedIn(token) {
	  resetUserValues();
	  $.mobile.showPageLoadingMsg();
    // TODO Remove before launch
    //alert(token);
    console.log(token);
    // Send the token to the server
    // We get the session token in the response header
    // If any error occurred, show error.
    var loginResponse;
    loginResponse = $.ajax({
      url: address + 'auth/login/',
      type: 'post',
      timeout: 2000,
      contentType:"application/json",
      data: '{"token":"'+token+'"}',
      success: function(data) { //Signed in!
        student = data;
    	  alert("Success, signed in");
    	  sessionToken = loginResponse.getResponseHeader('session-token');
    	  studentId = loginResponse.getResponseHeader('student-id');
    	  
    	  checkIfLeader();
    	  toggleBtnText();
    	  
    	  $.mobile.hidePageLoadingMsg();
      },
      // Sign in failed! Server is down,
      // or user logged in with a non NITH google account
      error: function(xhr, status) { // Signed in failed
    	  
    	var resError = loginResponse.getResponseHeader('error');
    	//$('#error').empty();
    	if(resError == 'Email not valid'){
    		sessionToken = "-1";
    		alert('Bruker har ikke @nith.no mail, logg ut og inn igjen');    		
    	} else if (status == 'timeout'){
    		alert('Fikk ikke kontakt med serveren, logg inn igjen');    		
    	}else{
    		alert('En feil skjedde, vennligst logg inn igjen');    		    		
    	}
    	toggleBtnText();
    	$.mobile.hidePageLoadingMsg();
      }
    });
  }
  
  //Resets logged in values
  function resetUserValues(){
	  	sessionToken = "";
  		studentId = 0;
  		role = "";
  }

});