$("#dashboard-page").live('pageshow', function() {
   if(sessionStorage.getItem('session_token') == null) { 
      $("#loginbtn .ui-btn-text").text("Logg inn");
      $('#adminsectionbtn').css('display', 'none');
    } else {
      $("#loginbtn .ui-btn-text").text("Logg ut");
    }
});

$(document).ready(function() {
  var restClient       = new RestHandler();
  var callbackURL      = 'http://niths.no/callback';
  var stateURLFragment = 'state=/profile';
  var isNITHMail       = false;

  $('#loginbtn').click(function() {
    
    if(sessionStorage.getItem('session_token') == '') { //Not signed in
      resetUserValues();
      signIn();       
    } else { //Already signed in
      resetUserValues();
      window.plugins.childBrowser.showWebPage(
          'https://accounts.google.com/Logout');
    }
  });

   $('#profilebtn').click(function() {
     checkLogin('#profile-page');
   });

   $('#fadder-group-page').click(function() {
     checkLogin('#all-fadder-groups-page'); 
   });

   function checkLogin(page) {
     ChildBrowser.install();
     if(sessionStorage.getItem('session_token') == '') {
       showMsg('Vennligst logg inn', function() {
         resetUserValues();
         signIn();
       });
     }

     // Sign is succeeded, but not NITH mail: = -1
     else if(sessionStorage.getItem('session_token')  != "-1"){
       $.mobile.changePage(page);
     }
   }

  /**
   * Opens childbrowser with the Google login site
   */
  function signIn() {
    configureLocationChanged();
    window.plugins.childBrowser.showWebPage(
      'https://accounts.google.com/o/oauth2/auth'
      + '?scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email'
      + '&' + stateURLFragment
      + '&redirect_uri=' + encodeURIComponent(callbackURL)
      + '&response_type=token'
      + '&client_id=1064171706637-f9efklqg3tbrmu7fctvk8khvc0dqmh5i.apps.googleusercontent.com');
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
        showErr('Fikk ikke tilgang', function() {
          window.plugins.childBrowser.close();
          resetUserValues();
        });
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
    if(sessionStorage.getItem('session_token') == ""){
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
          showMsg('Du er innlogget', function() {
            student = data;
            sessionStorage.setItem(
                'session_token',
                jqXHR.getResponseHeader('session-token'));

            //If student is leader for a group, show admin btn
            if(student.groupLeaders != null){ //NEEDED?
              if(student.groupLeaders.length > 0){
                $('#adminsectionbtn').css('display', 'block');
              }
            }

            toggleBtnText();
            $.mobile.hidePageLoadingMsg();
          });
        },
        function(xhr, status, ex) {
          if(xhr.getResponseHeader('error') == 'Email not valid') {
            sessionStorage.setItem('session_token', '-1');
            showErr('Bruker har ikke NITH-mail, logg ut og inn igjen', null);
          } else if (status == 'timeout') {
            showErr('Fikk ikke kontakt med serveren, logg inn igjen');
          } else {
            showErr('En feil intraff');
        }

        toggleBtnText();
        $.mobile.hidePageLoadingMsg();
    });
  }

  //Resets logged in values
  function resetUserValues(){
    sessionStorage.setItem('session_token', '');
      //role = '';
      student= {};
      //groupNumber = 0;
      $('#adminsectionbtn').css('display', 'none');
  }
});