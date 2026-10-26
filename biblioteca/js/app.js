let livros = JSON.parse(localStorage.getItem("livros")) || [];

function adicionarLivro(livro) {
    add(livros, livro);
}

function pesquisarLivros(termo) {
    return listLivroByTitulo(livros, termo);
}

function salvarLivros() {
    localStorage.setItem("livros", JSON.stringify(livros));
}

const form = document.getElementById("formLivro");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const livro = {
        id: Date.now(),
        titulo: document.getElementById("titulo").value,
        autor: document.getElementById("autor").value,
        genero: document.getElementById("genero").value,
        paginas: Number(document.getElementById("paginas").value),
        lido: false
    };

    adicionarLivro(livro);
    salvarLivros();
    renderizarLivros(pesquisarLivros(pesquisa.value));
    atualizarEstatisticas();

    form.reset();
});

function renderizarLivros(lista) {
    const container = document.getElementById("listaLivros");

    container.innerHTML = "";

    lista.forEach(livro => {
        const article = document.createElement("article");

        const titulo = document.createElement("h3");
        titulo.textContent = livro.titulo;

        const autor = document.createElement("p");
        autor.textContent = `Autor: ${livro.autor}`;

        const genero = document.createElement("p");
        genero.textContent = `Gênero: ${livro.genero}`;

        const paginas = document.createElement("p");
        paginas.textContent = `Páginas: ${livro.paginas}`;

        const status = document.createElement("p");
        status.textContent = livro.lido ? "Lido" : "Não lido";

        const btnLido = document.createElement("button");
        btnLido.textContent = "Marcar como lido";
        btnLido.disabled = livro.lido;

        btnLido.addEventListener("click", () => {
            markAsLido(livros, livro.id);
            salvarLivros();
            renderizarLivros(pesquisarLivros(pesquisa.value));
            atualizarEstatisticas();
        });

        const btnRemover = document.createElement("button");
        btnRemover.textContent = "Remover";
        btnRemover.classList.add("remover");

        btnRemover.addEventListener("click", () => {
            remove(livros, livro.id);
            salvarLivros();
            renderizarLivros(pesquisarLivros(pesquisa.value));
            atualizarEstatisticas();
        });

        article.append(
            titulo,
            autor,
            genero,
            paginas,
            status,
            btnLido,
            btnRemover
        );

        container.appendChild(article);
    });
}

const pesquisa = document.getElementById("pesquisa");

pesquisa.addEventListener("input", () => {
    const resultado = pesquisarLivros(pesquisa.value);
    renderizarLivros(resultado);
});

function atualizarEstatisticas() {
    const dados = estatistics(livros);

    const container = document.getElementById("estatisticas");

    container.innerHTML = `
        <h2>Estatísticas</h2>
        <p>Total de livros: ${dados.totalLivros}</p>
        <p>Livros lidos: ${dados.lidos}</p>
        <p>Livros não lidos: ${dados.naoLidos}</p>
        <p>Total de páginas: ${dados.totalPaginas}</p>
    `;
}

renderizarLivros(livros);
atualizarEstatisticas();