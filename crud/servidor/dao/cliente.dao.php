<?
  class ClienteDAO {
    private $conexao;
    public function __construct($conexao) {
        $this->conexao = $conexao;
    }
    public function listarTodos() {
        $SQL = "SELECT * FROM clientes";
        $result = mysqli_query($this->conexao, $SQL);
        $clientes = [];
        while ($row = mysqli_fetch_assoc($result)) {
            $cliente = new Cliente($row['id'], $row['nome'], $row['endereco']);
            array_push($clientes, $cliente);
        }
        return $clientes;
    }

    public function cadastrar($cliente) {
        $SQL = "INSERT INTO clientes (nome, endereco) VALUES ('{$cliente->getNome()}', '{$cliente->getEndereco()}')";
        mysqli_query($this->conexao, $SQL);
    }

    public function atualizar($cliente) {
         $SQL = "UPDATE clientes SET nome = '{$cliente->getNome()}', endereco = '{$cliente->getEndereco()}' WHERE id = {$cliente->getId()}";
        mysqli_query($this->conexao, $SQL);
    }

    public function deletar($id) {
        $SQL = "DELETE FROM clientes WHERE id = $id";
        mysqli_query($this->conexao, $SQL);
    }
  }
?>