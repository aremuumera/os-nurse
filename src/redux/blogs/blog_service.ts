
import axios, { AxiosResponse } from "axios";
import { API_HOSTNAME } from "../../utils/config";

// Type for Blog
export interface Blog {
    id: string;
    title: string;
    content: string;
    // Add other fields as needed
}

// Type for Blog Details
export interface BlogDetails {
    id: string;
    title?: string;
    content?: string;
    category?: string;
    readTime?: string;
    image?: string;
    uuid?: string;
    author?: string;
    cover_url?: string;
    image_url?: string;
}

// Fetch all blogs
export const fetchBlogs = (): Promise<AxiosResponse<Blog[]>> => {
    return axios.get(`${API_HOSTNAME}/blogs`);
};

// Fetch blog details by ID
export const fetchBlogDetails = (id: string): Promise<AxiosResponse<BlogDetails>> => {
    return axios.get(`${API_HOSTNAME}/blogs/${id}`);
};
