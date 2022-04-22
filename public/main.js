// Nav button click function
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

// Button to coin flip
const coin = document.getElementById("coin");
// Event listener for the single flip button.
coin.addEventListener("click", singleFlip);

function singleFlip() {
    fetch('http://localhost:5000/app/flip')
        .then(function (response) {
            return response.json();
        })
        .then(function (result) {
            console.log(result);
            document.getElementById("singleFlipResult").innerHTML = result.flip;
            document.getElementById("quarter").setAttribute("src", "./assets/img/" + result.flip + ".png");
        })
}

// Get element Id by multiple coiins
const coins = document.getElementById("multipleCoins");

//Event listner 
coins.addEventListener("submit", flipCoins);

// Create the function
async function flipCoins(event) {
    event.preventDefault();
    const endpoint = "app/flip/coins/";
    const url = document.baseURI + endpoint;
    // Get the element of event handler 
    const formEvent = event.currentTarget
    try {
        const formData = new FormData(formEvent);
        const flips = await sendFlips({ url, formData });
        console.log(flips);
        document.getElementById("heads").innerHTML = "Heads: " + flips.summary.Heads;
        document.getElementById("tails").innerHTML = "Tails: " + flips.summary.Tails;
    } catch (error) {
        console.log(error);
    }
}

// Create a data sender
async function sendFlips({ url, formData }) {
    //convert formdata to json
    const plainFormData = Object.fromEntries(formData.entries());
    const formDataJson = JSON.stringify(plainFormData);
    console.log(formDataJson);

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: formDataJson
    };
    const response = await fetch(url, options);
    if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
    }
    return response.json();
}