$("#all-fadder-groups-page").live('pageinit', function() {
	loadFadderGroups();
});

function loadFadderGroups() {
    $.ajax({
    	url: address + 'fadder',
    	type: 'GET',
    	cache: false,
    	timeout: 3000,
    	success: function(data) {
    		traverseFadderGroups(data);
    		showList();
    	},
    	error: function(xhr) {
    		$('#groupList').html('<li class="li-first"><h3>Ingen kontakt med server...</h3></li>');
    		showList();
    	}
    });
}
    
function showList(){
	$('#groupList').listview('refresh');
	$('#loadingmsgdiv').css('display', 'none');
	$('#groupList').css('visibility', 'visible');
}
    
function traverseFadderGroups(fadderGroups) {
	$('#groupList').html(''); //Clear the old list
	for (group in fadderGroups){
		displayFadderGroup(fadderGroups[group]);
	}
}

/**
 * Displays a faddergroup with group number and images of the three first fadders
 */
function displayFadderGroup(fadderGroup) {
	var html = '<li class="li-first"><a href="#single-fadder-group-page?group-id='+fadderGroup.id+'">';
	for (var i = 0; (i < fadderGroup.leaders.length && i < 3); i++){
		html += '<p class="imgwrapper"><img src="http://www.gravatar.com/avatar/' + hex_md5(fadderGroup.leaders[i].email) + '?d=mm" /></p>';
	}
	html+= '<h3 class="under">Gruppe: '+fadderGroup.groupNumber+'</h3></a></li>';
	$('#groupList').append(html);
}