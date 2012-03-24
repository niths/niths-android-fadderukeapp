$(document).ready(function() {
  $('#login').click(function() {
    signIn();
  });

  function signIn() {
    configure();
    window.plugins.childBrowser.showWebPage(
      "https://accounts.google.com/o/oauth2/auth"
      + "?scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email"
      + "&state=%2Fprofile"
      + "&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fniths%2Fgoogle%2Fresult"
      + "&response_type=token"
      + "&client_id=1064171706637-ep2hk9dqivvp87gh18jn7c0hm9bd1icn.apps.googleusercontent.com",
      { showLocationBar: false});
  };

  function configure() {
    window.plugins.childBrowser.onLocationChange = function(url) {
      alert(url);
    };
  };
});