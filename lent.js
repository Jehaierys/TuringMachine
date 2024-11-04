
function fillLentWithWord() {
    const lent = document.getElementById('lent');
    const cells = lent.children;
    let cell;
    for (let i = 0; i < word.length; ++i) {
        cell = cells.item(i);
        cell.textContent = word[i];
    }
}

function prepareLent(quantity) {
    quantity = parseInt(quantity);
    const lent = document.getElementById('lent');
    let cell;
    for (let i = 1; i <= quantity; ++i) {
        cell = document.createElement('p');
        cell.setAttribute('id', `${i}`);
        cell.setAttribute('title', `${i}`);
        cell.classList.add('lentCell');
        lent.appendChild(cell);
    }
}