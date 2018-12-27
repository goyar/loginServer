var net = require('net');
const globals = require('../../cfg/globals.js');

var tcpCon = new net.Socket();

tcpCon["targetIP"] = globals.tcp.targetIP;
tcpCon["targetPort"] = globals.tcp.targetPort;

tcpCon['log'] = function(message){ //console log with 'Client: ' prefix
	const PREFIX = "Client: ";
	console.log(PREFIX+message);
}

tcpCon['serverLog'] = function(message){ //console log with 'Server: ' prefix
	const PREFIX = "Server: ";
	console.log(PREFIX+message);
}

/**************************CLIENT CODE BEGINS HERE********************************/
// Each client event(e.g connect, disconnect, receive data) is wrapped in a function
// The wrapper takes a function as a parameter
// The function is defined in the js file that this module is required in
// In another file, you would do client.connectToServer(myCallbackFunction)

tcpCon["connectToServer"] = function(myCallback){
	tcpCon.connect(tcpCon.targetPort, tcpCon.targetIP, function(){
		myCallback();
	});
}

tcpCon["receiveData"] = function(myCallback){
	tcpCon.on('data', function(data) { // Received data
		myCallback(data);
	});
}

tcpCon["closeConnection"] = function(myCallback){
	tcpCon.on('close', function() { // Client & server connection ended
		myCallback()
	});
}

tcpCon["processErrors"] = function(myCallback){
	tcpCon.on('error', (err) => { // Handle client errors here
		myCallback(err);
	  });
}

module.exports = tcpCon;