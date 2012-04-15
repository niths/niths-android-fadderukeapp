$("#dashboard-page").live('pageshow', function() {
	getImages();
});

function getImages(){
	$.ajax({
        url: "https://graph.facebook.com/10150304760787369/photos",
        dataType: "json",
        type: 'get',
        success: function(album){
        	$('#imageslider').html('<div id="imgss" data-scroll="x" class="threeByThree">');
           // var imgs = album.data[3].images;
            var imgss = album.data;
            for (var i = 0; i<1; i++){
//          for (var i = 0; i<imgss.length; i++){
            	var img = imgss[i].images[4]['source'];
            	$('#imageslider').append('<div class="square"><img src="'+img+'" /></div>');
            	
            	// $('#imageslider').append('<div class="square"><img src="../images/mm.jpg" /></div><div class="square"><img src="../images/mm.jpg" /></div><div class="square"><img src="../images/mm.jpg" /></div>');
            }
            $('#imageslider').append('</div>');
            $('#imgss').scrollview();
            $('#imageslider').trigger('create');
        },
        error: function(){
            alert('error');
        }
  });
}