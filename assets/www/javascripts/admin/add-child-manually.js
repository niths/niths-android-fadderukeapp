$("#add-child-admin-page").live('pageshow', function() {
	var restClient = new RestHandler();
	showLoadingGrouplessStudents();
	loadGrouplessStudents();

	$('#fadder-groupless-form').submit( function() {
		var fadderGroupId = sessionStorage.getItem('fadder_group_id');
		//alert("Editing group: " + fadderGroupId);

		var idArr = $("#fadder-groupless-collection input:checkbox:checked").map(function(i, el) { return $(el).attr("id"); }).get();

		addGRChildrenToGroup();
		return false;
		
		function addGRChildrenToGroup(){
			restClient.updateURL('fadder/' + fadderGroupId + '/add/children/' + idArr.join(','),  function(data, status) {
				if(status == 'success'){
					alert("Student(er) Lagt til");
					history.back();
				} else {
					alert("Fikk ikke lagt til studenter");
				}
				$.mobile.hidePageLoadingMsg();
				
			});
		}
	});

function clearFormContents(){
	$('#fadder-groupless-collection').html('');
}

function showLoadingGrouplessStudents(){
	clearFormContents();
	$('#grouplessloader').css('display', 'block');
	$('#fadder-groupless-form').css('visibility', 'hidden');
}
function hideLoadingGrouplessStudents(){
	$('#grouplessloader').css('display', 'none');
	$('#fadder-groupless-form').css('visibility', 'visible');
}




function loadGrouplessStudents(){
//	clearFormContents();
	restClient.find('fadder/groupless',  function(data) {  
		traverseGrouplessStudents(data);
	}, function(req, status, ex) {
		alert('Greide ikke hente fadderbarn');
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

});
