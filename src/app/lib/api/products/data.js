import { baseURL } from "../baseUrl";

export const fetchProducts = async (params = new URLSearchParams()) => {
  const res = await fetch(
    `${baseURL}/api/products?${params.toString()}`,
    {
      cache: "no-store",
    }
  );

  console.log("Status:", res.status);

  if (!res.ok) {
    const errorText = await res.text();
    console.log("Response:", errorText);

    throw new Error(`Failed to fetch products (${res.status})`);
  }

  return res.json();
};