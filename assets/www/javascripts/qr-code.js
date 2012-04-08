$(document).ready(function() {
  $( "#yourformid" ) .attr( "enctype", "multipart/form-data" ) .attr( "encoding", "multipart/form-data" );



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
              url:         address + 'fadder/scan-qr-code',
              type:        'POST',
              contentType: 'text/plain',
              data:        imageData,
              success:     function(data, status, xhr) {
                getFadderGroup();

                function getFadderGroup() {

                  // Get the fadder group based on the id
                  $.ajax({
                    url:     address + xhr.getResponseHeader('location'),
                    type:    'GET',
                    complete: function() {
                      $.mobile.hidePageLoadingMsg();
                    },
                    success: function(data) {
                      student.fadderGroup = data;
                    },
                    error:   function(xhr) {
                      alert(JSON.stringify(xhr));
                    }
                  });
                }
              },
              error:   function(xhr) {
                $.mobile.hidePageLoadingMsg();
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