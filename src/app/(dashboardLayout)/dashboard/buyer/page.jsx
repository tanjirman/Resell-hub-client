// import StatsCard from "@/components/dashboard/buyer/StatsCard";
// import RecentPurchases from "@/components/dashboard/buyer/RecentPurchases";
// import QuickActions from "@/components/dashboard/buyer/QuickActions";

import QuickActions from "@/components/buyerDashboard/QuickActions";
import RecentPurchases from "@/components/buyerDashboard/RecentPurchases";
import StatsCard from "@/components/buyerDashboard/StatsCard";
import {
  FaShoppingBag,
  FaHeart,
  FaBoxOpen,
} from "react-icons/fa";

export default function BuyerDashboard() {

  // Fake data (replace later with API)
  const stats = {
    totalOrders: 24,
    wishlist: 11,
    recentPurchases: 5,
  };

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-3xl font-bold text-white">
          Buyer Dashboard
        </h1>

        <p className="text-slate-400 mt-2">
          Welcome back! Here is a quick overview of your shopping activity.
        </p>
      </div>

      {/* Statistics */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

        <StatsCard
          title="Total Orders"
          value={stats.totalOrders}
          icon={<FaShoppingBag />}
        />

        <StatsCard
          title="Wishlist"
          value={stats.wishlist}
          icon={<FaHeart />}
        />

        <StatsCard
          title="Recent Purchases"
          value={stats.recentPurchases}
          icon={<FaBoxOpen />}
        />

      </div>

      <div className="grid xl:grid-cols-3 gap-6">

        <div className="xl:col-span-2">
          <RecentPurchases />
        </div>

        <QuickActions />

      </div>

    </div>
  );
}