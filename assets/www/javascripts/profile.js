$(document).ready(function() {
	$.mobile.showPageLoadingMsg();
	userEmail = "";
	if (studentId < 1) {
		$.mobile.changePage('index.html');
	} else {
		getUser();
		getGroup();
		$.mobile.hidePageLoadingMsg();
	}
	
	$.fn.serializeObject = function()
	{
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
	
	  $('#submit').click(function() {
		  var response;
		  response = $.ajax({
		      url: address + 'students',
		      type: 'PUT',
		      cache: false,
		      contentType: 'application/json',
		      beforeSend: function(xhr) {
		        xhr.setRequestHeader("Authorization", "Basic YWRtaW46bml0aHNfYWRtaW4=");
		      },
		      data:  JSON.stringify($("#update-person-form").serializeObject()),
		      success : function(data){
		    	  if(response.status == 200){
		    		  alert("Oppdatering vellykket");
		    	  }else{
		    		  alert("Beklager, oppdatering feilet. Prøv igjen");
		    	  }
//		    	  alert(response.getResponseHeader('error'));
//		    	alert("success " + response.status);  
		      },
		      error: function(xhr) {
		    	  alert("Beklager, en feil oppsto: " + response.getResponseHeader('error'));
		      }
		    });

		    $('form').die('submit');
		    return false;
		  });

	function getUser() {
		$.ajax({
			url : address + 'students/' + studentId,
			type : 'get',
			cache : false,
			contentType : 'application/json',
			timeout : 2000,
			beforeSend : function(xhr) {
				xhr.setRequestHeader("Authorization","Basic YWRtaW46bml0aHNfYWRtaW4=");
			},
					success : function(data) {
						showUserInfo(data);
						var img = document.getElementById('profileImg');
						img.src='http://www.gravatar.com/avatar/' + userEmail + '?d=mm';
					},
					error : function(xhr, status) {
						if (status == 'timeout') {
							alert("Greier ikke koble til server");
						} else {
							alert(status);
						}
						$.mobile.changePage('main-menu.html');
						// alert(JSON.stringify(xhr));
					}
				});
			}
		});
function getGroup() {
	var response;
	response = $.ajax({
		url : address + 'fadder/getGroupBelongingTo/' + studentId,
		type : 'get',
		cache : false,
		contentType : 'application/json',
		timeout : 2000,
		beforeSend : function(xhr) {
			xhr.setRequestHeader("Authorization","Basic YWRtaW46bml0aHNfYWRtaW4=");
		},
		success : function(data) {
			if(response.status == 200){
				alert("Din gruppe: " + response.responseText);
				$('#downer').text(response.responseText);
			} else{
				$('#downer').text("Ingen gruppe");
				alert("Du har ingen faddergruppe");
			}

		},
		error : function(xhr, status) {
				alert(status);
		}
	});
}

	function showUserInfo(data){
		for (attribute in data) {
			//alert(attribute +  ':' + (data[attribute]));
			if (typeof (data[attribute]) == 'object') {
//				alert('obs : ' + attribute + ' : '
//						+ data[attribute]);
			} else {
				if(attribute == "firstName"){
					$('#firstName').val(data[attribute]);
				}else if(attribute == "lastName"){
					$('#lastName').val(data[attribute]);
				} else if(attribute == "telephoneNumber"){
					$('#telephoneNumber').val(data[attribute]);
				} else if(attribute == "description"){
					$('#description').val(data[attribute]);
				} else if(attribute == "gender"){
					
					var myselect = $("select#gender");
					if(data[attribute] == 'M'){
						myselect[0].selectedIndex = 0;
					}else if (data[attribute] == 'F'){
						myselect[0].selectedIndex = 1;				
					}
					myselect.slider("refresh")
				} else if (attribute == 'email'){
					userEmail = hex_md5(data[attribute]);
				} else if (attribute == 'id'){
					$('#id').val(data[attribute]);
				}
			}
		}
	}