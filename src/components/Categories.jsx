import { useState, useEffect, useRef } from "react";
import { fetchCategories } from "../services/ProductService";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const categoriesData = await fetchCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error(error.message);
      }
    };
    loadData();
  }, []);

  const scrollRef = useRef(null);

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
  };

  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
  };

  return (
    <div className="relative py-12 px-4 sm:px-8 bg-gray-100">
      <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">
        Product Categories
      </h2>
      <div className="flex items-center">
        <button
          onClick={scrollLeft}
          className="p-2 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 focus:outline-none absolute left-0"
        >
          <span className="text-2xl">&lt;</span>
        </button>

        <div
          ref={scrollRef}
          className="flex space-x-6 overflow-x-scroll no-scrollbar w-full px-4 md:px-8"
        >
          {categories.map((category) => (
            <div
              key={category._id}
              className="flex-shrink-0 w-56 bg-white border border-gray-300 p-6 rounded-lg shadow-lg text-center transform transition-transform duration-300 hover:scale-105"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-24 h-24 object-cover mx-auto mb-4 rounded-full border-4 border-blue-500"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{category.name}</h3>
              <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition">
                View Products
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={scrollRight}
          className="p-2 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 focus:outline-none absolute right-0"
        >
          <span className="text-2xl">&gt;</span>
        </button>
      </div>
    </div>
  );
};

export default Categories;
