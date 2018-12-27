var tcpClientCon = require('./commons/connectors/tcpConnector');
tcpClientCon.connectToServer(function(){
    console.log("client connected");
});
tcpClientCon.receiveData(function(data){
    console.log("msg rcved says: " + data);
});
var msg;
setTimeout(function() {
    msg = {
        dest: 'login',
        user: 'charles',
        action: 'login'
    }
    
    tcpClientCon.write(JSON.stringify(msg));
    setTimeout(function() {
        msg = {
            dest: 'logout',
            user: 'charles',
            action: 'login'
        }
        tcpClientCon.write(JSON.stringify(msg));
        setTimeout(function() {
            msg = {
                dest: 'delete',
                user: 'charles',
                action: 'login'
            }
            tcpClientCon.write(JSON.stringify(msg));
        }, 3000);
    }, 3000);
}, 3000);