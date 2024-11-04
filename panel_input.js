function addLabelListeners() {
    const alphabetLabel = document.getElementById('labelForAlphabet');
    const wordLabel = document.getElementById('labelForWord');
    const alphabetInput = document.getElementById('alphabet');
    const wordInput = document.getElementById('word');

    alphabetInput.addEventListener('focusin', () => {
        alphabetLabel.style.color = '#FFFF00';
    });
    wordInput.addEventListener('focusin', () => {
        wordLabel.style.color = '#FFFF00';
    });
    alphabetInput.addEventListener('focusout', () => {
        alphabetLabel.style.color = '#FF4081';
    });
    wordInput.addEventListener('blur', () => {
        wordLabel.style.color = '#FF4081';
    });
}

let alphabet;
function updateAlphabet() {
    alphabet = []; // equals to word.clear()
    let value = document.getElementById('alphabet').value;
    value.trim();
    let startParemphasis = value.indexOf('{');
    value = value.substring(startParemphasis + 1); // get substring without '{'
    let edge, letter;
    cycle: {
        while (true) {
            edge = value.indexOf(',');
            if (edge === -1) {
                edge = value.indexOf('}');
                letter = value.substring(0, edge);
                letter = letter.trim();
                alphabet.push(letter);
                break cycle;
            }
            letter = value.substring(0, edge);
            letter = letter.trim();
            alphabet.push(letter);
            value = value.substring(edge + 1);
        }
    }
}

let word;
function updateWord() {
    word = []; // equals to word.clear()
    let value = document.getElementById('word').value.trim() + '}';
    let edge, letter;
    cycle: {
        while (true) {
            edge = value.indexOf(',');
            if (edge === -1) {
                edge = value.indexOf('}');
                letter = value.substring(0, edge);
                letter = letter.trim();
                word.push(letter);
                break cycle;
            }
            letter = value.substring(0, edge);
            letter = letter.trim();
            word.push(letter);
            value = value.substring(edge + 1);
        }
    }
}
