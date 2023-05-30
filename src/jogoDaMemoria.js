class JogoDaMemoria {
  constructor({ tela, util }) {
    this.tela = tela;
    this.util = util;

    this.pontuacao = 0;
    this.tentativas = 0;

    this.heroisIniciais = [
      { img: './assets/emerald.png', nome: 'emerald' },
      { img: './assets/redstone.png', nome: 'redstone' },
      { img: './assets/rock-badge.png', nome: 'rock-badge' },
      { img: './assets/yugi.png', nome: 'yugi' },
      { img: './assets/isaac.png', nome: 'isaac' },
      { img: './assets/jean.png', nome: 'jean' },
      { img: './assets/salomao.png', nome: 'salomao' },
      { img: './assets/vinicius.png', nome: 'vinicius' },
    ];

    this.iconePadrao = './assets/background-card.png';
    this.heroisEscondidos = [];
    this.heroisSelecionados = [];

    this.heroisEncontrados = 1;
  }

  inicializar() {
    this.tela.atualizarImagens(this.heroisIniciais);
    this.tela.configurarBotaoJogar(this.jogar.bind(this));
    this.tela.configurarBotaoVerificarSelecao(this.verificarSelecao.bind(this));
    this.tela.configurarBotaoMostrarTudo(this.mostrarHeroisEscondidos.bind(this));
  }

  async embaralhar() {
    this.pontuacao = 0;
    this.tentativas = 0;

    this.tela.atualizarTentativas(this.tentativas);
    this.tela.atualizarPontuacao(this.pontuacao);

    const heroisSelecionados = this.util.shuffle(this.heroisIniciais).slice(0, 4);

    const copias = [...heroisSelecionados, ...heroisSelecionados]
      .concat(this.heroisSelecionados)
      .map((item) => {
        return Object.assign({}, item, { id: Math.random() / 0.5 });
      })
      .sort(() => Math.random() - 0.5);

    this.tela.atualizarImagens(copias);
    this.tela.exibirCarregando();

    const idDoIntervalo = this.tela.iniciarContador();

    await this.util.timeout(3000);

    this.tela.limparContador(idDoIntervalo);

    this.tela.reproduzirMusicaDeFundo();

    this.esconderHerois(copias);
    this.tela.exibirCarregando(false);
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

  exibirHerois(nomeDoHeroi) {
    const { img } = this.heroisIniciais.find(({ nome }) => nomeDoHeroi === nome);
    this.tela.exibirHerois(nomeDoHeroi, img);
  }

  verificarSelecao(id, nome) {
    const item = { id, nome };
    const heroisSelecionados = this.heroisSelecionados.length;

    switch (heroisSelecionados) {
      case 0:
        this.heroisSelecionados.push(item);

        break;
      case 1:
        this.aumentarTentativas();

        const [opcao1] = this.heroisSelecionados;
        this.heroisSelecionados = [];
        if (opcao1.nome === item.nome && opcao1.id !== item.id) {
          this.exibirHerois(item.nome);
          this.tela.exibirMensagem();
          this.atualizarPontuacao(10);

          if (this.heroisEncontrados === this.heroisIniciais.length / 2) {
            this.tela.pararMusicaDeFundo();
            this.tela.reproduzirMusicaPontuacao();

            this.heroisEncontrados = 0;
          }

          this.heroisEncontrados++;
          return;
        }

        this.tela.exibirMensagem(false);
        break;
    }
  }

  mostrarHeroisEscondidos() {
    const heroisEscondidos = this.heroisEscondidos;
    for (const heroi of heroisEscondidos) {
      const { img } = this.heroisIniciais.find(({ nome }) => heroi.nome === nome);
      heroi.img = img;
    }

    this.tela.atualizarImagens(heroisEscondidos);
  }

  atualizarPontuacao(pontos) {
    this.pontuacao += pontos;

    this.tela.atualizarPontuacao(this.pontuacao);
  }

  aumentarTentativas() {
    this.tentativas++;
    this.tela.atualizarTentativas(this.tentativas);
  }

  jogar() {
    this.embaralhar();
    this.tela.pararVideo();
  }
}
