$('#scan-qr-page').live('pageinit', function() {
	


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
ft.upload(imageURI, address + 'fadder/scan-qr-code', win, fail, options);
}

function win(r) {
console.log("Code = " + r.responseCode);
console.log("Response = " + r.response);
console.log("Sent = " + r.bytesSent);
}

function fail(error) {
alert("An error has occurred: Code = " = error.code);
}
  });
//});
  
});