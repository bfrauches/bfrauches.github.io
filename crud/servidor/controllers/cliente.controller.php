<?
require_once './controllers/generic.controller.php';
require_once './models/Cliente.php';
class ClienteController extends GenericController {
    public function listarTodos($parametros) {
        // Lógica para listar clientes do banco de dados
    }

    public function cadastrar($parametros) {
        $nomeCliente = $parametros['nome'];
        $enderecoCliente = $parametros['endereco'];
        $cliente = new Cliente(null, $nomeCliente, $enderecoCliente);
    }

    public function atualizar($parametros) {
        // Lógica para atualizar um cliente existente no banco de dados
    }

    public function deletar($parametros) {
        // Lógica para deletar um cliente do banco de dados
    }
}

?>