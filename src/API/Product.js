export const PRODUCT_API = {
    PRODUCTS: 'https://my-course-backend-green.vercel.app/products',

    SINGLE_PRODUCTS: {
      STATIC: '/products/:id', 
      DYNAMIC: (productId) => `https://my-course-backend-green.vercel.app/products/${productId}`,
    },

  };