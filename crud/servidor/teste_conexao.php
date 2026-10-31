<?php
require_once __DIR__ . '/includes/db_connect.php';

if ($conn->connect_error) {
    die("Falha na conexão: " . $conn->connect_error);
}

echo "Conexão com o banco loja realizada com sucesso!";
?>