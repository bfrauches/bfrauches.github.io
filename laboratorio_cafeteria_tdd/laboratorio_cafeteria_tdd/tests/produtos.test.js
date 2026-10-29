import "./../src/produtos.js";

fetch("./produtos.json")
    .then(resposta => resposta.json())
    .then(dados => {
        produtos = dados;
        renderizarProdutos(produtos);
    });

test("deve encontrar produtos pelo nome", () => {
    const produtos = [
    {
        nome: "Cappuccino",
        descricao: "Café cremoso",
        preco: 12
    },
    {
        nome: "Bolo de Chocolate",
        descricao: "Bolo macio",
        preco: 10
    }
    ];
    const resultado =
    buscarProdutos(produtos, "cappuccino");
    expect(resultado).toHaveLength(1);
});

test("deve retornar somente bebidas quentes", () => {
    const resultado =
        filtrarPorCategoria(produtos, "Bebidas quentes");
        expect(
            resultado.every(
                produto => produto.categoria === "Bebidas quentes"
            )
        ).toBe(true);
});