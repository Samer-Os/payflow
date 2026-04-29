"use client";
import { motion } from "motion/react";
import Image from "next/image";
import { PaymentImage } from "@/app/api/data";

const ease = [0.22, 1, 0.36, 1] as const;

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease },
  },
};

const Payment = () => {
  const paymentItems = ["APIs", "Routing", "Payouts", "Ledger", "Analytics"];

  return (
    <section className="dark:bg-darkmode py-14">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={containerVariants}
        className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-4"
      >
        <motion.div variants={itemVariants} className="px-4 lg:px-12 mb-8">
          <h2 className="text-center font-semibold md:text-35 sm:text-28 text-24 text-midnight_text dark:text-white lg:mx-44 leading-tight">
            Easy and affordable for your personal and
            <span className="text-primary"> payment infrastructure </span>
            needs.
          </h2>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-10"
        >
          {paymentItems.map((item, index) => (
            <p
              key={index}
              className={`text-muted dark:text-white/70 md:text-18 text-base font-medium relative ${
                index !== paymentItems.length - 1
                  ? "after:content-[''] after:absolute after:w-0.5 after:h-3/4 after:bg-muted/30 dark:after:bg-white/20 after:rounded-full after:-right-5 after:top-0.5"
                  : ""
              }`}
            >
              {item}
            </p>
          ))}
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="flex justify-start sm:mt-24 mt-12"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:gap-14 gap-8">
            {PaymentImage.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group cursor-pointer"
              >
                <div className="rounded-full inline-block">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={80}
                    height={80}
                    className="rounded-full bg-white p-4 shadow-lg dark:shadow-none dark:bg-search transition-transform duration-300 group-hover:-translate-y-2"
                  />
                </div>
                <div className="py-5">
                  <h3 className="lg:text-25 text-22 font-medium text-midnight_text dark:text-white group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                </div>
                <div className="pr-4">
                  <p className="text-17 text-muted dark:text-white/70 leading-relaxed">
                    {item.details}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Payment;
