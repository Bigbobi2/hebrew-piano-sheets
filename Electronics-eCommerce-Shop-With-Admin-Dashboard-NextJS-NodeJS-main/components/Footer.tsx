// *********************
// Role of the component: Footer component
// Name of the component: Footer.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.1 (Updated to remove About Us, specific links, and fix layout)
// Component call: <Footer />
// Input parameters: no input parameters
// Output: Footer component
// *********************

import { navigation } from "@/lib/utils";
import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white" aria-labelledby="footer-heading">
      <div>
        <h2 id="footer-heading" className="sr-only">
          Footer
        </h2>
        <div className="mx-auto max-w-screen-2xl px-6 lg:px-8 pt-24 pb-14">
          <div className="xl:grid xl:grid-cols-3 xl:gap-8">
            <Image
              src="/logo v1.png"
              alt="תווים כחול-לבן logo"
              width={250}
              height={250}
              className="h-auto w-auto"
            />
            
            {/* Updated to a 3-column grid since "About Us" is removed */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 xl:col-span-2 xl:mt-0">
              
              {/* --- Sale Section --- */}
              <div>
                <h3 className="text-base font-bold leading-6 text-blue-600">
                  Sale
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.sale
                    // This filter safely removes "חדש באתר"
                    .filter((item) => item.name !== "חדש באתר")
                    .map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className="text-sm leading-6 text-black hover:text-gray-700"
                        >
                          {/* Change "חבילות תווים" to whatever you want to call חבילות תווים */}
                          {item.name === "חבילות תווים" ? "חבילות תווים" : item.name}
                        </a>
                      </li>
                    ))}
                </ul>
              </div>

              {/* --- Buying Section --- */}
              <div>
                <h3 className="text-base font-bold leading-6 text-blue-600">
                  Buying
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.buy
                    // This filter safely removes "שותפים" and "כרטיס מנוי..."
                    .filter(
                      (item) =>
                        item.name !== "שותפים" &&
                        item.name !== "כרטיס מנוי תווים כחול-לבן"
                    )
                    .map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className="text-sm leading-6 text-black hover:text-gray-700"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))}
                </ul>
              </div>

              {/* --- Support Section --- */}
              <div>
                <h3 className="text-base font-bold leading-6 text-blue-600">
                  Support
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {navigation.help.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-sm leading-6 text-black hover:text-gray-700"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;