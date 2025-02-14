import Layout from '../layout/index'; // Ensure this is a default import
import { createBrowserRouter, Outlet } from 'react-router-dom';
import Home from '../pages/Home';

// Define the type for the route configuration
interface RouteConfig {
  element: React.ReactNode;
  children?: { index?: boolean; path?: string; element: React.ReactNode }[];
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
    ],
  },
];



export const router = createBrowserRouter([...routes]);