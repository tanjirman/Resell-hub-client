const orders = [
  {
    id: "#1023",
    customer: "John",
    amount: "$450",
    status: "Pending",
  },
  {
    id: "#1024",
    customer: "Alex",
    amount: "$220",
    status: "Processing",
  },
  {
    id: "#1025",
    customer: "Sarah",
    amount: "$760",
    status: "Delivered",
  },
];

const statusColors = {
  Pending: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
  Processing: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
  Delivered: "bg-green-500/20 text-green-400 border border-green-500/30",
};

export default function RecentOrders() {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-lg transition-all duration-300 hover:border-purple-500/40">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-white">
          Recent Orders
        </h2>

        <button className="text-sm text-purple-400 hover:text-purple-300 transition">
          View All
        </button>
      </div>

      <div className="space-y-3">
        {orders.map((order) => (
          <div
            key={order.id}
            className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-800/40 p-4 transition hover:bg-zinc-800 hover:border-purple-500/30"
          >
            <div>
              <h3 className="font-semibold text-white">
                {order.id}
              </h3>

              <p className="text-sm text-zinc-400">
                {order.customer}
              </p>
            </div>

            <div className="text-right">
              <p className="font-semibold text-white">
                {order.amount}
              </p>

              <span
                className={`inline-block mt-2 rounded-full px-3 py-1 text-xs font-medium ${statusColors[order.status]}`}
              >
                {order.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}