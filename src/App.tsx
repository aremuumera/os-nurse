import './App.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes'
// import { useEffect } from 'react';
// import { initializeCsrfProtection } from './utils/AxiosInstance';

function App() {
  // useEffect(() => {
  //   // Initialize CSRF protection when app first loads
  //   initializeCsrfProtection();
  // }, []);
  

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
