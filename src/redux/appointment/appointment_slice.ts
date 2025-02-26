import axios, { AxiosResponse } from "axios";
import { API_HOSTNAME } from "../../utils/config";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
// import AxiosInstance from "../../utils/AxiosInstance";

// Type for Appointment
export interface Appointment {
    id: string;
    name: string;
    email: string;
    date: string;
    time: string;
    description: string;
}

// Type for Appointment Payload
export interface AppointmentPayload {
    name: string;
    email: string;
    appointment_date: string;
    appointment_time: string;
    description: string;
}


// Create an appointment
export const createAppointment = (data: AppointmentPayload): Promise<AxiosResponse<Appointment>> => {
    return axios.post(`${API_HOSTNAME}/appointments`, data);
};





interface AppointmentState {
    appointment: Appointment | null;
    loading: boolean;
    error: string | null;
}

const initialState: AppointmentState = {
    appointment: null,
    loading: false,
    error: null,
};

export const addAppointment = createAsyncThunk<Appointment, AppointmentPayload, { rejectValue: string }>(
    "appointments/addAppointment",
    async (data, { rejectWithValue }) => {
        try {
            const response = await createAppointment(data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "An error occurred.");
        }
    }
);

const AppointmentSlice = createSlice({
    name: "appointments",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addAppointment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addAppointment.fulfilled, (state, action: PayloadAction<Appointment>) => {
                state.loading = false;
                state.appointment = action.payload;
            })
            .addCase(addAppointment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "An unexpected error occurred.";
            });
    },
});

export default AppointmentSlice.reducer;