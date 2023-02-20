// Retrieve all the elements with the "td" tag from the HTML
const tables = document.getElementsByTagName("td");

// Initialize the variables "columns" and "rows" to zero
let columns = 0;
let rows = 0;

// Get the element with id "starto" and assign it to the variable "starto"
const starto = document.getElementById("starto");

// Get the element with id "myAudio" and assign it to the variable "audio"
const audio = document.getElementById("myAudio");

// Define a function named "playAudio" that plays the audio
function playAudio() {
audio.play();
}

// Define a function named "pauseAudio" that pauses the audio
function pauseAudio() {
audio.pause();
}

// Define a function named "displayInfo" that shows or hides the element with id "info"
function displayInfo() {
const info = document.getElementById("info");
if (info.style.display == "none") {
info.style.display = "block";
}
else {
info.style.display = "none";
}
}

// Add an event listener to the element with id "change-theme-btn" that toggles the "dark-theme" class of "everything"
document.getElementById('change-theme-btn').onclick = function() {
everything.classList.toggle('dark-theme');
}

// Initialize the variables "match", "hints", and "words" to empty strings
let match = "";
let hints = "";
let words = "";

// Get the elements with ids "informationb" and "hepopup", and assign them to the variables "button1" and "popup1", respectively
const button1 = document.getElementById("informationb");
const popup1 = document.getElementById("hepopup");

// Define an asynchronous function named "retreive" that fetches data from an API, gets a JSON response, assigns the response's "dictionary" value to "words", and returns "words"
async function retreive() {
// Disable the "starto" button and change the cursor
starto.disabled = true;
starto.style.cursor = "not-allowed";
    // Make a fetch request to the API and get the response's JSON content
const res = await fetch("https://api.masoudkf.com/v1/wordle", {
    headers: {"x-api-key": "sw0Tr2othT1AyTQtNDUE06LqMckbTiKWaVYhuirv",
    },
});

const info = await res.json();
words = info.dictionary;

// Enable the "starto" button and change the cursor back to its original state
starto.disabled = false;
starto.style.cursor = "pointer";
starto.innerText = "Start Over";

return words;
}

// Get the elements with ids "hintb" and "hipopup", and assign them to the variables "button2" and "popup2", respectively
const button2 = document.getElementById("hintb");
const popup2 = document.getElementById("hipopup");

// Initialize the variable "defaultColor" to "2px solid black"
let defaultColor = "2px solid black";

// Define an asynchronous function named "main" that calls "retreive", passes "words" to "activate", and adds event listeners to "button1", "starto", and "button2"
async function main() {
words = await retreive();
activate(words);

// Adds a click event listener to button1 that toggles the "removeStuff" class of popup1 and blurs button1
button1.addEventListener("click", () => {
popup1.classList.toggle("removeStuff");
button1.blur();
});

// Adds a click event listener to starto that calls restartProgress() and blurs starto
starto.addEventListener("click", () => {
restartProgress();
starto.blur();
});

// Adds a click event listener to button2 that toggles the "removeStuff" class of popup2 and blurs button2
button2.addEventListener("click", () => {
popup2.classList.toggle("removeStuff");
button2.blur();
});

// Sets the border style of a table element to defaultColor
tables[columns + 4*rows].style.border = defaultColor;

// Adds a keyup event listener to the document object
document.addEventListener("keyup", (event) => {
// Checks if the Enter key was pressed
if (event.key === "Enter") {
// Checks if the current word is incomplete
if (columns < 4){
alert("Please finish the word first.");
return;
}
pass();
columns = 0;
rows = rows + 1;
tables[columns + 4*rows].style.border = defaultColor;
return;
}
// Checks if the Backspace key was pressed and the current column is not zero
if(event.key === "Backspace" && columns > 0) {
// Sets the border style of the previous table element to defaultColor
if (columns < 4) tables[columns + 4*rows].style.border = "1px solid #d0d3d4";
columns = columns - 1;
// Sets the border style of the current table element to defaultColor, and its text to an empty string
tables[columns + 4*rows].style.border = defaultColor;
tables[columns+ 4*rows].innerText = "";
return;
}
// Checks if the pressed key is a letter and the current column is not already full
const pattern = new RegExp('[a-zA-Z]');
if (columns > 3 || !(pattern.test(event.key)) || event.key.length > 1) {
return;
}
// Converts the key to uppercase and sets it as the text of the current table element
const eventID = event.key.toUpperCase();
tables[columns + 4*rows].innerText = eventID;
// Sets the border style of the current table element to defaultColor, and the next table element (if any) to defaultColor as well
tables[columns + 4*rows].style.border = "1px solid #d0d3d4";
columns = columns + 1;
if (columns < 4) {
tables[columns + 4*rows].style.border = defaultColor;
}
});
}
// Toggles the "removeStuff" class of the element with id "hipopup"
function hint(){
document.getElementById("hipopup").classList.toggle("removeStuff");
}



/* The function "pass" is a function that checks if the user input is correct by comparing it to the answer. 
It then changes the background color of the cells to either green or gray and calls the "win" or "lose" function depending on the result.
*/
function pass() {
    phrase = "";
    for (let x = 0; x < 4; x++) {
        phrase = phrase + tables[x + 4*rows].innerText;
    }
    if (phrase === match) {
        for (let x = 0; x < 4; x++) {
            tables[x + 4*rows].style.backgroundColor = "#00FF00";
            tables[x + 4*rows].style.color = "#FFFFFF";
        }
        if (rows === 3) {
            win();
        }
    } else {
        for (let x = 0; x < 4; x++) {
            tables[x + 4*rows].style.backgroundColor = "#808080";
            tables[x + 4*rows].style.color = "#FFFFFF";
        }
        lose();
    }
}


// The function "lose" is a function that displays a message to the user indicating that they have lost the game.
function lose(){
    document.getElementById("loser").classList.toggle("removeStuff");
}

/* The function "restartProgress" is a function that resets the game by setting the cells to their default state, 
hiding the winner and loser messages, and displaying the game board.
*/
function restartProgress() {
    let newColor = "1px solid grey";
    for (let x = 0; x < 4; x++) {
        for (let y = 0; y < 4; y++) {
            tables[x + 4*y].innerText = "";
            tables[x + 4*y].style.border = newColor;
            tables[x + 4*y].style.backgroundColor = "transparent";
            tables[x + 4*y].style.color = "#000000";
        }
    }
    document.getElementById("hepopup").classList.add("removeStuff");
    document.getElementById("hipopup").classList.add("removeStuff");
    document.getElementById("loser").classList.add("removeStuff");
    document.getElementById("board").classList.remove("removeStuff");
    document.getElementById("congratulations").classList.add("removeStuff");
    document.getElementById("winner").classList.add("removeStuff");
    activate(words);
    columns = 0;
    rows = 0;
    tables[columns + 4*rows].style.border = newColor;
}

// The function "win" is a function that displays a message to the user indicating that they have won the game.
function win(){
    document.getElementById("congratulations").classList.toggle("removeStuff");
    document.getElementById("winner").classList.toggle("removeStuff");
    document.getElementById("board").classList.add("removeStuff");
}

// The function "activate" is a function that selects a random word from the dictionary and assigns its hints to the "hints" variable.
function activate(dict){
    phrase = "";
    var shuffle;
    shuffle = Number.parseInt(Math.random() * dict.length);
    if (phrase) {
        match = dict[shuffle].phrase.toUpperCase();
    }
    hints = dict[shuffle].hints;
};

main();