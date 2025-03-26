from flask import Flask, request, jsonify
from flask_cors import CORS
from database import init_db, add_product, get_all_products, get_low_stock_products, update_product_quantity, delete_product

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5002"}})

init_db()

@app.route('/api/products', methods=['GET', 'POST'])
def manage_products():
    if request.method == 'POST':
        try:
            product = request.get_json()
            required_fields = ['arrival_date', 'description', 'item_type', 'quantity']
            for field in required_fields:
                if field not in product or not product[field]:
                    return jsonify({"error": f"Missing required field: {field}"}), 400
            product_id = add_product(product)
            return jsonify({**product, "id": product_id}), 201
        except Exception as e:
            return jsonify({"error": str(e)}), 500
    else:
        products = get_all_products()
        return jsonify(products), 200

@app.route('/api/low-stock', methods=['GET'])
def low_stock():
    try:
        threshold = request.args.get('threshold', default=10, type=int)
        products = get_low_stock_products(threshold)
        return jsonify(products), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/products/<int:product_id>', methods=['PATCH', 'DELETE'])
def handle_product(product_id):
    try:
        if request.method == 'PATCH':
            data = request.get_json()
            if 'quantity' not in data or data['quantity'] < 0:
                return jsonify({"error": "Invalid quantity"}), 400
            update_product_quantity(product_id, data['quantity'])
            return jsonify({"success": True}), 200
        elif request.method == 'DELETE':
            delete_product(product_id)
            return jsonify({"success": True}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)