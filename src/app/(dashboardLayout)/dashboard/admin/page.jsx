import DashboardOverviewClient from "@/components/adminDashboard/DashboardOverviewClient";


export default function AdminDashboardPage() {
  return (
    <div>
      {/* <DashboardHeading
        title="Dashboard Overview"
        description="The admin has full control over the platform."
      /> */}

      <DashboardOverviewClient />
    </div>
  );
}