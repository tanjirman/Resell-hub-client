"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

const users = [
  { month: "Jan", users: 20 },
  { month: "Feb", users: 42 },
  { month: "Mar", users: 60 },
  { month: "Apr", users: 80 },
  { month: "May", users: 110 },
  { month: "Jun", users: 145 },
];

const orders = [
  { month: "Jan", orders: 12 },
  { month: "Feb", orders: 25 },
  { month: "Mar", orders: 35 },
  { month: "Apr", orders: 50 },
  { month: "May", orders: 70 },
  { month: "Jun", orders: 95 },
];

const categories = [
  { name: "Electronics", value: 45 },
  { name: "Fashion", value: 20 },
  { name: "Books", value: 15 },
  { name: "Sports", value: 10 },
  { name: "Others", value: 10 },
];

const performance = [
  { category: "Electronics", sales: 120 },
  { category: "Fashion", sales: 90 },
  { category: "Books", sales: 60 },
  { category: "Sports", sales: 40 },
];

const colors = [
  "#8B5CF6",
  "#EC4899",
  "#3B82F6",
  "#22C55E",
  "#FACC15",
];

export default function AnalyticsClient() {
  return (
    <div className="grid lg:grid-cols-2 gap-8">

      <div className="rounded-xl bg-[#111827] p-5">
        <h2 className="mb-5 text-white font-semibold">
          User Growth
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={users}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month"/>
            <YAxis/>
            <Tooltip/>
            <Line dataKey="users" stroke="#8B5CF6"/>
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="rounded-xl bg-[#111827] p-5">
        <h2 className="mb-5 text-white font-semibold">
          Monthly Orders
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={orders}>
            <XAxis dataKey="month"/>
            <YAxis/>
            <Tooltip/>
            <Bar dataKey="orders" fill="#7C3AED"/>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="rounded-xl bg-[#111827] p-5">
        <h2 className="mb-5 text-white font-semibold">
          Category Performance
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={performance}>
            <XAxis dataKey="category"/>
            <YAxis/>
            <Tooltip/>
            <Bar dataKey="sales" fill="#EC4899"/>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="rounded-xl bg-[#111827] p-5">
        <h2 className="mb-5 text-white font-semibold">
          Top Categories
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={categories}
              dataKey="value"
              label
            >
              {categories.map((_, index) => (
                <Cell
                  key={index}
                  fill={colors[index]}
                />
              ))}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}