// Route (endpoint) definitions go in this directory
// Route (endpoint) definitions go in this directory

// intialize or require express 
const express = require('express');
// Define router that will be used for express
const coinRoute = express.Router();
// Import middleware to use.
const flip_middleware = require('../middleware/mymiddleware');
// Define endpoint
coinRoute.get('/', flip_middleware.status);
// Define router endpoint for multiple coin tosses.
coinRoute.post('/flip/coins/', flip_middleware.multiple_coins);
// Define router endpoint for single coinFlip.
coinRoute.get('/flip/', flip_middleware.coin_flip);
// Get response for coinFlips with user input for number.
coinRoute.get('/flips/:number', flip_middleware.number_coin_flip);
// response for calling a single glip.
coinRoute.post('/flip/call/', flip_middleware.flip_call);
// response for heads guess call.
coinRoute.get('/flip/heads', flip_middleware.head_call);
// response for tails call.
coinRoute.get('/flip/call/tails', flip_middleware.tails_call);
// response for guessing either heads or tails.
coinRoute.get('/flip/call/:guess(heads|tails)/', flip_middleware.guess_flip);

module.exports = coinRoute;