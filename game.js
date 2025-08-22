let wordDisplay;
let guessedLetters = [];
let remainingGuesses = 6;
let isGameOver = false;
let hintGiven = false;
let secretWord = "";
let fullWordGuessCount = 0;
let maxFullWordGuesses = 2;
let wins = 0;
let losses = 0;

// Emojis for guess stages (6 to 0)
const spacemanEmojis = ["😵‍💫", "😵", "😳", "😟", "😐", "🙂", "🚀"];

// Space words & hints
const spaceWords = [
  { word: "astronaut", hint: "A person trained to travel and work in space." },
  { word: "mars", hint: "The red planet, 4th from the Sun." },
  { word: "venus", hint: "The second planet, known for its thick clouds." },
  { word: "planet", hint: "A celestial body orbiting a star." },
  { word: "comet", hint: "Icy body with a glowing tail." },
  { word: "galaxy", hint: "A massive system of stars and space dust." },
  { word: "blackhole", hint: "Gravity so strong, not even light escapes." },
  { word: "satellite", hint: "Orbits planets — natural or man-made." },
  { word: "nebula", hint: "Cloud of gas and dust where stars are born." },
  { word: "telescope", hint: "Used to observe distant space objects." }
];

// Optional sounds
const sounds = {
  correct: new Audio('sounds/correct.mp3'),
  wrong: new Audio('sounds/wrong.mp3'),
  win: new Audio('sounds/win.mp3'),
  lose: new Audio('sounds/lose.mp3')
};

function init() {
  secretWord = "";
  wordDisplay = [];
  guessedLetters = [];
  remainingGuesses = 6;
  isGameOver = false;
  hintGiven = false;
  fullWordGuessCount = 0;

  document.getElementById("hint-message").textContent = "";
  document.getElementById("message").textContent = "";
  document.getElementById("emoji-message").textContent = "";
  const guessedLettersEl = document.getElementById("guessed-letters");
  if (guessedLettersEl) guessedLettersEl.textContent = "";
  document.getElementById("guesses-left").textContent = remainingGuesses;
  document.getElementById("spaceman").textContent = spacemanEmojis[remainingGuesses];
  document.getElementById("letter-input").disabled = false;

  document.getElementById("restart-container").style.display = "none";
  document.getElementById("guess-btn").disabled = false;

  startGame();
  updateScoreboard();
}

function startGame() {
  const randomIndex = Math.floor(Math.random() * spaceWords.length);
  // always store lowercase to avoid mismatch
  secretWord = spaceWords[randomIndex].word.toLowerCase();
  wordDisplay = Array(secretWord.length).fill("_");
  updateUI();
}

function updateUI() {
  document.getElementById("word-display").textContent = wordDisplay.join(" ") + ` (${secretWord.length} letters)`;
  const guessedLettersEl = document.getElementById("guessed-letters");
  if (guessedLettersEl) guessedLettersEl.textContent = guessedLetters.join(", ");
  document.getElementById("guesses-left").textContent = remainingGuesses;
  document.getElementById("spaceman").textContent = spacemanEmojis[remainingGuesses];
  document.getElementById("letter-input").value = "";
}

function guessLetter() {
  if (isGameOver) return;

  const input = document.getElementById("letter-input").value.toLowerCase().trim();
  const messageEl = document.getElementById("message");

  if (!/^[a-z]+$/.test(input)) {
    messageEl.textContent = "Please enter a valid word or letter from a-z.";
    return;
  }

  // full word guess
  if (input.length > 1) {
    if (fullWordGuessCount >= maxFullWordGuesses) {
      messageEl.textContent = "You've used all full word guesses!";
      return;
    }

    fullWordGuessCount++;

    if (input === secretWord) {
      wordDisplay = secretWord.split('');
      updateUI();
      showEndMessage(true, true);
      sounds.win?.play();
    } else {
      remainingGuesses--;
      messageEl.textContent = `Wrong word! ${maxFullWordGuesses - fullWordGuessCount} full guesses left.`;
      updateUI();
      sounds.wrong?.play();
      checkGameOver();
    }
    return;
  }

  // single letter guess
  if (guessedLetters.includes(input)) {
    messageEl.textContent = "You already guessed that letter.";
    return;
  }

  guessedLetters.push(input);

  let correct = false;
  for (let i = 0; i < secretWord.length; i++) {
    if (secretWord[i] === input) {
      wordDisplay[i] = input;
      correct = true;
    }
  }

  if (correct) {
    sounds.correct?.play();
  } else {
    remainingGuesses--;
    sounds.wrong?.play();
  }

  updateUI();
  checkGameOver();
}

function checkGameOver() {
  if (wordDisplay.join("") === secretWord) {
    showEndMessage(true);
    sounds.win?.play();
  } else if (remainingGuesses === 0) {
    showEndMessage(false);
    sounds.lose?.play();
  }
}

function showEndMessage(won, fullWord = false) {
  const messageEl = document.getElementById("message");
  const emojiEl = document.getElementById("emoji-message");
  const input = document.getElementById("letter-input");

  isGameOver = true;

  if (won) {
    messageEl.textContent = fullWord
      ? `🌟 Incredible! You guessed the whole word: "${secretWord.toUpperCase()}"!`
      : `✨ Well done! You revealed the word: "${secretWord.toUpperCase()}"!`;
    emojiEl.textContent = "🚀";
    wins++;
  } else {
    messageEl.textContent = `☠️ Game Over! The word was: "${secretWord.toUpperCase()}"`;
    emojiEl.textContent = "💀";
    losses++;
  }

  emojiEl.style.animation = "bounce 0.7s ease forwards";

  input.disabled = true;
  document.getElementById("guess-btn").disabled = true;

  document.getElementById("restart-container").style.display = "block";
  updateScoreboard();

  setTimeout(() => {
    emojiEl.style.animation = "";
  }, 700);
}

function getHint() {
  // ensure lowercase match
  const wordObj = spaceWords.find(w => w.word.toLowerCase() === secretWord.toLowerCase());
  if (!wordObj) {
    document.getElementById("hint-message").textContent = "No hint available.";
    return;
  }

  if (hintGiven) {
    document.getElementById("hint-message").textContent = "Hint already given.";
  } else {
    document.getElementById("hint-message").textContent = "Hint: " + wordObj.hint;
    hintGiven = true;
  }
}

function updateScoreboard() {
  document.getElementById("wins").textContent = wins;
  document.getElementById("losses").textContent = losses;
}

function createStars(num = 100) {
  const container = document.getElementById("stars-container");
  container.innerHTML = ""; // clear old stars when restarting
  for (let i = 0; i < num; i++) {
    const star = document.createElement("div");
    star.classList.add("star");
    star.style.width = star.style.height = `${Math.random() * 2 + 1}px`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.left = `${Math.random() * 100}%`;
    star.style.animationDuration = `${Math.random() * 3 + 2}s`;
    star.style.animationDelay = `${Math.random() * 5}s`;
    container.appendChild(star);
  }
}

// Add listener to Guess button
document.getElementById("guess-btn").addEventListener("click", guessLetter);

// Run init on load
init();
createStars();
function restartGame() {
    init();        // reset all game state
    createStars(); // re-render stars background
  }
  