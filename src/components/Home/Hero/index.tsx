"use client";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { useTranslation } from "@/context/LanguageContext";
import ProductMockup from "./ProductMockup";

const stack = [
  { icon: "logos:nextjs-icon", label: "Next.js" },
  { icon: "logos:react", label: "React" },
  { icon: "logos:typescript-icon", label: "TypeScript" },
  { icon: "logos:tailwindcss-icon", label: "Tailwind CSS" },
  { icon: "logos:framer", label: "Framer Motion" },
];

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section className="relative pt-28 sm:pt-36 md:pt-44 mb-10 sm:mb-14 bg-cover bg-center dark:bg-darkmode overflow-hidden">
      <div className="w-full h-full absolute z-0 bg-heroBg rounded-b-[60px] sm:rounded-b-[119px] left-0 top-0 dark:bg-midnight_text" />
      <div className="container mx-auto lg:max-w-(--breakpoint-xl) relative z-1 md:max-w-(--breakpoint-md) px-4">
        <div className="grid grid-cols-12 items-center gap-y-10">

          <div className="lg:col-span-6 col-span-12">
            <h1 className="md:text-display sm:text-h1 text-h2 text-midnight_text dark:text-white text-center lg:text-start mb-6 sm:mb-9 w-full tracking-tight leading-[1.05] text-balance">
              {t("hero.title1")}
              <br />
              <span className="relative inline-block px-2 text-primary">
                <span className="absolute inset-0 bg-border dark:bg-darkHeroBg rounded-lg -z-10 hero-highlight-bar" />
                {t("hero.highlight")}
              </span>
              <br />
              {t("hero.title2")}
            </h1>

            <p className="sm:text-lead text-body text-muted dark:text-white/70 text-center lg:text-start text-balance">
              {t("hero.subtitle")}
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start mt-8 sm:mt-12 gap-4 sm:gap-8">
              <Link
                href="/signup"
                className="text-body flex gap-2 items-center bg-primary text-white py-3 px-8 rounded-lg border border-primary hover:text-primary hover:bg-transparent transition-all duration-300 dark:shadow-[0_0_20px_rgba(99,102,241,0.4)] dark:hover:shadow-[0_0_30px_rgba(99,102,241,0.6)] hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                {t("hero.getStarted")}
                <Icon icon="solar:alt-arrow-right-linear" width="13" height="13" />
              </Link>
              <Link
                href="#benefits"
                className="text-body flex gap-2 items-center text-muted dark:text-white/70 hover:text-primary transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary rounded"
              >
                {t("hero.seeFeatures")}
                <Icon icon="solar:alt-arrow-right-linear" width="13" height="13" />
              </Link>
            </div>

            <div className="lg:my-20 my-10">
              <p className="text-body sm:text-body text-muted dark:text-white/60 text-center lg:text-start mb-5 uppercase tracking-widest font-medium">
                {t("hero.builtWith")}
              </p>
              <div className="flex flex-wrap gap-x-6 gap-y-3 sm:gap-x-8 justify-center lg:justify-start w-full">
                {stack.map((item, index) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-2 text-body font-medium text-muted dark:text-white/70 hero-stack-item"
                    style={{ animationDelay: `${0.55 + index * 0.09}s` }}
                  >
                    <Icon icon={item.icon} width="20" height="20" />
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 col-span-12 lg:pl-6 xl:pl-12 max-w-md sm:max-w-lg lg:max-w-none mx-auto w-full">
            <ProductMockup />
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
