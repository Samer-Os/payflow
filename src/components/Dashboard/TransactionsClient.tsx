"use client";
import { useState, useDeferredValue } from "react";
import { Search, CheckCircle2, Clock, XCircle } from "@/components/icons";
import { StripeIcon, AwsIcon, NotionIcon } from "@/components/icons";

type Status = "completed" | "pending" | "failed";

type Transaction = {
  id: string;
  name: string;
  email: string;
  amount: string;
  status: Status;
  date: string;
  Icon: React.ComponentType<{ width?: number; height?: number }>;
  positive: boolean;
};

const ALL_TRANSACTIONS: Transaction[] = [
  { id: "TXN-001", name: "Stripe Payout", email: "payouts@stripe.com", amount: "+$4,820.00", status: "completed", date: "May 6, 2026", Icon: StripeIcon, positive: true },
  { id: "TXN-002", name: "AWS Subscription", email: "billing@amazon.com", amount: "-$129.40", status: "completed", date: "May 5, 2026", Icon: AwsIcon, positive: false },
  { id: "TXN-003", name: "Notion Team", email: "team@notion.so", amount: "-$80.00", status: "pending", date: "May 5, 2026", Icon: NotionIcon, positive: false },
  { id: "TXN-004", name: "Stripe Payout", email: "payouts@stripe.com", amount: "+$2,100.00", status: "completed", date: "May 4, 2026", Icon: StripeIcon, positive: true },
  { id: "TXN-005", name: "AWS Subscription", email: "billing@amazon.com", amount: "-$64.20", status: "failed", date: "May 3, 2026", Icon: AwsIcon, positive: false },
  { id: "TXN-006", name: "Stripe Payout", email: "payouts@stripe.com", amount: "+$3,350.00", status: "completed", date: "May 2, 2026", Icon: StripeIcon, positive: true },
  { id: "TXN-007", name: "Notion Team", email: "team@notion.so", amount: "-$80.00", status: "completed", date: "May 1, 2026", Icon: NotionIcon, positive: false },
  { id: "TXN-008", name: "AWS Subscription", email: "billing@amazon.com", amount: "-$129.40", status: "pending", date: "Apr 30, 2026", Icon: AwsIcon, positive: false },
];

const STATUS_CONFIG: Record<Status, { label: string; icon: React.ReactNode; className: string }> = {
  completed: {
    label: "Completed",
    icon: <CheckCircle2 width={14} height={14} />,
    className: "text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20",
  },
  pending: {
    label: "Pending",
    icon: <Clock width={14} height={14} />,
    className: "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20",
  },
  failed: {
    label: "Failed",
    icon: <XCircle width={14} height={14} />,
    className: "text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-900/20",
  },
};

type FilterStatus = "all" | Status;

export default function TransactionsClient() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<FilterStatus>("all");
  const deferred = useDeferredValue(query);

  const rows = ALL_TRANSACTIONS.filter((tx) => {
    const matchesStatus = filter === "all" || tx.status === filter;
    const q = deferred.toLowerCase();
    const matchesQuery =
      !q ||
      tx.name.toLowerCase().includes(q) ||
      tx.id.toLowerCase().includes(q) ||
      tx.amount.includes(q);
    return matchesStatus && matchesQuery;
  });

  return (
    <div className="bg-white dark:bg-midnight_text rounded-2xl border border-border/50 dark:border-dark_border/50 shadow-sm overflow-hidden">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-5 border-b border-border/50 dark:border-dark_border/50">
        <h2 className="font-bold text-midnight_text dark:text-white text-body">
          Recent Transactions
        </h2>
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {(["all", "completed", "pending", "failed"] as FilterStatus[]).map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1 rounded-full text-caption font-semibold capitalize transition-colors ${
                filter === s
                  ? "bg-primary text-white"
                  : "bg-heroBg dark:bg-darkmode text-muted dark:text-white/60 hover:text-primary"
              }`}
            >
              {s}
            </button>
          ))}
          <div className="relative ml-auto sm:ml-0">
            <Search
              width={14}
              height={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted dark:text-white/40 pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search…"
              aria-label="Search transactions"
              className="pl-8 pr-3 py-1.5 rounded-lg border border-border dark:border-dark_border bg-heroBg dark:bg-darkmode text-caption text-midnight_text dark:text-white placeholder:text-muted/60 dark:placeholder:text-white/30 focus:border-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 w-44"
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-caption">
          <thead>
            <tr className="border-b border-border/50 dark:border-dark_border/50 text-muted dark:text-white/40 uppercase tracking-wider text-left">
              <th className="px-5 py-3 font-semibold">Transaction</th>
              <th className="px-5 py-3 font-semibold hidden sm:table-cell">ID</th>
              <th className="px-5 py-3 font-semibold">Amount</th>
              <th className="px-5 py-3 font-semibold">Status</th>
              <th className="px-5 py-3 font-semibold hidden md:table-cell">Date</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-5 py-10 text-center text-muted dark:text-white/40">
                  No transactions match your search.
                </td>
              </tr>
            ) : (
              rows.map((tx) => {
                const { label, icon, className: statusClass } = STATUS_CONFIG[tx.status];
                return (
                  <tr
                    key={tx.id}
                    className="border-b border-border/30 dark:border-dark_border/30 last:border-0 hover:bg-heroBg/60 dark:hover:bg-darkmode/40 transition-colors"
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-heroBg dark:bg-darkmode border border-border/40 dark:border-dark_border/40 flex items-center justify-center shrink-0">
                          <tx.Icon width={14} height={14} />
                        </div>
                        <div>
                          <p className="font-semibold text-midnight_text dark:text-white">{tx.name}</p>
                          <p className="text-muted dark:text-white/40 truncate max-w-[140px]">{tx.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 hidden sm:table-cell font-mono text-muted dark:text-white/50">
                      {tx.id}
                    </td>
                    <td className={`px-5 py-3.5 font-bold tabular-nums ${tx.positive ? "text-emerald-700 dark:text-emerald-400" : "text-midnight_text dark:text-white"}`}>
                      {tx.amount}
                    </td>
                    <td className="px-5 py-3.5">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-semibold ${statusClass}`}>
                        {icon}
                        {label}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 hidden md:table-cell text-muted dark:text-white/50">
                      {tx.date}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
