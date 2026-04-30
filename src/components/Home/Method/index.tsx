"use client";
import React from "react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { useTranslation } from "@/context/LanguageContext";

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
  const { t, dictionary } = useTranslation();
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
            <h2 className="md:text-h2 sm:text-h3 text-h4 text-midnight_text font-bold mb-5 dark:text-white lg:max-w-full sm:max-w-[75%] mx-auto leading-tight">
              {t("method.title1")}
              <span className="text-primary max-w-max ml-2 mr-2">
                {t("method.highlight")}
              </span>
              {t("method.title2")}
            </h2>
            <p className="font-medium xl:max-w-[45%] lg:max-w-[50%] md:max-w-[75%] text-body mx-auto text-muted dark:text-white/70">
              {t("method.subtitle")}
            </p>
          </motion.div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            {[
              { img: "/images/method/card.png", alt: "credit cards" },
              { img: "/images/method/method1.jpg", alt: "banking app" },
              { img: "/images/method/method3.jpg", alt: "payments app" },
              { img: "/images/method/method2.png", alt: "partner rewards dashboard" },
            ].map((card, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white dark:bg-search rounded-3xl overflow-hidden shadow-md flex flex-col h-full hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 dark:border dark:border-white/5 dark:hover:border-white/10 group"
              >
                <div className="w-full h-56 overflow-hidden">
                  <Image
                    src={card.img}
                    alt={card.alt}
                    width={500}
                    height={375}
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex flex-col flex-1 p-8">
                  <h3 className="md:text-h4 text-h4 font-bold mb-4 dark:text-white text-midnight_text">
                    {(dictionary.method.cards as any)[index]?.title}
                  </h3>
                  <p className="text-muted dark:text-white/70 text-body mb-8 leading-relaxed flex-1">
                    {(dictionary.method.cards as any)[index]?.details}
                  </p>
                  <Link
                    href="/signup"
                    className="text-body flex w-fit gap-2 items-center hover:text-primary/80 transition-colors font-medium text-primary mt-auto focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded"
                  >
                    {t("method.getStarted")}
                    <Icon
                      icon="solar:alt-arrow-right-linear"
                      width="18"
                      height="18"
                    />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Method;
