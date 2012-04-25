$('#scan-qr-page').live('pageinit', function() {
	
	var restClient = new RestHandler();

  $('#capture-qr-code').click(function() {
    navigator.camera.getPicture(uploadPhoto,
        function(message) { alert('get picture failed'); },
        { quality: 50, 
        destinationType: navigator.camera.DestinationType.FILE_URI }
        );


    function uploadPhoto(imageURI) {
    	$.mobile.showPageLoadingMsg();
    	var options = new FileUploadOptions();
    	options.fileKey="file";
    	options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
    	options.mimeType="image/jpeg";

    	var ft = new FileTransfer();
    	ft.upload(imageURI, restClient.baseUrl + 'fadder/scan-qr-code/' + student.id, win, fail, options);	
    }
    
    function getGroupStudentWasAddedTo(){
    	restClient.findRestricted('students/' + student.id, function(data, textStatus, jqXHR) {  
			$.mobile.hidePageLoadingMsg();
			if(jqXHR.status == '200'){
				student = data;
				alert('Du er i gruppe: ' + student.fadderGroup.groupNumber);	
				history.back();
			}else{	
				alert('Beklager, en feil skjedde');
			}
		},function(jqXHR, textStatus, errorThrown){
			alert('Beklager, en feil oppsto: ' + textStatus + errorThrown);
		});
    }

    var win =  function(r) {
    	$.mobile.hidePageLoadingMsg();
    	if(r.responseCode == 200){
    		getGroupStudentWasAddedTo();
    	}else{
    		alert('Beklager, noe er galt med QR koden');
    	}
    }

	function fail(error) {
		$.mobile.hidePageLoadingMsg();
		alert('Greide ikke lese koden');
	}
  });
  
});