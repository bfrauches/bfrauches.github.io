const formulario = document.getElementById("formProduto");
const listaProdutos = document.getElementById("listaProdutos");

const API = "../../../servidor/proxy.php?modulo=produto";

let produtoEmEdicao = null;

// Listar produtos
async function listarProdutos() {
    const resposta = await fetch(`${API}&acao=listar`);
    const produtos = await resposta.json();

    listaProdutos.innerHTML = "";

    produtos.forEach(produto => {
        const item = document.createElement("div");

        const informacoes = document.createElement("p");
        informacoes.textContent =
            `${produto.nome} - R$ ${produto.preco} - ${produto.fabricante}`;

        const botaoExcluir = document.createElement("button");
        botaoExcluir.textContent = "Excluir";

        botaoExcluir.addEventListener("click", () => {
            excluirProduto(produto.id);
        });

        const botaoEditar = document.createElement("button");
        botaoEditar.textContent = "Editar";

        botaoEditar.addEventListener("click", () => {
            editarProduto(produto);
        });

        item.appendChild(botaoEditar);
        item.appendChild(informacoes);
        item.appendChild(botaoExcluir);

        listaProdutos.appendChild(item);
    });
}

// Excluir produto
async function excluirProduto(id) {
    const confirmar = confirm("Deseja realmente excluir este produto?");

    if (!confirmar) return;

    try {
        const resposta = await fetch(`${API}&acao=deletar`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id: id })
        });

        const resultado = await resposta.json();

        if (!resposta.ok || resultado === false || resultado?.erro) {
            throw new Error(resultado?.erro || "Erro ao excluir produto.");
        }

        alert("Produto excluído!");
        listarProdutos();

    } catch (erro) {
        console.error(erro);
        alert(erro.message);
    }
}

// Carregar dados no formulário
function editarProduto(produto) {
    document.getElementById("nome").value = produto.nome;
    document.getElementById("preco").value = produto.preco;
    document.getElementById("fabricante").value = produto.fabricante;

    produtoEmEdicao = produto.id;

    formulario.querySelector("button[type='submit']").textContent =
        "Salvar alterações";

    document.getElementById("cancelarEdicao").hidden = false;
}

// Cadastrar ou atualizar produto
formulario.addEventListener("submit", async function(event) {
    event.preventDefault();

    const produto = {
        nome: document.getElementById("nome").value.trim(),
        preco: Number(document.getElementById("preco").value),
        fabricante: document.getElementById("fabricante").value.trim()
    };

    if (!produto.nome || !produto.fabricante ||
        !document.getElementById("preco").value ||
        !Number.isFinite(produto.preco) || produto.preco < 0) {
        alert("Preencha os campos corretamente!");
        return;
    }

    try {
        const acao = produtoEmEdicao ? "editar" : "salvar";

        const dados = produtoEmEdicao
            ? { ...produto, id: produtoEmEdicao }
            : produto;

        const resposta = await fetch(`${API}&acao=${acao}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dados)
        });

        const resultado = await resposta.json();

        if (!resposta.ok || resultado === false || resultado?.erro) {
            throw new Error(resultado?.erro || "Não foi possível salvar.");
        }

        alert(produtoEmEdicao
            ? "Produto atualizado com sucesso!"
            : "Produto cadastrado com sucesso!");

        formulario.reset();
        produtoEmEdicao = null;

        formulario.querySelector("button[type='submit']").textContent =
            "Cadastrar produto";

        document.getElementById("cancelarEdicao").hidden = true;

        listarProdutos();

    } catch (erro) {
        console.error(erro);
        alert(erro.message);
    }
});

// Cancelar edição
document.getElementById("cancelarEdicao").addEventListener("click", () => {
    formulario.reset();
    produtoEmEdicao = null;

    formulario.querySelector("button[type='submit']").textContent =
        "Cadastrar produto";

    document.getElementById("cancelarEdicao").hidden = true;
});

// Carregar produtos ao abrir a página
listarProdutos();