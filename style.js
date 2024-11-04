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
