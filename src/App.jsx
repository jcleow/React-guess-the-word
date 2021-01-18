import React, { useState } from 'react';

function Form() {
  // Function-scoped globals
  const secretWords = ['b', 'a', 'n', 'a', 'n', 'a'];
  const characterTemplate = ['_', '_', '_', '_', '_', '_'];
  const errorMsg = '(凸 ಠ 益 ಠ)凸';

  // Track the state of the (correct) guesses
  const [guess, setGuess] = useState(characterTemplate.join());

  // Track the guess entered into the input(display) by the user
  const [guessDisplay, setDisplayGuess] = useState('');

  // Track whether to display error message or not
  const [errorMsgDisplay, setErrorMsg] = useState('');

  // Track number of times user gets it wrong
  const [wrongCounter, setWrongCounter] = useState(0);

  // Function that updates the cumulative correct guesses if userInputGuess is valid
  const updateGuess = (userInputGuess) => {
    // As long as the user input is not blank and below 7 wrongs
    if (userInputGuess !== '' && wrongCounter < 7) {
    // And if secret word includes this input guess char...
      if (secretWords.includes(userInputGuess)) {
      // Get all the index of the relevant characters in the secret word...
        const allIndexOfChar = secretWords.reduce((accumulator, currValue, index) => {
          if (currValue === userInputGuess) {
            accumulator.push(index);
          }
          return accumulator;
        }, []);

        // Mutate the template to reflect the correct guess in the output
        allIndexOfChar.forEach((indexOfChar) =>
        { characterTemplate[indexOfChar] = userInputGuess; });

        // Finally update the guess
        setGuess(characterTemplate);
        setErrorMsg('');
        // Else if the secretWords array does NOT include the char in  userInputGuess...
      } else {
        // Display the emojicon
        setErrorMsg(errorMsg);
        // Increment wrong counter
        const updatedWrongCounter = wrongCounter + 1;
        setWrongCounter(updatedWrongCounter);
      }
      // If the user has exceed 7 wrongs - its game over
    } else if (wrongCounter >= 7) {
      setErrorMsg('Game Over');
    } else {
      setErrorMsg('');
    }
  };

  // Perform the display of the user's guess in the input tag
  // as well as update the guess if guess is valid
  const displayInput = (event) => {
    const inputGuess = event.target.value;
    if (inputGuess.length < 2 && (inputGuess.match(/^[a-zA-Z]+$/) || inputGuess === '')) {
      setDisplayGuess(inputGuess);
      // updateGuess fn will only update the inputGuess if the input is valid
      updateGuess(inputGuess);
    }
  };

  const inputEl = (
    <div>
      <input value={guessDisplay} onChange={displayInput} />
      <div>
        {guess}
      </div>
      <div>
        {errorMsgDisplay}
      </div>
      <div>
        Wrong Counter :
        {wrongCounter}
      </div>
    </div>
  );
  return inputEl;
}

export default function App() {
  return (
    <div>
      <Form />
    </div>
  );
}
