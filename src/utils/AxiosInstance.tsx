import axios from 'axios';
import { API_HOSTNAME } from './config';
// import { logout } from '../redux/authFeature/authSlice';
// import { useDispatch } from 'react-redux';


// Create an Axios instance
const AxiosInstance = axios.create({
  baseURL: API_HOSTNAME,
  withCredentials: true,
});





// Add a request interceptor to attach the token
AxiosInstance.interceptors.request.use(
 (config) => {
    const token = localStorage.getItem('them-os'); 
    // console.log('token', token);
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
    if (error.response?.status === 401) {
      // const dispatch = useDispatch();
      // dispatch(logout())
      window.location.href = '/auth/sign-in';
    //   const { requestedLocation } = useSelector((state) => state.auth);
    //   const dispatch = useDispatch();
    //   const { pathname } = useLocation();
    //   if (!requestedLocation) {
    //     dispatch(setRequestedLocation(pathname));
    //   } else {
    //     window.location.href = '/auth/login';
    //   }
    }
    return Promise.reject(error);
  },
);

export default AxiosInstance;
