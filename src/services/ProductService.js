import { PRODUCT_API } from '../API/Product';
import axios from 'axios';

const API_URL = 'https://my-course-backend-green.vercel.app'; 

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

export const fetchCourseDetails = async (id) => {
  const response = await fetch(PRODUCT_API.SINGLE_PRODUCTS.DYNAMIC(id));
  const fetchedCourse = await response.json();
  return fetchedCourse;
};

export const getProductDetailsWithPurchaseStatus = async (productId, userId) => {
  try {
    const response = await axios.post(`${API_URL}/products/details`, {
      productId,
      userId,
    });
    console.log(response.data);
    return response.data; // returns { product: {...}, isBought: true/false }
  } catch (error) {
    console.error('Error fetching product details:', error.message);
    throw new Error(error.response?.data?.message || 'Error fetching product details');
  }
};