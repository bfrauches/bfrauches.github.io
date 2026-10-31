<?php

require_once __DIR__ . '/../dao/produto.dao.php';
require_once __DIR__ . '/../models/Produto.php';
require_once __DIR__ . '/../models/generic.entity.php';
require_once __DIR__ . '/generic.service.php';

class ProdutoService extends GenericService {

    public function __construct($conn) {
        parent::__construct($conn);
    }

    public  function getDAOPrincipal(){
        return new ProdutoDAO($this->conn);
    }

    public function listarTodos($filtros = []) {
        return $this->dao->listarTodos();
    }

    public function cadastrar($produto) {
        return $this->dao->cadastrar($produto);
    }

    public function atualizar($produto) {
        return  $this->dao->atualizar($produto);
    }

    public function deletar($id) {
        // Lógica para deletar um produto do banco de dados
        return $this->dao->deletar($id);
    }
}

?>