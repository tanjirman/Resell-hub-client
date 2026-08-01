"use client";

import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { FaHeart, FaShoppingCart } from "react-icons/fa";

import { useSession } from "@/app/lib/auth-client";
import { createOrder } from "@/app/lib/api/orders/data";

import { addWishlist } from "@/app/lib/api/wishlist/data";


export default function ProductActionButtons({ product }) {
  const router = useRouter();
  const { data: session } = useSession();

  const handleBuyNow = async () => {
    // User not logged in
    if (!session?.user) {
      Swal.fire({
        icon: "warning",
        title: "Login Required",
        text: "Please login first to purchase this product.",
      });

      router.push("/login");
      return;
    }

    // Only buyers can order
    if (session.user.role !== "buyer") {
      Swal.fire({
        icon: "error",
        title: "Access Denied",
        text: "Only buyers can order products.",
      });
      return;
    }

    // Product unavailable
    if (product.quantity <= 0) {
      Swal.fire({
        icon: "error",
        title: "Out of Stock",
        text: "This product is no longer available.",
      });
      return;
    }

    try {
      const orderData = {
        buyerId: session.user.id,
        buyerName: session.user.name,
        buyerEmail: session.user.email,

        sellerId: product.sellerId,
        sellerName: product.sellerName,
        sellerEmail: product.sellerEmail,

        productId: product._id,

        quantity: 1,
      };

      const res = await createOrder(orderData);

      if (res.success) {
        Swal.fire({
          icon: "success",
          title: "Order Placed!",
          text: "Your order has been placed successfully.",
          timer: 1800,
          showConfirmButton: false,
        });

        router.push("/dashboard/buyer/my-orders");
        router.refresh();
      } else {
        Swal.fire({
          icon: "error",
          title: "Order Failed",
          text: res.message || "Something went wrong.",
        });
      }
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to place order.",
      });
    }
  };

  const handleWishlist = async () => {
  if (!session?.user) {
    return Swal.fire({
      icon: "warning",
      title: "Login Required",
      text: "Please login first.",
    });
  }

  if (session.user.role !== "buyer") {
    return Swal.fire({
      icon: "error",
      title: "Only Buyers",
      text: "Only buyers can add products to wishlist.",
    });
  }

  const wishlistData = {
    buyerId: session.user.id,
    buyerName: session.user.name,
    buyerEmail: session.user.email,

    productId: product._id,
  };

  const res = await addWishlist(wishlistData);

  if (res.success) {
    Swal.fire({
      icon: "success",
      title: "Added to Wishlist",
      timer: 1500,
      showConfirmButton: false,
    });
    router.push("/dashboard/buyer/wishlists");
  } else {
    Swal.fire({
      icon: "info",
      title: res.message,
    });
  }
};

  return (
    <div className="flex flex-wrap gap-5">
      {session?.user?.role === "buyer" && (
        <>
          <Button
            size="lg"
            startContent={<FaShoppingCart />}
            onPress={handleBuyNow}
            className="bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold px-10"
          >
            Buy Now
          </Button>

          <Button
  size="lg"
  variant="bordered"
  startContent={<FaHeart />}
  className="border-violet-500 text-violet-400"
  onClick={handleWishlist}
>
 <FaHeart /> Wishlist
</Button>
        </>
      )}

      {session?.user?.role === "seller" && (
        <Button
          size="lg"
          isDisabled
          className="bg-gray-700 text-white cursor-not-allowed"
        >
          Sellers cannot purchase products
        </Button>
      )}

      {!session?.user && (
        <Button
          size="lg"
          startContent={<FaShoppingCart />}
          onPress={() => router.push("/login")}
          className="bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white"
        >
          Login to Buy
        </Button>
      )}
    </div>
  );
}