import ManageUsersClient from "@/components/adminDashboard/ManageUsersClient";


export default function ManageUsersPage() {
  return (
    <div>
      <div>
        <h2 className="text-2xl font-bold text-white mb-8">Manage User</h2>
      </div>

      <ManageUsersClient />
    </div>
  );
}