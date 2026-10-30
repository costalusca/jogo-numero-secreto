// ===== Configuração =====
const NUMERO_MINIMO = 1;
const NUMERO_MAXIMO = 100;
const MAX_TENTATIVAS = 10;

// ===== Estado do jogo =====
let numeroSecreto;
let tentativasRestantes;
let jogoEncerrado;

// ===== Elementos do DOM =====
const inputPalpite = document.getElementById('palpite');
const btnChutar = document.getElementById('btn-chutar');
const btnReiniciar = document.getElementById('btn-reiniciar');
const paragrafoMensagem = document.getElementById('mensagem');
const paragrafoTentativas = document.getElementById('tentativas');

// ===== Funções =====
function gerarNumeroAleatorio() {
  return Math.floor(Math.random() * (NUMERO_MAXIMO - NUMERO_MINIMO + 1)) + NUMERO_MINIMO;
}

function exibirMensagem(texto, tipo = '') {
  paragrafoMensagem.textContent = texto;
  paragrafoMensagem.className = 'mensagem ' + tipo;
}

function exibirTentativas() {
  paragrafoTentativas.textContent = `Tentativas restantes: ${tentativasRestantes}`;
}

function encerrarJogo() {
  jogoEncerrado = true;
  inputPalpite.disabled = true;
  btnChutar.disabled = true;
  btnReiniciar.classList.remove('oculto');
}

function iniciarJogo() {
  numeroSecreto = gerarNumeroAleatorio();
  tentativasRestantes = MAX_TENTATIVAS;
  jogoEncerrado = false;

  inputPalpite.disabled = false;
  btnChutar.disabled = false;
  inputPalpite.value = '';
  inputPalpite.focus();
  btnReiniciar.classList.add('oculto');

  exibirMensagem(`Digite um número entre ${NUMERO_MINIMO} e ${NUMERO_MAXIMO} e clique em "Chutar".`);
  exibirTentativas();
}

function chutar() {
  if (jogoEncerrado) return;

  const palpite = parseInt(inputPalpite.value, 10);

  // Validação: palpites inválidos não consomem tentativa
  if (isNaN(palpite) || palpite < NUMERO_MINIMO || palpite > NUMERO_MAXIMO) {
    exibirMensagem(`Palpite inválido! Digite um número entre ${NUMERO_MINIMO} e ${NUMERO_MAXIMO}.`, 'erro');
    inputPalpite.focus();
    return;
  }

  tentativasRestantes--;
  exibirTentativas();

  // Comparação com o número secreto
  if (palpite === numeroSecreto) {
    const usadas = MAX_TENTATIVAS - tentativasRestantes;
    const plural = usadas === 1 ? 'tentativa' : 'tentativas';
    exibirMensagem(`🎉 Acertou! O número era ${numeroSecreto}. Você usou ${usadas} ${plural}.`, 'vitoria');
    encerrarJogo();
    return;
  }

  // Fim das tentativas
  if (tentativasRestantes === 0) {
    exibirMensagem(`😢 Fim de jogo! O número secreto era ${numeroSecreto}.`, 'derrota');
    encerrarJogo();
    return;
  }

  // Dica
  if (palpite < numeroSecreto) {
    exibirMensagem(`O número secreto é maior que ${palpite}.`, 'dica');
  } else {
    exibirMensagem(`O número secreto é menor que ${palpite}.`, 'dica');
  }

  inputPalpite.value = '';
  inputPalpite.focus();
}

// ===== Eventos =====
btnChutar.addEventListener('click', chutar);
btnReiniciar.addEventListener('click', iniciarJogo);
inputPalpite.addEventListener('keydown', (evento) => {
  if (evento.key === 'Enter') chutar();
});

// ===== Início =====
iniciarJogo();