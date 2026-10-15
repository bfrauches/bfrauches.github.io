const livros = []

/**
 * Função para adicionar novos livros na coleção
 * @param {*} livros - array de livros
 * @param {*} livro - um novo livro
 * @returns colecao com o novo livro adicionado
 */
const add = (livros, livro) => {
    livros.push(livro)
    return livros
}

/**
 * 
 * @param {*} id 
 */
const get = id => livros.find(livro=>livro.id ==id)

/**
 * Função que pesquisa livros em uma coleção
 * @param {*} livros - a coleção
 * @param {*} termo - fragmento de título para a pesquisa
 * @returns array de livros filtrados
 */
const listLivroByTitulo = (livros, termo) => 
    livros.filter(livro => 
        livro.titulo.toLowerCase().includes(termo.toLowerCase()))

/**
 * 
 * @param {*} livros 
 * @param {*} genero
 * @returns array de livros filtrados
 */
const listLivroByGenero = (livros, genero) =>
    livros.filter(livro => 
        livro.genero.toLowerCase().includes(genero.toLowerCase()))

function listUnread(livros) {
    return livros.filter(livro => !livro.lido);
} 

const markAsLido = (livros, id) => {
    livros[livros.findIndex(id)].lido = true;
}

const remove = livros => {

}

function totalPaginas(livros) { 
    return livros.reduce( 
        (total, livro) => total + livro.paginas, 0 
    ); 
}

function possuiLivrosNaoLidos(livros) { 
    return livros.some(livro => !livro.lido); 
} 

function todosForamLidos(livros) { 
    return livros.every(livro => livro.lido); 
} 



// dá visibilidade a algumas funções do arquivo js.
module.exports= {add
    , remove
    , get
    , listLivroByTitulo
    , listLivroByGenero
    , markAsLido
    , estatistics
};