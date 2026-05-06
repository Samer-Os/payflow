import { TrendingUp, TrendingDown, DollarSign, CreditCard, Users, Zap } from "@/components/icons";

type Trend = { value: string; up: boolean };

type StatItem = {
  label: string;
  value: string;
  trend: Trend;
  Icon: React.ComponentType<{ width?: number; height?: number; className?: string }>;
  accent: string;
};

async function fetchStats(): Promise<StatItem[]> {
  // Simulates a 300 ms upstream data fetch for Suspense streaming demo
  await new Promise((r) => setTimeout(r, 300));

  return [
    {
      label: "Total Revenue",
      value: "$128,450",
      trend: { value: "+18.2% vs last month", up: true },
      Icon: DollarSign,
      accent: "text-primary bg-primary/10",
    },
    {
      label: "Transactions",
      value: "3,842",
      trend: { value: "+11.5% vs last month", up: true },
      Icon: CreditCard,
      accent: "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 dark:text-emerald-400",
    },
    {
      label: "Active Users",
      value: "1,209",
      trend: { value: "-2.4% vs last month", up: false },
      Icon: Users,
      accent: "text-violet-600 bg-violet-50 dark:bg-violet-900/20 dark:text-violet-400",
    },
    {
      label: "Avg Transaction",
      value: "$33.43",
      trend: { value: "+6.1% vs last month", up: true },
      Icon: Zap,
      accent: "text-amber-600 bg-amber-50 dark:bg-amber-900/20 dark:text-amber-400",
    },
  ];
}

export default async function DashboardStats() {
  const stats = await fetchStats();

  return (
    <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white dark:bg-midnight_text rounded-2xl border border-border/50 dark:border-dark_border/50 p-5 shadow-sm flex flex-col gap-3"
        >
          <div className="flex items-center justify-between">
            <span className="text-caption font-semibold uppercase tracking-widest text-muted dark:text-white/50">
              {stat.label}
            </span>
            <span className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${stat.accent}`}>
              <stat.Icon width={18} height={18} />
            </span>
          </div>
          <p className="text-h2 font-bold tabular-nums text-midnight_text dark:text-white leading-none">
            {stat.value}
          </p>
          <p className={`text-caption font-medium flex items-center gap-1 ${stat.trend.up ? "text-emerald-600 dark:text-emerald-400" : "text-rose-500 dark:text-rose-400"}`}>
            {stat.trend.up
              ? <TrendingUp width={13} height={13} />
              : <TrendingDown width={13} height={13} />
            }
            {stat.trend.value}
          </p>
        </div>
      ))}
    </div>
  );
}

export function StatsSkeleton() {
  return (
    <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="bg-white dark:bg-midnight_text rounded-2xl border border-border/50 dark:border-dark_border/50 p-5 shadow-sm animate-pulse">
          <div className="flex items-center justify-between mb-3">
            <div className="h-3 w-24 bg-border dark:bg-dark_border rounded-full" />
            <div className="w-9 h-9 rounded-xl bg-border dark:bg-dark_border" />
          </div>
          <div className="h-8 w-28 bg-border dark:bg-dark_border rounded-lg mb-3" />
          <div className="h-3 w-36 bg-border dark:bg-dark_border rounded-full" />
        </div>
      ))}
    </div>
  );
}
