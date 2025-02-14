import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, ArrowRight, } from 'lucide-react';
import { MdOutlineArrowOutward } from 'react-icons/md';

interface BlogArticle {
  id: number;
  number: string;
  date: string;
  title: string;
  image: string;
  link: string;
}

const BlogArticleCarousel: React.FC = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const articles: BlogArticle[] = [
    {
      id: 1,
      number: '01',
      date: 'January 12, 2024',
      title: 'Limit your time playing with gadgets to maintain eye health',
      image: '/oversabinurse/bl-1.png',
      link: '/blog/eye-health'
    },
    {
      id: 2,
      number: '02',
      date: 'January 13, 2024',
      title: 'Everything you need to know about We Wellness Hospital',
      image: '/oversabinurse/blog-2.png',
      link: '/blog/wellness-hospital'
    },
    {
      id: 3,
      number: '03',
      date: 'January 14, 2024',
      title: 'Limit your time playing with screens to maintain eye health',
      image: '/oversabinurse/bl-1.png',
      link: '/blog/screen-time'
    },
    {
      id: 4,
      number: '04',
      date: 'January 15, 2024',
      title: 'The importance of regular health check-ups',
      image: '/oversabinurse/blog-2.png',
      link: '/blog/health-checkups'
    }
  ];

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  const checkScrollButtons = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', checkScrollButtons);
      checkScrollButtons(); // Initial check
      return () => carousel.removeEventListener('scroll', checkScrollButtons);
    }
  }, []);

  return (
    <>
    <section className="py-16 pl-6 max-max-w-7xl lg:pl-[120px] flex flex-col gap-9 lg:flex-row mx-auto">
      <div className="mb-10 max-w-[420px] w-full ">
        <div className="inline-block  px-4 py-2 border border-black rounded-full text-sm mb-4">
          From the blog
        </div>
        <h2 className="text-5xl md:text-5xl font-bold text-primary-main mb-4">
          Browse our latest articles Updates
        </h2>
        <p className="text-[#98A2B3] max-w-2xl mb-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam hendrerit metus ex, id ullamcorper massa accumsan volutpat.
        </p>
        <a href="/blog" className="inline-flex gap-4 items-center bg-primary-mainPink text-white px-6 py-3 rounded-full hover:bg-pink-600 transition-colors">
          See More Articles
            <span className="bg-white  text-primary-mainPink p-2 rounded-full">
                <ArrowRight className="w-4 h-4" />
              </span> 
         </a>
      </div>


      <div className="overflow-hidden">
      <div 
        ref={carouselRef}
        className="flex gap-6 overflow-x-auto pb-8 scroll-smooth hide-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {articles.map((article) => (
          <div 
            key={article.id}
            className="flex-none w-full sm:w-[calc(100%-1rem)] md:w-[330px] min-h-[500px] flex flex-col"
          >
            <div className={`${article.id === 1 ? 'text-primary-mainPink' : 'text-[#FCEAF4]'} text-pink-300 text-6xl font-light mb-2`}>{article.number}</div>
            <p className="text-primary-mainPink mb-2">{article.date}</p>
            <h3 className="text-[#98A2B3] text-xl mb-4">{article.title}</h3>
            <div className="relative rounded-lg overflow-hidden flex-grow">
              <img 
                src={article.image} 
                alt={article.title}
                className="w-full h-full object-cover"
              />
             <div className="absolute bottom-6 left-3">
  <div className="relative">
    {/* Backdrop that is properly positioned and sized around the link */}
    <div className="absolute inset-0 backdrop-blur-lg bg-[#f3f2f200] rounded-full w-14 h-14"></div>
    
    {/* The link itself */}
    <a href={article.link}
      className="relative bg-white left-1.5 top-[7px] rounded-full p-3 shadow-md hover:bg-pink-50 transition-colors block"
      aria-label={`Read more about ${article.title}`}
    >
      <MdOutlineArrowOutward className="h-5 w-5 text-primary-mainPink" />
    </a>
  </div>
</div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-3 mt-6">
        <button
          onClick={scrollLeft}
          disabled={!canScrollLeft}
          className={`flex items-center justify-center border border-gray-300 rounded-full px-5 py-2 ${
            canScrollLeft ? 'hover:bg-gray-50 !text-primary-mainPink border-primary-mainPink' : 'opacity-50 cursor-not-allowed'
          }`}
          aria-label="Previous articles"
        >
          <ArrowLeft className={`h-5 w-5 ${canScrollLeft ? 'text-primary-mainPink' : 'text-gray-500'}`} />
          <span className="ml-2 ">Prev</span>
        </button>
        <button
          onClick={scrollRight}
          disabled={!canScrollRight}
          className={`flex items-center justify-center border border-gray-300 rounded-full px-5 py-2 ${
            canScrollRight ? 'hover:bg-gray-50 text-primary-mainPink border-primary-mainPink' : 'opacity-50 cursor-not-allowed'
          }`}
          aria-label="Next articles"
        >
          <span className="mr-2">Next</span>
          <ArrowRight className={`h-5 w-5 ${canScrollRight ? 'text-primary-mainPink' : 'text-gray-500'}`} />
        </button>
      </div>
      </div>
     

     
    </section>
    </>
  );
};

export default BlogArticleCarousel;