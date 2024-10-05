import React, { useState, useEffect } from 'react';
import { ROUTES } from '../routes';
import { Link } from 'react-router-dom';

const ImageSection = () => {
  const [products, setProducts] = useState([]); 

  // Fetch products from an API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products'); 
        const data = await response.json();
        setProducts(data); 
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []); 


  // Function to truncate long descriptions
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  return (
    <section className="py-12 px-4 sm:px-8">
      <h2 className="text-2xl sm:text-3xl font-bold text-center">Our Products</h2>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center">
              {/* Image Section */}
              <div className="w-40 h-40 bg-gray-200 flex items-center justify-center rounded-lg overflow-hidden">
                <img
                  src={product.img_url || 'https://via.placeholder.com/150'}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Title */}
              <h3 className="mt-4 text-lg font-bold text-center">{product.title}</h3>

              {/* Truncated Description with Fixed Height */}
              <p className="mt-2 text-gray-600 text-center h-16">
                {truncateText(product.details || 'No description available', 60)}
              </p>
              
              {/* Button Section */}
              <Link to={ROUTES.SINGLE_PRODUCT.DYNAMIC(product._id)}>
              <button className="mt-auto px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                View Details
              </button>
              </Link>
            </div>
          ))
        ) : (
          <p className="text-center">Loading products...</p>
        )}
      </div>
    </section>
  );
};

export default ImageSection;