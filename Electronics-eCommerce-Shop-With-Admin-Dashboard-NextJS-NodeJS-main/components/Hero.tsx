// *********************
// Role of the component: Classical hero component on home page
// Name of the component: Hero.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.0
// Component call: <Hero />
// Input parameters: no input parameters
// Output: Classical hero component with two columns on desktop and one column on smaller devices
// *********************

import Image from "next/image";
import React from "react";
// ... (keep the imports at the top)

const Hero = () => {
  return (
   <div className="bg-[var(--secondary)] text-white min-h-screen px-6 md:px-12 flex flex-row items-center justify-between gap-12">
      
      {/* Text Section */}
<div className="md:w-3/4 flex flex-col items-center text-center px-8 md:px-16">
    <h1 className="font-extrabold text-5xl md:text-6xl mb-6 leading-tight">
        תווים לפסנתר <br /> לכל שיר בעברית
    </h1>
        
        <p className="text-xl text-gray-300 mb-10 max-w-xl md:max-w-lg">
          המאגר המקצועי ביותר בישראל לתווים לפסנתר.<br />  
          כל הלהיטים בעברית בתווים מקצועים מדויקים ואיכותיים לפסנתר למתחיל, ולמתקדם
        </p>
        
        <div className="flex gap-4">
          <button className="bg-[var(--primary)] text-[var(--secondary)] px-10 py-4 font-semibold rounded-full hover:bg-white hover:text-[var(--primary)] transition duration-300">
            למאגר 
          </button>
        </div>
      </div>

      {/* Image Section - UPDATED TO BGImage */}
      <div className="md:w-1/2 flex justify-center md:justify-end">
        <Image 
          src="/BGImage.jpg"  // <--- Check your extension! Use .jpg, .png, or .jpeg based on your file.
          alt="תווים על פסנתר"
          width={700}
          height={700}
          className="rounded-xl shadow-2xl object-cover" // Added object-cover for a cleaner modern look
          priority
        />
      </div>
    </div>
  );
};

export default Hero;