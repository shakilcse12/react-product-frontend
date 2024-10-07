export const PRODUCT_API = {
    PRODUCTS: 'https://react-product-backend.vercel.app/products',

    SINGLE_PRODUCTS: {
      STATIC: '/product/:id', 
      DYNAMIC: (productId) => `https://react-product-backend.vercel.app/products/${productId}`,
    },

  };