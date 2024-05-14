export type fullGame = [Game | null, boolean]

export interface Game {
    wordToGuess: string
    displayedWord: string
    guessedLetters: string[]
    lives: number
}