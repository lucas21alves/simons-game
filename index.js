// Initialize AudioContext to fix the delay issue on Safari
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

// Preload audio files
var audio0 = new Audio("./audio/click0.mp3");
var audio1 = new Audio("./audio/click1.mp3");
var audio2 = new Audio("./audio/click2.mp3");
var audio3 = new Audio("./audio/click3.mp3");

// Wait for the audio to preload using the canplaythrough event
audio0.addEventListener('canplaythrough', () => console.log('Audio 0 is ready'));
audio1.addEventListener('canplaythrough', () => console.log('Audio 1 is ready'));
audio2.addEventListener('canplaythrough', () => console.log('Audio 2 is ready'));
audio3.addEventListener('canplaythrough', () => console.log('Audio 3 is ready'));

// Function to play a sound corresponding to the square number
function triggerSound(squareNum) {

    if (squareNum === 0) {
        audio0 = new Audio("./audio/click0.mp3");
        audio0.load();
        audio0.play();
    }

    else if (squareNum === 1) {
        audio1 = new Audio("./audio/click1.mp3");
        audio1.load();
        audio1.play();
    }

    else if (squareNum === 2) {
        audio2 = new Audio("./audio/click2.mp3");
        audio2.load();
        audio2.play();
    }

    else if (squareNum === 3) {
        audio3 = new Audio("./audio/click3.mp3");
        audio3.load();
        audio3.play();
    }

}

// Function to generate a random number between 0 and 3 (inclusive)
function randomNumberGenerator_0_3() {
    return ( Math.floor( Math.random() * 4 ) )
}

// Array to store the sequence of random numbers
var sequenceRandomNumArray = [];

// Function to generate and store a new random number in the sequence
function storeRandomNumber() {
    sequenceRandomNumArray.push(randomNumberGenerator_0_3())
};

// Function to display the sequence of squares for the user to follow
function showingSequence() {
    let delay = 600;

    for (let randomNumber of sequenceRandomNumArray) {
        
        setTimeout(function() {
            document.querySelectorAll(".square")[randomNumber].classList.add("squareShowing");
            
            setTimeout(function() { 
                document.querySelectorAll(".square")[randomNumber].classList.remove("squareShowing") 
            }, 500);

            triggerSound(randomNumber);

        }, delay);

        delay += 600; // Increment delay for each square to show in sequence
    }
} 

// Array to store the player's sequence of clicks
var sequencePlayerNumArray = [];

// Function to compare the player's sequence with the generated sequence
function analysePlayerSequence() {


    for (let x = 0; x < sequencePlayerNumArray.length; x++) {
        
        if (sequencePlayerNumArray[x] === sequenceRandomNumArray[x]) {
            
        }

        else {

            document.querySelector("h1").innerHTML = "OOOH GAME OVER! (Press <u>Space bar</u> or <u>Click</u> to play again)";

            sequenceRandomNumArray = [];

            if (highestScore < currentLevel) {

                highestScore = (currentLevel - 1);
                document.querySelector(".highestScoreNum").innerHTML = highestScore;

            }

            currentLevel = 0;

            waitPlayer = false;
            
        }
            
    }

    if (sequencePlayerNumArray.length === sequenceRandomNumArray.length) {
        
        document.querySelector("h1").innerHTML = "Nice! Press <u>Space bar</u> or <u>Click</u> to move to the next sequence.";
        
        
        
        waitPlayer = false;
    }

}

// Players current Level 
var currentLevel = 0;

// Players Highest Score
var highestScore = 0;

// Boolean to manage waiting for player input
var waitPlayer = false;

// Event listener for "Space bar" key press to start or restart the game
document.addEventListener("keydown", function(Event) {
    if (Event.code === "Space" & waitPlayer === false) {

        waitPlayer = true;

        document.querySelector("h1").textContent = "Pay attention to the sequence and try to repeat it !";

        currentLevel++;
        document.querySelector(".currentLevelNum").innerHTML = currentLevel;

        sequencePlayerNumArray = [];

        storeRandomNumber(); 
        showingSequence();

        } 
    }
    
);

// Event listener for click events outside the squares to start or restart the game
document.addEventListener("click", function(Event) {
    if (waitPlayer === false & !Event.target.classList.contains("square")) {

        waitPlayer = true;

        document.querySelector("h1").textContent = "Pay attention to the sequence and try to repeat it !";

        currentLevel++;
        document.querySelector(".currentLevelNum").innerHTML = currentLevel;

        sequencePlayerNumArray = [];

        storeRandomNumber(); 
        showingSequence();

        } 
    }
    
);

// Event listeners for square clicks to register player input and validate the sequence
for (var i = 0; i <= 3; i++) {

    document.querySelectorAll(".square")[i].addEventListener("click", function() {

        if (sequencePlayerNumArray.length < sequenceRandomNumArray.length) {

            this.classList.add("squareClicked");
        
            setTimeout(() => {
                this.classList.remove("squareClicked")
            }, 100);

            triggerSound(parseInt(this.textContent, 10));

            sequencePlayerNumArray.push(parseInt(this.textContent, 10));
            
            analysePlayerSequence();

        }

    })
};


// Key bindings for "i", "o", "k", "l" to simulate square clicks
let keysToPlay = ["i", "o", "k", "l"]

for (let y = 0; y < keysToPlay.length; y++) {

    document.addEventListener("keydown", function(Event) {

        if (Event.key === keysToPlay[y] & sequencePlayerNumArray.length < sequenceRandomNumArray.length) {

            document.querySelectorAll(".square")[y].classList.add("squareClicked");

            setTimeout(() => {
                document.querySelectorAll(".square")[y].classList.remove("squareClicked");
            }, 100);
    
            triggerSound(y);
    
            sequencePlayerNumArray.push(y);
            
            analysePlayerSequence();

        }

    })
}

