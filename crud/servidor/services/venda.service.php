<?php
require_once __DIR__ . '/generic.service.php';
require_once __DIR__ . '/../dao/venda.dao.php';
require_once __DIR__ . '/../dao/produtoVenda.dao.php';
require_once __DIR__ . '/../dao/produto.dao.php';
require_once __DIR__ . '/../dao/cliente.dao.php';

class VendaService extends GenericService {
    private $conn;
    private $itensDAO;
    private $produtoDAO;
    private $clienteDAO;

    public function __construct($conn) {
        $this->conn = $conn;
        $this->itensDAO = new ProdutoVendaDAO($conn);
        $this->produtoDAO = new ProdutoDAO($conn);
        $this->clienteDAO = new ClienteDAO($conn);
        parent::__construct($conn);
    }

    public function getDAOPrincipal($conn) { return new VendaDAO($conn); }

    public function listarTodos($filtros = []): array {
        $vendas = $this->dao->listarTodos($filtros);
        foreach ($vendas as $venda) {
            $venda->setProdutos($this->itensDAO->listarPorVenda($venda->getId()));
        }
        return $vendas;
    }

    public function cadastrar($venda) {
        $ids = $this->validarERetornarProdutos($venda);
        $total = $this->calcularTotal($ids);
        $venda->setTotalVenda($total);

        $this->conn->begin_transaction();
        try {
            $idVenda = $this->dao->cadastrar($venda);
            foreach ($ids as $produtoId) $this->itensDAO->cadastrar($produtoId, $idVenda);
            $this->conn->commit();
            return true;
        } catch (Throwable $e) {
            $this->conn->rollback();
            throw $e;
        }
    }

    public function atualizar($venda) {
        if (!$venda->getId() || !$this->dao->buscarPorId($venda->getId())) {
            throw new InvalidArgumentException('Venda não encontrada.');
        }
        $ids = $this->validarERetornarProdutos($venda);
        $venda->setTotalVenda($this->calcularTotal($ids));

        $this->conn->begin_transaction();
        try {
            $this->dao->atualizar($venda);
            $this->itensDAO->deletarPorVenda($venda->getId());
            foreach ($ids as $produtoId) $this->itensDAO->cadastrar($produtoId, $venda->getId());
            $this->conn->commit();
            return true;
        } catch (Throwable $e) {
            $this->conn->rollback();
            throw $e;
        }
    }

    public function deletar($id) {
        if (!$this->dao->buscarPorId($id)) throw new InvalidArgumentException('Venda não encontrada.');
        $this->conn->begin_transaction();
        try {
            $this->itensDAO->deletarPorVenda($id);
            $this->dao->deletar($id);
            $this->conn->commit();
            return true;
        } catch (Throwable $e) {
            $this->conn->rollback();
            throw $e;
        }
    }

    private function validarERetornarProdutos($venda): array {
        if (!$venda->getClienteId() || !$this->clienteDAO->buscarPorId($venda->getClienteId())) {
            throw new InvalidArgumentException('Selecione um cliente válido.');
        }
        $data = (string)$venda->getDataVenda();
        $dataObj = DateTime::createFromFormat('Y-m-d', $data);
        if (!$dataObj || $dataObj->format('Y-m-d') !== $data) {
            throw new InvalidArgumentException('Informe uma data de venda válida.');
        }
        $ids = [];
        foreach ($venda->getProdutos() as $produto) {
            $id = is_object($produto) && method_exists($produto, 'getId') ? (int)$produto->getId() : (int)$produto;
            if ($id > 0) $ids[] = $id;
        }
        $ids = array_values(array_unique($ids));
        if (count($ids) === 0) throw new InvalidArgumentException('Selecione pelo menos um produto para a venda.');
        foreach ($ids as $id) {
            if (!$this->produtoDAO->buscarPorId($id)) {
                throw new InvalidArgumentException('Um dos produtos selecionados não existe mais. Atualize a página e tente novamente.');
            }
        }
        return $ids;
    }

    private function calcularTotal(array $ids): float {
        $total = 0.0;
        foreach ($ids as $id) {
            $produto = $this->produtoDAO->buscarPorId($id);
            if (!$produto) throw new InvalidArgumentException('Produto não encontrado ao calcular a venda.');
            $total += (float)$produto->getPreco();
        }
        return round($total, 2);
    }
}
