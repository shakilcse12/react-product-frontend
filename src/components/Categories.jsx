import { useState, useEffect, useRef } from "react";
import { fetchCategories } from "../services/ProductService";

const Categories = () => {
  // Dummy data
  const dummyCategories = [
    {
      id: 1,
      name: "Electronics",
      image: "https://live.staticflickr.com/65535/52413593240_e00326e727_o.png",
    },
    {
      id: 2,
      name: "Books",
      image: "https://live.staticflickr.com/65535/52412638962_12e932256a_o.png",
    },
    {
      id: 3,
      name: "Furniture",
      image: "https://live.staticflickr.com/65535/52413665713_5977a693cb_o.png",
    },
    {
      id: 4,
      name: "Fashion",
      image: "https://coderstrustbd.com/wp-content/uploads/2021/06/dgm-n.jpg",
    },
    {
      id: 5,
      name: "Cars",
      image: "https://live.staticflickr.com/65535/52412638962_12e932256a_o.png",
    },
    {
      id: 6,
      name: "Mobile Phones",
      image: "https://live.staticflickr.com/65535/52413665713_5977a693cb_o.png",
    },
    {
      id: 7,
      name: "Fashion",
      image: "https://coderstrustbd.com/wp-content/uploads/2021/06/dgm-n.jpg",
    },
    {
      id: 8,
      name: "Cars",
      image: "https://live.staticflickr.com/65535/52412638962_12e932256a_o.png",
    },
    {
      id: 9,
      name: "Mobile Phones",
      image: "https://live.staticflickr.com/65535/52413665713_5977a693cb_o.png",
    },
  ];

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      //console.log("now will load categories data");
      try {
        const categoriesData = await fetchCategories();
        //console.log("loaded categories = ", categoriesData);
        setCategories(categoriesData);
      } catch (error) {
        console.error(error.message);
      }
    };
    loadData();
  }, []);

  const scrollRef = useRef(null);

  // Function to scroll the categories to the right
  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
  };

  // Function to scroll the categories to the left
  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
  };

  return (
    <div className="relative py-12 px-4 sm:px-8">
      <h2 className="text-3xl font-bold mb-6 text-center lg:mb-12">
        Product Categories
      </h2>
      <div className="flex items-center">
        {/* Left Arrow Button */}
        <button
          onClick={scrollLeft}
          className="p-2 bg-gray-200 rounded-full shadow-md hover:bg-gray-300 focus:outline-none absolute left-0"
        >
          <span>&lt;</span>
        </button>

        {/* Categories */}
        <div
          ref={scrollRef}
          className="flex space-x-6 overflow-x-scroll no-scrollbar w-full px-8"
        >
          {categories.map((category) => (
            <div
              key={category._id}
              className="flex-shrink-0 w-48 border p-4 rounded-lg shadow-lg text-center"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-24 h-24 object-cover mx-auto mb-4 rounded-full"
              />
              <h3 className="text-lg font-semibold">{category.name}</h3>
              <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                View Products
              </button>
            </div>
          ))}
        </div>

        {/* Right Arrow Button */}
        <button
          onClick={scrollRight}
          className="p-2 bg-gray-200 rounded-full shadow-md hover:bg-gray-300 focus:outline-none absolute right-0"
        >
          <span>&gt;</span>
        </button>
      </div>
    </div>
  );
};

export default Categories;
