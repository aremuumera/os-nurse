import React from "react";
import { MdOutlineArrowOutward } from "react-icons/md";
import { motion, useAnimation } from "framer-motion";

const HeroSection = () => {
  // Animation controls
  const helloControls = useAnimation();
  const imControls = useAnimation();
  const imageControls = useAnimation();
  const buttonControls = useAnimation();

  // Sequence of animations
 React.useEffect(() => {
  // Preload images (keep this part as is)
  const preloadImages = () => {
    const imagePaths = [
      "/oversabinurse/hero1.png",
      "/oversabinurse/hero2.png",
      "/oversabinurse/Oversabi-Nurse.svg",
      "/oversabinurse/quote-up.png",
      "/oversabinurse/reviews.svg"
    ];
    
    imagePaths.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  };
  
  preloadImages();
  
  // Use fixed delays instead of sequential animations
  helloControls.start({
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 120, damping: 14, delay: 0.1 },
  });

  imControls.start({
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 120, damping: 14, delay: 0.3 },
  });

  imageControls.start({
    opacity: 1,
    transition: { duration: 0.4, ease: "easeOut", delay: 0.5 },
  });

  buttonControls.start({
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 120, damping: 15, delay: 0.7 },
  });
  
}, [helloControls, imControls, imageControls, buttonControls]);

  return (
    <div className="h-full bg-white">
      {/* Hero Content */}
      <div className="max-w-[1280px] md:mx-auto px-4  pt-[160px] lg:pt-[150px]">
        <div className="relative">
          {/* Hello Badge */}
          <motion.div 
          initial={{ y: 170, opacity: 0 }}
          animate={helloControls}
          className="flex justify-center">
            <div
              className="relative"
              
            >
              <div className="bg-white px-5 md:px-7 py-2 md:py-3 mb-4 rounded-full border-[1px] border-gray-600">
                Hello!
              </div>
              <div className="absolute -right-8 -top-6 w-10 md:w-auto">
                <img
                  src="/oversabinurse/hero2.png"
                  alt="os-nurse"
                  className="w-full"
                />
              </div>
            </div>
          </motion.div>

          <div className="gap-12">
            {/* Left Content */}
            <motion.div
            initial={{ y: 70, opacity: 0 }}
            animate={imControls}
             className="w-full relative z-10">
              <h1
                className="text-4xl md:text-6xl md:mx-auto lg:text-8xl !font-urbanist font-[600] mb-6 text-center"
                
              >
                I'm Oversabi <span className="text-primary-mainPink">Nurse</span>
              </h1>

              <div
                className="absolute left-0 md:left-14 top-14 hidden md:block"
                // initial={{ opacity: 0 }}
                // animate={imControls}
              >
                <img
                  src="/oversabinurse/hero1.png"
                  alt="os-nurse"
                  className=""
                />
              </div>

              <div className="lg:block hidden relative">
                <motion.div 
                 initial={{ y: 70, opacity: 0 }}
                 animate={imControls}
                className="absolute -left-8 max-w-[338px] -bottom-[180px] hidden md:block">
                  <img
                    src="/oversabinurse/quote-up.png"
                    alt="os-nurse"
                    className=""
                  />
                  <p className="text-gray-500 pt-2 text-xl">
                    I turned my nursing career into a global success—now it's your
                    turn
                  </p>
                </motion.div>
                {/* Mobile quote */}
                <motion.div 
                 initial={{ y: 70, opacity: 0 }}
                 animate={imControls}
                className="md:hidden text-center mb-8">
                  <img
                    src="/oversabinurse/quote-up.png"
                    alt="os-nurse"
                    className="mx-auto w-12 mb-2"
                  />
                  <p className="text-gray-500 text-lg px-4">
                    I turned my nursing career into a global success—now it's your
                    turn
                  </p>
                </motion.div>
              </div>

              <motion.div 
               initial={{ y: 70, opacity: 0 }}
               animate={imControls}
              className="lg:block hidden relative">
                <div className="absolute -right-6 -bottom-[180px] hidden md:block">
                  <img
                    src="/oversabinurse/reviews.svg"
                    alt="os-nurse"
                    className=""
                  />
                  <div>
                    <div className="text-4xl font-bold py-2">10 Years</div>
                    <div className="text-gray-500 text-right">Experience</div>
                  </div>
                </div>
                {/* Mobile reviews */}
                <div className="md:hidden text-center mb-8">
                  <img
                    src="/oversabinurse/reviews.svg"
                    alt="os-nurse"
                    className="mx-auto w-32 mb-2"
                  />
                  <div>
                    <div className="text-3xl font-bold py-1">10 Years</div>
                    <div className="text-gray-500">Experience</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Content - Image Section */}
            <motion.div 
            initial={{ opacity: 0 }}
            animate={imageControls}
            className="w-full max-w-[1000px] -mt-[40px] lg:-mt-[70px] mx-auto relative">
              <div className="absolute md:-bottom-[190px] -bottom-[100px] left-0 right-0 w-[60%] md:w-[100%] h-[120%] max-w-[300px] md:max-w-[400px] mx-auto aspect-square -rotate-90 rounded-e-[850px] !rounded-ee-[1000px] bg-primary-main" />
              <img
                src="/oversabinurse/Oversabi-Nurse.svg"
                alt="Professional nurse portrait"
                className="relative z-10 w-full max-w-[320px] md:max-w-[660px] mx-auto h-auto"
                
              />
            </motion.div>

            {/* Button Group */}
            <motion.div
              className="relative w-full max-w-[1000px] mx-auto flex justify-center !z-[1200] -mt-[80px] md:-mt-[150px]"
              initial={{ y: 40, opacity: 0 }}
              animate={buttonControls}
            >
              <div className="flex flex-row bg-[#ffffff33] rounded-full border-[1px] backdrop-blur-sm border-white gap-1 md:gap-0 px-2 py-2 md:px-2">
                <button className="relative tracking-tighter md:tracking-normal text-[.85rem] md:text-[20px] z-[1200] px-2 md:px-12 py-3 md:py-4 bg-primary-mainPink text-white rounded-full hover:bg-pink-600 transition shadow-lg flex items-center justify-center md:justify-start gap-2 group">
                  Book a consultation
                  <MdOutlineArrowOutward className="w-5 md:text-[20px] text-[.85rem] h-5 transition-transform group-hover:translate-x-1" />
                </button>
                <button className="relative px-2 md:px-8 md:text-[20px] text-[.85rem] py-3 md:py-4 text-white transition">
                  Partner With Us
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;