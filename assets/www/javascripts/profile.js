
$(document).ready(function() {
	// alert('beforeshow');
	userEmail = "";
	if (studentId == 0) {
		$.mobile.changePage('index.html');
	} else {
		// alert(hex_md5('rosben09@nith.no'));
		getUser();
		
	}

	function getUser() {
		$.mobile.showPageLoadingMsg();
		$.ajax({
			url : address + 'students/' + studentId,
			type : 'get',
			cache : false,
			contentType : 'application/json',
			timeout : 2000,
			beforeSend : function(xhr) {
			xhr.setRequestHeader("Authorization",	"Basic YWRtaW46bml0aHNfYWRtaW4=");},
					success : function(data) {
						showUserInfo(data);
						var img = document.getElementById('profileImg');
						img.src='http://www.gravatar.com/avatar/' + userEmail;
						$.mobile.hidePageLoadingMsg();
					},
					error : function(xhr, status) {
						if (status == 'timeout') {
							alert("Greier ikke koble til server");
							$.mobile.changePage('main-menu.html');
						} else {
							alert(status);
						}
						$.mobile.hidePageLoadingMsg();
						// alert(JSON.stringify(xhr));
					}
				});
			}
		});

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
					$('#tlf').val(data[attribute]);
				} else if(attribute == "description"){
					$('#desc').val(data[attribute]);
				} else if(attribute == "gender"){
					
					var myselect = $("select#slider");
					if(data[attribute] == 'M'){
						myselect[0].selectedIndex = 0;
					}else if (data[attribute] == 'F'){
						myselect[0].selectedIndex = 1;				
					}
					myselect.slider("refresh")
				} else if (attribute == 'email'){
					userEmail = hex_md5(data[attribute]);
				}
			}
		}
	}