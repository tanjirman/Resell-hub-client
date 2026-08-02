import { NextResponse } from "next/server";
import Stripe from "stripe";
import { ObjectId } from "mongodb";
import clientPromise from "@/app/lib/mongodb";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const { orderId } = await req.json();

    if (!orderId) {
      return NextResponse.json(
        { success: false, message: "Order ID is required." },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);

    const order = await db.collection("orders").findOne({
      _id: new ObjectId(orderId),
    });

    if (!order) {
      return NextResponse.json(
        { success: false, message: "Order not found." },
        { status: 404 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",

      payment_method_types: ["card"],

      customer_email: order.buyerEmail,

      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: order.productTitle,
              images: order.productImage ? [order.productImage] : [],
            },
            unit_amount: Math.round(order.unitPrice * 100),
          },
          quantity: order.quantity,
        },
      ],

      metadata: {
        orderId: order._id.toString(),
        buyerId: order.buyerId,
        buyerEmail: order.buyerEmail,
        amount: order.totalPrice.toString(),
        productTitle: order.productTitle,
      },

      success_url: `${process.env.BETTER_AUTH_URL}/dashboard/buyer/success-payments?orderId=${order._id}&session_id={CHECKOUT_SESSION_ID}`,

      cancel_url: `${process.env.BETTER_AUTH_URL}/payment/cancel?orderId=${order._id}`,
    });

    return NextResponse.json({
      success: true,
      url: session.url,
    });
  } catch (error) {
    console.error("Stripe Checkout Error:", error);

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