$(document).ready(function() {
	
//	var html = '<h2 class="withborder">Program</h2>'
//				+'<ul id ="eventlist" data-role="listview" class="ui-listview" data-inset="true">'
//		+'<li class="li-first" id="loader">'
//		   + '<h3>Laster events</h3>'
//		+'</li></ul>';
//
//	function getHeader(var headerTxt){
//		return '<h2 class="withborder">' + headerTxt + '</h2>';
//	}
//	
//	function loadEvents(){
//		$.ajax({
//		      url: address + 'events/,
//		      type: 'get',
//		      cache: false,
//		      timeout: 2000,
//		      success: function(data) {
//			      
//		      },
//		      error: function(xhr) {
//		
//		      }
//		    });
//	}
	
	//alert("program");
//	init();
//	
//	function init(){
//		loadEvents(0, 5, '#monday', 'Mandag');
//		loadEvents(5, 5, '#tuesday', 'Tirsdag');
//		loadEvents(10, 5, '#wednesday', 'Onsdag');
//	}
//	
//	  $('#refreshbtn').click(function() {
//		 init();
//	  });
//	
//	function loadEvents(first, numRes, list, header){
//		 $.ajax({
//		      url: address + 'events/paginated/' + first +'/' +numRes,
//		      type: 'get',
//		      cache: false,
//		      timeout: 2000,
//		      success: function(data) {
//			        var theHTML = '<li data-role="list-divider" data-theme="b">'+header+'</li>';
//			        for(var i=0;i<data.length;i++){	
//			        	theHTML += ['<li class="li-first"><a href="">',
//			      		            '<h3>'+data[i].name+'</h3>',
//			      		            '<p><strong>Beskrivelse: </strong>'+data[i].description+'</p>',
//			      		            '<p><strong>Start: </strong>'+data[i].startTime+'</p>',
//			      		            '</a></li>'].join('');
//
//			        }
//			        $(list).html(theHTML);
//			        $(list).listview('refresh');
//		      },
//		      error: function(xhr) {
//		    	  var theHTML = '<li data-role="list-divider" data-theme="b">'+header+'</li><li class="li-first"><h3>Ikke kontakt med server</h3></li>';
//					$(list).html(theHTML);
//			        $(list).listview('refresh');
//		      }
//		    });
//	}
});