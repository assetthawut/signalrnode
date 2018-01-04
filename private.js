var express = require('express');
var SignalRJS = require('signalrjs');
//var morgan = require('morgan');
var users = [];

var signalR = SignalRJS();
signalR.hub('chatHub',{
	broadcast : function(fromUserName,message){
		this.clients.all.invoke('broadcast').withArgs([fromUserName,message])
		console.log('broadcasting:'+message);
	},
	privateSend : function(fromUserName,toUserName,message){
		this.clients.user(toUserName).invoke('onPrivateMessage1').withArgs([fromUserName,message])
		console.log('privateSend from('+fromUserName+') to('+toUserName+') message:'+message);
	},
	privateSet : function(fromuser,touser,message){
		//this.clients.user(touser).invoke('onprivate').withArgs([fromuser,message]);
		this.clients.user(touser).invoke('onPrivateMessage1').withArgs([fromuser,message])
		console.log(' private2 from ' +fromuser+ ' to '+ touser + ' with message '+message);
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
