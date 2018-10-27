const randomWords = require('random-words');
const prompt = require('prompt');
const figlet = require('figlet');
const lolcatjs = require('lolcatjs');

var guessesLeft = 9;
var winningArray = [];
var usedLetters = [];

// Generate and return a random word.
function genRandWord() {
    let randWord = randomWords({ exactly: 1, maxLength: 10 });
    winningArray = randWord[0].split("");
    return randWord[0].split("");
};

function checkLetter(letter) {
    if (usedLetters.includes(letter)) {
        return true;
    } else {
        return false;
    };
};

function checkWin() {

    if (start.pseudoWordArray.join("") === winningArray.join("")) {
        return true;
    };
};

function CreateArrays(randWord) {
    this.randomWordArray = randWord,
        this.pseudoWordArray = [],
        this.createPseudoArray = function () {
            for (var i = 0; i < this.randomWordArray.length; i++) {
                this.pseudoWordArray.push("_");
                console.log(winningArray.join(""));
            };
        };

};

var start = new CreateArrays(genRandWord());
start.createPseudoArray();

function userInput() {

    prompt.start();

    prompt.get([{
        name: 'char',
        description: 'Guess a letter ',
        type: 'string',
    }], function (err, result) {

        if (guessesLeft > 0) {

            if (result.char.length === 1) {

                if (checkLetter(result.char) === true) {
                    lolcatjs.fromString("\nYou already tried that letter!");
                    console.log("\nGuesses left: " + guessesLeft);
                    lolcatjs.fromString("\n" + start.pseudoWordArray.join(" ") + "\n");
                    userInput();
                } else {

                    if (start.randomWordArray.includes(result.char)) {

                        for (var i = 0; i < start.randomWordArray.length; i++) {

                            if (start.randomWordArray.includes(result.char)) {
                                var element = start.randomWordArray.indexOf(result.char);
                                //console.log(element);
                                start.pseudoWordArray[element] = start.pseudoWordArray[element].replace("_", result.char);
                                start.randomWordArray[element] = start.randomWordArray[element].replace(result.char, "*");
                            };
                        };
                        usedLetters.push(result.char);
                        console.log("\n" + result.char + " is a correct letter!");
                        console.log("\nGuesses left: " + guessesLeft);
                        lolcatjs.fromString("\n" + start.pseudoWordArray.join(" ") + "\n");

                        if (checkWin()) {

                            figlet("CONGRATS!", function (err, gameWon) {
                                if (err) {
                                    console.log('Something went very wrong...');
                                    console.dir(err);
                                    return;
                                };
                                lolcatjs.fromString(gameWon);
                                console.log("   You saved Node, you're a hero!\n");
                                playAgain();
                            });
                        } else {
                            userInput();
                        };

                    } else {

                        console.log("\n" + result.char + " is not a correct letter!");
                        console.log("\nGuesses left: " + guessesLeft);
                        lolcatjs.fromString("\n" + start.pseudoWordArray.join(" ") + "\n");
                        //console.log("\n" + start.pseudoWordArray.join("") + "\n");
                        //console.log(winningArray.join(""));
                        userInput();
                    };

                    guessesLeft--;
                };

            } else {
                lolcatjs.fromString("\nYou must only enter 1 letter!");
                console.log("\nGuesses left: " + guessesLeft);
                lolcatjs.fromString("\n" + start.pseudoWordArray.join(" ") + "\n");
                userInput();
            };

        } else {

            figlet("GAME OVER!", function (err, gameOver) {
                if (err) {
                    console.log('Something went very wrong...');
                    console.dir(err);
                    return;
                };
                lolcatjs.fromString(gameOver);
                console.log("   Node is dead, way to go...\n");
                playAgain();
            });
        };
    });
};

figlet("HangNode", function (err, banner) {
    if (err) {
        console.log('Something went very wrong...');
        console.dir(err);
        return;
    };
    lolcatjs.fromString(banner);
});

setTimeout(function () {
    console.log("\n   You have 10 guesses before Node dies!!!");
    lolcatjs.fromString("\n" + start.pseudoWordArray.join(" ") + "\n");
    userInput();
}, 750);

function playAgain() {

    lolcatjs.fromString("Would you like to play again?\n");

    prompt.start();

    prompt.get([{
        name: 'answer',
        description: 'yes/no ',
        type: 'string',
    }], function (err, result) {

        if (result.answer === "yes") {
            guessesLeft = 9;
            start.pseudoWordArray = [];
            usedLetters = [];
            start = new CreateArrays(genRandWord());
            setTimeout(function () {
                start.createPseudoArray();
                userInput();
            }, 500);

        } else {
            return;
        };
    });
};