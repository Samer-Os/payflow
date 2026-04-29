"use client";
import Link from "next/link";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { motion } from "motion/react";
import { useTranslation } from "@/context/LanguageContext";

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

const Solution = () => {
  const { t } = useTranslation();

  return (
    <section className="dark:bg-darkmode overflow-x-hidden py-14">
      <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="bg-heroBg dark:bg-midnight_text rounded-3xl lg:px-16 sm:px-10 px-6 lg:py-16 py-12"
        >
          <div className="grid lg:grid-cols-2 items-center gap-12">
            <motion.div variants={itemVariants} className="order-2 lg:order-1">
              <h2 className="md:text-35 sm:text-28 text-24 font-semibold text-midnight_text dark:text-white">
                {t("solution.title1")}
                <span className="text-primary max-w-max ml-2">{t("solution.highlight")}</span>
              </h2>
              <p className="mt-6 text-base text-muted dark:text-white/70 lg:max-w-full sm:max-w-[75%]">
                {t("solution.subtitle")}
              </p>
              <Link
                href="/contact"
                className="lg:text-17 flex gap-4 w-fit items-center bg-primary text-white py-2 px-4 lg:py-3 lg:px-8 rounded-lg mt-12 border border-primary hover:text-primary hover:bg-transparent duration-300 transition-colors"
              >
                {t("solution.getStarted")}
                <Icon
                  icon="solar:alt-arrow-right-linear"
                  width="20"
                  height="20"
                />
              </Link>
            </motion.div>
            <motion.div variants={itemVariants} className="flex justify-center order-1 lg:order-2">
              <Image
                src="/images/solution/solution.png"
                alt="Enterprise Grade Solutions"
                width={531}
                height={200}
                className="w-full max-w-xs sm:max-w-md lg:max-w-full h-auto hover:scale-105 transition-transform duration-500"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Solution;
