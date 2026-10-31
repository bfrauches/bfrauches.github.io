document.addEventListener('DOMContentLoaded', carregarVendas);

async function carregarVendas() {
    const mensagem = document.getElementById('mensagem');
    const corpo = document.getElementById('corpoTabela');
    limparMensagem(mensagem); corpo.innerHTML = '';
    try {
        const vendas = await chamarApi('venda', 'listar', {});
        if (!Array.isArray(vendas) || vendas.length === 0) {
            const linha = document.createElement('tr'); const td = document.createElement('td');
            td.colSpan = 5; td.className = 'vazio'; td.textContent = 'Nenhum registro cadastrado';
            linha.appendChild(td); corpo.appendChild(linha); return;
        }
        vendas.forEach(venda => {
            const linha = document.createElement('tr');
            [venda.id, venda.cliente_nome || `Cliente #${venda.cliente_id}`, formatarData(venda.data_venda), formatarMoeda(venda.total_venda)].forEach(valor => { const td = document.createElement('td'); td.textContent = valor; linha.appendChild(td); });
            const tdAcoes = document.createElement('td'); const grupo = document.createElement('div'); grupo.className = 'acoes-linha';
            const editar = document.createElement('a'); editar.className = 'btn btn-pequeno'; editar.textContent = 'Editar'; editar.href = `cadastrar.html?id=${encodeURIComponent(venda.id)}`;
            const remover = document.createElement('button'); remover.className = 'perigo pequeno'; remover.textContent = 'Remover';
            remover.addEventListener('click', async () => {
                if (!confirm('Deseja remover esta venda?')) return;
                try { await chamarApi('venda', 'deletar', { id: venda.id }); await carregarVendas(); }
                catch (erro) { exibirMensagem(mensagem, erro.message); }
            });
            grupo.append(editar, remover); tdAcoes.appendChild(grupo); linha.appendChild(tdAcoes); corpo.appendChild(linha);
        });
    } catch (erro) { exibirMensagem(mensagem, erro.message); }
}
