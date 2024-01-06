import React, { useState, useEffect } from 'react';

const ProductForm = () => {
  const [productId, setProductId] = useState('');
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Retrieve products from localStorage on component mount
    const storedProducts = JSON.parse(localStorage.getItem('products'));
    if (storedProducts) {
      setProducts(storedProducts);
    }
  }, []);

  const handleAddProduct = () => {
    if (productId && productName && productPrice) {
      const newProduct = {
        id: productId,
        name: productName,
        price: parseFloat(productPrice), // Convert price to float for accurate calculations
      };

      // Add new product to the existing products
      const updatedProducts = [...products, newProduct];
      setProducts(updatedProducts);

      // Store products in localStorage
      localStorage.setItem('products', JSON.stringify(updatedProducts));

      // Clear input fields
      setProductId('');
      setProductName('');
      setProductPrice('');
    } else {
      alert('Please fill all fields');
    }
  };

  const handleDeleteProduct = (index) => {
    // Create a copy of products array
    const updatedProducts = [...products];
    // Remove the product at the specified index
    updatedProducts.splice(index, 1);
    // Update state and localStorage with the updated products
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  const calculateTotalPrice = () => {
    if (products.length === 0) {
        return 0;
      } else {
        let totalPrice = 0;
        for (let i = 0; i < products.length; i++) {
          totalPrice += products[i].price;
        }
        return totalPrice;
      }
  };

  return (
    <div>
      <h2>Add Product</h2>
      <form>
      <div>
          <label htmlFor="productId">Product ID:</label>
          <input
            type="text"
            id="productId"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="productName">Product Name:</label>
          <input
            type="text"
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
        </div>
      
          <label htmlFor="productPrice">Product Price:</label>
          <input
            type="text"
            id="productPrice"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
          />
        <button type="button" onClick={handleAddProduct}>
          Add Product
        </button>
      </form>

      <h2>Products</h2>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            {product.id} - {product.name} - ${product.price}
            <button onClick={() => handleDeleteProduct(index)}>Delete</button>
          </li>
        ))}
      </ul>

      <h2>Total Price: ${calculateTotalPrice()}</h2>
    </div>
  );
};

export default ProductForm;
