let listaDeEventos = [];

function Evento(titulo, local, vagas, preco, data, ativo) {
    this.titulo = titulo;
    this.local = local;
    this.vagas = vagas;
    this.preco = preco;
    this.data = data;
    this.ativo = ativo;
    this.observacao = undefined;
    this.cancelamento = null;
}

function cadastrarEvento() {

    let titulo = document.getElementById("titulo").value.trim();
    let local = document.getElementById("local").value.trim();
    let vagas = Number(document.getElementById("vagas").value);
    let preco = Number(document.getElementById("preco").value);
    let data = document.getElementById("data").value;
    let ativo = document.getElementById("ativo").checked;

    if (titulo === "" || local === "") {
        alert("Título e local não podem estar vazios.");
        return;
    }

    if (isNaN(vagas) || isNaN(preco)) {
        alert("Vagas e preço devem ser números válidos.");
        return;
    }

    if (vagas < 0 || preco < 0) {
        alert("Vagas e preço não podem ser negativos.");
        return;
    }

    let dataEvento = new Date(data);

    if (data === "" || isNaN(dataEvento.getTime())) {
        alert("Informe uma data válida.");
        return;
    }

    let novoEvento = new Evento(
        titulo,
        local,
        vagas,
        preco,
        dataEvento,
        ativo
    );

    listaDeEventos.push(novoEvento);

    listarEventos();

    document.getElementById("titulo").value = "";
    document.getElementById("local").value = "";
    document.getElementById("vagas").value = "";
    document.getElementById("preco").value = "";
    document.getElementById("data").value = "";
    document.getElementById("ativo").checked = false;

    alert("Evento cadastrado com sucesso!");
}

function listarEventos() {

    let lista = document.getElementById("listaEventos");

    lista.innerHTML = "";

    listaDeEventos.forEach(evento => {

        lista.innerHTML += `
            <ul>
                <li><strong>Título:</strong> ${evento.titulo}</li>
                <li><strong>Local:</strong> ${evento.local}</li>
                <li><strong>Data:</strong> ${evento.data.toLocaleDateString()}</li>
                <li><strong>Preço:</strong> R$ ${evento.preco.toFixed(2)}</li>
                <li><strong>Status:</strong> ${evento.ativo ? "Ativo" : "Inativo"}</li>
            </ul>
            <hr>
        `;
    });

    mostrarEstatisticas();
}

function mostrarEventosAtivos() {
    return listaDeEventos.filter(evento => evento.ativo);
}

function calcularArrecadacao() {

    return listaDeEventos.reduce((total, evento) => {
        return total + (evento.vagas * evento.preco);
    }, 0);

}

function verificarObservacoes() {

    let texto = "";

    listaDeEventos.forEach(evento => {

        if (evento.observacao === undefined) {
            texto += `Evento "${evento.titulo}" não possui observações cadastradas.<br>`;
        }

    });

    return texto;
}

function verificarCancelados() {

    let texto = "";

    listaDeEventos.forEach(evento => {

        if (evento.cancelamento !== null) {

            texto += `
                Evento "${evento.titulo}" cancelado.<br>
                Motivo: ${evento.cancelamento}<br><br>
            `;

        }

    });

    return texto;
}

function mostrarEstatisticas() {

    let estatisticas = document.getElementById("estatisticas");

    let eventosAtivos = mostrarEventosAtivos();

    estatisticas.innerHTML = `
        <h2>Estatísticas</h2>

        <p><strong>Total de eventos:</strong> ${listaDeEventos.length}</p>

        <p><strong>Eventos ativos:</strong> ${eventosAtivos.length}</p>

        <p><strong>Arrecadação possível:</strong> R$ ${calcularArrecadacao().toFixed(2)}</p>

        <h3>Observações</h3>
        ${verificarObservacoes()}

        <h3>Cancelamentos</h3>
        ${verificarCancelados()}
    `;
}

const btn = document.getElementById("btnCadastrar");

btn.addEventListener("click", cadastrarEvento);