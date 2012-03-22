
$(document).ready(function() {
  $('form').submit(function() {
    $.ajax({
      url: "http://10.0.2.2:55404/niths/google/login",
      type: "post",
      data: $('form').serialize(),
      success: function(status, data) {
        alert("SUCCESS: " + status + data);
      },
      error: function(xhr, status) {
        alert(JSON.stringify(xhr) + status);
      }
    });
    
    return false;
  });
});