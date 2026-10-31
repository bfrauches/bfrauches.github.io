<?php
require_once __DIR__ . '/generic.controller.php';
require_once __DIR__ . '/../models/Venda.php';
require_once __DIR__ . '/../models/Produto.php';
require_once __DIR__ . '/../services/venda.service.php';

class VendaController extends GenericController {
    private $service;
    public function __construct($conn) {
        parent::__construct($conn);
        $this->service = new VendaService($conn);
    }
    public function listarTodos($parametros) {
        return $this->service->listarTodos(is_array($parametros) ? $parametros : []);
    }
    public function cadastrar($parametros) {
        $venda = $this->montarVenda($parametros, null);
        $this->service->cadastrar($venda);
        return ['sucesso' => true];
    }
    public function atualizar($parametros) {
        $venda = $this->montarVenda($parametros, $parametros['id'] ?? null);
        $this->service->atualizar($venda);
        return ['sucesso' => true];
    }
    public function deletar($parametros) {
        $this->service->deletar($parametros['id'] ?? 0);
        return ['sucesso' => true];
    }
    private function montarVenda($parametros, $id): Venda {
        $produtos = [];
        foreach (($parametros['produtos'] ?? []) as $produtoId) {
            $produtos[] = new Produto((int)$produtoId);
        }
        return new Venda(
            $id,
            $parametros['cliente_id'] ?? null,
            $parametros['data_venda'] ?? '',
            0,
            '',
            $produtos
        );
    }
}
