"use client";

import { useEffect, useState } from "react";
import { Chip } from "@heroui/react";
import { useSession } from "@/app/lib/auth-client";
import { getBuyerPayments } from "@/app/api/payments/data";

export default function PaymentHistoryClient() {
  const { data: session } = useSession();

  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPayments = async () => {
      if (!session?.user?.email) return;

      try {
        setLoading(true);

        const result = await getBuyerPayments(session.user.email);

        setPayments(Array.isArray(result) ? result : []);
      } catch (error) {
        console.log(error);
        setPayments([]);
      } finally {
        setLoading(false);
      }
    };

    loadPayments();
  }, [session]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-72 rounded-2xl border border-violet-500/20 bg-[#161616]">
        <p className="text-gray-300 text-lg">Loading payment history...</p>
      </div>
    );
  }

  if (payments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-80 rounded-2xl border border-dashed border-violet-500/30 bg-[#161616]">
        <h2 className="text-2xl font-semibold text-white">
          No Payment History
        </h2>

        <p className="mt-2 text-gray-400">
          You haven't made any payments yet.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-violet-500/20 bg-[#161616] shadow-xl">
      <table className="w-full">
        <thead className="bg-violet-700/20">
          <tr className="border-b border-violet-500/20">
            <th className="px-5 py-4 text-left text-gray-200">#</th>
            <th className="px-5 py-4 text-left text-gray-200">
              order
            </th>
            <th className="px-5 py-4 text-left text-gray-200">Amount</th>
            <th className="px-5 py-4 text-left text-gray-200">Status</th>
            <th className="px-5 py-4 text-left text-gray-200">Method</th>
            <th className="px-5 py-4 text-left text-gray-200">Date</th>
          </tr>
        </thead>

        <tbody>
          {payments.map((payment, index) => (
            <tr
              key={payment._id}
              className="border-b border-white/5 hover:bg-white/5 transition"
            >
              <td className="px-5 py-4 text-gray-300">
                {index + 1}
              </td>

              <td className="px-5 py-4 font-mono text-violet-300">
                {payment.orderId.slice(-4)}
              </td>

              <td className="px-5 py-4 text-white font-semibold">
                ৳ {payment.amount}
              </td>

              <td className="px-5 py-4">
                <Chip
                  color={
                    payment.paymentStatus === "Paid"
                      ? "success"
                      : payment.paymentStatus === "Pending"
                      ? "warning"
                      : "danger"
                  }
                  variant="flat"
                >
                  {payment.paymentStatus}
                </Chip>
              </td>

              <td className="px-5 py-4 text-gray-300">
                {payment.paymentMethod}
              </td>

              <td className="px-5 py-4 text-gray-300">
                {new Date(payment.paymentDate).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}