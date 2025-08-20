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