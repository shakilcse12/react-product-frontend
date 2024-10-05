import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const CourseDetailsPage = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      const response = await fetch(`http://localhost:5000/api/products/${id}`);
      const fetchedCourse = await response.json();
      setCourse(fetchedCourse);
    };

    fetchCourse();
  }, [id]);

  if (!course) {
    return <div>Course not found!</div>;
  }

  const handleAddToCart = () => {
    Swal.fire({
      title: 'Added to Cart!',
      text: `${course.title} has been successfully added to the Cart`,
      icon: 'success',
      confirmButtonText: 'OK',
    });
  };

  const handleWishToRead = () => {
    Swal.fire({
      title: 'Added to Wishlist!',
      text: `${course.title} has been successfully added to the Wishlist`,
      icon: 'success',
      confirmButtonText: 'OK',
    });
  };

  return (
    <div className="container mx-auto p-8 rounded-lg">
      <div className="flex flex-col lg:flex-row bg-white rounded-lg shadow-md overflow-hidden">

        {/* Author Section */}
        <div className="flex flex-col items-center justify-center bg-gray-100 p-6 lg:w-1/3">
          <div className="flex justify-center mb-4">
            <img 
              src={course.author_img_url} 
              alt={course.author} 
              className="rounded-full w-32 h-32 object-cover border-4 border-blue-500"
            />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-center">{course.author}</h2>
          <p className="text-gray-600 text-center">Instructor</p>
          <p className="text-gray-600 text-center mt-2"><strong>Level:</strong> {course.level}</p>
          <p className="text-gray-600 text-center"><strong>Ratings:</strong> {course.ratings}</p>
        </div>

        {/* Course Details */}
        <div className="flex-grow p-6 lg:w-2/3">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">{course.title}</h1>
          <p className="text-lg sm:text-xl mb-4">{course.details}</p>
          <p className="text-base sm:text-lg mb-2"><strong>Lessons:</strong> {course.lession}</p>
          <p className="text-base sm:text-lg mb-2"><strong>Students:</strong> {course.student}</p>
          <p className="text-base sm:text-lg mb-2"><strong>Duration:</strong> {course.duration}</p>
          <p className="text-base sm:text-lg mb-2"><strong>Assessments:</strong> {course.assessments}</p>
          <p className="text-base sm:text-lg mb-2"><strong>Price:</strong> ${course.price}</p>

          {/* Buttons */}
          <div className="flex space-x-4 mt-6">
            <button 
              onClick={handleWishToRead} 
              className="px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300">
              Add to Wishlist
            </button>
            <button 
              onClick={handleAddToCart} 
              className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300">
              Add to Cart
            </button>
          </div>
        </div>

        {/* Course Image
        <div className="w-full lg:w-1/3">
          <img src={course.img_url} alt={course.title} className="w-full h-auto object-cover hidden lg:block" />
        </div> */}
      </div>
    </div>
  );
};

export default CourseDetailsPage;
