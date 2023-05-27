const ID_CONTEUDO = 'conteudo';
const ID_BTN_JOGAR = 'btnJogar';
class Tela {
  static obterCodigoHtml(item) {
    return `
      <div class="col-md-3">
        <div class="card" style="width: 50%">
          <img src="${item.img}" name="${item.nome}" class="card-img-top" alt="..." />
        </div>
        <br />
      </div>
    `;
  }

  static alterarConteudoHtml(codigoHtml) {
    const conteudo = document.getElementById(ID_CONTEUDO);
    conteudo.innerHTML = codigoHtml;
  }

  static gerarStringPelaImagem(itens) {
    return itens.map(Tela.obterCodigoHtml).join('');
  }

  static atualizarImagens(itens) {
    const codigoHtml = Tela.gerarStringPelaImagem(itens);
    Tela.alterarConteudoHtml(codigoHtml);
  }

  static configurarBotaoJogar(funcaoOnClick) {
    const btnJogar = document.getElementById(ID_BTN_JOGAR);
    btnJogar.onclick = funcaoOnClick;
  }
}
