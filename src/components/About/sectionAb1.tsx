// import React from 'react';



const SectionAb1 = () => {
  return (
    <section className="container mx-auto px-4 py-12 md:py-16 grid grid-cols-1 lg:grid-cols-2  items-center">
      {/* Text Content */}
      <div className="max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Our Vision</h1>
        
        <p className="text-lg text-[#98A2B3] mb-8 leading-relaxed">
          {'To create a compassionate and empowering community where nurses feel valued, supported, and inspired to share their experiences, grow professionally, and uplift one another in a safe and inclusive environment. '}
        </p>
        
        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
          {'More than anything else we love creating happy, healthy smiles.'}
        </h2>
        
        <div className="mt-8">
          <h2 className="text-xl inline md:text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-[#98A2B3] inline leading-relaxed">
            <span className="font-medium"> is </span>
            {' To provide a dedicated platform for nurses to express their challenges and triumphs, enrich their knowledge through shared experiences and resources, and foster a culture of mutual support that strengthens their personal and professional well-being. To share professional resources that benefits health care workers'}
          </p>
        </div>
      </div>
      
      {/* Image */}
      <div className="relative h-[400px] lg:pt-0 pt-10  md:h-[600px] rounded-lg overflow-hidden">
        <img 
          src={'/oversabinurse/os-portrait.png'} 
          alt={'Professional portrait'}
          className="w-full h-full object-contain" 
        />
      </div>
    </section>
  );
};

export default SectionAb1;