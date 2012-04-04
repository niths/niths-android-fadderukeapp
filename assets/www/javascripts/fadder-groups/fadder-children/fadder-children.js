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

  $('#radio-delete').click(function() {
    $('#fadder-children-form').attr('action', 'confirm.html');
  });

  $('#radio-send-email').click(function() {
    $('#fadder-children-form').attr('action', 'send-email.html');
  });

  $('#fadder-children-form').live('submit', function() {
    var vals = $(this).serialize();
    validateForm();

    return false;

    function validateForm() {
      var ids = vals.match(/id=\w+/g);

      if (ids != null) {
        sessionStorage.setItem(
            'fadder_children_ids',
            ids.join(',').replace(/id=/g, ''));
        var method = vals.match(/radio-method=[\w-]+/g).toString().replace(
            /radio-method=/g, '');

        if (method == 'delete') {
          $.mobile.changePage('confirm.html', 'pop');
        } else if (method == 'send-email') {
          $.mobile.changePage('../fadder-group-info.html');
        }
      }
    }
    
  });
});