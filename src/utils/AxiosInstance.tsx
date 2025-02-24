import axios from 'axios';
import { API_HOSTNAME } from './config';

// Create an Axios instance
const AxiosInstance = axios.create({
  baseURL: API_HOSTNAME,
  withCredentials: true,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
});

// Function to ensure we have a CSRF token
const ensureCsrfToken = async () => {
  try {
    await axios.get(`${API_HOSTNAME}/sanctum/csrf-cookie`, {
      withCredentials: true
    });
  } catch (error) {
    console.error('Error fetching CSRF token:', error);
  }
};

// Function to get the CSRF token from cookies
const getCsrfToken = () => {
  const cookieValue = document.cookie
    .split('; ')
    .find((row) => row.startsWith('XSRF-TOKEN='))
    ?.split('=')[1];
  return cookieValue ? decodeURIComponent(cookieValue) : null;
};

// Add a request interceptor
AxiosInstance.interceptors.request.use(
  async (config) => {
    // Ensure we have a CSRF token before making non-GET requests
    if (config.method !== 'get') {
      await ensureCsrfToken();
    }

    const token = localStorage.getItem('them-os');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    // Attach CSRF token to headers
    const csrfToken = getCsrfToken();
    if (csrfToken) {
      config.headers['X-XSRF-TOKEN'] = csrfToken;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
AxiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      window.location.href = '/auth/sign-in';
    } else if (error.response?.status === 419) {
      // If we get a CSRF token mismatch, try to refresh the token and retry the request
      try {
        await ensureCsrfToken();
        // Retry the original request
        return AxiosInstance(error.config);
      } catch (retryError) {
        return Promise.reject(retryError);
      }
    }
    return Promise.reject(error);
  }
);

export default AxiosInstance;