import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchBooks, fetchBookDetails, searchBooks, Book, BookDetails } from "./books_service";

interface BookState {
    books: Book[];
    bookDetails: BookDetails | null;
    searchResults: Book[];
    loading: boolean;
    error: string | null;
}

const initialState: BookState = {
    books: [],
    bookDetails: null,
    searchResults: [],
    loading: false,
    error: null,
};


export const getBooks = createAsyncThunk<Book[], void, { rejectValue: string }>(
    "books/getBooks",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetchBooks();
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "An error occurred.");
        }
    }
);



export const getBookDetails = createAsyncThunk<BookDetails, string, { rejectValue: string }>(
    "books/getBookDetails",
    async (id, { rejectWithValue }) => {
        try {
            const response = await fetchBookDetails(id);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "An error occurred.");
        }
    }
);


export const searchBooksByQuery = createAsyncThunk<Book[], string, { rejectValue: string }>(
    "books/searchBooks",
    async (query, { rejectWithValue }) => {
        try {
            const response = await searchBooks(query);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "An error occurred.");
        }
    }
);


const bookSlice = createSlice({
    name: "books",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getBooks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getBooks.fulfilled, (state, action: PayloadAction<Book[]>) => {
                state.loading = false;
                state.books = action.payload;
            })
            .addCase(getBooks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "An unexpected error occurred.";
            })



            .addCase(getBookDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getBookDetails.fulfilled, (state, action: PayloadAction<BookDetails>) => {
                state.loading = false;
                state.bookDetails = action.payload;
            })
            .addCase(getBookDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "An unexpected error occurred.";
            })



            .addCase(searchBooksByQuery.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(searchBooksByQuery.fulfilled, (state, action: PayloadAction<Book[]>) => {
                state.loading = false;
                state.searchResults = action.payload;
            })
            .addCase(searchBooksByQuery.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "An unexpected error occurred.";
            });
    },
});

export default bookSlice.reducer;