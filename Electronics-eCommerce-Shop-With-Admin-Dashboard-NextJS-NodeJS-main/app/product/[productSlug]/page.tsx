import { ProductTabs } from "@/components";
import prisma from "@/utils/db";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";
import { FaSquareFacebook, FaSquareXTwitter, FaSquarePinterest } from "react-icons/fa6";
import { sanitize } from "@/lib/sanitize";

interface SingleProductPageProps {
  params: Promise<{ productSlug: string }>;
}

const SingleProductPage = async ({ params }: SingleProductPageProps) => {
  const { productSlug } = await params;

  // 1. Fetch the product directly from the database using the slug
  const product = await prisma.product.findFirst({
    where: { slug: productSlug },
  });

  if (!product) {
    notFound();
  }

  return (
    <div className="bg-white text-black min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row gap-12">
        
        {/* LEFT SIDE: Sheet Music Preview */}
        <div className="md:w-1/2 flex justify-center">
          <div className="relative border border-gray-200 shadow-xl rounded-md bg-white p-2 h-fit">
            <Image
              src={product.mainImage ? `/${product.mainImage}` : "/product_placeholder.jpg"}
              alt={product.title}
              width={500}
              height={700}
              className="object-contain"
              priority
            />
            
            {/* Watermark Overlay */}
            <div className="absolute bottom-10 right-10 bg-white/90 backdrop-blur-sm rounded-full p-6 shadow-lg text-center w-40 h-40 flex flex-col justify-center items-center border border-gray-100">
              <h3 className="font-bold text-gray-800 text-sm">PREVIEW ONLY</h3>
              <p className="text-[10px] text-gray-500 mt-1 text-center">Legal use requires purchase</p>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: Product Info */}
        <div className="md:w-1/2 flex flex-col pt-4">
          <h1 className="text-4xl font-extrabold mb-2">{sanitize(product.title)}</h1>
          <h2 className="text-xl text-gray-600 mb-6">Piano Solo • Professional Sheet Music</h2>
          
          <div className="text-3xl font-bold mb-8">
            ₪{product.price}
          </div>

          <div className="flex gap-4 mb-8">
            <button className="bg-blue-600 text-white px-10 py-4 rounded-full font-bold hover:bg-blue-700 transition flex-1">
              Add to Cart
            </button>
            <button className="border-2 border-blue-600 text-blue-600 px-10 py-4 rounded-full font-bold hover:bg-blue-50 transition flex-1">
              Buy Now
            </button>
          </div>

          <hr className="mb-8" />

          {/* Metadata Section */}
          <div className="space-y-4">
            <h3 className="font-bold text-lg mb-4 text-blue-600">Details</h3>
            <div className="grid grid-cols-2 border-b pb-2">
              <span className="text-gray-500">Instruments:</span>
              <span className="font-medium">Piano</span>
            </div>
            <div className="grid grid-cols-2 border-b pb-2">
              <span className="text-gray-500">Format:</span>
              <span className="font-medium">Digital PDF</span>
            </div>
          </div>

          {/* Social Share */}
          <div className="mt-8 flex items-center gap-4">
            <span className="text-gray-500 font-semibold">Share:</span>
            <div className="flex gap-3 text-3xl text-gray-400">
              <FaSquareFacebook className="hover:text-blue-600 cursor-pointer" />
              <FaSquareXTwitter className="hover:text-black cursor-pointer" />
              <FaSquarePinterest className="hover:text-red-600 cursor-pointer" />
            </div>
          </div>
        </div>
      </div>

      {/* TABS SECTION */}
      <div className="max-w-6xl mx-auto px-6 pb-20">
        <ProductTabs product={product as any} />
      </div>
    </div>
  );
};

export default SingleProductPage;