var express = require('express');
var SignalRJS = require('signalrjs');
var users = [];
var signalR = SignalRJS();
//-----------------------------------

signalR.hub('chatHub',{
	privateSend : function(fromUserName,toUserName,message){
		this.clients.user(toUserName).invoke('onPrivateMessage1').withArgs([fromUserName,message])
		console.log('privateSend from('+fromUserName+') to('+toUserName+') message:'+message);
	},
	publicSend : function(fromUserName,message){
		this.clients.all.invoke('broadcast').withArgs([fromUserName,message]);
		console.log("broadcast : "+ message);
	}
});

var server = express();
//server.use(morgan('dev'));
server.use(express.static(__dirname));
server.use(signalR.createListener())
server.listen(3000);
signalR.on('CONNECTED',function(){
	console.log('connected');
});

