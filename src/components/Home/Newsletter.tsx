import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

const NewsletterSubscription: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      // Replace with your actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Submitted email:', email);
      setEmail('');
      alert('Thank you for subscribing!');
    } catch (error) {
      console.error('Error submitting form:', error);
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
      {/* Background overlay */}
      <div className="absolute inset-0 bg-primary-main opacity-80"></div>
      
      <div className="bg-white rounded-3xl overflow-hidden max-w-7xl w-full shadow-xl flex flex-col md:flex-row relative z-10">
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
                className="flex-1 px-6 py-4 rounded-full lg:bg-transparent bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 font-[400] rounded-full bg-primary-mainPink text-white flex items-center justify-center gap-2 hover:bg-pink-600 transition-colors disabled:opacity-70"
              >
                Subscribe Now
                <span className="bg-white text-primary-mainPink p-2 rounded-full">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </button>
            </div>
         
         
          </form>
        </div>
        
        {/* Right Image */}
        <div className="flex-1 relative min-h-[300px] md:min-h-[unset]">
          <img
            src="/oversabinurse/os-image2.svg"
            alt="Professional woman in business attire"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default NewsletterSubscription;