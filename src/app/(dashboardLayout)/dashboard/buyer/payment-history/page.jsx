import PaymentHistoryClient from "@/components/buyerDashboard/PaymentHistoryClient";


export default function PaymentHistoryPage() {
  return (
    <div>
      <div>
        <h2 className="text-2xl font-bold text-white mb-8">Payment History</h2>
      </div>

      <PaymentHistoryClient />
    </div>
  );
}