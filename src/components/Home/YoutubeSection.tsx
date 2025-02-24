import React, { useState } from 'react';
import YouTube from 'react-youtube'; // Optional: For better control over the YouTube player

const LandingPage = () => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // YouTube video ID (extracted from the URL)
  const youtubeVideoId = 'TUwCutSyLOHoBcQR'; // Replace with the actual video ID

  // Options for the YouTube player
  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1, // Autoplay when the video starts
    },
  };

  // Handle play button click
  const handlePlayButtonClick = () => {
    setIsVideoPlaying(true);
  };

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

        {/* Video Section */}
        <div className="relative mt-10 w-full max-w-7xl mx-auto aspect-video bg-gray-800 rounded-lg overflow-hidden">
          {isVideoPlaying ? (
            // YouTube iframe or react-youtube player
            <YouTube
              videoId={youtubeVideoId}
              opts={opts}
              className="w-full h-full"
            />
          ) : (
            // Play button overlay
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                onClick={handlePlayButtonClick}
                className="w-24 h-24 bg-primary-main rounded-full flex items-center justify-center hover:bg-pink-600 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-12 h-12 text-white"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default LandingPage;