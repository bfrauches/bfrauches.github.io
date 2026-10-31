document.addEventListener('DOMContentLoaded', iniciarFormularioCliente);

async function iniciarFormularioCliente() {
    const formulario = document.getElementById('formulario');
    const mensagem = document.getElementById('mensagem');
    const id = new URLSearchParams(location.search).get('id');
    if (id) {
        document.getElementById('tituloPagina').textContent = 'Editar cliente';
        document.getElementById('botaoSalvar').textContent = 'Salvar alterações';
        try {
            const clientes = await chamarApi('cliente', 'listar', {});
            const cliente = clientes.find(item => String(item.id) === String(id));
            if (!cliente) throw new Error('Cliente não encontrado.');
            document.getElementById('nome').value = cliente.nome;
            document.getElementById('endereco').value = cliente.endereco || '';
        } catch (erro) { exibirMensagem(mensagem, erro.message); }
    }
    formulario.addEventListener('submit', async evento => {
        evento.preventDefault(); limparMensagem(mensagem);
        const dados = { nome: document.getElementById('nome').value.trim(), endereco: document.getElementById('endereco').value.trim() };
        if (!dados.nome) { exibirMensagem(mensagem, 'O nome do cliente é obrigatório.'); return; }
        try { await chamarApi('cliente', id ? 'editar' : 'salvar', id ? { ...dados, id: Number(id) } : dados); location.href = 'listar.html'; }
        catch (erro) { exibirMensagem(mensagem, erro.message); }
    });
}
