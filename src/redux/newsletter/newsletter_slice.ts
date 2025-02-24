import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_HOSTNAME } from "../../utils/config";
import AxiosInstance from "../../utils/AxiosInstance";



    // Type for input payload
    export interface SuscriberData {
        email: string;
    }


  
    // Type for success response
    export interface SuscriberResponse {
        message: string; // Example: "Email added to newsletterSuscriber successfully"
    }


    
    // Type for error response
    export interface ErrorResponse {
        message: string; // Error message
        status?: number; // Optional HTTP status code
    }
  


    export interface SuscriberState {
        loading: boolean;
        successMessage: string | null; // Success message for UI
        error: ErrorResponse | null; // Error details
    }
  

    export const addToNewsLetter = (
    data: SuscriberData
    ): Promise<AxiosResponse<SuscriberResponse>> => {
    return AxiosInstance.post(`${API_HOSTNAME}/subscriber`, data);
    };





    export const suscriberNewsletter = createAsyncThunk<
    SuscriberResponse,
    SuscriberData,    
    { rejectValue: ErrorResponse } 
    >("newsletterSuscriber/suscriberEmail", async (data, { rejectWithValue }) => {
    try {
        const response = await addToNewsLetter(data);
        return response.data; // Return success response
    } catch (error: any) {
        const errorResponse: ErrorResponse = {
        message: error.response?.data?.message || "An error occurred.",
        status: error.response?.status,
        };
        return rejectWithValue(errorResponse); // Return error payload
    }
    });




  const initialState: SuscriberState = {
    loading: false,
    successMessage: null,
    error: null,
  };
  

  const SuscriberSlice = createSlice({
    name: "newsletterSuscriber",
    initialState,
    reducers: {
      resetSuscriberState(state) {
        state.successMessage = null;
        state.error = null;
        state.loading = false;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(suscriberNewsletter.pending, (state) => {
          state.loading = true;
          state.successMessage = null;
          state.error = null;
        })
        .addCase(suscriberNewsletter.fulfilled, (state, action: PayloadAction<SuscriberResponse>) => {
          state.loading = false;
          state.successMessage = action.payload.message;
        })
        .addCase(suscriberNewsletter.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload || { message: "An unexpected error occurred." };
        });
    },
  });
  

  export const { resetSuscriberState } = SuscriberSlice.actions;
  export default SuscriberSlice.reducer;
  