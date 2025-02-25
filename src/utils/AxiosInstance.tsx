import axios from 'axios';
import { API_HOSTNAME } from './config';

// Create an Axios instance
const AxiosInstance = axios.create({
  baseURL: API_HOSTNAME,
  withCredentials: true, 
  withXSRFToken: true,
});

AxiosInstance.interceptors.request.use(
  (config) => {
    // console.log('Request:', config);
    const token = localStorage.getItem('them-os');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; 
    }

    // Attach CSRF token to headers
    const csrfToken = getCsrfToken();
    if (csrfToken) {
      config.headers['X-XSRF-TOKEN'] = csrfToken; // Common header name for CSRF tokens
    }

    return config;
  },
  (error) => {
    // console.error('Request Error:', error);
    return Promise.reject(error);
  },
);

AxiosInstance.interceptors.response.use(
  (response) => {
    // console.log('Response:', response);
    return response;
  },
  async (error) => {
    // console.error('Response Error:', error);
    if (error.response?.status === 401) {
      window.location.href = '/auth/sign-in';
    }
    return Promise.reject(error);
  },
);const getCsrfToken = () => {
  const cookieValue = document.cookie
    .split('; ')
    .find((row) => row.startsWith('XSRF-TOKEN='))
    ?.split('=')[1];
  return cookieValue;
};

// Add a request interceptor to attach the token
AxiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('them-os');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; 
    }

    // Attach CSRF token to headers
    const csrfToken = getCsrfToken();
    if (csrfToken) {
      config.headers['X-XSRF-TOKEN'] = csrfToken; // Common header name for CSRF tokens
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);


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

