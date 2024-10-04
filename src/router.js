import { createBrowserRouter } from 'react-router-dom';
import CommonLayout from './layouts/CommonLayout';
import Homepage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import { ROUTES } from './routes';

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <CommonLayout />,
    children: [
      { path: ROUTES.HOME, element: <Homepage /> },
    //   { path: ROUTES.FAQ, element: <FAQ /> },
    //   { path: ROUTES.ABOUT, element: <ABOUT /> },
    //   { path: ROUTES.BLOG, element: <BLOG /> },
    //   { path: ROUTES.SINGLE_BOOK.STATIC, element: <BookDetailsPage /> },
    ],
  },
  { path: ROUTES.NOT_FOUND, element: <NotFoundPage /> },
]);

export default router;