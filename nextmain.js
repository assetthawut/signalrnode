var http = require('http');
var fs = require('fs');
var url = require('url');




// Create a server
http.createServer( function (request, response) {  
   // Parse the request containing file name
   console.log(request.url);
   var pathname = url.parse(request.url).pathname;
   console.log("PathName : "+pathname);
   console.log("Sub : "+pathname.substr(1));
   
   // Print the name of the file for which request is made.
   console.log("Request for " + pathname + " received.");
   
   // Read the requested file content from file system
   fs.readFile(pathname.substr(1), function (err, data) {
      if (err) {
         console.log(err);
         // HTTP Status: 404 : NOT FOUND
         // Content Type: text/plain
         response.writeHead(404, {'Content-Type': 'text/html'});
      }else {	
         //Page found	  
         // HTTP Status: 200 : OK
         // Content Type: text/plain
         response.writeHead(200, {'Content-Type': 'text/html'});	
         
         // Write the content of the file to response body
         response.write(data.toString());		
      }
      // Send the response body 
      response.end();
   });   
}).listen(8081);

// Console will print the message
console.log('Server running at http://127.0.0.1:8081/');


//-------------------------------------------------------------------
//var http = require('http');
var signalR = require('signalr-client');
var client  = new signalR.client(

	//signalR service URL
	"http://localhost:61198/signalr",

	// array of hubs to be supported in the connection
	['chathub'],
    //, 10 /* Reconnection Timeout is optional and defaulted to 10 seconds */
    //, false /* doNotStart is option and defaulted to false. If set to true client will not start until .start() is called */
    true
);

console.log("Test");


client.on(
	//Hub Name 
	"chathub",
	//Method name
	"hello",
	//Callback
	function(){
			console.log("Hello Alert");
		}
	);



//console.log(client);
/*
client.handlers.chathub = {

	hello:function(){
		console.log("Test >>> From Hello");
	}
};
*/






client.serviceHandlers.connected = function(){

	console.log("Connect >>> ");
	client.invoke(
			'chathub',
			'hello'
			);
};










/*
setInterval(function(){
		console.log("Thailand!!!");
		client.invoke(
			'chathub',
			'hello'

			);

},2000);
*/

//client.start();

//----------------------


var Testvar = "Joejoe";