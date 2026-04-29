"use client";
import { motion } from "motion/react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import Image from "next/image";
import { useTranslation } from "@/context/LanguageContext";

const ease = [0.22, 1, 0.36, 1] as const;

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
    transition: { duration: 0.6, ease },
  },
};

const imageVariants = {
  hidden: { x: 30, opacity: 0, scale: 0.96 },
  visible: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease },
  },
};

const Mobile = () => {
  const { t } = useTranslation();

  return (
    <section className="dark:bg-darkmode overflow-x-hidden py-14">
      <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-4">
        <div className="grid md:grid-cols-12 items-center lg:gap-12 gap-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={containerVariants}
            className="lg:col-span-6 col-span-12"
          >
            <motion.h2
              variants={itemVariants}
              className="lg:text-40 text-28 text-midnight_text font-bold dark:text-white leading-tight"
            >
              {t("mobile.title1")}
              <br />
              <span className="text-primary font-bold">
                {t("mobile.highlight")}
              </span>
            </motion.h2>
            <motion.p
              variants={itemVariants}
              className="mt-6 text-muted dark:text-white/70 lg:text-18 text-16 lg:max-w-[90%] leading-relaxed"
            >
              {t("mobile.subtitle")}
            </motion.p>

            <motion.div variants={containerVariants} className="flex flex-col gap-6 mt-12">
              {[0, 1, 2].map((index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="flex items-start gap-5 group"
                >
                  <div className="w-8 h-8 shrink-0 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                    <Icon
                      icon="solar:check-read-linear"
                      width="18"
                      height="18"
                      className="text-primary group-hover:text-white transition-colors duration-300"
                    />
                  </div>
                  <p className="text-16 pt-1 text-midnight_text/80 dark:text-white/80 leading-snug">
                    {t(`mobile.perks.${index}`)}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-center justify-start">
              <Link
                href="#"
                className="lg:text-17 flex gap-3 items-center bg-primary text-white py-3 px-8 rounded-lg mt-12 border border-primary hover:text-primary hover:bg-transparent transition-colors duration-200"
              >
                {t("mobile.getStarted")}
                <Icon
                  icon="solar:alt-arrow-right-linear"
                  width="13"
                  height="13"
                />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={imageVariants}
            className="lg:col-span-6 col-span-12 mt-10 lg:mt-0"
          >
            <div className="max-w-[60%] sm:max-w-[55%] lg:max-w-[85%] mx-auto relative drop-shadow-2xl">
              <Image
                src="/images/mobile/mobile.png"
                alt="Mobile wallets display"
                width={555}
                height={634}
                className="w-full h-auto rounded-3xl"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Mobile;
