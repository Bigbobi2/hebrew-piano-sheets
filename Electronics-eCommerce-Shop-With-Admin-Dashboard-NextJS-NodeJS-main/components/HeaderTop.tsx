"use client";
import React from "react";
import Link from "next/link";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { FaUser, FaRegEdit } from "react-icons/fa";
import { signOut, useSession } from "next-auth/react";
import toast from "react-hot-toast";

const HeaderTop = () => {
  const { data: session } = useSession();

  const handleLogout = () => {
    setTimeout(() => signOut(), 1000);
    toast.success("Logout successful!");
  };

  return (
    <div className="bg-[#0f172a] text-white py-3 px-16 max-md:px-6">
      <div className="flex justify-between items-center max-w-screen-2xl mx-auto">
        <div className="flex items-center gap-x-5">
          <div className="flex items-center gap-x-2 font-medium text-sm">
            <HiOutlineEnvelope className="text-lg" />
            <a href="mailto:pianosheetsilofficial@gmail.com" className="hover:text-blue-400 transition-colors">
              pianosheetsilofficial@gmail.com
            </a>
          </div>
        </div>
        <div className="flex items-center gap-x-8 text-sm font-semibold">
          {!session ? (
            <>
              <Link href="/login" className="flex items-center gap-x-2 hover:text-blue-400">
                <FaUser /> Login
              </Link>
              <Link href="/register" className="flex items-center gap-x-2 hover:text-blue-400">
                <FaRegEdit /> Register
              </Link>
            </>
          ) : (
            <button onClick={handleLogout} className="flex items-center gap-x-2 hover:text-blue-400">
              <FaUser /> Logout
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;