import ManageProductsClient from "@/components/adminDashboard/ManageProductsClient";


export default function ManageProductsPage() {
  return (
    <div className="space-y-6">
     <div>
        <h2 className="text-2xl font-bold text-white mb-8">Manage Product</h2>
      </div>

      <ManageProductsClient />
    </div>
  );
}