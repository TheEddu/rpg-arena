import {
  atualizarInterface,
  mostrarDano,
  mostrarTecnicasNaImagem,
  exibirMensagem,
  mostrarProntoParaAtacar,
  mostrarImagemCentral
} from './interface.js';

import {
  jogador,
  oponente,
  turno,
  setTurno,
  bloquear,
  desbloquear,
  estaBloqueado
} from './main.js';

// Texto de dano
function textoDano(atacante, alvo, tecnica, dano) {
  return `${atacante.nome} usou ${tecnica} e causou ${dano} de dano em ${alvo.nome}!`;
}

// Aplicar dano
export function aplicarDano(atacante, alvo, tecnica) {
  const maxDano = atacante.tecnicas[tecnica];
  const dano = Math.floor(Math.random() * (maxDano + 1));
  alvo.vida = Math.max(0, alvo.vida - dano);
  return textoDano(atacante, alvo, tecnica, dano);
}

// Processa rodada do jogador
export function processarRodada(tecnicaEscolhida) {
  if (estaBloqueado()) return;
  bloquear();

  const texto = aplicarDano(jogador, oponente, tecnicaEscolhida);
  mostrarDano(texto);
  atualizarInterface();

  setTimeout(() => {
    // const regen = jogador.regenerar();
    //mostrarDano(`${jogador.nome} regenera ${regen} de vida`);
    atualizarInterface();

    setTimeout(() => {
      turnoOponente(() => {
        if (jogador.estaVivo() && oponente.estaVivo()) {
          setTurno(turno + 1);
          atualizarInterface();
          mostrarTecnicasNaImagem();
          mostrarProntoParaAtacar(); // só mostra se ainda estão vivos
        }
        desbloquear();
      });
    }, 2000);
  }, 2000);
}

// Turno do oponente
function turnoOponente(callback) {
  if (!oponente.estaVivo()) {
    verificarFim();
    return callback();
  }

  const tecnicas = Object.keys(oponente.tecnicas);
  const tecnicaAleatoria = tecnicas[Math.floor(Math.random() * tecnicas.length)];
  const texto = aplicarDano(oponente, jogador, tecnicaAleatoria);
  mostrarDano(texto);
  atualizarInterface();

  setTimeout(() => {
    // const regen = oponente.regenerar();
    //mostrarDano(`${oponente.nome} regenera <span class="text-green-300">${regen}</span> de vida`);
    atualizarInterface();
    verificarFim();
    callback();
  }, 2000);

  jogador.usouEspecialAnterior = jogador.usouEspecial;
  jogador.usouEspecial = false;
}

// Especial do jogador
export function usarEspecial() {
  if (estaBloqueado()) return;

  if (jogador.usouEspecialAnterior) {
    exibirMensagem("Você não pode usar Especial em turnos consecutivos!", "erro");
    return;
  }

  bloquear();
  jogador.usouEspecial = true;
  const dano = jogador.especial(oponente);
  mostrarImagemCentral("../assets/images/especial.png", "Especial");
  atualizarInterface();

  setTimeout(() => {
    mostrarDano(`${jogador.nome} causou <span class="text-yellow-300">${dano}</span> com o ESPECIAL!`, true);

    setTimeout(() => {
      turnoOponente(() => {
        if (jogador.estaVivo() && oponente.estaVivo()) {
          setTurno(turno + 1);
          atualizarInterface();
          mostrarProntoParaAtacar();
          mostrarTecnicasNaImagem();
        }
        desbloquear();
      });
    }, 2000);
  }, 2000);
}

// Fim de combate
function verificarFim() {
  if (!jogador.estaVivo() && !oponente.estaVivo()) {
    exibirMensagem("A luta terminou em EMPATE!");
    mostrarBotaoVoltar();
    return true;
  } else if (!jogador.estaVivo()) {
    exibirMensagem(`${oponente.nome} venceu!`);
    mostrarImagemCentral("../assets/images/derrota.png", "Derrota", 4000);
    mostrarBotaoVoltar();
  } else if (!oponente.estaVivo()) {
    exibirMensagem(`${jogador.nome} venceu!`);
    mostrarImagemCentral("../assets/images/vitoria.png", "Vitória", 4000);
    mostrarBotaoVoltar();
  }
}

function mostrarBotaoVoltar() {

  const btnExistente = document.getElementById("btn-voltar-selecao");
  if (btnExistente) btnExistente.remove();

  let container = document.getElementById("container-voltar");
  if (!container) {
    container = document.createElement("div");
    container.id = "container-voltar";
    container.style.display = "flex";
    container.style.justifyContent = "center";
    container.style.marginTop = "32px";
    document.body.appendChild(container);
  }
  container.innerHTML = `<button class="botao-voltar" id="btn-voltar-selecao">Voltar para Seleção</button>`;
  document.getElementById("btn-voltar-selecao").onclick = () => {
    window.location.href = "../../index.html";
  };
}


