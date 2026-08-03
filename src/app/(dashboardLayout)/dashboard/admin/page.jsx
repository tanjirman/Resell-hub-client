import DashboardOverviewClient from "@/components/adminDashboard/DashboardOverviewClient";


export default function AdminDashboardPage() {
  return (
    <div>
      <div>
        <h2 className="text-2xl font-bold text-white mb-8">Overview</h2>
      </div>

      <DashboardOverviewClient />
    </div>
  );
}