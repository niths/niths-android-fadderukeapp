$('#confirm-dialog-page').bind('pageshow', null).bind('pageinit', function() {
  $('#yes').click(function() {
    var restClient     = new RestHandler();
    var fadderChildren = JSON.parse(
      sessionStorage.getItem('fadder_children_objs'));
    var ids = '';
        
    $.each(fadderChildren, function(i, fadderChild) {
      ids += fadderChild.id + ',';
    });

    restClient.remove(
        'fadder/' + sessionStorage.getItem('fadder_group_id') + '/children/' +
          ids.slice(0, -1),
        function(data, status, xhr) {
          function goBack() {
            history.back();
          }

          if(xhr.status == 200) {
            showMsg('Sletting vellykket', goBack);
                
          } else {
            showErr(xhr.status + ': Sletting feilet', goBack);
          }

          $.mobile.hidePageLoadingMsg();
        }
    );

    return false;
  });

  $('#no').click(function() {
    history.back();
  });
});