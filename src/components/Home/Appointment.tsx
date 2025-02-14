import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

interface AppointmentFormData {
  name: string;
  email: string;
  date: string;
  time: string;
  description: string;
}

const Appointment = () => {
  const [formData, setFormData] = useState<AppointmentFormData>({
    name: '',
    email: '',
    date: '',
    time: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      date: '',
      time: '',
      description: ''
    });
    setIsSubmitting(false);
  };

  // Generate time slots
  const generateTimeSlots = () => {
    const slots = [];
    for (let i = 9; i <= 17; i++) {
      slots.push(`${i}:00`);
      slots.push(`${i}:30`);
    }
    return slots;
  };

  return (
    <div className="h-full bg-[#380a48e0]  px-4 pt-28">
      <div className="mx-auto  max-w-7xl w-full bg-transparent  flex flex-col lg:flex-row">
        
        {/* Form Section */}
        <div className="p-8 mb-20 lg:p-12 rounded-3xl bg-white  flex-1">
          <div className="inline-block px-6 text-[20px] py-2 font-[400] rounded-full border-[1px] border-black text-gray-700 mb-6">
            Book an appointment
          </div>
          
          <h1 className="sm:text-3xl text-[22px] lg:text-4xl font-bold text-gray-800 mb-8">
            Book Your Appointment by<br />
            Filling in This Form Below
          </h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name Field */}
              <div>
                <label className="block text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:bg-primary-mainPink focus:border-transparent transition-all"
                  required
                />
              </div>
              
              {/* Email Field */}
              <div>
                <label className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Input Email"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:bg-primary-mainPink focus:border-transparent transition-all"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Date Field */}
              <div>
                <label className="block text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:bg-primary-mainPink focus:border-transparent transition-all"
                  required
                />
              </div>
              
              {/* Time Field */}
              <div>
                <label className="block text-gray-700 mb-2">Time</label>
                <select
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:bg-primary-mainPink focus:border-transparent transition-all"
                  required
                >
                  <option value="">Choose Time</option>
                  {generateTimeSlots().map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Description Field */}
            <div>
              <label className="block text-gray-700 mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Tell us about your needs..."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:primary-mainPink focus:border-transparent transition-all h-32 resize-none"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary-mainPink  hover:primary-mainPink text-white font-semibold py-3 rounded-full flex items-center justify-center gap-2 transition-colors disabled:opacity-70"
            >
              Send Message
             <span className='bg-white text-primary-mainPink p-2 rounded-full' ><ArrowRight className="w-5 h-5" /></span> 
            </button>
          </form>
        </div>

        {/* Image Section */}
        <div className="hidden lg:block -ml-20 flex-1 relative">
          <img
            src="/oversabinurse/oversabdd 1.svg"
            alt="Doctor"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Appointment;