document.addEventListener('DOMContentLoaded', () => {

    if (!localStorage.getItem('produtos_selecionados')) {
        localStorage.setItem('produtos_selecionados', JSON.stringify([]));
    }

})

const url_produtos = 'https://deisishop.pythonanywhere.com/products';
let data = [];

async function fetchProdutos(url) {

    const response = await fetch(url);
    data = await response.json();


    //filtrar por categoria
    const categoria = document.querySelector('#categorias');
    categoria.addEventListener('change', () => {
        filtra();
    })

    //filtrar por preço
    const precoFiltro = document.querySelector('#preco');
    precoFiltro.addEventListener('change', () => {
        filtra();
    })

    //filtrar por texto
    const pesquisaFiltro = document.querySelector('#pesquisa');
    pesquisaFiltro.addEventListener('input', () => filtra());

    carregarProdutos(data);
    atualizaCesto();

}

function filtra() {
    let produtosFiltrados = data;
    const categoria = document.querySelector('#categorias').value;
    const precoFiltro = document.querySelector('#preco').value;
    const pesquisaFiltro = document.querySelector('#pesquisa').value;

    if (categoria !== 'todasCategorias') {
        produtosFiltrados = produtosFiltrados.filter(p => p.category === categoria);
    }


    if (precoFiltro === 'Crescente') {
        produtosFiltrados = produtosFiltrados.sort((a, b) => a.price - b.price);

    } else if (precoFiltro === 'Decrescente') {
        produtosFiltrados = produtosFiltrados.sort((a, b) => b.price - a.price);
    }


    produtosFiltrados = produtosFiltrados.filter(p => p.title.toLowerCase().includes(pesquisaFiltro.toLowerCase()))


    carregarProdutos(produtosFiltrados);
}


function carregarProdutos(produtos) {
    const produtoSection = document.querySelector('#produtos');
    produtoSection.innerHTML = '';

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
    image.src = "https://deisishop.pythonanywhere.com/" + produto.image;
    image.alt = produto.title;

    const price = document.createElement('p');
    price.innerHTML = `${produto.price}€`;

    const description = document.createElement('p');
    description.innerHTML = produto.description;

    const button = document.createElement('button');
    button.innerHTML = '+ Adicionar ao cesto'

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
    image.src = "https://deisishop.pythonanywhere.com/" + produto.image;
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


function comprar() {
    const url_buy = 'https://deisishop.pythonanywhere.com/buy';

    const estudanteBox = document.querySelector('#estudanteBox').checked;
    const cupaoText = document.querySelector('#cupaoText').value;

    const produtosSelecionados = JSON.parse(localStorage.getItem('produtos_selecionados'));

    const produtosIds = produtosSelecionados.map(p => p.id);

    if (produtosIds.length === 0) {
        alert('Carrinho vazio! :(')
        return;
    }

    const dadosCompra = {
        products: produtosIds,
        student: estudanteBox,
        name: 'name',
        coupon: cupaoText
    }

    fetch(url_buy, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dadosCompra),
    })
        .then(response => response.json())
        .then(data => {

            const resultadoCompra = document.querySelector('#resultadoCompra');
            resultadoCompra.innerHTML = `
                <h3>Resumo da Compra</h3>
                <p>Valor final a pagar: ${data.totalCost}€</p>
                <p>Referência de pagamento: ${data.reference}</p>`

        })
}


fetchProdutos(url_produtos);

const button = document.querySelector('#comprarButton');
button.addEventListener('click', () => comprar())
