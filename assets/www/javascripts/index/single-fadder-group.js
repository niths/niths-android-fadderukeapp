// Listen for any attempts to call changePage().
$(document).bind( "pagebeforechange", function( e, data ) {
	//alert('hei');
	if ( typeof data.toPage === "string" ) {
		var term = 'group-id';
		var index = data.toPage.indexOf(term);
		if(index !=  -1){
			var split = data.toPage.substring(index).split("=");
			if(split.length == 2){
				var id = split[1];
				hideGroup();
				//alert(id);
				loadGroup(id);
			}
		}
	}
});

function hideGroup(){
	$('#agroupheader').html('Gruppe');
	$('#loadinggroupmsgdiv').css('display', 'block');
	$('#groupinfodiv').css('display', 'none');
}

function showGroup(){
	$('#loadinggroupmsgdiv').css('display', 'none');
	$('#groupinfodiv').css('display', 'block');
}

function loadGroup(id){
	var restClient = new RestHandler(); //REST CLIENT
	restClient.find('fadder/' + id,  function(data, status, e) {  
		traverseAttributes(data);
   	 	$('#agroupheader').html('Gruppe ' + id);
   	 	showGroup();
	}, function(req, status, ex) {
		$('#groupinfodiv').html('<h3>Fikk ikke kontakt med server...</h3>');
   	 	showGroup();
	});
}

function traverseAttributes(fadderGroup) {
	$('#groupmemberslist').html('');
    for (attribute in fadderGroup) {
      if (typeof (fadderGroup[attribute]) == 'object') {

        // We must at some time check for the list of leaders in order to
        // display them since the order of objects of a fadder group may be
        // arbitrary.
        if (attribute == 'leaders') {
        	if(fadderGroup[attribute].length < 1){
        		$('#groupleaderlist').html('<li class="li-first"><h3>Ingen ledere registert</h3></li>');
        	}else{
        		traverseFadderLeaderAttributes(fadderGroup[attribute]);        		
        	}
        	 $('#groupleaderlist').listview('refresh');
        }else if (attribute == 'fadderChildren'){
        	if(fadderGroup[attribute].length < 1){
        		$('#groupmemberslist').html('<li class="li-first"><h3>Ingen fadderbarn registert</h3></li>');
        	}else{
        		traverseChildren(fadderGroup[attribute]);        		
        	}
        	$('#groupmemberslist').listview('refresh');
        }
      } 
    }
}

function traverseFadderLeaderAttributes(fadderLeaders) {
	$('#groupleaderlist').html('');
    $.each(fadderLeaders, function(i, fadderLeader) {
      $('#groupleaderlist').append('<li class="li-first">'+
    		  '<img src="http://www.gravatar.com/avatar/' + hex_md5(fadderLeader.email) + '?d=mm" />'+
    		  '<h3><strong>'+fadderLeader.firstName + ' ' + fadderLeader.lastName +'</strong></h3>'+
    		  '<p>Mail: '+fadderLeader.email+'</p><p>Tlf: '+fadderLeader.telephoneNumber+'</p></li>');
    });
    
   
}

function traverseChildren(fadderLeaders) {
	$('#groupmemberslist').html('');
	$.each(fadderLeaders, function(i, fadderLeader) {
		$('#groupmemberslist').append('<li class="li-first">'+
				'<img src="http://www.gravatar.com/avatar/' + hex_md5(fadderLeader.email) + '?d=mm" />'+
				'<h3><strong>'+fadderLeader.firstName + ' ' + fadderLeader.lastName +'</strong></h3>'+
				'<p>Mail: '+fadderLeader.email+'</p><p>Tlf: '+fadderLeader.telephoneNumber+'</p></li>');
	});
	
	//$('#groupmemberslist').listview('refresh');
}