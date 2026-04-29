"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Icon } from "@iconify/react";
import { Heroimage } from "@/app/api/data";
import { useTranslation } from "@/context/LanguageContext";

const ease = [0.22, 1, 0.36, 1] as const;

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.11,
      delayChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { y: 28, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.65, ease },
  },
};

const imageVariants = {
  hidden: { x: 30, opacity: 0, scale: 0.96 },
  visible: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.9, delay: 0.25, ease },
  },
};

const Hero = () => {
  const { t } = useTranslation();
  return (
    <section className="relative pt-28 sm:pt-36 md:pt-44 mb-10 sm:mb-14 bg-cover bg-center dark:bg-darkmode overflow-hidden">
      <div className="w-full h-full absolute z-0 bg-heroBg rounded-b-[60px] sm:rounded-b-[119px] left-0 top-0 dark:bg-midnight_text" />
      <div className="container mx-auto lg:max-w-(--breakpoint-xl) relative z-1 md:max-w-(--breakpoint-md) px-4">
        <div className="grid grid-cols-12 items-center">

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-6 col-span-12"
          >
            <motion.h1
              variants={itemVariants}
              className="md:text-50 sm:text-40 text-28 text-midnight_text dark:text-white text-center lg:text-start mb-6 sm:mb-9 w-full"
            >
              {t("hero.title1")}
              <br />
              <span className="relative inline-block px-2 text-primary">
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                  className="absolute inset-0 bg-border dark:bg-darkHeroBg rounded-lg origin-left -z-10"
                />
                {t("hero.highlight")}
              </span>
              <br />
              {t("hero.title2")}
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="sm:text-19 text-16 text-muted dark:text-white/70 text-center lg:text-start"
            >
              {t("hero.subtitle")}
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap items-center justify-center lg:justify-start mt-8 sm:mt-12 gap-4 sm:gap-8"
            >
              <Link
                href="#"
                className="text-17 flex gap-2 items-center bg-primary text-white py-3 px-8 rounded-lg border border-primary hover:text-primary hover:bg-transparent transition-all duration-300 dark:shadow-[0_0_20px_rgba(99,102,241,0.4)] dark:hover:shadow-[0_0_30px_rgba(99,102,241,0.6)] hover:scale-105"
              >
                {t("hero.getStarted")}
                <Icon icon="solar:alt-arrow-right-linear" width="13" height="13" />
              </Link>
              <Link
                href="#"
                className="text-17 flex gap-2 items-center text-muted dark:text-white/70 hover:text-primary transition-colors duration-200"
              >
                {t("hero.seeFeatures")}
                <Icon icon="solar:alt-arrow-right-linear" width="13" height="13" />
              </Link>
            </motion.div>

            <motion.div variants={itemVariants} className="lg:my-20 my-8">
              <p className="text-16 sm:text-20 text-muted dark:text-white/70 text-center lg:text-start mb-5">
                {t("hero.trustedBy")}
              </p>
              <div className="flex flex-wrap gap-4 sm:gap-6 justify-center lg:justify-start w-full">
                {Heroimage.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, delay: 0.55 + index * 0.09, ease }}
                  >
                    <Link href="/">
                      <Image
                        src={item.lightimage}
                        alt="trusted brand"
                        width={115}
                        height={30}
                        className="block dark:hidden w-20 sm:w-28 h-auto"
                      />
                      <Image
                        src={item.darkimage}
                        alt="trusted brand"
                        width={115}
                        height={30}
                        className="hidden dark:block w-20 sm:w-28 h-auto"
                      />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-6 col-span-12 pl-20 lg:block hidden"
          >
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src="/images/hero/hero-image.png"
                alt="Payflow dashboard"
                width={498}
                height={651}
                style={{ width: "100%", height: "100%" }}
              />
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
