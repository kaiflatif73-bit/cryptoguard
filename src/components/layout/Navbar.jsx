
"use client";

import { Bell, Wallet, Search } from "lucide-react";

export default function Navbar() {
  return (
    <header className="h-20 bg-[#0B1120] border-b border-gray-800 px-8 flex items-center justify-between">

      {/* Search bar */}
      <div className="flex items-center gap-3 bg-[#1F2937] px-4 py-3 rounded-lg w-80">
        <Search size={20} className="text-gray-400" />

        <input
          type="text"
          placeholder="Search wallet address..."
          className="bg-transparent outline-none text-white w-full placeholder-gray-500"
        />
      </div>

      {/* Right section */}
      <div className="flex items-center gap-5">

        {/* Notification button */}
        <button
          aria-label="Notifications"
          className="text-gray-400 hover:text-white transition"
        >
          <Bell size={22} />
        </button>

        {/* Connect Wallet */}
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg transition">
          <Wallet size={18} />
          <span>Connect Wallet</span>
        </button>

      </div>
    </header>
  );
}
