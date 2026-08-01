import { baseURL } from "../baseUrl";

export const createOrder = async (orderData) => {
  const res = await fetch(`${baseURL}/api/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
  });

  return await res.json();
};

export const getBuyerOrders = async (email) => {
  const res = await fetch(`${baseURL}/api/orders/buyer/${email}`);

  return await res.json();
};

export const getSellerOrders = async (email) => {
  const res = await fetch(`${baseURL}/api/orders/seller/${email}`);

  return await res.json();
};

export const updateOrderStatus = async (id, status) => {
  const res = await fetch(`${baseURL}/api/orders/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });

  return await res.json();
};

export const cancelOrder = async (id) => {
  const res = await fetch(`${baseURL}/api/orders/cancel/${id}`, {
    method: "PATCH",
  });

  return await res.json();
};