"use client";
import { useReducer } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { Icon } from "@iconify/react";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6 },
  },
};

interface State {
  planType: string;
  personalPrice: string;
  professionalPrice: string;
  organizationPrice: string;
  duration: string;
}

interface Action {
  type: "Monthly" | "Annually";
  payload: {
    duration: string;
    personalPrice: string;
    professionalPrice: string;
    organizationPrice: string;
  };
}

const Pricing = () => {
  const initialTabConfig: State = {
    planType: "Monthly",
    personalPrice: "Free",
    professionalPrice: "9.00",
    organizationPrice: "18.00",
    duration: "Monthly",
  };

  function reducer(state: State, action: Action): State {
    switch (action.type) {
      case "Monthly":
      case "Annually":
        return {
          ...state,
          planType: action.type,
          personalPrice: action.payload.personalPrice,
          professionalPrice: action.payload.professionalPrice,
          organizationPrice: action.payload.organizationPrice,
          duration: action.payload.duration,
        };
      default:
        return state;
    }
  }

  const [tabConfig, dispatch] = useReducer(reducer, initialTabConfig);

  return (
    <section className="dark:bg-darkmode overflow-hidden py-14">
      <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="dark:text-white text-midnight_text md:text-50 sm:text-40 text-28 font-bold leading-tight">
              Simple,
              <span className="text-primary ml-2">transparent pricing</span>
            </h2>
            <p className="text-18 font-medium text-midnight_text/70 dark:text-white/70 mx-auto mt-6 lg:max-w-[50%] sm:max-w-[75%]">
              No hidden fees. No surprises. Pick the plan that fits your volume
              and scale as you grow.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="text-center pb-6">
            <div className="inline-flex items-center bg-heroBg dark:bg-midnight_text rounded-2xl p-2 shadow-sm border border-border/50 dark:border-dark_border/50">
              <button
                className={`text-16 font-semibold py-3 px-8 rounded-xl transition-all duration-300 ${
                  tabConfig.planType === "Monthly"
                    ? "bg-white text-midnight_text shadow-md dark:bg-darkmode dark:text-white"
                    : "text-midnight_text/60 dark:text-white/60 hover:text-midnight_text dark:hover:text-white"
                }`}
                onClick={() =>
                  dispatch({
                    type: "Monthly",
                    payload: {
                      duration: "Monthly",
                      personalPrice: "Free",
                      professionalPrice: "9.00",
                      organizationPrice: "18.00",
                    },
                  })
                }
              >
                Monthly
              </button>
              <button
                className={`text-16 font-semibold py-3 px-8 rounded-xl transition-all duration-300 ${
                  tabConfig.planType === "Annually"
                    ? "bg-white text-midnight_text shadow-md dark:bg-darkmode dark:text-white"
                    : "text-midnight_text/60 dark:text-white/60 hover:text-midnight_text dark:hover:text-white"
                }`}
                onClick={() =>
                  dispatch({
                    type: "Annually",
                    payload: {
                      duration: "Annually",
                      personalPrice: "Free",
                      professionalPrice: "90.00",
                      organizationPrice: "180.00",
                    },
                  })
                }
              >
                Annually
              </button>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6 items-end mt-8"
          >
            <div className="hidden lg:block pb-4">
              <div className="space-y-6 text-midnight_text/80 dark:text-white/80 font-medium text-16">
                <p className="pb-6 border-b border-border dark:border-dark_border/50">
                  Monthly service fee
                </p>
                <p className="pb-6 border-b border-border dark:border-dark_border/50">
                  Direct debits
                </p>
                <p className="pb-6 border-b border-border dark:border-dark_border/50">
                  Online payments
                </p>
                <p className="pb-6 border-b border-border dark:border-dark_border/50">
                  Deposits to Savers
                </p>
                <p className="pb-6 border-b border-border dark:border-dark_border/50">
                  ATM withdrawals
                </p>
                <p className="pb-6 border-b border-border dark:border-dark_border/50">
                  International transaction fees
                </p>
                <p className="pb-6 border-b border-border dark:border-dark_border/50">
                  International ATM withdrawal
                </p>
                <p className="pb-6 border-b border-border dark:border-dark_border/50">
                  Overdrawn interest rate
                </p>
              </div>
            </div>

            {/* Starter Plan */}
            <div className="bg-white dark:bg-midnight_text pt-10 px-8 pb-8 rounded-[2rem] border border-border/50 dark:border-dark_border/50 shadow-lg relative transition-transform hover:-translate-y-2 duration-300">
              <h3 className="text-24 font-bold text-midnight_text text-center dark:text-white">
                Starter
              </h3>
              <div className="mt-6 flex flex-col items-center">
                <p className="text-50 font-bold text-midnight_text dark:text-white leading-none">
                  {tabConfig.personalPrice}
                </p>
                <p className="text-15 font-medium text-midnight_text/60 dark:text-white/60 mt-2">
                  {tabConfig.duration}
                </p>
              </div>
              <Link
                href="#"
                className="mt-8 block text-center py-3.5 text-16 font-semibold bg-[#22c55e] border-2 border-[#22c55e] hover:bg-transparent hover:text-[#22c55e] duration-300 text-white rounded-xl shadow-md hover:shadow-none"
              >
                Try for free
              </Link>
              <div className="mt-10 space-y-6 text-center text-15 font-medium text-midnight_text/70 dark:text-white/70">
                <p className="pb-6 border-b border-border dark:border-dark_border/50">
                  <span className="lg:hidden font-bold block mb-2 text-midnight_text dark:text-white">
                    Monthly service fee:
                  </span>{" "}
                  Free
                </p>
                <div className="pb-6 border-b border-border dark:border-dark_border/50 flex flex-col items-center">
                  <span className="lg:hidden font-bold block mb-2 text-midnight_text dark:text-white">
                    Direct debits:
                  </span>
                  <div className="w-7 h-7 bg-red-500/10 rounded-full flex items-center justify-center">
                    <Icon
                      icon="solar:close-circle-bold"
                      className="text-red-500 w-5 h-5"
                    />
                  </div>
                </div>
                <p className="pb-6 border-b border-border dark:border-dark_border/50">
                  <span className="lg:hidden font-bold block mb-2 text-midnight_text dark:text-white">
                    Online payments:
                  </span>{" "}
                  *Free
                </p>
                <p className="pb-6 border-b border-border dark:border-dark_border/50">
                  <span className="lg:hidden font-bold block mb-2 text-midnight_text dark:text-white">
                    Deposits to Savers:
                  </span>{" "}
                  *Free
                </p>
                <div className="pb-6 border-b border-border dark:border-dark_border/50 flex flex-col items-center">
                  <span className="lg:hidden font-bold block mb-2 text-midnight_text dark:text-white">
                    ATM withdrawals:
                  </span>
                  <div className="w-7 h-7 bg-red-500/10 rounded-full flex items-center justify-center">
                    <Icon
                      icon="solar:close-circle-bold"
                      className="text-red-500 w-5 h-5"
                    />
                  </div>
                </div>
                <div className="pb-6 border-b border-border dark:border-dark_border/50 flex flex-col items-center">
                  <span className="lg:hidden font-bold block mb-2 text-midnight_text dark:text-white">
                    International fees:
                  </span>
                  <div className="w-7 h-7 bg-red-500/10 rounded-full flex items-center justify-center">
                    <Icon
                      icon="solar:close-circle-bold"
                      className="text-red-500 w-5 h-5"
                    />
                  </div>
                </div>
                <div className="pb-6 border-b border-border dark:border-dark_border/50 flex flex-col items-center">
                  <span className="lg:hidden font-bold block mb-2 text-midnight_text dark:text-white">
                    International ATM:
                  </span>
                  <div className="w-7 h-7 bg-red-500/10 rounded-full flex items-center justify-center">
                    <Icon
                      icon="solar:close-circle-bold"
                      className="text-red-500 w-5 h-5"
                    />
                  </div>
                </div>
                <p className="pb-6">
                  <span className="lg:hidden font-bold block mb-2 text-midnight_text dark:text-white">
                    Overdrawn interest rate:
                  </span>{" "}
                  9.81% P.A.
                </p>
              </div>
            </div>

            {/* Growth Plan */}
            <div className="bg-primary/5 dark:bg-primary/10 pt-10 px-8 pb-8 rounded-[2rem] border-2 border-primary shadow-xl relative transition-transform hover:-translate-y-2 duration-300 z-10">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-13 font-bold uppercase tracking-wider">
                Most Popular
              </div>
              <h3 className="text-24 font-bold text-midnight_text text-center dark:text-white">
                Growth
              </h3>
              <div className="mt-6 flex flex-col items-center">
                <p className="text-50 font-bold text-midnight_text dark:text-white leading-none">
                  <span className="text-24 align-super">$</span>
                  {tabConfig.professionalPrice}
                </p>
                <p className="text-15 font-medium text-midnight_text/60 dark:text-white/60 mt-2">
                  {tabConfig.duration}
                </p>
              </div>
              <Link
                href="#"
                className="mt-8 text-16 font-semibold block text-center bg-primary border-2 border-primary hover:bg-transparent hover:text-primary duration-300 text-white py-3.5 rounded-xl shadow-md hover:shadow-none"
              >
                Try free for 14 days
              </Link>
              <div className="mt-10 space-y-6 text-center text-15 font-medium text-midnight_text/70 dark:text-white/70">
                <p className="pb-6 border-b border-border/50 dark:border-dark_border/30">
                  <span className="lg:hidden font-bold block mb-2 text-midnight_text dark:text-white">
                    Monthly service fee:
                  </span>{" "}
                  Free
                </p>
                <div className="pb-6 border-b border-border/50 dark:border-dark_border/30 flex flex-col items-center">
                  <span className="lg:hidden font-bold block mb-2 text-midnight_text dark:text-white">
                    Direct debits:
                  </span>
                  <div className="w-7 h-7 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon
                      icon="solar:check-circle-bold"
                      className="text-primary w-5 h-5"
                    />
                  </div>
                </div>
                <p className="pb-6 border-b border-border/50 dark:border-dark_border/30">
                  <span className="lg:hidden font-bold block mb-2 text-midnight_text dark:text-white">
                    Online payments:
                  </span>{" "}
                  Free & unlimited
                </p>
                <p className="pb-6 border-b border-border/50 dark:border-dark_border/30">
                  <span className="lg:hidden font-bold block mb-2 text-midnight_text dark:text-white">
                    Deposits to Savers:
                  </span>{" "}
                  Free & unlimited
                </p>
                <div className="pb-6 border-b border-border/50 dark:border-dark_border/30 flex flex-col items-center">
                  <span className="lg:hidden font-bold block mb-2 text-midnight_text dark:text-white">
                    ATM withdrawals:
                  </span>
                  <div className="w-7 h-7 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon
                      icon="solar:check-circle-bold"
                      className="text-primary w-5 h-5"
                    />
                  </div>
                </div>
                <p className="pb-6 border-b border-border/50 dark:border-dark_border/30">
                  <span className="lg:hidden font-bold block mb-2 text-midnight_text dark:text-white">
                    International fees:
                  </span>{" "}
                  0.5%
                </p>
                <div className="pb-6 border-b border-border/50 dark:border-dark_border/30 flex flex-col items-center">
                  <span className="lg:hidden font-bold block mb-2 text-midnight_text dark:text-white">
                    International ATM:
                  </span>
                  <div className="w-7 h-7 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon
                      icon="solar:check-circle-bold"
                      className="text-primary w-5 h-5"
                    />
                  </div>
                </div>
                <p className="pb-6">
                  <span className="lg:hidden font-bold block mb-2 text-midnight_text dark:text-white">
                    Overdrawn interest rate:
                  </span>{" "}
                  9.81% P.A.
                </p>
              </div>
            </div>

            {/* Scale Plan */}
            <div className="bg-white dark:bg-midnight_text pt-10 px-8 pb-8 rounded-[2rem] border border-border/50 dark:border-dark_border/50 shadow-lg relative transition-transform hover:-translate-y-2 duration-300">
              <h3 className="text-24 text-center font-bold text-midnight_text dark:text-white">
                Scale
              </h3>
              <div className="mt-6 flex flex-col items-center">
                <p className="text-50 font-bold text-midnight_text dark:text-white leading-none">
                  <span className="text-24 align-super">$</span>
                  {tabConfig.organizationPrice}
                </p>
                <p className="text-15 font-medium text-midnight_text/60 dark:text-white/60 mt-2">
                  {tabConfig.duration}
                </p>
              </div>
              <Link
                href="#"
                className="mt-8 text-16 font-semibold block text-center bg-midnight_text dark:bg-white dark:text-midnight_text border-2 border-midnight_text dark:border-white hover:bg-transparent dark:hover:bg-transparent dark:hover:text-white hover:text-midnight_text duration-300 text-white py-3.5 rounded-xl shadow-md hover:shadow-none"
              >
                Try free for 14 days
              </Link>
              <div className="mt-10 space-y-6 text-center text-15 font-medium text-midnight_text/70 dark:text-white/70">
                <p className="pb-6 border-b border-border dark:border-dark_border/50">
                  <span className="lg:hidden font-bold block mb-2 text-midnight_text dark:text-white">
                    Monthly service fee:
                  </span>{" "}
                  Free
                </p>
                <div className="pb-6 border-b border-border dark:border-dark_border/50 flex flex-col items-center">
                  <span className="lg:hidden font-bold block mb-2 text-midnight_text dark:text-white">
                    Direct debits:
                  </span>
                  <div className="w-7 h-7 bg-[#22c55e]/10 rounded-full flex items-center justify-center">
                    <Icon
                      icon="solar:check-circle-bold"
                      className="text-[#22c55e] w-5 h-5"
                    />
                  </div>
                </div>
                <p className="pb-6 border-b border-border dark:border-dark_border/50">
                  <span className="lg:hidden font-bold block mb-2 text-midnight_text dark:text-white">
                    Online payments:
                  </span>{" "}
                  Free & unlimited
                </p>
                <p className="pb-6 border-b border-border dark:border-dark_border/50">
                  <span className="lg:hidden font-bold block mb-2 text-midnight_text dark:text-white">
                    Deposits to Savers:
                  </span>{" "}
                  Free & unlimited
                </p>
                <div className="pb-6 border-b border-border dark:border-dark_border/50 flex flex-col items-center">
                  <span className="lg:hidden font-bold block mb-2 text-midnight_text dark:text-white">
                    ATM withdrawals:
                  </span>
                  <div className="w-7 h-7 bg-[#22c55e]/10 rounded-full flex items-center justify-center">
                    <Icon
                      icon="solar:check-circle-bold"
                      className="text-[#22c55e] w-5 h-5"
                    />
                  </div>
                </div>
                <p className="pb-6 border-b border-border dark:border-dark_border/50">
                  <span className="lg:hidden font-bold block mb-2 text-midnight_text dark:text-white">
                    International fees:
                  </span>{" "}
                  0.5%
                </p>
                <div className="pb-6 border-b border-border dark:border-dark_border/50 flex flex-col items-center">
                  <span className="lg:hidden font-bold block mb-2 text-midnight_text dark:text-white">
                    International ATM:
                  </span>
                  <div className="w-7 h-7 bg-[#22c55e]/10 rounded-full flex items-center justify-center">
                    <Icon
                      icon="solar:check-circle-bold"
                      className="text-[#22c55e] w-5 h-5"
                    />
                  </div>
                </div>
                <p className="pb-6">
                  <span className="lg:hidden font-bold block mb-2 text-midnight_text dark:text-white">
                    Overdrawn interest rate:
                  </span>{" "}
                  6% P.A.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
