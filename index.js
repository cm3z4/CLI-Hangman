const randomWords = require('random-words');
const prompt = require('prompt');

var guessesLeft = 9;

// Generate and return a random word.
function genRandWord() {
    return randomWords();
};

function CreateArrays(randWord) {
    this.randomWordArray = randWord,
        this.pseudoWordArray = [],
        this.createPseudoArray = function () {
            for (var i = 0; i < this.randomWordArray.length; i++) {
                this.pseudoWordArray.push("_");
            };
            console.log("\n" + this.pseudoWordArray.join(" ") + "\n");
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

                for (var i = 0; i < start.randomWordArray.length; i++) {

                    if (start.randomWordArray.includes(result.char)) {
                        var element = start.randomWordArray.indexOf(result.char);
                        //console.log(element);
                        start.pseudoWordArray[element] = start.pseudoWordArray[element].replace("_", result.char);
                        start.randomWordArray[element] = start.randomWordArray[element].replace(result.char, "*");
                    };
                };
                console.log("\n" + result.char + " is a corect letter!");
                console.log("\n" + start.pseudoWordArray.join(" ") + "\n");
                userInput();
            } else {
                console.log("\n" + result.char + " is not a corect letter!");
                console.log(start.pseudoWordArray.join(" ") + "\n");
                userInput();
            };

            guessesLeft--;
        };
    });
};

//console.log(start.randomWordArray.join(" "));
console.log("You have 10 guesses before the guy dies!!!\n");
userInput();