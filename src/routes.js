export const ROUTES = {
    HOME: '/',
    FAQ: '/faq',
    ABOUT: '/about',
    PRODUCT: '/products',
    ADMIN_DASHBOARD: '/admin',
    USER_DASHBOARD: '/user',
    LOGIN: '/login',
    REGISTER: '/register',
    SINGLE_PRODUCT: {
      STATIC: '/products/:id', 
      DYNAMIC: (productId) => `/products/${productId}`,
    },
    NOT_FOUND: '*',
  };
  