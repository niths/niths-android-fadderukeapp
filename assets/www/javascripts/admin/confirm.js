$(document).ready(function() {
  var fadderChildren = JSON.parse(
      sessionStorage.getItem('fadder_children_objs'));
  var ids = '';
  
  $.each(fadderChildren, function(i, fadderChild) {
    ids += fadderChild.id + ',';
  });

  $('#yes').click(function() {
	  var res;
    res = $.ajax({

      // Building the URL describing which students to remove from the group
      url:        address + 'fadder/' + sessionStorage.getItem('fadder_group_id') + '/remove/children/' + ids.slice(0, -1),
      type:         'DELETE',
      cache:      false,
      beforeSend: function(xhr) {
    	  xhr.setRequestHeader("Application-key", applicationKey);
	      xhr.setRequestHeader("Application-token", applicationToken);
	      xhr.setRequestHeader("Developer-key", developerKey);
	      xhr.setRequestHeader("Developer-token", developerToken);
	      xhr.setRequestHeader("Session-token", sessionToken);
      },
      success:    function() {
        history.back();
      },
      error:      function(xhr) {
    	  if(response.status == 401){
    		  alert('Beklager, du har vært inaktiv for lenge, logg inn igjen');
    		  sessionToken = '';
    		  $.mobile.changePage('../../index.html');
    	  }else{
    		  alert("Beklager, en feil oppsto: " + response.getResponseHeader('error'));		    		  
    	  }
      }
    });
  });

  $('#no').click(function() {
    history.back();
  });
});