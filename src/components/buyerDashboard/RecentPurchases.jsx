"use client";

import {
  Card,
  CardHeader,
  CardContent as CardBody,
} from "@heroui/react";

const products = [
  {
    id: 1,
    name: "iPhone 13 Pro",
    price: "$650",
    status: "Delivered",
  },
  {
    id: 2,
    name: "Sony WH-1000XM5",
    price: "$240",
    status: "Shipped",
  },
  {
    id: 3,
    name: "MacBook Air M2",
    price: "$950",
    status: "Pending",
  },
];

export default function RecentPurchases() {
  return (
    <Card className="bg-slate-900/50 border border-white/10">
      <CardHeader>
        <h2 className="text-xl font-bold text-white">
          Recent Purchases
        </h2>
      </CardHeader>

      <CardBody className="space-y-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex items-center justify-between border-b border-white/10 pb-3"
          >
            <div>
              <h3 className="text-white">{product.name}</h3>

              <p className="text-slate-400 text-sm">
                {product.price}
              </p>
            </div>

            <span className="rounded-full bg-pink-500/20 px-3 py-1 text-xs text-pink-400">
              {product.status}
            </span>
          </div>
        ))}
      </CardBody>
    </Card>
  );
}