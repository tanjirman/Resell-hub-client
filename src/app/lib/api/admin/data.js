// import { baseURL } from "../baseUrl";

import { baseURL } from "../baseUrl";

export const getDashboardOverview = async () => {
  const res = await fetch(`${baseURL}/api/admin/dashboard`);

  return await res.json();
};