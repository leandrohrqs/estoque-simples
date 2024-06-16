# Estoque Simples

Este é um projeto simples para gerenciar um estoque de produtos, desenvolvido com Node.js, Express, SQLite e frontend em HTML, CSS e JavaScript.

## Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [npm](https://www.npmjs.com/)
- [Python](https://www.python.org/) (para rodar o script de seeding)

## Instalação

1. Clone o repositório:

   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd estoque-simples

   ```

2. Instale as dependências do node

   ```bash
   npm install
   ```

3. Crie e popule o banco de dados

   ```bash
   python seeder_db.py
   ```

   // Obs: dependendo da versão do seu python pode aparecer "datetime deprecated" mas irá funcionar da mesma maneira

4. Inicie o servidor

   ```bash
   npm start
   ```

5. Abra o navegador e acesse

   ```
   localhost:3000
   ```

## Estrutura de Arquivos

- **server.js**: Arquivo principal do servidor Node.js.
- **seeder_db.py**: Script Python para criar e popular o banco de dados com dados de exemplo.
- **assets**: Contém as imagens utilizadas no projeto.
- **css**: Contém os arquivos de estilo CSS.
- **images**: Lugar aonde é armazenado a foto dos produtos adicionados pelo create.
- **js**: Contém os arquivos JavaScript utilizados no frontend.
- **index.html**: Página inicial do projeto.
- **cadastrar_categoria.html**: Página para cadastrar novas categorias.
- **cadastrar_produto.html**: Página para cadastrar novos produtos.
- **categorias.html**: Página para listar e gerenciar categorias.
- **produto.html**: Página para visualizar os detalhes de um produto.

## Endpoints da API

- **GET /api/products**: Retorna todos os produtos.
- **GET /api/products/:id**: Retorna um produto específico pelo ID.
- **POST /api/products**: Cria um novo produto.
- **PUT /api/products/:id**: Atualiza um produto existente pelo ID.
- **DELETE /api/products/:id**: Deleta um produto pelo ID.

- **GET /api/categories**: Retorna todas as categorias.
- **POST /api/categories**: Cria uma nova categoria.
- **PUT /api/categories/:id**: Atualiza uma categoria existente pelo ID.
- **DELETE /api/categories/:id**: Deleta uma categoria pelo ID.
