$("#dashboard-page").live('pageshow', function() {
   if(sessionToken == ""){
      $("#loginbtn .ui-btn-text").text("Logg inn");
      $('#adminsectionbtn').css('display', 'none');
    }else{
      $("#loginbtn .ui-btn-text").text("Logg ut");
    }
});

$(document).ready(function() {
  
  var restClient = new RestHandler(); //REST CLIENT

  var callbackURL      = 'http://niths.no/callback';
  var stateURLFragment = 'state=/profile';
  var isNITHMail       = false;
  
  //toggleBtnText();

  $('#loginbtn').click(function() {
          ChildBrowser.install();
    if(sessionToken == ""){ //Not signed in
      resetUserValues();
      signIn();       
    }else {        //Already signed in
      resetUserValues();
        window.plugins.childBrowser.showWebPage(
        'https://accounts.google.com/Logout');
    }
  });
  
   $('#profilebtn').click(function() {
           ChildBrowser.install();
     if(sessionToken == "") {
       navigator.notification.alert(
           'Vennligst logg inn',
           function() {
             resetUserValues();
             signIn(); 
           },
           'Logg inn',
           'OK'); 
     }
     // Sign is succeeded, but not NITH mail: = -1
     else if(sessionToken  != "-1"){
       $.mobile.changePage('#profile-page');
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
      { });//showLocationBar: false}); //When no contact with google, needs to be able to exit browser
  };

  /**
   * This method runs every time Childbrowser changes page
   */
  function configureLocationChanged() {
    window.plugins.childBrowser.onLocationChange = function(url) {
      var receiveTokenURL = new RegExp('^' + callbackURL + '#' +
        stateURLFragment + '&access_token=..*$');

      // Triggered if the app is denied access
      if (url == callbackURL + '#error=access_denied' + stateURLFragment) {
        navigator.notification.alert(
            'Fikk ikke tilgang',
            function() {
              window.plugins.childBrowser.close();
              resetUserValues();
            },
            'Feil',
            'OK'
        );
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
    restClient.updateWithCallbacks(
        'auth/login/',
        '{"token":"'+token+'"}',
        function(data, textStatus, jqXHR) {
          navigator.notification.alert(
              'Du er innlogget',
              function() {
                student = data;
                sessionToken = jqXHR.getResponseHeader('session-token');

                //If student is leader for a group, show admin btn
                if(student.groupLeaders != null){ //NEEDED?
                  if(student.groupLeaders.length > 0){
                    $('#adminsectionbtn').css('display', 'block');              
                  }
                }

                toggleBtnText();
                $.mobile.hidePageLoadingMsg()
              },
          ':)',
          'OK'
      );
    }, function(req, status, ex) {
      var resError = req.getResponseHeader('error');
        //$('#error').empty();
        if(resError == 'Email not valid'){
          sessionToken = "-1";

          navigator.notification.alert(
              'Bruker har ikke NITH-mail, logg ut og inn igjen',
              null,
              'Feil',
              'OK'
          );
        } else if (status == 'timeout'){
          navigator.notification.alert(
              'Fikk ikke kontakt med serveren, logg inn igjen',
              null,
              'Feil',
              'OK'
          );
        }else{
          navigator.notification.alert(
              'En feil intraff',
              null,
              'Feil',
              'OK'
          );
        }

        toggleBtnText();
        $.mobile.hidePageLoadingMsg();
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
