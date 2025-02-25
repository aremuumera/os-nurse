import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { allPaths } from '../../utils/path';

const OversabiNurseSection: React.FC = () => {
  return (
    <div className="bg-gray-50 flex items-center p-4 md:p-8 lg:p-16">
      <div className="max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
          {/* Image Section with Orange Background */}
          <div className="w-full md:w-1/2 relative">
            <div className="aspect-square max-w-lg mx-auto">
              <div className="absolute inset-0  transform -translate-y-4"></div>
              <img
                src="/oversabinurse/os-3.svg" 
                alt="Professional nurse with stethoscope"
                className="relative z-10 w-full h-full object-cover "
              />
            </div>
          </div>

          {/* Content Section */}
          <div className="w-full md:w-1/2 space-y-8 text-left">
            <h2 className="text-4xl md:text-5xl font-bold">
              Why <span className="text-primary-mainPink">Oversabi Nurse</span>?
            </h2>
            
            <p className="text-[#98A2B3] text-lg leading-relaxed">
              Relocating abroad as a medical professional can feel overwhelming, but you don't have to do it alone. 
              At OversabiNurse, we provide expert guidance and practical resources to help you navigate every step 
              of your journey with confidence.
            </p>

            {/* Statistics */}
            <div className="flex flex-col sm:flex-row gap-8 sm:gap-16 py-6">
              <div className="space-y-2">
                <h3 className="text-4xl font-bold text-gray-800">450+</h3>
                <p className="text-[#98A2B3]">Project Completed</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-4xl font-bold text-gray-800">450+</h3>
                <p className="text-[#98A2B3]">Project Completed</p>
              </div>
            </div>

            {/* Contact Button */}
            <div>
              <Link to={allPaths.contact} className="bg-primary-mainPink hover:bg-primary-mainPink text-white font-medium rounded-full px-8 py-3 inline-flex items-center transition duration-300 ease-in-out">
                Contact Me
                <span className="ml-2 bg-white rounded-full p-1">
                  <ArrowRight className="h-4 w-4 text-primary-mainPink " />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OversabiNurseSection;