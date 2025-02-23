
interface ThunkErrorPayload {
    message?: string; // Error message
    status?: number; // Optional HTTP status code
    payload?: object | string;
  }



// ================== interface for auth slice =================
export interface AuthStateInterface {
    email: string;
    isAuth: boolean;
    isInitialized?: boolean;
    token: string | null;
    themOs: object | null;
    loading: boolean;
    error: ThunkErrorPayload | null;
    awaitingOTPVerification: boolean;
    requestedLocation: string | null;
    status: boolean;
  }
  


// =======================  props types for all auth properties =======================

// Define types for the data expected by each service
export type SignUpData = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};
  

// login data
  export type LoginData = {
    email: string;
    password: string;
  };
  
  // forgot password data
  export type ForgotPasswordData = {
    email: string;
  };
  
  // otp data
  export type OTPData = {
    otp: string;
    email: string;
  };
  
  // reset password data
  export type ResetPasswordData = {
    token: string;
    password: string;
    email: string;
    password_confirmation: string;

  };

  // reset otp data
  export type ResetOtp = {
    email: string;
  };
  