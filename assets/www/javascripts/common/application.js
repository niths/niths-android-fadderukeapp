//address = 'http://192.168.0.105:8080/niths/'; //Ben

address = 'http://ec2-46-137-44-111.eu-west-1.compute.amazonaws.com:8080/niths/';

student = {};
sessionToken = '';

applicationKey = '';
applicationToken ='';
developerToken ='';
developerKey ='';


htmlEncode = function(s) {
	 encodedHtml = escape(s);
	 encodedHtml = encodedHtml.replace(/\//g,"%2F");
	 encodedHtml = encodedHtml.replace(/\?/g,"%3F");
	 encodedHtml = encodedHtml.replace(/=/g,"%3D");
	 encodedHtml = encodedHtml.replace(/&/g,"%26");
	 encodedHtml = encodedHtml.replace(/@/g,"%40");
	 return encodedHtml;
}
