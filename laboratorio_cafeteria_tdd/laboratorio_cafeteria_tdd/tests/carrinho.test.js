import {
    adicionarAoCarrinho,
    removerDoCarrinho,
    alterarQuantidade,
    calcularSubtotal,
    calcularTaxa,
    calcularTotal
} from "../src/carrinho.js";

const espresso = {
    id: 1,
    nome: "Espresso",
    preco: 6.5
};

describe("adicionarAoCarrinho", () => {
    test("deve adicionar um produto", () => {
        expect(
            adicionarAoCarrinho([], espresso)
        ).toHaveLength(1);
    });

    test("não deve duplicar produto", () => {
        let carrinho = adicionarAoCarrinho([], espresso);
        carrinho = adicionarAoCarrinho(carrinho, espresso);

        expect(carrinho).toHaveLength(1);
        expect(carrinho[0].quantidade).toBe(2);
    });
});

describe("removerDoCarrinho", () => {
    test("deve remover um produto", () => {
        const carrinho = [
            { ...espresso, quantidade: 1 }
        ];

        expect(
            removerDoCarrinho(carrinho, 1)
        ).toHaveLength(0);
    });

    test("não deve remover produto inexistente", () => {
        const carrinho = [
            { ...espresso, quantidade: 1 }
        ];

        expect(
            removerDoCarrinho(carrinho, 999)
        ).toHaveLength(1);
    });
});

describe("alterarQuantidade", () => {
    test("deve alterar a quantidade", () => {
        const carrinho = [
            { ...espresso, quantidade: 1 }
        ];

        expect(alterarQuantidade(carrinho, 1, 2)[0].quantidade).toBe(2);
        expect(alterarQuantidade(carrinho, 1, 5)[0].quantidade).toBe(5);
        expect(alterarQuantidade(carrinho, 1, 1)[0].quantidade).toBe(1);
    });

    test("deve remover quando a quantidade for zero", () => {
        const carrinho = [
            { ...espresso, quantidade: 1 }
        ];

        expect(
            alterarQuantidade(carrinho, 1, 0)
        ).toHaveLength(0);
    });
});

describe("cálculos do carrinho", () => {
    test("deve calcular subtotal", () => {
        const carrinho = [
            { preco: 10, quantidade: 2 },
            { preco: 15, quantidade: 1 }
        ];

        expect(calcularSubtotal(carrinho)).toBe(35);
    });

    test("subtotal vazio deve ser zero", () => {
        expect(calcularSubtotal([])).toBe(0);
    });

    test("deve calcular taxa de 5%", () => {
        expect(calcularTaxa(100)).toBe(5);
    });

    test("taxa não pode ultrapassar 10 reais", () => {
        expect(calcularTaxa(500)).toBe(10);
    });

    test("taxa de subtotal zero deve ser zero", () => {
        expect(calcularTaxa(0)).toBe(0);
    });

    test("deve calcular o total", () => {
        expect(calcularTotal(100, 5)).toBe(105);
        expect(calcularTotal(0, 0)).toBe(0);
    });
});