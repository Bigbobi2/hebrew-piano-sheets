"use client";
import { useProductStore } from "@/app/_zustand/store";

const OrderSummary = () => {
  const { products, totalAmount } = useProductStore();

  return (
    <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm" dir="rtl">
      <h2 className="text-2xl font-black mb-8 border-b border-gray-50 pb-4 text-right">
        סיכום ההזמנה שלך
      </h2>

      <div className="space-y-5 mb-8">
        {products.length > 0 ? (
          // Adding (item: any) fixes the red line here
          products.map((item: any) => (
            <div key={item.id} className="flex justify-between items-center">
              <span className="font-medium text-gray-700">{item.title}</span>
              <span className="font-bold text-gray-900">₪{item.price}</span>
            </div>
          ))
        ) : (
          <p className="text-center py-6 text-gray-400">הסל שלך ריק</p>
        )}
      </div>

      <div className="border-t-2 border-blue-50 pt-6 flex justify-between items-center">
        <span className="text-xl font-bold">סה"כ:</span>
        <span className="text-3xl font-black text-blue-600">₪{totalAmount}</span>
      </div>

      <button className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold mt-8 hover:bg-blue-700 transition-all">
        מעבר לתשלום מאובטח
      </button>
    </div>
  );
};

export default OrderSummary;