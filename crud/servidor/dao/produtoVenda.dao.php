<?php
require_once __DIR__ . '/../models/ProdutoVenda.php';
require_once __DIR__ . '/../models/Produto.php';

class ProdutoVendaDAO {
    private $conexao;
    public function __construct($conexao) { $this->conexao = $conexao; }

    public function cadastrar($produtoId, $vendaId): bool {
        $stmt = $this->conexao->prepare('INSERT INTO produtos_vendas (produto_id, venda_id) VALUES (?, ?)');
        $produtoId = (int)$produtoId;
        $vendaId = (int)$vendaId;
        $stmt->bind_param('ii', $produtoId, $vendaId);
        $ok = $stmt->execute();
        $stmt->close();
        return $ok;
    }

    public function listarPorVenda($vendaId): array {
        $sql = 'SELECT pv.id AS pv_id, pv.produto_id, pv.venda_id,
                       p.id, p.nome, p.preco, p.fabricante
                FROM produtos_vendas pv
                INNER JOIN produtos p ON p.id = pv.produto_id
                WHERE pv.venda_id = ? ORDER BY p.nome';
        $stmt = $this->conexao->prepare($sql);
        $vendaId = (int)$vendaId;
        $stmt->bind_param('i', $vendaId);
        $stmt->execute();
        $result = $stmt->get_result();
        $itens = [];
        while ($row = $result->fetch_assoc()) {
            $produto = new Produto($row['produto_id'], $row['nome'], $row['preco'], $row['fabricante']);
            $itens[] = new ProdutoVenda($row['pv_id'], $row['produto_id'], $row['venda_id'], $produto);
        }
        $stmt->close();
        return $itens;
    }

    public function deletarPorVenda($vendaId): bool {
        $stmt = $this->conexao->prepare('DELETE FROM produtos_vendas WHERE venda_id = ?');
        $vendaId = (int)$vendaId;
        $stmt->bind_param('i', $vendaId);
        $ok = $stmt->execute();
        $stmt->close();
        return $ok;
    }
}
