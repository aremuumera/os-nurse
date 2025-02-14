// import React from 'react';
import { MdOutlineArrowOutward } from 'react-icons/md';

// interface ImpactSectionProps {
//   title: string;
//   description: string;
//   nurseImage: string;
//   leaderImage: string;
//   ctaText: string;
//   onCtaClick: () => void;
// }

const AboutSection = () => {
  return (
    <section className="container relative mx-auto px-4 py-12 max-w-6xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left column with title and nurse image */}
        <div className="flex flex-col">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-10">
            {'Impacting lives in Africa and beyond'}
          </h1>
          <div className="relative h-96 md:h-[698px] w-full overflow-hidden ">
            <img
              src={'/oversabinurse/os-6.png'}
              alt="Healthcare professional in scrubs"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right column with leader image and description */}
        <div className="flex flex-col">
          <div className="relative h-96 md:h-[618px] w-full overflow-hidden  ">
            <img
            loading='lazy'
              src={'/oversabinurse/os-image2.svg'}
              alt="Healthcare leader in professional attire"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="bg-white pt-4 rounded-lg">
            <p className="text-[#98A2B3] text-base  leading-relaxed mb-6">
              {"OverSabiNurse's mission is to simplify complex medical and lifestyle information into easy-to-understand concepts. Through engaging social media content and detailed YouTube videos, the goal is to provide people with the knowledge needed to make informed health decisions"}
            </p>
            <button
              className="inline-flex items-center px-6 py-3 rounded-full border border-pink-500 text-pink-500 hover:bg-pink-50 transition-colors duration-200"
            >
              {'Read More'}
              <MdOutlineArrowOutward className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

