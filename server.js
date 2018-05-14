
const app = require('./server/app');
const debug = require('debug')('node-rest:server');
const http = require('http');

/**
 * Get port from environment variable
 */
const port = process.env.PORT || '3000';

/**
 * Create HTTP server
 */
const server = http.createServer(app);
server.listen(port, () => {
    console.log("Server is up on port 3000");
});
server.on("error", onError);
server.on("listening", onListening);

/**
 * Event listener in case of error
 */
function onError(error) {

    if(error.syscall !== 'listen') {
        throw error;
    }

    let bind = typeof port === 'string' ? 'Pipe ' + port : 'Port' + port;

    switch(error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event
 */

 function onListening() {
     let address = server.address();
     let bind = typeof address === 'string' ? 'Pipe ' + address : 'Port' + address.port;
     debug('Listening on ' + bind);
 }


