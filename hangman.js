console.log("here's the game")


class Hangman {
    secretWord;
    guesses;
    lives;

    constructor(dictionary) {
        const randomIndex = Math.floor(Math.random()*dictionary.length)
        this.secretWord = dictionary[randomIndex].toLowerCase()
        this.guesses = []
        this.lives = 20
        }

    guess(letter) {
        if (!this.guesses.includes(letter)) {
            if (!this.secretWord.includes(letter)) {
                this.lives -= 1 
            }
            this.guesses.push(letter)
        }
        
    }

    getIncorrectGuesses() {
        const incorrectGuesses = []
        for (const guess of this.guesses) {
            if (!this.secretWord.includes(guess)) {
                incorrectGuesses.push(guess)
            }
        }
        return incorrectGuesses
    }

    getHanged() {
        const Hangman = []
        for (const letter of this.secretWord) {
            if (this.guesses.includes(letter)) {
                Hangman.push(letter) }
            else {
                Hangman.push("_")
            }
        }
        return Hangman
    }

    hasWon() {
        if (this.getHanged().join("") === this.secretWord) {
            return true
        }
        else {
            return false
        }
    }

    hasLost() {
        if (this.lives === 0) {
            return true
        }
        else {
            return false
        }
    }

    
}

function resetGame() {
    setTimeout( () => {
        window.location.reload()
    }, 4000)
}

async function Main() {
    const response = await fetch("https://raw.githubusercontent.com/MealTeamSixNZ/hangman/main/dict.txt")
    const text = await response.text()
    playGame(text.split("\n"))
}

function playGame(dictionary) {
    const h = new Hangman(dictionary)
    const button = document.getElementById("button")
    /**
     * @type {HTMLInputElement}
     */
    const input = document.getElementById("userInput")
    button.addEventListener("click", () => {
        h.guess(input.value)
        document.getElementById("lives").innerText = h.lives
        document.getElementById("incorrectGuesses").innerText = h.getIncorrectGuesses()
        document.getElementById("correctGuesses").innerText = h.getHanged()
        if (h.hasLost()) {
            document.getElementById("status").innerText = ` You lose. The word was ${h.secretWord}`
            resetGame()
        }
        else if (h.hasWon()) {
            document.getElementById("status").innerText = "You've won."
            resetGame()
        }
    })
}

Main()
