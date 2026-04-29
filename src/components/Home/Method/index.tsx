"use client";
import React from "react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";

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

const Method = () => {
  return (
    <section className="dark:bg-darkmode overflow-hidden py-14">
      <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="dark:bg-midnight_text bg-heroBg rounded-3xl py-16 lg:px-20 sm:px-10 px-5"
        >
          <motion.div variants={itemVariants} className="text-center">
            <h2 className="md:text-35 sm:text-28 text-24 text-midnight_text font-bold mb-5 dark:text-white lg:max-w-full sm:max-w-[75%] mx-auto leading-tight">
              Many ways to manage your
              <span className="text-primary max-w-max ml-2">
                online payment
              </span>
            </h2>
            <p className="font-medium xl:max-w-[45%] lg:max-w-[50%] md:max-w-[75%] text-17 mx-auto text-muted dark:text-white/70">
              Embed powerful financial features into your product. Build in
              minutes, launch in weeks.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 gap-6 mt-16">
            <motion.div variants={itemVariants} className="col-span-2">
              <div className="bg-white dark:bg-search rounded-3xl overflow-hidden shadow-xs transition-transform duration-300 hover:-translate-y-1">
                <div className="grid lg:grid-cols-2 items-center gap-10">
                  <div className="lg:py-14 py-10 lg:pl-14 px-8">
                    <h3 className="md:text-25 text-22 font-bold mb-4 dark:text-white text-midnight_text">
                      Physical & Virtual Cards
                    </h3>
                    <p className="text-muted dark:text-white/70 md:text-18 text-16 mb-8 leading-relaxed">
                      Fully programmable, debit and credit physical & virtual
                      cards for individuals and businesses. Let your users access their money instantly.
                    </p>
                    <Link
                      href="#"
                      className="text-17 flex w-fit gap-2 items-center hover:text-primary/80 transition-colors text-primary font-medium"
                    >
                      Get Started
                      <Icon
                        icon="solar:alt-arrow-right-linear"
                        width="18"
                        height="18"
                      />
                    </Link>
                  </div>
                  <div className="flex justify-end lg:pr-10 p-6 lg:p-0">
                    <Image
                      src="/images/method/card.png"
                      alt="credit cards"
                      width={459}
                      height={289}
                      className="w-[85%] lg:w-full object-contain mx-auto"
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="flex flex-col gap-6 lg:col-span-1 col-span-2">
              <motion.div
                variants={itemVariants}
                className="bg-white dark:bg-search flex flex-col sm:flex-row gap-6 items-center rounded-3xl overflow-hidden shadow-xs transition-transform duration-300 hover:-translate-y-1 group"
              >
                <div className="flex-1 sm:pl-10 p-8 sm:pr-0 pb-0 sm:pb-8">
                  <h3 className="md:text-25 text-22 font-bold mb-4 dark:text-white text-midnight_text">
                    Banking
                  </h3>
                  <p className="text-muted dark:text-white/70 text-16 mb-6 leading-relaxed">
                    Offer full checking and savings accounts alongside your product seamlessly.
                  </p>
                  <Link
                    href="#"
                    className="text-16 flex w-fit gap-2 items-center hover:text-primary/80 transition-colors font-medium text-primary"
                  >
                    Get Started
                    <Icon
                      icon="solar:alt-arrow-right-linear"
                      width="18"
                      height="18"
                    />
                  </Link>
                </div>
                <div className="flex-1 w-full h-full overflow-hidden">
                  <Image
                    src="/images/method/method1.jpg"
                    alt="banking app"
                    width={232}
                    height={375}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="bg-white dark:bg-search flex flex-col sm:flex-row gap-6 items-center rounded-3xl overflow-hidden shadow-xs transition-transform duration-300 hover:-translate-y-1 group"
              >
                <div className="flex-1 sm:pl-10 p-8 sm:pr-0 pb-0 sm:pb-8">
                  <h3 className="md:text-25 text-22 font-bold mb-4 dark:text-white text-midnight_text">
                    Payments
                  </h3>
                  <p className="text-muted dark:text-white/70 text-16 mb-6 leading-relaxed">
                    Accept global payments with our unified API and intelligent routing engine.
                  </p>
                  <Link
                    href="#"
                    className="text-16 flex w-fit gap-2 items-center hover:text-primary/80 transition-colors font-medium text-primary"
                  >
                    Get Started
                    <Icon
                      icon="solar:alt-arrow-right-linear"
                      width="18"
                      height="18"
                    />
                  </Link>
                </div>
                <div className="flex-1 w-full h-full overflow-hidden">
                  <Image
                    src="/images/method/method3.jpg"
                    alt="payments app"
                    width={232}
                    height={375}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </motion.div>
            </div>

            <div className="flex flex-col gap-6 lg:col-span-1 col-span-2">
              <motion.div
                variants={itemVariants}
                className="bg-white dark:bg-search rounded-3xl overflow-hidden shadow-xs flex flex-col h-full hover:-translate-y-1 transition-transform duration-300 group"
              >
                <div className="flex-1 overflow-hidden overflow-hidden">
                  <Image
                    src="/images/method/method2.png"
                    alt="partner rewards dashboard"
                    width={500}
                    height={375}
                    className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex-1 px-10 flex justify-center flex-col py-10">
                  <h3 className="md:text-25 text-22 font-bold mb-4 dark:text-white text-midnight_text">
                    Access $175,000 in partner rewards
                  </h3>
                  <p className="text-muted dark:text-white/70 text-16 mb-8 leading-relaxed">
                    Unlock exclusive offers and credits from our built-in partners like AWS, Stripe, and Hubspot.
                  </p>
                  <Link
                    href="#"
                    className="text-17 flex w-fit gap-2 items-center hover:text-primary/80 transition-colors font-medium text-primary"
                  >
                    Get Started
                    <Icon
                      icon="solar:alt-arrow-right-linear"
                      width="18"
                      height="18"
                    />
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Method;
