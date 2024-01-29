import React, { useState } from 'react';

const Search = ({ products }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const searchProducts = (products, searchTerm) => {
    if (!searchTerm) {
      return products;
    }

    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    return products.filter((product) => {
      const lowerCaseName = product.name.toLowerCase();
      const lowerCaseDescription = product.description.toLowerCase();

      return (
        lowerCaseName.includes(lowerCaseSearchTerm) ||
        lowerCaseDescription.includes(lowerCaseSearchTerm)
      );
    });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    const filteredProducts = searchProducts(products, searchTerm);

    setFilteredProducts(filteredProducts);
  };

  return (
    <div>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button type="submit">Search</button>
      </form>
      <div>
        {filteredProducts.length === 0 ? (
          <p>No matching products found.</p>
        ) : (
          filteredProducts.map((product) => (
            <div key={product.id}>
              <h2>{product.name}</h2>
              <p>{product.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Search;
