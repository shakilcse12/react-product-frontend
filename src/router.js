import { createBrowserRouter } from 'react-router-dom';
import CommonLayout from './layouts/CommonLayout';
import Homepage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import { ROUTES } from './routes';
import Login from './pages/LoginPage';
import Register from './pages/RegisterPage';
import ImageSection from './components/ImageSection';
import CourseDetailsPage from './pages/CourseDetailsPage';
import PrivateRoute from './Routes/PrivateRoute';

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <CommonLayout />,
    children: [
      { path: ROUTES.HOME, element: <Homepage /> },
      { path: ROUTES.LOGIN, element: <Login /> },
      { path: ROUTES.REGISTER, element: <Register /> },
      { path: ROUTES.PRODUCT, element: <PrivateRoute><ImageSection /></PrivateRoute> },
      { path: ROUTES.SINGLE_PRODUCT.STATIC, element: <CourseDetailsPage /> },
    ],
  },
  { path: ROUTES.NOT_FOUND, element: <NotFoundPage /> },
]);

export default router;
