$("#all-fadder-groups-page").bind('pageinit', function() {
	
	var restClient = new RestHandler(); //REST CLIENT
	loadFadderGroups();
	
	$('#refreshFadderGroupsListBtn').click(function(data) {
		hideFadderList();
		loadFadderGroups();
	});


function loadFadderGroups() {
	$('#allGroupsUL').html('');
	restClient.findRestricted('fadder',  function(data, status, e) {
		if (e.status == 200) {
			traverseFadderGroups(data);
    	 }else{
    		 showGroupErrMsg();
    	 }
	}, showGroupErrMsg); 
}


function showGroupErrMsg(){
	$('#allGroupsUL').html('<li><h3>Ingen kontakt med server...</h3></li>');
	showList();
}
    
function showList(){
	$('#loadingGroupsMsg2Div').css('display', 'none');
	$('#allGroupsUL').css('visibility', 'visible');
}
function hideFadderList(){
	$('#allGroupsUL').css('visibility', 'hidden');
	$('#loadingGroupsMsg2Div').css('display', 'block');
}
    
function traverseFadderGroups(fadderGroups) {
	var index = 1;
	for (group in fadderGroups){
		displayFadderGroup(fadderGroups[group], ++index);
	}
	showList();
}

/**
 * Displays a faddergroup with group number and images of the three first fadders
 */
function displayFadderGroup(fadderGroup, index) {
	
	var html = 
	'<li class="fadderGroupGUI"><a class="blacklink" href="#single-fadder-group-page?group-id='+fadderGroup.id+'">' +
	'<div class="groupGUI">' +
		'<h2>'+fadderGroup.groupNumber+'</h2>'+
	'</div>';
	for (var i = 0; (i < fadderGroup.leaders.length && i < 3); i++){
		html += '<div class="nameAndImage">'+
			'<div class="imageGUI"><img src="http://www.gravatar.com/avatar/' + hex_md5(fadderGroup.leaders[i].email) + '?d=mm" /></div>'+
			'<div class="nameGUI">'+fadderGroup.leaders[i].firstName+'</div>'+
			'</div>';
	}
	html += '</a></li>';
	
	$('#allGroupsUL').append(html);
}

}); //End pageinit