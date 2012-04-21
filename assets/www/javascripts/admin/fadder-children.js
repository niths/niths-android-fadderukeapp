$(document).ready(function() {
	var restClient = new RestHandler();
  var fadderGroupId = sessionStorage.getItem('fadder_group_id');
  var fadderChildren = {};

  getOnlyFadderChildren();

  function getOnlyFadderChildren() {
	  
	  restClient.find('fadder/' + fadderGroupId + '/children',  function(data) {  
		  	fadderChildren = data;
		  	traverseAllFadderChildren();		
		},function(req, status, ex) {
			alert('Greide ikke hente fadderbarn');
	    	history.back();
		});
	  
//    $.ajax({
//      url:        address + 'fadder/' + fadderGroupId + '/children',
//      type:       'get',
//      cache:      false,
//      contentType : 'application/json',
//      timeout: 3000,
//      success: function(data) {
//    	  fadderChildren = data;
//    	  traverseAllFadderChildren();
//      },
//      error:   function(xhr) {
//    	  alert('Greide ikke hente fadderbarn');
//    	  history.back();
//      }
//    });
  }
    function traverseAllFadderChildren() {
      $.each(fadderChildren, function(i, fadderChild) {
        $('#fadder-children-collection').append(
            '<input type="checkbox" id="' + fadderChild.id +
              '" name="index" value="' + i + '" />' +
            '<label for="' + fadderChild.id + '">' + 
              fadderChild.firstName + ' ' +
              fadderChild.lastName +
            '</label>' 
        );
      });
      $('input:checkbox').checkboxradio();
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
      var index = vals.match(/index=\w+/g);

      if (index != null) {

        // Replace the index with the given object at that index
        var objs = index.join(',').replace(/index=/g, '').replace(/(\d+)/g,
            function(match) { return JSON.stringify(fadderChildren[match]); });

        sessionStorage.setItem('fadder_children_objs', '[' + objs + ']');

        var method = vals.match(/radio-method=[\w-]+/g).toString().replace(
            /radio-method=/g, '');

        if (method == 'delete') {
          $.mobile.changePage('confirm.html', 'pop');
        } else if (method == 'send-email') {
          $.mobile.changePage('send-email.html');
        }
      }
    }
  });
});