"use client";
import React from "react";
import { Icon } from "@iconify/react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { review } from "@/app/api/data";
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

const Search = () => {
  const { t } = useTranslation();
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStars = rating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;

    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Icon
          key={`full-${i}`}
          icon="solar:star-bold"
          className="w-5 h-5 text-yellow-400"
        />
      );
    }

    if (halfStars) {
      stars.push(
        <Icon
          key="half"
          icon="solar:star-half-bold"
          className="w-5 h-5 text-yellow-400"
        />
      );
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Icon
          key={`empty-${i}`}
          icon="solar:star-linear"
          className="w-5 h-5 text-yellow-400"
        />
      );
    }

    return stars;
  };

  return (
    <section className="dark:bg-darkmode overflow-hidden py-14">
      <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="dark:bg-midnight_text bg-heroBg rounded-[2rem] p-4 lg:p-6 shadow-xl"
        >
          <motion.div
            variants={itemVariants}
            className="text-center lg:px-20 px-4 pt-16"
          >
            <div className="flex justify-center mb-6">
              <div className="bg-primary/10 dark:bg-primary/20 p-4 rounded-2xl w-max">
                <Icon icon="solar:rocket-bold-duotone" className="w-10 h-10 text-primary" />
              </div>
            </div>
            <h2 className="text-midnight_text font-bold dark:text-white md:text-h1 sm:text-h2 text-h3 leading-tight mb-8">
              {t("search.title1")}
              <br />
              <span className="text-primary mt-2 mr-2 inline-block">
                {t("search.highlight")}
              </span>
              {t("search.title2")}
            </h2>
            
            <div className="md:max-w-[75%] lg:max-w-[50%] mx-auto mt-10">
              <div className="flex flex-row items-center bg-white dark:bg-search shadow-lg rounded-[1.25rem] overflow-hidden border border-border dark:border-dark_border transition-all p-1.5 sm:p-2 gap-1.5 sm:gap-2">
                <div className="hidden sm:flex pl-4 items-center text-muted">
                    <Icon icon="solar:letter-linear" width="24" height="24" />
                </div>
                <input
                  type="email"
                  aria-label="Email address"
                  placeholder={t("search.placeholder")}
                  className="grow min-w-0 px-3 sm:px-4 py-3 sm:py-4 font-medium text-midnight_text dark:text-white bg-transparent border-none focus:ring-0 w-full placeholder:text-muted/60 dark:placeholder:text-white/40 outline-none text-body sm:text-body"
                />
                <button
                  className="text-body sm:text-body flex items-center justify-center bg-primary text-white py-2.5 sm:py-3.5 px-4 sm:px-8 rounded-xl border border-primary hover:text-primary hover:bg-transparent transition-colors font-medium whitespace-nowrap shrink-0"
                >
                  {t("search.getDemo")}
                </button>
              </div>
              <div className="flex items-center justify-center mt-8 mb-16">
                <div className="w-6 h-6 bg-primary/10 dark:bg-white/10 rounded-full flex items-center justify-center shrink-0">
                  <Icon
                    icon="solar:check-read-linear"
                    width="16"
                    height="16"
                    className="text-primary dark:text-white"
                  />
                </div>
                <p className="ml-3 text-body text-midnight_text/70 dark:text-white/70 font-medium text-left">
                  {t("search.noFees")}
                </p>
              </div>
            </div>
          </motion.div>
          <motion.div variants={containerVariants}>
            {review.map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white rounded-[2rem] lg:py-16 sm:py-10 py-8 lg:px-24 sm:px-12 px-6 dark:bg-darkmode border border-border/50 dark:border-dark_border/30 shadow-sm relative overflow-hidden mb-6"
              >
                <div className="grid lg:grid-cols-2 lg:gap-14 gap-10 relative z-10 w-full">
                  <div className="flex flex-col h-full justify-between pr-0 lg:pr-6">
                    <p className="text-midnight_text/90 dark:text-white/90 text-lead lg:text-lead leading-relaxed font-medium mb-10 italic">
                      "{t("search.review")}"
                    </p>
                    <div className="flex items-center gap-5 p-4 rounded-2xl w-full sm:w-max">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={64}
                        height={64}
                        className="rounded-full shadow-sm"
                      />
                      <div className="flex flex-col justify-center">
                        <h3 className="font-bold text-lead text-midnight_text dark:text-white leading-tight">
                          {item.name}
                        </h3>
                        <h5 className="text-primary text-body mt-1.5 font-medium">
                          {item.post}
                        </h5>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex sm:items-center items-start lg:justify-end sm:flex-row flex-col gap-6 lg:gap-8 pt-8 lg:pt-0 lg:pl-10 lg:border-l border-border dark:border-dark_border dark:border-dashed">
                    <div className="flex flex-col items-center sm:items-start bg-heroBg dark:bg-search/80 p-6 rounded-[1.5rem] hover:-translate-y-2 transition-all duration-300 w-full sm:w-auto shadow-sm hover:shadow-lg hover:shadow-primary/20 border border-transparent dark:border-white/5">
                      <div className="mb-5 flex flex-col items-center sm:items-start w-full">
                        <div className="flex gap-1.5 mb-3">
                          {renderStars(parseFloat(item.appstorerating))}
                        </div>
                        <p className="text-midnight_text/70 dark:text-white/70 text-body mt-1 font-medium">
                          <span className="text-midnight_text dark:text-white font-bold text-h4 mr-2">
                            {item.appstorerating}
                          </span>
                          {t("search.ratings")}
                        </p>
                      </div>
                      <Link href="#" className="block hover:opacity-80 transition-opacity w-full">
                        <Image
                          src="/images/search/app.png"
                          alt="app store download"
                          width={140}
                          height={48}
                          className="dark:contrast-125 dark:opacity-90 object-contain mx-auto sm:mx-0 w-auto"
                        />
                      </Link>
                    </div>
                    
                    <div className="flex flex-col items-center sm:items-start bg-heroBg dark:bg-search/80 p-6 rounded-[1.5rem] hover:-translate-y-2 transition-all duration-300 w-full sm:w-auto shadow-sm hover:shadow-lg hover:shadow-primary/20 border border-transparent dark:border-white/5">
                      <div className="mb-5 flex flex-col items-center sm:items-start w-full">
                        <div className="flex gap-1.5 mb-3">
                          {renderStars(parseFloat(item.gplayrating))}
                        </div>
                        <p className="text-midnight_text/70 dark:text-white/70 text-body mt-1 font-medium">
                          <span className="text-midnight_text dark:text-white font-bold text-h4 mr-2">
                            {item.gplayrating}
                          </span>
                          {t("search.ratings")}
                        </p>
                      </div>
                      <Link href="#" className="block hover:opacity-80 transition-opacity w-full">
                        <Image
                          src="/images/search/google.png"
                          alt="google play download"
                          width={140}
                          height={48}
                          className="dark:contrast-125 dark:opacity-90 object-contain mx-auto sm:mx-0 w-auto"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Search;
