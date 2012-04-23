$('#confirm-dialog-page').bind('pageshow', function(){
	
	  
}).bind('pageinit', function(){
	
	 $('#yes').click(function() {
		 
		 var restClient = new RestHandler();
			
			var fadderChildren = JSON.parse(
			      sessionStorage.getItem('fadder_children_objs'));
			var ids = '';
			  
			$.each(fadderChildren, function(i, fadderChild) {
			    ids += fadderChild.id + ',';
			});
			
		 // alert('fadder/' + sessionStorage.getItem('fadder_group_id') + '/children/' + ids.slice(0, -1));
		  restClient.remove('fadder/' + sessionStorage.getItem('fadder_group_id') + '/children/' + ids.slice(0, -1),  function(data, status, xhr) {  
				
			  if(xhr.status== 200){
					alert('Sletting vellykket');
								
				}else{
					alert(xhr.status + ': Sletting feilet');
				}
				$.mobile.hidePageLoadingMsg();
				history.back();	
			});
		  return false;
	  });

	  $('#no').click(function() {
	    history.back();
	  });
});