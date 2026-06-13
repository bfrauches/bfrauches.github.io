const despesaList = []
 
const gerarGrafico = () => {
 
 
 
const divGrafico = document.getElementById('grafico');
divGrafico.innerHTML = ""
 
const ctx = document.createElement("canvas")
divGrafico.appendChild(ctx)
 
const descricoes = despesaList.map(despesa => despesa.descricao)
const gastos = despesaList.map(despesa => despesa.valor)
 
const grafico = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: descricoes,
      datasets: [{
        label: 'Percentual de Gastos',
        data: gastos,
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
});
 
}
 
/**
 * Função construtora de objetos despesa
 * @param {*} desc
 * @param {*} valor
 */
const Despesa = function(desc="Não informado"
    , valor=0) {
    this.descricao = desc
    this.valor = valor
}
/**
 * Adiciona uma nova despesa no array Despesas
 */
const criarDespesa = () => {
//1.1 Nova Despesa no array despesas
    const descricao = document.querySelector("#descricao").value
    const valor = parseFloat(document.querySelector("#valor").value)
    const despesaNova = new Despesa(descricao, valor)
    despesaList.push(despesaNova)
}
 
const carregarLista = () => {
    const lista = document.querySelector("#lista")
    lista.innerHTML = ""
    despesaList.forEach(despesa => {
        const div = document.createElement("div")
        div.classList.add("item")
        // adicionar o texto da descricao e valor
        div.textContent = `${despesa.descricao}
                        - R$${despesa.valor}`
        // adicionar o elemento novo no div lista
        lista.appendChild(div)
    })
}
 
 
const gerarEstatisticas = () => {
    console.log(despesaList)
    const totalDeGastos = despesaList.reduce((total, despesa) =>{
        return total + despesa.valor
    }, 0)
    console.log(totalDeGastos)
    const valores = despesaList.map(despesa => despesa.valor)
    const maiorGasto = Math.max(...valores)
    const menorGasto = Math.min(...valores)
    console.log(maiorGasto)
 
    const valoresAcimaDe100 = despesaList.filter(despesa => despesa.valor > 100)
   
    const rela = document.querySelector("#estatisticas")
    rela.innerHTML = `<div>
        <p><strong>Menor Custo:</strong> R$${menorGasto.toFixed(2)}</p>
        <p><strong>Maior Custo:</strong> R$${maiorGasto.toFixed(2)}</p>
        <p><strong>Total de Gastos:</strong> R$${totalDeGastos.toFixed(2)}</p>
        <p><strong>Quantidade de Gastos acima de R$100,00:</strong> ${valoresAcimaDe100.length}</p>    
        <h2>Percentual de Gastos</h2>
        <div id="grafico"></div>
    </div>`
 
    gerarGrafico()
}
// 1. Ao clicar no btnAdicionar
const btn = document.querySelector("#btnAdicionar")
btn.addEventListener("click", ()=> {
    //criar um objeto despesa e adicionar no array
    criarDespesa()
    //adicionar os elementos da lista no html
    carregarLista()
    //gerar estatísticas
    gerarGrafico()
    grafico.update()
})
 
/*
1.1 Nova Despesa no array despesas
1.2 Adicionar despesa na lista
1.3 Gerar estatística
 
 */