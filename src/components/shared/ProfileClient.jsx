"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Swal from "sweetalert2";
import { FaUser, FaEnvelope, FaUserTag, FaSave } from "react-icons/fa";

import { useSession } from "@/app/lib/auth-client";
import { getProfile,updateProfile } from "@/app/lib/api/data";

// import {
//   getProfile,
//   updateProfile,
// } from "@/app/lib/api/profile/data";

export default function ProfileClient() {
  const { data: session } = useSession();

  const [profile, setProfile] = useState(null);

  const [name, setName] = useState("");

  const [image, setImage] = useState("");

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!session?.user?.email) return;

    const fetchProfile = async () => {
      try {
        setLoading(true);

        const data = await getProfile(session.user.email);

        setProfile(data);

        setName(data.name || "");

        setImage(data.image || "");
      } catch (error) {
        console.error(error);

        Swal.fire({
          icon: "error",
          title: "Failed",
          text: "Unable to load profile.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [session?.user?.email]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const res = await updateProfile(session.user.email, {
        name,
        image,
      });

      if (res.success) {
        setProfile({
          ...profile,
          name,
          image,
        });

        Swal.fire({
          icon: "success",
          title: "Profile Updated",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: "Unable to update profile.",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-24">
        <span className="loading loading-spinner loading-lg text-violet-500"></span>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      {/* Left Card */}

      <div className="rounded-xl border border-gray-800 bg-gray-900 p-8 shadow-lg">

        <div className="flex flex-col items-center">

          <Image
            src={image || "/default-avatar.png"}
            alt={name}
            width={150}
            height={150}
            className="h-36 w-36 rounded-full border-4 border-violet-500 object-cover"
          />

          <h2 className="mt-5 text-2xl font-bold text-white">
            {profile?.name}
          </h2>

          <span className="mt-2 rounded-full bg-violet-600 px-4 py-1 text-sm text-white capitalize">
            {profile?.role}
          </span>

        </div>

        <div className="mt-8 space-y-5">

          <div className="flex items-center gap-3">
            <FaEnvelope className="text-violet-400" />

            <span className="text-gray-300">
              {profile?.email}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <FaUserTag className="text-violet-400" />

            <span className="capitalize text-gray-300">
              {profile?.role}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <FaUser className="text-violet-400" />

            <span className="text-gray-300">
              {profile?._id}
            </span>
          </div>

        </div>
      </div>

      {/* Right Form */}

      <div className="lg:col-span-2 rounded-xl border border-gray-800 bg-gray-900 p-8 shadow-lg">

        <h2 className="mb-8 text-2xl font-bold text-white">
          Edit Profile
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Full Name
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border border-gray-700 bg-black px-4 py-3 text-white outline-none focus:border-violet-500"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Email
            </label>

            <input
              type="email"
              value={profile?.email}
              disabled
              className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-gray-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-300">
              Profile Image URL
            </label>

            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full rounded-lg border border-gray-700 bg-black px-4 py-3 text-white outline-none focus:border-violet-500"
            />
          </div>

          <div className="flex justify-end">

            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 rounded-lg bg-violet-600 px-6 py-3 font-semibold text-white transition hover:bg-violet-700 disabled:opacity-60"
            >
              <FaSave />

              {saving ? "Saving..." : "Save Changes"}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
}