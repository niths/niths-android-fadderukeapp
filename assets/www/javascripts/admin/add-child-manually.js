$("#add-child-admin-page").live('pageinit', function() {
	showLoadingGrouplessStudents();
	loadGrouplessStudents();
});

$('#fadder-groupless-form').live('submit', function() {
	var fadderGroupId = sessionStorage.getItem('fadder_group_id');
	alert(fadderGroupId);
    $('#fadder-groupless-form:checkbox:checked').each(function() {
    	var currentId = $(this).attr('id');
    	alert(currentId);
    	addGrouplessToGroup(fadderGroupId, currentId);
    });
    
   

  });

function addGrouplessToGroup(fgId, sId){
	//"{groupId}/add/child/{studentId}"
	var response;
	  response = $.ajax({
	      url: address + 'fadder/' + fgId + 'add/child/' + sId,
	      type: 'PUT',
	      cache: false,
	      contentType: 'application/json',
	      beforeSend: function(xhr) {
	        xhr.setRequestHeader("Application-key", applicationKey);
	        xhr.setRequestHeader("Application-token", applicationToken);
	        xhr.setRequestHeader("Developer-key", developerKey);
	        xhr.setRequestHeader("Developer-token", developerToken);
	        xhr.setRequestHeader("Session-token", sessionToken);
	      },
	      success : function(data){
	    	  if(response.status == 200){
	    		  alert("Student lagt til");
	    	  }else{
	    		  alert("Fikk ikke lagt til student");
	    	  } 
	      },
	      error: function(xhr) {
	    	  alert("Beklager, en feil oppsto: " + response.getResponseHeader('error'));
	      }
	    });
}

function showLoadingGrouplessStudents(){
	$('#grouplessloader').css('display', 'block');
	$('#fadder-groupless-form').css('visibility', 'hidden');
}
function hideLoadingGrouplessStudents(){
	$('#grouplessloader').css('display', 'none');
	$('#fadder-groupless-form').css('visibility', 'visible');
}




function loadGrouplessStudents(){
	$.ajax({
		url:        	address + 'fadder/groupless',
		type:       	'get',
		cache:      	false,
		contentType: 	'application/json',
		timeout: 		3000,
		success: function(data) {
			//alert(JSON.stringify(data));
			//grouplessStudents = data;
			traverseGrouplessStudents(data);
		},
		error:   function(xhr) {
			alert('Greide ikke hente fadderbarn');
			history.back();
		}
	});
}

function traverseGrouplessStudents(students) {
	$('#fadder-groupless-collection').html('');
	
    $.each(students, function(i, fadderChild) {
      $('#fadder-groupless-collection').append(
          '<input type="checkbox" id="' + fadderChild.id +
            '" name="index" value="' + i + '" />' +
          '<label for="' + fadderChild.id + '">' + 
            fadderChild.firstName + ' ' +
            fadderChild.lastName +
          '</label>' 
      );
    });
    $('input:checkbox').checkboxradio();
    hideLoadingGrouplessStudents();
}

