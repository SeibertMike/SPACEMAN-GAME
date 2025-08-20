let wordDisplay;
let guessedLetters = [];
let remainingGuesses = 6;
let isGameOver = false;
let hintGiven = false;  

// List of space-related words with corresponding hints
const spaceWords = [
    { word: "astronaut", hint: "A person who is trained to travel and work in space." },
    { word: "mars", hint: "The fourth planet from the Sun, often called the Red Planet." },
    { word: "venus", hint: "The second planet from the Sun, known for its thick clouds and high temperatures." },
    { word: "planet", hint: "A large celestial body that orbits a star." },
    { word: "comet", hint: "A small icy body that orbits the Sun, often with a bright tail." },
    { word: "galaxy", hint: "A system of stars, planets, and other celestial bodies, such as the Milky Way." },
    { word: "blackhole", hint: "A region of space where gravity is so strong that not even light can escape." },
    { word: "satellite", hint: "An object that orbits a planet or other celestial body." },
    { word: "nebula", hint: "A giant cloud of gas and dust in space, often a region where new stars are born." },
    { word: "telescope", hint: "An instrument used to observe distant objects in space." }
];


function init() {
    // Reset game state variables
    secretWord = "";
    wordDisplay = [];
    guessedLetters = [];
    remainingGuesses = 6;
    isGameOver = false;
    hintGiven = false;
    document.getElementById("hint-message").textContent = "";


     // Update UI for new game start
     document.getElementById("message").textContent = "";
     document.getElementById("emoji-message").textContent = "";  
     document.getElementById("guessed-letters").textContent = "";
     document.getElementById("guesses-left").textContent = remainingGuesses;
     document.getElementById("spaceman").textContent = spacemanEmojis[remainingGuesses];
     document.getElementById("letter-input").disabled = false;
     document.querySelector("button").disabled = false;
 
     // Call startGame to initialize the word
     startGame();
 }


 function startGame() {
    // Randomly choose a word and its hint from the spaceWords array
    const randomIndex = Math.floor(Math.random() * spaceWords.length);
    secretWord = spaceWords[randomIndex].word;
    const secretHint = spaceWords[randomIndex].hint;

    // Set the hint for this word
    hintGiven = false; // Reset hint status

    // Display the word as underscores
    wordDisplay = Array(secretWord.length).fill("_");
    guessedLetters = [];
    remainingGuesses = 6;
    isGameOver = false;

 // Update UI with the initial word and guesses
 document.getElementById("word-display").textContent = wordDisplay.join(" ");
 document.getElementById("guessed-letters").textContent = guessedLetters.join(", ");
 document.getElementById("guesses-left").textContent = remainingGuesses;
 document.getElementById("spaceman").textContent = spacemanEmojis[remainingGuesses];
 document.getElementById("restart-container").style.display = "none";
}