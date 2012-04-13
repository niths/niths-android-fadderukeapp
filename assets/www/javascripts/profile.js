
$("#profile-page").live('pageinit', function() {
	//alert("pageinit");
	if (student.id < 1) {
		history.back();
		return false;
	} else {
		init();
	}
});



	
	function init(){
		printUserInfo();
//		userEmail = "";
//		getUser();
//		getGroup();
	}
	
	$.fn.serializeObject = function(){
	    var o = {};
	    var a = this.serializeArray();
	    $.each(a, function() {
	        if (o[this.name] !== undefined) {
	            if (!o[this.name].push) {
	                o[this.name] = [o[this.name]];
	            }
	            o[this.name].push(this.value || '');
	        } else {
	            o[this.name] = this.value || '';
	        }
	    });
	    return o;
	};
	
	  $('#profilesubmit').click(function() {
		  var response;
		  response = $.ajax({
		      url: address + 'students',
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
		      data:  JSON.stringify($("#update-person-form").serializeObject()),
		      success : function(data){
		    	  if(response.status == 200){
		    		  alert("Oppdatering vellykket");
		    	  }else{
		    		  alert("Beklager, oppdatering feilet. Prøv igjen");
		    	  } 
		      },
		      error: function(xhr) {
		    	  alert("Beklager, en feil oppsto: " + response.getResponseHeader('error'));
		      }
		    });

		    $('form').die('submit');
		    return false;
		  });

	function printUserInfo(){
		$('#id').val(student.id);
		$('#firstName').val(student.firstName);
		$('#lastName').val(student.lastName);
		$('#telephoneNumber').val(student.telephoneNumber);
		$('#description').val(student.description);
		
		if(student.gender == 'M'){
			$("input[value=M]").attr('checked',true).checkboxradio('refresh');
		}else if (student.gender == 'F'){
			$("input[value=F]").attr('checked',true).checkboxradio('refresh');			
		}
		
		if(groupNumber != 0){
			$('#faddergroup').html('<a class="blacklink" href="#single-fadder-group-page?group-id='+groupNumber+'">' + groupNumber + '</a>');
		}else{
			$('#faddergroup').html("Ingen");
		}
		
		userEmail = hex_md5(student.email);

		$('#profileImg').attr("src", 'http://www.gravatar.com/avatar/' + userEmail + '?d=mm');

	}
