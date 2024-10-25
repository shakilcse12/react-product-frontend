// services/adminService.js
// export const fetchUsers = async () => {
//     const res = await fetch('https://my-course-backend-green.vercel.app/users');
//     return res.json();
//   };
  
//   export const fetchCategories = async () => {
//     const res = await fetch('https://my-course-backend-green.vercel.app/admin/categories');
//     return res.json();
//   };
  
//   export const fetchProducts = async () => {
//     const res = await fetch('https://my-course-backend-green.vercel.app/admin/products');
//     return res.json();
//   };

// services/AdminService.js
const API_URL = 'https://my-course-backend-green.vercel.app/admin'; // Replace with your actual API URL

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


  
  