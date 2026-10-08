
/*
TESTES para ADICIONAR LIVROS
*/
const {
    add
    , remove
    , get
    , listLivroByTitulo
    , listLivroByGenero
    , markAsLido
    , estatistics
} = require("../js/livros");

test("deve adicionar um livro à coleção", () => {

    const livros = [];

    const livro = {
        id: 1,
        titulo: "JavaScript",
        autor: "Autor",
        genero: "Programação",
        paginas: 300,
        lido: false
    };

    const resultado = add(livros, livro);

    expect(resultado).toHaveLength(1);
    expect(resultado[0]).toEqual(livro);
});

/*
Testes do Pesquisar Livros
*/

test("deve encontrar livros pelo título", () => {

    const livros = [
        {
            id: 1,
            titulo: "JavaScript",
            autor: "Autor A",
            genero: "Programação",
            paginas: 300,
            lido: false
        },
        {
            id: 2,
            titulo: "HTML e CSS",
            autor: "Autor B",
            genero: "Web",
            paginas: 250,
            lido: true
        }
    ];
    //chamando a função para testes
    const resultado = listLivroByTitulo(livros,"javascript");

    expect(resultado).toHaveLength(1);
    expect(resultado[0].titulo).toBe("JavaScript");
});

test("pesquisa sem correspondência deve retornar array vazio", () => {
    const livros = [
        {
            id: 1,
            titulo: "JavaScript",
            autor: "Autor A",
            genero: "Programação",
            paginas: 300,
            lido: false
        },
        {
            id: 2,
            titulo: "HTML e CSS",
            autor: "Autor B",
            genero: "Web",
            paginas: 250,
            lido: true
        }
    ];

    const resultado = listLivroByTitulo(livros,"Python");

    expect(resultado).toHaveLength(0);
});

/*
Testes do Filtrar Livros
*/
test("deve encontrar livros pelo genero", () => {

    const livros = [
        {
            id: 1,
            titulo: "JavaScript",
            autor: "Autor A",
            genero: "Programação",
            paginas: 300,
            lido: false
        },
        {
            id: 2,
            titulo: "HTML e CSS",
            autor: "Autor B",
            genero: "Web",
            paginas: 250,
            lido: true
        }
    ];

    const resultado = listLivroByGenero(livros,"web");

    expect(resultado).toHaveLength(1);
    expect(resultado[0].titulo).toBe("HTML e CSS");
});

/* Testes para listar por não lido */

test("deve retornar somente livros não lidos", () => {

const livros = [

{ id: 1, titulo: "JavaScript", lido: false },

{ id: 2, titulo: "HTML", lido: true },

{ id: 3, titulo: "CSS", lido: false }

];

const resultado = listUnread(livros);

expect(resultado).toHaveLength(2);

expect(resultado.map(livro => livro.titulo))

.toEqual(["JavaScript", "CSS"]);

});

/* Testes para markAsLido */

test("deve marcar um livro como lido", () => {

const livros = [

{

id: 1,

titulo: "JavaScript",

lido: false

}

];

const resultado = markAsLido(livros, 1);

expect(resultado[0].lido).toBe(true);

});

test("não deve alterar a lista quando o livro não existe", () => {

const livros = [

{ id: 1, titulo: "JavaScript", lido: false }

];

const resultado = markAsLido(livros, 99);

expect(resultado).toEqual(livros);

});

