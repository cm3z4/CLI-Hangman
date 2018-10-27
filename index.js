const randomWords = require('random-words');
const prompt = require('prompt');
const figlet = require('figlet');
const lolcatjs = require('lolcatjs');

var guessesLeft = 9;
var winningArray = [];

// Generate and return a random word.
function genRandWord() {
    let randWord = randomWords();
    winningArray = randWord.split("");
    return randWord;
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

var start = new CreateArrays(genRandWord().split(""));
start.createPseudoArray();

function userInput() {

    prompt.start();

    prompt.get([{
        name: 'char',
        description: 'Guess a letter ',
        type: 'string',
    }], function (err, result) {

        if (guessesLeft > 0) {

            if (start.randomWordArray.includes(result.char)) {
                console.log("Testing");
                for (var i = 0; i < start.randomWordArray.length; i++) {

                    if (start.randomWordArray.includes(result.char)) {
                        var element = start.randomWordArray.indexOf(result.char);
                        //console.log(element);
                        start.pseudoWordArray[element] = start.pseudoWordArray[element].replace("_", result.char);
                        start.randomWordArray[element] = start.randomWordArray[element].replace(result.char, "*");
                    };
                };
                console.log("\n" + result.char + " is a correct letter!");
                lolcatjs.fromString("\n" + start.pseudoWordArray.join(" ") + "\n");
                //console.log("\n" + start.pseudoWordArray.join("") + "\n");
                //console.log(winningArray.join(""));
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

                console.log("\n" + result.char + " is not a correct letter!\n");
                lolcatjs.fromString(start.pseudoWordArray.join(" ") + "\n");
                //console.log("\n" + start.pseudoWordArray.join("") + "\n");
                //console.log(winningArray.join(""));
                userInput();
            };

            guessesLeft--;

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
            start = new CreateArrays(genRandWord().split(""));
            setTimeout(function () {
                start.createPseudoArray();
                userInput();
            }, 500);

        } else {
            return;
        };
    });
};