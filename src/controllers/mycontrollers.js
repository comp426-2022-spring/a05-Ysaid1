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
    let tailsCount = 0;
    let headsCount = 0;

    for (let i = 0; i < array.length; i++) {
        if (array[i] == 'heads') {
            headsCount++;
        } else {
            tailsCount++;
        }
    }

    return {
        'tails': tailsCount,
        'heads': headsCount
    };

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