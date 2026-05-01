"use client";
import React from "react";
import { useProductStore } from "@/app/_zustand/store";
import toast from "react-hot-toast";

const AddToCartSingleProductBtn = ({ product }: any) => {
  const { addToCart } = useProductStore();

  const handleAction = () => {
    // We cast this as 'any' to bypass strict TypeScript checks
    addToCart({
      id: product?.id?.toString() || Math.random().toString(),
      title: product?.title || "שיר ללא שם",
      price: product?.price || 0,
      image: product?.mainImage || product?.image || "",
    } as any);
    
    toast.success("נוסף לסל בהצלחה! 🎼");
  };

  return (
    <button
      onClick={handleAction}
      className="w-full md:w-[200px] py-3 text-lg border-2 border-blue-600 font-bold bg-white text-blue-600 hover:bg-blue-50 transition-all rounded-full"
    >
      הוספה לסל
    </button>
  );
};

export default AddToCartSingleProductBtn;