$("#add-child-admin-page").live('pageinit', function() {
	showLoadingGrouplessStudents();
	loadGrouplessStudents();
});

$('#fadder-groupless-form').live('submit', function() {
	var fadderGroupId = sessionStorage.getItem('fadder_group_id');
	alert(fadderGroupId);
    $('input:checkbox:checked').each(function() {
    	var currentId = $(this).attr('id');
    	alert(currentId);
    	//ajax --> addToGroup/
    });
    

  });

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
    hideLoadingGrouplessStudents()
}

