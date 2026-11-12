
"use client";

import {
  LayoutDashboard,
  ScanSearch,
  ArrowLeftRight,
  Gift,
  Settings,
  ShieldCheck,
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "Wallet Scanner", icon: ScanSearch },
  { name: "Transactions", icon: ArrowLeftRight },
  { name: "Airdrop Intelligence", icon: Gift },
];

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-[#111827] border-r border-gray-800 p-5 text-white">

      {/* Logo */}
      <div className="flex items-center gap-3 mb-12">
        <ShieldCheck size={30} className="text-blue-400" />
        <h1 className="text-xl font-bold">CryptoGuard</h1>
      </div>

      {/* Navigation */}
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.name}
              className="flex items-center gap-3 w-full p-3 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition"
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </button>
          );
        })}
      </nav>

      {/* Settings */}
      <div className="mt-12">
        <button className="flex items-center gap-3 w-full p-3 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition">
          <Settings size={20} />
          <span>Settings</span>
        </button>
      </div>

    </aside>
  );
}