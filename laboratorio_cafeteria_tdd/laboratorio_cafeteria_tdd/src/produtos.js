let produtos = [];

const buscarProdutos = (produtos, termo) =>
    produtos.find(produto => produto.nome.toLowerCase() == termo.toLowerCase());

const filtrarPorCategoria = (produtos, categoria) =>
    produtos.filter(produto => produto.categoria)