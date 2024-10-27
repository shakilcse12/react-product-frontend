import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { fetchCourseDetails } from "../services/ProductService";
import { useAuth } from "../context/AuthContext";
import { PRODUCT_API } from "../API/Product";
import { getProductDetailsWithPurchaseStatus } from "../services/ProductService";

const CourseDetailsPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [course, setCourse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBought, setIsBought] = useState(false);

  const [purchaseData, setPurchaseData] = useState({
    userName: user?.userName || '',
    email: user?.email || '',
    phone: user?.phoneNumber || '',
    address: '',
    emergencyContact: '',
    userId: user?.userId,
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        console.log("suer id from details = ", user?.userId);
        const resp = await getProductDetailsWithPurchaseStatus(id, user.userId);
        setCourse(resp.product);
        setIsBought(resp.isBought);
      } catch (error) {
        console.error(error.message);
      }
    };
    loadData();
  }, [id]);

  const handleBuyNow = () => {
    if(isBought) { return; }
    console.log("user data from courseDetails page = ", user);
    setIsModalOpen(true); // Open the modal
  };

  const handleModalChange = (e) => {
    const { name, value } = e.target;
    setPurchaseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePurchase = async () => {
    try {
      console.log("purchase data = ", purchaseData);
      const response = await fetch(PRODUCT_API.PURCHASE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...purchaseData,
          courseId: id,
        }),
      });

      if (response.ok) {
        setIsBought(true);
        Swal.fire({
          title: "Purchase Successful!",
          text: `You have successfully bought the course: ${course.name}`,
          icon: "success",
          confirmButtonText: "OK",
        });
        setIsModalOpen(false); // Close modal on success
      } else {
        Swal.fire({
          title: "Error",
          text: "There was an issue with your purchase. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Purchase Error:", error);
    }
  };

  if (!course) {
    return <div>Course not found!</div>;
  }

  const handleWishToRead = () => {
    Swal.fire({
      title: "Added to Wishlist!",
      text: `${course.name} has been successfully added to the Wishlist`,
      icon: "success",
      confirmButtonText: "OK",
    });
  };

  return (
    <div className="container mx-auto p-8 rounded-lg">
      <div className="flex flex-col lg:flex-row bg-white rounded-lg shadow-md overflow-hidden">
        {/* Author Section */}
        <div className="flex flex-col items-center justify-center bg-gray-100 p-6 lg:w-1/3">
          <div className="flex justify-center mb-4">
            <img
              src={course.image}
              alt={course?.author}
              className="w-32 h-32 object-cover border-4 border-blue-500"
            />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-center">
            {course.author}
          </h2>
          <p className="text-gray-600 text-center"></p>
          <p className="text-gray-600 text-center mt-2">
            <strong>Level:</strong> {course.level? course.level : "Beginner"}
          </p>
          <p className="text-gray-600 text-center">
            <strong>Ratings:</strong> {course.rating}
          </p>
        </div>

        {/* Course Details */}
        <div className="flex-grow p-6 lg:w-2/3">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">
            {course.name}
          </h1>
          <p className="text-lg sm:text-xl mb-4">{course.details? course.details : "This is an awesome course"}</p>
          <p className="text-base sm:text-lg mb-2">
            <strong>Lessons:</strong> {course.name}
          </p>
          <p className="text-base sm:text-lg mb-2">
            <strong>Students:</strong> {course.student? course.student : 25}
          </p>
          <p className="text-base sm:text-lg mb-2">
            <strong>Duration:</strong> {course.duration ? course.duration : "40 days"}
          </p>
          <p className="text-base sm:text-lg mb-2">
            <strong>Assessments:</strong> {course.assessments ? course.assessments : "Detailed assessment"}
          </p>
          <p className="text-base sm:text-lg mb-2">
            <strong>Price:</strong> ${course.price}
          </p>

          {/* Buttons */}
          <div className="flex space-x-4 mt-6">
            <button
              onClick={handleWishToRead}
              className="px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300"
            >
              Add to Wishlist
            </button>
            <button
              onClick={handleBuyNow}
              disabled={isBought}
              className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
            >
              {isBought ? "You have bought this" : "Buy Now"}
            </button>
          </div>
        </div>

         {/* Modal for Purchase */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Purchase Course</h2>
            <form>
              <label className="block mb-2">
                Name:
                <input
                  type="text"
                  name="name"
                  value={purchaseData.userName}
                  onChange={handleModalChange}
                  className="w-full p-2 mt-1 border rounded"
                />
              </label>
              <label className="block mb-2">
                Email:
                <input
                  type="email"
                  name="email"
                  value={purchaseData.email}
                  onChange={handleModalChange}
                  className="w-full p-2 mt-1 border rounded"
                />
              </label>
              <label className="block mb-2">
                Phone:
                <input
                  type="tel"
                  name="phone"
                  value={purchaseData.phone}
                  onChange={handleModalChange}
                  className="w-full p-2 mt-1 border rounded"
                />
              </label>
              <label className="block mb-2">
                Address:
                <input
                  type="text"
                  name="address"
                  value={purchaseData.address}
                  onChange={handleModalChange}
                  className="w-full p-2 mt-1 border rounded"
                />
              </label>
              <label className="block mb-4">
                Emergency Contact:
                <input
                  type="tel"
                  name="emergencyContact"
                  value={purchaseData.emergencyContact}
                  onChange={handleModalChange}
                  className="w-full p-2 mt-1 border rounded"
                />
              </label>
              <button
                type="button"
                onClick={handlePurchase}
                className="w-full py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Confirm Purchase
              </button>
            </form>
            <button
              onClick={() => setIsModalOpen(false)}
              className="w-full py-2 mt-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

        {/* Course Image
        <div className="w-full lg:w-1/3">
          <img src={course.img_url} alt={course.title} className="w-full h-auto object-cover hidden lg:block" />
        </div> */}
      </div>
    </div>
  );
};

export default CourseDetailsPage;
