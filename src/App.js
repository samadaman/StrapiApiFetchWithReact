import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductList from './component/productList';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="App">
      <h1>My E-Commerce Site</h1>
      <ProductList products={products} />
    </div>
  );
}

export default App;
