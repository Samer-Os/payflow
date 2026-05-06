"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { Icon } from "@iconify/react";
import { BeneifitImage } from "@/app/api/data";
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
  hidden: { x: -50, opacity: 0, scale: 0.9 },
  visible: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 1, ease },
  },
};

const Benefit = () => {
  const { t, dictionary } = useTranslation();
  return (
    <section id="benefits" className="dark:bg-darkmode py-14 overflow-x-hidden scroll-mt-24">
      <div className="container lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-4 mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="dark:bg-midnight_text bg-heroBg rounded-3xl md:py-20 py-10 2xl:px-20 sm:px-14 px-6"
        >
          <motion.div variants={itemVariants} className="items-start mb-12">
            <h2 className="font-bold md:text-h2 sm:text-h3 text-h4 text-midnight_text dark:text-white">
              {t("benefit.title1")}
              <span className="bg-border dark:bg-darkHeroBg rounded-lg text-primary max-w-max ml-2 px-2 pb-1">
                {t("benefit.highlight")}
              </span>
              <br />
              {t("benefit.title2")}
            </h2>
          </motion.div>

          <div className="grid grid-cols-12 items-center md:gap-12 sm:gap-8">
            <motion.div
              variants={imageVariants}
              className="xl:col-span-6 col-span-12 sm:block hidden"
            >
              <div className="xl:px-0 lg:px-20">
                <Image
                  src="/images/benefit/benefit.png"
                  alt="Benefit Dashboard"
                  width={435}
                  height={304}
                  loading="lazy"
                  sizes="(max-width: 1280px) 100vw, 50vw"
                  style={{ width: "100%", height: "100%" }}
                  className="rounded-xl drop-shadow-xl hover:scale-105 transition-transform duration-700"
                />
              </div>
            </motion.div>

            <motion.div
              variants={containerVariants}
              className="xl:col-span-6 col-span-12"
            >
              <motion.p
                variants={itemVariants}
                className="sm:text-h4 text-lead text-midnight_text font-medium dark:text-white/90 mb-8"
              >
                {t("benefit.subtitle")}
              </motion.p>

              <div className="space-y-6">
                {BeneifitImage.map((item, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="flex flex-row items-start gap-4 group"
                  >
                    <div className="bg-white dark:bg-search p-2 rounded-lg shadow-xs shrink-0 w-fit transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-md">
                      <Image
                        src={item.image}
                        alt={item.alt || "Trusted brand"}
                        width={24}
                        height={24}
                        className="w-6 h-6"
                      />
                    </div>
                    <p className="text-body text-muted dark:text-white/70 pt-1 leading-snug">
                      {(dictionary.benefit.items as Record<string, string>)[index]}
                    </p>
                  </motion.div>
                ))}
              </div>

              <motion.div
                variants={itemVariants}
                className="flex items-center lg:justify-start justify-center mt-12"
              >
                <Link
                  href="/signup"
                  className="text-body flex gap-3 items-center bg-primary text-white py-3 px-8 rounded-lg border border-primary hover:text-primary hover:bg-transparent transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  {t("benefit.getStarted")}
                  <Icon
                    icon="solar:alt-arrow-right-linear"
                    width="13"
                    height="13"
                  />
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Benefit;
