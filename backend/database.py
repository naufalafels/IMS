import sqlite3
from datetime import datetime

def init_db():
    conn = sqlite3.connect('inventory.db')
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            manufacturer_id TEXT NOT NULL,
            arrival_date TEXT NOT NULL,
            description TEXT NOT NULL,
            item_type TEXT NOT NULL,
            quantity INTEGER NOT NULL,
            sku TEXT UNIQUE,
            batch_lot TEXT UNIQUE,
            location TEXT NOT NULL,
            supplier TEXT,
            expiry_date TEXT,
            dimensions TEXT,
            weight TEXT
        )
    ''')
    conn.commit()
    conn.close()

def generate_sku(description, item_type):
    timestamp = datetime.now().strftime("%H%M%S")
    return f"{description[:2].upper()}-{item_type[:3].upper()}-{timestamp}"

def generate_batch_lot():
    return datetime.now().strftime("%Y%m%d%H%M%S")

def add_product(product):
    conn = sqlite3.connect('inventory.db')
    try:
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        sku = generate_sku(product['description'], product['item_type'])
        batch_lot = generate_batch_lot()
        
        cursor.execute('''
            INSERT INTO products (
                arrival_date, description, item_type, quantity,
                sku, batch_lot, location, supplier,
                expiry_date, dimensions, weight
            ) VALUES (?,?,?,?,?,?,?,?,?,?,?)
        ''', (
            product['arrival_date'], product['description'], product['item_type'],
            product['quantity'], sku, batch_lot,
            product.get('location', ''),
            product.get('supplier', ''),
            product.get('expiry_date', ''),
            product.get('dimensions', ''),
            product.get('weight', '')
        ))
        conn.commit()
        return cursor.lastrowid
    finally:
        conn.close()

def get_all_products():
    conn = sqlite3.connect('inventory.db')
    try:
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM products ORDER BY id DESC')
        return [dict(row) for row in cursor.fetchall()]
    finally:
        conn.close()

def get_low_stock_products(threshold=10):
    conn = sqlite3.connect('inventory.db')
    try:
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        cursor.execute('SELECT * FROM products WHERE quantity < ?', (threshold,))
        return [dict(row) for row in cursor.fetchall()]
    finally:
        conn.close()

def update_product_quantity(product_id, quantity):
    conn = sqlite3.connect('inventory.db')
    try:
        cursor = conn.cursor()
        cursor.execute('UPDATE products SET quantity = ? WHERE id = ?', (quantity, product_id))
        conn.commit()
    finally:
        conn.close()

def delete_product(product_id):
    conn = sqlite3.connect('inventory.db')
    try:
        cursor = conn.cursor()
        cursor.execute('DELETE FROM products WHERE id = ?', (product_id,))
        conn.commit()
    finally:
        conn.close()