$("#add-child-admin-page").live('pageinit', function() {
	showLoadingGrouplessStudents();
	loadGrouplessStudents();
});

$('#fadder-groupless-form').live('submit', function() {
	//alert('SUBMIT');
	handleCheckboxesClicked();
	
    
 });

function handleCheckboxesClicked(){
	var fadderGroupId = sessionStorage.getItem('fadder_group_id');
	//alert(fadderGroupId);
	
	$('#fadder-groupless-collection input:checkbox:checked').each(function() {
	    	var currentId = $(this).attr('id');
	    	//alert(currentId);
	    	addGrouplessToGroup(fadderGroupId, currentId);
	   
	});
}

function addGrouplessToGroup(fgId, sId){
	//"{groupId}/add/child/{studentId}"
	var response;
	response = $.ajax({
	      url: address + 'fadder/' + fgId + '/add/child/' + sId,
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
	    		  return true;
	    	  }else{
	    		  alert("Fikk ikke lagt til student : " + response.status + " : " + response.getResponseHeader('error'));
	    	  }
	    	  return false;
	      },
	      error: function(xhr) {
	    	  alert(response.status);
	    	  alert("Beklager, en feil oppsto: " + response.getResponseHeader('error'));
	    	  return false;
	      }
	});
}

function clearFormContents(){
	$('#fadder-groupless-collection').html('');
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
	clearFormContents();
	//$('#fadder-groupless-collection').html('');
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
		}
	});
}

function traverseGrouplessStudents(students) {
	
	
    $.each(students, function(i, fadderChild) {
      $('#fadder-groupless-collection').append(
          '<input type="checkbox" id="' + fadderChild.id +
            '" value="' + i + '" />' +
          '<label for="' + fadderChild.id + '">' + 
            fadderChild.firstName + ' ' +
            fadderChild.lastName +
          '</label>' 
      );
    });
    $('#fadder-groupless-collection input:checkbox').checkboxradio();
    hideLoadingGrouplessStudents();
}

