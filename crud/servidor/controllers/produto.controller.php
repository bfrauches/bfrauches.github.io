<?php

require_once __DIR__ . '/generic.controller.php';
require_once __DIR__ . '/../models/Produto.php';
require_once __DIR__ . '/../services/produto.service.php';

class ProdutoController extends GenericController {

    private $service;

    public function __construct($conn) {
        parent::__construct($conn);
        $this->service = new ProdutoService($conn);
    }

    public function listarTodos($parametros) {
        return $this->service->listarTodos($parametros);
    }

    public function cadastrar($parametros) {
        if (
            empty($parametros['nome']) ||
            !isset($parametros['preco']) ||
            !isset($parametros['fabricante']) ||
            !is_numeric($parametros['preco']) ||
            $parametros['preco'] < 0
        ) {
            throw new InvalidArgumentException(
                "Dados do produto inválidos."
            );
        }

        $produto = new Produto(
            null,
            trim($parametros['nome']),
            $parametros['preco'],
            trim($parametros['fabricante'])
        );

        return $this->service->cadastrar($produto);
    }

    public function atualizar($parametros) {
        if (
            !isset($parametros['id']) ||
            !is_numeric($parametros['id']) ||
            (int)$parametros['id'] <= 0 ||
            empty($parametros['nome']) ||
            !isset($parametros['preco']) ||
            !is_numeric($parametros['preco']) ||
            $parametros['preco'] < 0 ||
            !isset($parametros['fabricante'])
        ) {
            throw new InvalidArgumentException(
                "Dados para atualizar o produto são inválidos."
            );
        }

        $produto = new Produto(
            (int)$parametros['id'],
            trim($parametros['nome']),
            $parametros['preco'],
            trim($parametros['fabricante'])
        );

        return $this->service->atualizar($produto);
    }

    public function deletar($parametros) {
        if (
            !isset($parametros['id']) ||
            !is_numeric($parametros['id']) ||
            (int)$parametros['id'] <= 0
        ) {
            throw new InvalidArgumentException(
                "ID do produto inválido."
            );
        }

        return $this->service->deletar((int)$parametros['id']);
    }
}

?>