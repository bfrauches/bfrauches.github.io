const CHAVE_CARRINHO = "cafeteria_carrinho";
const CHAVE_PEDIDOS = "cafeteria_pedidos";

export function salvarCarrinho(carrinho) {
    localStorage.setItem(
        CHAVE_CARRINHO,
        JSON.stringify(carrinho)
    );
}

export function carregarCarrinho() {
    const dados = localStorage.getItem(CHAVE_CARRINHO);
    return dados ? JSON.parse(dados) : [];
}

export function salvarPedidos(pedidos) {
    localStorage.setItem(
        CHAVE_PEDIDOS,
        JSON.stringify(pedidos)
    );
}

export function carregarPedidos() {
    const dados = localStorage.getItem(CHAVE_PEDIDOS);
    return dados ? JSON.parse(dados) : [];
}

export function salvarPedido(pedido) {
    const pedidos = carregarPedidos();
    pedidos.push(pedido);
    salvarPedidos(pedidos);
}