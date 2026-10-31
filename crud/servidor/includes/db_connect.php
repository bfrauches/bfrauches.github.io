<?php
try {
    // Parâmetros: host, usuário, senha e banco
    $conn = new mysqli('localhost', 'root', '', 'loja');

    // Define o charset UTF-8
    $conn->set_charset("utf8mb4");

} catch (mysqli_sql_exception $e) {
    die("Erro ao conectar no banco de dados: " . $e->getMessage());
}
?>
