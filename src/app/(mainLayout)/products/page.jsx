import { Suspense } from "react";
import { Card } from "@heroui/react";
import { fetchProducts } from "@/app/lib/api/products/data";
import ProductCard from "@/components/PruductCard";
// import ProductCard from "@/components/ProductCard";
// import { fetchProducts } from "@/lib/api/products/data";

export default async function ProductsPage({ searchParams }) {
  const sParams = await searchParams;

  const search = sParams.search || "";
  const category = sParams.category || "";
  const condition = sParams.condition || "";

  const params = new URLSearchParams();

  if (search) params.set("search", search);
  if (category) params.set("category", category);
  if (condition) params.set("condition", condition);

  const products = await fetchProducts(params);

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-[#090909] to-[#111111]">

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-10">

        <div className="grid lg:grid-cols-2 gap-10 items-center">

          {/* Left */}
          <div>

            <span className="inline-block mb-5 px-4 py-2 rounded-full bg-violet-600/20 text-violet-400 border border-violet-500/30">
              Premium Marketplace
            </span>

            <h1 className="text-5xl lg:text-7xl font-black leading-tight">

              Buy & Sell

              <br />

              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent">
                Second-Hand Products
              </span>

            </h1>

            <p className="mt-6 text-lg text-gray-400 max-w-xl leading-8">
              Discover quality electronics, furniture, fashion and more from
              trusted sellers. Save money while shopping smarter.
            </p>

            <div className="flex gap-5 mt-10">

              <div className="bg-[#181818] px-6 py-4 rounded-2xl border border-white/10">
                <h2 className="text-3xl font-bold text-violet-400">
                  {products.length}+
                </h2>

                <p className="text-gray-400 text-sm">
                  Products
                </p>
              </div>

              <div className="bg-[#181818] px-6 py-4 rounded-2xl border border-white/10">
                <h2 className="text-3xl font-bold text-pink-500">
                  24/7
                </h2>

                <p className="text-gray-400 text-sm">
                  Marketplace
                </p>
              </div>

            </div>

          </div>

          {/* Right */}
          <div className="relative hidden lg:block">

            <div className="absolute -left-10 top-10 h-60 w-60 rounded-full bg-violet-600 blur-[120px] opacity-20"></div>

            <div className="absolute right-0 bottom-0 h-60 w-60 rounded-full bg-pink-600 blur-[120px] opacity-20"></div>

            <div className="relative bg-[#131313] border border-white/10 rounded-3xl p-10">

              <h2 className="text-3xl font-bold mb-4">
                Find Amazing Deals
              </h2>

              <p className="text-gray-400">
                Browse thousands of quality second-hand products with confidence.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* Products */}
      <section className="max-w-7xl mx-auto px-6 pb-20">

        <div className="flex items-center justify-between mb-10">

          <h2 className="text-3xl font-bold text-white">
            Latest Products
          </h2>

          <span className="text-gray-400">
            {products.length} items found
          </span>

        </div>

        <Suspense
          fallback={
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <Card
                  key={i}
                  className="h-[420px] bg-[#181818] animate-pulse"
                />
              ))}
            </div>
          }
        >
          {products.length === 0 ? (
            <div className="text-center py-20">

              <h2 className="text-3xl font-bold">
                No Products Found
              </h2>

              <p className="text-gray-500 mt-3">
                Try another search.
              </p>

            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                />
              ))}
            </div>
          )}
        </Suspense>

      </section>

    </main>
  );
}