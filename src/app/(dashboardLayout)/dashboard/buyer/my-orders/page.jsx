import MyOrdersClient from "@/components/buyerDashboard/MyOrdersClient";
// import DashboardHeading from "@/components/DashboardHeading";
// import MyOrdersClient from "./MyOrdersClient";

const MyOrdersPage = () => {
  return (
    <div className="space-y-6">
      {/* <DashboardHeading
        title="My Orders"
        description="View, track, and manage all your orders."
      /> */}

      <MyOrdersClient />
    </div>
  );
};

export default MyOrdersPage;