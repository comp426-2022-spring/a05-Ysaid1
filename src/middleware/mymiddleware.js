const express = require('express')
// Import coin_controller to use them.
const coin_controller = require('../controllers/mycontrollers');

// Define check endpoint
function status(req, res) {
    // Status code 200
    res.statusCode = 200; 
    // Send in a message saying "Ok"
    res.statusMessage = 'OK';
    //text plain language as contant type
    res.writeHead(res.statusCode, { 'Content-Type': 'text/plain' });
    res.end(res.statusCode + ' ' + res.statusMessage);
}
  //endpoint for just 1 flips
function coin_flip(req, res) {
    var flip = coin_controller.coinFlip();
    res.status(200).json({ "flip": flip });
}
// Define endpoint function for multiple coin flips
function multiple_coins(req, res, next) {
    const flips = coin_controller.coinFlips(req.body.number);
    const count = coin_controller.countFlips(flips);
    res.status(200).json({ "raw": flips, "summary": count });
}

// Define endpoint function coinFlips with given number.
function number_coin_flip(req, res) {
    let raw = coin_controller.coinFlips(req.params.number);
    let summary = coin_controller.countFlips(raw);
    res.status(200).json({ "raw": raw, "summary": summary });
}

// Define function for calling a flip.
function flip_call(req, res, next) {
    const game = coin_controller.flipACoin(req.body.guess);
    res.status(200).json(game);
}
// function for a heads call.
function head_call(req, res) {
    let heads = coin_controller.flipACoin('heads');
    let call = heads.call;
    let flip = heads.flip;
    let result = heads.result;
    res.status(200).json({ "call": call, "flip": flip, "result": result });
}
// function for a heads call.
function tails_call(req, res) {
    let tails = coin_controller.flipACoin('tails');
    let call = tails.call;
    let flip = tails.flip;
    let result = tails.result;
    res.status(200).json({ "call": call, "flip": flip, "result": result });
}

// function for Guessing heads or tails.
function guess_flip(req, res, next) {
    const game = coin_controller.flipACoin(req.params.guess);
    res.status(200).json(game);
}

module.exports = {
    flip_call: flip_call,
    head_call: head_call,
    tails_call: tails_call,
    guess_flip: guess_flip,
    status: status,
    multiple_coins: multiple_coins,
    coin_flip: coin_flip,
    number_coin_flip: number_coin_flip,
}
