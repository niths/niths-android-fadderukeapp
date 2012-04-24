$('#scan-qr-page').live('pageinit', function() {
	
	var restClient = new RestHandler();

//$(document).ready(function() {

  $('#capture-qr-code').click(function() {
    navigator.camera.getPicture(uploadPhoto,
        function(message) { alert('get picture failed'); },
        { quality: 50, 
        destinationType: navigator.camera.DestinationType.FILE_URI }
        );


function uploadPhoto(imageURI) {
var options = new FileUploadOptions();
options.fileKey="file";
options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
options.mimeType="image/jpeg";

var ft = new FileTransfer();
ft.upload(imageURI, restClient.baseUrl + 'fadder/scan-qr-code/' + student.id, win, fail, options);
}

var win =  function(r) {
	if(r.responseCode == 200){
		 
		 restClient.findRestricted('students/' + student.id, function(data, textStatus, jqXHR) {  
			$.mobile.hidePageLoadingMsg();
			if(jqXHR.status == '200'){
				student = data;
				alert('Du er i gruppe: ' + student.fadderGroup.groupNumber);	
			}else{
				alert("Beklager, en feil skjedde");
			}
		},function(jqXHR, textStatus, errorThrown){
			alert('Beklager, en feil oppsto: ' + textStatus + errorThrown);
		});
	}
}

function fail(error) {
alert("An error has occurred: Code = " = error.code);
}
  });
//});
  
});