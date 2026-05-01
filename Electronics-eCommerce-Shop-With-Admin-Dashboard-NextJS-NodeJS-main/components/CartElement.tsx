"use client";
import Link from 'next/link'
import React from 'react'
import { FaCartShopping } from 'react-icons/fa6'
import { useProductStore } from "@/app/_zustand/store";

const CartElement = () => {
    // 1. Get the list of products directly
    const { products } = useProductStore();
    
    // 2. Count them right here! If there are 2 songs in the list, the count is 2.
    const itemCount = products ? products.length : 0;

    return (
        <div className="relative">
            <Link href="/cart">
                <FaCartShopping className="text-2xl text-black" />
                {itemCount > 0 && (
                    <span className="w-5 h-5 bg-blue-600 text-white rounded-full flex justify-center items-center absolute -top-2 -right-3 text-[10px] font-bold">
                        {itemCount}
                    </span>
                )}
            </Link>
        </div>
    )
}

export default CartElement;