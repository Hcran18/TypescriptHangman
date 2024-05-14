import { fullGame, Game} from './Game'

export function startGame(word: string) : fullGame {

    if (!checkSubmissionIsWord(word)) {
        return [null, false];
    }

    const game: Game = {
        wordToGuess: word.toLowerCase(),
        displayedWord: word.replace(/\w/g, '_ '),
        guessedLetters: [],
        lives: 6
    }

    return [game, true];
}

function checkSubmissionIsWord (word: string): boolean {
    if (!isWord(word)) {
        alert('Please enter a word');
        return false;
    }
    else {
        return true;
    }
}

function isWord (str: string): boolean {
    return str.match(/^[a-z]+$/i) !== null;
}