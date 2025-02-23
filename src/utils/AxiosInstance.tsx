import axios from 'axios';
import { API_HOSTNAME } from './config';
// import { setRequestedLocation, logout } from '@/redux/authslice';
// import { useLocation } from 'react-router';
// import { useDispatch, useSelector } from 'react-redux'; // Assuming you have a logout action


// Create an Axios instance
const AxiosInstance = axios.create({
  baseURL: API_HOSTNAME,
});





// Add a request interceptor to attach the token
AxiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('themOs'); // Retrieve the token from localStorage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Attach token to Authorization header
    }
    return config; // Proceed with the request
  },
  (error) => {
    return Promise.reject(error); // Handle request error
  },
);



// Adding a response interceptor to handle 401 errors (invalid/expired token)
AxiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    // if (error.response?.status === 401) {
    //   logout();
    //   const { requestedLocation } = useSelector((state) => state.auth);
    //   const dispatch = useDispatch();
    //   const { pathname } = useLocation();
    //   if (!requestedLocation) {
    //     dispatch(setRequestedLocation(pathname));
    //   } else {
    //     window.location.href = '/auth/login';
    //   }
    // }
    return Promise.reject(error);
  },
);

export default AxiosInstance;
