<?
require_once './models/generic.entity.php';

class Venda extends GenericEntity{
    private $cliente;
    private $dataVenda;
    private $totalVenda;    
    
    public function __construct($id, $cliente, $dataVenda, $totalVenda) {
        parent::__construct($id);
        $this->cliente = $cliente;
        $this->dataVenda = $dataVenda;
        $this->totalVenda = $totalVenda;
    }

    public function getCliente() {
        return $this->cliente;
    }

    public function getDataVenda() {
        return $this->dataVenda;
    }

    public function getTotalVenda() {
        return $this->totalVenda;
    }

}

?>