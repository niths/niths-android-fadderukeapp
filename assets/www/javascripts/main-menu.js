$(document).ready(function() {
  $('a').click(function(event) {
    var a = event.target.innerHTML.toLowerCase().replace(' ', '-') + ".html";
    alert(a);
  });
});