import sqlite3
from datetime import datetime
import random

# Conectar ao banco de dados
conn = sqlite3.connect('./db/estoque_simples.db')

# Criar um cursor
c = conn.cursor()

# Função para criar tabelas (se não existirem)
def create_tables():
    # Criar tabela de categorias
    c.execute('''
    CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    ''')

    # Criar tabela de produtos
    c.execute('''
    CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        category_id INTEGER,
        quantity INTEGER NOT NULL,
        price REAL NOT NULL,
        image TEXT DEFAULT 'assets/images/default.jpg',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (category_id) REFERENCES categories(id)
    )
    ''')

# Função para popular a tabela com dados reais
def seed_data():
    categories = [
        'Eletrônicos', 'Roupas', 'Alimentos', 'Bebidas', 'Livros',
        'Móveis', 'Brinquedos', 'Ferramentas', 'Beleza', 'Esportes'
    ]

    category_data = [(name, datetime.now(), datetime.now()) for name in categories]
    c.executemany('INSERT INTO categories (name, created_at, updated_at) VALUES (?, ?, ?)', category_data)

    products = [
        ('Notebook Dell Inspiron', 'Notebook Dell Inspiron 15 3000', 1, 10, 3500.00),
        ('Smartphone Samsung Galaxy', 'Smartphone Samsung Galaxy S21', 1, 25, 5000.00),
        ('Camiseta de Algodão', 'Camiseta básica de algodão', 2, 50, 29.90),
        ('Jeans Levi\'s', 'Calça Jeans Levi\'s 501', 2, 20, 199.90),
        ('Arroz Tio João', 'Arroz Tio João 5kg', 3, 100, 19.99),
        ('Feijão Carioca', 'Feijão Carioca Tipo 1 1kg', 3, 80, 9.99),
        ('Coca-Cola', 'Refrigerante Coca-Cola 2L', 4, 200, 7.99),
        ('Suco de Laranja', 'Suco de Laranja Natural One 1L', 4, 150, 10.99),
        ('O Pequeno Príncipe', 'Livro O Pequeno Príncipe', 5, 30, 29.90),
        ('Dom Quixote', 'Livro Dom Quixote', 5, 40, 49.90),
        ('Sofá 3 Lugares', 'Sofá 3 Lugares Reclinável', 6, 5, 1500.00),
        ('Mesa de Jantar', 'Mesa de Jantar 6 Cadeiras', 6, 3, 1200.00),
        ('Lego Star Wars', 'Brinquedo Lego Star Wars', 7, 20, 299.90),
        ('Boneca Barbie', 'Boneca Barbie Fashionista', 7, 35, 89.90),
        ('Furadeira Bosch', 'Furadeira de Impacto Bosch', 8, 15, 399.90),
        ('Chave de Fenda', 'Chave de Fenda Phillips', 8, 50, 19.90),
        ('Shampoo Dove', 'Shampoo Dove Reconstrução Completa', 9, 60, 12.90),
        ('Perfume Chanel', 'Perfume Chanel Nº 5', 9, 10, 499.90),
        ('Bola de Futebol', 'Bola de Futebol Nike', 10, 25, 99.90),
        ('Bicicleta Caloi', 'Bicicleta Caloi Aro 29', 10, 10, 1500.00)
    ]

    # Adicionar mais produtos aleatórios para atingir 100 produtos
    additional_products = [
        ('Produto {}'.format(i), 'Descrição do Produto {}'.format(i), random.randint(1, 10), random.randint(1, 100), round(random.uniform(10.00, 1000.00), 2))
        for i in range(21, 101)
    ]

    products.extend(additional_products)

    product_data = [(name, description, category_id, quantity, price, 'assets/default.jpg', datetime.now(), datetime.now()) for (name, description, category_id, quantity, price) in products]
    c.executemany('INSERT INTO products (name, description, category_id, quantity, price, image, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', product_data)

# Criar tabelas
create_tables()

# Popular dados
seed_data()

# Salvar (commit) as mudanças
conn.commit()

# Fechar a conexão
conn.close()
