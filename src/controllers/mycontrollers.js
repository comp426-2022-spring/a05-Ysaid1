// The files in this directory contain functions that handle requests coming to different routes

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

  module.exports = {
      coinFlips: coinFlips,
      flipACoin: flipACoin,
      countFlips: countFlips,
      coinFlip: coinFlip
};