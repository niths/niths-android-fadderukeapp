/**
 * REST CLIENT
 * Class that handles ajax calls to the API
 * 
 * HOW TO:
 * $("#your-page-id").live('pageshow', function() {
 *	
 *		var restClient = new RestHandler();
 *		
 *		restClient.find('someUrl', 
 *					function(data, status, e) {}, //Success callback
 *					function(jqXHR, textStatus, errorThrown){} //Error callback
 *		);
 *
 * });
 */
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