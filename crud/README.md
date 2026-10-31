# Sistema de vendas - PHP + JavaScript + MySQL

Projeto organizado conforme a atividade CRUD completo de Produtos, Clientes e Vendas.

## Requisitos
- XAMPP com Apache, MySQL e PHP 8.x.
- Navegador atualizado.

## Instalação no XAMPP
1. Extraia a pasta `Aula_JS_PHP_SQL` dentro de `C:\xampp\htdocs\`.
2. Inicie Apache e MySQL pelo painel do XAMPP.
3. Abra `http://localhost/phpmyadmin`.
4. Importe o arquivo `servidor/banco.sql` (ou copie e execute seu conteúdo na aba SQL).
5. Confira `servidor/includes/db_connect.php`. A configuração padrão é `localhost`, usuário `root`, senha vazia e banco `loja`.
6. Acesse `http://localhost/Aula_JS_PHP_SQL/cliente/index.html`.

Se preferir manter o nome da pasta como `crud`, coloque o conteúdo desta pasta em `C:\xampp\htdocs\crud\` e acesse `http://localhost/crud/cliente/index.html`. Os caminhos relativos do projeto continuam funcionando.

## Estrutura
```text
Aula_JS_PHP_SQL/
├── servidor/
│   ├── banco.sql
│   ├── includes/
│   ├── models/
│   ├── dao/
│   ├── services/
│   ├── controllers/
│   └── proxy.php
├── cliente/
│   ├── index.html
│   ├── css/style.css
│   ├── js/api.js
│   ├── js/produtos/ clientes/ vendas/
│   └── html/produtos/ clientes/ vendas/
└── README.md
```

## Funcionalidades
- Produtos: listar, filtrar por nome, cadastrar, editar e remover.
- Clientes: listar, filtrar por nome, cadastrar, editar e remover.
- Vendas: listar com cliente/data/total, cadastrar, editar e remover; seleção de cliente e produtos; total estimado no navegador e total definitivo calculado no serviço PHP usando os preços do banco.
- Todas as chamadas do front-end usam `POST` e passam por `cliente/js/api.js`.
- DAOs usam prepared statements. Remoção de produto/cliente associado a vendas é bloqueada com mensagem.

## Teste rápido da API
As chamadas devem usar POST e corpo JSON. Exemplo com curl:
```bash
curl -X POST "http://localhost/Aula_JS_PHP_SQL/servidor/proxy.php?modulo=produto&acao=listar" \
  -H "Content-Type: application/json" -d "{}"
```

Para cadastrar um produto:
```bash
curl -X POST "http://localhost/Aula_JS_PHP_SQL/servidor/proxy.php?modulo=produto&acao=salvar" \
  -H "Content-Type: application/json" -d "{\"nome\":\"Teclado\",\"preco\":150,\"fabricante\":\"Logitech\"}"
```

## Observações
- O SQL usa `CREATE TABLE IF NOT EXISTS`, então importar novamente não apaga os registros existentes.
- A conexão padrão não tem senha porque essa é a configuração comum do XAMPP local. Ajuste o arquivo `db_connect.php` caso sua instalação use outras credenciais.
- O projeto foi verificado quanto à sintaxe PHP neste ambiente. A integração com seu MySQL local precisa ser testada no XAMPP, porque este ambiente não acessa seu banco de dados local.
