$('#scan-qr-page').live('pageinit', function() {
  
  var restClient = new RestHandler();

  $('#capture-qr-code').click(function() {
    navigator.camera.getPicture(uploadPhoto,
        function(message) { showErr('get picture failed', null); },

        // Camera options
        { quality:         50, 
          destinationType: navigator.camera.DestinationType.FILE_URI }
    );


    function uploadPhoto(imageURI) {
      $.mobile.showPageLoadingMsg();
      var options = new FileUploadOptions();
      options.fileKey = "file";
      options.fileName = imageURI.substr(imageURI.lastIndexOf('/')+1);
      options.mimeType = "image/jpeg";

      var ft = new FileTransfer();
      ft.upload(
          imageURI, restClient.baseUrl2 + 'fadder/scan-qr-code/' + student.id,
          function(res) {
            $.mobile.hidePageLoadingMsg();
            if(res.responseCode == 200) {
              getGroupStudentWasAddedTo();
            } else {
              showErr('Beklager, noe er galt med QR koden', null);
            }
          },
          function (error) {
            $.mobile.hidePageLoadingMsg();
            showErr('Greide ikke lese koden', null);
          },
          options);  
    }
    
    function getGroupStudentWasAddedTo() {
      restClient.findRestricted(
        'students/' + student.id,
        function(data, textStatus, jqXHR) {  
          $.mobile.hidePageLoadingMsg();
          if(jqXHR.status == '200'){
            student = data;
            showErr(
                'Du er i gruppe: ' + student.fadderGroup.groupNumber, null);  
            history.back();
          } else {  
            showErr('Beklager, en feil skjedde', null);
          }
        },function(jqXHR, textStatus, errorThrown){
          showErr('Beklager, en feil oppsto: ' + textStatus + ' ' +errorThrown, null);
        }
      );
    }
  });
});