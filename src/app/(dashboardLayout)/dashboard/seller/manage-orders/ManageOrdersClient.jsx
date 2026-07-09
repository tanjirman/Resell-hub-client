"use client";

import Image from "next/image";
import { Card, Chip } from "@heroui/react";

const ManageOrdersClient = ({ orders }) => {
  return (
    <div className="space-y-5 mt-6">
      {orders?.length === 0 ? (
        <Card className="p-10 text-center border border-white/10 bg-slate-900">
          <p className="text-slate-400">No orders found.</p>
        </Card>
      ) : (
        orders?.map((order) => (
          <Card
            key={order._id}
            className="border border-white/10 bg-slate-900 p-5 rounded-xl hover:border-cyan-500/30 transition"
          >
            <div className="flex justify-between gap-6">
              {/* Left */}
              <div className="flex gap-5">
                <Image
                  src={order.image}
                  alt={order.title}
                  width={90}
                  height={90}
                  className="rounded-xl object-cover border border-white/10"
                />

                <div>
                  <h2 className="text-lg font-semibold text-white">
                    {order.title}
                  </h2>

                  <p className="text-sm text-slate-400 mt-1">
                    Seller: {order.sellerName}
                  </p>

                  <p className="text-xs text-slate-500">{order.sellerEmail}</p>

                  <div className="flex gap-6 mt-4 text-sm text-slate-400">
                    <span>Category: {order.category}</span>

                    <span>Condition: {order.condition}</span>

                    <span>Stock: {order.quantity}</span>
                  </div>
                </div>
              </div>

              {/* Right */}
              <div className="text-right flex flex-col items-end justify-between">
                <Chip
                  className={
                    order.status === "accepted"
                      ? "bg-green-500/10 text-green-400"
                      : order.status === "pending"
                        ? "bg-yellow-500/10 text-yellow-400"
                        : order.status === "delivered"
                          ? "bg-blue-500/10 text-blue-400"
                          : "bg-red-500/10 text-red-400"
                  }
                >
                  {order.status}
                </Chip>

                <h2 className="text-2xl font-bold text-green-400 mt-3">
                  ৳ {order.price}
                </h2>
              </div>
            </div>
          </Card>
        ))
      )}
    </div>
  );
};

export default ManageOrdersClient;
