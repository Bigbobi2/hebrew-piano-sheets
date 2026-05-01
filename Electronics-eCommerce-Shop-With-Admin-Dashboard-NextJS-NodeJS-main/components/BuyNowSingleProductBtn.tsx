"use client";
import { useProductStore } from "@/app/_zustand/store";
import { useRouter } from "next/navigation";

const BuyNowSingleProductBtn = ({ product }: any) => {
  const router = useRouter();
  const { addToCart } = useProductStore();

  const handleAction = () => {
    addToCart({
      id: product?.id?.toString() || Math.random().toString(),
      title: product?.title || "שיר ללא שם",
      price: product?.price || 0,
      image: product?.mainImage || product?.image || "",
    } as any);
    
    router.push("/cart");
  };

  return (
    <button
      onClick={handleAction}
      className="w-full md:w-[200px] py-3 text-lg font-bold bg-blue-600 text-white hover:bg-blue-700 transition-all rounded-full"
    >
      קנייה מהירה
    </button>
  );
};

export default BuyNowSingleProductBtn;