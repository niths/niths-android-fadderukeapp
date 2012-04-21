$("#dashboard-page").live('pageshow', function() {
	 if(sessionToken == ""){
			$("#loginbtn .ui-btn-text").text("Logg inn");
			$('#adminsectionbtn').css('display', 'none');
		}else{
			$("#loginbtn .ui-btn-text").text("Logg ut");
		}
});

$(document).ready(function() {


  var callbackURL      = 'http://niths.no/callback';
  var stateURLFragment = 'state=/profile';
  var isNITHMail       = false;
  
  toggleBtnText();

  $('#loginbtn').click(function() {
	  if(sessionToken == ""){ //Not signed in
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
			 //alert("LOGGED IN");
			 $.mobile.changePage('views/profile.html');
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
      { });//showLocationBar: false});
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
          toggleBtnText();
      }
    };
  };
  
  function toggleBtnText(){
	  if(sessionToken == ""){
			$("#loginbtn .ui-btn-text").text("Logg inn");
		}else{
			$("#loginbtn .ui-btn-text").text("Logg ut");
		}
  }


  function onLoggedIn(token) {
	  resetUserValues();
	  $.mobile.showPageLoadingMsg();
    // Send the token to the server
    // We get the session token in the response header
    // If any error occurred, show error.
	  var loginResponse;
	  loginResponse = $.ajax({
		  url: address + 'auth/login/',
		  type: 'post',
		  timeout: 3000,
		  contentType:"application/json",
		  data: '{"token":"'+token+'"}',
		  	success: function(data) { //Signed in!
		  		alert("Du er innlogget");
		  		student = data;
		  		sessionToken = loginResponse.getResponseHeader('session-token');
		  		
		  		//If student is leader for a group, show admin btn
		  		if(student.groupLeaders != null){ //NEEDED?
		  			if(student.groupLeaders.length > 0){
		  				$('#adminsectionbtn').css('display', 'block');		  				
		  			}
		  		}

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
	  	sessionToken = '';
  		//role = '';
  		student= {};
  		//groupNumber = 0;
  		$('#adminsectionbtn').css('display', 'none');
  }

});