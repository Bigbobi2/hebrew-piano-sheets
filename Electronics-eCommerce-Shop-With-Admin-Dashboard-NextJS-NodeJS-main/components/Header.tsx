"use client";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import HeaderTop from "./HeaderTop";
import Image from "next/image";
import SearchInput from "./SearchInput";
import Link from "next/link";
import { FaBell } from "react-icons/fa6";

import CartElement from "./CartElement";
import NotificationBell from "./NotificationBell";
import HeartElement from "./HeartElement";
import { signOut, useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useWishlistStore } from "@/app/_zustand/wishlistStore";
import apiClient from "@/lib/api";

const Header = () => {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const { wishlist, setWishlist, wishQuantity } = useWishlistStore();

  const handleLogout = () => {
    setTimeout(() => signOut(), 1000);
    toast.success("Logout successful!");
  };

  const getUserByEmail = async () => {
    if (session?.user?.email) {
      apiClient.get(`/api/users/email/${session?.user?.email}`, {
        cache: "no-store",
      })
        .then((response) => response.json())
        .then((data) => {
          // wishlist fetching logic
        });
    }
  };

  useEffect(() => {
    getUserByEmail();
  }, [session?.user?.email, wishlist.length]);

  return (
    <header className="bg-white">
      <HeaderTop />
      {pathname.startsWith("/admin") === false && (
        <div className="h-32 bg-white flex items-center justify-between px-16 max-[1320px]:px-16 max-md:px-6 max-lg:flex-col max-lg:gap-y-7 max-lg:justify-center max-lg:h-60 max-w-screen-2xl mx-auto">
          <Link href="/">
            <img src="/logo v1 svg.svg" width={300} height={300} alt="תווים כחול-לבן logo" className="relative right-5 max-[1023px]:w-56" />
          </Link>
          <SearchInput />
          <div className="flex gap-x-10 items-center">
            <NotificationBell />
            <HeartElement wishQuantity={wishQuantity} />
            <CartElement />
          </div>
        </div>
      )}
      {pathname.startsWith("/admin") === true && (
        <div className="flex justify-between h-32 bg-white items-center px-16 max-[1320px]:px-10 max-w-screen-2xl mx-auto max-[400px]:px-5">
          <Link href="/">
            <div className="font-extrabold text-3xl tracking-tight text-gray-900">
              תווים <span className="text-blue-600">כחול-לבן</span>
            </div>
          </Link>
          <div className="flex gap-x-5 items-center">
            <NotificationBell />
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="w-10">
                <Image src="/randomuser.jpg" alt="profile" width={30} height={30} className="w-full h-full rounded-full" />
              </div>
              <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                <li><Link href="/admin">Dashboard</Link></li>
                <li onClick={handleLogout}><a href="#">Logout</a></li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;