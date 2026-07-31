"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const monthlySales = [
  { month: "Jan", sales: 1200 },
  { month: "Feb", sales: 1800 },
  { month: "Mar", sales: 2400 },
  { month: "Apr", sales: 2100 },
  { month: "May", sales: 3200 },
  { month: "Jun", sales: 2900 },
  { month: "Jul", sales: 4200 },
  { month: "Aug", sales: 3900 },
  { month: "Sep", sales: 4700 },
  { month: "Oct", sales: 5200 },
  { month: "Nov", sales: 6100 },
  { month: "Dec", sales: 7300 },
];

const topProducts = [
  { name: "Wireless Mouse", value: 120 },
  { name: "Gaming Keyboard", value: 95 },
  { name: "27-inch Monitor", value: 70 },
  { name: "Bluetooth Headphones", value: 65 },
];

const COLORS = ["#3b82f6", "#22c55e", "#f59e0b", "#ef4444"];

const tooltipStyle = {
  backgroundColor: "#111827",
  border: "1px solid #374151",
  borderRadius: "8px",
  color: "#fff",
};

const StatCard = ({ title, value }) => (
  <div className="rounded-xl border border-gray-800 bg-gray-900 p-6 shadow-lg">
    <p className="text-sm text-gray-400">{title}</p>
    <h2 className="mt-2 text-3xl font-bold text-white">{value}</h2>
  </div>
);

export default function SalesAnalyticsClient() {
  return (
    <div className="space-y-8 bg-black text-white">
      {/* Summary Cards */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total Revenue" value="$12,450" />
        <StatCard title="Total Orders" value="254" />
        <StatCard title="Products Sold" value="812" />
        <StatCard title="Average Order" value="$49" />
      </div>

      {/* Sales Line Chart */}
      <div className="rounded-xl border border-gray-800 bg-gray-900 p-6 shadow-lg">
        <h2 className="mb-6 text-xl font-semibold text-white">
          Sales Chart
        </h2>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlySales}>
              <CartesianGrid stroke="#374151" strokeDasharray="3 3" />
              <XAxis dataKey="month" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={tooltipStyle}
                labelStyle={{ color: "#fff" }}
              />
              <Legend wrapperStyle={{ color: "#fff" }} />
              <Line
                type="monotone"
                dataKey="sales"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Monthly Sales */}
        <div className="rounded-xl border border-gray-800 bg-gray-900 p-6 shadow-lg">
          <h2 className="mb-6 text-xl font-semibold text-white">
            Monthly Sales Trend
          </h2>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlySales}>
                <CartesianGrid stroke="#374151" strokeDasharray="3 3" />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={tooltipStyle}
                  labelStyle={{ color: "#fff" }}
                />
                <Legend wrapperStyle={{ color: "#fff" }} />
                <Bar
                  dataKey="sales"
                  fill="#22c55e"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="rounded-xl border border-gray-800 bg-gray-900 p-6 shadow-lg">
          <h2 className="mb-6 text-xl font-semibold text-white">
            Top Selling Products
          </h2>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={topProducts}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={110}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {topProducts.map((item, index) => (
                    <Cell
                      key={item.name}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>

                <Tooltip
                  contentStyle={tooltipStyle}
                  labelStyle={{ color: "#fff" }}
                />
                <Legend wrapperStyle={{ color: "#fff" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-gray-800 bg-gray-900 p-6 shadow-lg">
        <h2 className="mb-6 text-xl font-semibold text-white">
          Top Selling Products
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full overflow-hidden rounded-lg">
            <thead className="bg-gray-800 text-gray-200">
              <tr>
                <th className="px-5 py-3 text-left">Product</th>
                <th className="px-5 py-3 text-left">Units Sold</th>
                <th className="px-5 py-3 text-left">Revenue</th>
              </tr>
            </thead>

            <tbody className="text-gray-300">
              <tr className="border-b border-gray-800 hover:bg-gray-800 transition">
                <td className="px-5 py-4">Wireless Mouse</td>
                <td className="px-5 py-4">120</td>
                <td className="px-5 py-4 text-green-400">$2,400</td>
              </tr>

              <tr className="border-b border-gray-800 hover:bg-gray-800 transition">
                <td className="px-5 py-4">Gaming Keyboard</td>
                <td className="px-5 py-4">95</td>
                <td className="px-5 py-4 text-green-400">$1,900</td>
              </tr>

              <tr className="border-b border-gray-800 hover:bg-gray-800 transition">
                <td className="px-5 py-4">27-inch Monitor</td>
                <td className="px-5 py-4">70</td>
                <td className="px-5 py-4 text-green-400">$7,000</td>
              </tr>

              <tr className="hover:bg-gray-800 transition">
                <td className="px-5 py-4">Bluetooth Headphones</td>
                <td className="px-5 py-4">65</td>
                <td className="px-5 py-4 text-green-400">$3,250</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}