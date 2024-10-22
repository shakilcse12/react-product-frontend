const ProductHighlights = () => {
    // Dummy data for featured products/best sellers/offers
    const featuredProducts = [
      {
        id: 1,
        title: "Web Development Mastery",
        description: "Become a professional web developer by mastering modern technologies like HTML, CSS, JavaScript, and React.",
        image: "https://via.placeholder.com/300",
        offer: "20% off",
        feature: "Best Seller",
      },
      {
        id: 2,
        title: "Complete Flutter Bootcamp",
        description: "Build stunning mobile apps for Android and iOS using Flutter and Dart.",
        image: "https://via.placeholder.com/300",
        offer: "Limited Time Offer",
        feature: "Top Rated",
      },
      {
        id: 3,
        title: "Mastering JavaScript",
        description: "Deep dive into JavaScript with advanced topics such as ES6, asynchronous programming, and performance optimization.",
        image: "https://via.placeholder.com/300",
        offer: "15% off",
        feature: "Best Value",
      },
    ];
  
    return (
      <div className="p-6 container mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">Featured Courses & Offers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProducts.map(product => (
            <div key={product.id} className="relative bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 ease-in-out">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{product.title}</h3>
                <p className="text-sm text-gray-600 mt-2">{product.description}</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-bold">
                    {product.feature}
                  </span>
                  <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-200 ease-in-out">
                    Explore Now
                  </button>
                </div>
              </div>
              {product.offer && (
                <div className="absolute top-0 right-0 bg-red-500 text-white px-3 py-1 text-xs font-bold rounded-bl-lg">
                  {product.offer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default ProductHighlights;
  