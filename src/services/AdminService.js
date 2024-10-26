
import axios from 'axios';

const API_URL = 'https://my-course-backend-green.vercel.app/admin'; 

export const fetchUsers = async () => {
  const response = await fetch(`${API_URL}/users`);
  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }
  return await response.json();
};

export const fetchCategories = async () => {
  const response = await fetch(`${API_URL}/categories`);
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }
  return await response.json();
};

export const fetchProducts = async () => {
  const response = await fetch(`${API_URL}/products`);
  console.log(response.data);
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  return await response.json();
};

// Function to toggle user role
export const toggleUserRole = async (userId) => {
  const response = await fetch(`${API_URL}/users/${userId}/role`, {
    method: 'PATCH',
  });
  if (!response.ok) {
    throw new Error('Failed to toggle user role');
  }
  return await response.json(); // Return updated user data if needed
};

export const addCategory = async (category) => {
    const response = await axios.post(`${API_URL}/categories`, category);
    console.log(response.data);
    return response.data;
  };
  
  export const editUserDetails = async (userId, updatedDetails) => {
    const response = await axios.patch(`${API_URL}/user/${userId}`, updatedDetails);
    return response.data;
  };

  // Add a new product
export const addProduct = async (productData) => {
  console.log("product data = ", productData);
    const response = await axios.post(`${API_URL}/products`, productData);
    return response.data;
};

// Edit a product
export const editProduct = async (productId, updatedData) => {
    const response = await axios.put(`${API_URL}/products/${productId}`, updatedData);
    console.log(response.data);
    return response.data;
};

// Delete a product
export const deleteProduct = async (productId) => {
    const response = await axios.delete(`${API_URL}/products/${productId}`);
    return response.data;
};


  
  