"use client";
import Image from "next/image";
import { PaymentImage } from "@/data/home";
import { useTranslation } from "@/context/LanguageContext";
import { Reveal, Stagger } from "@/components/Common/Reveal";

const Payment = () => {
  const { t, dictionary } = useTranslation();
  const paymentItems = dictionary.payment.items;

  return (
    <section className="dark:bg-darkmode py-14">
      <Stagger>
        <Reveal className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-4">
          <div className="px-4 lg:px-12 mb-8">
          <h2 className="text-center font-semibold md:text-h2 sm:text-h3 text-h4 text-midnight_text dark:text-white lg:mx-44 leading-tight">
            {t("payment.title1")}
            <span className="text-primary"> {t("payment.highlight")} </span>
            {t("payment.title2")}
          </h2>
        </div>

        <Reveal className="flex flex-wrap justify-center gap-3 sm:gap-8">
          {paymentItems.map((item, index) => (
            <p
              key={index}
              className={`text-muted dark:text-white/70 md:text-lead text-base font-medium relative ${
                index !== paymentItems.length - 1
                  ? "sm:after:content-[''] sm:after:absolute sm:after:w-0.5 sm:after:h-3/4 sm:after:bg-muted/30 dark:sm:after:bg-white/20 sm:after:rounded-full sm:after:-right-4 sm:after:top-0.5"
                  : ""
              }`}
            >
              {item}
            </p>
          ))}
        </Reveal>

        <Stagger className="flex justify-start sm:mt-24 mt-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:gap-14 gap-8">
            {PaymentImage.map((item, index) => (
              <Reveal key={index} as="div" className="group cursor-pointer p-6 rounded-3xl transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:bg-white dark:hover:bg-search/50 border border-transparent hover:border-border dark:hover:border-dark_border">
                <div className="rounded-full inline-block">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={80}
                    height={80}
                    className="rounded-full bg-white p-4 shadow-lg dark:shadow-none dark:bg-search transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="py-5">
                  <h3 className="lg:text-h4 text-h4 font-medium text-midnight_text dark:text-white group-hover:text-primary transition-colors">
                    {(dictionary.payment.cards as Record<string, { title: string; details: string }>)[index]?.title}
                  </h3>
                </div>
                <div className="pr-4">
                  <p className="text-body text-muted dark:text-white/70 leading-relaxed">
                    {(dictionary.payment.cards as Record<string, { title: string; details: string }>)[index]?.details}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Stagger>
        </Reveal>
      </Stagger>
    </section>
  );
};

export default Payment;
