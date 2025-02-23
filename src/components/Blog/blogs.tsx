

import React from 'react'
import BlogCard, { Blog } from './blogCard';
// pages/BlogListingPage.tsx
import { useEffect, useState } from 'react';
import { getBlogs } from '../../redux/blogs/blog_api_slice';
import { useAppDispatch, useAppSelector } from '../../redux/store';


export const generateDummyBlogs = (count: number): Blog[] => {
    return Array.from({ length: count }, (_, i) => ({
      id: `blog-${i + 1}`,
      title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras a enim in lacus congue commodo',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam posuere consequat eros...',
      category: 'Health/Travel',
      readTime: '5 mins read',
      image: `/api/placeholder/400/300`,
      author: 'Tracey Wilson',
    }));
  };


  // Pagination section
interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  }
  

  
  const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const getPageNumbers = () => {
      const pages: (number | string)[] = [];
      
      // Always show first page
      pages.push(1);
      
      // Current page neighborhood
      const rangeStart = Math.max(2, currentPage - 1);
      const rangeEnd = Math.min(totalPages - 1, currentPage + 1);
      
      // Add ellipsis after first page if needed
      if (rangeStart > 2) {
        pages.push('...');
      }
      
      // Add pages around current page
      for (let i = rangeStart; i <= rangeEnd; i++) {
        pages.push(i);
      }
      
      // Add ellipsis before last page if needed
      if (rangeEnd < totalPages - 1) {
        pages.push('...');
      }
      
      // Always show last page if there's more than one page
      if (totalPages > 1) {
        pages.push(totalPages);
      }
      
      return pages;
    };
  
    return (
      <div className="flex items-center justify-between space-x-0.5 mt-8">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 rounded disabled:opacity-50"
        >
          Previous
        </button>
        
        <div className="sm:space-x-1  space-x-0.5">
          {getPageNumbers().map((page, index) => (
            typeof page === 'number' ? (
              <button
                key={index}
                onClick={() => onPageChange(page)}
                className={`px-2 sm:py-2 sm:px-4 py-1 rounded ${
                  currentPage === page 
                    ? 'bg-pink-500 text-white' 
                    : 'hover:bg-gray-100'
                }`}
              >
                {page}
              </button>
            ) : (
              <span key={index} className="px-2">
                {page}
              </span>
            )
          ))}
        </div>
        
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    );
  };
  
  

const Blogs: React.FC = () => {
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [localBlogs, setLocalBlogs] = useState<Blog[]>([]);
  const { blogs, loading, error } = useAppSelector((state) => state.blogs);
  
  const ITEMS_PER_PAGE = 6;
  
  useEffect(() => {
    dispatch(getBlogs());
    // Generate dummy data while API is not available
    setLocalBlogs(generateDummyBlogs(120));
  }, [dispatch]);
  
  const displayedBlogs = blogs.length > 0 ? blogs : localBlogs;
  const totalPages = Math.ceil(displayedBlogs.length / ITEMS_PER_PAGE);
  const currentBlogs = displayedBlogs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;
  
  return (
    <div className="container mx-auto  py-8">
      <h1 className="text-3xl font-bold mb-8">Latest</h1>
      
      {displayedBlogs.length === 0 ? (
        <div className="text-center py-8">
          <img 
            src="/api/placeholder/400/300" 
            alt="No blogs found" 
            className="mx-auto mb-4"
          />
          <p className="text-gray-600">No blogs found</p>
        </div>
      ) : (
        <>
          <div className="grid px-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {currentBlogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
          
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
};
export default Blogs
