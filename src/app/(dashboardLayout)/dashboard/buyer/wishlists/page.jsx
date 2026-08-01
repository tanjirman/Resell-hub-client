import WishlistClient from "@/components/buyerDashboard/WishlistClient";
// import DashboardHeading from "@/components/DashboardHeading";
// import WishlistClient from "./WishlistClient";

export default function WishlistPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-8">Sales Analytics</h2>
      </div>

      <WishlistClient />
    </div>
  );
}