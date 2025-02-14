




const LandingPage = () => {
  return (
    <div className="h-full relative mt-4 lg:mt-12 !z-[22200] bg-primary-main overflow-hidden">
      {/* Hero Section with Video */}
      <section className="px-4 max-w-[1300px] mx-auto py-12 md:py-20">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <h1 className="text-2xl sm:text-4xl md:text-5xl max-w-[450px] w-full font-bold text-white mb-4">
            Get the assistance you need.
          </h1>
          <p className="text-gray-300 text-[16px] w-full max-w-md mb-8">
            Moving abroad as a nurse can feel overwhelming, but you don't have to do it alone. I'll guide you through every step—from licensing and job applications to relocation and thriving in a new country.
          </p>
        </div>


        <div className="w-full max-w-7xl mx-auto flex justify-center items-center">
          <img src="/youtube-img.png" alt="" />
        </div>
        
        {/* Video Section */}
        {/* <div className="relative mt-10 w-full max-w-7xl mx-auto aspect-video bg-gray-800 rounded-lg overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center">
            <button className="w-16 h-16 bg-primary-main rounded-full flex items-center justify-center hover:bg-pink-600 transition">
              <Play className="w-8 h-8 text-white" />
            </button>
          </div>
        </div> */}
      </section>
    </div>
  );
};

export default LandingPage;
