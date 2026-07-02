"use client";

import Link from "next/link";
import {
  Card,
  CardHeader,
  CardContent as CardBody,
  Button,
} from "@heroui/react";

export default function QuickActions() {
  return (
    <Card className="bg-slate-900/50 border border-white/10">
      <CardHeader>
        <h2 className="text-xl font-bold text-white">
          Quick Actions
        </h2>
      </CardHeader>

      <CardBody className="space-y-3 text-white">
        <Button
          as={Link}
          href="/products"
          color="primary"
          className="w-full"
        >
          Browse Products
        </Button>

        <Button
          as={Link}
          href="/dashboard/buyer/orders"
          variant="bordered"
          className="w-full"
        >
          My Orders
        </Button>

        <Button
          as={Link}
          href="/dashboard/buyer/wishlist"
          variant="bordered"
          className="w-full"
        >
          Wishlist
        </Button>

        <Button
          as={Link}
          href="/dashboard/buyer/profile"
          variant="bordered"
          className="w-full"
        >
          Edit Profile
        </Button>
      </CardBody>
    </Card>
  );
}