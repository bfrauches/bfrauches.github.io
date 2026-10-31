document.addEventListener('DOMContentLoaded', carregarClientes);

async function carregarClientes() {
    const mensagem = document.getElementById('mensagem');
    const corpo = document.getElementById('corpoTabela');
    limparMensagem(mensagem); corpo.innerHTML = '';
    try {
        const nome = document.getElementById('filtroNome').value.trim();
        const clientes = await chamarApi('cliente', 'listar', nome ? { nome } : {});
        if (!Array.isArray(clientes) || clientes.length === 0) {
            const linha = document.createElement('tr'); const td = document.createElement('td');
            td.colSpan = 4; td.className = 'vazio'; td.textContent = 'Nenhum registro cadastrado';
            linha.appendChild(td); corpo.appendChild(linha); return;
        }
        clientes.forEach(cliente => {
            const linha = document.createElement('tr');
            [cliente.id, cliente.nome, cliente.endereco || '-'].forEach(valor => { const td = document.createElement('td'); td.textContent = valor; linha.appendChild(td); });
            const acoes = document.createElement('td'); const grupo = document.createElement('div'); grupo.className = 'acoes-linha';
            const editar = document.createElement('a'); editar.className = 'btn btn-pequeno'; editar.textContent = 'Editar'; editar.href = `cadastrar.html?id=${encodeURIComponent(cliente.id)}`;
            const remover = document.createElement('button'); remover.className = 'perigo pequeno'; remover.textContent = 'Remover';
            remover.addEventListener('click', async () => {
                if (!confirm('Deseja remover este cliente?')) return;
                try { await chamarApi('cliente', 'deletar', { id: cliente.id }); await carregarClientes(); }
                catch (erro) { exibirMensagem(mensagem, erro.message); }
            });
            grupo.append(editar, remover); acoes.appendChild(grupo); linha.appendChild(acoes); corpo.appendChild(linha);
        });
    } catch (erro) { exibirMensagem(mensagem, erro.message); }
}

document.getElementById('filtroNome').addEventListener('input', () => { clearTimeout(window.__filtroCliente); window.__filtroCliente = setTimeout(carregarClientes, 250); });
