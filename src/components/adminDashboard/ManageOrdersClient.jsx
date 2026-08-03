"use client";

import { useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";
import {
  Button,
  Chip,
  Select,
  
  Input,
} from "@heroui/react";

import {
  getAllOrders,
  updateAdminOrderStatus,
} from "@/app/lib/api/admin/data";

export default function ManageOrdersClient() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);

      try {
        const data = await getAllOrders();
        setOrders(data);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const filtered = useMemo(() => {
    return orders.filter(
      (o) =>
        o.buyerName?.toLowerCase().includes(search.toLowerCase()) ||
        o.productTitle?.toLowerCase().includes(search.toLowerCase())
    );
  }, [orders, search]);

  const updateStatus = async (id, status) => {
    await updateAdminOrderStatus(id, status);

    Swal.fire({
      icon: "success",
      title: "Updated",
      timer: 1500,
      showConfirmButton: false,
    });

    setOrders((prev) =>
      prev.map((o) =>
        o._id === id
          ? {
              ...o,
              status,
            }
          : o
      )
    );
  };

  if (loading)
    return (
      <div className="text-center py-16 text-gray-400">
        Loading orders...
      </div>
    );

  return (
    <div className="space-y-5">

      <Input
  placeholder="Search order..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="max-w-sm"
/>

      <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#111827]">

        <table className="w-full">

          <thead className="bg-violet-900 text-white">

            <tr>
              <th className="p-3">#</th>
              <th>Buyer</th>
              <th>Product</th>
              <th>Amount</th>
              <th>Payment</th>
              <th>Status</th>
              <th>Update</th>
            </tr>

          </thead>

          <tbody>

            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="text-center py-10 text-gray-400"
                >
                  No orders found.
                </td>
              </tr>
            ) : (
              filtered.map((order, index) => (
                <tr
                  key={order._id}
                  className="border-b border-white/10 text-gray-300"
                >
                  <td className="p-3">{index + 1}</td>

                  <td>{order.buyerName}</td>

                  <td>{order.productTitle}</td>

                  <td>${order.totalPrice}</td>

                  <td>
                    <Chip
                      color={
                        order.paymentStatus === "Paid"
                          ? "success"
                          : "warning"
                      }
                    >
                      {order.paymentStatus}
                    </Chip>
                  </td>

                  <td>
                    <Chip color="secondary">
                      {order.status}
                    </Chip>
                  </td>

                  <td className="w-60">

                    <select
  value={order.status}
  onChange={(e) =>
    updateStatus(order._id, e.target.value)
  }
  className="w-full rounded-lg border border-white/10 bg-gray-900 px-3 py-2 text-white outline-none"
>
  <option value="Pending">Pending</option>
  <option value="Confirmed">Confirmed</option>
  <option value="Processing">Processing</option>
  <option value="Shipped">Shipped</option>
  <option value="Delivered">Delivered</option>
</select>

                  </td>

                </tr>
              ))
            )}

          </tbody>

        </table>

      </div>
    </div>
  );
}