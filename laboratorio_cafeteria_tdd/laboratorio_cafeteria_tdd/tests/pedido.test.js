import { gerarPedido } from "../src/pedido.js";

describe("gerarPedido", () => {
    test("deve gerar um pedido corretamente", () => {
        const carrinho = [
            {
                id: 1,
                nome: "Espresso",
                preco: 6.5,
                quantidade: 2
            }
        ];

        const pedido = gerarPedido(carrinho, "Pix");

        expect(pedido.formaPagamento).toBe("Pix");
        expect(pedido.subtotal).toBe(13);
        expect(pedido.taxa).toBe(0.65);
        expect(pedido.total).toBe(13.65);
        expect(pedido.itens).toEqual(carrinho);
        expect(pedido.id).toBeDefined();
        expect(pedido.data).toBeDefined();
    });
});