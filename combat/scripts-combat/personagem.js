
export class Personagem {
    /**
     * @param {string} nome - Nome do personagem
     * @param {object} tecnicas - Técnicas disponíveis (nome: dano máximo)
     */
    // constructor(nome, tecnicas, regeneracao = 5) {
    constructor(nome, tecnicas) {
        this.nome = nome;
        this.vida = 100;
        this.vidaMaxima = 100;
        this.tecnicas = tecnicas;
        // Só define regeneracao se for maior que 0
        // if (regeneracao > 0) {
        //     this.regeneracao = regeneracao;
        // }
        this.usouEspecial = false;
        this.usouEspecialAnterior = false;
    }

    // Verifica se o personagem está vivo
    estaVivo() {
        return this.vida > 0;
    }

    // Realiza um ataque usando uma técnica
    atacar(alvo, tecnica) {
        const danoMax = this.tecnicas[tecnica];
        const dano = Math.floor(Math.random() * (danoMax + 1));
        alvo.vida = Math.max(0, alvo.vida - dano);
        return dano;
    }

    // Regenera vida do personagem
    // No método regenerar da classe Personagem:
    // regenerar() {
    //     // Se não houver regeneracao, retorna 0
    //     if (!this.regeneracao || this.regeneracao <= 0) return 0;
    //     this.vida = Math.min(this.vidaMax, this.vida + this.regeneracao);
    //     return this.regeneracao;
    // }

    // Executa o ataque especial
    especial(alvo) {
        const dano = Math.floor(alvo.vidaMaxima / 3);
        alvo.vida = Math.max(0, alvo.vida - dano);
        return dano;
    }
}

