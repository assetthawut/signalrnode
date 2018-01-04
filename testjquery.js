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

         require("jsdom/lib/old-api").env("", function(err, window) {
		    if (err) {
		        console.error(err);
		        return;
		    }
 
    		var $ = require("jQuery")(window);
  			  //------- Jquery Start -------

			$(function() {
    				console.log( "ready!" );
    				$('#test').append("Test ????? >>>>>");
				});
			});
      }
      // Send the response body 
      response.end();
   });   
}).listen(8081);

// Console will print the message
console.log('Server running at http://127.0.0.1:8081/');







