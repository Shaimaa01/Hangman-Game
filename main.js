// Letters
const letters = "abcdefghijklmnopqrstuvwxyz";
// Get Array From Letters
let lettersArray = Array.from(letters);
// Select Letters Container
let lettersContainer = document.querySelector(".letters");
// Generate Letters
lettersArray.forEach((letter) => {
  // Create Span
  let span = document.createElement("span");
  // Create Letter Text Node
  let theletter = document.createTextNode(letter);
  // Append The Letter To Span
  span.appendChild(theletter);
  // Add Class On Span
  span.className = "letter-box";
  // Append Span To The Letters Container
  lettersContainer.appendChild(span);
});

// Object Of Words

fetch("data.json")
  .then((response) => {
    return response.json();
  })
  .then((words) => {
    useJsonData(words) 
  });

function useJsonData(words) {
  // Get Random Property
  let allKeys = Object.keys(words);
  // Random Number Depend On Length
  let randomPropNumber = Math.floor(Math.random() * allKeys.length);
  // Category
  let randomPropName = allKeys[randomPropNumber];
  // Category Words
  let randomPropValue = words[randomPropName];
  // Random Number Depend On Length
  let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);
  // The Chosen Word
  let randomValueValue = randomPropValue[randomValueNumber];
  // Set Category Info
  document.querySelector(".category span").innerHTML = randomPropName;
  // Select Letters Guess Element
  let lettersGuessContainer = document.querySelector(".letters-guess");
  // Convert Chosen Word To Array
  let lettersAndSpace = Array.from(randomValueValue);

  // Create Spans Depend On Word
  lettersAndSpace.forEach((letter) => {
    // Create Empty Span
    let emptySpan = document.createElement("span");
    // If Letter Is Space
    if (letter == " ") {
      // Add Class To Span
      emptySpan.className = "with-space";
    }
    // Append Span To The Letters Guess Container
    lettersGuessContainer.appendChild(emptySpan);
  });

  // Select Guess Spans
  let guessSpans = document.querySelectorAll(".letters-guess span");

  // Set Wrong Attempts
  let wrongAttempts = 0;

  // Select The Draw Element
  let theDraw = document.querySelector(".hangman-draw");

  // Handel Clicking On Letters
  document.addEventListener("click", (e) => {
    // Set The chose Status
    let theStatus = false;

    if (e.target.className === "letter-box") {
      e.target.classList.add("clicked");
      // Get Clicked Letter
      let theClickedLetter = e.target.innerHTML.toLowerCase();
      // The Chosen word
      let theChosenWord = Array.from(randomValueValue.toLowerCase());
      theChosenWord.forEach((wordLetter, WordIndex) => {
        // If The Clicked Letter Equal To One Of The Chosen Word Letter
        if (theClickedLetter === wordLetter) {
          // Set Status To Correct
          theStatus = true;
          // Loop On All Guess Spans
          guessSpans.forEach((span, spanIndex) => {
            if (WordIndex === spanIndex) {
              span.innerHTML = theClickedLetter;
            }
          });
        }
      });
      // Outside Loop

      // If Letter Is Wrong
      if (theStatus !== true) {
        //Increase the wrong Attempts
        wrongAttempts++;
        // Add Class Wrong On The Draw Element
        theDraw.classList.add(`wrong-${wrongAttempts}`);
        // Play Fail Sound
        document.getElementById("fail").play();

        if (wrongAttempts === 8) {
          gameOver();
          lettersContainer.classList.add("finished");
        }
      } else {
        // Play success Sound
        document.getElementById("success").play();
        // Check if the game is won
        const allGuessed = Array.from(guessSpans).every(
          (span) => span.textContent !== ""
        ); // Check if all spans are filled
        if (allGuessed) {
          congrats(); // Call the congrats function if the game is won
          lettersContainer.classList.add("finished");
        }
      }
    }
  });

// End Game Function
function gameOver() {
  // Use setTimeout to delay the execution
  setTimeout(() => {
    // Create Popup Div
    let div = document.createElement("div");
    // Create Text
    let divText = document.createTextNode(
      `Game Over, The Word Is ${randomValueValue}`
    );
    // Append Text To div
    div.appendChild(divText);
    // Add class On Div
    div.className = "game-over";
    // Append To The Body
    document.body.appendChild(div);
  }, 1000); // Delay in milliseconds (1000 ms = 1 second)
}
function congrats() {
  // Use setTimeout to delay the execution
  setTimeout(() => {
    // Create Popup Div
    let div = document.createElement("div");
    // Create Text
    let divText = document.createTextNode(`congrats🎉🎉🎉`);
    // Append Text To div
    div.appendChild(divText);
    // Add class On Div
    div.className = "congrats";
    // Append To The Body
    document.body.appendChild(div);
  }, 1000); // Delay in milliseconds (1000 ms = 1 second)
}
}