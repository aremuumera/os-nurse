
// pages/BlogDetailsPage.tsx
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getBlogDetails } from '../../redux/blogs/blog_api_slice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { CgProfile } from "react-icons/cg";


const BlogDetailsPage: React.FC = () => {
  const { blogDetail } = useParams<{ blogDetail: string }>();
  const dispatch = useAppDispatch();
  const { blogDetails, loading, error } = useAppSelector((state) => state.blogs);

  useEffect(() => {
    if (blogDetail) {
      dispatch(getBlogDetails(blogDetail));
    }
  }, [dispatch, blogDetail]);

  if (loading) return <div className="text-center py-8">
    
  <div className="flex justify-center items-center w-full h-screen">
  <svg
    className="animate-spin h-10 w-10 text-[#380A48]"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8v8h8a8 8 0 11-16 0z"
    ></path>
  </svg>
</div>
</div>;

  if (error) return <div className="text-center py-8  text-red-500">{error}</div>;
  if (!blogDetails) return null;

  return (
    <article className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-4">
        <span className="bg-[#380A48E3] text-white px-3 py-1 rounded-[50px] text-sm">
          {blogDetails.category || 'Health/Travel'}
        </span>
      </div>
      
      <h1 className="text-4xl font-bold mb-4">
        {blogDetails.title || 'Common Challenges Nurses Face When Moving Abroad & How to Overcome Them'} 

      </h1>
      
      <div className="flex items-center space-x-4 mb-8 text-gray-600">
        <span className='flex gap-1 items-center'>
            {blogDetails.author || (<><CgProfile />  Tracey Wilson</>)}            
            </span>
        <span>•</span>
        <span>
            {/* {blogDetails.author?.date} */}
            August 20, 2022
        </span>
        <span>•</span>
        <span>
            {blogDetails.readTime || ' 5 min reads'}
        </span>
      </div>
      
      <img
        src={blogDetails.image_url  || '/Frame 1000009724.png'}
        alt={ 'oversabi Blog Details'}
        className="w-full h-96 object-cover rounded-lg mb-8"
      />
      
      <div className="prose max-w-none text-[#98A2B3]">
        <>
            {blogDetails.content || (<></>)}
        </>
      </div>
    </article>
  );
};


export default BlogDetailsPage;