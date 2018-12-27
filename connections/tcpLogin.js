const login = require("../commons/connectors/tcpConnector")

//use 'login.write("my message");' anywhere in this file to send a message to the server

function handleConnecting(){
    login.log('Connected to '+ login.targetIP + ' on port ' + login.targetPort);
	login.log("Sending string '{ Id:LoginServer, ID:1, isPlayer:false }'");
	login.write('{ "Id":"LoginServer", "ID":1, "isPlayer":false }');
}

function handleCommunication(data){
    login.serverLog(data);
}

function handleClosing(){
	login.log("Connection to server closed.");
}

function handleErrors(error){
    const ABRUPT_DISCONNECT = 'ECONNRESET';
	
		if(error.code == ABRUPT_DISCONNECT){
	
			login.log('Connection with server ended abruptly.');
			login.log('Destroying client socket.');
			login.destroy(); // Invokes 'close' event
		}
	  
		//throw err; // uncomment to terminate program
}

login.connectToServer(handleConnecting);
login.receiveData(handleCommunication);
login.closeConnection(handleClosing);
login.processErrors(handleErrors);

module.exports = login;
