$("#all-fadder-groups-page").live('pageinit', function() {
	//alert("hei");
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

function displayFadderGroup(fadderGroup) {
//	$('#groupList').append('<li class="li-first"><a href="#single-fadder-group-page"><h3>Gruppe: '+fadderGroup.groupNumber+'</h3></a></li>');
	$('#groupList').append('<li class="li-first"><a href="#single-fadder-group-page?group-id='+fadderGroup.id+'"><h3>Gruppe: '+fadderGroup.groupNumber+'</h3></a></li>');
//	$('#groupList').append('<li class="li-first"><a href="#single-fadder-group-page"><h3>Gruppe: '+fadderGroup.groupNumber+'</h3></a></li>');
	
}