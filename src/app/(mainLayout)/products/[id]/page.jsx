import Link from "next/link";
import Image from "next/image";
import { Button, Card } from "@heroui/react";
import {
  FaArrowLeft,
  FaTag,
  FaBoxOpen,
  FaUser,
  FaEnvelope,
  FaCheckCircle,
} from "react-icons/fa";
import { baseURL } from "@/app/lib/api/baseUrl";
import ProductActionButtons from "@/components/ProductActionButtons";

// import { baseURL } from "@/lib/api/baseUrl";

const fetchProduct = async (id) => {
  const url = `${baseURL}/api/products/${id}`;

  console.log("Fetching:", url);

  const res = await fetch(url);

  console.log("Status:", res.status);

  const data = await res.json();

  console.log("Response:", data);

  return data;
};

export default async function ProductDetailsPage({ params }) {
  const { id } = await params;
  // console.log("ID:", id);

  const product = await fetchProduct(id);
  // console.log(product, "product");

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-[#090909] to-[#121212]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Back Button */}

        <Link href="/products">
          <Button
            variant="light"
            startContent={<FaArrowLeft />}
            className="mb-8 text-violet-400"
          >
            Back to Products
          </Button>
        </Link>

        {/* Layout */}

        <div className="grid lg:grid-cols-2 gap-12">
          {/* LEFT */}

          <Card className="overflow-hidden bg-[#111111] border border-white/10">
            <div className="relative h-137.5">
              <Image
                src={product?.image || "/placeholder-product.png"}
                alt={product?.title || "Product"}
                width={1200}
                height={1000}
                className="w-full h-125 object-cover rounded-xl"
                priority
              />
            </div>
          </Card>

          {/* RIGHT */}

          <div>
            <span className="inline-block mb-4 px-4 py-2 rounded-full bg-violet-600/20 text-violet-400 border border-violet-500/30 ">
              {product.category}
            </span>

            <h1 className="text-5xl font-black text-white mb-4">
              {product.title}
            </h1>

            <p className="text-gray-400 leading-8 mb-8">
              {product.description}
            </p>

            {/* Price */}

            <div className="mb-10">
              <p className="text-gray-500">Price</p>

              <h2 className="text-6xl font-black  text-violet-400">
                ৳ {product?.price?.toLocaleString()}
              </h2>
            </div>

            {/* Info */}

            <div className="grid md:grid-cols-2 gap-5 mb-10">
              <Card className="bg-[#151515] border border-white/10 p-5">
                <div className="flex items-center gap-3">
                  <FaTag className="text-violet-400" />

                  <div>
                    <p className="text-gray-500 text-sm">Condition</p>
                    <p className="font-semibold text-white">
                      {product.condition}
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="bg-[#151515] border border-white/10 p-5">
                <div className="flex items-center gap-3">
                  <FaBoxOpen className="text-violet-400" />

                  <div>
                    <p className="text-gray-500 text-sm">Quantity</p>
                    <p className="font-semibold text-white">
                      {product.quantity}
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="bg-[#151515] border border-white/10 p-5">
                <div className="flex items-center gap-3">
                  <FaCheckCircle className="text-green-400" />

                  <div>
                    <p className="text-gray-500 text-sm">Status</p>
                    <p className="font-semibold capitalize text-white">
                      {product.status}
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="bg-[#151515] border border-white/10 p-5">
                <div className="flex items-center gap-3">
                  <FaUser className="text-violet-400" />

                  <div>
                    <p className="text-gray-500 text-sm">Seller</p>
                    <p className="font-semibold text-white">
                      {product.sellerName}
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Seller */}

            <Card className="bg-[#111111] border border-white/10 p-6 mb-8">
              <h3 className="text-xl text-violet-400 font-bold mb-5">
                Seller Information
              </h3>

              <div className="flex items-center gap-3">
                <FaEnvelope className="text-violet-400" />

                <span className="text-white">{product.sellerEmail}</span>
              </div>
            </Card>

            {/* Buttons */}

            <div className="flex flex-wrap gap-5">
              <ProductActionButtons product={product} />

              
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
