import {
    buscarProdutos,
    filtrarPorCategoria
} from "../src/produtos.js";

const produtos = [
    {
        id: 1,
        nome: "Cappuccino",
        descricao: "Café cremoso",
        categoria: "Bebidas quentes",
        preco: 12
    },
    {
        id: 2,
        nome: "Bolo de Chocolate",
        descricao: "Bolo macio",
        categoria: "Bolos",
        preco: 10
    },
    {
        id: 3,
        nome: "Iced Coffee",
        descricao: "Café gelado",
        categoria: "Bebidas frias",
        preco: 11
    }
];

describe("buscarProdutos", () => {
    test("deve encontrar produtos pelo nome", () => {
        expect(buscarProdutos(produtos, "cappuccino")).toHaveLength(1);
    });

    test("deve ignorar maiúsculas e minúsculas", () => {
        expect(buscarProdutos(produtos, "CAPPUCCINO")).toHaveLength(1);
    });

    test("deve encontrar produtos pela descrição", () => {
        expect(buscarProdutos(produtos, "cremoso")).toHaveLength(1);
    });

    test("deve retornar array vazio quando não encontrar", () => {
        expect(buscarProdutos(produtos, "pizza")).toEqual([]);
    });

    test("deve retornar todos quando a busca estiver vazia", () => {
        expect(buscarProdutos(produtos, "")).toHaveLength(3);
    });
});

describe("filtrarPorCategoria", () => {
    test("deve retornar somente bebidas quentes", () => {
        const resultado = filtrarPorCategoria(
            produtos,
            "Bebidas quentes"
        );

        expect(
            resultado.every(p => p.categoria === "Bebidas quentes")
        ).toBe(true);
    });

    test.each(["Bebidas frias", "Pães", "Bolos"])(
        "deve filtrar a categoria %s",
        categoria => {
            const resultado = filtrarPorCategoria(produtos, categoria);

            expect(
                resultado.every(p => p.categoria === categoria)
            ).toBe(true);
        }
    );

    test("deve retornar todos para a categoria Todos", () => {
        expect(
            filtrarPorCategoria(produtos, "Todos")
        ).toHaveLength(3);
    });
});