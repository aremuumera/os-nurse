



const HeroSection = () => {
  return (
    <div className="relative  bg-primary-main mb-10 lg:h-[700px] h-[825px] pt-[60px] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center py-12">
          {/* Left Content */}
          <div className="text-white max-w-xl z-10">
            <span className="text-sm md:text-base italic">
              Internationally Bestselling Book
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-[500] mt-4 mb-6">
              2-Week Plan to Jump-Start Your Travel Journey
            </h1>
            <p className="text-lg md:text-xl mb-8">
              Check out the new book by Oversabi Nurse to find out how to stay healthy and support your body.
            </p>
            <button className="bg-primary-mainPink hover:bg-primary-mainPink text-white px-8 py-3 rounded-full text-lg transition-colors">
              Meet Our Best Seller
            </button>
          </div>

          {/* Right Content - Images */}
          <div className="relative h-[400px] md:h-[500px] lg:h-[600px] mt-8 lg:mt-0">
            {/* Container for better mobile positioning */}
            <div className="relative h-full lg:mx-0 mx-auto max-w-[320px] md:max-w-[450px] lg:max-w-none">
              {/* Author Image */}
              <div className="absolute -left-10 bottom-11  sm:-left-[100px] lg:-left-[110px] sm:bottom-0 w-full h-full z-10">
                <img
                  src="/oversabinurse/sabiii 1.png"
                  alt="Author"
                  className="h-full w-full object-contain object-bottom"
                />
              </div>
              
              {/* Book Image */}
              <div className="absolute -right-4 sm:-right-[90px] lg:-right-16 top-1/4 w-3/4 lg:w-2/3 z-20 transform">
                <img
                  src="/oversabinurse/home-book-11.svg"
                  alt="Natural Healing, Simplified Book"
                  className="w-full h-auto shadow-2xl rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>     
    </div>
  );
};

export default HeroSection;