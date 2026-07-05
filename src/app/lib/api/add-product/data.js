

import { serverFetch } from "../server";

export const myProducts = async (email) => {
  const result = await serverFetch(`/api/products/${email}`);
  console.log(result, 'my product');

  return result;
};