"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { Icon } from "@iconify/react";
import { BeneifitImage } from "@/app/api/data";

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
  hidden: { x: -30, opacity: 0, scale: 0.96 },
  visible: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease },
  },
};

const Benefit = () => {
  return (
    <section className="dark:bg-darkmode py-14 overflow-x-hidden">
      <div className="container lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-4 mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="dark:bg-midnight_text bg-heroBg rounded-3xl md:py-20 py-10 2xl:px-20 sm:px-14 px-6"
        >
          <motion.div variants={itemVariants} className="items-start mb-12">
            <h2 className="font-bold md:text-35 sm:text-28 text-24 text-midnight_text dark:text-white">
              Why developers choose
              <span className="bg-border dark:bg-darkHeroBg rounded-lg text-primary max-w-max ml-2 px-2 pb-1">
                Payflow
              </span>
              <br />
              for their payment stack.
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
                  style={{ width: "100%", height: "100%" }}
                  className="rounded-xl drop-shadow-sm"
                />
              </div>
            </motion.div>

            <motion.div
              variants={containerVariants}
              className="xl:col-span-6 col-span-12"
            >
              <motion.p
                variants={itemVariants}
                className="sm:text-25 text-18 text-midnight_text font-medium dark:text-white/90 mb-8"
              >
                Grow revenues and delight your customers by building financial
                features.
              </motion.p>

              <div className="space-y-6">
                {BeneifitImage.map((item, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="sm:flex items-start group"
                  >
                    <div className="bg-white dark:bg-search p-2 rounded-lg sm:mr-4 sm:mb-0 mb-3 shadow-xs shrink-0 transition-transform duration-300 group-hover:scale-105">
                      <Image
                        src={item.image}
                        alt={item.alt || "Trusted brand"}
                        width={24}
                        height={24}
                        className="w-6 h-6"
                      />
                    </div>
                    <p className="text-17 text-muted dark:text-white/70 pt-1 leading-snug">
                      {item.details}
                    </p>
                  </motion.div>
                ))}
              </div>

              <motion.div
                variants={itemVariants}
                className="flex items-center lg:justify-start justify-center mt-12"
              >
                <Link
                  href="#"
                  className="text-17 flex gap-3 items-center bg-primary text-white py-3 px-8 rounded-lg border border-primary hover:text-primary hover:bg-transparent transition-colors duration-200"
                >
                  Get Started
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
