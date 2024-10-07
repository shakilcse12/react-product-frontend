import { FaShoppingCart, FaListAlt, FaSmile } from 'react-icons/fa';

const HowItWorks = () => {
  return (
    <section className="py-16 px-4 sm:px-8 bg-gray-100">
      <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800">How It Works</h2>
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Step 1 - Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center hover:shadow-xl transition-shadow duration-300">
          <div className="flex justify-center items-center mb-4 bg-blue-100 p-4 rounded-full">
            <FaListAlt className="text-blue-500 text-4xl" />
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-700">1. Browse Our Products</h3>
          <p className="mt-2 text-sm sm:text-base text-gray-600 text-center">
            Explore our wide range of products from various categories.
          </p>
        </div>

        {/* Step 2 - Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center hover:shadow-xl transition-shadow duration-300">
          <div className="flex justify-center items-center mb-4 bg-green-100 p-4 rounded-full">
            <FaShoppingCart className="text-green-500 text-4xl" />
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-700">2. Add to Cart</h3>
          <p className="mt-2 text-sm sm:text-base text-gray-600 text-center">
            Easily add your favorite products to the cart with one click.
          </p>
        </div>

        {/* Step 3 - Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center hover:shadow-xl transition-shadow duration-300">
          <div className="flex justify-center items-center mb-4 bg-yellow-100 p-4 rounded-full">
            <FaSmile className="text-yellow-500 text-4xl" />
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-700">3. Checkout & Enjoy</h3>
          <p className="mt-2 text-sm sm:text-base text-gray-600 text-center">
            Complete the checkout process and enjoy your products.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
