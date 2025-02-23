



import { createAsyncThunk } from '@reduxjs/toolkit';
// import { AUTH_API } from "../../../util/config";
import authService from './authService';
import { jwtDecode } from 'jwt-decode';
// import AxiosInstance from '@/utils/CustomComponent/AxiosInstance';
import { ForgotPasswordData, LoginData, OTPData, ResetOtp, ResetPasswordData, SignUpData } from '../../types/Auth';
import { UserForgotPasswordResponse, UserLoginResponse, UserReSendOtpResponse, UserResetPasswordResponse, UserSignUpResponse, UserVerifyOtpResponse } from '../../types/payload';
import useHandleErr, { ErrorResponse } from '../../utils/UseErrorHandler';

// ============================  auth function begin here ========================================================

export const isTokenExpired = (token: string) => {
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded?.exp ? decoded.exp < currentTime : true;
  } catch {
    return true;
  }
};



// ================== initial action (both for login/signUp user) for submitting the phone number ==========================================
// export const UserInitialized = createAsyncThunk( `${API_HOSTNAME}/api/auth/signusingtoken`, async (_, { rejectWithValue }) => {
//     const token = localStorage.getItem('breeder');
//     const user  =  JSON.parse(localStorage.getItem('mybreeder' || 'null'));

//     if (token && token !== 'undefined' && token !== null ) {
//       return {token, user}
//     } else {
//         localStorage.removeItem('breeder');
//         localStorage.removeItem('mybreeder');
//     }
// }
// );



// export const UserInitialized = createAsyncThunk(
//   'auth/UserInitialized',
//   async (_, { rejectWithValue }) => {
//     const token = localStorage.getItem('breeder');
//     if (!token || token === 'undefined') {
//       localStorage.removeItem('breeder');
//       localStorage.removeItem('mybreeder');
//       return rejectWithValue('No valid token found');
//     }
//     try {
//       const response = await AxiosInstance.post(`${API_HOSTNAME}/api/auth/signusingtoken`);
//       const newToken = response.data?.accessToken;
//       const userData = response.data.user;
//       localStorage.setItem('breeder', newToken);
//       localStorage.setItem('mybreeder', JSON.stringify(userData));
//       return { token: newToken, user: userData };
//     } catch (error) {
//       localStorage.removeItem('breeder');
//       localStorage.removeItem('mybreeder');
//       return rejectWithValue(error.response?.data?.message || 'Token refresh failed');
//     }
//   },
// );



// Function for user signup



export const UserSignup = createAsyncThunk<Partial<
UserSignUpResponse>, // Return type of the async function // Fulfilled response type
SignUpData // Payload type
// { rejectValue: ErrorResponse } // rejected Payload type
>(
  'usersignup',
  async (
    { name, email, password, password_confirmation }, { rejectWithValue }
  ) => {
    const HandleErr = useHandleErr();
    try {
      const response = await authService.SignUpService({
        name,
        email,
        password,
        password_confirmation
      });
      return response.data;
    } catch (err) {
        const error = err as Error;
      return rejectWithValue(HandleErr(error));
    }
  },
);





// Function for user signin
export const UserSignin = createAsyncThunk<Partial<UserLoginResponse>, LoginData>(
  'usersignin',
  async ({ email, password }, { rejectWithValue }) => {
    const HandleErr = useHandleErr();
    try {
      const response = await authService.LoginService({ email, password });
      return response.data;
    } catch (err) {
        const error = err as Error;
      return rejectWithValue(HandleErr(error));
    }
  },
);



// Function for forgot password (sends a reset link to email)
export const UserForgotPassword = createAsyncThunk<Partial<UserForgotPasswordResponse>, ForgotPasswordData>(
  'forgotPassword',
  async (email, { rejectWithValue }) => {
    const HandleErr = useHandleErr();

    try {
      const response = await authService.ForgotPasswordService(email);
      return response.data;
    } catch (err) {
        const error = err as Error;
      return rejectWithValue(HandleErr(error));
    }
  },
);




// Function for resetting the password with token
export const UserResetPassword = createAsyncThunk<Partial<UserResetPasswordResponse>, ResetPasswordData>(
  'resetPassword',
  async ({ token, password, email, password_confirmation }, { rejectWithValue }) => {
    const HandleErr = useHandleErr();

    try {
      const response = await authService.ResetPasswordService({
         token, 
         email,
        password,
        password_confirmation 
      });
      return response.data;
    } catch (err) {
        const error = err as Error;
      return rejectWithValue(HandleErr(error));
    }
  },
);





// ================== for verifying the otp ==========================================

export const VerifyOTP = createAsyncThunk<Partial<UserVerifyOtpResponse>, OTPData, { rejectValue: ErrorResponse }>(
  'auth/verifyOTP',
  async ({ email, otp }, { rejectWithValue }) => {
    const HandleErr = useHandleErr();

    try {
      const response = await authService.VerifyOTPService({
        email: email,
        otp: otp,
      });
      return response.data;
    } catch (err) {
        const error = err as Error;
      return rejectWithValue(HandleErr(error));
    }
  },
);



// ================== for resending to verify the otp ==========================================

export const ResendOTP = createAsyncThunk<Partial<UserReSendOtpResponse>, ResetOtp, { rejectValue: ErrorResponse }>(
  'auth/ResetOTP',
  async ({ email }, { rejectWithValue }) => {
    const HandleErr = useHandleErr();

    try {
      const response = await authService.ResendOTPService({
          email
      });
      return response.data;
    } catch (err) {
        const error = err as Error;
      return rejectWithValue(HandleErr(error));
    }
  },
);
