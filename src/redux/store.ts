import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './combine.ts' 
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AuthStateInterface } from '../types/Auth.ts';


export interface RootState {
    auth: AuthStateInterface;
    // Add other slices if needed, e.g., customizer: CustomizerState;
  }


// Top-level persist config excluding auth (already handled in combine.js)
const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['auth'], // Exclude 'auth' from global persistence as it’s handled separately
};



// Apply the global persistence configuration to rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: import.meta.env.MODE !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER] as unknown as boolean,
      },
    }),
});

export const persistor = persistStore(store);



// Define types for AppStore, AppDispatch, and Async Thunks
export type AppStore = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
export const useAppSelector: TypedUseSelectorHook<AppStore> = useSelector;

export default store;
