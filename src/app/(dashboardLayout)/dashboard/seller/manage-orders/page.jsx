import { headers } from "next/headers";
import { Suspense } from "react";
import { Spinner } from "@heroui/react";
import { myProducts } from "@/app/lib/api/add-product/data";
import ManageOrdersClient from "./ManageOrdersClient";
import { auth } from "@/app/lib/auth";

const ManageEvent = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const orders = await myProducts(session?.user?.email);

  return (
    <div>
      <div>
        <h2 className="text-2xl font-bold text-white">Manage Orders</h2>
      </div>
      <Suspense fallback={<Spinner />}>
        <ManageOrdersClient orders={orders} />
      </Suspense>
    </div>
  );
};

export default ManageEvent;
