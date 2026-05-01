"use client";
import { SectionTitle } from "@/components";
import OrderSummary from "@/components/OrderSummary";
import { useProductStore } from "@/app/_zustand/store";
import Image from "next/image";

const CartPage = () => {
  // 1. Added clearCart to the destructuring
  const { products, removeFromCart, clearCart } = useProductStore() as any; 

  return (
    <div className="bg-white min-h-screen" dir="rtl">
      <SectionTitle title="סל התווים שלי" path="בית | עגלת קניות" />
      
      <div className="mx-auto max-w-7xl px-4 pb-24 pt-16 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-black text-gray-900 text-right">הסל שלי</h1>
          
          {/* 2. Added "Clear All" button for quick resets */}
          {products && products.length > 0 && (
            <button 
              onClick={clearCart}
              className="text-sm font-bold text-red-500 hover:text-red-700 border border-red-200 px-3 py-1 rounded-lg hover:bg-red-50 transition-colors"
            >
              נקה הכל
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <div className="lg:col-span-7 space-y-6">
            {products && products.length > 0 ? (
              products.map((item: any) => (
                // 3. Changed key to use the unique cartItemId
                <div key={item.cartItemId} className="flex gap-4 border-b pb-6 items-center">
                   {/* Image Section */}
                   <div className="relative w-24 h-24 flex-shrink-0">
                      <Image src={item.image} alt={item.title} fill className="object-cover rounded-lg" />
                   </div>

                   {/* Text Section */}
                   <div className="flex flex-col justify-between flex-1">
                      <h3 className="text-xl font-bold">{item.title}</h3>
                      <p className="text-blue-600 font-bold">₪{item.price}</p>
                   </div>

                   {/* THE X BUTTON */}
                   <button 
                    // 4. Changed to removeFromCart using cartItemId
                    onClick={() => removeFromCart(item.cartItemId)}
                    className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all border border-gray-100"
                    title="הסר מהסל"
                   >
                    ✕
                   </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-xl text-right">הסל שלך ריק... בוא נמצא שיר חדש!</p>
            )}
          </div>

          <div className="lg:col-span-5">
            <OrderSummary />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;