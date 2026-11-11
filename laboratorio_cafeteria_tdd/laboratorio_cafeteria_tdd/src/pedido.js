import {
    calcularSubtotal,
    calcularTaxa,
    calcularTotal
} from "./carrinho.js";

export function gerarPedido(carrinho, formaPagamento) {
    const subtotal = calcularSubtotal(carrinho);
    const taxa = calcularTaxa(subtotal);
    const total = calcularTotal(subtotal, taxa);

    return {
        id: Date.now(),
        data: new Date().toISOString(),
        itens: carrinho.map(item => ({ ...item })),
        subtotal,
        taxa,
        total,
        formaPagamento
    };
}