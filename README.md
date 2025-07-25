# RPG Arena - Pensamento, Lógica e Arquitetura

Projeto em andamento...

## Visão Geral

O RPG Arena é um projeto front-end interativo em JavaScript que simula combates por turnos entre personagens de RPG com habilidades distintas. Trata-se de um exercício de lógica, estruturação de código, organização modular e UX design para web.  
É também uma base para futuros jogos ou sistemas mais complexos, com suporte a customização de personagens via JSON, sistema de turnos inteligente e interface dinâmica.

## Objetivos do Projeto
- Praticar boas práticas de arquitetura de software, mesmo em projetos simples.

- Exercitar separação de responsabilidades entre dados, interface e lógica de negócio.

- Criar uma estrutura expansível e modular, que permita a adição de novos personagens ou regras com impacto mínimo no código existente.

- Focar em experiência do usuário (UX): responsividade, feedback visual e clareza.

- Tornar o código acessível e legível.

---

## Raciocínios e Decisões Técnicas

* **Separação entre dados e lógica**: os personagens são descritos em JSON, permitindo mudanças sem alterar código JS.
* **Uso de módulos JS** (`import/export`) promove organização e reutilização.
* **Uso de `sessionStorage`** permite comunicação entre páginas sem back-end.
* **Exibição temporária com `setTimeout`**: adiciona transições suaves e imita tempo de reação de turnos.
* **Design modular** permite que cada parte seja testada ou expandida isoladamente.

---

## Estrutura de Arquivos e Funções

### 1. `index.html` & `menu/script.js`
- **Propósito:** Interface de seleção de personagens.
- **Lógica:**
  - Renderiza cards de personagens a partir de um arquivo JSON.
  - Ao clicar, exibe detalhes e permite selecionar jogador e oponente.
  - Utiliza `sessionStorage` para persistir escolhas entre páginas.
- **Pensamento:**  
  - A escolha via JSON facilita a inclusão de novos personagens.
  - Separação clara entre visualização (HTML/CSS) e lógica (JS).
  - Feedback imediato ao usuário, evitando múltiplas seleções erradas.

### 2. `characters.json`
- **Propósito:** Fonte de dados dos personagens.
- **Lógica:**  
    Cada personagem possui:

    * `nome`
    * `vidaMaxima`
    * `tecnicas` (com nomes e danos)
    * `especial` (nome e dano)
    * `regeneracao`
    * `imagem`

- **Pensamento:**  
  - Facilita expansão e manutenção, permitindo adicionar personagens sem alterar código JS.
  - Mantém dados desacoplados da lógica, favorecendo clareza e reusabilidade.

### 3. `combat/combat.html`
- **Propósito:** Arena de combate.
- **Lógica:**  
  - Estrutura visual para HUD, imagens, barras de vida e ações.
- **Pensamento:**  
  - Layout responsivo e intuitivo, com foco na clareza das informações de combate.

### 4. `combat/scripts-combat/main.js`
- **Propósito:** Inicialização do combate.
- **Lógica:**  
  - Recupera personagens do `sessionStorage`.
  - Instancia objetos de combate e controla o turno.
- **Pensamento:**  
  - Centraliza controle de estado e fluxo do jogo, facilitando testes e manutenção.

### 5. `combat/scripts-combat/personagem.js`
- **Propósito:** Modelo de personagem.
- **Lógica:**  
  - Define métodos para ataque, especial e verificação de vida.
- **Pensamento:**  
  - Encapsula regras de combate, permitindo evoluções futuras (ex: buffs, debuffs).

### 6. `combat/scripts-combat/interface.js`
- **Propósito:** Manipulação da interface do combate.
- **Lógica:**  
  - Atualiza barras de vida, exibe técnicas, mostra mensagens e imagens.
- **Pensamento:**  
  - Mantém a lógica de UI separada da lógica de combate, promovendo reusabilidade.

### 7. `combat/scripts-combat/combate.js`
- **Propósito:** Lógica de combate por turnos.
- **Lógica:**  
  - Processa ataques, especiais, alternância de turnos e fim de combate.
  - Exibe mensagens e controla bloqueio de ações.
  - Mostra botão de voltar de forma destacada ao fim do combate.
- **Pensamento:**  
  - Fluxo assíncrono para animações e feedback.
  - Prevenção de ações simultâneas com bloqueio de interface.

### 8. `assets/css/styles.css` & `assets/css/style-combat.css`
- **Propósito:** Estilização visual.
- **Lógica:**  
  - Define temas, cores, responsividade e destaque para elementos interativos.
  - Botão de voltar é destacado e centralizado para facilitar navegação.
- **Pensamento:**  
  - Experiência visual imersiva, com feedback visual claro para cada ação.

---

## Filosofia de Projeto

- **Modularidade:** Cada arquivo tem responsabilidade única, facilitando manutenção e evolução.
- **Experiência do Usuário:** Feedback visual e textual imediato, navegação intuitiva.
- **Expansibilidade:** Adição de novos personagens, técnicas ou regras sem refatoração extensa.
- **Separação de Preocupações:** Dados, lógica e interface são independentes, promovendo clareza e testabilidade.

---

## Funções-Chave e Raciocínio

- **mostrarDetalhes:** Exibe informações detalhadas do personagem, promovendo engajamento antes da seleção.
- **selecionarPersonagem:** Controla fluxo de seleção, evitando escolhas inválidas.
- **atualizarInterface:** Mantém HUD sincronizada com estado do jogo, reforçando transparência.
- **processarRodada / turnoOponente:** Alternam ações entre jogador e oponente, simulando dinâmica de RPG clássico.
- **usarEspecial:** Implementa restrição de uso consecutivo, incentivando estratégia.
- **mostrarBotaoVoltar:** Destaca opção de reinício, facilitando re-jogabilidade.

---

## Lógica do Fluxo de Jogo

1. O jogador acessa `index.html` e escolhe dois personagens.
2. Os dados são salvos no `sessionStorage` como objetos JSON.
3. Ao abrir `combat.html`, os dados são carregados e instanciados.
4. O jogador vê sua barra de ações e escolhe uma técnica.
5. O dano é processado, a interface atualiza, e o oponente responde.
6. O jogo prossegue até que um dos personagens fique sem vida.
7. Exibe mensagem de vitória/derrota e botão para reiniciar.

---

## Para Estudo e Inspiração

Este projeto é uma excelente base:

* Praticar **lógica de programação aplicada a jogos**.
* Estudar como **manipular o DOM**.
* Criar **arquitetura limpa e separada por camadas**.
* Trabalhar com **dados externos (JSON)** como fonte dinâmica de conteúdo.
* Desenvolver **interfaces visuais dinâmicas e interativas** com HTML, CSS e JS puros.

---

## Conclusão

O RPG Arena é mais que um jogo, é um estudo prático sobre como aplicar conceitos essenciais de programação em um projeto real e interativo.  

Cada função e arquivo foi elaborado para promover clareza, expansão e diversão, com lógica transparente e interface envolvente.

---
