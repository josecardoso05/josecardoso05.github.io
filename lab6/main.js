document.addEventListener('DOMContentLoaded', () => {

    if (!localStorage.getItem('produtos-selecionados')) {
        localStorage.setItem('produtos-selecionados', JSON.stringify([]));
    }

    carregarProdutos(produtos)
    atualizaCesto();
})

function carregarProdutos(produtos) {
    const artigo = document.querySelector('#produtos');

    produtos.forEach(p => {
        artigo.appendChild(criarProduto(p))
    });
}

function criarProduto(produto) {
    const artigo = document.createElement('article');

    const titulo = document.createElement('h1');
    titulo.textContent = produto.title;

    const preco = document.createElement('p');
    preco.textContent = 'Custo total: ' + produto.price + '€';

    const descricao = document.createElement('p');
    descricao.textContent = produto.description;

    const categoria = document.createElement('p');
    categoria.textContent = produto.category;

    const imagem = document.createElement('img');
    imagem.src = produto.image;
    imagem.alt = produto.title;

    const botao = document.createElement('button');
    botao.textContent = '+ Adicionar ao Cesto'

    botao.addEventListener('click', () => {
        const produtosSelecionados = JSON.parse(localStorage.getItem('produtos-selecionados')) || [];

        produtosSelecionados.push(produto);

        localStorage.setItem('produtos-selecionados', JSON.stringify(produtosSelecionados));

        atualizaCesto();
    });

    artigo.appendChild(titulo)
    artigo.appendChild(imagem)
    artigo.appendChild(descricao)
    artigo.appendChild(preco)
    artigo.appendChild(botao)

    return artigo;
}

function atualizaCesto() {
    const produtosSelecionados = JSON.parse(localStorage.getItem('produtos-selecionados')) || [];
    const cesto = document.querySelector('#cesto');
    cesto.innerHTML = '';

    produtosSelecionados.forEach(p => {
        const artigo = criaProdutoCesto(p);
        cesto.appendChild(artigo);
        produtosSelecionados.setItem = cesto;
    });
}

function criaProdutoCesto(produto) {
    const artigo = document.createElement('article');


    const titulo = document.createElement('h1');
    titulo.textContent = produto.title;

    const preco = document.createElement('p');
    preco.textContent = 'Custo total: ' + produto.price + '€';

    const imagem = document.createElement('img');
    imagem.src = produto.image;
    imagem.alt = produto.title;

    const botao = document.createElement('button');
    botao.textContent = 'Remove'

    botao.addEventListener('click', () => {
        const produtosSelecionados = JSON.parse(localStorage.getItem('produtos-selecionados')) || [];
        let indice = produtosSelecionados.indexOf(produto)
        produtosSelecionados.splice(indice, 1);
        localStorage.setItem('produtos-selecionados', JSON.stringify(produtosSelecionados));
        atualizaCesto()
    })



    artigo.appendChild(titulo);
    artigo.appendChild(imagem);
    artigo.appendChild(preco);
    artigo.appendChild(botao);





    return artigo;
}




