import Layout from '../layout/index'; // Ensure this is a default import
import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
// import Home from '../pages/Home';
import withLazyLoading from '../utils/Loader';
import { lazy } from 'react';
import About from '../pages/web/About';
import Blog from '../pages/web/Blog';
import Contact from '../pages/web/Contact';
import SignUp from '../pages/auth/signUp';
import ResetPassword from '../pages/auth/resetPassword';
import ForgotPassword from '../pages/auth/forgotPassword';
import SignIn from '../pages/auth/signIn';
import VerifyCode from '../pages/auth/verifyCode';
import HomeShop from '../pages/shop/HomeShop';
import ProductDetail from '../pages/shop/ProductDetail';
import ProductCart from '../pages/shop/Cart';
import OrderSummary from '../pages/shop/OrderSummary';
import Payment from '../pages/shop/Payment';


const Home = withLazyLoading(lazy(() => import('../pages/web/Home')));


// Define the type for the route configuration
interface RouteConfig {
  element: React.ReactNode;
  children?: { index?: boolean; path?: string; element: React.ReactNode }[];
  path?: string;
}

// Define the routes array
 const routes: RouteConfig[] = [
  {
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    children: [
      { index: true, element: <Home /> },
      { path:'/about-me', element: <About /> },
      { path:'/blog', element: <Blog /> },
      { path:'/contact', element: <Contact /> },
    ],
  },
  {
    element: (
        <Outlet />
    ),
    path: '/auth',
    children: [
      {index: true, element: <Navigate to="/auth/sign-in" />},
      {path:'sign-in', element: <SignIn />},
      {path:'sign-up', element: <SignUp />},
      {path:'reset-password', element: <ResetPassword />},
      {path:'forgot-password', element: <ForgotPassword />},
      {path:'verify-code', element: <VerifyCode />},
    ]
  },
  {
    element: (
        <Outlet />
    ),
    path: '/shop',
    children: [
      {index: true, element: <HomeShop />},
      {path:'product-detail', element: <ProductDetail />},
      {path:'cart', element: <ProductCart />},
      {path:'Order-Summary', element: <OrderSummary />},
      {path:'payment', element: <Payment />},
    ]
  }
];



export const router = createBrowserRouter([...routes]);