function calcular() {
    let dinheiro = parseFloat(document.querySelector("input").value);
    let litros = dinheiro/7;
    let km = litros*20;
    alert("Você pode comprar " + litros.toFixed(2) + " litros e percorrer " + km.toFixed(2) + " km.");
}

function calcularIMC() {
    let peso = parseFloat(document.getElementById("peso").value);
    let altura = parseFloat(document.getElementById("altura").value);
    let imc = peso/(altura*altura);
    let classificacao = "";
    if(imc < 18.5)
        classificacao = "abaixo do peso";
    else if(imc < 25)
        classificacao = "com peso normal";
    else if(imc < 30)
        classificacao = "levemente acima do peso";
    else if(imc < 35)
        classificacao = "Obesidade grau I";
    else if(imc < 40)
        classificacao = "Obesidade grau II (severa)";
    else 
        classificacao = "Obesidade grau III (mórbida)";
    document.getElementById("resultadoIMC").innerHTML = "IMC: " + imc.toFixed(2) + " - " + classificacao; 
}

function simular() {
    let cont = [0,0,0,0,0,0];
    for(let i = 0; i < 1000000; i++) {
        let dado = Math.floor(Math.random()*6);
        cont[dado]++;
    }
    for(let i = 0; i < 6; i++) {
        document.getElementById("o"+(i+1)).innerHTML = cont[i];
        let freq = (cont[i] / 1000000) * 100;
        document.getElementById("f"+(i+1)).innerHTML = freq.toFixed(2) + "%";
    }
}

let nomes = [];
function adicionar() {
    let nome = document.getElementById("nome").value;
    nomes.push(nome);
    let li = document.createElement("li");
    li.innerHTML = nome;
    document.getElementById("lista").appendChild(li);
    document.getElementById("nome").value = "";
}
function inverter() {
    document.getElementById("invertidos").innerHTML = "";
    for(let i = 0; i < nomes.length; i++) {
        let nomeInvertido = nomes[i].split("").reverse().join("");
        let li = document.createElement("li");
        li.innerHTML = nomeInvertido;
        document.getElementById("invertidos").appendChild(li);
    }
}

function testar() {
    let palavra= document.getElementById("palavra").value;
    let invertida = palavra.split("").reverse().join("");
    if(palavra == invertida)
        document.getElementById("resultadoPal").innerHTML = "É um palíndromo!";
    else
        document.getElementById("resultadoPal").innerHTML = "Não é um palíndromo.";
}