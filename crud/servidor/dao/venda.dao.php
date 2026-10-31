<?php
require_once __DIR__ . '/../models/Venda.php';

class VendaDAO {
    private $conexao;
    public function __construct($conexao) { $this->conexao = $conexao; }

    public function listarTodos($filtros = []): array {
        $sql = 'SELECT v.id, v.cliente_id, c.nome AS cliente_nome, v.data_venda, v.total_venda
                FROM vendas v INNER JOIN clientes c ON c.id = v.cliente_id ORDER BY v.id DESC';
        $stmt = $this->conexao->prepare($sql);
        $stmt->execute();
        $result = $stmt->get_result();
        $itens = [];
        while ($row = $result->fetch_assoc()) {
            $itens[] = new Venda($row['id'], $row['cliente_id'], $row['data_venda'], $row['total_venda'], $row['cliente_nome']);
        }
        $stmt->close();
        return $itens;
    }

    public function buscarPorId($id): ?Venda {
        $sql = 'SELECT v.id, v.cliente_id, c.nome AS cliente_nome, v.data_venda, v.total_venda
                FROM vendas v INNER JOIN clientes c ON c.id = v.cliente_id WHERE v.id = ?';
        $stmt = $this->conexao->prepare($sql);
        $id = (int)$id;
        $stmt->bind_param('i', $id);
        $stmt->execute();
        $row = $stmt->get_result()->fetch_assoc();
        $stmt->close();
        return $row ? new Venda($row['id'], $row['cliente_id'], $row['data_venda'], $row['total_venda'], $row['cliente_nome']) : null;
    }

    public function cadastrar($venda): int {
        $stmt = $this->conexao->prepare('INSERT INTO vendas (cliente_id, data_venda, total_venda) VALUES (?, ?, ?)');
        $clienteId = (int)$venda->getClienteId();
        $dataVenda = $venda->getDataVenda();
        $total = $venda->getTotalVenda();
        $stmt->bind_param('isd', $clienteId, $dataVenda, $total);
        $stmt->execute();
        $id = (int)$this->conexao->insert_id;
        $stmt->close();
        return $id;
    }

    public function atualizar($venda): bool {
        $stmt = $this->conexao->prepare('UPDATE vendas SET cliente_id = ?, data_venda = ?, total_venda = ? WHERE id = ?');
        $clienteId = (int)$venda->getClienteId();
        $dataVenda = $venda->getDataVenda();
        $total = $venda->getTotalVenda();
        $id = (int)$venda->getId();
        $stmt->bind_param('isdi', $clienteId, $dataVenda, $total, $id);
        $ok = $stmt->execute();
        $stmt->close();
        return $ok;
    }

    public function deletar($id): bool {
        $stmt = $this->conexao->prepare('DELETE FROM vendas WHERE id = ?');
        $id = (int)$id;
        $stmt->bind_param('i', $id);
        $ok = $stmt->execute();
        $stmt->close();
        return $ok;
    }
}
