document.addEventListener('DOMContentLoaded', carregarProdutos);

async function carregarProdutos() {
    const mensagem = document.getElementById('mensagem');
    const corpo = document.getElementById('corpoTabela');
    limparMensagem(mensagem);
    corpo.innerHTML = '';
    try {
        const nome = document.getElementById('filtroNome').value.trim();
        const produtos = await chamarApi('produto', 'listar', nome ? { nome } : {});
        if (!Array.isArray(produtos) || produtos.length === 0) {
            const linha = document.createElement('tr');
            const celula = document.createElement('td');
            celula.colSpan = 5;
            celula.className = 'vazio';
            celula.textContent = 'Nenhum registro cadastrado';
            linha.appendChild(celula);
            corpo.appendChild(linha);
            return;
        }
        produtos.forEach(produto => {
            const linha = document.createElement('tr');
            [produto.id, produto.nome, formatarMoeda(produto.preco), produto.fabricante || '-'].forEach(valor => {
                const td = document.createElement('td'); td.textContent = valor; linha.appendChild(td);
            });
            const acoes = document.createElement('td');
            const grupo = document.createElement('div'); grupo.className = 'acoes-linha';
            const editar = document.createElement('a'); editar.className = 'btn btn-pequeno'; editar.textContent = 'Editar'; editar.href = `cadastrar.html?id=${encodeURIComponent(produto.id)}`;
            const remover = document.createElement('button'); remover.className = 'perigo pequeno'; remover.textContent = 'Remover';
            remover.addEventListener('click', async () => {
                if (!confirm('Deseja remover este produto?')) return;
                try { await chamarApi('produto', 'deletar', { id: produto.id }); await carregarProdutos(); }
                catch (erro) { exibirMensagem(mensagem, erro.message); }
            });
            grupo.append(editar, remover); acoes.appendChild(grupo); linha.appendChild(acoes); corpo.appendChild(linha);
        });
    } catch (erro) { exibirMensagem(mensagem, erro.message); }
}

document.getElementById('btnBuscar').addEventListener('click', carregarProdutos);
document.getElementById('filtroNome').addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); carregarProdutos(); } });
