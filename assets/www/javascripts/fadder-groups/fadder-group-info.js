$(document).ready(function() {
  getFadderGroupInfo();

  function getFadderGroupInfo() {
    $.ajax({
      url: address + 'fadder/' + sessionStorage.getItem('fadder_group_id'),
      type: 'GET',
      success: function(data) {
        traverseAttributes(data);
        $('#fadder-group-info-leaders-list').listview('refresh');
        $('#fadder-group-info-list').listview('refresh');
      },
      error: function(xhr) {
        alert(JSON.stringify(xhr));
      }
    });
  }

  function traverseAttributes(fadderGroup) {
    for (attribute in fadderGroup) {
      if (typeof (fadderGroup[attribute]) == 'object') {

        // We must at some time check for the list of leaders in order to
        // display them since the order of objects of a fadder group may be
        // arbitrary.
        if (attribute == 'leaders') {
          traverseFadderLeaderAttributes(fadderGroup[attribute]);
        } 
      } else {
        $('#fadder-group-info-list').append(
            '<li>' +
              '<span class="key">' + attribute + '</span>' +
              '<span class="val">' + fadderGroup[attribute] + '</span>' +
            '</li>'
        );
      }
    }

    function traverseFadderLeaderAttributes(fadderLeaders) {
      $.each(fadderLeaders, function(i, fadderLeader) {
        $('#fadder-group-info-leaders-list').append(
            '<li>' +
              '<a id=fadder-leader-"' + fadderLeader.id + '">' +
                fadderLeader.firstName + ' ' + fadderLeader.lastName +
              '</a>' +
            '</li>');
      });
    }
  }
});