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
    		$('#allGroupsContentDiv').html('<h3>Ingen kontakt med server...</h3>');
    		showList();
    	}
    });
}
    
function showList(){
	$('#loadingGroupsMsgDiv').css('display', 'none');
	$('#allGroupsInfoDiv').css('visibility', 'visible');
}
function hideFadderList(){
	$('#allGroupsInfoDiv').css('visibility', 'hidden');
	$('#loadingGroupsMsgDiv').css('display', 'block');
}
    
function traverseFadderGroups(fadderGroups) {
	$('#allGroupsContentDiv').html('');
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
	var html = '<div class="';
	if(index % 2 == 0){
		html += 'back1">';
	}else{
		html += 'back2">';
	}
	html += 
	'<div class="groupNumberDiv"><a class="blacklink" href="#single-fadder-group-page?group-id='+fadderGroup.id+'"><h1>'+fadderGroup.groupNumber+'</h1>'+
	'</div>'+
	'<div class="fadderInfoDiv">';
	for (var i = 0; (i < fadderGroup.leaders.length && i < 2); i++){
		html += '<p>'+fadderGroup.leaders[i].firstName+'<img src="http://www.gravatar.com/avatar/' + hex_md5(fadderGroup.leaders[i].email) + '?d=mm" /></p>';
	}
	html += '</div>'+
	'</a></div><div class="groupdivider"></div>';
	$('#allGroupsContentDiv').append(html);
}