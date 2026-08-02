import MyOrdersClient from "@/components/buyerDashboard/MyOrdersClient";
// import DashboardHeading from "@/components/DashboardHeading";
// import MyOrdersClient from "./MyOrdersClient";

const MyOrdersPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-8">My Orders</h2>
      </div>

      <MyOrdersClient />
    </div>
  );
};

export default MyOrdersPage;