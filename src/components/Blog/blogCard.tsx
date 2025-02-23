

import React from 'react'
import { useNavigate } from 'react-router-dom';

// types.ts
export interface Blog {
    id?: string;
    title?: string;
    content?: string;
    category?: string;
    readTime?: string;
    image?: string;
    uuid?: string;
    author?: string;
    cover_url?: string;
  }

interface BlogCardProps {
    blog: Blog;
  }


  
const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
    const navigate = useNavigate();
  
    return (
      <div 
        className="cursor-pointer transition-transform hover:scale-105"
        onClick={() => navigate(`/blog/${blog.uuid}`)}
      >
        <div className="rounded-lg  ">
          <img 
            src={blog.cover_url || '/Frame 1000007341.png'} 
            alt={'over-sabi-nurse'} 
            className="w-full h-full object-cover"
          />
          <div className="py-4">
            <div className="flex items-center space-x-4 mb-2">
              <span className="text-pink-500 uppercase text-sm">{blog.category}</span>
              <span className="text-gray-400 text-sm"> - {blog.readTime || '5 mins read' }</span>
            </div>
            <h3 className="text-lg font-semibold mb-2 line-clamp-2">
              {blog.title}
            </h3>
            {/* <p className="text-gray-600 line-clamp-3">
              {blog.content}
            </p> */}
          </div>
        </div>
      </div>
    );
  };
  

export default BlogCard
