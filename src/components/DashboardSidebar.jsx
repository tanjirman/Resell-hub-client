"use client";


import React from "react";
import Image from "next/image";
import Link from "next/link";

import {
  FaBoxOpen,
  FaChartLine,
  FaChartPie,
  FaClipboardList,
  FaHeart,
  FaHistory,
  FaHome,
  FaPlus,
  FaShoppingBag,
  FaSignOutAlt,
  FaUserCircle,
  FaUsers,
  FaWallet,
} from "react-icons/fa";
import { authClient, useSession } from "@/app/lib/auth-client";
import Logo from "./Logo";
import { usePathname, useRouter } from "next/navigation";

const DashboardSidebar = () => {
  const { data: session } = useSession();
  const { router } = useRouter;
  const pathname = usePathname();

  const buyerMenu = [
    {
      key: "overview",
      label: "Dashboard",
      icon: FaHome,
      href: "/dashboard/buyer",
    },
    {
      key: "orders",
      label: "My Orders",
      icon: FaHistory,
      href: "/dashboard/buyer/my-orders",
    },
    {
      key: "wishlist",
      label: "Wishlist",
      icon: FaHeart,
      href: "/dashboard/buyer/wishlists",
    },
    {
      key: "payments",
      label: "Payment History",
      icon: FaWallet,
      href: "/dashboard/buyer/payment-history",
    },
    {
      key: "profile",
      label: "Profile",
      icon: FaUserCircle,
      href: "/dashboard/profile",
    },
  ];

  const sellerMenu = [
    {
      key: "overview",
      label: "Dashboard",
      icon: FaHome,
      href: "/dashboard/seller",
    },
    {
      key: "add-product",
      label: "Add Product",
      icon: FaPlus,
      href: "/dashboard/seller/add-product",
    },
    {
      key: "my-products",
      label: "My Products",
      icon: FaBoxOpen,
      href: "/dashboard/seller/my-products",
    },
    {
      key: "orders",
      label: "Manage Orders",
      icon: FaShoppingBag,
      href: "/dashboard/seller/manage-orders",
    },
    {
      key: "analytics",
      label: "Sales Analytics",
      icon: FaChartLine,
      href: "/dashboard/seller/sales-analytics",
    },
    {
      key: "profile",
      label: "Profile",
      icon: FaUserCircle,
      href: "/dashboard/profile",
    },
  ];

  const adminMenu = [
    {
      key: "overview",
      label: "Dashboard",
      icon: FaHome,
      href: "/dashboard/admin",
    },
    {
      key: "users",
      label: "Manage Users",
      icon: FaUsers,
      href: "/dashboard/admin/manage-users",
    },
    {
      key: "products",
      label: "Manage Products",
      icon: FaBoxOpen,
      href: "/dashboard/admin/products",
    },
    {
      key: "orders",
      label: "Manage Orders",
      icon: FaClipboardList,
      href: "/dashboard/admin/orders",
    },
    {
      key: "analytics",
      label: "Platform Analytics",
      icon: FaChartPie,
      href: "/dashboard/admin/analytics",
    },
  ];

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/");
  };

  const role = session?.user?.role;
  const menuItems =
    role === "buyer"
      ? buyerMenu
      : role === "seller"
        ? sellerMenu
        : role === "admin"
          ? adminMenu
          : null;

  return (
    <div>
      <aside className="w-64 h-screen border-r border-white/5">
        <div className="h-full flex flex-col bg-slate-950/80 backdrop-blur-xl">
          {/* Brand / Logo */}
          <div className="px-6 py-5 border-b border-white/5">
            <Logo />
          </div>

          {/* User Profile */}
          <div className="px-6 py-5 border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-pink-500/60 shrink-0">
                <Image
                  width={40}
                  height={40}
                  src={
                    session?.user?.image ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent("Jane Doe")}&background=7c3aed&color=fff&bold=true`
                  }
                  unoptimized
                  alt="Avatar"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="overflow-hidden">
                <p className="text-white text-sm font-bold truncate leading-tight">
                  {session?.user?.name}
                </p>
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider ${role === "admin" ? "text-yellow-400" : role === "buyer" ? "text-indigo-400" : "text-pink-400"}`}
                >
                  {role}
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-grow overflow-y-auto px-3 py-4 space-y-1">
            <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest px-3 pb-2">
              Navigation
            </p>
            {menuItems?.map(({ key, label, icon: Icon, href }) => {
  const isActive = pathname === href;

  return (
    <Link
      key={key}
      href={href}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200
        ${
          isActive
            ? "bg-indigo-600 text-white shadow-lg"
            : "text-slate-400 hover:text-white hover:bg-white/5"
        }`}
    >
      <span
        className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors
          ${
            isActive
              ? "bg-white/20 text-white"
              : "bg-white/5 text-slate-400"
          }`}
      >
        <Icon size={14} />
      </span>

      <span>{label}</span>

      {isActive && (
        <span className="ml-auto w-2 h-2 rounded-full bg-white"></span>
      )}
    </Link>
  );
})}
          </nav>

          {/* Bottom Links */}
          <div className="px-3 py-4 border-t border-white/5 space-y-1">
            <Link
              href="/"
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-150"
            >
              <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                <FaHome size={13} />
              </span>
              Back to Site
            </Link>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-400 hover:text-red-400 hover:bg-red-500/5 transition-all duration-150 cursor-pointer"
            >
              <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                <FaSignOutAlt size={13} />
              </span>
              Sign Out
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default DashboardSidebar;
