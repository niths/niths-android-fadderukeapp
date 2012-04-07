$(document).ready(function() {

  $('#capture-qr-code').click(function() {
    navigator.camera.getPicture(

        function(imageData) {
          console.log(imageData);
          $.mobile.showPageLoadingMsg();
          scanImage();

          function scanImage() {

            // Send a POST to scan the image and return the id of the
            // corresponding fadder group
            $.ajax({
              url:     address + 'fadder/scan-qr-code',
              type:    'POST',
              data:    imageData,
              success: function(data, status, xhr) {
                getFadderGroup();

                function getFadderGroup() {

                  // Get the fadder group based on the id
                  $.ajax({
                    url:     address + xhr.getResponseHeader('location'),
                    type:    'GET',
                    success: function(data) {
                      $.mobile.hidePageLoadingMsg();
                      student.fadderGroup = data;
                    },
                    error:   function(xhr) {
                      $.mobile.hidePageLoadingMsg();
                      alert(JSON.stringify(xhr));
                    }
                  });
                }
              },
              error:   function(xhr) {
                alert(JSON.stringify(xhr));
              }
            });
          }
        },
        function(error) {
          alert(error);
        }
        , { quality: 50, destinationType : Camera.DestinationType.DATA_URL }
    );
  });
});