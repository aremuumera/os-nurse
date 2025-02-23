import { Appointment, AppointmentPayload, createAppointment } from "./appointment_slice";
import { createAsyncThunk } from "@reduxjs/toolkit";









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