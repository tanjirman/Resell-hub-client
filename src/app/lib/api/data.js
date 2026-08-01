const API = process.env.NEXT_PUBLIC_API_URL;

export const getProfile = async (email) => {
  const res = await fetch(`${API}/api/profile/${email}`);

  console.log("Status:", res.status);
  console.log("URL:", `${API}/api/profile/${email}`);

  const data = await res.json();
  console.log(data);

  return data;
};

export const updateProfile = async (email, profile) => {
  const res = await fetch(`${API}/api/profile/${email}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(profile),
  });

  return res.json();
};