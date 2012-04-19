$("#all-fadder-groups-page").live('pageinit', function() {
	loadFadderGroups();
	
	$('#refreshFadderGroupsListBtn').click(function(data) {
		hideFadderList();
		loadFadderGroups();
	});
});

function loadFadderGroups() {
    $.ajax({
    	url: address + 'fadder',
    	type: 'GET',
    	cache: false,
    	timeout: 3000,
    	success: function(data) {
    		traverseFadderGroups(data);
    	},
    	error: function(xhr) {
    		$('#allGroupsGUI ul').html('<li><h3>Ingen kontakt med server...</h3></li>');
    		showList();
    	}
    });
}
    
function showList(){
	$('#loadingGroupsMsgDiv').css('display', 'none');
	$('#allGroupsGUI').css('visibility', 'visible');
}
function hideFadderList(){
	$('#allGroupsGUI').css('visibility', 'hidden');
	$('#loadingGroupsMsgDiv').css('display', 'block');
}
    
function traverseFadderGroups(fadderGroups) {
	$('#allGroupsGUI ul').html('');
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
	
	$('#allGroupsGUI ul').append(html);
	
	
	
	
	
	
	
//	var html = '<div class="';
//	if(index % 2 == 0){
//		html += 'back1">';
//	}else{
//		html += 'back2">';
//	}
//	html += 
//	'<div class="groupNumberDiv"><a class="blacklink" href="#single-fadder-group-page?group-id='+fadderGroup.id+'"><h1>'+fadderGroup.groupNumber+'</h1>'+
//	'</div>'+
//	'<div class="fadderInfoDiv">';
//	for (var i = 0; (i < fadderGroup.leaders.length && i < 2); i++){
//		html += '<p>'+fadderGroup.leaders[i].firstName+'<img src="http://www.gravatar.com/avatar/' + hex_md5(fadderGroup.leaders[i].email) + '?d=mm" /></p>';
//	}
//	html += '</div>'+
//	'</a></div><div class="groupdivider"></div>';
//	$('#allGroupsContentDiv').append(html);
}