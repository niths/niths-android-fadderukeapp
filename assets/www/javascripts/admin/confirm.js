$("#confirm-dialog-page").live('pageinit', function() {
//$(document).ready(function() {
	var restClient = new RestHandler();
	
  var fadderChildren = JSON.parse(
      sessionStorage.getItem('fadder_children_objs'));
  var ids = '';
  
  $.each(fadderChildren, function(i, fadderChild) {
    ids += fadderChild.id + ',';
  });

  $('#yes').click(function() {
	  
	  restClient.remove('fadder/' + sessionStorage.getItem('fadder_group_id') + '/remove/children/' + ids.slice(0, -1),  function(data, status) {  
			if(status== "success"){
				alert('Sletting vellykket');
							
			}else{
				alert("Sletting feilet");
			}
			$.mobile.hidePageLoadingMsg();
			history.back();	
		});
  });

  $('#no').click(function() {
    history.back();
  });
});