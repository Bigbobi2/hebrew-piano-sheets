// *********************
// Role of the component: Search input element located in the header but it can be used anywhere in your application
// Name of the component: SearchInput.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.0
// Component call: <SearchInput />
// Input parameters: no input parameters
// Output: form with search input and button
// *********************

"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Search } from "lucide-react"; // Make sure to: npm install lucide-react

const SearchInput = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!searchInput.trim()) return;

    // Use "q" to match the Search Page logic
    router.push(`/search?q=${encodeURIComponent(searchInput.trim())}`);
    setSearchInput("");
  };

  return (
    <form className="relative w-full max-w-xl group" onSubmit={handleSearch}>
      <input
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="Search for piano sheets (e.g. Queen, Chopin...)"
        className="w-full bg-gray-50 border border-gray-200 py-3 pl-5 pr-14 rounded-full outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-black"
      />
      <button 
        type="submit" 
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 p-2.5 rounded-full text-white hover:bg-blue-700 transition-colors"
      >
        <Search size={20} />
      </button>
    </form>
  );
};

export default SearchInput;