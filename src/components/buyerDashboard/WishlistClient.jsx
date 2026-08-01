"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Swal from "sweetalert2";

import { FaHeart, FaTrash, FaShoppingCart, FaEye } from "react-icons/fa";

import { useSession } from "@/app/lib/auth-client";

import { getWishlist, removeWishlist } from "@/app/lib/api/wishlist/data";

export default function WishlistClient() {
  const { data: session } = useSession();

  const [wishlist, setWishlist] = useState([]);

  const [loading, setLoading] = useState(true);

  const loadWishlist = async () => {
  if (!session?.user?.email) return;

  try {
    setLoading(true);

    const data = await getWishlist(session.user.email);

    // console.log("Wishlist Data:", data);

    setWishlist(data);
  } finally {
    setLoading(false);
  }
};
  useEffect(() => {
    loadWishlist();
    // console.log("Wishlist:", data);
  }, [session?.user?.email]);

  const handleRemove = async (id) => {
    const result = await Swal.fire({
      title: "Remove Product?",
      text: "Remove this product from wishlist?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Remove",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await removeWishlist(id);

      if (res.success) {
        Swal.fire({
          icon: "success",
          title: "Removed",
          timer: 1500,
          showConfirmButton: false,
        });

        // Update UI without refetching
        setWishlist((prev) => prev.filter((item) => item._id !== id));
      }
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Unable to remove wishlist item.",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-24">
        <span className="loading loading-spinner loading-lg text-violet-500"></span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid md:grid-cols-3 gap-6">
        <SummaryCard
          title="Wishlist Items"
          value={wishlist.length}
          color="text-pink-400"
          icon={<FaHeart size={28} />}
        />
      </div>

      {wishlist.length === 0 ? (
        <div className="rounded-xl border border-gray-800 bg-gray-900 py-24 text-center">
          <FaHeart className="mx-auto text-pink-500" size={60} />

          <h2 className="mt-6 text-3xl font-bold text-white">
            Your Wishlist is Empty
          </h2>

          <p className="mt-4 text-gray-400">
            Save products to view them later.
          </p>

          <Link
            href="/products"
            className="mt-8 inline-block rounded-lg bg-violet-600 px-6 py-3 text-white hover:bg-violet-700"
          >
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {wishlist.map((item) => (
             

  
            <div
              key={item._id}
              className="overflow-hidden rounded-xl border border-gray-800 bg-gray-900 transition hover:border-violet-500"
            >
              <div className="relative h-56 w-full">
                <Image
                  src={item.productImage}
                  alt={item.productTitle}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="space-y-4 p-5">
                <h2 className="line-clamp-2 text-xl font-bold text-white">
                  {item.productTitle}
                </h2>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-violet-400">
                    ৳ {item.price}
                  </span>

                  <span className="rounded-full bg-gray-800 px-3 py-1 text-sm text-gray-300">
                    {item.category}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-400">
                  <span>Condition</span>

                  <span className="font-medium text-white">
                    {item.condition}
                  </span>
                </div>

                <div className="mt-6 flex gap-3">
                  <Link
                    href={`/products/${item.productId}`}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 py-2 text-white transition hover:bg-blue-700"
                  >
                    <FaEye />
                    Details
                  </Link>

                  <Link
                    href={`/products/${item.productId}`}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-violet-600 py-2 text-white transition hover:bg-violet-700"
                  >
                    <FaShoppingCart />
                    Buy
                  </Link>

                  <button
                    onClick={() => handleRemove(item._id)}
                    className="rounded-lg bg-red-600 px-4 text-white transition hover:bg-red-700"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
 
          ))}
        </div>
      )}
    </div>
  );
}

function SummaryCard({ title, value, color, icon }) {
  return (
    <div className="rounded-xl border border-gray-800 bg-gray-900 p-6 shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-400">{title}</p>

          <h2 className={`mt-2 text-3xl font-bold ${color}`}>{value}</h2>
        </div>

        <div className={color}>{icon}</div>
      </div>
    </div>
  );
}
