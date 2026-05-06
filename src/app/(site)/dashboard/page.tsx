import { Suspense } from "react";
import { Metadata } from "next";

// Force dynamic so Suspense streaming fires on every request (demo of RSC streaming)
export const dynamic = "force-dynamic";
import Link from "next/link";
import { ArrowLeft } from "@/components/icons";
import DashboardStats, { StatsSkeleton } from "@/components/Dashboard/DashboardStats";
import TransactionsClient from "@/components/Dashboard/TransactionsClient";

export const metadata: Metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
};

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-heroBg dark:bg-darkmode pb-24">
      <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-4 pt-10">

        {/* Demo banner */}
        <div className="mb-6 px-4 py-2.5 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700/40 text-caption text-amber-700 dark:text-amber-400 font-medium flex items-center justify-between gap-4">
          <span>
            Demo dashboard — data is static and for illustration only.
          </span>
          <Link
            href="/"
            className="flex items-center gap-1 font-semibold hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 rounded shrink-0"
          >
            <ArrowLeft width={14} height={14} />
            Back to home
          </Link>
        </div>

        {/* Page header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-8">
          <div>
            <h1 className="text-h2 font-bold text-midnight_text dark:text-white leading-tight">
              Dashboard
            </h1>
            <p className="text-body text-muted dark:text-white/60 mt-1">
              Your payment activity for May 2026.
            </p>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border dark:border-dark_border bg-white dark:bg-midnight_text text-caption font-semibold text-midnight_text dark:text-white">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
            Live
          </div>
        </div>

        {/* Stat cards — streamed via Suspense */}
        <Suspense fallback={<StatsSkeleton />}>
          <DashboardStats />
        </Suspense>

        {/* Transactions table */}
        <div className="mt-8">
          <TransactionsClient />
        </div>

      </div>
    </div>
  );
}
