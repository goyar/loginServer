// Load the TCP Library
net = require('net');

// Server info
const PORT = 6330;
const timeoutDuration = 1000*60*3; // How long till server recognizes client is in idle state, 3000 = 3 seconds

// Keep track of the connected clients
var clients = [];
var connections = {
    servers: [],
    clients: []
}

/**************************SERVER CODE BEGINS HERE********************************/

// Start a TCP Server
net.createServer(function (socket) {

  server = { // Helper functions
    log: function(message){           // Console.log replacements
      const PREFIX = "Server: ";
      console.log(PREFIX+message);    // Display message server message
    },
  
    clientLog: function(message, socket){
      const INDEX = clients.indexOf(socket);
      const PREFIX = "Client["+INDEX+"]: ";      
      console.log(PREFIX+message);    // Display message from client
    },
  
    removeClient: function(socket){   // Removes client from the list of clients 
      const INDEX = clients.indexOf(socket);
      clients.splice(INDEX, 1);
    }
  
  }

  // Identify this client
  socket.name = (socket.remoteAddress + ":" + socket.remotePort).trim();

  // Put this new client in the list
  clients.push(socket);
  /* clients.push({
      
  }); */
  server.log("Total clients: " + clients.length);

  // Send a welcome message
  socket.write("Welcome " + socket.name);

  // Handle incoming messages from clients.
  socket.on('data', function (data) {
    server.clientLog(data, socket);
    if(clients.length>1){
        clients[0].write(data);
    } else {
        socket.write(data); // echo back to client
    }
    for(x in clients){
        console.log(clients[x].name);
    }
  });

  // Remove the client from the list when it leaves
  socket.on('end', function () {
    const INDEX = clients.indexOf(socket); 
    server.log('client['+INDEX+'] removed from list of clients.')
    server.removeClient(socket);
    server.log(clients.length + " client(s) remain connected.");
  });

  socket.on('error', (err) => {
    
    const INDEX = clients.indexOf(socket); 

    // handle errors here
    const ABRUPT_DISCONNECT = 'ECONNRESET';

    if(err.code == ABRUPT_DISCONNECT){
      
      server.log('Connection with client[' + INDEX + '] ended abruptly.');
      server.log('Removing client[' + INDEX + '] from list of clients.');
      server.removeClient(socket);
      socket.destroy();
      server.log(clients.length + " client(s) remain connected.");
    }
  
    //throw err; // terminates program
  });
  
  // Handles clients that have been inactive
  socket.setTimeout(timeoutDuration);// how many milliseconds till the server recognizes the client as idle?

  socket.on('timeout', () => {

  const INDEX = clients.indexOf(socket); 
  server.log('Client[' + INDEX + ']  timed out');
  //socket.destroy();
});

}).listen(PORT);

// Put a friendly message on the terminal of the server.
console.log("Server: Up and running on port " + PORT);

/**************************SERVER CODE ENDS HERE********************************/