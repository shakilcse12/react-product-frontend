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