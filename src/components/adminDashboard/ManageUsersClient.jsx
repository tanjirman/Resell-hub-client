"use client";

import { useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";
import { Input, Button, Chip } from "@heroui/react";
import { FaSearch, FaTrash, FaLock, FaLockOpen } from "react-icons/fa";
import { getAllUsers,updateUserStatus, deleteUser } from "@/app/lib/api/admin/data";


export default function ManageUsersClient() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const loadUsers = async () => {
    setLoading(true);

    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  useEffect(() => {
  const fetchUsers = async () => {
    setLoading(true);

    try {
      const data = await getAllUsers();
      setUsers(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  fetchUsers();
}, []);

  const filteredUsers = useMemo(() => {
    return users.filter(
      (user) =>
        user.name?.toLowerCase().includes(search.toLowerCase()) ||
        user.email?.toLowerCase().includes(search.toLowerCase())
    );
  }, [users, search]);

  const handleBlock = async (user) => {
    const result = await Swal.fire({
      title: user.isBlocked ? "Unblock User?" : "Block User?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
    });

    if (!result.isConfirmed) return;

    const res = await updateUserStatus(user._id, !user.isBlocked);

    if (res.success) {
      Swal.fire({
        icon: "success",
        title: "Updated",
        timer: 1500,
        showConfirmButton: false,
      });

      loadUsers();
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete User?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
    });

    if (!result.isConfirmed) return;

    const res = await deleteUser(id);

    if (res.success) {
      Swal.fire({
        icon: "success",
        title: "Deleted",
        timer: 1500,
        showConfirmButton: false,
      });

      loadUsers();
    }
  };

  if (loading) {
    return (
      <div className="py-20 text-center text-gray-400">
        Loading users...
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <div className="max-w-md">
  <Input
    placeholder="Search users..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />
</div>

      <div className="overflow-x-auto rounded-xl border border-white/10 bg-black/40">

        <table className="w-full">

          <thead className="bg-violet-900/40 text-white">

            <tr>

              <th className="p-4 text-left">#</th>

              <th className="p-4 text-left">Name</th>

              <th className="p-4 text-left">Email</th>

              <th className="p-4 text-left">Role</th>

              <th className="p-4 text-left">Status</th>

              <th className="p-4 text-center">Actions</th>

            </tr>

          </thead>

          <tbody>

            {filteredUsers.length === 0 ? (
              <tr>

                <td
                  colSpan={6}
                  className="py-12 text-center text-gray-400"
                >
                  No users found.
                </td>

              </tr>
            ) : (
              filteredUsers.map((user, index) => (
                <tr
                  key={user._id}
                  className="border-b border-white/10 hover:bg-white/5"
                >
                  <td className="p-4">{index + 1}</td>

                  <td className="p-4 text-white">
                    {user.name}
                  </td>

                  <td className="p-4 text-gray-300">
                    {user.email}
                  </td>

                  <td className="p-4">

                    <Chip
                      color={
                        user.role === "admin"
                          ? "warning"
                          : user.role === "seller"
                          ? "secondary"
                          : "primary"
                      }
                    >
                      {user.role}
                    </Chip>

                  </td>

                  <td className="p-4">

                    <Chip
                      color={user.isBlocked ? "danger" : "success"}
                    >
                      {user.isBlocked ? "Blocked" : "Active"}
                    </Chip>

                  </td>

                  <td className="p-4">

                    <div className="flex justify-center gap-2">

                      <Button
                        isIconOnly
                        color={user.isBlocked ? "success" : "warning"}
                        onPress={() => handleBlock(user)}
                      >
                        {user.isBlocked ? (
                          <FaLockOpen />
                        ) : (
                          <FaLock />
                        )}
                      </Button>

                      <Button
                        isIconOnly
                        color="danger"
                        onPress={() => handleDelete(user._id)}
                      >
                        <FaTrash />
                      </Button>

                    </div>

                  </td>

                </tr>
              ))
            )}

          </tbody>

        </table>

      </div>
    </div>
  );
}