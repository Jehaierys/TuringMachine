function updateFirstColumn() {
    const trList = document.getElementsByTagName('tbody')[0].children;
    if (alphabet.length > trList.length) {
        let difference = alphabet.length - trList.length;
        while (difference > 0) {
            --difference;
            addRow();
        }
    } else if (alphabet.length < trList.length) {
        let difference = trList.length - alphabet.length;
        while (difference !== 0) {
            --difference;
            eraseRow();
        }
    }
    let td;
    for (let i = 0; i < trList.length; ++i) {
        td = trList.item(i).children.item(0);
        td.textContent = alphabet[i];
    }
}

function addColumn() {
    const thead = document.getElementsByTagName('thead')[0];
    const tr = thead.children[0];
    const columns = tr.children;
    const buttoned = columns.item(columns.length - 1);
    const th = document.createElement('th');
    const tbody = document.getElementsByTagName('tbody').item(0); // access the only one tbody tag on page
    let td, input;
    columns.item(columns.length - 1).remove();
    th.textContent = 'q' + (columns.length);
    tr.appendChild(th);
    tr.appendChild(buttoned);
    for (let i = tbody.children.length - 1; i !== -1; --i) { // walks around all rows and adds a cell to everyone
        td = document.createElement('td');
        input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('class', 'cell');
        td.appendChild(input);
        tbody.children.item(i).appendChild(td);
    }
}

function eraseColumn() {
    const thead = document.getElementsByTagName('thead')[0];
    let tr = thead.children[0];
    const columns = tr.children;
    const toRemove = columns.item(columns.length - 2);
    const tbody = document.getElementsByTagName('tbody').item(0); // access the only one tbody tag on page
    let td;
    toRemove.remove();
    for (let i = tbody.children.length - 1; i !== -1; --i) {
        tr = tbody.children.item(i);
        td = tr.children.item(tr.children.length - 1);
        td.remove();
    }
}

function addRow() {
    const tbody = document.getElementsByTagName('tbody').item(0);
    const tdForLetter = document.createElement('td');
    const tr = document.createElement('tr');
    //const buttoned = document.getElementById('buttonedForRow');
    let quantityOfColumnsToCreate = document.getElementsByTagName('thead')[0].children[0].children.length - 2;
    let td, input;
    tdForLetter.classList.add('letter');
    tr.appendChild(tdForLetter);
    for (let i = 0; i < quantityOfColumnsToCreate; ++i) {
        td = document.createElement('td');
        input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.classList.add('cell');
        td.appendChild(input);
        tr.appendChild(td);
    }
    tbody.appendChild(tr);
    //tbody.appendChild(buttoned);
}

function eraseRow() {
    const tbody = document.getElementsByTagName('tbody').item(0);
    //const buttoned = document.getElementById('buttonedForRow');
    let trToRemove;
    //buttoned.remove();
    trToRemove = tbody.children.item(tbody.children.length - 1);
    trToRemove.remove();
    //tbody.appendChild(buttoned);
}