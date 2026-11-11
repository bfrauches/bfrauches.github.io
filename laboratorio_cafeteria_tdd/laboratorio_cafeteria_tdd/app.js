import {
    buscarProdutos,
    filtrarPorCategoria
} from "./src/produtos.js";

import {
    adicionarAoCarrinho,
    removerDoCarrinho,
    alterarQuantidade,
    calcularSubtotal,
    calcularTaxa,
    calcularTotal
} from "./src/carrinho.js";

import { gerarPedido } from "./src/pedido.js";

import {
    salvarCarrinho,
    carregarCarrinho,
    salvarPedido
} from "./src/storage.js";

const CHAVE_CARRINHO = "cafeteria_carrinho";
const CHAVE_PEDIDOS = "cafeteria_pedidos";

let produtos = [];
let carrinho = carregarCarrinho();
let categoriaAtual = "Todos";

const formatarMoeda = valor =>
    new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL"
    }).format(valor);

function renderizarProdutos(lista) {
    document.querySelector("#listaProdutos").innerHTML =
        lista.map(p => `
            <article class="produto">
                <img src="${p.foto}" alt="${p.nome}">

                <div class="produto-corpo">
                    <span class="produto-categoria">${p.categoria}</span>
                    <h3>${p.nome}</h3>
                    <p>${p.descricao}</p>

                    <div class="produto-rodape">
                        <span class="preco">${formatarMoeda(p.preco)}</span>

                        <button class="adicionar" data-id="${p.id}">
                            Adicionar
                        </button>
                    </div>
                </div>
            </article>
        `).join("");

    document.querySelector("#quantidadeResultados").textContent =
        `${lista.length} itens`;
}

function renderizarCarrinho() {
    const area = document.querySelector("#itensCarrinho");

    if (carrinho.length === 0) {
        area.innerHTML = '<p class="vazio">Seu carrinho está vazio.</p>';
    } else {
        area.innerHTML = carrinho.map(item => `
            <div class="item-carrinho">
                <div>
                    <h4>${item.nome}</h4>
                    <p>${formatarMoeda(item.preco)}</p>
                </div>

                <div class="controles">
                    <button data-acao="diminuir" data-id="${item.id}">-</button>
                    <span>${item.quantidade}</span>
                    <button data-acao="aumentar" data-id="${item.id}">+</button>
                    <button data-acao="remover" data-id="${item.id}">×</button>
                </div>
            </div>
        `).join("");
    }

    const subtotal = calcularSubtotal(carrinho);
    const taxa = calcularTaxa(subtotal);
    const total = calcularTotal(subtotal, taxa);

    document.querySelector("#subtotal").textContent = formatarMoeda(subtotal);
    document.querySelector("#taxa").textContent = formatarMoeda(taxa);
    document.querySelector("#total").textContent = formatarMoeda(total);

    document.querySelector("#contadorCarrinho").textContent =
        carrinho.reduce((soma, item) => soma + item.quantidade, 0);

    salvarCarrinho(carrinho);
}

function atualizarProdutos() {
    let resultado = filtrarPorCategoria(produtos, categoriaAtual);

    const termo = document.querySelector("#busca").value;

    resultado = buscarProdutos(resultado, termo);

    renderizarProdutos(resultado);
}

async function carregarProdutos() {
    try {
        const resposta = await fetch("./produtos.json");
        const dados = await resposta.json();

        produtos = dados.map((produto, indice) => ({
            ...produto,
            id: indice + 1
        }));

        atualizarProdutos();
    } catch (erro) {
        console.error("Erro ao carregar produtos:", erro);
    }
}

document.querySelector("#busca").addEventListener("input", atualizarProdutos);

document.querySelector("#categorias").addEventListener("click", evento => {
    const botao = evento.target.closest("[data-categoria]");

    if (!botao) return;

    categoriaAtual = botao.dataset.categoria;

    document.querySelectorAll(".filtro").forEach(filtro => {
        filtro.classList.remove("ativo");
    });

    botao.classList.add("ativo");

    atualizarProdutos();
});

document.querySelector("#listaProdutos").addEventListener("click", evento => {
    const botao = evento.target.closest(".adicionar");

    if (!botao) return;

    const id = Number(botao.dataset.id);
    const produto = produtos.find(item => item.id === id);

    if (!produto) return;

    carrinho = adicionarAoCarrinho(carrinho, produto);

    renderizarCarrinho();
});

document.querySelector("#itensCarrinho").addEventListener("click", evento => {
    const botao = evento.target.closest("button[data-acao]");

    if (!botao) return;

    const id = Number(botao.dataset.id);
    const item = carrinho.find(produto => produto.id === id);

    if (!item) return;

    const acao = botao.dataset.acao;

    if (acao === "aumentar") {
        carrinho = alterarQuantidade(carrinho, id, item.quantidade + 1);
    }

    if (acao === "diminuir") {
        carrinho = alterarQuantidade(carrinho, id, item.quantidade - 1);
    }

    if (acao === "remover") {
        carrinho = removerDoCarrinho(carrinho, id);
    }

    renderizarCarrinho();
});

document.querySelector("#abrirCarrinho").onclick = () => {
    document.querySelector("#modalCarrinho").classList.add("aberto");
};

document.querySelector("#fecharCarrinho").onclick = () => {
    document.querySelector("#modalCarrinho").classList.remove("aberto");
};

document.querySelector("#formPagamento").addEventListener("submit", evento => {
    evento.preventDefault();

    if (carrinho.length === 0) {
        document.querySelector("#mensagemPagamento").textContent =
            "Adicione produtos antes de finalizar o pedido.";
        return;
    }

    const formaPagamento =
        document.querySelector("#formaPagamento").value;

    if (!formaPagamento) return;

    const pedido = gerarPedido(carrinho, formaPagamento);

    salvarPedido(pedido);

    carrinho = [];

    renderizarCarrinho();

    document.querySelector("#mensagemPagamento").textContent =
        `Pedido #${pedido.id} realizado com sucesso! Total: ${formatarMoeda(pedido.total)}. Pagamento: ${formaPagamento}.`;

    document.querySelector("#formPagamento").reset();
});

renderizarCarrinho();
carregarProdutos();