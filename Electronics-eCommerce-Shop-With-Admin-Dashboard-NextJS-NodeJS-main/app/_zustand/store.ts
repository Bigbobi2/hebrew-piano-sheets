import { create } from "zustand";
import { persist } from "zustand/middleware";

type Product = {
  id: string;
  title: string;
  price: number;
  image: string;
  cartItemId?: string; // Add this line
};

type Store = {
  products: Product[];
  totalAmount: number;
  addToCart: (product: Product) => void;
  removeFromCart: (cartItemId: string) => void; // Change this from productId
  clearCart: () => void;
};

export const useProductStore = create<Store>()(
  persist(
    (set, get) => ({
      products: [],
      totalAmount: 0,

      addToCart: (product) => {
        // Create a unique ID for this specific addition to the cart
        const productWithUniqueId = { 
          ...product, 
          cartItemId: Math.random().toString(36).substring(7) + Date.now() 
        };
        
        const updatedProducts = [...get().products, productWithUniqueId];
        const total = updatedProducts.reduce((sum, item) => sum + item.price, 0);
        set({ products: updatedProducts, totalAmount: total });
      },

      removeFromCart: (cartItemId) => {
        // Filter by the UNIQUE cartItemId
        const filteredProducts = get().products.filter((p) => p.cartItemId !== cartItemId);
        const total = filteredProducts.reduce((sum, item) => sum + item.price, 0);
        set({ products: filteredProducts, totalAmount: total });
      },

      clearCart: () => set({ products: [], totalAmount: 0 }),
    }),
    { name: "cart-storage" }
  )
);