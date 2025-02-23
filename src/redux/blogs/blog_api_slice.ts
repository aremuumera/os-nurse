


import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchBlogs, fetchBlogDetails, Blog, BlogDetails } from "./blog_service";

interface BlogState {
    blogs: Blog[];
    blogDetails: BlogDetails | null;
    loading: boolean;
    error: string | null;
}

const initialState: BlogState = {
    blogs: [],
    blogDetails: null,
    loading: false,
    error: null,
};

export const getBlogs = createAsyncThunk<Blog[], void, { rejectValue: string }>(
    "blogs/getBlogs",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetchBlogs();
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "An error occurred.");
        }
    }
);

export const getBlogDetails = createAsyncThunk<BlogDetails, string, { rejectValue: string }>(
    "blogs/getBlogDetails",
    async (id, { rejectWithValue }) => {
        try {
            const response = await fetchBlogDetails(id);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "An error occurred.");
        }
    }
);


const blogSlice = createSlice({
    name: "blogs",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getBlogs.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getBlogs.fulfilled, (state, action: PayloadAction<Blog[]>) => {
                state.loading = false;
                state.blogs = action.payload;
            })
            .addCase(getBlogs.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "An unexpected error occurred.";
            })
            .addCase(getBlogDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getBlogDetails.fulfilled, (state, action: PayloadAction<BlogDetails>) => {
                state.loading = false;
                state.blogDetails = action.payload;
            })
            .addCase(getBlogDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "An unexpected error occurred.";
            });
    },
});

export default blogSlice.reducer;