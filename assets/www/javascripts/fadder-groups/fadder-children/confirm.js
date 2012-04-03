$(document).ready(function() {
  $('#yes').click(function() {
    $.ajax({
      // Building the URL describing which students to remove from the group
      url: address + 'fadder/' + sessionStorage.getItem('fadder_group_id') +
          '/remove-children/' + sessionStorage.getItem('fadder_children_ids')
          .replace(/id=/g, '').replace(/&/g, ','),
      type: 'DELETE',
      cache: false,
      beforeSend: function(xhr) {
        xhr.setRequestHeader("Authorization", "Basic YWRtaW46bml0aHNfYWRtaW4=");
      },
      success: function() {
        history.back();
      },
      error: function(xhr) {
        alert(JSON.stringify(xhr));
      }
    });
  });

  $('#no').click(function() {
    history.back();
  });
});