<?php
require_once __DIR__ . '/generic.service.php';
require_once __DIR__ . '/../dao/cliente.dao.php';

class ClienteService extends GenericService {
    public function getDAOPrincipal($conn) { return new ClienteDAO($conn); }

    public function cadastrar($cliente) {
        $this->validar($cliente);
        return $this->dao->cadastrar($cliente);
    }

    public function atualizar($cliente) {
        if (!$cliente->getId() || !$this->dao->buscarPorId($cliente->getId())) {
            throw new InvalidArgumentException('Cliente não encontrado.');
        }
        $this->validar($cliente);
        return $this->dao->atualizar($cliente);
    }

    public function deletar($id) {
        if (!$this->dao->buscarPorId($id)) throw new InvalidArgumentException('Cliente não encontrado.');
        if ($this->dao->possuiVendas($id)) {
            throw new InvalidArgumentException('Este cliente não pode ser removido porque possui vendas cadastradas.');
        }
        return $this->dao->deletar($id);
    }

    private function validar($cliente): void {
        if (trim((string)$cliente->getNome()) === '') {
            throw new InvalidArgumentException('O nome do cliente é obrigatório.');
        }
    }
}
