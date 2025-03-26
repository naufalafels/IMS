import React from 'react';
import PropTypes from 'prop-types';

const StockList = ({ products, onDecreaseQuantity }) => {
  const lowStockThreshold = 10;

  // Sort products alphabetically by description first, then by expiry date
  const sortedProducts = [...products].sort((a, b) => {
    // Primary sort: alphabetical by description
    const descriptionCompare = a.description.localeCompare(b.description);
    if (descriptionCompare !== 0) return descriptionCompare;

    // Secondary sort: expiry date (earliest first)
    const aDate = a.expiry_date ? new Date(a.expiry_date) : new Date(8640000000000000);
    const bDate = b.expiry_date ? new Date(b.expiry_date) : new Date(8640000000000000);
    return aDate - bDate;
  });

  const lowStockProducts = products.filter(p => p.quantity < lowStockThreshold);

  const handleDecrease = (product) => {
    const newQuantity = product.quantity - 1;
    onDecreaseQuantity(product.id, newQuantity);
  };

  return (
    <div className="stock-list-container">
      <div className="inventory-section">
        <h2>Current Inventory</h2>
        {products.length === 0 ? (
          <p className="no-products">No products in inventory</p>
        ) : (
        <ul className="product-list">
          {sortedProducts.map(product => (
            <li key={`product-${product.id}`} className="product-item">
              <div className="product-info">
                <div className="product-header">
                  <span className="product-sku">SKU: {product.sku}</span>
                  <span className="product-type">{product.item_type}</span>
                </div>
                <span className="product-description">{product.description}</span>
                <div className="product-details">
                  <span>Location: {product.location}</span>
                  <span>Supplier: {product.supplier}</span>
                  <span>Expiry: {product.expiry_date}</span>
                </div>
              </div>
              <div className="quantity-section">
                <span className="product-quantity">
                  Qty: {product.quantity}
                </span>
                <button
                  className="quantity-btn"
                  onClick={() => handleDecrease(product)}
                  disabled={product.quantity <= 0}
                >
                  -
                </button>
              </div>
            </li>
          ))}
        </ul>
        )}
      </div>

      <div className="low-stock-section">
        <h2>Low Stock Alert</h2>
        {lowStockProducts.length === 0 ? (
          <p className="no-alerts">No low stock items</p>
        ) : (
          <ul className="low-stock-list">
            {lowStockProducts.map(product => (
              <li key={`low-stock-${product.id}`} className="low-stock-item">
                {product.item_type}: {product.description} - Only {product.quantity} remaining
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

StockList.propTypes = {
  products: PropTypes.array.isRequired,
  onDecreaseQuantity: PropTypes.func.isRequired,
};

export default StockList;