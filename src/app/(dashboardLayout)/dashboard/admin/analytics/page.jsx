import AnalyticsClient from "@/components/adminDashboard/AnalyticsClient";


export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-8">Analytics</h2>
      </div>

      <AnalyticsClient />
    </div>
  );
}