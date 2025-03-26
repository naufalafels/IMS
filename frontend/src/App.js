import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StockList from './StockList';
import './App.css';

const api = axios.create({
  baseURL: 'http://localhost:5001/api'
});

const App = () => {
  const initialProductState = {
    arrival_date: '',
    description: '',
    item_type: '',
    quantity: '',
    location: '',
    supplier: '',
    expiry_date: '',
    dimensions: '',
    weight: '',
  };

  const [product, setProduct] = useState(initialProductState);
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      setMessage('Failed to load products');
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!product.arrival_date) newErrors.arrival_date = 'Arrival date required';
    if (!product.description) newErrors.description = 'Description required';
    if (!product.item_type) newErrors.item_type = 'Item type required';
    if (!product.quantity || product.quantity < 0) newErrors.quantity = 'Valid quantity required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await api.post('/products', product);
      setProducts([response.data, ...products]);
      setMessage('Product added successfully');
      setProduct(initialProductState);
    } catch (error) {
      console.error('Error adding product:', error);
      setMessage('Failed to add product');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: name === 'quantity' ? Math.max(0, parseInt(value) || 0) : value
    }));
  };

  const handleUpdateQuantity = async (productId, newQuantity) => {
    try {
      if (newQuantity === 0) {
        await api.delete(`/products/${productId}`);
        setProducts(products.filter(p => p.id !== productId));
        setMessage('Product removed from inventory');
      } else {
        await api.patch(`/products/${productId}`, { quantity: newQuantity });
        setProducts(products.map(p => 
          p.id === productId ? { ...p, quantity: newQuantity } : p
        ));
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
      setMessage('Failed to update quantity');
    }
  };

  return (
    <div className="app-container">
      <h1>Inventory Management System</h1>
      
      {message && <div className={`message ${message.includes('success') ? 'success' : 'error'}`}>{message}</div>}

      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group">
          <label>Arrival Date:</label>
          <input
            type="date"
            name="arrival_date"
            value={product.arrival_date}
            onChange={handleChange}
            className={errors.arrival_date ? 'error' : ''}
            required
          />
          {errors.arrival_date && <span className="error-message">{errors.arrival_date}</span>}
        </div>

        <div className="form-group">
          <label>Description:</label>
          <input
            type="text"
            name="description"
            value={product.description}
            onChange={handleChange}
            className={errors.description ? 'error' : ''}
            required
          />
          {errors.description && <span className="error-message">{errors.description}</span>}
        </div>

        <div className="form-group">
          <label>Item Type:</label>
          <select
            name="item_type"
            value={product.item_type}
            onChange={handleChange}
            className={errors.item_type ? 'error' : ''}
            required
          >
            <option value="">Select Item Type</option>
            <option value="Screws">Screws</option>
            <option value="PVC Pipes">PVC Pipes</option>
            <option value="Fans">Fans</option>
            <option value="GM tube">GM tube</option>
          </select>
          {errors.item_type && <span className="error-message">{errors.item_type}</span>}
        </div>

        <div className="form-group">
          <label>Quantity:</label>
          <input
            type="number"
            name="quantity"
            value={product.quantity}
            onChange={handleChange}
            min="0"
            className={errors.quantity ? 'error' : ''}
            required
          />
          {errors.quantity && <span className="error-message">{errors.quantity}</span>}
        </div>

        <div className="form-group">
          <label>Location:</label>
          <select
            name="location"
            value={product.location}
            onChange={handleChange}
            required
          >
            <option value="">Select Location</option>
            <option value="GF-C1-R1">GF-C1-R1</option>
            <option value="GF-C1-R2">GF-C1-R2</option>
            <option value="GF-C1-R3">GF-C1-R3</option>
            <option value="GF-C1-R4">GF-C1-R4</option>
            <option value="GF-C1-R5">GF-C1-R5</option>
            <option value="GF-C1-R6">GF-C1-R6</option>
            <option value="GF-C2-R1">GF-C2-R1</option>
            <option value="GF-C2-R2">GF-C2-R2</option>
            <option value="GF-C2-R3">GF-C2-R3</option>
            <option value="GF-C2-R4">GF-C2-R4</option>
            <option value="GF-C2-R5">GF-C2-R5</option>
            <option value="GF-C2-R6">GF-C2-R6</option>
            <option value="1F-C1-R2">1F-C1-R2</option>
          </select>
          {errors.location && <span className="error-message">{errors.location}</span>}
        </div>

        <div className="form-group">
          <label>Supplier:</label>
          <input
            type="text"
            name="supplier"
            value={product.supplier}
            onChange={handleChange}
            className={errors.supplier ? 'error' : ''}
            required
          />
          {errors.supplier && <span className="error-message">{errors.supplier}</span>}
        </div>

        <div className="form-group">
          <label>Expiry Date:</label>
          <input
            type="date"
            name="expiry_date"
            value={product.expiry_date}
            onChange={handleChange}
            className={errors.expiry_date ? 'error' : ''}
            required
          />
          {errors.expiry_date && <span className="error-message">{errors.expiry_date}</span>}
        </div>

        {/* Other form fields */}

        <button type="submit" className="submit-btn">Add Product</button>
      </form>

      <StockList 
        products={products} 
        onDecreaseQuantity={handleUpdateQuantity} 
      />
    </div>
  );
};

export default App;