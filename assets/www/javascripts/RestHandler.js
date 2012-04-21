function RestHandler(){
	this.baseUrl = 'http://192.168.0.105:8080/niths/';
	
	this.find = function(modelUrl, callbackSuccess, callbackError) {
	    $.ajax({
	      type: 'GET',
	      url: this.baseUrl + modelUrl,
	      contentType: 'application/json',
	      cache: false,
	      success: callbackSuccess,
	      error: callbackError,
	      timeout:5000
	    });
	}; //End find
	
}//End class