
document.addEventListener("DOMContentLoaded", async () => {
  const grid = document.getElementById("gridPersonagens");
  const nomeElem = document.getElementById("nomePersonagem");
  const imgElem = document.getElementById("imagemPersonagem");
  const descElem = document.getElementById("descricaoPersonagem");

  const response = await fetch("./menu/characters.json");
  const data = await response.json();
  const personagens = data.personagens;

  let jogadorSelecionado = null;
  let oponenteSelecionado = null;
  let etapa = "jogador";

  personagens.forEach(personagem => {
    const card = document.createElement("div");
    card.classList.add("personagem");

    card.innerHTML = `
      <img src="${personagem.image}" alt="${personagem.nome}" class="imagem-card">
      <h3>${personagem.nome}</h3>
    `;

    card.addEventListener("click", () => {
      mostrarDetalhes(personagem, card);
    });

    grid.appendChild(card);
  });

  function mostrarDetalhes(personagem, card) {
    nomeElem.textContent = personagem.nome;
    imgElem.src = personagem.image;
    imgElem.alt = personagem.nome;
    descElem.innerHTML = `
      <strong>Técnicas:</strong>
      <ul>
        ${Object.entries(personagem.tecnicas).map(
          ([nome, dano]) => `<li>${nome} (${dano} de dano)</li>`
        ).join("")}
      </ul>
      <strong>Especial:</strong> ${personagem.especial}
    `;

    const btn = document.createElement("button");
    btn.id = "btnSelecionar";
    btn.className = "btn-selecao";
    btn.textContent = etapa === "jogador" ? "Selecionar como Jogador" : "Selecionar como Oponente";
    btn.onclick = () => selecionarPersonagem(personagem, card);
    descElem.appendChild(btn);
  }

  function selecionarPersonagem(personagem, card) {
    if (etapa === "jogador") {
      jogadorSelecionado = personagem;
      // Destaca o selecionado
      document.querySelectorAll(".personagem").forEach(character => character.classList.remove("selecionado"));
      card.classList.add("selecionado");
      etapa = "oponente";
      nomeElem.textContent = "Selecione o Oponente";
      imgElem.src = "";
      imgElem.alt = "";
      descElem.innerHTML = "Clique em outro personagem para ver os detalhes e selecionar como oponente.";
    } else if (etapa === "oponente" && personagem.nome !== jogadorSelecionado.nome) {
      oponenteSelecionado = personagem;
      card.classList.add("selecionado");
      mostrarBotaoIniciar();
    }
  }

  function mostrarBotaoIniciar() {
    const iniciarBtn = document.createElement("button");
    iniciarBtn.textContent = "Iniciar Combate";
    iniciarBtn.className = "botao-iniciar";
    iniciarBtn.onclick = () => {
      sessionStorage.setItem("personagemSelecionado", JSON.stringify(jogadorSelecionado));
      sessionStorage.setItem("oponenteSelecionado", JSON.stringify(oponenteSelecionado));
      window.location.href = "../combat/combat.html";
    };
    descElem.appendChild(iniciarBtn);
  }
});
