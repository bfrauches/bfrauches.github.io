document.addEventListener('DOMContentLoaded', iniciarFormularioVenda);

let produtosDisponiveis = [];

async function iniciarFormularioVenda() {
    const formulario = document.getElementById('formulario');
    const mensagem = document.getElementById('mensagem');
    const id = new URLSearchParams(location.search).get('id');
    try {
        const [clientes, produtos] = await Promise.all([
            chamarApi('cliente', 'listar', {}),
            chamarApi('produto', 'listar', {})
        ]);
        produtosDisponiveis = produtos;
        preencherClientes(clientes);
        preencherProdutos(produtos);
        document.getElementById('dataVenda').value = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10);

        if (id) {
            document.getElementById('tituloPagina').textContent = 'Editar venda';
            document.getElementById('botaoSalvar').textContent = 'Salvar alterações';
            const vendas = await chamarApi('venda', 'listar', {});
            const venda = vendas.find(item => String(item.id) === String(id));
            if (!venda) throw new Error('Venda não encontrada.');
            document.getElementById('cliente').value = venda.cliente_id;
            document.getElementById('dataVenda').value = String(venda.data_venda).slice(0, 10);
            const idsMarcados = (venda.produtos || []).map(item => String(item.produto_id));
            document.querySelectorAll('input[name="produtos"]').forEach(campo => { campo.checked = idsMarcados.includes(campo.value); });
            atualizarTotal();
        }
    } catch (erro) {
        exibirMensagem(mensagem, erro.message);
    }

    formulario.addEventListener('submit', async evento => {
        evento.preventDefault(); limparMensagem(mensagem);
        const produtos = Array.from(document.querySelectorAll('input[name="produtos"]:checked')).map(campo => Number(campo.value));
        const dados = {
            cliente_id: Number(document.getElementById('cliente').value),
            data_venda: document.getElementById('dataVenda').value,
            produtos
        };
        if (!dados.cliente_id || !dados.data_venda || produtos.length === 0) {
            exibirMensagem(mensagem, 'Selecione um cliente, informe a data e marque pelo menos um produto.'); return;
        }
        try { await chamarApi('venda', id ? 'editar' : 'salvar', id ? { ...dados, id: Number(id) } : dados); location.href = 'listar.html'; }
        catch (erro) { exibirMensagem(mensagem, erro.message); }
    });
}

function preencherClientes(clientes) {
    const select = document.getElementById('cliente');
    select.innerHTML = '<option value="">Selecione um cliente</option>';
    clientes.forEach(cliente => { const option = document.createElement('option'); option.value = cliente.id; option.textContent = cliente.nome; select.appendChild(option); });
}

function preencherProdutos(produtos) {
    const lista = document.getElementById('listaProdutos');
    lista.innerHTML = '';
    if (!produtos.length) { lista.textContent = 'Nenhum produto cadastrado. Cadastre produtos antes de criar uma venda.'; return; }
    produtos.forEach(produto => {
        const label = document.createElement('label'); label.className = 'check-produto';
        const checkbox = document.createElement('input'); checkbox.type = 'checkbox'; checkbox.name = 'produtos'; checkbox.value = produto.id;
        checkbox.addEventListener('change', atualizarTotal);
        const texto = document.createElement('span'); texto.textContent = `${produto.nome} — ${formatarMoeda(produto.preco)}`;
        label.append(checkbox, texto); lista.appendChild(label);
    });
}

function atualizarTotal() {
    const selecionados = new Set(Array.from(document.querySelectorAll('input[name="produtos"]:checked')).map(campo => Number(campo.value)));
    const total = produtosDisponiveis.filter(produto => selecionados.has(Number(produto.id))).reduce((soma, produto) => soma + Number(produto.preco), 0);
    document.getElementById('totalVenda').textContent = formatarMoeda(total);
}
