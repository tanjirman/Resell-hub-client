import { FaCalendar } from "react-icons/fa";
import {
  FaDollarSign,
  FaCalendarDay,
  FaCalendarWeek,
  FaArrowTrendUp,
} from "react-icons/fa6";

const sales = [
  {
    title: "Today's Sales",
    amount: "$450",
    growth: "+8.2%",
    subtitle: "vs yesterday",
    icon: FaCalendarDay,
    color: "text-green-400",
    bg: "bg-green-500/15",
  },
  {
    title: "Weekly Sales",
    amount: "$2,840",
    growth: "+12.4%",
    subtitle: "vs last week",
    icon: FaCalendarWeek,
    color: "text-blue-400",
    bg: "bg-blue-500/15",
  },
  {
    title: "Monthly Sales",
    amount: "$14,260",
    growth: "+18.5%",
    subtitle: "vs last month",
    icon: FaCalendar,
    color: "text-purple-400",
    bg: "bg-purple-500/15",
  },
];

export default function SalesSummary() {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-lg hover:border-purple-500/40 transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/20">
            <FaDollarSign className="text-purple-400 text-lg" />
          </div>

          <div>
            <h2 className="text-xl font-semibold text-white">
              Sales Summary
            </h2>

            <p className="text-sm text-zinc-400">
              Overview of your earnings
            </p>
          </div>
        </div>

        <button className="rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2 text-sm text-zinc-300 transition hover:border-purple-500 hover:text-white">
          This Month
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {sales.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="group rounded-xl border border-zinc-800 bg-zinc-800/50 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/40 hover:bg-zinc-800"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-zinc-400">
                    {item.title}
                  </p>

                  <h3 className="mt-2 text-3xl font-bold text-white">
                    {item.amount}
                  </h3>
                </div>

                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${item.bg}`}
                >
                  <Icon className={`text-xl ${item.color}`} />
                </div>
              </div>

              <div className="mt-6 flex items-center gap-2">
                <FaArrowTrendUp className="text-green-400 text-sm" />

                <span className="text-sm font-medium text-green-400">
                  {item.growth}
                </span>

                <span className="text-sm text-zinc-500">
                  {item.subtitle}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}