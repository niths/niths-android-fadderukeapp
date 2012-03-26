$(document).ready(function() {
  $('a').click(function(event) {
    $.mobile.changePage(event.target.innerHTML.toLowerCase().replace(
        ' ', '-') + ".html");
  });
});