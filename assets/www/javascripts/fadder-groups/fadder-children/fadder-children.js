$(document).ready(function() {
  var fadderGroupId = sessionStorage.getItem('fadder_group_id');

  getFadderChildren();

  function getFadderChildren() {
    $.ajax({
      url:        address + 'fadder/' + fadderGroupId + '/get-all-children',
      type:       'GET',
      cache:      false,
      beforeSend: function(xhr) {
        xhr.setRequestHeader("Accept", "application/json");
      },
      success: function(data) {
        traverseFadderChildren(data);
        $('input:checkbox').checkboxradio();
      },
      error:   function(xhr) {
        alert(JSON.stringify(xhr));
      }
    });

    function traverseFadderChildren(fadderChildren) {
      $.each(fadderChildren, function(i, fadderChild) {
        $('#fadder-children-collection').append(
            '<input type="checkbox" id="' + fadderChild.id + '" name="id"' +
            'value="' + fadderChild.id + '" />' +
            '<label for="' + fadderChild.id + '">' + 
              fadderChild.firstName + ' ' +
              fadderChild.lastName +
            '</label>'
        );
      });
    }
  }

  $('#fadder-children-form').live('submit', function() {
    sessionStorage.setItem('fadder_children_ids', $(this).serialize());
    $.mobile.changePage('confirm.html', 'pop', true, true);
    return false;
  });

  function removeStudentFromFadderGroup(studentId) {
    $.ajax({
      url: address + 'fadder/'
      
    });
  }
});