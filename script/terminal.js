function addConsoleListener() {
    const console = document.getElementById('console');
    console.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            const display = getDisplay();
            const p = document.createElement('p');
            const octothrop = document.createElement('span');
            const text = document.createElement('span');
            text.textContent = console.value;
            octothrop.textContent = '#';
            octothrop.classList.add('octothrop');
            p.appendChild(octothrop);
            p.appendChild(text);
            p.classList.add('terminal');
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
            prebuild(extractModifier(command)); // modifier is token
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
            await launch();
            break;
        default:
            noSuchCommand();
    }
    display.scrollTop = display.scrollHeight;
}

function prebuild(modifier) { // modifier is token
    if (modifier === null) {
        alert('modifier is empty');
        return;
    }
    const token = { value: modifier };

    const q = extractQAndResizeTable(token);
    extractAlphabet(token);
    extractWord(token);
    extractTableSettings(token, q);
}

function extractQAndResizeTable(token) {
    const tilda = token.value.indexOf('~');
    const q = token.value.indexOf('q');
    const quantity = token.value.substring(tilda + 1, q);
    token.value = token.value.substring(q + 1); // truncate token

    let currentHeaderLength = document.getElementById('table').children.item(0).children.item(0).children.length - 2; // excluding cells with buttons and title
    resizeTable(parseInt(currentHeaderLength - quantity));

    return parseInt(quantity);
}

function resizeTable(i) {
    if (i > 0) {
        while (i !== 0) {
            eraseColumn();
            --i;
        }
    } else {
        while (i !== 0) {
            addColumn();
            ++i;
        }
    }
}

function extractAlphabet(token) {
    const startTilda = token.value.indexOf( '~',);
    const endTilda = token.value.indexOf('~', 2);
    let part = token.value.substring(startTilda + 1, endTilda);
    token.value = token.value.substring(part.length + 1);
    let newAlphabet = '{';
    while (part.includes('%')) {
        newAlphabet += part.substring(0, part.indexOf('%')) + ', ';
        part = part.substring(part.indexOf('%') + 1);
    }
    newAlphabet += part + '}'; // last iteration
    getAlphabetField().value = newAlphabet;
}

function extractWord(token) {
    let part = token.value.substring(1, token.value.indexOf('~', 2));
    token.value = token.value.substring(part.length + 1);
    let newWord = '';
    while (part.includes('%')) {
        newWord += part.substring(0, part.indexOf('%')) + ', ';
        part = part.substring(part.indexOf('%') + 1);
    }
    newWord += part;
    getWordField().value = newWord;
}

function extractTableSettings(token, q) {
    token.value = token.value.trim().substring(1, token.value.length - 1); // in the rest remains only table string
    const arr = token.value.split('%');
    const cells = document.getElementsByClassName('cell');
    for (let i = 0; i < cells.length; ++i) {
        cells.item(i).value = arr[i];
    }
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
    if (firstSpace === -1) {
        return null;
    }
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
        if (i < alphabet.length - 1) {  // omit last '%' in alphabet part of token
            hash += alphabet[i] + '%';
        } else {
            hash += alphabet[i] + '~';
        }
    }

    // word
    updateWord();
    for (let i = 0; i < word.length; ++i) {
        if (i < word.length - 1) {
            hash += word[i] + '%';
        } else {
            hash += word[i] + '~';
        }
    }

    // cells
    for (let i = 0; i < cells.length; ++i) {
        if (i < cells.length - 1) {
            hash += cells.item(i).value + '%';
        } else {
            hash += cells.item(i).value + '~'
        }
    }

    return hash;
}

function reportInTerminal() {
    const display = getDisplay();
    const p = paragraph();

    p.textContent = token();
    display.appendChild(p);
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
