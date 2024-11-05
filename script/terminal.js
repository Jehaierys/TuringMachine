function addConsoleListener() {
    const console = document.getElementById('console');
    console.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            const display = getDisplay();
            let p = document.createElement('p');
            p.classList.add('terminal');
            p.innerHTML = '<span class="octothrop">#</span>' + console.value;
            display.appendChild(p);
            console.value = '';
            invokeCommandReader();
        }
    });
}

async function invokeCommandReader() {
    await sleep(300);
    let command = getLastCommand();
    let core = getCommandCore(command);
    switch (core) {
        case '#-w':
            updateWordThroughTerminal();
            break;
        case '#clear':
            clear(extractModifier(command));
            break;
        case '#print':
            print(extractModifier(command));
            break;
        case '#build':
            build();
            break;
        case '#help':
            help();
            break;
        case '#copy':
            copy();
            break;
        case '#launch':
            build();
            launch();
            break;
        default:
            noSuchCommand();
    }
    display.scrollTop = display.scrollHeight;
}

function getCommandCore(command) {
    if (!command.includes(' ')) {
        return command;
    }
    let firstSpace = command.indexOf(' ');
    return command.substring(0, firstSpace);
}

function extractModifier(command) {
    const firstSpace = command.indexOf(' ');
    let secondSpace = command.indexOf(' ', firstSpace + 1);
    if (secondSpace === -1) {
        secondSpace = command.length;
    }
    return command.substring(firstSpace + 1, secondSpace);
}

function getLastCommand() {
    return getDisplay().children.item(getDisplay().children.length - 1).textContent.trim()
}

function getDisplay() {
    return document.getElementById('display');
}

function paragraph() {
    const paragraph = document.createElement('p');
    paragraph.classList.add('terminal');
    return paragraph;
}

function updateWordThroughTerminal() {
    const display = getDisplay();
    let p, message;

    updateWord();
    message = 'previous: ';
    p = document.createElement('p');
    p.classList.add('terminal');
    for (let i = 0; i < word.length - 1; ++i) {
        message = message + word[i] + ', ';
    }
    message = message + word[word.length - 1];
    p.textContent = message;
    display.appendChild(p);

    let command = display.children.item(display.children.length - 2).textContent;
    let newWordBeginning = command.indexOf('#-w');
    let newWord = command.substring(newWordBeginning + 3).trim();
    const wordInput = document.getElementById('word');
    wordInput.value = '';
    wordInput.value = newWord;

    updateWord();
    message = 'new: ';
    for (let i = 0; i < word.length - 1; ++i) {
        message = message + word[i] + ', ';
    }
    message = message + word[word.length - 1];
    p = document.createElement('p');
    p.classList.add('terminal');
    p.textContent = message;
    display.appendChild(p);
}

function print(modifier) {
    const display = getDisplay();
    let p = paragraph();
    let message;
    switch (modifier) {
        case '-a':
        case 'alphabet':
            updateAlphabet();
            if (alphabet[0] === '' && alphabet.length === 1) {
                message = 'alphabet is empty';
                p.textContent = message;
                display.appendChild(p);
                return;
            }
            message = 'alphabet: ';
            for (let i = 0; i < alphabet.length - 1; ++i) {
                message = message + alphabet[i] + ', ';
            }
            message = message + alphabet[alphabet.length - 1];
            p.textContent = message;
            display.appendChild(p);
            break;
        case '-w':
        case 'word':
            updateWord();
            p = paragraph();
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
        case 'token':
            p = paragraph();
            message = token();
            p.textContent = message;
            display.appendChild(p);
            break;
    }
}

function clear(modifier) {
    const display = getDisplay();
    switch (modifier) {
        case '-w':
        case 'word':
            let wordInput = document.getElementById('word');
            wordInput.value = '';
            updateWord();
            break;
        case '-a':
        case 'alphabet':
            let alphabetInput = document.getElementById('alphabet');
            alphabetInput.value = '';
            updateAlphabet();
            break;
        case '-t':
        case 'terminal':
            while (display.children.length !== 0) {
                display.children.item(0).remove();
            }
            break;
    }
}

function token() {
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

function noSuchCommand() {
    const display = getDisplay();
    const p = paragraph();
    p.textContent = 'no such command';
    p.classList.add('terminal');
    display.appendChild(p);
}

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
