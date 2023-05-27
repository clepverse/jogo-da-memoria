class JogoDaMemoria {
  constructor({ tela }) {
    this.tela = tela;

    this.heroisIniciais = [
      { img: './assets/emerald.png', nome: 'emerald' },
      { img: './assets/redstone.png', nome: 'redstone' },
      { img: './assets/rock-badge.png', nome: 'rock-badge' },
      { img: './assets/yugi.png', nome: 'yugi' },
    ];

    this.iconePadrao = './assets/background-card.png';
    this.heroisEscondidos = [];
    this.heroisSelecionados = [];
  }

  inicializar() {
    this.tela.atualizarImagens(this.heroisIniciais);
    this.tela.configurarBotaoJogar(this.jogar.bind(this));
    this.tela.configurarBotaoVerificarSelecao(this.verificarSelecao.bind(this));
  }

  embaralhar() {
    const copias = this.heroisIniciais
      .concat(this.heroisIniciais)
      .map((item) => {
        return Object.assign({}, item, { id: Math.random() / 0.5 });
      })
      .sort(() => Math.random() - 0.5);

    this.tela.atualizarImagens(copias);
    setTimeout(() => {
      this.esconderHerois(copias);
    }, 2000);
  }

  esconderHerois(herois) {
    const heroisOcultos = herois.map(({ nome, id }) => ({
      id,
      nome,
      img: this.iconePadrao,
    }));

    this.tela.atualizarImagens(heroisOcultos);
    this.heroisEscondidos = heroisOcultos;
  }

  verificarSelecao(id, nome) {
    const item = { id, nome };
    const heroisSelecionados = this.heroisSelecionados.length;

    switch (heroisSelecionados) {
      case 0:
        this.heroisSelecionados.push(item);
        break;
      case 1:
        const [opcao1] = this.heroisSelecionados;
        this.heroisSelecionados = [];
        if (opcao1.nome === item.nome && opcao1.id !== item.id) {
          alert('Combinação correta!');
          return;
        }

        alert('Combinação incorreta!');
        break;
      default:
        break;
    }
  }

  jogar() {
    this.embaralhar();
  }
}
