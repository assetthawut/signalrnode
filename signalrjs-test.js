var express = require('express');
var SignalRJS = require('signalrjs');
 
//Init SignalRJs 
var signalR = SignalRJS();
 
//Create the hub connection 
//NOTE: Server methods are defined as an object on the second argument 
signalR.hub('chatHub',{
    send : function(userName,message){
        this.clients.all.invoke('broadcast').withArgs([userName,message])
        console.log('send:'+message);
    },

   	chat : function(message){
   		this.clients.all.invoke('chattext').withArgs([message]);

   	},
   	
   	privatechat : function(fromUser,message,toUser){
   		this.clients.user(toUser).invoke('chatto').withArgs([fromUser,message]);
   	}


});




 


var server = express();
server.use(express.static(__dirname));
server.use(signalR.createListener())
server.listen(3000);


