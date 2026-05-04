import axios from "axios";

export const syncUser = async () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const res = await axios.get("http://localhost:3003/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const user = res.data;

    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("role", user.role.toLowerCase());
    localStorage.setItem("userId", user._id);

    return user;
  } catch (err) {
    console.error("Auth sync failed", err);

    localStorage.clear();
    return null;
  }
};