"use client";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import HeaderTop from "./HeaderTop";
import Image from "next/image";
import SearchInput from "./SearchInput";
import Link from "next/link";
import CartElement from "./CartElement";
import { signOut, useSession } from "next-auth/react";
import toast from "react-hot-toast";
import apiClient from "@/lib/api";

const Header = () => {
  const { data: session } = useSession();
  const pathname = usePathname();

  const handleLogout = () => {
    setTimeout(() => signOut(), 1000);
    toast.success("התנתקת בהצלחה!");
  };

  const getUserByEmail = async () => {
    if (session?.user?.email) {
      try {
        await apiClient.get(`/api/users/email/${session?.user?.email}`, {
          cache: "no-store",
        });
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }
  };

  useEffect(() => {
    getUserByEmail();
  }, [session?.user?.email]);

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <HeaderTop />
      
      {!pathname.startsWith("/admin") ? (
        <div className="bg-white px-6 md:px-16 max-w-screen-2xl mx-auto h-24 flex items-center justify-between gap-4">
          
          {/* LOGO */}
          <div className="flex-shrink-0 w-48 lg:w-64">
            <Link href="/" className="relative h-12 w-full block">
              <Image 
                src="/logo v1 svg.svg" 
                fill
                alt="תווים כחול-לבן logo" 
                className="object-contain object-right"
                priority
              />
            </Link>
          </div>

          {/* SEARCH BAR (Centered) */}
          <div className="flex-1 max-w-xl mx-auto">
            <SearchInput />
          </div>

          {/* ACTIONS */}
          <div className="flex items-center gap-x-6 flex-shrink-0 w-48 lg:w-64 justify-start">
             <CartElement />
             
             {session ? (
                <button onClick={handleLogout} className="text-sm font-medium text-gray-600 hover:text-red-600">
                  התנתק
                </button>
             ) : (
                <Link href="/login" className="text-sm font-medium text-blue-600 hover:underline">
                  התחברות
                </Link>
             )}
          </div>
        </div>
      ) : (
        /* ADMIN NAV */
        <div className="flex justify-between h-24 bg-white items-center px-6 md:px-16 max-w-screen-2xl mx-auto">
          <Link href="/">
            <div className="font-extrabold text-2xl tracking-tight text-gray-900">
              תווים <span className="text-blue-600">כחול-לבן</span>
              <span className="ml-2 text-xs bg-gray-100 px-2 py-1 rounded text-gray-500 uppercase">מנהל</span>
            </div>
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;