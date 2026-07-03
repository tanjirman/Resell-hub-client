"use client";

import {
  FaBoxOpen,
  FaShoppingCart,
  FaDollarSign,
  FaClock,
} from "react-icons/fa";

const stats = [
  {
    title: "Total Products",
    value: 86,
    icon: FaBoxOpen,
    color: "text-blue-500",
    bg: "bg-blue-500/20",
  },
  {
    title: "Total Sales",
    value: 324,
    icon: FaShoppingCart,
    color: "text-green-500",
    bg: "bg-green-500/20",
  },
  {
    title: "Revenue",
    value: "$14,260",
    icon: FaDollarSign,
    color: "text-yellow-500",
    bg: "bg-yellow-500/20",
  },
  {
    title: "Pending Orders",
    value: 12,
    icon: FaClock,
    color: "text-red-500",
    bg: "bg-red-500/20",
  },
];

export default function StatsCards() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="
group
rounded-2xl
border border-zinc-800
bg-zinc-900
p-6
transition-all
duration-300
hover:-translate-y-1
hover:border-purple-500/50
hover:shadow-xl
"
          >
            <div className="flex items-center justify-between">
              <div>
                <p  className="text-sm text-zinc-400">{item.title}</p>

                <h2 className="mt-2 text-3xl font-bold text-white">{item.value}</h2>
              </div>

              <div className={`${item.bg} p-4 rounded-full`}>
                <Icon className={`${item.color} text-2xl`} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}