    const express = require('express')
  const app = express()
  const morgan = require('morgan');
  const fs = require('fs')
  const db = require('./database.js')
  //allow reading of json
  app.use(express.json())
  app.use(express.urlencoded({extended: true}))
  // Require Express.js
  const args = require('minimist')(process.argv.slice(2))
  args['port', 'debug', 'log', 'help']
  const port = args.port || process.env.PORT || 5555;
  //set the command line arguements
  const help = args.help
  const debug = args.debug
  const log = args.log
  
  //If the command line is help, offer these solutions
  if(help == true){
    console.log('--port     Set the port number for the server to listen on. Must be an integer between 1 and 65535.\n')
    console.log('--debug    If set to `true`, creates endlpoints /app/log/access/ which returns a JSON access log from the database and /app/error which throws an error with the message "Error test successful." Defaults to `false`.\n')
    console.log('--log      If set to false, no log files are written. Defaults to true. Logs are always written to database.\n')
    console.log('--help     Return this message and exit.')
    process.exit(0)
  }
  //if log is true then write to the file
  if(log === true) {
    //allow to write on file
    const accessLog = fs.createWriteStream('access.log', { flags: 'a' })
    // Set up the middleware
    app.use(morgan('combined', { stream: accessLog }))
  }
  
  const server = app.listen(port, () => {
    console.log(`App listening on port ${port}`)
  });
  
  app.get('/app', (req, res)  => {
    res.statusCode = 200
    res.statusMessage = 'OK'
    res.writeHead( res.statusCode, {'Content-Type' : 'text/plain'})
    res.end(res.statusCode + ' ' + res.statusMessage)
  })
  
  app.use((req, res, next) => {
    let logdata = {
      remoteaddr: req.ip,
      remoteuser: req.user,
      time: Date.now(),
      method: req.method,
      url: req.url,
      protocol: req.protocol,
      httpversion: req.httpVersion,
      secure: req.secure,
      status: res.statusCode,
      referer: req.headers['referer'],
      useragent: req.headers['user-agent']
    }
    const stmt = db.prepare(`INSERT INTO accesslog (remoteaddr, remoteuser, time, method, url, protocol, httpversion, secure, status, referer, useragent) VALUES (?,?,?,?,?,?,?,?,?,?,?)`)
    const info = stmt.run(String(logdata.remoteaddr), String(logdata.remoteuser), String(logdata.time),String(logdata.method), String(logdata.url), String(logdata.protocol), String(logdata.httpversion), String(logdata.secure), String(logdata.status), String(logdata.referer), String(logdata.useragent))
    next()
  });
  
   //check if debug is true
   if (debug ==  true) {
    app.get('/app/log/access', (req, res) => {
      try {
        const stmt = db.prepare('SELECT * FROM accesslog').all()
        res.status(200).json(stmt)
        } catch(e) {
          console.error(e)
        }
  });   
  //end point for error testing
  app.get('/app/error', (req, res) => {
    res.status(500)
    throw new Error('Error test worked.')
  });
  };
  
   //endpoint for just 1 flips
   app.get('/app/flip/', (req, res) => {
      //call coin flip function
      var flip = coinFlip();
      // Respond with status 200
      res.status(200).json({ "flip" : flip });
   });
   //endpoint for coin flips given a number
   app.get('/app/flips/:number', (req, res) => {
      var flips = coinFlips(req.body.number)
      res.status(200).json({"raw" : flips, "summary" : countFlips(flips)})
  });
  
  //endpoint for calling a flip
  app.get('/app/flip/call/:guess(heads|tails)', (req, res) => {
      //call the function flip a coin and take in paramater call
      var callOfFlips = flipACoin(req.body.guess);
      // Respond with status 200
      res.status(200).json(callOfFlips);;
   });
  
  //Error handling if Endpoint does not exist
  app.use(function(req, res){
      res.status(404).send('404 NOT FOUND')
      res.type("text/plain")
  })

  /** Simple coin flip
 * @param {*}
 * @returns {string} 
 */
 function coinFlip() {
    return Math.random() > 0.5 ? ("heads") : ("tails")
  }
  
  function coinFlips(flips) {
    var arrayOfFlips = [flips]
    //loop through each flip to determine if it is heads or not
    for (var i = 0; i < flips; i++){
      arrayOfFlips[i] = coinFlip();
      //get the number of heads and tails
    }
    return arrayOfFlips;
  }
  function countFlips(array) {
    //create a new object to hold number of heads and tails
    //set heads and tails to 0
    var countOfHeadsAndTails = {heads: 0, tails: 0}
    //loop through
    for (let i = 0; i < array.length; i++){
      //increment number of heads if it is heads
      if (array[i] == 'heads'){
        //increment number of heads
        countOfHeadsAndTails.heads = countOfHeadsAndTails.heads + 1;
      }
      else {
        //increment number of tails in the object
        countOfHeadsAndTails.tails = countOfHeadsAndTails.tails + 1;
      }
    }
    //remove  tails if it doesn't exist
    if (countOfHeadsAndTails.heads == 1){
      delete countOfHeadsAndTails.tails;
    }
    else if (countOfHeadsAndTails.tails == 1){
      delete countOfHeadsAndTails.heads;
    }
    //return the object
    return countOfHeadsAndTails;
  }
  
  function flipACoin(call) {
    //Flip a coin to get heads or tails
    var flippingACoin = coinFlip()
    //initailze the result of the flip
    var resultOfFlip =''
    //check to see if the coin flip was correct
    if (flippingACoin == call){
      //if the coin flip matches the call change result to win
      resultOfFlip = resultOfFlip + 'win';
    }
    else {
      //if coin call does not match the flip, change the result to lose
      resultOfFlip = resultOfFlip + 'lose'
    }
    //create an object to hold the variables
    var checkResult  = {call:call, flip:'', result : ''};
    //add the flip result to flip
    checkResult.flip = flippingACoin;
    //add the result of the flip to the result object variable
    checkResult.result = resultOfFlip;
    if(call == null || call == ""){
      throw 'No input';
    }
    //return it
    return checkResult;
  }