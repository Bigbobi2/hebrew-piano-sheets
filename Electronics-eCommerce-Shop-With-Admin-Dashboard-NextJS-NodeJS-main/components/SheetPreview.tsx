'use client';
import { useState } from 'react';
import Image from "next/image";
import { ChevronRight, ChevronLeft } from 'lucide-react';

export default function SheetPreview({ mainImage, title }: { mainImage: string, title: string }) {
  const [currentPage, setCurrentPage] = useState(1);
  
  // Logic to swap the image path: 
  // It takes "/SomeWhereOnlyWeKnow/Somewhere Only We Know_page_1.png" 
  // and changes the "1" to "2"
  const getImagePath = (page: number) => {
    return mainImage.replace('_page_1.png', `_page_${page}.png`);
  };

  return (
    <div className="relative group border border-gray-200 shadow-xl rounded-md bg-white p-2 h-fit">
      <Image
        src={getImagePath(currentPage)}
        alt={`${title} - Page ${currentPage}`}
        width={500}
        height={700}
        className="object-contain transition-opacity duration-300"
        priority
      />

      {/* Navigation Buttons */}
      <div className="absolute inset-0 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity px-2">
        <button 
          onClick={() => setCurrentPage(1)}
          className={`p-2 bg-white/80 rounded-full shadow-md hover:bg-white ${currentPage === 1 ? 'invisible' : ''}`}
        >
          <ChevronLeft size={30} />
        </button>
        <button 
          onClick={() => setCurrentPage(2)}
          className={`p-2 bg-white/80 rounded-full shadow-md hover:bg-white ${currentPage === 2 ? 'invisible' : ''}`}
        >
          <ChevronRight size={30} />
        </button>
      </div>

      {/* Watermark */}
      <div className="absolute bottom-10 right-10 bg-white/90 backdrop-blur-sm rounded-full p-6 shadow-lg text-center w-36 h-36 flex flex-col justify-center items-center border border-gray-100 pointer-events-none">
        <h3 className="font-bold text-gray-800 text-sm">PREVIEW</h3>
        <p className="text-[10px] text-gray-500 mt-1">Page {currentPage}</p>
      </div>
    </div>
  );
}