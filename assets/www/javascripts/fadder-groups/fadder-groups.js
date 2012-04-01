$(document).ready(function() {
  loadFadderGroups();

  function loadFadderGroups() {
    $.ajax({
      url: address + 'fadder',
      type: 'GET',
      beforeSend: function(xhr) {
        xhr.setRequestHeader("Authorization", "Basic YWRtaW46bml0aHNfYWRtaW4=");
      },
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
    }

    function displayFadderGroup(fadderGroup) {
      $('#fadder-groups-list').append(
          '<li id="' fadderGroup.id + '">' +
            fadderGroup.groupNumber)
    }
  }
});