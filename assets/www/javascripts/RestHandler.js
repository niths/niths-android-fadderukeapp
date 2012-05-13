/**
* REST CLIENT
 * Class that handles ajax calls to the API
 * 
 * HOW TO:
 * $("#your-page-id").live('pageshow', function() {
 *  
 *    var restClient = new RestHandler();
 *    
 *    restClient.find('someUrl', 
 *          function(data, status, e) {}, //Success callback
 *          function(jqXHR, textStatus, errorThrown){} //Error callback
 *    );
 *
 * });
 */
function RestHandler(){
//  this.baseUrl = 'http://192.168.0.105:8080/niths/'; // Ben
  this.baseUrl = 'http://ec2-46-137-46-84.eu-west-1.compute.amazonaws.com:8080/niths/';

  
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
  
  this.findRestricted = function(modelUrl, callbackSuccess, callbackError) {
    $.ajax({
      type: 'GET',
      url: this.baseUrl + modelUrl,
      contentType: 'application/json',
      cache: false,
      beforeSend: setReqHeaders,
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
        beforeSend: setReqHeaders,
        success: callbackSuccess,
        error: function(jqXHR, textStatus, errorThrown){
          handleError(errorThrown, jqXHR);
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
      beforeSend: setReqHeaders,
      success: callbackSuccess,
      error: function(jqXHR, textStatus, errorThrown){
        handleError(errorThrown, jqXHR);
      },
      timeout:5000
    });
  }; //End update
  this.updateURL = function(modelUrl, callbackSuccess) {
    $.mobile.showPageLoadingMsg();
    $.ajax({
      type: 'POST',
      url: this.baseUrl + modelUrl,
      cache: false,
      contentType: 'application/json',
      beforeSend: setReqHeaders,
      success: callbackSuccess,
      error: function(jqXHR, textStatus, errorThrown){
        handleError(errorThrown, jqXHR);
      },
      timeout:5000
    });
  }; //End update
  this.updateWithCallbacks = function(modelUrl, json, callbackSuccess, callbackError) {
    $.mobile.showPageLoadingMsg();
    $.ajax({
      type: 'POST',
      url: this.baseUrl + modelUrl,
      cache: false,
      data: json,
      contentType: 'application/json',
      beforeSend: setReqHeaders, 
      success: callbackSuccess,
      error: callbackError,
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
      beforeSend: setReqHeaders,
      success: callbackSuccess,
      error: function(jqXHR, textStatus, errorThrown){
        handleError(errorThrown, jqXHR);
      },
      timeout:10000
    });
  }; //End update

  function setReqHeaders(xhr) {
    xhr.setRequestHeader(
        "Application-key",
        sessionStorage.getItem('app_key'));
    xhr.setRequestHeader(
        "Application-token",
        sessionStorage.getItem('app_token'));
    xhr.setRequestHeader(
        "Developer-key",
        sessionStorage.getItem('dev_key'));
    xhr.setRequestHeader(
        "Developer-token",
        sessionStorage.getItem('dev_token'));
    xhr.setRequestHeader(
        "Session-token",
        sessionStorage.getItem('session_token'));
  }

  function handleError(errorThrown, jqXHR){
    $.mobile.hidePageLoadingMsg();
    if (errorThrown == 'Unauthorized') {
      showErr(
          'Beklager, du har vært inaktiv for lenge, logg inn igjen',
          function() {
            sessionStorage.setItem('session_token', ''); 
            $.mobile.changePage('#dashboard-page');
          }
      );
    } else {
      showErr(
          "Beklager, en feil oppsto: " + jqXHR.getResponseHeader('error'),
          null
      );
    }
  }
} //End class