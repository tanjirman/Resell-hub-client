import { baseURL } from "../baseUrl";

// Add to Wishlist
export const addWishlist = async (wishlistData) => {
  const res = await fetch(`${baseURL}/api/wishlist`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(wishlistData),
  });

  return res.json();
};

// Get Buyer's Wishlist
export const getWishlist = async (email) => {
  const res = await fetch(`${baseURL}/api/wishlist/${email}`, {
    cache: "no-store",
  });

  return res.json();
};

// Remove Wishlist Item
export const removeWishlist = async (id) => {
  const res = await fetch(`${baseURL}/api/wishlist/${id}`, {
    method: "DELETE",
  });

  return res.json();
};