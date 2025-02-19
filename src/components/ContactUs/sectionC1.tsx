import React, { useState } from 'react';
import { ChevronDownIcon, ChevronRightIcon } from 'lucide-react';
import { IoCallOutline, IoLocationOutline } from 'react-icons/io5';

interface AppointmentFormData {
  name: string;
  email: string;
  date: string;
  time: string;
  description: string;
}

const AppointmentBookingPage: React.FC = () => {
  const [formData, setFormData] = useState<AppointmentFormData>({
    name: '',
    email: '',
    date: '',
    time: '',
    description: '',
  });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
    alert('Appointment request submitted!');
  };



  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 bg-white rounded-lg overflow-hidden shadow-md">
        {/* Left Section - Map and Contact Info */}
        <div className="bg-gray-100 p-2 lg:p-6">
          {/* Map */}
          <div className="relative h-64 mb-6 bg-gray-200 rounded-lg overflow-hidden">
            <img 
              src="/oversabinurse/map.png" 
              alt="Office Location Map" 
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3/4 w-full max-w-[480px] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-purple-900 rounded-full flex items-center justify-center flex-shrink-0">
                    {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                    </svg> */}
                    <IoLocationOutline className='text-[24px] text-white' />
                </div>
                <div>
                    <h3 className="font-bold text-lg">Office Address</h3>
                    <p className="text-gray-600">1441 Morris Ave, Union, NJ 07083</p>
                </div>
                </div>
            </div>
          </div>

          {/* Contact Info Cards */}
          <div className="space-y-6">
            {/* Office Address */}
            <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-purple-900 rounded-full flex items-center justify-center flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg">Office Address</h3>
                <p className="text-gray-600">1441 Morris Ave, Union, NJ 07083</p>
              </div>
            </div>

            {/* Office Timings */}
            <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-purple-900 rounded-full flex items-center justify-center flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg">Office Timings</h3>
                <p className="text-gray-600">Monday - Saturday (9:00am to 5pm)</p>
                <p className="text-gray-600">Sunday (Closed)</p>
              </div>
            </div>

            {/* Email Address */}
            <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-purple-900 rounded-full flex items-center justify-center flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                  <path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0-8 0"></path>
                  <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg">Email Address</h3>
                <p className="text-gray-600">Smile01@gmail.com</p>
              </div>
            </div>

            {/* Phone Number */}
            <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-purple-900 rounded-full flex items-center justify-center flex-shrink-0">
                {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg> */}
                <IoCallOutline className='text-[28px] text-white' />
              </div>
              <div>
                <h3 className="font-bold text-lg">Phone Number</h3>
                <p className="text-gray-600">+1-2064512559</p>
              </div>
            </div>

            {/* Live Chat */}
            <div className="flex items-start space-x-4 p-4 bg-white rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-purple-900 rounded-full flex items-center justify-center flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-lg">Live Chat</h3>
                <p className="text-gray-600">+1-2064512559</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Booking Form */}
        <div className="p-6 md:p-10">
          <div className="mb-6 text-center md:text-left">
            <button className="inline-flex items-center px-6 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50">
              Book an appointment
            </button>
          </div>

          <h1 className="text-3xl md:text-4xl font-semibold mb-8 text-center md:text-left">
            Book Your Appointment by Filling in This Form Below
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block mb-2 font-medium">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="Eamial@gmail.com"
                  required
                />
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block mb-2 font-medium">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="Input Email"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Date Field */}
              <div>
                <label htmlFor="date" className="block mb-2 font-medium">Date</label>
                <div className="relative">
                  <select
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="appearance-none w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    required
                  >
                    <option value="" disabled selected>Choose Date</option>
                    <option value="2025-02-18">February 18, 2025</option>
                    <option value="2025-02-19">February 19, 2025</option>
                    <option value="2025-02-20">February 20, 2025</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <ChevronDownIcon className="h-5 w-5" />
                  </div>
                </div>
              </div>

              {/* Time Field */}
              <div>
                <label htmlFor="time" className="block mb-2 font-medium">Time</label>
                <div className="relative">
                  <select
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={(e) => setFormData({...formData, time: e.target.value})}
                    className="appearance-none w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    required
                  >
                    <option value="" disabled selected>Choose Time</option>
                    <option value="09:00">9:00 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="13:00">1:00 PM</option>
                    <option value="14:00">2:00 PM</option>
                    <option value="15:00">3:00 PM</option>
                    <option value="16:00">4:00 PM</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <ChevronDownIcon className="h-5 w-5" />
                  </div>
                </div>
              </div>
            </div>

            {/* Description Field */}
            <div>
              <label htmlFor="description" className="block mb-2 font-medium">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={6}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="hyyyyyyyyyyyyy"
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full flex items-center justify-center space-x-2 bg-primary-mainPink hover:bg-primary-mainPink text-white py-4 px-6 rounded-full font-medium text-lg transition duration-200"
            >
              <span>Send Message</span>
              <span className="bg-white text-black  rouned-md p-[4px] rounded-full"><ChevronRightIcon className="h-4 w-4" /></span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AppointmentBookingPage;