import React from 'react';

const ProductList = ({ products, deleteProduct }) => {
  const handleDelete = (index) => {
    deleteProduct(index);
  };

  return (
    <ul>
      {products.map((product, index) => (
        <li key={index}>
          {product.id} - {product.name} - ${product.price}
          <button onClick={() => handleDelete(index)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default ProductList;
