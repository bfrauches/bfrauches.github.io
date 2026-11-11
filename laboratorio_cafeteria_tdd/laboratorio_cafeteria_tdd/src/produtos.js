export function buscarProdutos(produtos, termo) {
    const busca = termo.toLowerCase().trim();

    return produtos.filter(produto =>
        produto.nome.toLowerCase().includes(busca) ||
        produto.descricao.toLowerCase().includes(busca)
    );
}

export function filtrarPorCategoria(produtos, categoria) {
    if (categoria === "Todos") {
        return produtos;
    }

    return produtos.filter(produto =>
        produto.categoria === categoria
    );
}