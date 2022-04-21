// Focus div based on nav button click

const home = document.getElementById("homenav");
home.addEventListener("click", activeHome);
function activeHome() {
    document.getElementById("home").className = "active";
    document.getElementById("single").className = "hidden";
    document.getElementById("multi").className = "hidden";
    document.getElementById("guess").className = "hidden";
}

const single = document.getElementById("singlenav");
single.addEventListener("click", activeSingle);
function activeSingle() {
    document.getElementById("home").className = "hidden";
    document.getElementById("single").className = "active";
    document.getElementById("multi").className = "hidden";
    document.getElementById("guess").className = "hidden";
}

const multiple = document.getElementById("multinav");
multiple.addEventListener("click", activeMultiple);
function activeMultiple() {
    document.getElementById("home").className = "hidden";
    document.getElementById("single").className = "hidden";
    document.getElementById("multi").className = "active";
    document.getElementById("guess").className = "hidden";
}

const guess = document.getElementById("guessnav");
guess.addEventListener("click", activeGuess);
function activeGuess() {
    document.getElementById("home").className = "hidden";
    document.getElementById("single").className = "hidden";
    document.getElementById("multi").className = "hidden";
    document.getElementById("guess").className = "active";
}

// Flip one coin and show coin image to match result when button clicked

// Button coin flip element.
const coin = document.getElementById("coin");
// Add event listener for coin button.
coin.addEventListener("click", singleFlip);

function singleFlip() {
    fetch('http://localhost:5555/app/flip')
        .then(function (response) {
            return response.json();
        })
        .then(function (result) {
            console.log(result);
            document.getElementById("singleFlipResult").innerHTML = result.flip;
            document.getElementById("quarter").setAttribute("src", "./assets/img/" + result.flip + ".png");
        })
}