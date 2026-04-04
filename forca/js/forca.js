const btnComecar = document.querySelector("#comecar")
const btnJogar = document.querySelector("#jogar")

let palavraSorteada = ""
let erros = 0
const maxErros = 6

const partesBoneco = [
    "cabeca",
    "corpo",
    "braco-esq",
    "braco-dir",
    "perna-esq",
    "perna-dir"
]

const montarTabuleiro = (palavra) => {
    const ulLetras = document.querySelector(".tentativas")
    ulLetras.innerHTML = ""

    for(let i = 0; i < palavra.length; i++) {
        ulLetras.innerHTML += "<li></li>"
    }
}

const sortearPalavra = listaPalavras => {
    const totalPalavras = listaPalavras.length
    const numSorteio = Math.floor(Math.random() * totalPalavras)
    return listaPalavras[numSorteio]
}

btnComecar.addEventListener("click", () => {
    erros = 0
    palavraSorteada = sortearPalavra(palavras)
    montarTabuleiro(palavraSorteada)

    // resetar boneco
    partesBoneco.forEach(parte => {
        document.querySelector(`#${parte}`).style.display = "none"
    })

    console.log(palavraSorteada)
})

btnJogar.addEventListener("click", () => {
    const input = document.querySelector("#entrada")
    const letra = input.value.toUpperCase()
    input.value = ""

    const liDoDOM = document.querySelectorAll(".tentativas li")

    let acertou = 0

    for(let i = 0; i < palavraSorteada.length; i++) {      
        if(palavraSorteada[i].toUpperCase() == letra) {
            liDoDOM[i].innerHTML = letra
            acertou++
        }
    }

    // se não acertou nenhuma letra
    if(acertou == 0) {
        if(erros < maxErros) {
            document.querySelector(`#${partesBoneco[erros]}`).style.display = "block"
            erros++
        }

        if(erros == maxErros) {
            alert("Game Over! A palavra era: " + palavraSorteada)
        }
    }

    // verificar vitória
    let venceu = 1
    for(let i = 0; i < liDoDOM.length; i++) {
        if(liDoDOM[i].innerHTML == "") {
            venceu = 0
        }
    }

    if(venceu == 1) {
        alert("Parabéns! Você venceu!")
    }
})