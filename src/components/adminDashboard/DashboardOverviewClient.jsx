"use client";

import { useEffect, useState } from "react";

import {
  FaUsers,
  FaBoxOpen,
  FaShoppingCart,
  FaDollarSign,
} from "react-icons/fa";

import { getDashboardOverview } from "@/app/lib/api/admin/data";

export default function DashboardOverviewClient() {
  const [dashboard, setDashboard] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const data = await getDashboardOverview();

        setDashboard(data);
      } catch (error) {
        console.log(error);
      }

      setLoading(false);
    };

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="py-24 text-center text-gray-400">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="space-y-10">

      {/* Cards */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <Card
          title="Total Users"
          value={dashboard.totalUsers}
          icon={<FaUsers />}
          color="from-sky-600 to-cyan-500"
        />

        <Card
          title="Total Products"
          value={dashboard.totalProducts}
          icon={<FaBoxOpen />}
          color="from-violet-600 to-fuchsia-600"
        />

        <Card
          title="Total Orders"
          value={dashboard.totalOrders}
          icon={<FaShoppingCart />}
          color="from-orange-500 to-red-500"
        />

        <Card
          title="Revenue"
          value={`$${dashboard.totalRevenue}`}
          icon={<FaDollarSign />}
          color="from-emerald-500 to-green-600"
        />

      </div>

      {/* Recent Orders */}

      <div className="rounded-2xl border border-white/10 bg-black/30">

        <div className="border-b border-white/10 p-5">

          <h2 className="text-xl font-semibold text-white">
            Recent Orders
          </h2>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-violet-900/40">

              <tr className="text-left">

                <th className="p-4">Buyer</th>

                <th className="p-4">Product</th>

                <th className="p-4">Amount</th>

                <th className="p-4">Status</th>

              </tr>

            </thead>

            <tbody>

              {dashboard.recentOrders.length === 0 ? (
                <tr>

                  <td
                    colSpan={4}
                    className="py-10 text-center text-gray-400"
                  >
                    No recent orders.
                  </td>

                </tr>
              ) : (
                dashboard.recentOrders.map((order) => (
                  <tr
                    key={order._id}
                    className="border-b border-white/5 hover:bg-white/5"
                  >
                    <td className="p-4 text-gray-200">
                      {order.buyerName}
                    </td>

                    <td className="p-4 text-gray-200">
                      {order.productTitle}
                    </td>

                    <td className="p-4 text-gray-200">
                      ${order.totalPrice}
                    </td>

                    <td className="p-4">

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          order.paymentStatus === "Paid"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-yellow-500/20 text-yellow-400"
                        }`}
                      >
                        {order.paymentStatus}
                      </span>

                    </td>

                  </tr>
                ))
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

function Card({ title, value, icon, color }) {
  return (
    <div
      className={`rounded-2xl bg-gradient-to-r ${color} p-6 shadow-lg`}
    >
      <div className="flex items-center justify-between">

        <div>

          <p className="text-white/80">{title}</p>

          <h2 className="mt-2 text-4xl font-bold text-white">
            {value}
          </h2>

        </div>

        <div className="text-5xl text-white/80">
          {icon}
        </div>

      </div>
    </div>
  );
}