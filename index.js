// Initialize Howler.js
const audio0 = new Howl({
    src: ["./audio/click0.mp3"], // Path to your audio file
    preload: true,              // Preload the audio to prevent delays
    onload: function() {
      console.log('audio0 loaded and ready to play');
    }
});

const audio1 = new Howl({
    src: ["./audio/click1.mp3"], // Path to your audio file
    preload: true,              // Preload the audio to prevent delays
    onload: function() {
        console.log('audio1 loaded and ready to play');
    }
});

const audio2 = new Howl({
    src: ["./audio/click2.mp3"], // Path to your audio file
    preload: true,              // Preload the audio to prevent delays
    onload: function() {
        console.log('audio2 loaded and ready to play');
    }
});

const audio3 = new Howl({
    src: ["./audio/click3.mp3"], // Path to your audio file
    preload: true,              // Preload the audio to prevent delays
    onload: function() {
        console.log('audio3 loaded and ready to play');
    }
});


// Function to play a sound corresponding to the square number
function triggerSound(squareNum) {

    if (squareNum === 0) {
        audio0.play();
    }

    else if (squareNum === 1) {
        audio1.play();
    }

    else if (squareNum === 2) {
        audio2.play();
    }

    else if (squareNum === 3) {
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

            if (window.innerWidth <= 850) {
                document.querySelector("h1").innerHTML = "<span class='redWarning'>OOOH GAME OVER!</span> (<u>Touch</u> to play again)";
              }

            else {
                document.querySelector("h1").innerHTML = "<span class='redWarning'>OOOH GAME OVER!</span> (Press <u>Click</u> or <u>Space</u> to play again)";
            }
            

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
        
        document.querySelector("h1").innerHTML = "Nice! Press <u>Click</u> or <u>Space</u> to move to the next sequence.";
        if (window.innerWidth <= 850) {
            document.querySelector("h1").innerHTML = "Nice! <u>Touch</u> to move to the next sequence.";
          }

        else {
            document.querySelector("h1").innerHTML = "Nice! Press <u>Click</u> or <u>Space</u> to move to the next sequence.";
        }
        
        waitPlayer = false;
    }

}

// Players current Level 
var currentLevel = 0;

// Players Highest Score
var highestScore = 0;

// Boolean to manage waiting for player input
var waitPlayer = false;


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

document.addEventListener("DOMContentLoaded", function() {
    if (window.innerWidth <= 850) {
      document.querySelector("h1").innerHTML = "<u>Touch</u> to Start !";
    }
  });
