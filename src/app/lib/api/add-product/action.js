'use server';

import { serverMutation } from '../server';

export const addProducts = async (data) => {
  return await serverMutation('/api/products', 'POST', data);
};

export const updateProducts = async (data, id) => {
  //   console.log(data, id, 'Update Org');

  const resData = await serverMutation(`/api/products/${id}`, 'PATCH', data);
  return resData;
};

export const deleteProduct = async (id) => {
  return await serverMutation(`/api/products/${id}`, "DELETE");
};