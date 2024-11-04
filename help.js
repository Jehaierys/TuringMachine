function help() {
    const helpSection = document.getElementById('help');
    helpSection.style.display = 'block';
}

function switchTo(page) {
    const terminalArticle = document.getElementById('terminal_article');
    const alphabetArticle = document.getElementById('alphabet_article');
    const tableArticle = document.getElementById('table_article');

    switch (page) {
        case 'terminal':
            alphabetArticle.style.display = 'none';
            tableArticle.style.display = 'none';
            terminalArticle.style.display = 'block';
            break;
        case 'alphabet':
            alphabetArticle.style.display = 'block';
            tableArticle.style.display = 'none';
            terminalArticle.style.display = 'none';
            break;
        case 'table':
            alphabetArticle.style.display = 'none';
            tableArticle.style.display = 'block';
            terminalArticle.style.display = 'none';
            break;
    }
}

function exitFromHelp() {
    const helpSection = document.getElementById('help');
    helpSection.style.display = 'none';
}