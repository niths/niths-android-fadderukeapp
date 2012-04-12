
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
		    		  alert("Beklager, oppdatering feilet. Pr�v igjen");
		    	  } 
		      },
		      error: function(xhr) {
		    	  alert("Beklager, en feil oppsto: " + response.getResponseHeader('error'));
		      }
		    });

		    $('form').die('submit');
		    return false;
		  });

//	function getUser() {
//		$.ajax({
//			url : address + 'students/' + studentId,
//			type : 'get',
//			cache : false,
//			contentType : 'application/json',
//			timeout : 3000,
//			beforeSend : function(xhr) {
//				xhr.setRequestHeader("Authorization","Basic YWRtaW46bml0aHNfYWRtaW4=");
//			},
//					success : function(data) {
//						showUserInfo(data);
//						var img = document.getElementById('profileImg');
//						img.src='http://www.gravatar.com/avatar/' + userEmail + '?d=mm';
//					},
//					error : function(xhr, status) {
//						if (status == 'timeout') {
//							alert("Greier ikke koble til server");
//						} else {
//							alert("Feil med server, vennligst gjenta");
//						}
//						history.back();
//						return false;
////						$.mobile.changePage('index.html');
//						// alert(JSON.stringify(xhr));
//					}
//				});
//			}
		
//function getGroup() {
//	var response;
//	response = $.ajax({
//		url : address + 'fadder/getGroupBelongingTo/' + studentId,
//		type : 'get',
//		cache : false,
//		contentType : 'application/json',
//		timeout : 3000,
//		beforeSend : function(xhr) {
//			xhr.setRequestHeader("Authorization","Basic YWRtaW46bml0aHNfYWRtaW4=");
//		},
//		success : function(data) {
//			if(response.status == 200){
//				for (obj in data){
//					if(obj == 'groupNumber'){
//						$('#faddergroup').html(data[obj]);
//					}
//				}
//				//alert("Din gruppe: " + response.responseText);
//				
//			} else{
//				$('#faddergroup').html("Ingen");
//				//alert("Du har ingen faddergruppe");
//			}
//
//		},
//		error : function(xhr, status) {
//				alert("Greide ikke hente gruppe");
//		}
//	});
//}

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
			$('#faddergroup').html(groupNumber);
		}else{
			$('#faddergroup').html("Ingen");
		}
		
		userEmail = hex_md5(student.email);

		$('#profileImg').attr("src", 'http://www.gravatar.com/avatar/' + userEmail + '?d=mm');

	}

//	function showUserInfo(data){
//		for (attribute in data) {
//			//alert(attribute +  ':' + (data[attribute]));
//			if (typeof (data[attribute]) == 'object') {
////				alert('obs : ' + attribute + ' : '
////						+ data[attribute]);
//			} else {
//				if(attribute == "firstName"){
//					$('#firstName').val(data[attribute]);
//				}else if(attribute == "lastName"){
//					$('#lastName').val(data[attribute]);
//				} else if(attribute == "telephoneNumber"){
//					$('#telephoneNumber').val(data[attribute]);
//				} else if(attribute == "description"){
//					$('#description').val(data[attribute]);
//				} else if(attribute == "gender"){
////					$("input[type='radio']").prop("checked",true).checkboxradio("refresh");
////					var myselect = $("select#gender");
//					if(data[attribute] == 'M'){
//						//alert("Male");
//						$("input[value=M]").attr('checked',true).checkboxradio('refresh');
//					}else if (data[attribute] == 'F'){
//						//alert("feMale");
//						$("input[value=F]").attr('checked',true).checkboxradio('refresh');			
//					}
////					myselect.slider("refresh")
//				} else if (attribute == 'email'){
//					userEmail = hex_md5(data[attribute]);
//				} else if (attribute == 'id'){
//					$('#id').val(data[attribute]);
//				}
//			}
//		}
//	}
//});