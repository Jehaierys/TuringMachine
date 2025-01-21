function fillLentWithLetters() {
    const lent = document.getElementById('lent');
    const cells = lent.children;
    let cell;
    for (let i = 0; i < word.length; ++i) {
        cell = cells.item(i);
        cell.textContent = word[i];
    }
}

function fillLentWithCells(quantity) {
    quantity = parseInt(quantity);
    const lent = document.getElementById('lent');
    let cell;
    for (let i = 0; i < quantity; ++i) {
        cell = document.createElement('p');
        cell.setAttribute('id', `${i}`);
        cell.setAttribute('title', `${i}`);
        cell.classList.add('lentCell');
        lent.appendChild(cell);
    }
}

class Lent {
    constructor() {
        this.map = new Map();
    }
}

/*
    Launches the main process
 */

async function launch() {
    const lent = new Map();
    let lentLength = 0;
    const cells = document.getElementById('lent').children;
    for (let i = 0; i < cells.length; ++i) {
        if (cells.item(i).textContent === '') {
            lent.set(i, 'X');
        } else {
            lent.set(i, cells.item(i).textContent);
        }
        ++lentLength;
    }
    // alert(lent.forEach((elem, i) => alert('"' + elem + '"' + ' ' + i)));
    let currentIndex = 0; // @todo
    let currentLetter = lent.get(currentIndex);
    let currentRecord = getAssociatedRecord(currentLetter, 1);
    alert('initial record:' + currentRecord);
    let currentCondition = extractConditionFrom(currentRecord);

    currentLetter = extractLetterFrom(currentRecord);
    updateCell(currentLetter, currentIndex);

    let shouldWeDoAnotherIteration = true;
    do {
        try {
            await sleep(4000).then(r => alert('Слава Гитлеру!'));
        } catch (e) {
            alert(e + 'catch section');
        }
        currentLetter = extractLetterFrom(currentRecord);
        currentIndex = nextCondition(currentIndex, currentRecord);
        currentCondition = extractConditionFrom(currentRecord);
        updateCell(currentLetter, currentIndex);
        alert('next iteration is coming');
    } while (shouldWeDoAnotherIteration);
}

function extractMoveSymbolFrom(record) {
    alert('extractMoveSymbolFrom log: ' + record.charAt(getMoveSymbolIndex(record)));
    return record.charAt(getMoveSymbolIndex(record));
}

function extractConditionFrom(record) { // works well
    let moveSymbolIndex = getMoveSymbolIndex(record);
    return record.substring(++moveSymbolIndex);
}

function updateCell(newLetter, index) {
    const cell = document.getElementById(`${index}`);
    cell.textContent = newLetter;
}

function nextCondition(currentIndex, record) {
    const moveSymbol = extractMoveSymbolFrom(record);
    switch (moveSymbol) {
        case '>':
            return ++currentIndex;
        case '<':
            return --currentIndex;
        case '=':
            return currentIndex;
        default:
            throw new Error("No move symbol found by nextCondition() method");
    }
}

function extractLetterFrom(record) { // works well
    const moveSymbolIndex = getMoveSymbolIndex(record);
    return record.substring(0, moveSymbolIndex);
}

function getMoveSymbolIndex(record) {
    const moveSymbols = ['>', '<', '='];
    let moveSymbolIndex;

    for (let i = 0; i < moveSymbols.length; ++i) {
        moveSymbolIndex = record.indexOf(moveSymbols[i]);
        if (moveSymbolIndex !== -1) {
            return moveSymbolIndex;
        }
    }
    throw new Error('No move symbol found');
}


/*
    @param letter is one of alphabet letters
    @param condition is number, matches Q-row value without 'q'
    Pulls specified record from the matrix
    @returns string of record
 */
function getAssociatedRecord(letter, condition) {
    return matrix.get(letter)[--condition];
}