import axios from 'axios';
import axiosRetry from 'axios-retry';

// Create an axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 5000,
});

// Add retry behavior
axiosRetry(api, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: (error) => {
    return axiosRetry.isNetworkOrIdempotentRequestError(error);
  },
});

export default api;
