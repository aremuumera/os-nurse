import axios, { AxiosResponse } from 'axios';
import { ForgotPasswordData, LoginData, OTPData, ResetOtp, ResetPasswordData, SignUpData, VerifyEmailData } from '../../types/Auth';
import { UserForgotPasswordResponse,  UserLoginResponse,  UserReSendOtpResponse, UserResetPasswordResponse, UserSignUpResponse, UserVerifyOtpResponse } from '../../types/payload';
import { API_HOSTNAME } from '../../utils/config';
import AxiosInstance from '../../utils/AxiosInstance';


// Define types for the service functions
const SignUpService = (SignUpUserData: SignUpData): Promise<AxiosResponse<UserSignUpResponse>> => {
  return axios.post(`${API_HOSTNAME}/register`, SignUpUserData);
};

const LoginService = (LoginUserData: LoginData): Promise<AxiosResponse<UserLoginResponse>> => {
  return AxiosInstance.post(`${API_HOSTNAME}/login`,  LoginUserData,{ withCredentials: true,});
};

const ForgotPasswordService = (ForgotPasswordData: ForgotPasswordData): Promise<AxiosResponse<UserForgotPasswordResponse>> => {
  return AxiosInstance.post(`${API_HOSTNAME}/forgot-password`, ForgotPasswordData);
};

const VerifyOTPService = (VerifyOTPData: OTPData): Promise<AxiosResponse<UserVerifyOtpResponse>> => {
  return AxiosInstance.post(`${API_HOSTNAME}/verify-otp`, VerifyOTPData);
};



const VerifyEmailService = (VerifyEmailData: VerifyEmailData): Promise<AxiosResponse<UserVerifyOtpResponse>> => {
  return AxiosInstance.get(`${API_HOSTNAME}/verify-otp`, VerifyEmailData);
};


const ResendOTPService = (ResendOTPData: ResetOtp): Promise<AxiosResponse<UserReSendOtpResponse>> => {
  return AxiosInstance.post(`${API_HOSTNAME}/resend-otp`, ResendOTPData);
};

const ResetPasswordService = (ResetPasswordData: ResetPasswordData): Promise<AxiosResponse<UserResetPasswordResponse>> => {
  return AxiosInstance.post(`${API_HOSTNAME}/reset-password`, ResetPasswordData);
};


// Export as an object with the defined services
const authService = {
  VerifyOTPService,
  SignUpService,
  LoginService,
  VerifyEmailService,
  ResetPasswordService,
  ForgotPasswordService,
  ResendOTPService,
};

export default authService;
