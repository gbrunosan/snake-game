const tamanho = 20;
let cobrinha;
let direcao;
let intervalo;
const tabuleiro = document.getElementById('tabuleiro');
const btnReiniciar = document.getElementById('reiniciar');
const modal = document.getElementById('modal');

function criaTabuleiro() {
    tabuleiro.innerHTML = '';
    for (let i = 0; i < tamanho * tamanho; i++) {
        const quadrado = document.createElement('div');
        quadrado.classList.add('quadradinho');
        tabuleiro.appendChild(quadrado);
    }
}

function criarCobrinha() {
    const quadrados = document.querySelectorAll('.quadradinho');
    quadrados.forEach(quadrado => quadrado.classList.remove('cobrinha'));

    cobrinha.forEach(segment => {
        const index = segment.y * tamanho + segment.x;
        quadrados[index].classList.add('cobrinha');
    });
}

function movimentar() {
    const cabeca = { ...cobrinha[0] };

    if (direcao === 'right') cabeca.x++;
    if (direcao === 'left') cabeca.x--;
    if (direcao === 'up') cabeca.y--;
    if (direcao === 'down') cabeca.y++;

    // Colidir no tabuleiro
    if (cabeca.x < 0 || cabeca.x >= tamanho || cabeca.y < 0 || cabeca.y >= tamanho) {
        fimDeJogo();
        return;
    }

    // Colidir nela mesma
    if (cobrinha.some(segment => segment.x === cabeca.x && segment.y === cabeca.y)) {
        fimDeJogo();
        return;
    }

    cobrinha.unshift(cabeca);

    cobrinha.pop();

    criarCobrinha();
}

function comandos(event) {
    if (event.key === 'ArrowUp' && direcao !== 'down') {
        direcao = 'up';
    } else if (event.key === 'ArrowDown' && direcao !== 'up') {
        direcao = 'down';
    } else if (event.key === 'ArrowLeft' && direcao !== 'right') {
        direcao = 'left';
    } else if (event.key === 'ArrowRight' && direcao !== 'left') {
        direcao = 'right';
    }
}

function fimDeJogo() {
    clearInterval(intervalo);
    modal.style.display = 'flex';
}

function reiniciar() {
    cobrinha = [
        { x: 10, y: 10 },
        { x: 9, y: 10 },
        { x: 8, y: 10 }
    ];
    direcao = 'right';
    criaTabuleiro();
    criarCobrinha();
    modal.style.display = 'none';
    intervalo = setInterval(movimentar, 200);
}

function iniciar() {
    cobrinha = [
        { x: 10, y: 10 },
        { x: 9, y: 10 },
        { x: 8, y: 10 }
    ];
    direcao = 'right';
    criaTabuleiro();
    criarCobrinha();

    document.addEventListener('keydown', comandos);

    intervalo = setInterval(movimentar, 200);

    btnReiniciar.addEventListener('click', reiniciar);
}

iniciar();