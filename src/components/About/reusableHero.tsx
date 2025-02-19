// components/HeroSection.tsx
import React from 'react';

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  bgImage?: string;
  bgOverlay?: boolean;
  textColor?: string;
  align?: 'left' | 'center' | 'right';
  highlightWords?: {
    [key: string]: string; // word: color
  };
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  textColor = 'text-white',
  align = 'center',
  highlightWords = {},
}) => {
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  // Replace words with highlighted versions
  const highlightText = (text: string) => {
    let result = text;
    
    Object.keys(highlightWords).forEach((word) => {
      const color = highlightWords[word];
      const regex = new RegExp(`\\b${word}\\b`, 'gi');
      result = result.replace(regex, `<span class="${color}">$&</span>`);
    });
    
    return <span dangerouslySetInnerHTML={{ __html: result }} />;
  };

  return (
    <section className="relative pt-16  w-full h-[420px]" style={{
        backgroundImage: `url(${'/oversabinurse/os-nur.jpeg'})` ,
        backgroundSize: 'cover',
        backgroundPosition: '50% 18%',
        backgroundRepeat: 'no-repeat'

      }}>
        <div className="absolute inset-0 bg-[#5C5353BD] z-10"></div>
  
        <div className={`relative z-20 w-full max-w-7xl mx-auto px-4 py-16 md:py-32 ${alignmentClasses[align]} h-full flex flex-col justify-center`}>
          <h1 className={`text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight ${textColor}`}>
            {highlightText(title)}
          </h1>
          
          {subtitle && (
            <p className={`text-lg md:text-xl max-w-3xl mx-auto leading-relaxed ${align === 'center' ? 'mx-auto' : align === 'right' ? 'ml-auto' : ''} ${textColor ? textColor.replace('text-', 'text-opacity-90 text-') : ''}`}>
              {highlightText(subtitle)}
            </p>
          )}
        </div>
      </section>
  );
};

export default HeroSection;