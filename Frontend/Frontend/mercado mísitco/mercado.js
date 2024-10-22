function addToCart(nomeProduto, preco){
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    let produto = carrinho.find(item => item.nome === nomeProduto);
    if(produto){
        produto.qtd++;
    }else{
        carrinho.push({nome: nomeProduto, preco: preco, qtd: 1});
    }

    localStorage.setItem("carrinho", JSON.stringify(carrinho));
   
}

function carregarCarrinho(){
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    let itensCarrinho = document.querySelector("#itensCarrinho");
    let valorTotal = 0;
    itensCarrinho.innerHTML = '';

    carrinho.forEach(element => {
        let itemProduto = document.createElement('div');
        itemProduto.textContent = `${element.nome} - ${element.qtd} x R$ ${element.preco}`;

        itensCarrinho.appendChild(itemProduto);
        valorTotal += (element.qtd * element.preco);

    });
    document.querySelector("#valorTotal").textContent = valorTotal;


}


if (window.location.pathname.includes('carrinho.html')) {
    carregarCarrinho();
}

function limparCarrinho(){
    localStorage.removeItem("carrinho");
    localStorage.clear();
}

