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

async function invokeCommandReader() {
    await sleep(300);
    const display = document.getElementById('display');
    let command = display.children.item(display.children.length - 1).textContent.trim();
    let p, message;
    switch (command) {
        case '#clear -t':
        case '#clear terminal':
            while (display.children.length !== 0) {
                display.children.item(0).remove();
            }
            break;
        case '#clear -a':
        case '#clear alphabet':
            let alphabetInput = document.getElementById('alphabet');
            alphabetInput.value = '';
            updateAlphabet();
            break;
        case '#clear -w':
        case '#clear word':
            let wordInput = document.getElementById('word');
            wordInput.value = '';
            updateWord();
            break;
        case '#print alphabet':
        case '#print -a':
            p = document.createElement('p');
            updateAlphabet();
            if (alphabet[0] === '' && alphabet.length === 1) {
                message = 'alphabet is empty';
                p.textContent = message;
                display.appendChild(p);
                break;
            }
            message = 'alphabet: ';
            for (let i = 0; i < alphabet.length - 1; ++i) {
                message = message + alphabet[i] + ', ';
            }
            message = message + alphabet[alphabet.length - 1];
            p.textContent = message;
            display.appendChild(p);
            break;
        case '#print word':
        case '#print -w':
            updateWord();
            p = document.createElement('p');
            if (word[0] === '' && word.length === 1) {
                message = 'word is empty';
                p.textContent = message;
                display.appendChild(p);
                break;
            }
            message = 'the word: ';
            for (let i = 0; i < word.length - 1; ++i) {
                message = message + word[i] + ', ';
            }
            message = message + word[word.length - 1];
            p.textContent = message;
            display.appendChild(p);
            break;
        case '#build':
            build();
            break;
        case '#help':
            help();
            break;
        case '#copy':
            p = document.createElement('p');
            p.textContent = hash()
            display.appendChild(p);
            navigator.clipboard.writeText(hash())
                .then(() => {
                    console.log("Copied to the clipboard!");
                })
                .catch((err) => {
                    console.error("Error occurred trying to copy: ", err);
                });
            break;
        case '#launch':
            build();
            launch();
            break
    }
    display.scrollTop = display.scrollHeight;
}

function addConsoleListener() {
    const console = document.getElementById('console');
    console.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            const display = document.getElementById('display');
            let p = document.createElement('p');
            p.textContent = '#' + console.value;
            display.appendChild(p);
            invokeCommandReader();
        }
    });
}

function hash() {
    // initial
    let hash = '~';
    const table = document.getElementsByTagName('table')[0];
    const rowLength = table.children.item(0).children.item(0).children.length;

    // Q
    hash = hash + (rowLength - 2) + 'q~'; // excluding cell with buttons and alphabet column
    const cells = document.getElementsByClassName('cell');

    // alphabet
    updateAlphabet();
    for (let i = 0; i < alphabet.length; ++i) {
        hash = hash + alphabet[i] + '%';
    }
    hash = hash + '~';

    // word
    updateWord();
    for (let i = 0; i < word.length; ++i) {
        hash = hash + word[i] + '%';
    }
    hash = hash + '~';

    // cells
    for (let i = 0; i < cells.length; ++i) {
        hash = hash + cells.item(i).value + '%';
    }
    hash = hash + '~';

    return hash;
}