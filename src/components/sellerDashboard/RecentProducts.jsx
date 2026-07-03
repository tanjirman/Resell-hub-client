const products = [
  {
    title: "MacBook Pro M2",
    stock: 5,
    price: "$850",
  },
  {
    title: "iPhone 14 Pro",
    stock: 12,
    price: "$720",
  },
  {
    title: "Gaming Monitor",
    stock: 3,
    price: "$300",
  },
];

export default function RecentProducts() {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-lg transition-all duration-300 hover:border-purple-500/40">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-white">
          Latest Products
        </h2>

        <button className="text-sm text-purple-400 hover:text-purple-300 transition">
          View All
        </button>
      </div>

      <div className="space-y-3">
        {products.map((product) => (
          <div
            key={product.title}
            className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-800/40 p-4 transition hover:bg-zinc-800 hover:border-purple-500/30"
          >
            <div>
              <h3 className="font-semibold text-white">
                {product.title}
              </h3>

              <p className="text-sm text-zinc-400">
                {product.price}
              </p>
            </div>

            <span className="rounded-full bg-purple-500/20 px-3 py-1 text-sm font-medium text-purple-400">
              Stock: {product.stock}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}