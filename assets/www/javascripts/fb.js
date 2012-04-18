$("#gallery-page").live('pageshow', function() {
	getImages();
});

function showImgs(){
	$('#loadingforprofile').css('display', 'none');
	$('#galleryimages').css('visibility', 'visible');
}

function getImages(){
	$.ajax({
        url: "https://graph.facebook.com/10150304760787369/photos",
        dataType: "json",
        type: 'get',
        timeout: 5000,
        success: function(album){
        	handleImgsData(album.data);
        },
        error: function(){
        	$('#galleryimages').html('<h3>Fikk ikke kontakt med facebook</h3>');
        	showImgs();
        }
  });
}

function handleImgsData(images){
	var html = '';
	for (var i = 0; i<images.length; i++){
    	var img = images[i].images[4]['source'];
    	html += '<div class="imagewrapper"> <img class ="fbimage" src="' + img + '" /></div>';
    }
	$('#galleryimages').html(html);
	showImgs();
}