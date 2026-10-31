// As páginas ficam em cliente/html/<modulo>/; por isso são dois níveis até a pasta servidor.
const URL_PROXY = '../../../servidor/proxy.php';

async function chamarApi(modulo, acao, dados = {}) {
    let resposta;
    try {
        resposta = await fetch(`${URL_PROXY}?modulo=${encodeURIComponent(modulo)}&acao=${encodeURIComponent(acao)}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dados)
        });
    } catch (erro) {
        throw new Error('Não foi possível conectar ao servidor. Verifique se o Apache e o MySQL estão ligados.');
    }

    let json;
    try {
        json = await resposta.json();
    } catch (erro) {
        throw new Error('O servidor não retornou um JSON válido. Confira os erros do PHP.');
    }

    if (!resposta.ok || json.sucesso === false) {
        throw new Error(json.mensagem || 'Erro na requisição.');
    }
    return json;
}

function exibirMensagem(elemento, mensagem, tipo = 'erro') {
    if (!elemento) return;
    elemento.textContent = mensagem;
    elemento.className = `mensagem ${tipo}`;
}

function limparMensagem(elemento) {
    if (!elemento) return;
    elemento.textContent = '';
    elemento.className = 'mensagem';
}

function formatarMoeda(valor) {
    return Number(valor || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function formatarData(data) {
    if (!data) return '';
    const [ano, mes, dia] = String(data).slice(0, 10).split('-');
    return `${dia}/${mes}/${ano}`;
}
