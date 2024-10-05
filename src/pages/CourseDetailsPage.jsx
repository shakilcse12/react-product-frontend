import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const CourseDetailsPage = () => {
  const { id } = useParams();  // getting the dynamic course id from the URL
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await fetch(`http://localhost:5000/api/products/${id}`);  // Assuming this is your JSON file with course data
      const courses = await response.json();
      const foundCourse = courses;
      setCourse(foundCourse);
    };

    fetchCourses();
  }, [id]);

  if (!course) {
    return <div>Course not found!</div>;
  }

  const handleWishToRead = () => {
    Swal.fire({
      title: 'Added to Wishlist!',
      text: `${course.title} has been successfully added to the Wishlist`,
      icon: 'success',
      confirmButtonText: 'OK',
    });
  };
  
  const handleAddToCart = () => {
    Swal.fire({
      title: 'Added to Cart!',
      text: `${course.title} has been successfully added to the Cart`,
      icon: 'success',
      confirmButtonText: 'OK',
    });
  };

  return (
    <div className="container mx-auto p-8">
      <div className="flex flex-col lg:flex-row bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Image section */}
        <img src={course.img_url} alt={course.title} className="w-full lg:w-1/2 object-cover" />
        
        {/* Details section */}
        <div className="lg:ml-8 p-6">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">{course.title}</h1>
          
          <div className="flex items-center mt-4 py-5">
            <img src={course.author_img_url} alt={course.author} className="w-12 h-12 rounded-full mr-4" />
            <p className="text-lg font-semibold">{course.author}</p>
          </div>
          <p className="text-lg text-gray-700 mb-2"><strong>Level:</strong> {course.level}</p>
          <p className="text-lg text-gray-700 mb-2"><strong>Ratings:</strong> {course.ratings}</p>
          <p className="text-lg text-gray-700 mb-2"><strong>Lessons:</strong> {course.lession}</p>
          <p className="text-lg text-gray-700 mb-2"><strong>Duration:</strong> {course.duration}</p>
          <p className="text-lg text-gray-700 mb-2"><strong>Price:</strong> {course.price} BDT</p>
          <p className="text-lg text-gray-700 mb-4"><strong>Details:</strong> {course.details}</p>

          {/* Action Buttons */}
          <div className="flex space-x-4 mt-6">
            <button onClick={handleWishToRead} className="px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300">
              Wish to Read
            </button>
            <button onClick={handleAddToCart} className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailsPage;
