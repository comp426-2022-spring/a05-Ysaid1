// express
const express = require('express')
const app = express();
// Set coin_routes
const coinRouter = require('./src/routes/coinRoutes');
// Set debug_routes
const debug_router = require('./src/routes/debugRoutes');
// Set db_middlware function.
const database = require('./src/middleware/dbMiddleware');
// set response middleware
const defaultResponse = require('./src/middleware/defaultResponse');
// install/require morgan
const morgan = require('morgan');
// install/require fs
const fs = require('fs');

// take in multiple inputs to command line arguement
const args = require('minimist')(process.argv.slice(2));

// help text
const help = (`
    server.js [options]
    
    --port  Set the port number for the server to listen on. Must be an integer between 1 and 65535.
    
    --debug If set to true, creates endlpoints /app/log/access/ which returns
                a JSON access log from the database and /app/error which throws
                an error with the message "Error test successful." Defaults to false.
                
    --log   If set to false, no log files are written. Defaults to true. Logs are always written to
                database.
    
    --help  Return this message and exit.
`)

// If --help or -h, echo help text to STDOUT and exit.
if (args.help ||args.HELP || args.h) {
    console.log(help);
    process.exit(0);
}

// take in the 4 different parameters
args['port', 'debug', 'log', 'help'];

// Initializing port to 5000 or user input
const port = args.port || process.env.PORT || 5000;
const debug = args.debug;
const log = args.log;

// Allow html files
app.use(express.static('./public'));
// Make Express use its JSON body data.
app.use(express.urlencoded({ extended: true }));
// Make sure to allow json on endpoints
app.use(express.json());
//if log is true then write to the file
if(log === true) {
  //allow to write on file
  const accessLog = fs.createWriteStream('access.log', { flags: 'a' })
  // Set up the middleware
  app.use(morgan('combined', { stream: accessLog }))
}

// middleware function.
app.use(database.db);


// Start the server
const server = app.listen(port, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%', port));
})

// if debug is true then access the routes.
if (debug) {
    app.use('/app', debug_router);
}
// Pass in all the coin_routes into index.js
app.use('/app', coinRouter);

// Default response 
app.use(defaultResponse.default_response);

// STDOUT sever has stopped.
process.on('SIGTERM', () => {
    server.close(() => {
        console.log('Server has stopped');
    })
})