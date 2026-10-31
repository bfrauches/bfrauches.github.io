<?php
class ProdutoDAO {
    private $conexao;

    public function __construct($conexao) {
        $this->conexao = $conexao;
    }

    public function listarTodos() {
        $SQL = "SELECT * FROM produtos";
        $result = mysqli_query($this->conexao, $SQL);
        $produtos = [];

        while ($row = mysqli_fetch_assoc($result)) {
            $produto = new Produto(
                $row['id'],
                $row['nome'],
                $row['preco'],
                $row['fabricante']
            );
            array_push($produtos, $produto);
        }

        return $produtos;
    }

    public function cadastrar($produto) {
        $SQL = "INSERT INTO produtos (nome, preco, fabricante)
                VALUES (?, ?, ?)";

        $stmt = mysqli_prepare($this->conexao, $SQL);
        $nome = $produto->getNome();
        $preco = $produto->getPreco();
        $fabricante = $produto->getFabricante();

        mysqli_stmt_bind_param($stmt, "sds", $nome, $preco, $fabricante);
        return mysqli_stmt_execute($stmt);
    }

    public function atualizar($produto) {
        $SQL = "UPDATE produtos
                SET nome = ?, preco = ?, fabricante = ?
                WHERE id = ?";

        $stmt = mysqli_prepare($this->conexao, $SQL);
        $nome = $produto->getNome();
        $preco = $produto->getPreco();
        $fabricante = $produto->getFabricante();
        $id = $produto->getId();

        mysqli_stmt_bind_param(
            $stmt, "sdsi", $nome, $preco, $fabricante, $id
        );
        return mysqli_stmt_execute($stmt);
    }

    public function deletar($id) {
        $SQL = "DELETE FROM produtos WHERE id = ?";
        $stmt = mysqli_prepare($this->conexao, $SQL);

        mysqli_stmt_bind_param($stmt, "i", $id);
        return mysqli_stmt_execute($stmt);
    }
}
?>