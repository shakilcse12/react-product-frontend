import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import LogoutButton from './LogoutButton';

// Modal Component
const EditProfileModal = ({ isOpen, onClose, user, onSave }) => {
  const [profileData, setProfileData] = useState({
    userName: user.userName,
    phone: user.phone,
    address: user.address,
    profilePicture: user.profilePicture,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(profileData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Profile Picture URL:</label>
            <input
              type="text"
              name="profilePicture"
              value={profileData.profilePicture}
              onChange={handleChange}
              className="border rounded p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Name:</label>
            <input
              type="text"
              name="userName"
              value={profileData.userName}
              onChange={handleChange}
              className="border rounded p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Phone:</label>
            <input
              type="text"
              name="phone"
              value={profileData.phone}
              onChange={handleChange}
              className="border rounded p-2 w-full"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Address:</label>
            <input
              type="text"
              name="address"
              value={profileData.address}
              onChange={handleChange}
              className="border rounded p-2 w-full"
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg">
            Save
          </button>
          <button type="button" onClick={onClose} className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg ml-2">
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

const UserDashboardPage = () => {
  const { user, logout } = useAuth(); 
  const navigate = useNavigate();
  const [purchases, setPurchases] = useState([]);
  const [totalAmountSpent, setTotalAmountSpent] = useState(0);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    const fetchPurchases = async () => {
      if (!user) return; // Check if user is not available

      try {
        const api = `https://my-course-backend-green.vercel.app/purchases/${user.userId}`;
        const response = await fetch(api);
        const data = await response.json();

        if (response.ok) {
          setPurchases(data);
          const total = data.reduce((sum, purchase) => sum + (Number(purchase.productPrice) || 0), 0);
          setTotalAmountSpent(total);
        } else {
            console.log("response = ", data);
          toast.error('Failed to fetch purchases');
        }
      } catch (error) {
        console.error('Error fetching purchases:', error);
        //toast.error('Failed to fetch purchases');
      }
    };

    fetchPurchases();
  }, [user]); // Depend on user

  const handleSaveProfile = async (updatedData) => {
    try {
        console.log("form data = ", updatedData);
      const response = await fetch(`https://my-course-backend-green.vercel.app/users/${user.userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        toast.success('Profile updated successfully!');
      } else {
        toast.error('Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    }
  };

  if (!user) {
    return <div>Loading...</div>; // Or redirect to login page
  }

  return (
    <div className="container mx-auto py-8 px-8 lg:px-16">
      <h1 className="text-3xl text-center font-bold mb-6">User Dashboard</h1>

      {/* Buttons moved to the top right corner */}
      <div className="flex space-x-2 mb-4 items-center justify-between">
        <button
          onClick={() => setIsEditModalOpen(true)}
          className="bg-yellow-500 text-white py-2 px-4 rounded-lg"
        >
          Edit Profile
        </button>
        <LogoutButton />
      </div>

      {/* Total Amount Spent */}
      <div className="bg-gray-200 p-4 rounded-lg mb-4">
        <p className="text-lg font-semibold">
          Total Amount Spent: ${totalAmountSpent.toFixed(2)}
        </p>
      </div>

      {/* Purchased Products */}
      <div className="grid gap-4">
        {purchases.length > 0 ? (
          purchases.map((purchase) => (
            <div
              key={purchase._id}
              className="bg-white p-6 rounded-lg shadow-md flex justify-between items-center"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={purchase.productImage}
                  alt={purchase.productName}
                  className="w-16 h-16 rounded"
                />
                <div>
                  <h2 className="text-2xl font-bold">{purchase.productName}</h2>
                  <p className="text-gray-600">Price: ${purchase.productPrice}</p>
                  <p className="text-gray-600">Rating: {purchase.productRating}</p>
                  <p className="text-gray-600">
                    Purchase Date: {new Date(purchase.purchaseDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <button className="bg-blue-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-600 transition">
                Payment
              </button>
            </div>
          ))
        ) : (
          <p>No purchases found.</p>
        )}
      </div>

      {/* Edit Profile Modal */}
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        user={user}
        onSave={handleSaveProfile}
      />
    </div>
  );
};

export default UserDashboardPage;
