<?php

require_once './models/generic.entity.php';

class ProdutoVenda extends GenericEntity {
    private $produto;
    private $venda;


    public function __construct($id, $produto, $venda) {
        parent::__construct($id);
        $this->produto = $produto;
        $this->venda = $venda;
    }

    public function getProduto() {
        return $this->produto;
    }

    public function getVenda() {
        return $this->venda;
    }
}

?>