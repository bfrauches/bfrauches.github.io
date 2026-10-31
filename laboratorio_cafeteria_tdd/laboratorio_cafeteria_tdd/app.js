// ESQUELETO PARA TDD — implemente as regras após escrever os testes.
const CHAVE_CARRINHO="cafeteria_carrinho"; const CHAVE_PEDIDOS="cafeteria_pedidos";
let produtos=[]; let carrinho=[]; let categoriaAtual="Todos";
const formatarMoeda=v=>new Intl.NumberFormat("pt-BR",{style:"currency",currency:"BRL"}).format(v);
// TODO: carregarProdutos, buscarProdutos, filtrarPorCategoria, adicionarAoCarrinho,
// removerDoCarrinho, alterarQuantidade, calcularSubtotal, calcularTaxa,
// calcularTotal, gerarPedido, salvarCarrinho, carregarCarrinho e salvarPedido.
function renderizarProdutos(lista){document.querySelector("#listaProdutos").innerHTML=lista.map((p,i)=>`<article class="produto"><img src="${p.foto}" alt="${p.nome}"><div class="produto-corpo"><span class="produto-categoria">${p.categoria}</span><h3>${p.nome}</h3><p>${p.descricao}</p><div class="produto-rodape"><span class="preco">${formatarMoeda(p.preco)}</span><button class="adicionar" data-id="${p.id??i}">Adicionar</button></div></div></article>`).join("")}
document.querySelector("#abrirCarrinho").onclick=()=>document.querySelector("#modalCarrinho").classList.add("aberto");
document.querySelector("#fecharCarrinho").onclick=()=>document.querySelector("#modalCarrinho").classList.remove("aberto");
