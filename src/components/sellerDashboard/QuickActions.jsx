"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaPlus,
  FaBoxOpen,
  FaShoppingBag,
  FaChartLine,
  FaChevronRight,
} from "react-icons/fa";

const actions = [
  {
    title: "Add Product",
    href: "/dashboard/seller/add-product",
    icon: FaPlus,
  },
  {
    title: "Manage Products",
    href: "/dashboard/seller/products",
    icon: FaBoxOpen,
  },
  {
    title: "Manage Orders",
    href: "/dashboard/seller/orders",
    icon: FaShoppingBag,
  },
  {
    title: "View Analytics",
    href: "/dashboard/seller/analytics",
    icon: FaChartLine,
  },
];

export default function QuickActions() {
  const pathname = usePathname();

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-lg hover:border-purple-500/40 transition-all duration-300">
      <div className="flex items-center gap-2 mb-6">
        <FaChartLine className="text-purple-500 text-lg" />
        <h2 className="text-xl font-semibold text-white">
          Quick Actions
        </h2>
      </div>

      <div className="space-y-3">
        {actions.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link key={item.href} href={item.href}>
              <div
                className={`group flex items-center justify-between rounded-xl border px-4 py-3 transition-all duration-300 cursor-pointer ${
                  active
                    ? "bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-600/20"
                    : "bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-purple-600 hover:border-purple-500 hover:text-white hover:-translate-y-0.5"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`flex  h-10 w-10 items-center justify-center rounded-lg transition ${
                      active
                        ? "bg-white/15"
                        : "bg-zinc-700 group-hover:bg-white/15"
                    }`}
                  >
                    <Icon className="text-lg" />
                  </div>

                  <span className="font-medium">
                    {item.title}
                  </span>
                </div>

                <FaChevronRight className="text-sm opacity-60 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}