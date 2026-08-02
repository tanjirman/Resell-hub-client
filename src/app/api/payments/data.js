// import { baseURL } from "../baseUrl";

import { baseURL } from "@/app/lib/api/baseUrl";

export const createPayment = async (paymentData) => {
  const res = await fetch(`${baseURL}/api/payments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(paymentData),
  });

  return await res.json();
};

export const getBuyerPayments = async (email) => {
  const res = await fetch(
    `${baseURL}/api/payments?email=${email}`
  );

  return await res.json();
};