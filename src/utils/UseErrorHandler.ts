
export interface Error {
    response?: {
        data?: {
            message?: string;
            email?: string;
        };
        status?: number;
    };
    request?: XMLHttpRequest;
    message?: string;
}

export interface ErrorResponse {
    message?: string;
    status?: number;
    email?: string;
}

const useHandleErr = () => {

    return (err: Error): ErrorResponse => {
        if (err.response && err.response.data && err.response.status === 411) {
            return {
                message: err.response.data.message || 'An error occurred',
                status: err.response.status || 500,
                email: err.response.data.email || '',
            };
        } else if (err.response && err.response.data) {
            // Server responded with a status code outside the range of 2xx
            return {
                message: err.response.data.message || 'An error occurred',
                status: err.response.status || 500,
            };
        } else if (err.request) {
            // Request was made but no response was received
            return {
                message: err.message || 'No response from server. Please check your connection.',
                status: 408,  // Commonly used for timeout errors
            };
        } else {
            // Error in setting up the request
            return {
                message: err.message || 'An error occurred',
                status: 500,
            };
        }
    };
  };
  
  export default useHandleErr;
  