// ...existing code...
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { backendURL, token } = useContext(ShopContext);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setLoading(false);
      setError("No token — please log in");
      return;
    }

    const fetchUser = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${backendURL}/api/user/me`, {
          headers: { token },
        });
        if (res.data?.success) setUser(res.data.user);
        else setError(res.data?.message || "Failed to load user");
      } catch (err) {
        setError(err?.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
    // eslint-disable-next-line
  }, [token, backendURL]);

  if (loading) return <div className="pt-20 text-center">Loading...</div>;
  if (error)
    return <div className="pt-20 text-center text-red-500">{error}</div>;
  if (!user)
    return <div className="pt-20 text-center">No profile available</div>;

  // derive initials for avatar
  const initials = (user.name || "")
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="max-w-3xl mx-auto mt-12 px-4">
      <div className="bg-white shadow-md rounded-lg overflow-hidden sm:flex">
        <div className="sm:w-1/3 flex items-center justify-center bg-gradient-to-tr from-pink-50 to-pink-100 p-6">
          <div className="w-28 h-28 rounded-full flex items-center justify-center bg-pink-200 text-white text-2xl font-semibold">
            {initials || "U"}
          </div>
        </div>

        <div className="sm:w-2/3 p-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">
                {user.name}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Member since:{" "}
                {user.date ? new Date(user.date).toLocaleDateString() : "—"}
              </p>
            </div>
            <div>
              <button
                className="bg-black text-white px-4 py-2 rounded text-sm hover:opacity-90"
                onClick={() => navigate("/profile/edit")} // optionally add edit route
              >
                Edit
              </button>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 text-gray-700">
            <div className="flex items-center gap-3">
              <span className="w-4 text-gray-500">✉️</span>
              <div>
                <div className="text-xs text-gray-500">Email</div>
                <div className="text-sm font-medium">{user.email}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="w-4 text-gray-500">📦</span>
              <div>
                <div className="text-xs text-gray-500">Orders</div>
                <div className="text-sm font-medium">
                  {user.ordersCount ?? 0}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="w-4 text-gray-500">🛒</span>
              <div>
                <div className="text-xs text-gray-500">Cart items</div>
                <div className="text-sm font-medium">
                  {Object.keys(user.cartData || {}).length}
                </div>
              </div>
            </div>
          </div>

          <p className="mt-6 text-sm text-gray-500">
            Update your profile information and manage orders from this page.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
// ...existing code...
