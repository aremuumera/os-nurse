import axios from 'axios';
import { API_HOSTNAME } from './config';

// Create an Axios instance
const AxiosInstance = axios.create({
  baseURL: API_HOSTNAME,
  withCredentials: true,
});

// Enhanced function to get CSRF token with multiple fallback approaches
const getCsrfToken = () => {
  
  console.log('All cookies:', document.cookie);
  
  // Approach 1: Standard cookie parsing
  const standardParse = () => {
    const match = document.cookie.match(/(^|;)\s*XSRF-TOKEN\s*=\s*([^;]+)/);
    return match ? decodeURIComponent(match[2]) : null;
  };
  
  // Approach 2: Split and find
  const splitAndFind = () => {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith('XSRF-TOKEN=')) {
        return decodeURIComponent(cookie.substring(11)); // 11 is length of "XSRF-TOKEN="
      }
    }
    return null;
  };
  
  // Approach 3: Check for Laravel's default _token meta tag
  const checkMetaTag = () => {
    const metaTag = document.querySelector('meta[name="csrf-token"]');
    return metaTag ? metaTag.getAttribute('content') : null;
  };
  
  // Try all approaches
  const token = standardParse() || splitAndFind() || checkMetaTag();
  
  console.log('Extracted CSRF token:', token);
  return token;
};

// Function to fetch a fresh CSRF token
const fetchCsrfToken = async () => {
  try {
    console.log('Fetching fresh CSRF token...');
    const response = await axios.get(`https://nurse.fomacoenergies.com/sanctum/csrf-cookie`, {
      withCredentials: true
    });
    console.log('CSRF response headers:', response.headers);
    console.log('Cookies after fetch:', document.cookie);
    
    // Try to get the token after fetching
    const token = getCsrfToken();
    return token;
  } catch (error) {
    console.error('Error fetching CSRF token:', error);
    return null;
  }
};

// Request interceptor that fetches a fresh token for every non-GET request
AxiosInstance.interceptors.request.use(
  async (config) => {
    // Add auth token
    const token = localStorage.getItem('them-os');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    // Only apply CSRF protection to non-GET requests
    if (!['GET', 'HEAD', 'OPTIONS'].includes(config.method?.toUpperCase() || '')) {
      // Try to get an existing token first
      let csrfToken = getCsrfToken();
      
      // If no token found, fetch a fresh one
      if (!csrfToken) {
        csrfToken = await fetchCsrfToken();
      }
      
      // Apply the token to headers if we got one
      if (csrfToken) {
        config.headers['X-XSRF-TOKEN'] = csrfToken;
        // Some Laravel setups might require this alternate header name
        config.headers['X-CSRF-TOKEN'] = csrfToken;
      }
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
AxiosInstance.interceptors.response.use(
  (response) => {
    console.log('CSRF response headers:', response.headers);

    return response;
  },
  async (error) => {
    // For token mismatch errors (419) try again with a fresh token
    if (error.response?.status === 419) {
      console.log('CSRF token mismatch, retrying with fresh token');
      const originalRequest = error.config;
      
      // Only retry once to avoid infinite loops
      if (!originalRequest._retry) {
        originalRequest._retry = true;
        
        // Get a fresh token
        const freshToken = await fetchCsrfToken();
        
        if (freshToken) {
          // Apply the fresh token
          originalRequest.headers['X-XSRF-TOKEN'] = freshToken;
          originalRequest.headers['X-CSRF-TOKEN'] = freshToken;
          
          // Retry the request
          return axios(originalRequest);
        }
      }
    }
    
    if (error.response?.status === 401) {
      window.location.href = '/auth/sign-in';
    }
    
    return Promise.reject(error);
  }
);

export default AxiosInstance;