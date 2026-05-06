"use client";
import React, { FC, useState, useEffect } from "react";
import Image from "next/image";
import { Play, X } from "@/components/icons";
import { useTranslation } from "@/context/LanguageContext";
import { Reveal, Stagger } from "@/components/Common/Reveal";

const Spend: FC = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsVideoOpen] = useState<boolean>(false);

  const openModal = (): void => {
    setIsVideoOpen(true);
  };

  const closeModal = (): void => {
    setIsVideoOpen(false);
  };

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === "Escape") closeModal();
      };
      document.addEventListener("keydown", handleEsc);
      return () => document.removeEventListener("keydown", handleEsc);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

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
          <div className="relative overflow-hidden mt-14 group cursor-pointer inline-block rounded-3xl drop-shadow-2xl">
            <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300 z-10 rounded-3xl" onClick={openModal}></div>
            <Image
              src="/images/spend/spend.png"
              alt="spending analytics dashboard"
              width={850}
              height={550}
              loading="lazy"
              sizes="(max-width: 768px) 100vw, 850px"
              className="w-full object-cover rounded-3xl group-hover:scale-105 transition-transform duration-700"
            />
            <button
              className="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full bg-white dark:bg-search shadow-xl text-primary border border-transparent group-hover:border-primary/20 w-16 h-16 md:w-20 md:h-20 transition-all duration-300 group-hover:scale-110"
              onClick={openModal}
              aria-label="Play product overview video"
            >
              <Play width={32} height={32} className="ml-1" />
            </button>
          </div>
        </Reveal>

        {isModalOpen && (
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 cursor-default"
            onClick={closeModal}
            role="dialog"
            aria-modal="true"
            aria-label="Product overview video"
          >
            <div 
              className="bg-white dark:bg-darkmode rounded-2xl w-full max-w-4xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-300"
              onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between border-b border-border dark:border-dark_border p-5">
                  <h3 className="text-lead font-semibold text-midnight_text dark:text-white">
                    {t("spend.productOverview")}
                  </h3>
                  <button
                    onClick={closeModal}
                    aria-label="Close video modal"
                    className="p-2 rounded-full hover:bg-muted/10 dark:hover:bg-white/10 transition-colors"
                  >
                    <X width={20} height={20} className="text-midnight_text dark:text-white" />
                  </button>
                </div>
                <div className="w-full aspect-video bg-black">
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/zzBxZeOTuDw?si=o8O6J_Z9OjdCbtcq"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div>
          )}
        </Reveal>
      </Stagger>
    </section>
  );
};

export default Spend;
