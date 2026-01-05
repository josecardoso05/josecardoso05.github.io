document.addEventListener('DOMContentLoaded', () => {

    if (!localStorage.getItem('produtos-selecionados')) {
        localStorage.setItem('produtos-selecionados', JSON.stringify([]));
    }

    fetch('https://deisishop.pythonanywhere.com/products/')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);
            }
            return response.json();
        })
        .then(produtos => {
            console.log('Produtos recebidos da API:', produtos);
            carregarProdutos(produtos);
            atualizaCesto();

            const selectCategoria = document.querySelector('#categorias');
            const selectPreco = document.querySelector('#preco');
            const inputPesquisa = document.querySelector('#pesquisa');
            selectCategoria.addEventListener('change', () => {
                carregarProdutos(produtos);
            })
            selectPreco.addEventListener('change', () => {
                carregarProdutos(produtos);
            })
            inputPesquisa.addEventListener('input', () => {
                carregarProdutos(produtos);
            })
        })
        .catch(error => {
            console.error('Erro ao carregar produtos:', error);
        });
});

function carregarProdutos(produtos) {
    const artigo = document.querySelector('#produtos');
    const selectCategorias = document.querySelector('#categorias');
    const selectPreco = document.querySelector('#preco');
    const inputPesquisa = document.querySelector('#pesquisa');

    const categoria = selectCategorias.value;
    const ordemPreco = selectPreco.value;

    const textoPesquisa = inputPesquisa.value.toLowerCase();

    let produtosFiltrados = produtos.filter(p => categoria === "todasCategorias" || p.category === categoria && p.title.toLowerCase().includes(textoPesquisa));

    if (ordemPreco === "crescente") {
        produtosFiltrados.sort((a, b) => a.price - b.price);
    } else if (ordemPreco === "decrescente") {
        produtosFiltrados.sort((a, b) => b.price - a.price);
    }

    artigo.innerHTML = '';
    produtosFiltrados.forEach(p => {
        artigo.appendChild(criarProduto(p));
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

    const checkout = document.querySelector('#checkout');

    cesto.innerHTML = '';
    checkout.innerHTML = '';

    produtosSelecionados.forEach(p => {
        const artigo = criaProdutoCesto(p);
        cesto.appendChild(artigo);
    });

    const total = produtosSelecionados.reduce((soma, p) => soma + p.price, 0);

    const precoTotal = document.createElement('h1');
    precoTotal.textContent = 'Total: ' + total + '€';
    checkout.appendChild(precoTotal)
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
        let produtosSelecionados = JSON.parse(localStorage.getItem('produtos-selecionados')) || [];

        const indice = produtosSelecionados.findIndex(
            item => item.title === produto.title && item.price === produto.price
        );

        if (indice !== -1) {
            produtosSelecionados.splice(indice, 1);
            localStorage.setItem('produtos-selecionados', JSON.stringify(produtosSelecionados));
            atualizaCesto();
        }
    });



    artigo.appendChild(titulo);
    artigo.appendChild(imagem);
    artigo.appendChild(preco);
    artigo.appendChild(botao);


    return artigo;
}



function finalizarCompra() {
  const produtosSelecionados = JSON.parse(localStorage.getItem('produtos-selecionados')) || [];
  const estudante = document.querySelector('#final input[type="checkbox"]').checked;
  const cupaoDesconto = document.querySelector('#final input[type="text"]').value.trim();

  const produtoIds = produtosSelecionados.map(produto => produto.id);

  if (produtoIds.length === 0) {
    alert('O cesto está vazio!');
    return;
  }

  const dadosCompra = {
    products: produtoIds,
    student: estudante,
    coupon: cupaoDesconto
  };

  fetch('https://deisishop.pythonanywhere.com/buy', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dadosCompra)
  })
    .then(res => res.json())
    .then(data => {
      const antiga = document.querySelector('#final .resultado-compra');
      if (antiga) antiga.remove();

      const resumo = document.createElement('p');
      resumo.className = 'resultado-compra';
      resumo.innerHTML = `
        Valor final a pagar (com envetuais descontos): ${data.totalCost ?? data.total}€<br>
        Referência de pagamento: ${data.reference}
      `;

      document.querySelector('#final').appendChild(resumo);
    });
}

const botaoCompra = document.querySelector('#final button')

botaoCompra.onclick = finalizarCompra
