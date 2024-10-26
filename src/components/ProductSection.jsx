import React, { useState, useEffect } from 'react';
import { PRODUCT_API } from '../API/Product';

// Sample Placeholder Images
const sampleProducts = [
  {
    _id: '1',
    name: 'Complete ReactJs',
    Image: 'https://live.staticflickr.com/65535/52413593240_e00326e727_o.png',
    details: 'This is a sample product description.',
  },
  {
    _id: '2',
    name: 'Javascript Pro',
    Image: 'https://live.staticflickr.com/65535/52412638962_12e932256a_o.png',
    details: 'This is a sample product description.',
  },
  {
    _id: '3',
    name: 'Web Design and Development',
    Image: 'https://live.staticflickr.com/65535/52413665713_5977a693cb_o.png',
    details: 'This is a sample product description.',
  },
  {
    _id: '4',
    name: 'Digital Marketing',
    Image: 'https://coderstrustbd.com/wp-content/uploads/2021/06/dgm-n.jpg',
    details: 'This is a sample product description.',
  },
];

const ImageSection = () => {
  const [products, setProducts] = useState([]);

  // Fetch products from an API or use sample products if no data is fetched
  useEffect(() => {
    const fetchProducts = async () => {
      if (products.length > 0) return;
      try {
        const response = await fetch(PRODUCT_API.PRODUCTS);
        const data = await response.json();
        setProducts(data);
        console.log("product section data = ", data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts(sampleProducts); // Use sample products if fetching fails
      }
    };
    fetchProducts();
  }, []);

  // Truncate long descriptions
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  };

  // Only display a few products (limit to 4)
  const displayedProducts = products.slice(0, 4);

  return (
    <section className="py-12 px-4 sm:px-8">
      <h2 className="text-2xl sm:text-3xl font-bold text-center">Our Products</h2>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {displayedProducts.length > 0 ? (
          displayedProducts.map((product) => (
            <div key={product._id} className="bg-white shadow-lg rounded-lg p-4 flex flex-col items-center">
              {/* Image Section */}
              <div className="w-40 h-40 bg-gray-200 flex items-center justify-center rounded-lg overflow-hidden">
                <img
                  src={product.image || 'https://via.placeholder.com/150'}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Title */}
              <h3 className="mt-4 text-lg font-bold text-center">{product.name}</h3>

              {/* Truncated Description with Fixed Height */}
              <p className="mt-2 text-gray-600 text-center h-16">
                {truncateText(product.details || 'No description available', 60)}
              </p>
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
