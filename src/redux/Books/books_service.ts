import axios, { AxiosResponse } from "axios";
import { API_HOSTNAME } from "../../utils/config";



export interface Book {
    id: string;
    title: string;
    author: string;
    price: number;
    uuid: string;
    rating_score: string;
    rating_count: number;
    description: string;
    coverImage: string;
}

// Type for Book Details
export interface BookDetails {
    id: string;
    title: string;
    author: string;
    uuid: string;
    price: number;
    rating_score: string;
    rating_count: number;
    description: string;
    coverImage: string;
}

// Fetch all books
export const fetchBooks = (): Promise<AxiosResponse<Book[]>> => {
    return axios.get(`${API_HOSTNAME}/books`);
};

// Fetch book details by ID
export const fetchBookDetails = (id: string): Promise<AxiosResponse<BookDetails>> => {
    return axios.get(`${API_HOSTNAME}/books/${id}`);
};

// Search books by query
export const searchBooks = (query: string): Promise<AxiosResponse<Book[]>> => {
    return axios.get(`${API_HOSTNAME}/books/search?query=${query}`);
};