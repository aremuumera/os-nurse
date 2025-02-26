import Layout from '../layout/index'; 
import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import withLazyLoading from '../utils/Loader';
import { lazy } from 'react';
import NotFoundPage from '../utils/page404';
import PaymentSuccess from '../components/shop/PaymentSuccessPage';
// import ShippingInformation from '../pages/shop/ShippingInformation';


const Home = withLazyLoading(lazy(() => import('../pages/web/Home')));
const About = withLazyLoading(lazy(() => import('../pages/web/About')));
const Blog = withLazyLoading(lazy(() => import('../pages/web/Blog')));
const Contact = withLazyLoading(lazy(() => import('../pages/web/Contact')));
const SignUp = withLazyLoading(lazy(() => import('../pages/auth/signUp')));
const ResetPassword = withLazyLoading(lazy(() => import('../pages/auth/resetPassword')));
const ForgotPassword = withLazyLoading(lazy(() => import('../pages/auth/forgotPassword')));
const SignIn = withLazyLoading(lazy(() => import('../pages/auth/signIn')));
const VerifyCode = withLazyLoading(lazy(() => import('../pages/auth/verifyCode')));
const HomeShop = withLazyLoading(lazy(() => import('../pages/shop/HomeShop')));
const ProductDetail = withLazyLoading(lazy(() => import('../pages/shop/ProductDetail')));
const ProductCart = withLazyLoading(lazy(() => import('../pages/shop/Cart')));
// const Payment = withLazyLoading(lazy(() => import('../pages/shop/Payment')));
const BlogDetail = withLazyLoading(lazy(() => import('../pages/web/BlogDetail')));
const VerifyEmailPage = withLazyLoading(lazy(() => import('../pages/auth/verifyEmail')));


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
      { path:'/blog/:blogDetail', element: <BlogDetail/> },
      { path:'/contact', element: <Contact /> },
      { path:'/payment/success', element: <PaymentSuccess /> },
      { path:'*', element: <NotFoundPage /> },
    ],
  },
  {
    element: (
        <Outlet />
    ),
    path: `/auth`,
    children: [
      {index: true, element: <Navigate to="/auth/sign-in" />},
      {path:'sign-in', element: <SignIn />},
      {path:'sign-up', element: <SignUp />},
      {path:'reset-password/:token', element: <ResetPassword />},
      {path:'forgot-password', element: <ForgotPassword />},
      {path:'verify-code', element: <VerifyCode />},
      {path:'verify-email/:id/:hash', element: <VerifyEmailPage />},
      { path:'*', element: <NotFoundPage /> },
    ]
  },
  {
    element: (
        <Outlet />
    ),
    path: '/shop',
    children: [
      {index: true, element: <HomeShop />},
      {path:'search', element: <HomeShop />},
      {path:'books/:productDetail', element: <ProductDetail />},
      {path:'cart', element: <ProductCart />},
      // {path:'shipping-information', element: <ShippingInformation />},
      // {path:'payment', element: <Payment />},
      { path:'*', element: <NotFoundPage /> },
    ]
  }
];



export const router = createBrowserRouter([...routes]);