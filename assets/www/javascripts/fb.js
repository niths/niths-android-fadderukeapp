$('#Gallery1').live('pageshow', function(e) {
					
	var galleryUrl = '';
	var standardURL = 'https://graph.facebook.com/10150304760787369/photos';
	
	refresh();

	function showImgs() {
		$('#galleryloader').css('display', 'none');
		$('#gallerycontent').css('visibility', 'visible');
	}

	$('#refreshGalleryBtn').click(function() {
		refresh();
	});

	function refresh() {
		$('#galleryloader').css('display', 'block');
		$('#gallerycontent').css('visibility', 'hidden');

		getLatestImages();
	}

					/**
					 * Selects an album from facebook Replace the id with the
					 * album id you want to display the lastest 25.
					 * 
					 * Open browser, go to facebook, select album, copy paste id
					 * from url
					 */
					function getLatestImages() {
						
						if(galleryUrl == ''){
							restClient.findRestricted('sociallinks?socialCommunity=facebook&category=fadderuka',  function(data) { 

							if(data.length >= 1){
								galleryUrl = data[0].address;
							}else {
								galleryUrl = standardURL;
							}
								getImgFace(galleryUrl);

							}, function(req, status, ex) {
								getImgFace(standardURL);

							});
						}else {
							getImgFace(galleryUrl);
						}
						
//						$
//								.ajax({
//									url : 'https://graph.facebook.com/10150304760787369/photos',
//									dataType : 'json',
//									type : 'GET',
//									timeout : 5000,
//									success : function(album) {
//										handleImgsData(album.data);
//									},
//									error : function() {
//										showErr('Ikke kontakt med facebook',
//												null);
//									}
//								});
					}
					
					function getImgFace(faceUrl){
						$.ajax({
						url: faceUrl,
						dataType: "json",
						type: 'get',
						timeout: 5000,
						success: function(album){
						handleImgsData(album.data);
						},
						error: function(){
						alert('Ikke kontakt med facebook');
						}
						});
						}

					/**
					 * Selects two images, one low res thumb, on normal from
					 * facebook json response
					 */
					function handleImgsData(images) {
						var html = '';
						for ( var i = 0; i < images.length; i++) {
							var imgT = images[i].images[6]['source'];
							var imgN = images[i].images[4]['source'];
							$('#lastPics').append(
									'<li><a href="' + imgN
											+ '" rel="external">'
											+ '<img src="' + imgT
											+ '" alt="NITHs" /></a></li>');
						}

						var currentPage = $(e.target);
						var p = Code.PhotoSwipe.getInstance(currentPage.attr('id'));

						if (p != null) {
							Code.PhotoSwipe.detatch(p);
						}

						var currentPage = $(e.target), options = {};
						$("ul.gallery a", e.target).photoSwipe(options,
								currentPage.attr('id'));

						showImgs();
					}
				});