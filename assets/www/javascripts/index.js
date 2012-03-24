$(document).ready(function() {
  var callbackURL      = "http://niths.no/callback";
  var stateURLFragment = "state=/profile";
  var isNITHMail       = false;

  $('#login').click(function() {
    signIn(); 
  });

  function signIn() {
    configureLocationChanged(); 
    window.plugins.childBrowser.showWebPage(
      "https://accounts.google.com/o/oauth2/auth"
      + "?scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email"
      + '&' + stateURLFragment
      + "&redirect_uri=" + encodeURIComponent(callbackURL)
      + "&response_type=token"
      + "&client_id=1064171706637-f9efklqg3tbrmu7fctvk8khvc0dqmh5i.apps.googleusercontent.com",
      { showLocationBar: false});
  };

  function configureLocationChanged() {
    window.plugins.childBrowser.onLocationChange = function(url) {
      alert(url);
      var receiveTokenURL = new RegExp("^" + callbackURL + '#' +
        stateURLFragment + "&access_token=..*$");

      if (url == "https://www.google.com/a/nith.no/acs") {
        isNITHMail = true;
      }

      // Triggered if the app is denied access
      else if (url == callbackURL + "#error=access_denied" + stateURLFragment) {
        displayError("Kunne ikke få tilgang");
        window.plugins.childBrowser.close();

      // Triggered if a token is received
      } else if (receiveTokenURL.test(url)) {
        window.plugins.childBrowser.close();

        if (isNITHMail) {
          window.plugins.childBrowser.close();
          window.location = "main-menu.html";
        } else {
          window.plugins.childBrowser.showWebPage(
            "https://accounts.google.com/Logout?continue=http://google.com");
          // window.plugins.childBrowser.close();
          displayError("Vennligst logg inn med en NITH e-postadresse");
        }
      }
    };
  };

  function displayError(error) {
    $('#error').html("<strong>" + error + "</strong>");
  };
});