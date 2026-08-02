import { NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb";

export async function POST(req) {
  try {
    const payment = await req.json();

    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);

    const result = await db.collection("payments").insertOne({
      orderId: payment.orderId,
      transactionId: payment.transactionId,
      amount: payment.amount,
      paymentStatus: payment.paymentStatus,
      paymentMethod: payment.paymentMethod,
      buyerId: payment.buyerId,
      buyerEmail: payment.buyerEmail,
      createdAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      insertedId: result.insertedId,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);

    const email = searchParams.get("email");

    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);

    const payments = await db
      .collection("payments")
      .find({ buyerEmail: email })
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({
      success: true,
      payments,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}