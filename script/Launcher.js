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

// class Launcher {
//     constructor() {
//
//     }
//
// }

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
    let index = 0; // @todo
    let currentLetter = lent.get(index);
    let record = getAssociatedRecord(currentLetter, 'q1');
    // alert('initial record:' + record);
    let letterToWriteIn;
    let currentCondition = extractConditionFrom(record);

    let shouldWeDoAnotherIteration = true;

    do {
        try {
            await sleep(1000).then(r => {});
        } catch (e) {
            alert(e + 'catch section');
        }

        // extract new letter and write it into the cell
        letterToWriteIn = extractLetterFrom(record);
        // alert('Letter to write in: "' + letterToWriteIn + '"');
        updateCell(letterToWriteIn, index);
        lent.set(index, letterToWriteIn);

        // switch to the next position
        index = nextPosition(index, record);
        // alert('Next position: ' + index + '"');

        // save initial cell's value to search for next record
        // alert('current letter : "' + lent.get(index) + '"');
        currentLetter = lent.get(index);

        // extract and update current condition
        currentCondition = extractConditionFrom(record);
        // alert('Current condition: "' + currentCondition + '"');

        // update record by former letter and new condition
        record = getAssociatedRecord(currentLetter, currentCondition);
        // alert('New record: "' + record + '"');

        // alert('next iteration is coming');
    } while (shouldWeDoAnotherIteration);
}

function extractMoveSymbolFrom(record) {
    // alert('extractMoveSymbolFrom log: ' + record.charAt(getMoveSymbolIndex(record)));
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

function nextPosition(index, record) {
    const moveSymbol = extractMoveSymbolFrom(record);
    switch (moveSymbol) {
        case '>':
            return ++index;
        case '<':
            return --index;
        case '=':
            return index;
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
function getAssociatedRecord(letter, q) {
    q = parseInt(q.substring(1));
    return matrix.get(letter)[--q];
}