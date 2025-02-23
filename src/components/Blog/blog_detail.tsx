
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

  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;
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
        src={blogDetails.cover_url || '/Frame 1000009724.png'}
        alt={ 'oversabi Blog Details'}
        className="w-full h-96 object-cover rounded-lg mb-8"
      />
      
      <div className="prose max-w-none text-[#98A2B3]">
        <>
            {blogDetails.content || (<>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam posuere consequat eros, ac facilisis massa laoreet vel. Phasellus accumsan molestie facilisis. Etiam pellentesque, risus in dapibus auctor, ligula erat placerat nibh, et gravida magna nunc id risus. Vivamus iaculis mi a lectus viverra, sit amet feugiat ante consequat. Duis nunc leo, pulvinar sit amet gravida sed, scelerisque et purus. Donec iaculis maximus orci, sed sodales massa pretium sit amet. Etiam non mauris in eros molestie consectetur. Cras et nisl condimentum, feugiat mauris non, eleifend enim. Sed condimentum dolor pharetra purus congue cursus. Donec et vehicula felis, eget interdum velit. Nulla semper erat et sapien faucibus cursus. Integer vitae convallis eros.

Duis efficitur purus sed justo tristique vulputate. Sed fringilla odio ut mattis pulvinar. Pellentesque aliquam dapibus varius. Sed vitae nibh nec lectus volutpat dapibus a vitae diam. Cras congue, ipsum ac consequat mollis, nisi mi condimentum elit, et luctus nisl velit ac augue. Nullam efficitur tellus bibendum dui accumsan, non pharetra metus facilisis. Ut imperdiet viverra magna, non condimentum lorem eleifend eu. Morbi vehicula pharetra tempus. Sed semper eget elit quis aliquet. Fusce ultricies at sapien eu porta.<br /> <br /> 

Suspendisse congue consequat lorem eu ultrices. Sed varius pretium gravida. Morbi pellentesque volutpat dolor, vitae volutpat libero finibus quis. Donec vel elit efficitur, sagittis tellus eget, molestie massa. Aliquam rhoncus pretium lacus, vitae ornare lorem ultrices ut. Sed facilisis commodo dictum. Nam tempus mollis dui, eu scelerisque nibh vulputate at. Donec tellus tellus, vestibulum vel nisi at, mattis varius mauris. Duis sed massa gravida, imperdiet sem ut, mattis elit. Quisque volutpat odio vitae pulvinar suscipit.<br /> <br/>

Integer egestas nisi eu porta fringilla. Nam fermentum mi id ultricies accumsan. Donec lacus erat, rutrum a luctus at, ornare eget mi. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vivamus ac tempor quam. Nullam vulputate a nunc sed venenatis. Donec vel porttitor massa, ac pharetra enim. Donec facilisis orci nec porttitor posuere. In ullamcorper egestas diam vitae elementum. Praesent scelerisque, arcu a tincidunt molestie, quam neque semper ipsum, id finibus velit tortor nec ligula. Vivamus ligula nisi, tincidunt quis condimentum in, vestibulum vel felis. Sed tincidunt turpis nec metus lobortis, et varius urna aliquam.

Morbi in sapien luctus, dignissim sapien non, condimentum velit. Suspendisse potenti. Vestibulum in aliquam tellus. Praesent quis cursus quam, quis tincidunt odio. Morbi interdum sapien id lacus auctor, id venenatis neque ullamcorper. Sed quis sem sed ipsum tincidunt consequat. In commodo tristique nisi. Nulla interdum nec dui sit amet ornare. Sed vel ipsum purus. Curabitur porttitor a sem et interdum. Donec varius gravida erat, a consequat risus convallis at. Mauris rutrum tellus quis nunc fermentum, ut ultrices justo imperdiet. Cras efficitur sit amet ipsum maximus rutrum.
</>)
        }
        </>
      </div>
    </article>
  );
};


export default BlogDetailsPage;