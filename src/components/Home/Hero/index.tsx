"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Icon } from "@iconify/react";
import { Heroimage } from "@/app/api/data";

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
  return (
    <section className="relative pt-44 mb-14 bg-cover bg-center dark:bg-darkmode">
      <div className="w-full h-full absolute z-0 bg-heroBg rounded-b-[119px] -left-1/4 top-0 dark:bg-midnight_text" />
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
              className="md:text-50 sm:text-40 text-28 text-midnight_text dark:text-white lg:text-start mb-9 lg:w-full w-3/4"
            >
              The fastest way to
              <br />
              <span className="bg-border dark:bg-darkHeroBg px-2 rounded-lg text-primary max-w-max">
                embed payments
              </span>
              <br />
              into your product.
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="sm:text-19 text-16 text-muted dark:text-white/70 text-start lg:max-w-full sm:max-w-75%"
            >
              Powerful payment APIs built for developers. Go live in days, not months.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex items-center mt-12 gap-11"
            >
              <Link
                href="#"
                className="text-17 flex gap-2 items-center bg-primary text-white py-3 px-8 rounded-lg border border-primary hover:text-primary hover:bg-transparent transition-colors duration-200"
              >
                Get Started
                <Icon icon="solar:alt-arrow-right-linear" width="13" height="13" />
              </Link>
              <Link
                href="#"
                className="text-17 flex gap-2 items-center text-muted dark:text-white/70 hover:text-primary transition-colors duration-200"
              >
                See Features
                <Icon icon="solar:alt-arrow-right-linear" width="13" height="13" />
              </Link>
            </motion.div>

            <motion.div variants={itemVariants} className="lg:my-28 my-12">
              <p className="text-20 text-muted dark:text-white/70 text-start mb-7">
                Trusted by
              </p>
              <div className="flex space-x-6 justify-start w-full">
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
                        className="block dark:hidden"
                        style={{ width: "100%", height: "100%" }}
                      />
                      <Image
                        src={item.darkimage}
                        alt="trusted brand"
                        width={115}
                        height={30}
                        className="hidden dark:block"
                        style={{ width: "100%", height: "100%" }}
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
            <Image
              src="/images/hero/hero-image.png"
              alt="Payflow dashboard"
              width={498}
              height={651}
              style={{ width: "100%", height: "100%" }}
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
