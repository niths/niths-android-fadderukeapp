$(document).ready(function() {
  var callbackURL      = 'http://niths.no/callback';
  var stateURLFragment = 'state=/profile';
  var isNITHMail       = false;

  $('#login').click(function() {
    signIn(); 
  });

  function signIn() {
    configureLocationChanged(); 
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
      var receiveTokenURL = new RegExp('^' + callbackURL + '#' +
        stateURLFragment + '&access_token=..*$');

      if (url == 'https://www.google.com/a/nith.no/acs') {
        isNITHMail = true;
      }

      // Triggered if the app is denied access
      else if (url == callbackURL + '#error=access_denied' + stateURLFragment) {
        displayError('Kunne ikke få tilgang');
        window.plugins.childBrowser.close();

      // Triggered if a token is received
      } else if (receiveTokenURL.test(url)) {
        $.mobile.showPageLoadingMsg();
        window.plugins.childBrowser.close();

        if (isNITHMail) {
          onLoggedIn(url.split('=').splice(2, 1)[0].replace('&token_type', ''));
        } else {
          $('#logout').css('visibility', 'visible');
          displayError('Vennligst logg inn med en NITH e-postadresse');
        }

      // Triggered when a user logs out
      } else if (url == 'https://accounts.google.com/Login') {
        window.plugins.childBrowser.close();
        $('#error').empty();
        $('#logout').css('visibility', 'hidden');
      }
    };
  };

  function displayError(error) {
    $('#error').html('<strong>' + error + '</strong>');
  }

  function onLoggedIn(token) {

    // TODO Remove before launch
    alert(token);
    console.log(token);

    // Send the token to the server
    $.ajax({
      url: 'http://ec2-46-137-44-111.eu-west-1.compute.amazonaws.com:8181/niths/courses',
      success: function(data) {
        window.plugins.childBrowser.close();
        window.location = 'main-menu.html';
      },
      error: function(xhr, status) {
        alert(JSON.stringify(xhr));
      }
    });
  }

  $('#logout').click(function(event) {
      window.plugins.childBrowser.showWebPage(
      'https://accounts.google.com/Logout');
  });
});