document.addEventListener('DOMContentLoaded', () => {

    if (!localStorage.getItem('produtos_selecionados')) {
        localStorage.setItem('produtos_selecionados', JSON.stringify([]));
    }

    carregarProdutos(produtos);
    atualizaCesto();

})


function carregarProdutos(produtos) {
    const produtoSection = document.querySelector('#produtos');

    produtos.forEach(p => {
        const produto = criarProduto(p);
        produtoSection.appendChild(produto);
    });
}


function criarProduto(produto) {

    const article = document.createElement('article');

    const title = document.createElement('h1');
    title.innerHTML = produto.title;

    const image = document.createElement('img');
    image.src = produto.image;
    image.alt = produto.title;

    const price = document.createElement('p');
    price.innerHTML = `${produto.price}€`;

    const description = document.createElement('p');
    description.innerHTML = produto.description;

    const button = document.createElement('button');
    button.innerHTML = '+ Adicioanr ao cesto'

    article.appendChild(title);
    article.appendChild(image);
    article.appendChild(price);
    article.appendChild(description);
    article.appendChild(button);

    button.addEventListener('click', () => {
        let produtosSelecionados = JSON.parse(localStorage.getItem('produtos_selecionados'));

        produtosSelecionados.push(produto);

        localStorage.setItem('produtos_selecionados', JSON.stringify(produtosSelecionados));

        atualizaCesto();
    })

    return article;
}


function atualizaCesto() {
    const cesto = document.querySelector('#cesto');
    cesto.innerHTML = '';

    const produtosSelecionados = JSON.parse(localStorage.getItem('produtos_selecionados'));

    produtosSelecionados.forEach((p, index) => {
        cesto.appendChild(criaProdutoCesto(p, index));
    })
}

function criaProdutoCesto(produto, index) {

    const article = document.createElement('article');

    const title = document.createElement('h1');
    title.innerHTML = produto.title;

    const image = document.createElement('img');
    image.src = produto.image;
    image.alt = produto.title;

    const price = document.createElement('p');
    price.innerHTML = `Custo: ${produto.price}€`;

    const button = document.createElement('button');
    button.innerHTML = '- Remover artigo';

    article.appendChild(title);
    article.appendChild(image);
    article.appendChild(price);
    article.appendChild(button);

    button.addEventListener('click', () => {
        const produtosSelecionados = JSON.parse(localStorage.getItem('produtos_selecionados'));

        produtosSelecionados.splice(index, 1);
        localStorage.setItem('produtos_selecionados', JSON.stringify(produtosSelecionados));
        atualizaCesto();
    })

    return article;
}