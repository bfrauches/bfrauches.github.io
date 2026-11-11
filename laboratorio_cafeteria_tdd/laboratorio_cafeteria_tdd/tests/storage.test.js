import {
    salvarCarrinho,
    carregarCarrinho,
    salvarPedidos,
    carregarPedidos
} from "../src/storage.js";

beforeEach(() => {
    localStorage.clear();
});

describe("armazenamento local", () => {
    test("deve salvar e recuperar o carrinho", () => {
        const carrinho = [
            {
                id: 1,
                nome: "Espresso",
                preco: 6.5,
                quantidade: 2
            }
        ];

        salvarCarrinho(carrinho);

        expect(carregarCarrinho()).toEqual(carrinho);
    });

    test("deve retornar carrinho vazio", () => {
        expect(carregarCarrinho()).toEqual([]);
    });

    test("deve salvar e recuperar pedidos", () => {
        const pedidos = [
            {
                id: 1001,
                formaPagamento: "Pix",
                total: 13.65
            }
        ];

        salvarPedidos(pedidos);

        expect(carregarPedidos()).toEqual(pedidos);
    });

    test("deve retornar lista vazia de pedidos", () => {
        expect(carregarPedidos()).toEqual([]);
    });
});