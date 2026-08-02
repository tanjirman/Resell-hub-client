"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@heroui/react";
import { FaCheckCircle } from "react-icons/fa";
import { useSession } from "@/app/lib/auth-client";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const { data: session } = useSession();

  const orderId = searchParams.get("orderId");
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    const savePayment = async () => {
      if (!orderId || !sessionId || !session?.user) return;

      try {
        await fetch("http://localhost:5000/api/payments", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            orderId,
            buyerId: session.user.id,
            buyerEmail: session.user.email,
            transactionId: sessionId,
            paymentMethod: "Card",
            paymentStatus: "Paid",
          }),
        });
      } catch (error) {
        console.error("Payment Save Error:", error);
      }
    };

    savePayment();
  }, [orderId, sessionId, session]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-950 via-slate-950 to-black px-6">
      <div className="w-full max-w-md rounded-3xl border border-violet-500/20 bg-white/5 backdrop-blur-xl shadow-2xl p-10 text-center">

        <div className="flex justify-center">
          <div className="rounded-full bg-green-500/10 p-4">
            <FaCheckCircle className="text-7xl text-green-500" />
          </div>
        </div>

        <h1 className="mt-6 text-3xl font-bold text-white">
          Payment Successful!
        </h1>

        <p className="mt-3 text-gray-400">
          Thank you for your purchase. Your payment has been completed successfully.
        </p>

        <div className="my-8 border-t border-white/10" />

        <Link href="/dashboard/buyer/payment-history">
          <Button
            size="lg"
            className="w-full bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white"
          >
            View Payment History
          </Button>
        </Link>
      </div>
    </div>
  );
}