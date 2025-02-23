
import { createSlice } from '@reduxjs/toolkit';
import { ResendOTP, UserForgotPassword, UserResetPassword, UserSignin, UserSignup, VerifyOTP } from './authApi';
import { jwtDecode } from 'jwt-decode';
import { Dispatch } from 'redux';
import { PayloadAction, ActionReducerMapBuilder } from '@reduxjs/toolkit';
// import { AuthStateInterface } from '../../types/Auth';
import { RootState } from '../store';





const initialState: AuthState = {
    isAuth: false,
    isInitialized: false,
    themOs: null, 
    token: null,
    loading: false,
    error: null,
    email: localStorage.getItem('email') || '',
    requestedLocation: null,
    status: false,
    awaitingOTPVerification: false,
  };
  
  

  const isTokenExpired = (token: string) => {
    if (!token) return true;
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp ? decoded.exp < currentTime : true;
  };


interface CheckTokenExpirationAction {
    (
      dispatch: Dispatch,
      getState: () => RootState
    ): void; 
}



export const checkTokenExpiration: CheckTokenExpirationAction = (dispatch, getState) => {
    const { token } = getState().auth;
    if (token && isTokenExpired(token)) {
        dispatch(logout());
    }
};


interface AuthState {
    isAuth: boolean;
    isInitialized: boolean;
    token: string | null;
    loading: boolean;
    error: string | null;
    email: string;
    requestedLocation: string | null;
    themOs: string | null;
    status: boolean;
    awaitingOTPVerification: boolean;
}


// interface AuthPayload {
//     email: string;
//     medical: any;
//     error: string;
// }



const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.loading = false;
            state.error = null;
            localStorage.removeItem('themOs');
            localStorage.removeItem('awaitingOTPVerification');
            state.isAuth = false;
            state.isInitialized = false;
            state.awaitingOTPVerification = false;
        },
        setUserEmail: (state: AuthState, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
        setAwaitingOTPVerification: (state: AuthState) => {
            state.awaitingOTPVerification = true;
            localStorage.setItem('awaitingOTPVerification', 'true');
        },
        resetAwaitingOTPVerification: (state: AuthState) => {
            state.awaitingOTPVerification = false;
            localStorage.removeItem('awaitingOTPVerification');
        },
    },

    extraReducers: (builder: ActionReducerMapBuilder<AuthState>) => {
        builder
            .addCase(UserSignup.pending, (state: AuthState) => {
                state.loading = true;
                state.error = null;
                state.status = false;
            })
            .addCase(UserSignup.fulfilled, (state: AuthState, action: PayloadAction<any>) => {
                state.loading = false;
                state.themOs = action.payload;
                state.error = null;
                state.isAuth = false;
                state.awaitingOTPVerification = true;
                state.status = true;
            })
            .addCase(UserSignup.rejected, (state: AuthState, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload || 'Signup failed. Please try again.';
                state.isAuth = false;
                state.isInitialized = true;
                state.awaitingOTPVerification = false;
                state.status = false;
            })



            //  this is signin
            .addCase(UserSignin.pending, (state: AuthState) => {
                state.loading = true;
                state.isAuth = false;
                state.error = null;
                state.isInitialized = false;
                state.status = false;
            })
            .addCase(UserSignin.fulfilled, (state: AuthState, action: PayloadAction<any>) => {
                state.loading = false;
                state.themOs = action.payload;
                state.error = null;
                state.isAuth = true;
                state.isInitialized = true;
                localStorage.setItem('them-os', JSON.stringify(action.payload));
                state.status = true;
            })
            .addCase(UserSignin.rejected, (state: AuthState, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload || 'Signin failed';
                state.isAuth = false;
                state.themOs = null;
                state.status = false;
                state.isInitialized = false;
            })




            //  this is forgot password
            .addCase(UserForgotPassword.pending, (state: AuthState) => {
                state.loading = true;
                state.error = null;
                state.status = false;
            })
            .addCase(UserForgotPassword.fulfilled, (state: AuthState) => {
                state.loading = false;
                state.error = null;
                state.status = true;
            })
            .addCase(UserForgotPassword.rejected, (state: AuthState, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload || 'Forgot password request failed';
                state.status = false;
            })




            //  this is reset password
            .addCase(UserResetPassword.pending, (state: AuthState) => {
                state.loading = true;
                state.error = null;
                state.status = false;
            })
            .addCase(UserResetPassword.fulfilled, (state: AuthState) => {
                state.loading = false;
                state.error = null;
                state.status = true;
            })
            .addCase(UserResetPassword.rejected, (state: AuthState, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload || 'Reset password failed';
                state.status = false;
            })




            

            //  this is verify otp
            .addCase(VerifyOTP.pending, (state: AuthState) => {
                state.status = false;
                state.isAuth = false;
                state.loading = true;
                state.error = null;
            })
            .addCase(VerifyOTP.fulfilled, (state: AuthState, action: PayloadAction<any>) => {
                state.status = true;
                state.isAuth = true;
                state.loading = false;
                state.error = null;
                state.isInitialized = true;
                state.themOs = action.payload;
            })
            .addCase(VerifyOTP.rejected, (state: AuthState, action: PayloadAction<any>) => {
                state.status = false;
                state.loading = false;
                state.isAuth = false;
                state.error = action.payload;
            })






            // this is resend otp
            .addCase(ResendOTP.pending, (state: AuthState) => {
                state.status = false;
                state.loading = true;
                state.error = null;
            })
            .addCase(ResendOTP.fulfilled, (state: AuthState) => {
                state.status = true;
                state.loading = false;
                state.error = null;
            })
            .addCase(ResendOTP.rejected, (state: AuthState, action: PayloadAction<any>) => {
                state.status = false;
                state.loading = false;
                state.error = action.payload;
            });
    },
});


export const  {logout, setUserEmail, setAwaitingOTPVerification, resetAwaitingOTPVerification,   } = AuthSlice.actions;
export default AuthSlice.reducer;
