
function checkWordEmpty() {
    if (word.length === 1 && word[0] === '') {
        throw new Error('word is empty');
    }
}

function findExclusiveLetters() {
    for (let i = 0; i < word.length; ++i) {
        if (!alphabet.includes(word[i])) {
            throw new Error(`exclusive letter - '${word[i]}' letter is not in alphabet`);
        }
    }
}

function checkEmptyStringInAlphabet() {
    for (let i = 0; i < alphabet.length; ++i) {
        if (alphabet[i] === '') {
            throw new Error('empty string are forbidden in alphabet');
        }
    }
}

function findForbiddenSymbols() {
    const forbidden = new Set();
    forbidden.add('#');
    forbidden.add('~');
    forbidden.add('>');
    forbidden.add('>');
    forbidden.add('=');
    let letter;
    for (let i = 0; i < alphabet.length; ++i) {
        letter = alphabet[i];
        for (let j = 0; j < letter.length; ++j) {
            if (forbidden.has(letter.at(j))) {
                throw new Error(`'${letter.at(j)}' forbidden symbol is used in alphabet`);
            }
        }
    }
}

function checkAlphabetEmpty() {
    if (alphabet.length === 1 && alphabet[0] === '') {
        throw new Error("alphabet must not be empty")
    }
}

function findDublicatesInAlphabet() {
    const alphabetForTest = new Array(); // seeks for doubled values
    for (let i = 0; i < alphabet.length; ++i) {
        alphabetForTest.push(alphabet[i]);
    }
    let elem;
    while (alphabetForTest.length !== 1 && alphabetForTest.length !== 0) {
        elem = alphabetForTest.pop();
        if (alphabetForTest.includes(elem)) {
            throw new Error("alphabet letters supposed to be unique");
        }
    }
}
