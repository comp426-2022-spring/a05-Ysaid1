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


const coin = document.getElementById("coin");
// Add event listener for coin flip
coin.addEventListener("click", coinFlip);
function coinFlip() {
    fetch('http://localhost:5000/app/flip')
        .then(function (response) {
            return response.json();
        })
        .then(function (result) {
            console.log(result);
            document.getElementById("singleFlipResult").innerHTML = result.flip;
            document.getElementById("smallcoin").setAttribute("src", "./assets/img/" + result.flip + ".png");
        })
}

// multiple coin flaips 
const coins = document.getElementById("coins");

coins.addEventListener("submit", multipleCoins);
async function multipleCoins(event) {

    event.preventDefault();
    const endpoint = "app/flip/coins/";
    const url = document.baseURI + endpoint;
    const formEvent = event.currentTarget;

    const all_results = document.getElementById('all_results');
    try {

        const formData = new FormData(formEvent);

        const flips = await sendFlips({ url, formData });

        console.log(flips);
        document.getElementById("heads").innerHTML = "Heads: " + flips.summary.Heads;
        document.getElementById("tails").innerHTML = "Tails: " + flips.summary.Tails;

        let document_fragment = document.createDocumentFragment();

        // In order to reset after a multiple flip.
        while (all_results.firstChild) {
            all_results.removeChild(all_results.firstChild);
            all_results_text.removeChild(all_results_text.firstChild);
        }

        for (let i = 0; i < flips.raw.length; i++) {
            let img = document.createElement('img');
            img.src = "./assets/img/" + flips.raw[i] + ".png";
            img.id = "smallcoin";
            document_fragment.appendChild(img);
            document.getElementById('all_results_text').innerHTML += `<p>${flips.raw[i]}</p>`
        }

        all_results.appendChild(document_fragment);

    } catch (error) {
        console.log(error);
    }
}

// Create a data sender
async function sendFlips({ url, formData }) {
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

// guess head flip
const heads = document.getElementById('headsButton');

// Add event listener for head button.
heads.addEventListener("click", headsGuess);

async function headsGuess(event) {
    event.preventDefault();

    const endpoint = "app/flip/call";

    const url = document.baseURI + endpoint;
    const formData = { "guess": "heads" };

    try {
        const guess = await sendGuessHeads({ url, formData });
        console.log(guess);

        document.getElementById('userGuess').innerHTML = guess.call;
        document.getElementById('userGuessImg').setAttribute("src", "./assets/img/" + guess.call + ".png");

        document.getElementById('actualGuess').innerHTML = guess.flip;
        document.getElementById('actualGuessImg').setAttribute("src", "./assets/img/" + guess.flip + ".png");

        if (guess.call === guess.flip) {
            document.getElementById('guessResultImg').setAttribute("src", "./assets/img/win.png");
        } else {
            document.getElementById('guessResultImg').setAttribute("src", "./assets/img/lose.png");
        }
    } catch (error) {
        console.log(error);
    }
}

async function sendGuessHeads({ url, formData }) {
    const formDataJSON = JSON.stringify(formData);
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: formDataJSON
    };

    const response = await fetch(url, options);

    if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
    }

    return response.json();
}
// guess tails flip
const tails = document.getElementById('tailsButton');

// Add event listener for head button.
tails.addEventListener("click", tailsGuess);

async function tailsGuess(event) {
    event.preventDefault();

    const endpoint = "app/flip/call";

    const url = document.baseURI + endpoint;

    const formData = { "guess": "tails" };

    try {
        const guess = await sendGuessTails({ url, formData });
        console.log(guess);

        document.getElementById('userGuess').innerHTML = guess.call;
        document.getElementById('userGuessImg').setAttribute("src", "./assets/img/" + guess.call + ".png");

        document.getElementById('actualGuess').innerHTML = guess.flip;
        document.getElementById('actualGuessImg').setAttribute("src", "./assets/img/" + guess.flip + ".png");

        if (guess.call === guess.flip) {
            document.getElementById('guessResultImg').setAttribute("src", "./assets/img/win.png");
        } else {
            document.getElementById('guessResultImg').setAttribute("src", "./assets/img/lose.png");
        }
    } catch (error) {
        console.log(error);
    }
}

// Create a data sender.
async function sendGuessTails({ url, formData }) {
    const formDataJSON = JSON.stringify(formData);
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: formDataJSON
    };

    const response = await fetch(url, options);

    if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
    }

    return response.json();
}