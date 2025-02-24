import axios from 'axios';
import { API_HOSTNAME } from './config';

// Create an Axios instance
const AxiosInstance = axios.create({
  baseURL: API_HOSTNAME,
  withCredentials: true, // Ensure cookies (including CSRF tokens) are sent with requests
});

// Function to get the CSRF token (example: from a meta tag or cookie)
const getCsrfToken = () => {
  // Example: Retrieve CSRF token from a meta tag
  const metaTag = document.querySelector('meta[name="csrf-token"]');
  return metaTag ? (metaTag as HTMLMetaElement).content : null;
};

// Add a request interceptor to attach the token
AxiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('them-os');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Attach auth token
    }

    // Attach CSRF token to headers
    const csrfToken = getCsrfToken();
    if (csrfToken) {
      config.headers['X-CSRF-TOKEN'] = csrfToken; // Common header name for CSRF tokens
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Adding a response interceptor to handle 401 errors (invalid/expired token)
AxiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response?.status === 401) {
      window.location.href = '/auth/sign-in';
    }
    return Promise.reject(error);
  },
);

export default AxiosInstance;