"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, Button } from "@heroui/react";
import {
  FaTag,
  FaBoxOpen,
  FaUser,
  FaHeart,
  FaArrowRight,
} from "react-icons/fa";

export default function ProductCard({ product }) {
  return (
    <Card
      radius="lg"
      className="
      group
      overflow-hidden
      bg-[#111111]
      border border-white/10
      hover:border-violet-500/60
      transition-all
      duration-500
      hover:-translate-y-2
      hover:shadow-[0_0_40px_rgba(139,92,246,.35)]
      flex
      flex-col
    "
    >
      {/* Image */}
      <div className="relative h-60 overflow-hidden">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover group-hover:scale-110 transition duration-700"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

        {/* Category */}
        <span className="absolute top-4 left-4 px-4 py-1 rounded-full bg-violet-600/90 backdrop-blur text-white text-xs font-semibold">
          {product.category}
        </span>

        {/* Wishlist */}
        <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 backdrop-blur flex items-center justify-center text-white hover:bg-pink-600 transition">
          <FaHeart />
        </button>
      </div>

      {/* Body */}
      <div className="p-6 flex flex-col flex-grow">

        <div className="flex justify-between items-start mb-2">
          <h2 className="text-2xl font-bold text-white line-clamp-1">
            {product.title}
          </h2>

          <span className="text-green-400 text-xs bg-green-500/10 px-3 py-1 rounded-full border border-green-500/30">
            {product.condition}
          </span>
        </div>

        <p className="text-gray-400 text-sm line-clamp-2 mb-6">
          {product.description}
        </p>

        {/* Information */}
        <div className="space-y-3 text-gray-300 text-sm">

          <div className="flex items-center gap-3">
            <FaTag className="text-violet-400" />
            <span>
              <strong>Condition:</strong> {product.condition}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <FaBoxOpen className="text-violet-400" />
            <span>
              <strong>Quantity:</strong> {product.quantity}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <FaUser className="text-violet-400" />
            <span>
              <strong>Seller:</strong> {product.sellerName}
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto pt-6 flex justify-between items-center">

          <div>
            <p className="text-gray-400 text-xs">Price</p>

            <h3 className="text-3xl font-extrabold text-violet-400">
              ৳ {product.price.toLocaleString()}
            </h3>
          </div>

          <Link href={`/products/${product._id}`}>
            <Button
              radius="full"
              className="
                bg-gradient-to-r
                from-violet-600
                to-fuchsia-600
                text-white
                font-semibold
                px-6
                hover:scale-105
              "
              endContent={<FaArrowRight />}
            >
              Details
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}