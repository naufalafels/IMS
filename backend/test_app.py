import pytest
from app import app
from database import init_db, add_product, get_all_products

@pytest.fixture
def client():
    app.config['TESTING'] = True
    with app.test_client() as client:
        with app.app_context():
            init_db()
        yield client

def test_add_product(client):
    product = {
        'arrival_date': '2025-03-26',
        'description': 'Screws',
        'item_type': 'Screws',
        'quantity': 100,
        'location': 'GF-C1-R2',
        'supplier': 'Supplier A',
        'expiry_date': '2025-12-31',
        'dimensions': '10x10x10',
        'weight': '500g'
    }
    rv = client.post('/api/products', json=product)
    assert rv.status_code == 201
    assert len(get_all_products()) == 1

def test_get_products(client):
    rv = client.get('/api/products')
    assert rv.status_code == 200
    assert isinstance(rv.get_json(), list)