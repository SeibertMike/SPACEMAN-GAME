let wordDisplay;
let guessedLetters = [];
let remainingGuesses = 6;
let isGameOver = false;
let hintGiven = false;
let secretWord = "";

// Emojis representing remaining guesses (6 to 0)
const spacemanEmojis = ["😵‍💫", "😵", "😳", "😟", "😐", "🙂", "🚀"];

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

// Function to handle guesses (both single letters and full words)
function guessLetter() {
    if (isGameOver) return; // Prevent guessing after game over

    const input = document.getElementById("letter-input").value.toLowerCase().trim();

    // Validate input is alphabetic
    if (!/^[a-z]+$/.test(input)) {
        document.getElementById("message").textContent = "Please enter a valid word or letter from a-z.";
        document.getElementById("letter-input").value = "";
        return;
    }

    // Already guessed letter
    if (input.length === 1 && guessedLetters.includes(input)) {
        document.getElementById("message").textContent = "You already guessed that letter.";
        document.getElementById("letter-input").value = "";
        return;
    }

    // Handle full word guess
    if (input.length > 1) {
        if (input === secretWord) {
            wordDisplay = secretWord.split('');
            document.getElementById("word-display").textContent = wordDisplay.join(" ");
            document.getElementById("message").textContent = "You guessed the full word! You win!";
            document.getElementById("emoji-message").textContent = "😊";
            endGame();
        } else {
            remainingGuesses--;
            document.getElementById("guesses-left").textContent = remainingGuesses;
            document.getElementById("spaceman").textContent = spacemanEmojis[remainingGuesses];
            document.getElementById("message").textContent = "Incorrect word guess.";
            checkGameOver();
        }
        document.getElementById("letter-input").value = "";
        return;
    }

    // Handle single letter guess
    guessedLetters.push(input);
    document.getElementById("guessed-letters").textContent = guessedLetters.join(", ");

    let letterFound = false;
    for (let i = 0; i < secretWord.length; i++) {
        if (secretWord[i] === input) {
            wordDisplay[i] = input;
            letterFound = true;
        }
    }

    if (!letterFound) {
        remainingGuesses--;
        document.getElementById("spaceman").textContent = spacemanEmojis[remainingGuesses];
        document.getElementById("guesses-left").textContent = remainingGuesses;
    }

    document.getElementById("word-display").textContent = wordDisplay.join(" ");
    checkGameOver();

    document.getElementById("letter-input").value = "";
}

function checkGameOver() {
    if (wordDisplay.join("") === secretWord) {
        document.getElementById("message").textContent = "You win!";
        document.getElementById("emoji-message").textContent = "😊";
        endGame();
    } else if (remainingGuesses === 0) {
        document.getElementById("message").textContent = `Game Over! The word was: ${secretWord}.`;
        document.getElementById("emoji-message").textContent = "😞";
        endGame();
    }
}

function endGame() {
    isGameOver = true;
    document.getElementById("letter-input").disabled = true;
    document.querySelector("button").disabled = true;
    document.getElementById("restart-container").style.display = "block";
}

// Function to show hint
function getHint() {
    if (!hintGiven) {
        const hint = spaceWords.find(wordObj => wordObj.word === secretWord).hint;
        document.getElementById("hint-message").textContent = "Hint: " + hint;
        hintGiven = true;
    } else {
        document.getElementById("hint-message").textContent = "Hint already given.";
    }
}

// Function to restart the game
function restartGame() {
    init();  // Reinitialize the game
}

// Start the game on load
init();
