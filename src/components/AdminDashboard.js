import React, { useState, useEffect } from 'react';
import {
    fetchUsers, fetchCategories, fetchProducts, toggleUserRole, addCategory, editUserDetails,
    addProduct, editProduct, deleteProduct
} from '../services/AdminService';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [newCategory, setNewCategory] = useState({ name: '', image: '' });
    const [editUser, setEditUser] = useState(null);
    const [editForm, setEditForm] = useState({ name: '', phoneNumber: '', address: '', profilePicture: '', role: '', email: '' });

    const [newProduct, setNewProduct] = useState({ name: '', image: '', rating: '', price: '', category: '' });
    const [editProductDetails, setEditProductDetails] = useState(null);
    const [showProductModal, setShowProductModal] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            try {
                const usersData = await fetchUsers();
                setUsers(usersData);
                const categoriesData = await fetchCategories();
                setCategories(categoriesData);
                const productsData = await fetchProducts();
                setProducts(productsData);
                const updatedProducts = productsData.map(product => {
                    // Find the corresponding category object for the product's category ID
                    const categoryObject = categoriesData.find(category => category._id === product.category);
                
                    // If a match is found, replace the category ID with the category object
                    return {
                        ...product,
                        category: categoryObject || product.category // Ensure category remains if no match
                    };
                });
                
                setProducts(updatedProducts);
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

    const handleAddCategory = async () => {
        try {
            const response = await addCategory(newCategory);

            if (response.insertedId) {
                const newCatWithId = { ...newCategory, _id: response.insertedId }; // Add the new ID
                setCategories(prevCategories => [...prevCategories, newCatWithId]); // Update the categories list
                setShowCategoryModal(false); // Close the modal
                setNewCategory({ name: '', image: '' });
            }
        } catch (error) {
            console.error("Failed to add category:", error.message);
        }
    };


    // Functions to handle API calls for product actions
    const handleAddProduct = async () => {
        try {
            const response = await addProduct(newProduct);
            if (response.insertedId) {
                const newProdWithId = { ...newProduct, _id: response.insertedId };
                setProducts((prevProducts) => [...prevProducts, newProdWithId]);
                setShowProductModal(false);
                setNewProduct({ name: '', image: '', rating: '', price: '', category: '' });
            }
        } catch (error) {
            console.error("Failed to add product:", error.message);
        }
    };

    const handleEditProduct2 = async (productId, updatedDetails) => {
        // Destructure and remove `_id` from the object to prevent update on the `_id` field
        const { _id, ...detailsToUpdate } = updatedDetails;
      
        try {
          const updatedProduct = await editProduct(productId, detailsToUpdate);
          setProducts(prevProducts =>
            prevProducts.map(product => (product._id === productId ? updatedProduct : product))
          );
          setEditProductDetails(null);
        } catch (error) {
          console.error("Failed to edit product:", error.message);
        }
      };

      const handleEditProduct = async (productId, updatedProduct) => {
        try {
            const { _id, ...productData } = updatedProduct;
    
            // Make the API call to update the product on the server
            const response = await editProduct(productId, productData); 
    
            if (response && response.product) {
                // Update the products array with the full product details
                setProducts((prevProducts) =>
                    prevProducts.map((product) =>
                        product._id === productId ? { ...product, ...response.product } : product
                    )
                );
            } else {
                console.warn("Response did not include updated product details.");
            }
    
            setEditProductDetails(null); // Close the edit modal
        } catch (error) {
            console.error("Failed to update product:", error.message);
        }
    };
    
    
      

    const openEditProductModal = (product) => {
        setEditProductDetails(product);
    };

    const handleEditProductChange = (e) => {
        const { name, value } = e.target;
        setEditProductDetails(prev => ({ ...prev, [name]: value }));
    };

    const handleUpdateProduct = () => {
        if (editProductDetails) {
            handleEditProduct(editProductDetails._id, editProductDetails);
        }
    };


    const handleDeleteProduct = async (productId) => {
        try {
            await deleteProduct(productId);
            setProducts((prevProducts) => prevProducts.filter((product) => product._id !== productId));
        } catch (error) {
            console.error("Failed to delete product:", error.message);
        }
    };

    const handleEditUser = async (userId, updatedDetails) => {
        try {
            const updatedUserResponse = await editUserDetails(userId, updatedDetails);

            // Find the original user and merge fields to ensure no undefined properties
            const originalUser = users.find((user) => user._id === userId) || {};
            const updatedUser = { ...originalUser, ...updatedUserResponse.user };

            setUsers((prevUsers) =>
                prevUsers.map((user) => (user._id === userId ? updatedUser : user))
            );

            setEditUser(null); // Close the modal
        } catch (error) {
            console.error(error.message);
        }
    };



    const openEditModal = (user) => {
        setEditUser(user);
        setEditForm({
            name: user.name || '',
            phoneNumber: user.phoneNumber || '',
            address: user.address || '',
            profilePicture: user.profilePicture || '',
            role: user.role || '',
            email: user.email || ''
        });
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleUpdate = () => {
        handleEditUser(editUser._id, editForm);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <div className="container mx-auto px-8 lg:px-16 xl:px-32 py-8 sm:p-8">
                <h1 className="text-4xl font-semibold text-center text-gray-800 mb-8">Admin Dashboard</h1>

                {/* Users Table */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">All Users</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-200 text-gray-700">
                                    <th className="py-3 px-5">Name</th>
                                    <th className="py-3 px-5">Email</th>
                                    <th className="py-3 px-5">Role</th>
                                    <th className="py-3 px-5">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-600">
                                {users.map(user => (
                                    <tr key={user._id} className="hover:bg-gray-100">
                                        <td className="py-3 px-5 border-t">{user.name}</td>
                                        <td className="py-3 px-5 border-t">{user.email}</td>
                                        <td className="py-3 px-5 border-t">{user.role}</td>
                                        <td className="py-3 px-5 border-t flex gap-2">
                                            <button
                                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded shadow-sm transition"
                                                onClick={() => handleToggleRole(user._id)}
                                            >
                                                Toggle Role
                                            </button>
                                            <button
                                                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded shadow-sm transition"
                                                onClick={() => openEditModal(user)}
                                            >
                                                Edit
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Edit User Modal */}
                {editUser && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white w-96 p-6 rounded-lg shadow-lg">
                            <h2 className="text-lg font-semibold mb-4">Edit User</h2>

                            {/* Editable Fields */}
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                className="border p-2 mb-4 w-full focus:ring-2 focus:ring-blue-500 rounded"
                                value={editForm.name}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                name="phoneNumber"
                                placeholder="Phone Number"
                                className="border p-2 mb-4 w-full focus:ring-2 focus:ring-blue-500 rounded"
                                value={editForm.phoneNumber}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                name="address"
                                placeholder="Address"
                                className="border p-2 mb-4 w-full focus:ring-2 focus:ring-blue-500 rounded"
                                value={editForm.address}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                name="profilePicture"
                                placeholder="Profile Picture URL"
                                className="border p-2 mb-4 w-full focus:ring-2 focus:ring-blue-500 rounded"
                                value={editForm.profilePicture}
                                onChange={handleChange}
                            />

                            {/* Non-Editable Fields */}
                            <input
                                type="text"
                                name="role"
                                placeholder="Role"
                                className="border p-2 mb-4 w-full bg-gray-100 cursor-not-allowed"
                                value={editForm.role}
                                disabled
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                className="border p-2 mb-4 w-full bg-gray-100 cursor-not-allowed"
                                value={editForm.email}
                                disabled
                            />

                            <div className="flex justify-end gap-4">
                                <button
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition"
                                    onClick={handleUpdate}
                                >
                                    Update
                                </button>
                                <button
                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
                                    onClick={() => setEditUser(null)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}


                {/* Categories Table */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-semibold text-gray-700">All Categories</h2>
                        <button
                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow-sm transition"
                            onClick={() => setShowCategoryModal(true)}
                        >
                            Add New Category
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-200 text-gray-700">
                                    <th className="py-3 px-5">Image</th>
                                    <th className="py-3 px-5">Category Name</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-600">
                                {categories.map(category => (
                                    <tr key={category._id} className="hover:bg-gray-100">
                                        <td className="py-3 px-5 border-t">
                                            <img src={category.image} alt={category.name} className="w-16 h-16 rounded object-cover" />
                                        </td>
                                        <td className="py-3 px-5 border-t">{category.name}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Products Table */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-semibold text-gray-700">All Products</h2>
                        <button
                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow-sm transition"
                            onClick={() => setShowProductModal(true)}
                        >
                            Add New Product
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-200 text-gray-700">
                                    <th className="py-3 px-5">Image</th>
                                    <th className="py-3 px-5">Product Name</th>
                                    <th className="py-3 px-5">Rating</th>
                                    <th className="py-3 px-5">Price</th>
                                    <th className="py-3 px-5">Category</th>
                                    <th className="py-3 px-5">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-600">
                                {products.map(product => (
                                    <tr key={product._id} className="hover:bg-gray-100">
                                        <td className="py-3 px-5 border-t">
                                            <img src={product.image} alt={product.name} className="w-16 h-16 rounded object-cover" />
                                        </td>
                                        <td className="py-3 px-5 border-t">{product.name}</td>
                                        <td className="py-3 px-5 border-t">{product.rating}</td>
                                        <td className="py-3 px-5 border-t">${product.price}</td>
                                        <td className="py-3 px-5 border-t">{product.category?.name || product.category || 'N/A'}</td>
                                        <td className="py-3 px-5 border-t flex items-center gap-2">
                                            <button
                                                className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded shadow-sm transition"
                                                onClick={() => openEditProductModal(product)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded shadow-sm transition"
                                                onClick={() => handleDeleteProduct(product._id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Add Product Modal */}
                {showProductModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white w-96 p-6 rounded-lg shadow-lg">
                            <h2 className="text-lg font-semibold mb-4">Add New Product</h2>
                            <input
                                type="text"
                                placeholder="Product Name"
                                className="border p-2 mb-4 w-full focus:ring-2 focus:ring-blue-500 rounded"
                                value={newProduct.name}
                                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Image URL"
                                className="border p-2 mb-4 w-full focus:ring-2 focus:ring-blue-500 rounded"
                                value={newProduct.image}
                                onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                            />
                            <input
                                type="number"
                                placeholder="Rating"
                                className="border p-2 mb-4 w-full focus:ring-2 focus:ring-blue-500 rounded"
                                value={newProduct.rating}
                                onChange={(e) => setNewProduct({ ...newProduct, rating: e.target.value })}
                            />
                            <input
                                type="number"
                                placeholder="Price"
                                className="border p-2 mb-4 w-full focus:ring-2 focus:ring-blue-500 rounded"
                                value={newProduct.price}
                                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                            />
                            <select
                                className="border p-2 mb-4 w-full focus:ring-2 focus:ring-blue-500 rounded"
                                value={newProduct.category}
                                onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                            >
                                <option value="">Select Category</option>
                                {categories.map(category => (
                                    <option key={category._id} value={category._id}>{category.name}</option>
                                ))}
                            </select>
                            <div className="flex justify-end gap-4">
                                <button
                                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition"
                                    onClick={handleAddProduct}
                                >
                                    Add Product
                                </button>
                                <button
                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
                                    onClick={() => setShowProductModal(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Edit Product Modal */}
                {editProductDetails && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white w-96 p-6 rounded-lg shadow-lg">
                            <h2 className="text-lg font-semibold mb-4">Edit Product</h2>
                            <input
                                type="text"
                                name="name"
                                placeholder="Product Name"
                                className="border p-2 mb-4 w-full focus:ring-2 focus:ring-blue-500 rounded"
                                value={editProductDetails.name}
                                onChange={handleEditProductChange}
                            />
                            <input
                                type="text"
                                name="image"
                                placeholder="Image URL"
                                className="border p-2 mb-4 w-full focus:ring-2 focus:ring-blue-500 rounded"
                                value={editProductDetails.image}
                                onChange={handleEditProductChange}
                            />
                            <input
                                type="text"
                                name="rating"
                                placeholder="Rating"
                                className="border p-2 mb-4 w-full focus:ring-2 focus:ring-blue-500 rounded"
                                value={editProductDetails.rating}
                                onChange={handleEditProductChange}
                            />
                            <input
                                type="text"
                                name="price"
                                placeholder="Price"
                                className="border p-2 mb-4 w-full focus:ring-2 focus:ring-blue-500 rounded"
                                value={editProductDetails.price}
                                onChange={handleEditProductChange}
                            />
                            <div className="flex justify-end gap-4">
                                <button
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition"
                                    onClick={handleUpdateProduct}
                                >
                                    Update Product
                                </button>
                                <button
                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
                                    onClick={() => setEditProductDetails(null)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Category Modal */}
                {showCategoryModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white w-96 p-6 rounded-lg shadow-lg transform transition-transform scale-95">
                            <h2 className="text-lg font-semibold mb-4">Add New Category</h2>
                            <input
                                type="text"
                                placeholder="Category Name"
                                className="border p-2 mb-4 w-full focus:ring-2 focus:ring-blue-500 rounded"
                                value={newCategory.name}
                                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                            />
                            <input
                                type="text"
                                placeholder="Image URL"
                                className="border p-2 mb-4 w-full focus:ring-2 focus:ring-blue-500 rounded"
                                value={newCategory.image}
                                onChange={(e) => setNewCategory({ ...newCategory, image: e.target.value })}
                            />
                            <div className="flex justify-end gap-4">
                                <button
                                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition"
                                    onClick={handleAddCategory}
                                >
                                    Add Category
                                </button>
                                <button
                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
                                    onClick={() => setShowCategoryModal(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
