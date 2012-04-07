$(document).ready(function() {
  $('#capture-qr-code').click(function() {
    navigator.camera.getPicture(onSuccess, onFail, { quality: 50, 
      destinationType: Camera.DestinationType.FILE_URI });
  });

function onSuccess(imageURI) {
    alert("succ");
    //var image = document.getElementById('myImage');
    //image.src = imageURI;
}

function onFail(message) {
    alert('Failed because: ' + message);
}
});