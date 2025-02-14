import { useState, useEffect, useCallback } from 'react';
// import { QuoteIcon } from 'lucide-react';

interface Testimonial {
  id: number;
  text: string;
  author: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    text: "You will pay huge consultation fee and go to the hospital, yet no one will sit and break down this hard truth for you! Sabi Nurse, you're doing God's work. Thank you.",
    author: "Jennifer Anderson",
    image: "oversabinurse/testi1img.svg"
  },
  {
    id: 2,
    text: "You will pay huge consultation fee and go to the hospital, yet no one will sit and break down this hard truth for you! Sabi Nurse, you're doing God's work. Thank you.",
    author: "Robert Johnson",
    image: "oversabinurse/testi2img.svg"
  },
  {
    id: 3,
    text: "You will pay huge consultation fee and go to the hospital, yet no one will sit and break down this hard truth for you! Sabi Nurse, you're doing God's work. Thank you.",
    author: "Jennifer Anderson",
    image: "oversabinurse/testi3img.svg"
  },
  {
    id: 4,
    text: "This is another testimonial to show the sliding effect.",
    author: "Jane Doe",
    image: "oversabinurse/testi2img.svg"
  },
  {
    id: 5,
    text: "You will pay huge consultation fee and go to the hospital, yet no one will sit and break down this hard truth for you! Sabi Nurse, you're doing God's work. Thank you. ",
    author: "John Smith",
    image: "oversabinurse/testi1img.svg"
  }
];

const TestimonialsSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  // const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const isAutoPlaying = true
  const autoPlayDuration = 5000;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  }, []);

  // const prevSlide = useCallback(() => {
  //   setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  // }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isAutoPlaying) {
      intervalId = setInterval(nextSlide, autoPlayDuration);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isAutoPlaying, nextSlide]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Our Testimonials
        </h2>
        <p className="text-lg text-[#98A2B3] max-w-2xl mx-auto">
          Our satisfied clients share their success stories and experiences on their journey to better health and well-being.
        </p>
      </div>

      {/* Testimonials Slider */}
      <div className="relative overflow-hidden">
        {/* Slider Container */}
        <div
          className="flex gap-4 relative transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(calc(-${currentSlide * (100 / testimonials.length)}%))`,
            width: `${testimonials.length * (100 / testimonials.length)}%`
          }}
        >
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className={`w-full max-w-[405px]  rounded-2xl  h-full  flex-shrink-0`}
            >
              <div className="bg-[#fbfdef] h-full  relative">
                <div className="p-8 min-h-[300px]">
                  <img
                    src={'/oversabinurse/Text-quote.svg'}
                    alt={'quote'}
                    className="mb-6"
                  />
                    <p className="text-gray-800  text-lg md:text-[14px] leading-[1.5]">
                      {testimonial.text}
                    </p>
                </div>
                <div className="flex absolute bottom-0 right-0 left-0 items-center !mt-auto gap-4 bg-[#FCEAF4] p-4 rounded-xl">
                  <img
                    src={testimonial.image}
                    alt={testimonial.author}
                    className="w-12 h-12 "
                  />
                  <span className="font-medium text-gray-900">
                    {testimonial.author}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Indicators */}
      <div className="flex justify-center gap-2 mt-8">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={` h-2 rounded-full transition-colors ${
              index === currentSlide ? 'bg-primary-mainPink w-8' : 'bg-gray-200 w-2'
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default TestimonialsSlider;