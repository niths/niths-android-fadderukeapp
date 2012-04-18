$(document).ready(function() {

  $('form').submit(function() {
    var vals = $(this).serialize();
    validateInput();

    return false;

    function validateInput() {
      var subject     = vals.match(/subject=[\w_-]+/g);
      var messageBody = vals.match(/message-body=[\w_-]+/g);

      if (subject != null) {
        subject = subject.toString().replace('subject=', '');

        if (messageBody != null) {
          messageBody = messageBody.toString().replace('message-body=', '');

          sendEmail();

          function sendEmail() {
            $.mobile.showPageLoadingMsg();

            var objs = JSON.parse(
                sessionStorage.getItem('fadder_children_objs'));
            var recipientAddresses = '';

            $.each(objs, function(i, fadderChild) {
              recipientAddresses += '"' + fadderChild.email + '",';
            });

            // The email which is to be sent to the server
            var jsonEmail =
              '{' + 
                '"senderName": "' +
                  student.firstName + ' ' +
                  student.lastName + '", ' +
                '"recipientAddresses": ' +
                  '[' + recipientAddresses.slice(0, -1) + '], ' +
                '"subject": "' + subject + '", ' + 
                '"body": "' + messageBody + '" ' +
              '}';

            $.ajax({
              url:         address + 'broadcast',
              type:        'POST',
              cache:       false,
              beforeSend:  function(xhr) {
                xhr.setRequestHeader(
                    "Authorization",
                    "Basic YWRtaW46bml0aHNfYWRtaW4=");
              },
              contentType: 'application/json',
              data:        jsonEmail,
              success:     function(data) {
                $.mobile.hidePageLoadingMsg();
                $.mobile.changePage('#single-faddergroup-admin-page');
              },
              error:       function(xhr) {
                alert(JSON.stringify(xhr));
              }
            });

          }
        } else {
          alert("Skriv inn en gyldig beskjed");
        }

      } else {
        alert("Skriv inn en gyldig tittel");
      }
    }
  });
});