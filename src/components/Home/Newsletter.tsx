import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { suscriberNewsletter } from '../../redux/newsletter/newsletter_slice';

const NewsletterSubscription: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state?.auth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const resultAction = await dispatch(suscriberNewsletter({ email }));
      
      if (suscriberNewsletter.fulfilled.match(resultAction)) {
        toast(
          <div>
            <p className="font-medium text-black">{(resultAction.payload as { message: string }).message}</p>
          </div>,
          {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            type: "success"
          }
        );
        setEmail('');
        
      } else if (suscriberNewsletter.rejected.match(resultAction)) {
        toast.error((resultAction.payload as any)?.message || 'Failed to subscribe. Please try again.', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (err: unknown) {
      toast.error((err as { message: string })?.message || 'An unexpected error occurred. Please try again.', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      className="h-full bg-primary-main flex items-center justify-center py-[120px] px-4 relative"
      style={{
        backgroundImage: 'url("/oversabinurse/Oversabi-Nurse.svg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundPositionY: 'top center -50px'
      }}
    >
      <ToastContainer />
      {/* Background overlay */}
      <div className="absolute inset-0 bg-primary-main opacity-80"></div>

      <div className="bg-white rounded-3xl overflow-hidden max-w-7xl w-full shadow-xl flex flex-col md:flex-row relative z-10">
        {/* <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center"> */}
          
          {/* Left Content */}
          <div className="p-8 md:p-12 flex-1">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Subscribe to my Newsletter
          </h1>
            
          <p className="text-[#98A2B3] font-[400] mb-4 text-lg">
            Subscribe to my newsletter for expert tips, updates, and exclusive
            insights on moving abroad as a medical professional. Never miss
            an important update!
          </p>

            
          <p className="text-[#98A2B3] mb-8">
            Let me know how you'd like to proceed!
          </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 lg:bg-[#D6D6D6] px-1 rounded-full py-[4px]">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Your Email"
                  className="flex-1 px-6 py-4 rounded-full focus:bg-transparent lg:bg-transparent  text-gray-800 border-none focus:outline-none focus:ring-0 focus:border-transparent"
                  required
                  disabled={isSubmitting || loading}
                />
                
                <button
                  type="submit"
                  disabled={isSubmitting || loading}
                  className={`inline-flex items-center px-8 py-4 border border-transparent text-base font-medium rounded-full text-white 
                    ${isSubmitting || loading 
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500'
                    }`}
                >
                  {isSubmitting || loading ? 'Subscribing...' : (
                    <>
                      Subscribe Now
                    <span className='bg-white ml-3 text-primary-mainPink p-2 rounded-full'>
                      <ArrowRight className=" w-4 h-4" />
                    </span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
          
          {/* Right Image */}
          <div className="relative">
            <img
              src="/oversabinurse/os-image2.svg"
              alt="Newsletter"
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      {/* </div> */}
    </div>
  );
};

export default NewsletterSubscription;