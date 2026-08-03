import ManageOrdersClient from "@/components/adminDashboard/ManageOrdersClient";


export default function ManageOrdersPage() {
  return (
    <div className="space-y-6">
       <div>
        <h2 className="text-2xl font-bold text-white mb-8">Manage order</h2>
      </div>

      <ManageOrdersClient />
    </div>
  );
}