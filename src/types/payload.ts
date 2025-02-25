// Common response structure (if consistent across actions)  // using this Apiresponse i need to wrap it with all the type response so that i can prevent error for unexpected response data added to the struture

export interface ApiResponse<T = unknown> {
    data: T; // The main payload
    message: string; // Success or error message
    status: "success" | "error";
    [key: string]: unknown; // Allow unexpected fields from the backend
  }
  

  export interface BasicPayloadResponse {
    message: string; // Success or error message
    status: number; //
  }
  

  // Response for Signup Action
  export interface UserSignUpResponse extends BasicPayloadResponse {
    id: string;
    username: string;
    email: string;
    role: string;
    created_at: Date;
    updated_at: Date;
  }
  
  // Response for Login Action
  export interface UserLoginResponse extends BasicPayloadResponse {
    user: {
      id: string;
      username: string;
      email: string;
      role: string;
    };
  }
  

  // Response for Forgot Password Action
  export interface UserForgotPasswordResponse  {
    message: string; // E.g., "Password reset email sent successfully"
  }
  

  // Response for Reset Password Action
  export interface UserResetPasswordResponse  {
    message: string; 
    email: string;
  }
  

  // Response for ReSend OTP Action
  export interface UserReSendOtpResponse {
    otpId: string; // ID of the OTP for tracking (optional)
    message: string; // E.g., "OTP sent successfully"
  }
  

  // Response for Verify OTP Action
  export interface UserVerifyOtpResponse {
    message: string; // E.g., "OTP verified successfully"
  }
  