<?php

header('Content-Type: application/json; charset=utf-8');

require_once './includes/db_connect.php';
require_once './controllers/produto.controller.php';

$modulo = $_GET['modulo'] ?? null;
$acao = $_GET['acao'] ?? null;

$dadosEnviados = file_get_contents('php://input');
$dadosFormatados = json_decode($dadosEnviados, true);

if (
    !empty($dadosEnviados) &&
    json_last_error() !== JSON_ERROR_NONE
) {
    http_response_code(400);
    echo json_encode(['erro' => 'JSON inválido.']);
    exit;
}

if ($modulo !== 'produto') {
    http_response_code(404);
    echo json_encode([
        'erro' => 'Por enquanto, apenas o módulo produto está disponível.'
    ]);
    exit;
}

try {
    $controller = new ProdutoController($conn);

    switch ($acao) {
        case 'listar':
            $resultado = $controller->listarTodos($dadosFormatados ?? []);
            break;

        case 'salvar':
            $resultado = $controller->cadastrar($dadosFormatados ?? []);
            break;

        case 'editar':
            $resultado = $controller->atualizar($dadosFormatados ?? []);
            break;

        case 'deletar':
            $resultado = $controller->deletar($dadosFormatados ?? []);
            break;

        default:
            http_response_code(400);
            echo json_encode(['erro' => 'Ação não encontrada.']);
            exit;
    }

    echo json_encode($resultado);

} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode([
        'erro' => 'Erro ao processar a solicitação.',
        'detalhe' => $e->getMessage()
    ]);
}
?>