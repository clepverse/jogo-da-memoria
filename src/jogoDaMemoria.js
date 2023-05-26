class JogoDaMemoria {
  constructor({ tela }) {
    this.tela = tela;

    this.heroisIniciais = [
      { img: './assets/emerald.png', nome: 'emerald' },
      { img: './assets/redstone.png', nome: 'redstone' },
      { img: './assets/rock-badge.png', nome: 'rock-badge' },
      { img: './assets/yugi.png', nome: 'yugi' },
    ];
  }

  inicializar() {
    this.tela.atualizarImagens(this.heroisIniciais);
  }
}
