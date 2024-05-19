document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const attemptsDisplay = document.getElementById('attempts');
    const symbols = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
    const cards = [...symbols, ...symbols];
    let firstCard = null;
    let secondCard = null;
    let lockBoard = false;
    let attempts = 0;
    let matches = 0;

    // Embaralha as cartas
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // Cria o tabuleiro
    function createBoard() {
        shuffle(cards);
        cards.forEach(symbol => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.symbol = symbol;
            card.addEventListener('click', flipCard);
            board.appendChild(card);
        });
    }

    // Vira a carta
    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;

        this.classList.add('flipped');
        this.textContent = this.dataset.symbol;

        if (!firstCard) {
            firstCard = this;
            return;
        }

        secondCard = this;
        lockBoard = true;
        attempts++;
        attemptsDisplay.textContent = `Tentativas: ${attempts}`;

        checkForMatch();
    }

    // Verifica se as cartas combinam
    function checkForMatch() {
        const isMatch = firstCard.dataset.symbol === secondCard.dataset.symbol;
        isMatch ? disableCards() : unflipCards();
    }

    // Desabilita as cartas que combinam
    function disableCards() {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        matches++;
        if (matches === symbols.length) {
            setTimeout(() => alert(`Parabéns! Você terminou o jogo em ${attempts} tentativas.`), 500);
        }
        resetBoard();
    }

    // Desvira as cartas que não combinam
    function unflipCards() {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            firstCard.textContent = '';
            secondCard.textContent = '';
            resetBoard();
        }, 1000);
    }

    // Reseta as variáveis do tabuleiro
    function resetBoard() {
        [firstCard, secondCard, lockBoard] = [null, null, false];
    }

    createBoard();
});
