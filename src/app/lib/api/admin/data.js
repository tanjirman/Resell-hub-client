

import { baseURL } from "../baseUrl";

export const getDashboardOverview = async () => {
  const res = await fetch(`${baseURL}/api/admin/dashboard`);

  return await res.json();
};

// Get all users


export const getAllUsers = async () => {
  const res = await fetch(`${baseURL}/api/users`);

  return await res.json();
};

// Block / Unblock user
export const updateUserStatus = async (id, isBlocked) => {
  const res = await fetch(`${baseURL}/api/admin/users/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ isBlocked }),
  });

  return await res.json();
};

// Delete user
export const deleteUser = async (id) => {
  const res = await fetch(`${baseURL}/api/admin/users/${id}`, {
    method: "DELETE",
  });

  return await res.json();
};

export const getAllProducts = async () => {
  const res = await fetch(`${baseURL}/api/admin/products`);
  return await res.json();
};

export const approveProduct = async (id) => {
  const res = await fetch(
    `${baseURL}/api/admin/products/${id}/approve`,
    {
      method: "PATCH",
    }
  );

  return await res.json();
};

export const rejectProduct = async (id) => {
  const res = await fetch(
    `${baseURL}/api/admin/products/${id}/reject`,
    {
      method: "PATCH",
    }
  );

  return await res.json();
};

export const deleteProduct = async (id) => {
  const res = await fetch(
    `${baseURL}/api/admin/products/${id}`,
    {
      method: "DELETE",
    }
  );

  return await res.json();
};