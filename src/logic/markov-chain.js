// function to remove all non-text symbols from a string
function leaveCharacters(text, regex) {
    return text.replace(regex, " ");
}

//function to add spaces before and after punctuation marks
function separatePunctuation(text) {
    return text.replace(/([.,!?])/g, " $1 ");
}

// function to remove all extra spaces from a string
function removeExtraSpaces(text) {
    return text.replace(/\s+/g, " ");
}

// function to get set of words from a string
function getWordsSet(text) {
    return new Set(text.split(" "));
}

// function to get all adjecent words from a string
function getAdjecentWords(text) {
    const words = text.split(" ");
    const adjecentWords = [];
    for (let i = 0; i < words.length - 1; i++) {
        adjecentWords.push([words[i], words[i + 1]]);
    }
    return adjecentWords;
}


// function to make a transition matrix from a word set and a list of adjecent words
function makeTransitionMatrix(wordsSet, adjecentWords) {
    const transitionMatrix = {};
    wordsSet.forEach(word => {
        transitionMatrix[word] = {};
        wordsSet.forEach(word2 => {
            transitionMatrix[word][word2] = 0;
        });
    });
    adjecentWords.forEach(adjecentWord => {
        transitionMatrix[adjecentWord[0]][adjecentWord[1]] += 1;
    });
    wordsSet.forEach(word => {
        const total = Object.values(transitionMatrix[word]).reduce((a, b) => a + b);
        wordsSet.forEach(word2 => {
            transitionMatrix[word][word2] /= total;
        });
    });
    return transitionMatrix;
}

// function to make a transition matrix from a string
function preprocess(text, settings) {
    if (!settings['capital-letters']) {
        text = text.toLowerCase();
    }
    if (!settings['punctuation']) {
        text = leaveCharacters(text, /[^a-zA-Zа-яА-Яё]/g);
    }
    else {
        text = leaveCharacters(text, /[^a-zA-Zа-яА-Яё.,!?–-—]/g);
        text = separatePunctuation(text);
    }
    text = removeExtraSpaces(text);
    const wordsSet = getWordsSet(text);
    const adjecentWords = getAdjecentWords(text);

    return [
        wordsSet,
        makeTransitionMatrix(wordsSet, adjecentWords)
    ];
}

function getNextWord(word, transitionMatrix) {
    const nextWords = Object.keys(transitionMatrix[word]);
    const nextWordsProbabilities = Object.values(transitionMatrix[word]);

    const random = Math.random();

    let sum = 0;
    for (let i = 0; i < nextWords.length; i++) {
        sum += nextWordsProbabilities[i];
        if (random < sum) {
            return nextWords[i];
        }
    }
}

function generate(wordSet, transitionMatrix, settings) {
    const words = Array.from(wordSet);

    if (words[0] === undefined) {
        return "Try again";
    }

    let word = words[0],
        endWord = words[words.length - 1];
    let text = word;
    while (word !== endWord) {
        word = getNextWord(word, transitionMatrix);
        text += " " + word;
    }
    // text += " " + endWord;

    if (settings['punctuation']) {
        text = text.replace(/ ([.,!?])/g, "$1");
    }

    return text;
}

module.exports = { preprocess, generate };