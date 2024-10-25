import React, { useState, useEffect } from 'react';
import { fetchUsers, fetchCategories, fetchProducts, toggleUserRole } from '../services/AdminService';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    const loadData = async () => {
      try {
        const usersData = await fetchUsers();
        setUsers(usersData);
        const categoriesData = await fetchCategories();
        setCategories(categoriesData);
        const productsData = await fetchProducts();
        setProducts(productsData);
      } catch (error) {
        console.error(error.message);
      }
    };

    loadData();
  }, []);

  const handleToggleRole = async (userId) => {
    try {
      const updatedUser = await toggleUserRole(userId);
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user._id === userId ? updatedUser : user))
      );
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-semibold mb-6">Admin Dashboard</h1>

        {/* Users Table */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">All Users</h2>
          <table className="min-w-full bg-white border rounded-md">
            <thead>
              <tr>
                <th className="py-2 px-4 border">Name</th>
                <th className="py-2 px-4 border">Role</th>
                <th className="py-2 px-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user._id}>
                  <td className="py-2 px-4 border">{user.name}</td>
                  <td className="py-2 px-4 border">{user.role}</td>
                  <td className="py-2 px-4 border">
                    <button className="bg-blue-500 text-white px-2 py-1 rounded" onClick={() => handleToggleRole(user._id)}>
                      Toggle Role
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Categories Table */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">All Categories</h2>
          <table className="min-w-full bg-white border rounded-md">
            <thead>
              <tr>
                <th className="py-2 px-4 border">Image</th>
                <th className="py-2 px-4 border">Category Name</th>
              </tr>
            </thead>
            <tbody>
              {categories.map(category => (
                <tr key={category._id}>
                  <td className="py-2 px-4 border">
                    <img src={category.image} alt={category.name} className="w-16 h-16 object-cover rounded" />
                  </td>
                  <td className="py-2 px-4 border">{category.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Products Table */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4">All Products</h2>
          <table className="min-w-full bg-white border rounded-md">
            <thead>
              <tr>
                <th className="py-2 px-4 border">Image</th>
                <th className="py-2 px-4 border">Product Name</th>
                <th className="py-2 px-4 border">Rating</th>
                <th className="py-2 px-4 border">Price</th>
                <th className="py-2 px-4 border">Category</th>
                <th className="py-2 px-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product._id}>
                  <td className="py-2 px-4 border">
                    <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded" />
                  </td>
                  <td className="py-2 px-4 border">{product.name}</td>
                  <td className="py-2 px-4 border">{product.rating}</td>
                  <td className="py-2 px-4 border">${product.price}</td>
                  <td className="py-2 px-4 border">{product.category?.name}</td>
                  <td className="py-2 px-4 border">
                    <button className="bg-green-500 text-white px-2 py-1 rounded">Edit</button>
                    <button className="bg-red-500 text-white px-2 py-1 rounded ml-2">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
