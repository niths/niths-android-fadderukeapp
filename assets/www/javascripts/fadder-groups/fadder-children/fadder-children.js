$(document).ready(function() {
  getFadderChildren();

  function getFadderChildren() {
    $.ajax({
      url:        address + 'fadder/' +
                      sessionStorage.getItem('fadder_group_id') +
                      '/get-all-children',
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
    alert($(this).serialize());
    //$.mobile.changePage('confirm.html', 'pop', true, true);
    return false;
  })
});