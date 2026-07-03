import QuickActions from '@/components/sellerDashboard/QuickActions';
import RecentOrders from '@/components/sellerDashboard/RecentOrders';
import RecentProducts from '@/components/sellerDashboard/RecentProducts';
import SalesSummary from '@/components/sellerDashboard/SalesSummary';
import StatsCards from '@/components/sellerDashboard/StatsCards';
import React from 'react';

const SellerPage = () => {
    return (
        <div className="space-y-8">
      <StatsCards />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <SalesSummary />
        </div>

        <QuickActions />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <RecentOrders />
        <RecentProducts />
      </div>
    </div>
    );
};

export default SellerPage;