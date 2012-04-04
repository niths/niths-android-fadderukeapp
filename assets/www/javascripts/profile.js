$(document).ready(function() {
	if(studentId == 0){
		$.mobile.changePage('index.html');
	}else{
		getUser();
	}
	
	  function getUser() {
		    $.ajax({
		      url: address + 'students/' + studentId,
		      type: 'get',
		      cache: false,
		      success: function(data) {
		        alert(data);
		      },
		      error: function(xhr) {
		        alert(JSON.stringify(xhr));
		      }
		    });
	  }
	
});