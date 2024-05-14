import { useState } from 'react'

import { fullGame, Game } from './logic/Game'
import { startGame } from './logic/StartGame'
import { guessLetter } from './logic/Guess'

import './App.css'

function App() {
  const [wordToGuess, setWordToGuess] = useState('');
  const [guessedLetter, setGuessedLetter] = useState('');
  const [game, setGame] = useState<Game | null>(null);
  const [gameStarted, setGameStarted] = useState(false);

  const handleStartGame = () => {
    const currentGame : fullGame = startGame(wordToGuess);
    if (!currentGame[1]) {
      return;
    }

    setGame(currentGame[0]);
    setGameStarted(true);
  };

  const handleGuess = () => {

    setGuessedLetter('');

    if (!game) {
      return;
    }
    
    const updatedGame : fullGame = guessLetter(game, guessedLetter);

    if (!updatedGame[1]) {
      setGameStarted(updatedGame[1]);
      return;
    }
    else {
      setGame(updatedGame[0]);
      setGuessedLetter('');
      setWordToGuess('');
    }
  };

  return (
    <>
      <h1>Hangman Game</h1>
      { !gameStarted &&
        <div>
          <p>Submit a word for a friend to guess: <input type="text" value={wordToGuess} onChange={(e) => setWordToGuess(e.target.value)} /></p>
          <button onClick={handleStartGame}>Start Game</button>
        </div>
      }
      { gameStarted && 
        <div>
          <h2>{game?.displayedWord}</h2>
          <p>Guessed letters: {game?.guessedLetters.join(', ')}</p>
          <p>Lives: {game?.lives}</p>
          <p>Submit a letter: <input type='text' value={guessedLetter} onChange={(e) => setGuessedLetter(e.target.value)} /></p>
          <button onClick={handleGuess} >Guess</button>
        </div>
      } 
    </>
  )
}

export default App
