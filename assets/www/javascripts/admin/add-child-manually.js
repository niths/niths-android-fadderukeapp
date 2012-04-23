$('#add-child-admin-page').bind('pageshow', function(){
	
	showLoadingGrouplessStudents();
	loadGrouplessStudents();

	
	

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
	var restClient = new RestHandler();
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

}).bind('pageinit', function(){
	
	$('#fadder-groupless-form').submit( function(e) {
		
		var fadderGroupId = sessionStorage.getItem('fadder_group_id');
		addGRChildrenToGroup();
		return false;
		
		function addGRChildrenToGroup(){
			var restClient = new RestHandler();
			var idArr = $("#fadder-groupless-collection input:checkbox:checked").map(function(i, el) { return $(el).attr("id"); }).get();
			restClient.updateURL('fadder/' + fadderGroupId + '/children/' + idArr.join(','),  function(data, textStatus, jqXHR) {
				if(jqXHR.status == 200){
					
					alert("Student(er) Lagt til");
					history.back();
				} else {
					alert(jqXHR.status + ': Fikk ikke lagt til studenter');
				}
				$.mobile.hidePageLoadingMsg();
				
			});
		}
	});
  
});