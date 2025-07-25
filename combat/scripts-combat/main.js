import { Personagem } from './personagem.js';
import { atualizarInterface, mostrarTecnicasNaImagem } from './interface.js';

// Recupera personagens selecionados do sessionStorage
const personagemSelecionado = JSON.parse(sessionStorage.getItem("personagemSelecionado"));
const oponenteSelecionado = JSON.parse(sessionStorage.getItem("oponenteSelecionado"));

// Redireciona caso não haja seleção
if (!personagemSelecionado || !oponenteSelecionado) {
    alert("Selecione os personagens antes de iniciar o combate!");
    window.location.href = "../index.html";
}

export let jogador = new Personagem(
    personagemSelecionado.nome,
    personagemSelecionado.tecnicas,
    // personagemSelecionado.regeneracao 
);

export let oponente = new Personagem(
    oponenteSelecionado.nome,
    oponenteSelecionado.tecnicas,
    // oponenteSelecionado.regeneracao 
);


// Controle de turno e bloqueio de ações
export let turno = 1;
let bloqueado = false;

export function setTurno(n) {
    turno = n;
}
export function bloquear() {
    bloqueado = true;
}
export function desbloquear() {
    bloqueado = false;
}
export function estaBloqueado() {
    return bloqueado;
}

// Inicialização do jogo ao carregar a página
window.onload = () => {
    atualizarInterface();
    mostrarTecnicasNaImagem();
    mostrarProntoParaAtacar();
};

// Permite uso do especial via botão global
window.usarEspecial = () => import('./combate.js').then(mod => mod.usarEspecial());
