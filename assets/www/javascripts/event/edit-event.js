$(document).ready(function() {
  var recursionLevel = 0;

  $.ajax({
    url: address + 'events/'+ sessionStorage.getItem('event_id'),
    type: 'GET',
    cache: false,
    success: function(data) {
      displayEditAttributes(data);
      updateLists();
      $('#edit-event').trigger('create');
    },
    error: function(xhr) {
      alert(JSON.stringify(xhr));
    }
  }); 

  $('form').live('submit', function(event) {
    $.ajax({
      url: address + '/' + findDomainName($(this)),
      type: 'PUT',
      cache: false,
      contentType: 'application/json',
      beforeSend: function(xhr) {
        xhr.setRequestHeader("Authorization", "Basic YWRtaW46bml0aHNfYWRtaW4=");
      },
      data:  JSON.stringify($(this)),
      error: function(xhr) {
        alert(JSON.stringify(xhr));
      }
    });

    $('form').die('submit');

    return false;
  });

  function displayEditAttributes(selectedEvent) {
    for (var attribute in selectedEvent) {
      if (typeof (selectedEvent[attribute]) == 'object') {
        recursionLevel++;
        addSubList(attribute);
        displayEditAttributes(selectedEvent[attribute]);
      } else {
        displayEditAttribute(attribute, selectedEvent[attribute]);
      }
    }
  }

  function displayEditAttribute(key, val) {

    // If the attribute is the id, do not make it editable
    var textVal = '<input type="text" name="' + key + '" value="'
        + val + '" '+ ((key == 'id') ? 'readonly="readonly"' : '') + ' />';

    $('#submit-element-' + recursionLevel).before(
        '<li><span class="key">' + key + '</span>' + textVal + '</li>');
  }

  function addSubList(listTitle) {
    $('#container').append(
        '<form action="event-info.html">' +
          '<ul id="edit-event-attributes-list-' + recursionLevel +
              '" data-role="listview" data-inset="true">' +
            '<li id="key-name" data-role="list-divider">' + listTitle + '</li>' +
            '<li id="submit-element-' + recursionLevel + '">' +
              '<button type="submit" data-role="button">Oppdater</button>' +
            '</li>' +
          '</ul>' +
        '</form>');
  }

  function updateLists() {
    $('#edit-event-attributes-list-0').listview('refresh');

    for (var i = 1; i <= recursionLevel; i++) {
      $('#edit-event-attributes-list-' + i).listview();
    }
  }

  function findDomainName(form) {
    var domain = 'events';
    var child = form.find('#key-name').html();

    if (child != null) {
      domain = child;

      if (child[child.length - 1] != 's') {
        domain += 's';
      }
    }

    return domain;
  }
});