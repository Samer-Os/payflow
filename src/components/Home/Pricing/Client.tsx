"use client";
import { useReducer } from "react";
import Link from "next/link";
import { CheckCircle2 } from "@/components/icons";
import { Reveal, Stagger } from "@/components/Common/Reveal";
import type en from "@/locales/en.json";

type PricingDict = typeof en.pricing;
type PlanType = "Monthly" | "Annually";

interface State {
  planType: PlanType;
  personalPrice: string;
  professionalPrice: string;
  organizationPrice: string;
  professionalOriginal: string | null;
  organizationOriginal: string | null;
  duration: "perMonth" | "perYear";
}

const monthlyConfig: State = {
  planType: "Monthly",
  personalPrice: "Free",
  professionalPrice: "9.00",
  organizationPrice: "18.00",
  professionalOriginal: null,
  organizationOriginal: null,
  duration: "perMonth",
};

const annuallyConfig: State = {
  planType: "Annually",
  personalPrice: "Free",
  professionalPrice: "86.40",
  organizationPrice: "172.80",
  professionalOriginal: "108",
  organizationOriginal: "216",
  duration: "perYear",
};

function reducer(_state: State, action: { type: PlanType }): State {
  return action.type === "Annually" ? annuallyConfig : monthlyConfig;
}

export default function PricingClient({ dict }: { dict: PricingDict }) {
  const [tabConfig, dispatch] = useReducer(reducer, monthlyConfig);

  return (
    <section className="dark:bg-darkmode overflow-hidden py-14">
      <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-4">
        <Stagger>
          <Reveal className="text-center mb-12">
            <h2 className="dark:text-white text-midnight_text md:text-h1 sm:text-h2 text-h3 font-bold leading-tight">
              {dict.title1}
              <span className="text-primary ml-2">{dict.highlight}</span>
            </h2>
            <p className="text-lead font-medium text-midnight_text/70 dark:text-white/70 mx-auto mt-6 lg:max-w-[50%] sm:max-w-[75%]">
              {dict.subtitle}
            </p>
          </Reveal>

          <Reveal className="text-center pb-6">
            <div
              role="tablist"
              aria-label="Billing period"
              className="inline-flex items-center bg-heroBg dark:bg-midnight_text rounded-2xl p-2 shadow-sm border border-border/50 dark:border-dark_border/50"
            >
              <button
                role="tab"
                id="tab-monthly"
                aria-selected={tabConfig.planType === "Monthly"}
                aria-controls="pricing-panel"
                className={`text-body font-semibold py-3 px-8 rounded-xl transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                  tabConfig.planType === "Monthly"
                    ? "bg-white text-midnight_text shadow-md dark:bg-darkmode dark:text-white"
                    : "text-midnight_text/60 dark:text-white/60 hover:text-midnight_text dark:hover:text-white"
                }`}
                onClick={() => dispatch({ type: "Monthly" })}
              >
                {dict.monthly}
              </button>
              <button
                role="tab"
                id="tab-annually"
                aria-selected={tabConfig.planType === "Annually"}
                aria-controls="pricing-panel"
                className={`relative text-body font-semibold py-3 px-8 rounded-xl transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                  tabConfig.planType === "Annually"
                    ? "bg-white text-midnight_text shadow-md dark:bg-darkmode dark:text-white"
                    : "text-midnight_text/60 dark:text-white/60 hover:text-midnight_text dark:hover:text-white"
                }`}
                onClick={() => dispatch({ type: "Annually" })}
              >
                {dict.annually}
                <span className="ml-2 inline-flex items-center bg-green/15 text-green text-caption font-bold px-2 py-0.5 rounded-full">
                  {dict.save20}
                </span>
              </button>
            </div>
          </Reveal>

          <Reveal role="tabpanel" id="pricing-panel" aria-labelledby={tabConfig.planType === "Monthly" ? "tab-monthly" : "tab-annually"} aria-live="polite" className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6 items-end mt-8">
            <div className="hidden lg:block pb-4">
              <div className="space-y-6 text-midnight_text/80 dark:text-white/80 font-medium text-body">
                {[
                  dict.monthlyServiceFee, dict.directDebits, dict.onlinePayments,
                  dict.depositsToSavers, dict.atmWithdrawals, dict.internationalFees,
                  dict.internationalAtm, dict.overdrawnInterest,
                ].map((label) => (
                  <p key={label} className="pb-6 border-b border-border dark:border-dark_border/50">{label}</p>
                ))}
              </div>
            </div>

            {/* Starter */}
            <div className="bg-white dark:bg-midnight_text pt-10 px-5 sm:px-8 pb-8 rounded-[2rem] border border-border/50 dark:border-dark_border/50 shadow-lg relative transition-transform hover:-translate-y-2 duration-300">
              <h3 className="text-h4 font-bold text-midnight_text text-center dark:text-white">{dict.starter}</h3>
              <div className="mt-6 flex flex-col items-center">
                <p className="text-h1 font-bold text-midnight_text dark:text-white leading-none">
                  <span key={tabConfig.personalPrice} className="animate-in fade-in slide-in-from-top-2 duration-300">{tabConfig.personalPrice}</span>
                </p>
                <p className="text-body font-medium text-midnight_text/60 dark:text-white/60 mt-2">{dict[tabConfig.duration]}</p>
              </div>
              <Link href="/signup" className="mt-8 block text-center py-3.5 text-body font-semibold bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white duration-300 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                {dict.tryFree}
              </Link>
              <div className="mt-10 space-y-6 text-center text-body font-medium text-midnight_text/70 dark:text-white/70">
                <p className="pb-6 border-b border-border dark:border-dark_border/50"><span className="lg:hidden font-bold text-midnight_text dark:text-white">{dict.monthlyServiceFee}:</span> {dict.free}</p>
                <div className="pb-6 border-b border-border dark:border-dark_border/50 flex lg:flex-col items-center justify-center gap-3 lg:gap-0"><span className="lg:hidden font-bold text-midnight_text dark:text-white">{dict.directDebits}:</span><span className="text-midnight_text/30 dark:text-white/30">&mdash;</span></div>
                <p className="pb-6 border-b border-border dark:border-dark_border/50"><span className="lg:hidden font-bold text-midnight_text dark:text-white">{dict.onlinePayments}:</span> *{dict.free}</p>
                <p className="pb-6 border-b border-border dark:border-dark_border/50"><span className="lg:hidden font-bold text-midnight_text dark:text-white">{dict.depositsToSavers}:</span> *{dict.free}</p>
                <div className="pb-6 border-b border-border dark:border-dark_border/50 flex lg:flex-col items-center justify-center gap-3 lg:gap-0"><span className="lg:hidden font-bold text-midnight_text dark:text-white">{dict.atmWithdrawals}:</span><span className="text-midnight_text/30 dark:text-white/30">&mdash;</span></div>
                <div className="pb-6 border-b border-border dark:border-dark_border/50 flex lg:flex-col items-center justify-center gap-3 lg:gap-0"><span className="lg:hidden font-bold text-midnight_text dark:text-white">{dict.internationalFees}:</span><span className="text-midnight_text/30 dark:text-white/30">&mdash;</span></div>
                <div className="pb-6 border-b border-border dark:border-dark_border/50 flex lg:flex-col items-center justify-center gap-3 lg:gap-0"><span className="lg:hidden font-bold text-midnight_text dark:text-white">{dict.internationalAtm}:</span><span className="text-midnight_text/30 dark:text-white/30">&mdash;</span></div>
                <p className="pb-6"><span className="lg:hidden font-bold text-midnight_text dark:text-white">{dict.overdrawnInterest}:</span> 9.81% P.A.</p>
              </div>
            </div>

            {/* Growth */}
            <div className="bg-primary/5 dark:bg-primary/10 pt-10 px-5 sm:px-8 pb-8 rounded-[2rem] border-2 border-primary shadow-[0_0_30px_rgba(99,102,241,0.15)] hover:shadow-[0_0_50px_rgba(99,102,241,0.3)] relative transition-all duration-300 hover:-translate-y-2 z-10">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-caption font-bold uppercase tracking-wider">{dict.mostPopular}</div>
              <h3 className="text-h4 font-bold text-midnight_text text-center dark:text-white">{dict.growth}</h3>
              <div className="mt-6 flex flex-col items-center">
                {tabConfig.professionalOriginal && <p className="text-lead font-medium text-midnight_text/40 dark:text-white/40 line-through mb-1">${tabConfig.professionalOriginal}</p>}
                <p className="text-h1 font-bold text-midnight_text dark:text-white leading-none flex items-center justify-center">
                  <span className="text-h4 align-super">$</span>
                  <span key={tabConfig.professionalPrice} className="animate-in fade-in slide-in-from-top-2 duration-300">{tabConfig.professionalPrice}</span>
                </p>
                <p className="text-body font-medium text-midnight_text/60 dark:text-white/60 mt-2">{dict[tabConfig.duration]}</p>
              </div>
              <Link href="/signup" className="mt-8 text-body font-semibold block text-center bg-primary border-2 border-primary hover:bg-transparent hover:text-primary duration-300 text-white py-3.5 rounded-xl shadow-md hover:shadow-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">{dict.tryFree14}</Link>
              <div className="mt-10 space-y-6 text-center text-body font-medium text-midnight_text/70 dark:text-white/70">
                <p className="pb-6 border-b border-border/50 dark:border-dark_border/30"><span className="lg:hidden font-bold text-midnight_text dark:text-white">{dict.monthlyServiceFee}:</span> {dict.free}</p>
                <div className="pb-6 border-b border-border/50 dark:border-dark_border/30 flex lg:flex-col items-center justify-center gap-3 lg:gap-0"><span className="lg:hidden font-bold text-midnight_text dark:text-white">{dict.directDebits}:</span><div className="w-7 h-7 bg-primary/10 rounded-full flex items-center justify-center"><CheckCircle2 className="text-primary w-5 h-5" /></div></div>
                <p className="pb-6 border-b border-border/50 dark:border-dark_border/30"><span className="lg:hidden font-bold text-midnight_text dark:text-white">{dict.onlinePayments}:</span> {dict.freeUnlimited}</p>
                <p className="pb-6 border-b border-border/50 dark:border-dark_border/30"><span className="lg:hidden font-bold text-midnight_text dark:text-white">{dict.depositsToSavers}:</span> {dict.freeUnlimited}</p>
                <div className="pb-6 border-b border-border/50 dark:border-dark_border/30 flex lg:flex-col items-center justify-center gap-3 lg:gap-0"><span className="lg:hidden font-bold text-midnight_text dark:text-white">{dict.atmWithdrawals}:</span><div className="w-7 h-7 bg-primary/10 rounded-full flex items-center justify-center"><CheckCircle2 className="text-primary w-5 h-5" /></div></div>
                <p className="pb-6 border-b border-border/50 dark:border-dark_border/30"><span className="lg:hidden font-bold text-midnight_text dark:text-white">{dict.internationalFees}:</span> 0.5%</p>
                <div className="pb-6 border-b border-border/50 dark:border-dark_border/30 flex lg:flex-col items-center justify-center gap-3 lg:gap-0"><span className="lg:hidden font-bold text-midnight_text dark:text-white">{dict.internationalAtm}:</span><div className="w-7 h-7 bg-primary/10 rounded-full flex items-center justify-center"><CheckCircle2 className="text-primary w-5 h-5" /></div></div>
                <p className="pb-6"><span className="lg:hidden font-bold text-midnight_text dark:text-white">{dict.overdrawnInterest}:</span> 9.81% P.A.</p>
              </div>
            </div>

            {/* Scale */}
            <div className="bg-white dark:bg-midnight_text pt-10 px-5 sm:px-8 pb-8 rounded-[2rem] border border-border/50 dark:border-dark_border/50 shadow-lg relative transition-transform hover:-translate-y-2 duration-300">
              <h3 className="text-h4 text-center font-bold text-midnight_text dark:text-white">{dict.scale}</h3>
              <div className="mt-6 flex flex-col items-center">
                {tabConfig.organizationOriginal && <p className="text-lead font-medium text-midnight_text/40 dark:text-white/40 line-through mb-1">${tabConfig.organizationOriginal}</p>}
                <p className="text-h1 font-bold text-midnight_text dark:text-white leading-none flex items-center justify-center">
                  <span className="text-h4 align-super">$</span>
                  <span key={tabConfig.organizationPrice} className="animate-in fade-in slide-in-from-top-2 duration-300">{tabConfig.organizationPrice}</span>
                </p>
                <p className="text-body font-medium text-midnight_text/60 dark:text-white/60 mt-2">{dict[tabConfig.duration]}</p>
              </div>
              <Link href="/signup" className="mt-8 text-body font-semibold block text-center bg-midnight_text dark:bg-white dark:text-midnight_text border-2 border-midnight_text dark:border-white hover:bg-transparent dark:hover:bg-transparent dark:hover:text-white hover:text-midnight_text duration-300 text-white py-3.5 rounded-xl shadow-md hover:shadow-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">{dict.tryFree14}</Link>
              <div className="mt-10 space-y-6 text-center text-body font-medium text-midnight_text/70 dark:text-white/70">
                <p className="pb-6 border-b border-border dark:border-dark_border/50"><span className="lg:hidden font-bold text-midnight_text dark:text-white">{dict.monthlyServiceFee}:</span> {dict.free}</p>
                <div className="pb-6 border-b border-border dark:border-dark_border/50 flex lg:flex-col items-center justify-center gap-3 lg:gap-0"><span className="lg:hidden font-bold text-midnight_text dark:text-white">{dict.directDebits}:</span><div className="w-7 h-7 bg-primary/10 rounded-full flex items-center justify-center"><CheckCircle2 className="text-primary w-5 h-5" /></div></div>
                <p className="pb-6 border-b border-border dark:border-dark_border/50"><span className="lg:hidden font-bold text-midnight_text dark:text-white">{dict.onlinePayments}:</span> {dict.freeUnlimited}</p>
                <p className="pb-6 border-b border-border dark:border-dark_border/50"><span className="lg:hidden font-bold text-midnight_text dark:text-white">{dict.depositsToSavers}:</span> {dict.freeUnlimited}</p>
                <div className="pb-6 border-b border-border dark:border-dark_border/50 flex lg:flex-col items-center justify-center gap-3 lg:gap-0"><span className="lg:hidden font-bold text-midnight_text dark:text-white">{dict.atmWithdrawals}:</span><div className="w-7 h-7 bg-primary/10 rounded-full flex items-center justify-center"><CheckCircle2 className="text-primary w-5 h-5" /></div></div>
                <p className="pb-6 border-b border-border dark:border-dark_border/50"><span className="lg:hidden font-bold text-midnight_text dark:text-white">{dict.internationalFees}:</span> 0.5%</p>
                <div className="pb-6 border-b border-border dark:border-dark_border/50 flex lg:flex-col items-center justify-center gap-3 lg:gap-0"><span className="lg:hidden font-bold text-midnight_text dark:text-white">{dict.internationalAtm}:</span><div className="w-7 h-7 bg-primary/10 rounded-full flex items-center justify-center"><CheckCircle2 className="text-primary w-5 h-5" /></div></div>
                <p className="pb-6"><span className="lg:hidden font-bold text-midnight_text dark:text-white">{dict.overdrawnInterest}:</span> 6% P.A.</p>
              </div>
            </div>
          </Reveal>
        </Stagger>
      </div>
    </section>
  );
}
