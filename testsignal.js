var http = require('http');
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