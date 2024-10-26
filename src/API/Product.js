export const PRODUCT_API = {
    PRODUCTS: 'https://my-course-backend-green.vercel.app/products',

    SINGLE_PRODUCTS: {
      STATIC: '/product/:id', 
      DYNAMIC: (productId) => `https://my-course-backend-green.vercel.app//${productId}`,
    },

  };