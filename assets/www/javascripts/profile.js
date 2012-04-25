
$("#profile-page").live('pageinit', function() {
	if (student ==  {}) {
		history.back();
		return false;
	} 
	
	$.fn.serializeObject = function(){
	    var o = {};
	    var a = this.serializeArray();
	    $.each(a, function() {
	        if (o[this.name] !== undefined) {
	            if (!o[this.name].push) {
	                o[this.name] = [o[this.name]];
	            }
	            if(this.value != ''){
	            	 o[this.name].push(htmlEncode(this.value) || '');
	            }
	        } else {
	        	if(this.value != ''){
	                o[this.name] = htmlEncode(this.value) || '';
	            }
	        }
	    });
	    return o;
	};
	
	  $('#profilesubmit').click(function() {
		  var restClient = new RestHandler(); //REST CLIENT
		  restClient.update('students', JSON.stringify($("#update-person-form").serializeObject()),  function(data, textStatus, jqXHR) {  
			  $.mobile.hidePageLoadingMsg();
				if(textStatus == "success"){
					refreshStudentValues();
					alert('Oppdatering vellykket');	
				}else{
					alert("Oppdatering feilet");
				}
			});

		    $('form').die('submit');
		    return false;
		  });




}).bind('pageshow', function(){
	
	printUserInfo();
	
});

function refreshStudentValues(){
	 student.firstName = htmlEncode($('#firstName').val());
	 student.lastName = htmlEncode($('#lastName').val());
	 student.telephoneNumber = htmlEncode($('#telephoneNumber').val());
	 student.description = htmlEncode($('#descriptionP').val());
	 if($("input[@name=gender]:checked").attr('id') == 'male'){
		 student.gender = 'M';
	 }else if($("input[@name=gender]:checked").attr('id') == 'female'){
		 student.gender = 'F';
	 }
}


function htmlEncode(s) {
	 encodedHtml = escape(s);
	 encodedHtml = encodedHtml.replace(/\//g,"%2F");
	 encodedHtml = encodedHtml.replace(/\?/g,"%3F");
	 encodedHtml = encodedHtml.replace(/=/g,"%3D");
	 encodedHtml = encodedHtml.replace(/&/g,"%26");
	 encodedHtml = encodedHtml.replace(/@/g,"%40");
	 return encodedHtml;
}

function printUserInfo(){
	$('#idP').val(student.id);
	$('#firstName').val(student.firstName);
	$('#lastName').val(student.lastName);
	$('#telephoneNumber').val(student.telephoneNumber);
	$('#descriptionP').val(student.description);
	if(student.gender == 'M'){
		$("input[value=M]").attr('checked',true).checkboxradio('refresh');
	}else if (student.gender == 'F'){
		$("input[value=F]").attr('checked',true).checkboxradio('refresh');			
	}
	
	userEmail = hex_md5(student.email);
	
	$('#profileImg').attr("src", 'http://www.gravatar.com/avatar/' + userEmail + '?d=mm');
	
	if(student.fadderGroup != null){
		$('#faddergroup').html('<a class="blacklink" href="#single-fadder-group-page?group-id='+student.fadderGroup.id+'">' + student.fadderGroup.groupNumber + '</a>');
	}else{
		$('#faddergroup').html('<a class="blacklink" href="#scan-qr-page">Trykk her</a>');
	}
	
	showProfile();
}

function showProfile(){
	$('#loadingforprofile').css('display', 'none');
	$('#profilediv').css('visibility', 'visible');
}