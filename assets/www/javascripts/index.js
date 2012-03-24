$(document).ready(function() {
  var callbackURL      = "http://niths.no/callback";
  var stateURLFragment = "state=/profile"; 

  $('#login').click(function() {
    signIn(); 
  });

  function signIn() {
    configure(); 
    window.plugins.childBrowser.showWebPage(
      "https://accounts.google.com/o/oauth2/auth"
      + "?scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email"
      + '&' + stateURLFragment
      + "&redirect_uri=" + encodeURIComponent(callbackURL)
      + "&response_type=token"
      + "&client_id=1064171706637-f9efklqg3tbrmu7fctvk8khvc0dqmh5i.apps.googleusercontent.com",
      { showLocationBar: false});
  };

  function configure() {
    window.plugins.childBrowser.onLocationChange = function(url) {
      var receiveTokenURL = new RegExp("^" + callbackURL + '#' +
    		  stateURLFragment + "&access_token=..*$");
      console.log(url);

      // Triggered if the app is denied access
      if (url == callbackURL + "#error=access_denied" + stateURLFragment) {
        $('#error').html("<strong>Could not approve app</strong>");
        window.plugins.childBrowser.close();

      // Triggered if a token is received
      } else if (receiveTokenURL.test(url)) {
        window.plugins.childBrowser.close();
        
      }
      // alert(url);
    };
  };
});