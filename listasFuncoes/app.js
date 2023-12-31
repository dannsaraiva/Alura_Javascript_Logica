//Variáveis.
let numerosSorteados = [];
let numeroMaximo = 10;
let titulo = "Número secreto";
let descricao = "Digite o número entre 1 e 10";
let numeroSecreto = gerarNumeroAleatorio();
let numeroDigitado;
let tentativas = 1;

//Método atribui o texto.
function trocarTextos(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;

    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', { rate: 1.0 });
};

//Mensagem inicial.
function mensagemInicial() {
    trocarTextos('h1', titulo);
    trocarTextos('p', descricao);
};
mensagemInicial();

//Gerar numero aleatório.
function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroMaximo + 1);
    let quantidadeNumeroEscolhido = numerosSorteados.length;

    if (quantidadeNumeroEscolhido == numeroMaximo) {
        numerosSorteados = []
    };
    if (numerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        numerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
};

//Método verifica o número.
function verificarNumero() {
    numeroDigitado = document.querySelector('input').value;

    if (numeroDigitado == numeroSecreto) {
        trocarTextos('h1', "Acertou!!");

        //Decide a palavra tentativa.
        let quantidadeTentativa = tentativas > 1 ? "tentativas." : "tentativa.";
        let mensagemTentativas = `Número secreto é ${numeroSecreto}, você descobriu com ${tentativas} ${quantidadeTentativa}`;

        trocarTextos('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (numeroDigitado > numeroSecreto) {
            trocarTextos('p', `Número secreto é menor!`);
        } else {
            trocarTextos('p', `Número secreto é maior!`);
        }
        limparCampo();
        tentativas++;
    }
};

//Limpar campo.
function limparCampo() {
    numeroDigitado = document.querySelector('input');
    numeroDigitado.value = "";
};

//Botão novo jogo.
function novoJogo() {
    reiniciarJogo();
};

//Reiniciar o jogo.
function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    mensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
};
