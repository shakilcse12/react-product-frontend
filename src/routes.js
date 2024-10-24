export const ROUTES = {
    HOME: '/',
    FAQ: '/faq',
    ABOUT: '/about',
    PRODUCT: '/products',
    ADMIN_DASHBOARD: '/products',
    USER_DASHBOARD: '/products',
    LOGIN: '/login',
    REGISTER: '/register',
    SINGLE_PRODUCT: {
      STATIC: '/product/:id', 
      DYNAMIC: (productId) => `/product/${productId}`,
    },
    NOT_FOUND: '*',
  };
  