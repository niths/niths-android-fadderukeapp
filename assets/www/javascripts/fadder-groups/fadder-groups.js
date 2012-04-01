$(document).ready(function() {
  loadFadderGroups();

  function loadFadderGroups() {
    $.ajax({
      url: address + 'fadder',
      type: 'GET',
      cache: false,
      success: function(data) {
        traverseFadderGroups(data);
      },
      error: function(xhr) {
        alert(JSON.stringify(xhr));
      }
    });

    function traverseFadderGroups(fadderGroups) {
      $.each(fadderGroups, function(i, fadderGroup) {
        displayFadderGroup(fadderGroup);
      });

      $('ul').listview('refresh');
    }

    function displayFadderGroup(fadderGroup) {
      $('ul').append(
          '<li><a id="' + fadderGroup.id + '">' +
            fadderGroup.groupNumber +
          '</a></li>');
    }

    $('ul a').live('click', function(event) {
      sessionStorage.setItem('fadder_group_id', event.target.id);
      $.mobile.changePage('fadder-group-info.html');
    });
  }
});