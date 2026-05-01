import AddToCartSingleProductBtn from "@/components/AddToCartSingleProductBtn";
import BuyNowSingleProductBtn from "@/components/BuyNowSingleProductBtn";
import SheetPreview from "@/components/SheetPreview";
import prisma from "@/utils/db";
import { notFound } from "next/navigation";
import React from "react";

interface SingleProductPageProps {
  params: Promise<{ productSlug: string }>;
}

const SingleProductPage = async ({ params }: SingleProductPageProps) => {
  const { productSlug } = await params;

  const product = await prisma.product.findFirst({
    where: { slug: productSlug },
  });

  if (!product) {
    notFound();
  }

  const cleanImagePath = product.mainImage?.startsWith('/') 
    ? product.mainImage 
    : `/${product.mainImage}`;

  const translateInstrument = (inst: string | null) => {
    if (!inst || inst.toLowerCase() === 'piano') return 'פסנתר';
    return inst;
  };

  return (
    <div className="bg-white text-black min-h-screen" dir="rtl">
      <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row gap-12">
        
        {/* RIGHT SIDE: Preview */}
        <div className="md:w-1/2 flex justify-center">
          <SheetPreview 
            mainImage={cleanImagePath} 
            title={product.title} 
            totalPages={Number(product.pages) || 1} 
          />
        </div>

        {/* LEFT SIDE: Info */}
        <div className="md:w-1/2 flex flex-col pt-4">
          <h1 className="text-4xl font-extrabold mb-2 leading-tight">{product.title}</h1>
          <h2 className="text-xl text-gray-500 mb-6 font-medium">תווים לפסנתר</h2>
          
          <div className="text-3xl font-bold mb-8">
            ₪{product.price}
          </div>

          <div className="flex gap-4 mb-10">
  {/* We pass the 'product' data directly into our smart buttons */}
  <div className="flex-1">
    <AddToCartSingleProductBtn product={product} />
  </div>
  <div className="flex-1">
    <BuyNowSingleProductBtn product={product} />
  </div>
</div>

          {/* TIGHT METADATA SECTION */}
          <div className="max-w-xs">
            <h3 className="font-bold text-lg mb-4 text-blue-600 border-b-2 border-blue-600 w-fit pb-1">
              פרטי מוצר
            </h3>
            
            <div className="space-y-3">
               {/* Artist Row */}
               <div className="flex items-center gap-2 border-b border-gray-100 pb-1.5">
                <span className="text-gray-400 text-sm w-20 flex-shrink-0">אמן/ית:</span>
                <span className="font-semibold text-gray-800">{product.artist || "Keane "}</span>
              </div>

              {/* Level Row */}
              <div className="flex items-center gap-2 border-b border-gray-100 pb-1.5">
                <span className="text-gray-400 text-sm w-20 flex-shrink-0">רמה:</span>
                <span className="font-semibold text-gray-800">{product.scoring || "בינוני"}</span>
              </div>
              
              {/* Instruments Row */}
              <div className="flex items-center gap-2 border-b border-gray-100 pb-1.5">
                <span className="text-gray-400 text-sm w-20 flex-shrink-0">כלים:</span>
                <span className="font-semibold text-gray-800">{translateInstrument(product.instruments)}</span>
              </div>
              
              {/* Pages Row */}
              <div className="flex items-center gap-2 border-b border-gray-100 pb-1.5">
                <span className="text-gray-400 text-sm w-20 flex-shrink-0">עמודים:</span>
                <span className="font-semibold text-gray-800">{product.pages || "1"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProductPage;