"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaUser, FaSignOutAlt, FaThLarge, FaBox, FaListUl, FaBars, FaTimes, FaStore } from "react-icons/fa";

export default function Navbar() {
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Products", href: "/products" },
    { name: "Categories", href: "/categories" },
    { name: "Dashboard", href: "/dashboard" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-6">
        
        {/* LOGO SECTION */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-gradient-to-tr from-pink-500 to-indigo-600 p-1.5 rounded-lg text-white">
            <FaStore size={18} />
          </div>
          <span className="text-lg font-bold tracking-tight text-white group-hover:text-pink-400 transition-colors">
            Resell Hub
          </span>
        </Link>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((item) => (
            <Link 
              key={item.name} 
              href={item.href} 
              className={`text-sm font-medium transition-all ${
                pathname === item.href ? "text-white" : "text-slate-400 hover:text-white"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-4">
          {/* Mobile Toggle */}
          <button className="md:hidden text-slate-300 p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>

          {/* Profile Dropdown */}
          <div className="relative hidden md:block" ref={dropdownRef}>
            <button 
              onClick={() => setDropdownOpen(!dropdownOpen)} 
              className="w-9 h-9 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center text-xs font-bold text-pink-400 hover:border-pink-500/50 transition"
            >
              RH
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-3 w-56 bg-slate-900 border border-white/10 rounded-xl shadow-2xl py-2 animate-in fade-in zoom-in duration-200">
                <div className="px-4 py-2 border-b border-white/5">
                  <p className="font-semibold text-white text-sm">Reseller Account</p>
                  <p className="text-[11px] text-slate-500">user@example.com</p>
                </div>
                <Link href="/dashboard" className="flex items-center gap-3 px-4 py-2.5 text-xs text-slate-300 hover:text-white hover:bg-white/5"><FaThLarge className="text-pink-500" /> Dashboard</Link>
                <Link href="/products" className="flex items-center gap-3 px-4 py-2.5 text-xs text-slate-300 hover:text-white hover:bg-white/5"><FaBox className="text-pink-500" /> My Products</Link>
                <Link href="/categories" className="flex items-center gap-3 px-4 py-2.5 text-xs text-slate-300 hover:text-white hover:bg-white/5"><FaListUl className="text-pink-500" /> Categories</Link>
                <div className="border-t border-white/5 my-1" />
                <button className="w-full flex items-center gap-3 px-4 py-2.5 text-xs text-red-400 hover:text-red-300 hover:bg-red-500/5"><FaSignOutAlt /> Sign Out</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900/95 border-b border-white/10 px-6 py-4 flex flex-col gap-4">
          {navLinks.map((item) => (
            <Link 
              key={item.name} 
              href={item.href} 
              className="text-slate-300 font-medium" 
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}