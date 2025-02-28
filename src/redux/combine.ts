import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import AuthReducer from '../redux/authFeature/authSlice';
import BlogReducer from '../redux/blogs/blog_api_slice';
import AppointmentReducer from './appointment/appointment_slice';
import BookReducer from './Books/books_api_slice';
import OrderReducer from './Order/order_api_slice';
// Persist configuration for auth reducer only
const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['email', 'isAuth', 'isInitialized', 'user', 'token', 'awaitingOTPVerification'],
};


// Wrap auth reducer with persistReducer
const persistedAuthReducer = persistReducer(authPersistConfig, AuthReducer);




// Combine all reducers
const rootReducer = combineReducers({
  auth: persistedAuthReducer,
  blogs: BlogReducer,
  books: BookReducer,
  appointments: AppointmentReducer,
  order: OrderReducer,
});




// export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
