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
//	this.baseUrl = 'http://192.168.0.105:8080/niths/'; // Ben
	
	this.baseUrl = 'http://10.21.24.105:8080/niths/';
//	this.baseUrl = 'http://ec2-46-137-44-111.eu-west-1.compute.amazonaws.com:8080/niths/';
	
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
	
	this.remove = function(modelUrl, callbackSuccess) {
		$.mobile.showPageLoadingMsg();
	    $.ajax({
	    	type: 'DELETE',
		    url: this.baseUrl + modelUrl,
		    cache: false,
		    beforeSend: function(xhr) {
	    	  	xhr.setRequestHeader("Application-key", applicationKey);
		        xhr.setRequestHeader("Application-token", applicationToken);
		        xhr.setRequestHeader("Developer-key", developerKey);
		        xhr.setRequestHeader("Developer-token", developerToken);
		        xhr.setRequestHeader("Session-token", sessionToken);
		    },
		    success: callbackSuccess,
		    error: function(jqXHR, textStatus, errorThrown){
		    	 $.mobile.hidePageLoadingMsg();
		    	 if(errorThrown == 'Unauthorized'){
		    		  alert('Beklager, du har vï¿½rt inaktiv for lenge, logg inn igjen');
		    		  sessionToken = '';
		    	  }else{
		    		  alert("Beklager, en feil oppsto: " + jqXHR.getResponseHeader('error'));		    		  
		    	  }
		    	 $.mobile.changePage('../index.html');
		    },
		    timeout:5000
		 });
	}; //End remove
	
	this.update = function(modelUrl, dataJ, callbackSuccess) {
		$.mobile.showPageLoadingMsg();
		$.ajax({
			type: 'PUT',
			url: this.baseUrl + modelUrl,
			cache: false,
			contentType: 'application/json',
			data: dataJ,
			beforeSend: function(xhr) {
				xhr.setRequestHeader("Application-key", applicationKey);
				xhr.setRequestHeader("Application-token", applicationToken);
				xhr.setRequestHeader("Developer-key", developerKey);
				xhr.setRequestHeader("Developer-token", developerToken);
				xhr.setRequestHeader("Session-token", sessionToken);
			},
			success: callbackSuccess,
			error: function(jqXHR, textStatus, errorThrown){
				$.mobile.hidePageLoadingMsg();
				if(errorThrown == 'Unauthorized'){
					alert('Beklager, du har vï¿½rt inaktiv for lenge, logg inn igjen');
					sessionToken = '';
					 $.mobile.changePage('../index.html');
				}else{
					alert("Beklager, en feil oppsto: " + jqXHR.getResponseHeader('error'));		    		  
				}
			},
			timeout:5000
		});
	}; //End update
	this.updateURL = function(modelUrl, callbackSuccess) {
		$.mobile.showPageLoadingMsg();
		$.ajax({
			type: 'PUT',
			url: this.baseUrl + modelUrl,
			cache: false,
			contentType: 'application/json',
			beforeSend: function(xhr) {
				xhr.setRequestHeader("Application-key", applicationKey);
				xhr.setRequestHeader("Application-token", applicationToken);
				xhr.setRequestHeader("Developer-key", developerKey);
				xhr.setRequestHeader("Developer-token", developerToken);
				xhr.setRequestHeader("Session-token", sessionToken);
			},
			success: callbackSuccess,
			error: function(jqXHR, textStatus, errorThrown){
				$.mobile.hidePageLoadingMsg();
				if(errorThrown == 'Unauthorized'){
					alert('Beklager, du har vï¿½rt inaktiv for lenge, logg inn igjen');
					sessionToken = '';
					$.mobile.changePage('../index.html');
				}else{
					alert("Beklager, en feil oppsto: " + jqXHR.getResponseHeader('error'));		    		  
				}
			},
			timeout:5000
		});
	}; //End update
	
	this.create = function(modelUrl, dataJ, callbackSuccess) {
		$.mobile.showPageLoadingMsg();
		$.ajax({
			type: 'POST',
			url: this.baseUrl + modelUrl,
			cache: false,
			contentType: 'application/json',
			data: dataJ,
			beforeSend: function(xhr) {
				xhr.setRequestHeader("Application-key", applicationKey);
				xhr.setRequestHeader("Application-token", applicationToken);
				xhr.setRequestHeader("Developer-key", developerKey);
				xhr.setRequestHeader("Developer-token", developerToken);
				xhr.setRequestHeader("Session-token", sessionToken);
			},
			success: callbackSuccess,
			error: function(jqXHR, textStatus, errorThrown){
				$.mobile.hidePageLoadingMsg();
				if(errorThrown == 'Unauthorized'){
					alert('Beklager, du har vært inaktiv for lenge, logg inn igjen');
					sessionToken = '';
					 $.mobile.changePage('../index.html');
				}else{
					alert("Beklager, en feil oppsto: " + jqXHR.getResponseHeader('error'));		    		  
				}
			},
			timeout:5000
		});
	}; //End update
}//End class