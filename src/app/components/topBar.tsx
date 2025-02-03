import React from "react";
import Link from "next/link";

const Topbar: React.FC = () => {
  return (
    <div className="bg-neutral text-neutral-content py-2 px-4 flex justify-between items-center text-sm">
      {/* Left Section - Language & Currency */}
      <div className="hidden md:flex space-x-4">
        <select className="select select-sm bg-neutral text-white">
          <option>English</option>
          <option>Español</option>
          <option>Français</option>
        </select>
        <select className="select select-sm bg-neutral text-white">
          <option>USD</option>
          <option>EUR</option>
          <option>GBP</option>
        </select>
      </div>

      {/* Center Section - Promo Message */}
      <div className="text-center w-full md:w-auto">
        🎉 <span className="font-bold">GET10</span> for 10% Off! 🎉
      </div>

      {/* Right Section - Social Links */}
      <div className="hidden md:flex space-x-3">
        <Link href="https://facebook.com" className="hover:text-primary">FB</Link>
        <Link href="https://instagram.com" className="hover:text-primary">IG</Link>
        <Link href="https://twitter.com" className="hover:text-primary">TW</Link>
      </div>
    </div>
  );
};

export default Topbar;
