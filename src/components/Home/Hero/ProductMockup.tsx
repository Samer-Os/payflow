"use client";
import { useEffect, useState, useSyncExternalStore } from "react";
import { TrendingUp, MoreHorizontal } from "@/components/icons";
import { StripeIcon, AwsIcon, NotionIcon } from "@/components/icons";

const bars = [
  { day: "M", height: 38 },
  { day: "T", height: 62 },
  { day: "W", height: 50 },
  { day: "T", height: 78 },
  { day: "F", height: 44 },
  { day: "S", height: 88 },
  { day: "S", height: 70 },
];

const transactions = [
  { name: "Stripe Payout", TxIcon: StripeIcon, amount: "+$4,820.00", positive: true },
  { name: "AWS Subscription", TxIcon: AwsIcon, amount: "-$129.40", positive: false },
  { name: "Notion Team", TxIcon: NotionIcon, amount: "-$80.00", positive: false },
];

const mqQuery = "(prefers-reduced-motion: reduce)";
const getSnapshot = () => typeof window !== "undefined" && window.matchMedia(mqQuery).matches;
const getServerSnapshot = () => false;
function subscribe(cb: () => void) {
  const mq = window.matchMedia(mqQuery);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

function useReducedMotionPref() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

function useCountUp(target: number, durationMs = 1400, enabled = true) {
  const [value, setValue] = useState(target);

  useEffect(() => {
    if (!enabled) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setValue(target);
      return;
    }
    setValue(0);
    let raf = 0;
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(target * eased);
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, durationMs, enabled]);

  return value;
}

const ProductMockup = () => {
  const reduceMotion = useReducedMotionPref();
  const balance = useCountUp(24580, 1600, !reduceMotion);

  return (
    <div
      className="relative w-full"
      role="img"
      aria-label="Payflow dashboard preview showing $24,580 total balance, weekly volume chart, and recent transactions"
    >
      <div className="absolute -inset-8 bg-gradient-to-tr from-primary/30 via-purple-400/20 to-pink-400/20 rounded-[3rem] blur-3xl -z-10" />

      <div className="rounded-2xl shadow-2xl border border-border/60 dark:border-dark_border/60 bg-white dark:bg-midnight_text overflow-hidden">
        <div className="flex items-center gap-3 px-4 py-3 bg-heroBg/80 dark:bg-darkheader/80 border-b border-border/60 dark:border-dark_border/60">
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="w-3 h-3 rounded-full bg-red-400/70" />
            <span className="w-3 h-3 rounded-full bg-amber-400/70" />
            <span className="w-3 h-3 rounded-full bg-green/70" />
          </div>
          <div className="flex-1 flex justify-center">
            <div className="text-caption text-midnight_text dark:text-white/80 px-3 py-1 rounded-md bg-white dark:bg-darkmode/80 border border-border/60 dark:border-dark_border/60 font-medium">
              payflow.app/dashboard
            </div>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-4 p-5">
          <div className="col-span-3 space-y-4">
            <div>
              <p className="text-caption font-medium uppercase tracking-widest text-muted dark:text-white/50">
                Total Balance
              </p>
              <p className="text-h2 font-bold text-midnight_text dark:text-white tabular-nums leading-tight">
                ${balance.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp className="text-emerald-700 dark:text-green" width={14} height={14} />
                <span className="text-caption font-semibold text-emerald-700 dark:text-green">+12.4%</span>
                <span className="text-caption text-muted dark:text-white/50">this week</span>
              </div>
            </div>

            <div>
              <div className="flex items-end justify-between gap-1.5 sm:gap-2 h-28 sm:h-32">
                {bars.map((bar, i) => (
                  <div
                    key={i}
                    style={{ height: `${bar.height}%`, animationDelay: `${0.5 + i * 0.08}s` }}
                    className={`mockup-bar flex-1 rounded-t-md ${
                      i === 5
                        ? "bg-gradient-to-t from-primary to-primary/70"
                        : "bg-primary/20 dark:bg-primary/30"
                    }`}
                  />
                ))}
              </div>
              <div className="flex items-end justify-between gap-1.5 sm:gap-2 mt-2 px-0.5">
                {bars.map((bar, i) => (
                  <span
                    key={i}
                    className="flex-1 text-center text-caption text-muted dark:text-white/40 font-medium"
                  >
                    {bar.day}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="col-span-2 space-y-2.5">
            <div className="flex items-center justify-between">
              <p className="text-caption font-semibold text-midnight_text dark:text-white">
                Recent
              </p>
              <MoreHorizontal className="text-muted dark:text-white/40" width={16} height={16} />
            </div>
            {transactions.map((tx, i) => (
              <div
                key={tx.name}
                style={{ animationDelay: `${0.9 + i * 0.12}s` }}
                className="mockup-tx flex items-center gap-2.5 p-2 rounded-lg bg-heroBg/60 dark:bg-darkmode/40 border border-border/40 dark:border-dark_border/40"
              >
                <div className="w-7 h-7 rounded-md bg-white dark:bg-search shadow-xs border border-border/40 dark:border-dark_border/40 flex items-center justify-center shrink-0">
                  <tx.TxIcon width={14} height={14} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-caption font-semibold text-midnight_text dark:text-white truncate">
                    {tx.name}
                  </p>
                </div>
                <span
                  className={`text-caption font-bold tabular-nums whitespace-nowrap ${
                    tx.positive ? "text-emerald-700 dark:text-green" : "text-midnight_text/70 dark:text-white/70"
                  }`}
                >
                  {tx.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductMockup;
