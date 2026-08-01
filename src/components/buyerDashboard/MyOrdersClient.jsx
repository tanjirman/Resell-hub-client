"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Swal from "sweetalert2";

import { FaEye, FaTruck, FaTimesCircle, FaShoppingBag } from "react-icons/fa";

import { useSession } from "@/app/lib/auth-client";
import { getBuyerOrders, cancelOrder } from "@/app/lib/api/orders/data";

const statusColor = {
  Pending: "bg-yellow-500/20 text-yellow-400",
  Accepted: "bg-blue-500/20 text-blue-400",
  Processing: "bg-indigo-500/20 text-indigo-400",
  Shipped: "bg-purple-500/20 text-purple-400",
  Delivered: "bg-green-500/20 text-green-400",
  Cancelled: "bg-red-500/20 text-red-400",
};

export default function MyOrdersClient() {
  const { data: session } = useSession();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadOrders = async () => {
    if (!session?.user?.email) return;

    try {
      setLoading(true);

      const data = await getBuyerOrders(session.user.email);

      setOrders(data);
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to load orders.",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  if (!session?.user?.email) return;

  const fetchOrders = async () => {
    setLoading(true);

    try {
      const data = await getBuyerOrders(session.user.email);
      setOrders(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  fetchOrders();
}, [session?.user?.email]);

  const handleCancel = async (id) => {
    const result = await Swal.fire({
      title: "Cancel Order?",
      text: "You won't be able to undo this.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
    });

    if (!result.isConfirmed) return;

    const res = await cancelOrder(id);

    if (res.success) {
      Swal.fire({
        icon: "success",
        title: "Cancelled",
        timer: 1500,
        showConfirmButton: false,
      });

      loadOrders();
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg text-violet-500"></span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Summary */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          title="Total Orders"
          value={orders.length}
          color="text-blue-400"
          icon={<FaShoppingBag size={26} />}
        />

        <SummaryCard
          title="Pending"
          value={orders.filter((o) => o.status === "Pending").length}
          color="text-yellow-400"
          icon={<FaShoppingBag size={26} />}
        />

        <SummaryCard
          title="Delivered"
          value={orders.filter((o) => o.status === "Delivered").length}
          color="text-green-400"
          icon={<FaTruck size={26} />}
        />

        <SummaryCard
          title="Cancelled"
          value={orders.filter((o) => o.status === "Cancelled").length}
          color="text-red-400"
          icon={<FaTimesCircle size={26} />}
        />
      </div>

      <div className="rounded-xl border border-gray-800 bg-gray-900 shadow-lg">
        <div className="border-b border-gray-800 p-6">
          <h2 className="text-xl font-semibold text-white">Order History</h2>
        </div>

        {orders.length === 0 ? (
          <div className="py-20 text-center">
            <h2 className="text-2xl font-bold text-white">No Orders Found</h2>

            <p className="mt-3 text-gray-400">
              Buy your first product to see it here.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-800 text-gray-300">
                <tr>
                  <th className="px-6 py-4 text-left">Order ID</th>

                  <th className="px-6 py-4 text-left">Product</th>

                  <th className="px-6 py-4 text-left">Order Date</th>

                  <th className="px-6 py-4 text-left">Price</th>

                  <th className="px-6 py-4 text-left">Status</th>

                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order._id}
                    className="border-b border-gray-800 hover:bg-gray-800 transition"
                  >
                    <td className="px-6 py-5 font-medium text-white">
                      #{order._id.slice(-6)}
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <img
                          src={order.productImage}
                          alt={order.productTitle}
                          className="h-12 w-12 rounded-lg object-cover"
                        />

                        <div>
                          <h3 className="font-medium text-white">
                            {order.productTitle}
                          </h3>

                          <p className="text-sm text-gray-400">
                            Qty: {order.quantity}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-5 text-gray-400">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>

                    <td className="px-6 py-5 font-semibold text-green-400">
                      ৳ {order.totalPrice}
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`rounded-full px-3 py-1 text-sm font-medium ${statusColor[order.status]}`}
                      >
                        {order.status}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex justify-center gap-3">
                        {/* View Details */}
                        <Link
                          href={`/buyer-dashboard/my-orders/${order._id}`}
                          className="rounded-lg bg-blue-600 p-2 text-white transition hover:bg-blue-700"
                          title="View Details"
                        >
                          <FaEye size={18} />
                        </Link>

                        {/* Track Order */}
                        {order.status !== "Cancelled" && (
                          <button
                            className="rounded-lg bg-green-600 p-2 text-white transition hover:bg-green-700"
                            title="Track Order"
                          >
                            <FaTruck size={18} />
                          </button>
                        )}

                        {/* Cancel Order */}
                        {order.status === "Pending" && (
                          <button
                            onClick={() => handleCancel(order._id)}
                            className="rounded-lg bg-red-600 p-2 text-white transition hover:bg-red-700"
                            title="Cancel Order"
                          >
                            <FaTimesCircle size={18} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Order Status Guide */}

      <div className="rounded-xl border border-gray-800 bg-gray-900 p-6 shadow-lg">
        <h2 className="mb-5 text-xl font-semibold text-white">
          Order Status Guide
        </h2>

        <div className="grid gap-4 md:grid-cols-5">
          <StatusItem
            color="bg-yellow-500"
            title="Pending"
            desc="Waiting for seller confirmation."
          />

          <StatusItem
            color="bg-blue-500"
            title="Accepted"
            desc="Seller accepted your order."
          />

          <StatusItem
            color="bg-indigo-500"
            title="Processing"
            desc="Seller is preparing your order."
          />

          <StatusItem
            color="bg-purple-500"
            title="Shipped"
            desc="Your order is on the way."
          />

          <StatusItem
            color="bg-green-500"
            title="Delivered"
            desc="Successfully delivered."
          />
        </div>
      </div>
    </div>
  );
}

function SummaryCard({ title, value, color, icon }) {
  return (
    <div className="rounded-xl border border-gray-800 bg-gray-900 p-6 shadow-lg transition hover:border-violet-500/40">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-400">{title}</p>

          <h2 className={`mt-2 text-3xl font-bold ${color}`}>{value}</h2>
        </div>

        <div className={`${color}`}>{icon}</div>
      </div>
    </div>
  );
}

function StatusItem({ color, title, desc }) {
  return (
    <div className="rounded-lg border border-gray-800 bg-black p-5">
      <div className={`mb-3 h-3 w-3 rounded-full ${color}`}></div>

      <h3 className="font-semibold text-white">{title}</h3>

      <p className="mt-2 text-sm text-gray-400">{desc}</p>
    </div>
  );
}
