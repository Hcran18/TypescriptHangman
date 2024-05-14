import { fullGame, Game } from './Game';

abstract class GameSolver {
    abstract checkGuessIsLetter(guess: string): boolean;
    abstract checkIfWinner(game: Game): boolean;
    abstract checkIfLoser(game: Game): boolean;
    abstract showResultMessage(isWinner: boolean, wordToGuess: string): void;

    guessLetter(game: Game, guess: string): fullGame {
        let letter: string;

        if (!this.checkGuessIsLetter(guess)) {
            return [game, true];
        }

        letter = guess.toLowerCase();

        if (game.guessedLetters.includes(letter)) {
            alert('You have already guessed that letter');
            return [game, true];
        }

        game.guessedLetters.push(letter);

        if (game.wordToGuess.includes(letter)) {
            game.displayedWord = game.wordToGuess
                .split('')
                .map((char) => game.guessedLetters.includes(char) ? char : '_ ')
                .join('');

            if (this.checkIfWinner(game)) {
                this.showResultMessage(true, game.wordToGuess);
                return [null, false];
            }

            return [game, true];
        } else {
            game.lives--;

            if (this.checkIfLoser(game)) {
                this.showResultMessage(false, game.wordToGuess);
                return [null, false];
            }

            return [game, true];
        }
    }
}

// Concrete subclass for game solving
export class HangmanGameSolver extends GameSolver {
    checkGuessIsLetter(guess: string): boolean {
        if (!this.isLetter(guess)) {
            alert('Please enter a letter');
            return false;
        }
        return true;
    }

    checkIfWinner(game: Game): boolean {
        return game.displayedWord === game.wordToGuess;
    }

    checkIfLoser(game: Game): boolean {
        return game.lives === 0;
    }

    showResultMessage(isWinner: boolean, wordToGuess: string): void {
        setTimeout(() => {
            if (isWinner) {
                alert('Congratulations, you have won! The word was: ' + wordToGuess);
            } else {
                alert('Sorry, you have lost. The word was: ' + wordToGuess);
            }
        }, 100); // Adjust the delay time as needed
    }

    private isLetter(str: string): boolean {
        return str.length === 1 && str.match(/[a-z]/i) !== null;
    }
}

// Export guessLetter function directly
export function guessLetter(game: Game, guess: string): fullGame {
    const solver = new HangmanGameSolver();
    return solver.guessLetter(game, guess);
}