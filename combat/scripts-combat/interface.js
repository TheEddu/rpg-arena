import { jogador, oponente, turno } from './main.js';

// Atualiza toda a interface do combate
export function atualizarInterface() {
    document.getElementById("turno-info").textContent = `Rodada ${turno}`;
    atualizarBarra("vida-jogador", jogador, "hp-jogador");
    atualizarBarra("vida-oponente", oponente, "hp-oponente");
    mostrarTecnicasOponente();
}

// Atualiza barra de vida e texto de HP e cor personalizada
function atualizarBarra(id, personagem, hpId) {
    const el = document.getElementById(id);
    const percent = (personagem.vida / personagem.vidaMaxima) * 100;
    el.style.width = percent + "%";
    el.textContent = "";
    document.getElementById(hpId).textContent = `${personagem.vida} / ${personagem.vidaMaxima} HP`;

    // Coloração personalizada por personagem
    if (personagem.nome === "Cavaleiro") {
        el.style.background = "linear-gradient(90deg, #2563eb 60%, #60a5fa 100%)";
    } else if (personagem.nome === "Necromante") {
        el.style.background = "linear-gradient(90deg, #dc2626 60%, #f87171 100%)";
    } else if (personagem.nome === "Mago") {
        el.style.background = "linear-gradient(90deg, #6366f1 60%, #a5b4fc 100%)";
    } else if (personagem.nome === "Arqueira") {
        el.style.background = "linear-gradient(90deg, #22c55e 60%, #bbf7d0 100%)";
    } else if (personagem.nome === "Elfa") {
        el.style.background = "linear-gradient(90deg, #f59e42 60%, #fef08a 100%)";
    } else if (personagem.nome === "Berserker") {
        el.style.background = "linear-gradient(90deg, #be185d 60%, #f472b6 100%)";
    } else if (personagem.nome === "Fada") {
        el.style.background = "linear-gradient(90deg, #06b6d4 60%, #a7f3d0 100%)";
    } else if (personagem.nome === "Dragon Slayer") {
        el.style.background = "linear-gradient(90deg, #fbbf24 60%, #fde68a 100%)";
    } else if (personagem.nome === "Samurai") {
        el.style.background = "linear-gradient(90deg, #8b5cf6 60%, #c4b5fd 100%)";
    } else if (personagem.nome === "Goblin") {
        el.style.background = "linear-gradient(90deg, #f97316 60%, #fdba74 100%)";
    } else {
        el.style.background = "#333";
    }
}

export function mostrarTecnicasNaImagem() {
    jogador.usouEspecialAnterior = jogador.usouEspecial;
    jogador.usouEspecial = false;

    const acoesDiv = document.getElementById("acoes-jogador");
    acoesDiv.innerHTML = "";

    Object.entries(jogador.tecnicas).forEach(([tecnica, dano]) => {
        const btn = document.createElement("button");
        btn.textContent = `${tecnica} (${dano})`;
        btn.className = "btn-acao";
        btn.onclick = () => {
            import('./combate.js').then(mod => mod.processarRodada(tecnica));
        };
        acoesDiv.appendChild(btn);
    });
}

// Mostra técnicas do oponente
export function mostrarTecnicasOponente() {
    const div = document.getElementById("acoes-oponente");
    if (!div) return;
    div.innerHTML = "";
    Object.entries(oponente.tecnicas).forEach(([tecnica, dano]) => {
        const span = document.createElement("span");
        span.textContent = `${tecnica} (${dano})`;
        span.className = "tecnica-oponente";
        div.appendChild(span);
    });
}

// Mostra mensagem central de pronto para atacar
export function mostrarProntoParaAtacar() {
    const centro = document.getElementById("dano-central");
    if (!jogador.estaVivo() || !oponente.estaVivo()) {
        centro.innerHTML = "";
        return;
    }
    centro.innerHTML = "🗡️ Ataque!";
    centro.className = "dano-central";
}

// Mostra imagem central temporária
export function mostrarImagemCentral(src, alt = "", tempo = 2500) {
    const centro = document.getElementById("dano-central");
    centro.innerHTML = `<img src="${src}" alt="${alt}">`;

    setTimeout(() => {
        centro.innerHTML = ""; // Limpa após tempo
        mostrarProntoParaAtacar(); // Ou mostra o texto normal depois
    }, tempo);
}

// Mostra dano causado
export function mostrarDano(texto, especial = false) {
    const centro = document.getElementById("dano-central");
    centro.innerHTML = texto;
    centro.className = especial ? "dano-central especial" : "dano-central";
    setTimeout(() => {
        centro.className = "dano-central";
    }, especial ? 3000 : 2500);
}

// Exibe mensagem popup na tela
export function exibirMensagem(texto, tipo = "info") {
    const msgDiv = document.createElement("div");
    msgDiv.className = `mensagem-popup ${tipo}`;
    msgDiv.innerHTML = texto;
    document.body.appendChild(msgDiv);
    setTimeout(() => {
        msgDiv.classList.add("fadeout");
        setTimeout(() => msgDiv.remove(), 700);
    }, 3000);
}

// Inicializa informações dos personagens na interface
const personagemSelecionado = JSON.parse(sessionStorage.getItem("personagemSelecionado"));
const oponenteSelecionado = JSON.parse(sessionStorage.getItem("oponenteSelecionado"));

document.getElementById("nome-jogador").textContent = personagemSelecionado.nome;
document.getElementById("img-jogador").src = "../" + personagemSelecionado.image;
document.getElementById("img-jogador").alt = personagemSelecionado.nome;
document.getElementById("btn-especial-jogador").textContent = personagemSelecionado.especial || "Especial";
// Corrige o funcionamento do botão especial do jogador
document.getElementById("btn-especial-jogador").onclick = () => window.usarEspecial();

document.getElementById("nome-oponente").textContent = oponenteSelecionado.nome;
document.getElementById("img-oponente").src = "../" + oponenteSelecionado.image;
document.getElementById("img-oponente").alt = oponenteSelecionado.nome;
document.getElementById("btn-especial-oponente").textContent = oponenteSelecionado.especial || "Especial";
// O botão especial do oponente fica desabilitado
document.getElementById("btn-especial-oponente").disabled = true;
document.getElementById("btn-especial-oponente").classList.add("btn-especial-oponente");

