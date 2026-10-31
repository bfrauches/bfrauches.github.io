<?php

require_once __DIR__ . '/../controllers/generic.controller.php';

abstract class GenericService {

    protected $dao;
    protected $conn;

    public function __construct($conn) {
        $this->conn = $conn;
        $this->dao = $this->getDAOPrincipal();
    }

    public abstract function getDAOPrincipal();

    public function listarTodos($filtros = []) {
        return $this->dao->listarTodos();
    }

    public abstract function cadastrar($obj);
    public abstract function atualizar($obj);
    public abstract function deletar($obj);
}

?>