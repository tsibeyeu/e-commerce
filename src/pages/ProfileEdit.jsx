import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProfileEdit = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [savingPassword, setSavingPassword] = useState(false);

  const { backendURL, token } = useContext(ShopContext);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }
    const fetchUser = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${backendURL}/api/user/me`, {
          headers: { token },
        });
        if (res.data?.success) setUser(res.data.user);
      } catch (err) {
        toast.error(err?.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
    // eslint-disable-next-line
  }, [token, backendURL]);

  if (loading) return <div className="pt-20 text-center">Loading...</div>;
  if (!user) return <div className="pt-20 text-center">No user</div>;

  const onChange = (field, value) => {
    setUser((u) => ({ ...u, [field]: value }));
  };

  const saveField = async (field) => {
    if (!token) return toast.error("Not authenticated");
    setSaving(true);
    try {
      const payload = { [field]: user[field] };
      const res = await axios.put(`${backendURL}/api/user/me`, payload, {
        headers: { token },
      });
      if (res.data?.success) {
        setUser(res.data.user);
        toast.success("Saved");
      } else {
        toast.error(res.data?.message || "Save failed");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async (e) => {
    e?.preventDefault();
    if (!token) return toast.error("Not authenticated");
    if (!oldPassword || !newPassword) return toast.error("Fill both fields");
    if (newPassword !== confirmPassword)
      return toast.error("Passwords do not match");
    if (newPassword.length < 6)
      return toast.error("Password must be at least 6 characters");

    setSavingPassword(true);
    try {
      const res = await axios.put(
        `${backendURL}/api/user/password`,
        { oldPassword, newPassword },
        { headers: { token } },
      );
      if (res.data?.success) {
        toast.success("Password updated");
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        toast.error(res.data?.message || "Failed to update password");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message);
    } finally {
      setSavingPassword(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 px-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Edit Profile</h2>
          <div className="flex gap-2">
            <button
              onClick={() => navigate(-1)}
              className="px-3 py-1 border rounded text-sm"
            >
              Back
            </button>
            <button
              disabled={saving}
              onClick={() => {
                saveField("name");
                saveField("email");
              }}
              className="bg-black text-white px-3 py-1 rounded text-sm"
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </div>

        <div className="grid gap-4">
          <label className="flex flex-col">
            <span className="text-sm text-gray-500">Name</span>
            <input
              className="border px-3 py-2 rounded"
              value={user.name || ""}
              onChange={(e) => onChange("name", e.target.value)}
              onBlur={() => saveField("name")}
            />
          </label>

          <label className="flex flex-col">
            <span className="text-sm text-gray-500">Email</span>
            <input
              className="border px-3 py-2 rounded"
              value={user.email || ""}
              onChange={(e) => onChange("email", e.target.value)}
              onBlur={() => saveField("email")}
            />
          </label>
        </div>
        <div className="mt-8 border-t pt-6">
          <h3 className="text-lg font-medium mb-3">Change password</h3>
          <form onSubmit={handleChangePassword} className="grid gap-3">
            <input
              type="password"
              placeholder="Current password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="border px-3 py-2 rounded"
            />
            <input
              type="password"
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="border px-3 py-2 rounded"
            />
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="border px-3 py-2 rounded"
            />
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={savingPassword}
                className="bg-black text-white px-4 py-2 rounded"
              >
                {savingPassword ? "Saving..." : "Change password"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setOldPassword("");
                  setNewPassword("");
                  setConfirmPassword("");
                }}
                className="px-4 py-2 border rounded"
              >
                Clear
              </button>
            </div>
          </form>
        </div>

        <p className="mt-4 text-sm text-gray-500">
          Changes are saved automatically when you leave a field.
        </p>
      </div>
    </div>
  );
};

export default ProfileEdit;
