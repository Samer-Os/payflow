"use client";
import React, { FC } from "react";
import Image from "next/image";
import { Play } from "@/components/icons";
import { useTranslation } from "@/context/LanguageContext";
import { Reveal, Stagger } from "@/components/Common/Reveal";

const Spend: FC = () => {
  const { t } = useTranslation();

  return (
    <section className="dark:bg-darkmode overflow-hidden py-14">
      <Stagger>
        <Reveal className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-4">
          <div className="text-center">
            <h2 className="md:text-h2 sm:text-h3 text-h4 text-midnight_text font-bold mb-5 dark:text-white leading-tight">
              {t("spend.title1")}
              <span className="text-primary ml-2">{t("spend.highlight")}</span>
            </h2>
            <p className="text-body text-muted dark:text-white/70 lg:font-medium lg:max-w-[60%] lg:mx-auto mb-3 leading-relaxed">
              {t("spend.subtitle")}
            </p>
          </div>

          <Reveal className="flex justify-center items-center">
            <div className="relative overflow-hidden mt-14 group inline-block rounded-3xl drop-shadow-2xl">
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300 z-10 rounded-3xl" />
              <Image
                src="/images/spend/spend.webp"
                alt="spending analytics dashboard"
                width={850}
                height={550}
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 850px"
                className="w-full object-cover rounded-3xl group-hover:scale-105 transition-transform duration-700"
              />
              <div
                className="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full bg-white dark:bg-search shadow-xl text-primary border border-transparent group-hover:border-primary/20 w-16 h-16 md:w-20 md:h-20 transition-all duration-300 group-hover:scale-110"
                aria-hidden="true"
              >
                <Play width={32} height={32} className="ml-1" />
              </div>
            </div>
          </Reveal>
        </Reveal>
      </Stagger>
    </section>
  );
};

export default Spend;
