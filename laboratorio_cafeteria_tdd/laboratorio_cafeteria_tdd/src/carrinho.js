export function adicionarAoCarrinho(carrinho, produto) {
    const existente = carrinho.find(item => item.id === produto.id);

    if (existente) {
        return carrinho.map(item =>
            item.id === produto.id
                ? { ...item, quantidade: item.quantidade + 1 }
                : item
        );
    }

    return [...carrinho, { ...produto, quantidade: 1 }];
}

export function removerDoCarrinho(carrinho, id) {
    return carrinho.filter(item => item.id !== id);
}

export function alterarQuantidade(carrinho, id, quantidade) {
    if (quantidade <= 0) {
        return removerDoCarrinho(carrinho, id);
    }

    return carrinho.map(item =>
        item.id === id
            ? { ...item, quantidade }
            : item
    );
}

export function calcularSubtotal(carrinho) {
    return carrinho.reduce(
        (total, item) => total + item.preco * item.quantidade,
        0
    );
}

export function calcularTaxa(subtotal) {
    return Math.min(subtotal * 0.05, 10);
}

export function calcularTotal(subtotal, taxa) {
    return subtotal + taxa;
}